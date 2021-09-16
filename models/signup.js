const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('config');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function () {
        const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
};

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const passHash = await bcrypt.hash(this.password, 10);
        this.password = passHash;
        // this.confirmPassword = undefined;
    }
    next();
});

const SignUp = new mongoose.model('signup', userSchema);

module.exports = SignUp;