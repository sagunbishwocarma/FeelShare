const User = require('../models/user')
const Professional = require('../models/professionals')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}


// Endpoint for register
const registerUser =async (req,res) => {
    
    try {
        const {firstName, lastName, email, phone, country, city, password, gender, type} = req.body;
        
        
        if (!firstName || !lastName || !country || !city || !phone || !gender) {
            return res.json({
                error: 'Please fill all the required Fields'
            });
        
        }

        if (!password || password.length < 8) {
            return res.json({
                error: 'Password should be 8 characters long'
            });
        
        }

        const exist = await User.findOne({email});
        if(exist) {
            return res.json({
                error: 'Email already exist'
            });
        }

        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            firstName, 
            lastName, 
            email, 
            phone, 
            country, 
            city, 
            password: hashedPassword, 
            gender,
            type
        });
        
        return res.json(user)

    } catch (error) {
        console.log(error)
    }
};

// Endpoint for Professional register
const registerProfessional =async (req,res) => {
    
    try {
        const {firstName, lastName, email, phone, country, city, password, gender, type} = req.body;
        
        
        if (!firstName || !lastName || !country || !city || !phone || !gender) {
            return res.json({
                error: 'Please fill all the required Fields'
            });
        
        }
        

        const hashedPassword = await hashPassword(password)

        const professional = await Professional.create({
            firstName, 
            lastName, 
            email, 
            phone, 
            country, 
            city, 
            password: hashedPassword, 
            gender,
            type
        });
        
        return res.json(professional)

    } catch (error) {
        console.log(error)
    }
};

// Endpoint for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user is a Seeker
        const user = await User.findOne({ email });
        if (user) {
            const userMatch = await comparePassword(password, user.password);
            if (userMatch) {
                const token = jwt.sign(
                    { userId: user._id, username: user.firstName, type: user.type },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

                return res.json({
                    success: true,
                    message: 'Login successful',
                    username: user.firstName,
                    email: user.email,
                    type: user.type, 
                    token,
                });
            } else {
                return res.json({
                    error: 'Password does not match',
                });
            }
        }

        // Check if the user is a Professional
        const professional = await Professional.findOne({ email });
        if (professional) {
            const professionalMatch = await comparePassword(password, professional.password);
            if (professionalMatch) {
                const token = jwt.sign(
                    { professionalId: professional._id, username: professional.firstName, type: professional.type, email: professional.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

                return res.json({
                    success: true,
                    message: 'Login successful',
                    username: professional.firstName,
                    email: professional.email,
                    type: professional.type, 
                    token,
                });
            } else {
                return res.json({
                    error: 'Password does not match',
                });
            }
        }

        
        return res.json({
            error: 'User does not exist',
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
};

const getUserProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            res.json(user)
        })
    } else {
        res.json(null)
    }
    }
    
const getProfessionalProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, professional) => {
            res.json(professional)
        })
    } else {
        res.json(null)
    }
    }

//endpoint for logout user

const logout = (req, res) => {
    try {
        
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'strict' });

        return res.json({
            success: true,
            message: 'Logout successful',
        });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({
            success: false,
            message: 'Logout failed',
        });
    }
}






module.exports = {
    test,
    registerUser,
    registerProfessional,
    loginUser,
    getUserProfile,
    getProfessionalProfile,
    logout
}