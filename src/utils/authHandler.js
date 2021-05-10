const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


exports.generateToken = (data, time = "24h") => {
    return jwt.sign(
        { _id: data._id, email: data.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: time }
    )
}

exports.hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

exports.comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword || "")
}

exports.genResetPasswordToken = (data, secretKey) => {
    return jwt.sign(
        { _id: data._id, email: data.email },
        secretKey,
        { expiresIn: "24h" }
    )
}

