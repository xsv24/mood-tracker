export default process.env.NODE_ENV === 'production' ? {
    api: `/api`
} : {
    api: `http://localhost:${process.env.PORT || 3001}/api`
}