export const generateId = (idLength) => {
    const inputs = 'abcdefghijklmnpqrstuvwxyz01234567890123456789';
    let id = '';
    for (let i = 0; i < idLength; i++) {
        id += inputs[Math.floor(Math.random()*inputs.length)];
    }
    return id;
}
