import { pool } from '../lib/db';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigration() {
  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, 'migrations', '001_create_users_table.sql');
    const sqlContent = await fs.readFile(migrationPath, 'utf-8');

    // Execute the migration
    await pool.query(sqlContent);
    console.log('Migration completed successfully');
    
    // Close the connection pool
    await pool.end();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
