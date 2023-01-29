import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const register = (req, res) => {
     bcrypt.hash(req.body.password, 10, (err, hashedPass) => {
         if (err) {
             res.json({
                 error: err
             })
         }

         const user = new User({
             name: req.body.name,
             email: req.body.email,
             password: hashedPass,
             isVerified: true
         })
         user.save()
             .then(user => {
                 // res.redirect('http://localhost:63342/nodejs/rendu/frontend/index.html')
                 res.json({ message: 'User Added Successufully !' })
             })
             .catch(error => {
                 res.json({ message: 'An error occured' })
             })
     })
}

const connexion = (req, res) => {
    User.findOne({ 'email': req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }

                    if (result) {
                        res.json({
                            message: 'Login Successful'
                        })
                    } else {
                        res.json({
                            message: 'Passwords does not matched'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'No user found'
                })
            }
        })
}

const deletion = (req, res) => {
    User.findOne({ 'email': req.body.email })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }

                    if (result) {
                        User.findOneAndDelete({'email': req.body.email})
                            .then(result => {
                                res.json({
                                    message: 'User deleted'
                                })
                            })
                    } else {
                        res.json({
                            message: 'Passwords does not matched'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'No user found'
                })
            }
        })

}

export default {
    register,
    connexion,
    deletion
}