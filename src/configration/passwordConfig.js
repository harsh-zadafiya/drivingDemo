const bcrypt = require('bcrypt');

const encPassword = (orignal_psw) => {
    const salt = bcrypt.genSaltSync(6);
    const encripted_psw = bcrypt.hashSync(orignal_psw, salt);

    return encripted_psw
}

const validatePassword = async (userPassword, encripted_psw) => {
    const match = await bcrypt.compare(userPassword, encripted_psw);

    return match
}

const PasswordUtil = {
    encPassword,
    validatePassword
}

module.exports = PasswordUtil
