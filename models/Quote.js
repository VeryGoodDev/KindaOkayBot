const mongoose = require(`mongoose`)

mongoose.Promise = global.Promise

const quoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    trim: true,
    required: `You can't add a quote without the text of the quote!`,
  },
  createdByUsername: {
    type: String,
    trim: true,
    required: `Somehow user info wasn't provided for the viewer who created the quote???`,
  },
  createdByUserId: {
    type: String,
    trim: true,
    required: `Somehow user info wasn't provided for the viewer who created the quote???`,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
})

quoteSchema.plugin(require(`mongoose-fuzzy-searching`), { fields: [`quote`] })

// quoteSchema.pre(`save`, function presave(next) {
//   // if (!this.isModified(`quote`)) {
//   //   next()
//   //   return
//   // }
//   this.createdDate = Date.now()
//   next()
// })

module.exports = mongoose.model(`Quote`, quoteSchema)
