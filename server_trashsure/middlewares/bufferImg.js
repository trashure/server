module.exports = (req, res, next) => {
    if (req.body.path) {
        const data = req.body.path.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(data, 'base64');
        req.file = {
            fieldname: 'path',
            originalname: 'trash.jpg',
            encoding: '7bit',
            mimetype: 'image/jpg',
            buffer
        }
    }
    next();
}
