const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const minlength = [2, 'The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).'];
const maxlength = [10, 'The value of path `{PATH}` (`{VALUE}`) is longer than the maxmum allowed length ({MAXLENGTH}).'];
const pslength = [20, 'The value of path `{PATH}` (`{VALUE}`) is longer than the maxmum allowed length ({MAXLENGTH}).'];

const userSchema = new Schema({
  name: {
    type: String,
    unique: true,
    minlength,
    maxlength,
    required: true
  },
  password: {
    type: String,
    minlength,
    maxlength: pslength,
    required: true
  },
  // 0 - 注册未认证
  // 1 - 注册并认证
  // -1 - 注销
  status: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  }
})

userSchema.pre('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  if (!this.updatedAt) {
    this.updatedAt = new Date();
  }
  next();
})

userSchema.post('save', (doc) => {
  console.log(`user ${doc.name} saved success.`);
})

userSchema.post('find', (docs) => {
  console.log(`find success, all ${docs.length} data.`);
})

userSchema.post('findOne', (doc) => {
  if (doc) {
    console.log(`findOne data.`);
    console.log(doc);
  } else {
    console.log(`findOne no data.`);
  }
})

userSchema.post('count', (num) => {
  console.log(`count success, all ${num} data.`);
})

const userModel = mongoose.model('user', userSchema, 'owner_users');
module.exports = userModel;
