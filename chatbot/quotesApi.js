const mongoose = require(`mongoose`)
const Quote = mongoose.model(`Quote`)

function addQuote(sender, quote) {
  const newQuote = new Quote({
    quote,
    createdByUsername: sender.username,
    createdByUserId: sender.userId,
  })
  newQuote.save()
}
function getQuote() {}
function removeQuote() {}

module.exports = {
  addQuote,
  getQuote,
  removeQuote,
}
