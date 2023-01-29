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
                 res.json({ message: 'Votre compte a été succès !' })
             })
             .catch(error => {
                 res.json({ message: 'Une erreur est survenue !' })
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
                            message: 'Connexion réussie !'
                        })
                    } else {
                        res.json({
                            message: 'Mot de passe incorrect !'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'Email incorrect !'
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
                                    message: 'Votre compte a été supprimé !'
                                })
                            })
                    } else {
                        res.json({
                            message: 'Mot de passe incorrect !'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'Email incorrect !'
                })
            }
        })

}

export default {
    register,
    connexion,
    deletion
}