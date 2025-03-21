const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());

app.use(express.static('public'));

app.get('/', (req, res) => {
    const html = fs.readFileSync('public/home.html', 'utf-8');
    res.send(html);
})

app.use('/user', require('./user/index'));
app.use('/contests', require('./contests/index'));

app.listen(5000,() => {
    console.log(`Server is running on port 5000`);
});

// Export the Express API
module.exports = app;
