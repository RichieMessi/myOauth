const passport           = require('passport')
const GoogleStrategy     = require('passport-google-oauth20').Strategy
const User               = require('../models/user-model')
// const keys = require('./keys')
const FacebookStrategy = require('passport-facebook').Strategy
const GithubStrategy = require('passport-github').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const DropboxOAuth2Strategy = require('passport-dropbox-oauth2').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;




passport.serializeUser((user,done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(
    new GoogleStrategy({
    // options for google strategy
    callbackURL: '/auth/google/redirect',
    clientID : '241284637858-ta055706ukpjm5ij4rejjlivbmf1rtcd.apps.googleusercontent.com',
    clientSecret : 'xST9iFo3PH8wBUrwvtEkq5lb',
    }, (accessToken, refreshToken, profile, done) => {
        //check if user already in database
        console.log(profile)
        User.findOne({user_id: profile.id}).then((currentUser) => {
            if(currentUser){
                // already exists
                console.log(`CURRENT USER IS ${currentUser} `)
                done(null, currentUser)             
            } else {
                // if not, create new user
                new User({
                    username: profile.displayName,
                    user_id: profile.id,
                    thumbnail: profile._json.image.url
                }).save().then((newUser) => {
                    console.log(`NEW USER CREATED... ${newUser}`)
                    done(null, newUser)
                })
            }
        })
    })
)

passport.use(
    new GithubStrategy({
    callbackURL: "/auth/github/redirect",
    clientID: "d3749ce4bc7882c6d90a",
    clientSecret: "ff7551da539705f959d91c9db8fb0e0fa1d89878",
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({user_id: profile.id}).then((currentUser) => {
        if(currentUser){
            // already exists
            console.log(`CURRENT USER IS ${currentUser} `)
            done(null, currentUser)             
        } else {
            // if not, create new user
            new User({
                username: profile.username,
                user_id: profile.id,
                thumbnail: profile._json.avatar_url
            }).save().then((newUser) => {
                console.log(`NEW USER CREATED... ${newUser}`)
                done(null, newUser)
            })
        }
    })
}
));


passport.use(
    new TwitterStrategy({
    callbackURL: "/auth/twitter/redirect",
    consumerKey: "CYdcvWTNK8uAZGn0yBHEf3fa6",
    consumerSecret: "GVXneZVUEL8Bvgt72PrztmE4ZeSUnmrAjAhrzv64yo0O2tJ0LT",
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile)
    User.findOne({user_id: profile.id}).then((currentUser) => {
        if(currentUser){
            // already exists
            console.log(`CURRENT USER IS ${currentUser} `)
            done(null, currentUser)             
        } else {
            // if not, create new user
            new User({
                username: profile.username,
                user_id: profile.id,
                thumbnail: profile.photos[0].value
            }).save().then((newUser) => {
                console.log(`NEW USER CREATED... ${newUser}`)
                done(null, newUser)
            })
        }
    })
}
));


passport.use(
    new DropboxOAuth2Strategy({
    apiVersion: '2',
    callbackURL: "/auth/dropbox-oauth2/redirect",
    clientID: "oxrvk4lcw432gtp",
    clientSecret: "28flso68spy3d9h",
  },
  function(accessToken, refreshToken, profile, done) {
    //   console.log(profile)
    //   console.log(profile._json.name.given_name)
    //   console.log(profile._json.email)
    //   console.log(profile._json.profile_photo_url)
    User.findOne({user_id: profile._json.account_id}).then((currentUser) => {
        if(currentUser){
            // already exists
            console.log(`CURRENT USER IS ${currentUser} `)
            done(null, currentUser)             
        } else {
            // if not, create new user
            new User({
                username: profile._json.name.given_name,
                user_id: profile._json.account_id,
                thumbnail: profile._json.profile_photo_url
            }).save().then((newUser) => {
                console.log(`NEW USER CREATED... ${newUser}`)
                done(null, newUser)
            })
        }
    })
}
));


passport.use(new LinkedInStrategy({
  clientID: '778yit9kpp5eev',
  clientSecret: 'JwBRyokjgQGw8Mw4',
  callbackURL: "/auth/linkedin/redirect",
  scope: ['r_emailaddress', 'r_basicprofile'],
}, 
function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    // console.log(profile._json.formattedName)
    // console.log(profile.)

    User.findOne({user_id: profile._json.id}).then((currentUser) => {
        if(currentUser){
            // already exists
            console.log(`CURRENT USER IS ${currentUser} `)
            done(null, currentUser)             
        } else {
            // if not, create new user
            new User({
                username: profile._json.formattedName,
                user_id: profile._json.id,
                thumbnail: null
            }).save().then((newUser) => {
                console.log(`NEW USER CREATED... ${newUser}`)
                done(null, newUser)
            })
        }
    })
}
));




