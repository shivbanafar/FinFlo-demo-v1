const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = {
    user: 'YOUR_DB_USER',
    password: 'YOUR_DB_PASSWORD',
    server: 'YOUR_DB_SERVER',
    database: 'YOUR_DB_NAME',
    options: {
        encrypt: true
    }
};

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt for username: ${username}`);

    try {
        let pool = await sql.connect(dbConfig);
        console.log('Database connected successfully');

        let result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM Users WHERE Username = @username');

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const passwordMatch = await bcrypt.compare(password, user.PasswordHash);

            if (passwordMatch) {
                console.log('Password match successful');
                res.status(200).send('Login successful');
            } else {
                console.log('Invalid password');
                res.status(401).send('Invalid credentials');
            }
        } else {
            console.log('User not found');
            res.status(401).send('Invalid credentials');
        }
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Server error');
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
