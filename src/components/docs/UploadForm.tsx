import { useState, useRef } from 'react';

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFileSlug, setUploadedFileSlug] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError('');
    setSuccess('');
    setUploadedFileSlug('');

    if (!selectedFile) {
      return;
    }

    // Validate file type
    if (!selectedFile.name.toLowerCase().endsWith('.md')) {
      setError('Only markdown (.md) files are allowed');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setUploadedFileSlug('');

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/docs/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // Generate the slug from the filename
      const slug = data.filename.replace(/\.md$/, '');
      setUploadedFileSlug(slug);
      setSuccess('File uploaded successfully!');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-dark-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-white">Upload Document</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="file" 
            className="block text-sm font-medium mb-2 text-gray-200"
          >
            Select Markdown File
          </label>
          <input
            ref={fileInputRef}
            type="file"
            id="file"
            accept=".md"
            onChange={handleFileChange}
            className="w-full px-3 py-2 text-sm text-gray-200 bg-dark-400 border border-dark-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isUploading}
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {success && (
          <div className="space-y-4">
            <div className="text-green-500 text-sm">{success}</div>
            {uploadedFileSlug && (
              <a
                href={`/docs/${uploadedFileSlug}`}
                className="block w-full bg-green-600 text-white text-center py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                View Uploaded File
              </a>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={!file || isUploading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
