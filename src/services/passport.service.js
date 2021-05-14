const passport = require('passport')
const OAuth2Strategy = require('passport-google-oauth20').Strategy


module.exports = (UserService) => {
    passport.use(new OAuth2Strategy({
        clientID: process.env.Google_client_id,
        clientSecret: process.env.Google_secret_key,
        callbackURL: `${process.env.API_BASE_URL}/auth/google/callback`
    },
        async function (accessToken, refreshToken, profile, done) {

            const isExistingUser = await UserService.findByEmail(profile._json.email)

            if (isExistingUser)
                done(null, isExistingUser)

            const newUser = await UserService.create({
                "firstName": profile._json.family_name,
                "lastName": profile._json.given_name,
                "email": profile._json.email,
                "googleId": profile._json.sub
            })

            done(null, newUser)



        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user)
    })
    passport.deserializeUser((user, done) => {
        done(null, user)
    })
}
