const { Router } = require('express');
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const router = Router();

// api/user/register
router.post(
    '/register', 
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Password is too short. Min characters: 6')
            .isLength({min: 6})
    ],
    async (req, res)  => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                status: 'error',
                errors: errors.array(), 
            })
        }

        const {email, password } = req.body;

        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.status(409).json({ 
                status: 'error',
                errors: ['User with this email already exists'],
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword})

        await user.save();

        res.status(201).json({ 
            status: 'ok',
            message: `User with emial ${email} created`
        })
    } catch (e) {
        res.status(500).json({ 
            errors: [`Something happed to server. More: ${e.message}`]
        })
    }
})

// api/user/login
router.post(
    '/login', 
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res)  => {
        try {
            const errors = validationResult(req);
    
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    status: "error",
                    errors: errors.array(), 
                })
            }

            const {email, password } = req.body;

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({
                    status: "error",
                    errors: ["No user with this email"]
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({
                    status: "error",
                    errors: ["Wrong login or password"]
                })
            }

            const token = jwt.sign(
                { userId: user.id }, 
                config.get('jwtKey'),
                {expiresIn : '1h'}
            )

            res.status(200).json({ status: 'ok', message: `User with email ${email} authorized`, token, userId: user.id })
        } catch (e) {
            res.status(500).json({ status: 'error', errors: [`Something happed to server. More: ${e.message}`] })
        }
})


module.exports = router;