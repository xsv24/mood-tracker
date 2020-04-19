const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    () => console.log("Connected to MongoDB.")
).catch(
    err => console.error("Connection error", err)
);