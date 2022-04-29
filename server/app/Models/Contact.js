const mongoose = require('mongoose')

const contactSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a contact name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email address'],
    },
    mobile: {
      type: Number,
      required: [true, 'Please add a mobile number'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Contact', contactSchema)
