const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema(
  {
    board: { type: String, required: true, max: 100 },
    text: { type: String, required: true, max: 140 },
    delete_password: { type: String, required: true, max: 100 },
    reported: { type: Boolean },
    replies: [{ type: Schema.ObjectId, ref: 'Reply' }]
  },
  { timestamps: true }
);

ThreadSchema.pre('save', function(next) {
  this.delete_password = bcrypt.hashSync(
    this.delete_password,
    bcrypt.genSaltSync(10)
  );
  next();
});

ThreadSchema.methods.authenticate = function(delete_password) {
  return bcrypt.compareSync(delete_password, this.delete_password);
};

module.exports = mongoose.model('Thread', ThreadSchema);
