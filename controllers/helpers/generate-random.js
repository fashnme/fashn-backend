function generateRandom() {
	let id = '';

    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( var i = 0; i < 6; i++ ) {
       id += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return id;
}
 module.exports = {generateRandom};
