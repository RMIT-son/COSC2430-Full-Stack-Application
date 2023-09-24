const bcrypt = require('bcrypt');

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        // Handle any errors that might occur during hashing
        console.error(error);
        throw error; // Rethrow the error or handle it as needed
    }
}

module.exports = {
    hashPassword
}