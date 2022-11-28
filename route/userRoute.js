const route = require('express').Router();
const verify = require('../verify');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../model/user')


//TO get all users and single user

route.get('/', verify, async (req, res) => {
    if (req.query.userid) {
        const user = await User.findOne({ _id: req.query.userid });
        res.json(user);

    } else {
        const users = await User.find();
        res.json(users);

    }
})
//for user registration
route.post('/register', async (req, res) => {
    const { fname, lname, email, mobile, password, } = req.body;
    try {
        const newPassword = crypto.AES.encrypt(password, process.env.SECRET_KEY).toString();
        const user = await User.create({ u_fname: fname, u_lname: lname, u_email: email, u_mobile: mobile, u_password: newPassword });
        res.json({ user });
    } catch (error) {
        console.log(error)
    }
})

//for user login
route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existUser = await User.findOne({ u_email: email });
        if (existUser) {
            const originalPassword = crypto.AES.decrypt(existUser.u_password, process.env.SECRET_KEY).toString(crypto.enc.Utf8);
            if (originalPassword == password) {
                const token = jwt.sign({ user: existUser.u_email, id: existUser._id, isAdmin: existUser.u_isAdmin }, process.env.SECRET_KEY);
                res.json({ message: "okk", token: token, });
            } else {
                res.json({ message: "Your password is wrong" });
            }
        } else {
            res.json({ message: "You are not a user" });
        }
    } catch (error) {
        console.log(error)
    }
})

//Update profile
route.post('/', verify, async (req, res) => {
    const updateid = req.query.updateid
    const deleteid = req.query.deleteid
    if (!req.user.isAdmin || req.user.id===updateid) {
        if (req.query.updateid) {
            if (req.body.u_password) {
                req.body.u_password = crypto.AES.encrypt(req.body.u_password, process.env.SECRET_KEY).toString();
            }
            try {
                const updateUser = await User.findOneAndUpdate({ _id: updateid }, { $set: req.body }, { new: true });
                if (updateUser) {
                    res.json({ updateUser })
                } else {
                    res.json("Not updated");
                }
            } catch (error) {
                console.log(error)
            }
        }
    } else {
        if (req.query.updateid) {
            try {
                const updateUser = await User.findOneAndUpdate({ _id: updateid }, { $set: req.body }, { new: true });
                if (updateUser) {
                    res.json({ updateUser })
                } else {
                    res.json("Not updated");
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const updateUser = await User.findByIdAndDelete({ _id: deleteid });
                if (updateUser) {
                    res.json({ updateUser })
                } else {
                    res.json("Not updated");
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})


module.exports = route;