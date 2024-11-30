import bcrypt from 'bcryptjs';

async function testHash() {
    const password = 'admin123';
    const hash = await bcrypt.hash(password, 10);
    console.log('Generated hash:', hash);
    
    // Test the stored hash
    const storedHash = '$2a$10$zXnLXqmMDjPSJOCnqvyK6.TFuHMvEL.Nz1z7.RX8YZODp6H4e8QSm';
    const isValid = await bcrypt.compare(password, storedHash);
    console.log('Stored hash validation:', isValid);
}

testHash();
