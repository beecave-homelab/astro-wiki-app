import type { APIRoute } from 'astro';
import { jsonResponse, errorResponse } from '../../../lib/api';
import fs from 'node:fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';
import matter from 'gray-matter';

// Sanitize filename to prevent directory traversal and injection
function sanitizeFilename(filename: string): string {
  // Remove any path components
  const baseName = path.basename(filename);
  // Replace spaces with hyphens and remove any non-alphanumeric characters except hyphens and dots
  return baseName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-\.]/g, '');
}

// Generate a title from filename
function generateTitleFromFilename(filename: string): string {
  return filename
    .replace(/\.md$/, '') // Remove .md extension
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize first letter of each word
}

// Validate and ensure frontmatter
function ensureFrontmatter(content: string, filename: string): string {
  const { data, content: markdownContent } = matter(content);
  
  // Check if frontmatter exists and has required fields
  if (!data.title) {
    // Generate frontmatter if missing or incomplete
    const frontmatter = {
      title: generateTitleFromFilename(filename),
      description: 'Add a description for this document',
      pubDate: new Date(),
      updatedDate: new Date(),
      ...data // Preserve any existing frontmatter data
    };

    // Create new content with frontmatter
    return matter.stringify(markdownContent, frontmatter);
  }

  return content;
}

// Validate markdown content
function isValidMarkdown(content: string): boolean {
  try {
    // Parse the content with gray-matter
    const { content: markdownContent } = matter(content);
    
    // Basic validation - check if content contains common markdown elements
    const markdownPatterns = [
      /^#\s.+/m,  // Headers
      /\*.+\*/,   // Emphasis
      /\[.+\]\(.+\)/, // Links
      /```[\s\S]*?```/, // Code blocks
    ];
    
    return markdownContent.trim().length > 0 && 
           markdownPatterns.some(pattern => pattern.test(markdownContent));
  } catch (error) {
    return false;
  }
}

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    // Get token from cookie
    const token = cookies.get('auth_token')?.value;
    if (!token) {
      return errorResponse('Unauthorized', 401);
    }

    // Verify token
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      return errorResponse('Invalid token', 401);
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return errorResponse('No file provided', 400);
    }

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.md')) {
      return errorResponse('Only markdown (.md) files are allowed', 400);
    }

    // Read file content
    const content = await file.text();
    
    // Validate markdown content
    if (!isValidMarkdown(content)) {
      return errorResponse('Invalid markdown content', 400);
    }

    // Sanitize filename
    const sanitizedFilename = sanitizeFilename(file.name);
    
    // Ensure frontmatter exists and is valid
    const processedContent = ensureFrontmatter(content, sanitizedFilename);

    const targetPath = path.join(process.cwd(), 'src', 'content', 'docs', sanitizedFilename);

    // Create directory if it doesn't exist
    await fs.mkdir(path.dirname(targetPath), { recursive: true });

    // Write file with processed content
    await fs.writeFile(targetPath, processedContent, 'utf-8');

    // Log the upload action
    console.log(`File uploaded: ${sanitizedFilename} at ${new Date().toISOString()}`);

    return jsonResponse({
      success: true,
      filename: sanitizedFilename,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('File upload error:', error);
    return errorResponse('Internal server error', 500);
  }
};
