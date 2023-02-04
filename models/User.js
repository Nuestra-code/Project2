const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "First name is required"]
    },

    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        validate( value ) {
            if( !validator.isEmail( value )) {
                throw new Error( 'Email is invalid' )
            }
        }
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 7,
        trim: true,
        validate(value) {
            if( value.toLowerCase().includes('password')) {
                throw new Error('password musn\'t contain password')
            }
        }
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    mobileNo: {
        type: String,
        required: [true, "Mobile Number is required"]
    }

});

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({
        _id: user._id.toString()
    },  process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

module.exports = mongoose.model("User", userSchema);