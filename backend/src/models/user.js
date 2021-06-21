const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error('Please provide a valid e-mail address!')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) 
                throw new Error('Password cannot contain "password"!')
        }
    }
},
{
    timestamps: true 
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.avatar;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET);

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user)
        throw new Error('Unable to login!');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) 
        throw new Error('Unable to login!');

    return user;
};

// hash the plain text psasword before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) 
        this.password = await bcrypt.hash(this.password, 8);
    
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;