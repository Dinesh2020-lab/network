const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Save code to file
app.post('/save', (req, res) => {
    const { filename, code } = req.body;
    fs.writeFile(`./saved_codes/${filename}.txt`, code, err => {
        if(err) return res.status(500).send("Error saving code");
        res.send("Code saved successfully!");
    });
});

// Load code from file
app.get('/load/:filename', (req, res) => {
    const { filename } = req.params;
    fs.readFile(`./saved_codes/${filename}.txt`, 'utf8', (err, data) => {
        if(err) return res.status(404).send("File not found");
        res.send(data);
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
