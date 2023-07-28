function errorHandler(err, req, res, next) {
    console.log(err);
    if (err) {
        res.json({
            "message": "не хватает полей",
            "fields": Object.keys(err.errors),
            "error_messages": Object.values(err.errors).map(el => el.properties.message)
        });
    } else {
        next();
    }
}

module.exports = errorHandler;