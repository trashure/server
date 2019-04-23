module.exports = (result) => {
    // let type = { 0: 'cardboard', 1: 'glass', 2: 'metal', 3: 'paper', 4: 'plastic', 5: 'trash' }
    let color = {
        'cardboard': '#e67e22',
        'glass': '#27ae60',
        'metal': '#2980b9',
        'paper': '#9b59b6',
        'plastic': '#16a085',
        'trash': '#f1c40f'
    }
    return color[result];
}

