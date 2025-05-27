const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

async function insertTestimonials() {
    let connection;
    try {
        // Read the SQL file
        const sqlFile = path.join(__dirname, 'insert_testimonials.sql');
        const sql = await fs.readFile(sqlFile, 'utf8');

        // Create connection
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'finance_pro_tricks',
            multipleStatements: true // This allows multiple SQL statements
        });

        // Execute the SQL
        await connection.query(sql);
        console.log('Testimonials data inserted successfully!');

    } catch (error) {
        console.error('Error inserting testimonials:', error);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

insertTestimonials(); 