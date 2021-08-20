const appResponse = require("../../lib/appResponse");
const {
    BadRequestError,
    UnAuthorizedError,
    NotFoundError,
} = require("../../lib/appError");
const { generateToken,
    hashPassword,
    comparePassword,
} = require('../utils/authHandler')

const userService = require("../services/user.service");
const _ = require('lodash');
require('../services/passport.service')(userService)
const { token } = require('../utils/random')
class AuthController {
    login = async (req, res) => {
        let { email } = req.body
        const isValidUser = await userService.findByQuery({ email });
        if (!isValidUser) throw new UnAuthorizedError("invalid email or password");

        const isValidPassword = await comparePassword(
            req.body.password,
            isValidUser.password
        );
        if (!isValidPassword)
            throw new UnAuthorizedError("Invalid email or password");

        const authToken = generateToken(isValidUser);

        const userData = _.omit(isValidUser._doc, ['password', 'googleId'])

        return res.send(
            appResponse("User login successful", { authToken, ...userData })
        );
    };

    signup = async (req, res) => {
        let { email } = req.body
        const isExistingUser = await userService.findByQuery({ email });
        if (isExistingUser)
            throw new BadRequestError("This email is already registered");

        req.body.password = await hashPassword(req.body.password)

        const user = await userService.create(req.body);

        res.send(
            appResponse("User created successfully", _.omit(user._doc, ['googleId', 'password']))
        );
    };

    resetPasswordMail = async (req, res) => {

        const { email } = req.body

        const resetToken = token()

        const validUser = await userService.update({ email }, { token: resetToken })

        if (validUser) {
            await userService.resetPasswordMail(validUser, resetToken)
        }
        res.send(appResponse("check your email"))
    }

    verifyToken = async (req, res) => {
        let { token, email } = req.body


        const user = await userService.findByQuery({ email, token })
        console.log({ user })
        if (!user) throw new BadRequestError("incorrect token")

        await userService.update({ email }, { $unset: { token } })

        res.send("token is verified ")

    }

    resetPassword = async (req, res) => {
        let { newPassword, email } = req.body

        const password = await hashPassword(newPassword)

        const validUser = await userService.update({ email }, { password })
        if (!validUser) throw new NotFoundError("user does not exists")

        res.send(appResponse("user password updated successfully"))

    }

    refreshToken = async (req, res) => {
        let user = await userService.findByQuery(req.body)
        if (!user) throw new NotFoundError("user does not exist")
        const authToken = generateToken(user)
        res.send(appResponse("user refresh token", authToken))
    }

    oAuth = async (req, res) => {
        const token = generateToken(req.user)
        const user = req.user
        const data = JSON.stringify({ token, user })
        res.redirect(`eva-kitchen://login?data=${data}`)
    }

}

module.exports = new AuthController();