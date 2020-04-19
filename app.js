const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes');
require('./services/mongoose');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({ origin: config.client }));
app.use(bodyParser.json());
router(app);

if(process.env.NODE_ENV === 'production') {
    const path = require('path');
    // serve react
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log('Server running on port:', PORT));