const router        = require('express').Router()
const passport      = require('passport')



// auth login
router.get('/login', (req, res) => {
    res.render('login', {user: req.user})
})

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout()
    res.redirect('/')
})




/*__________ GOOGLE AUTH__________  */
// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

// callback route for google to redirect to 
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    // res.send(req.user)
    res.redirect('/profile')
})
/*__________ GOOGLE AUTH__________  */




/*__________ Facebook AUTH__________  */
// router.get('/facebook', passport.authenticate('facebook', {
//     scope: ['profile']
// }))

// router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
//     res.redirect('/profile')
// })
/*__________ Facebook AUTH__________  */




/*__________ Github AUTH__________  */
router.get('/github', passport.authenticate('github', {
    scope: ['profile']
}))

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    res.redirect('/profile')
})
/*__________ Github AUTH__________  */





/*__________ Twitter AUTH__________  */
router.get('/twitter', passport.authenticate('twitter', {
    scope: ['profile']
}))

router.get('/twitter/redirect', passport.authenticate('twitter'), (req, res) => {
    res.redirect('/profile')
})
/*__________ Twitter AUTH__________  */



/*__________ Dropbox AUTH__________  */
router.get('/dropbox-oauth2', passport.authenticate('dropbox-oauth2', 
// {
//     scope: ['profile']
// }
))

router.get('/dropbox-oauth2/redirect', passport.authenticate('dropbox-oauth2'), (req, res) => {
    res.redirect('/profile')
})
/*__________ Dropbox AUTH__________  */





/*__________ Linkedin AUTH__________  */
router.get('/linkedin', passport.authenticate('linkedin', 
// {
//     scope: ['r_emailaddress', 'r_basicprofile'],
// }
))

router.get('/linkedin/redirect', passport.authenticate('linkedin'), (req, res) => {
    // console.log(res.body)
    res.redirect('/profile')
})
/*__________ Linkedin AUTH__________  */





module.exports = router