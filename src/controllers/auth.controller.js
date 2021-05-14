const appResponse = require("../../lib/appResponse");
const {
    BadRequestError,
    UnAuthorizedError,
    NotFoundError,
} = require("../../lib/appError");
const { generateToken,
    hashPassword,
    comparePassword,
    genResetPasswordToken,
} = require('../utils/authHandler')

const jwt = require('jsonwebtoken')
const userService = require("../services/user.service");
require('../services/passport.service')(userService)



class AuthController {
    login = async (req, res) => {
        const isValidUser = await userService.findByEmail(req.body.email);
        if (!isValidUser) throw new UnAuthorizedError("invalid email or password");

        const isValidPassword = await comparePassword(
            req.body.password,
            isValidUser.password
        );
        if (!isValidPassword)
            throw new UnAuthorizedError("Invalid email or password");

        const authToken = generateToken(isValidUser);
        console.log(authToken)

        return res.send(
            appResponse("User login successful", { authToken })
        );
    };

    signup = async (req, res) => {

        const isExistingUser = await userService.findByEmail(req.body.email);
        if (isExistingUser)
            throw new BadRequestError("This email is already registered");

        req.body.password = await hashPassword(req.body.password)

        await userService.create(req.body);

        res.send(
            appResponse("User created successfully")
        );
    };

    resetPasswordMail = async (req, res) => {
        const { email } = req.body
        const validUser = await userService.findByEmail(email)

        if (!validUser) throw new BadRequestError("user does not exist")
        console.log(validUser)

        const secretKey = `${new Date(validUser.updatedAt).getTime()}${validUser._id}`

        const token = genResetPasswordToken(validUser, secretKey)

        const resetToken = `${token}__${validUser._id}`

        await userService.resetPasswordMail(validUser, resetToken)

        res.send(appResponse("check your email"))
    }

    resetPassword = async (req, res) => {
        let { token, newPassword } = req.body
        const [jwtToken, user_id] = token.split("__")

        const validUser = await userService.findById(user_id)
        if (!validUser) throw new NotFoundError("user does not exists")

        const secretKey = `${new Date(validUser.updatedAt).getTime()}${validUser._id}`

        try {
            const decodedUser = jwt.verify(jwtToken, secretKey)
            newPassword = await hashPassword(newPassword)

            await userService.update(decodedUser._id, { password: newPassword })

            res.send(appResponse("user password updated successfully"))
        }
        catch (err) {
            throw new BadRequestError("Invalid password reset token");
        }

    }

    oAuth = async (req, res) => {
        console.log(req.user)
        const token = generateToken(req.user)
        res.redirect(`turbopay://login?data${token}`)
        //res.send(appResponse("user logged in successfully", { token }))
    }

}

module.exports = new AuthController();