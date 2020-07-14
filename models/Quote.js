const mongoose = require(`mongoose`)

mongoose.Promise = global.Promise

const quoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    trim: true,
    required: `You can't add a quote without the text of the quote!`,
  },
  createdByUsername: String,
  createdByUserId: String,
})

// quoteSchema.pre(`save`, function presave(next) {
//   if (!this.isModified(`quote`)) {
//     next()
//     return
//   }
//   this.thing = 123
//   next()
// })

module.exports = mongoose.model(`Quote`, quoteSchema)
