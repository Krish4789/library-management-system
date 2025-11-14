const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: '7d' }
  );
};

userSchema.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid credentials');
  }
  return user;
};

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  return user;
};

module.exports = mongoose.model('User', userSchema);