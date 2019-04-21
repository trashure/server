module.exports = (result) => {
    let type = { 0: 'cardboard', 1: 'glass', 2: 'metal', 3: 'paper', 4: 'plastic', 5: 'trash' }
    return type[result];
}

