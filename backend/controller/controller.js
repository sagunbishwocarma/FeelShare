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
        
        
        if (!firstName) {
            return res.json({
                error: 'First Name is required'
            });
        
        }
        
        if (!lastName) {
            console.log('empty')
            return res.json({
                error: 'Last Name is required'
            });
        
        }

        if (!country) {
            return res.json({
                error: 'Country is required'
            });
        
        }

        if (!city) {
            return res.json({
                error: 'City is required'
            });
        
        }

        if (!phone) {
            return res.json({
                error: 'Phone is required'
            });
        
        }

        if (!gender) {
            return res.json({
                error: 'Gender is required'
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
        
        
        if (!firstName) {
            return res.json({
                error: 'First Name is required'
            });
        
        }
        
        if (!lastName) {
            console.log('empty')
            return res.json({
                error: 'Last Name is required'
            });
        
        }

        if (!country) {
            return res.json({
                error: 'Country is required'
            });
        
        }

        if (!city) {
            return res.json({
                error: 'City is required'
            });
        
        }

        if (!phone) {
            return res.json({
                error: 'Phone is required'
            });
        
        }

        if (!gender) {
            return res.json({
                error: 'Gender is required'
            });
        
        }

        if (!password || password.length < 8) {
            return res.json({
                error: 'Password should be 8 characters long'
            });
        
        }

        const emailExist = await Professional.findOne({email});
        if(emailExist) {
            return res.json({
                error: 'Email already exist'
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


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

    
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
                    type: user.type,
                    token,
                });
            } else {
                return res.json({
                    error: 'Password does not match',
                });
            }
        }

        
        const professional = await Professional.findOne({ email });
        if (professional) {
            const professionalMatch = await comparePassword(password, professional.password);
            if (professionalMatch) {
                
                const token = jwt.sign(
                    { userId: professional._id, userName: professional.firstName, type: professional.type },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                );

                
                res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

                return res.json({
                    success: true,
                    message: 'Login successful',
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

module.exports = {
    test,
    registerUser,
    registerProfessional,
    loginUser
}