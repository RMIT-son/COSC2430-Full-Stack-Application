const isUsernameValid = (username) => {
    // Username must be at least 8 characters long, contain only alphanumeric characters, and contain no spaces
    const usernameRegex = /^[a-zA-Z0-9]{8,15}$/;
    return usernameRegex.test(username);
}

const isPasswordValid = (password) => {
    // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/;
    return passwordRegex.test(password);
}

module.exports = {
    isUsernameValid,
    isPasswordValid
}