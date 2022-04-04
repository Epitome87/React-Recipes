const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Defines the shape of a User model
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a user name'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid!');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (value.includes('password')) {
          throw new Error('Password cannot contain the phrase "password"');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    image: {
      type: String,
      required: false,
      default: 'https://avatars.githubusercontent.com/u/3253714?s=400&v=4',
    },
    favoriteMeals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.virtual('recipes', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'author',
});

// This function is available on an instance of a User
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = jwt.sign({ _id: user._id.toString() }, process.env.AUTH_SECRET);

  user.tokens.push({ token });
  await user.save();

  return token;
};

// We can use the toJSON method to alter how our Model is sent through res.send()
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  // We want to remove the password and tokens fields from the User
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// This function is available on the User model itself
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  // No User with this email was found
  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  // Password incorrect?
  if (!isMatch) {
    throw new Error('Unable to login');
  }

  // User's exmail exists and provided passwords match!
  return user;
};

// Hash the plain-text password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
