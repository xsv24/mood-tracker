module.exports = process.env.NODE_ENV !== 'production' ? {
    secret: 'mood-app_ssshhh',
    client: `http://localhost:${process.env.PORT || 3000}`
} : {
    secret: process.env.SECRET,
    client: 'https://mood-tracker-247.herokuapp.com'
};