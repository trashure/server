module.exports = (result) => {
    // let type = { 0: 'cardboard', 1: 'glass', 2: 'metal', 3: 'paper', 4: 'plastic', 5: 'trash' }
    let color = { 0: '#e67e22', 1: '#27ae60', 2: '#2980b9', 3: '#9b59b6', 4: '#16a085', 5: '#f1c40f' }
    return color[result];
}

