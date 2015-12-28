/**
 * Created by hadrien on 12/28/2015.
 */
var crypto = require('crypto');
var mongoose = require('mongoose'),
    User = mongoose.model('User');
function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).
    digest('base64')toString();
}
exports.signup = function(req, res) {
    var user = new User({email:req.body.email});
    user.set('hashed_password', hashPW(req.body.password));
    user.save(function(err) {
        if (err) {
            res.sessor.error = err;
            res.redirect('/');
        } else {
            req.session.user = user.id;
            req.seesion.firstname = user.firstname;
            req.session.lastname = user.lastname;
            res.redirect('/SuccessPage');
        }
    });
};
exports.login = function(req, res) {
    User.findOne({ email: req.body.email })
        .exec(function(err, user){
            if (!user) {
                err = 'User Not Found.';
            } else if (user.hashed_password === hashPW(req.body.password.toString())) {
                req.session.regenerate(fucntion(){
                    req.session.user = user.id;
                    req.session.firstname = user.firstname;
                    req.session.lastname = user.lastname;
                    res.redirect('/');
                });
            } else {
                err = 'Authentication failed.';
            }
            if (err) {
                req.session.regenerate(function(){
                    req.session.msg = err;
                    res.redirect('/');
                });
            }
        });
};
exports.getUserProfile = function(req, res) {
    User.findOne({ _id: req.session.user })
        .exec(function(err, user) {
            if (!user){
                res.json(404, {err: 'User Not Found.'});
            } else {
                res.json(user);
            }
        });
};
exports.updateUser = function(req, res){
    User.findOne({ _id: req.session.user })
        .exec(function(err, user) {
            user.set('email', req.body.email);
            user.set('firstname', req.body.firstname);
            user.set('lastname', req.body.lastname);
            user.save(function(err) {
                if (err){
                    res.sessor.error = err;
                } else {
                    req.session.msg = 'User Updated.';
                }
                res.redirect('/user');
            });
        });
};
exports.deleteUser = function(req, res){
    User.findOne({ _id: req.session.user })
        .exec(function(err, user) {
            if(user){
                user.remove(function(err){
                    if (err){
                        req.session.msg = err;
                    }
                    req.session.destroy(function(){
                        res.redirect('/');
                    });
                });
            } else{
                req.session.msg = "User Not Found!";
                req.session.destroy(function(){
                    res.redirect('/');
                });
            }
        });
};