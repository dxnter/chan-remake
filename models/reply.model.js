const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const ReplySchema = new Schema(
  {
    thread_id: { type: Schema.Types.ObjectId, ref: 'Thread' },
    text: { type: String, required: true, max: 100 },
    delete_password: { type: String, required: true, max: 100 },
    reported: { type: Boolean }
  },
  { timestamps: true }
);

ReplySchema.pre('save', function(next) {
  this.delete_password = bcrypt.hashSync(
    this.delete_password,
    bcrypt.genSaltSync(10)
  );
  next();
});
// Custom mongoose method
ReplySchema.methods.authenticate = function(delete_password) {
  return bcrypt.compareSync(delete_password, this.delete_password);
};

module.exports = mongoose.model('Reply', ReplySchema);
