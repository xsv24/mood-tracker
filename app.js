const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes');
require('./services/mongoose');
const PORT = process.env.PORT || 80;

const app = express();

app.use(cors({ origin: config.client }));
app.use(bodyParser.json());
router(app);

if(process.env.NODE_ENV === 'production') {
    const path = require('path');
    // serve react
    console.log('serve static react: ', path.join(__dirname, 'client', 'build'));
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('/*', function(req, res) {
        try {
            console.log('serve react route');
            res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); 
        } catch (err) {
            console.log(err)
        }
    });
}

app.listen(PORT, () => console.log('Server running on port:', PORT));
console.log('Env:', process.env.NODE_ENV);
console.log('Client Url:', config.client)