export default (err, req, res, next) => {
    const {message, stack} = err
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status = statusCode
    res.json({message, stack})
}