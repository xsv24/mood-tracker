if(process.env.NODE_ENV !== 'production') {
    const path = require('path'); 
    
    require('dotenv').config({ 
        path: path.join(__dirname, `.env.${process.env.NODE_ENV}`)
    });
}

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');
require('./services/mongoose');
const PORT = process.env.PORT || 80

const app = express();

app.use(cors({ origin: process.env.CLIENT }));
app.use(bodyParser.json());
router(app);

if(process.env.NODE_ENV === 'production') {
    const path = require('path');
    // serve react
    console.log('serve static react: ', path.join(__dirname, 'client', 'build'));

    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); 
    });
}

app.listen(PORT, () => console.log('Server running on port:', PORT));
console.log('Env:', process.env.NODE_ENV);
console.log('Client Url:', process.env.CLIENT);