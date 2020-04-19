export default process.env.NODE_ENV === 'production' ? {
    api: `http://localhost:${process.env.PORT || 8080}/api`
} : {
    api: `http://localhost:${process.env.PORT || 3001}/api`
}