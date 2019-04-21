module.exports = (err) => {
    return err.message.split(', ')[0].split(': ')[2];
}