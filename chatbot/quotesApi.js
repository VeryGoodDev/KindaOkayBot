const mongoose = require(`mongoose`)
const Quote = mongoose.model(`Quote`)

function addQuote(sender, quote) {
  const newQuote = new Quote({
    quote,
    createdByUsername: sender.username,
    createdByUserId: sender.userId,
  })
  return newQuote.save().then(savedQuote => {
    return Promise.all([savedQuote, Quote.count()])
  })
}
// function getAllQuotes() {
//   const quotes = await Quote.find()
// }
function getRandomQuote() {
  return Quote.aggregate([{ $sample: { size: 1 } }]).then(results => {
    if (results.length) return results[0]
    throw new Error(`Something went wrong while getting a random quote`)
  })
}
function getQuote(query) {
  let quote = Promise.resolve({})
  if (typeof query === `number`) {
    // If number, search by ID
    quote = Quote.find()
      .sort({ created: `asc` })
      // TODO: May need to offset by 1?
      .skip(query)
      .limit(1)
      .then(results => {
        if (results.length) return results[0]
        throw new Error(`Could not find quote number ${query}`)
      })
      .catch(err => {
        console.error(`Error getting quote by number:`, err)
        return getRandomQuote()
      })
  } else if (typeof query === `string` && query.length) {
    // If string, search by quote content
    quote = Quote.fuzzySearch(query)
      .then(matches => {
        if (matches.length) {
          // Too lazy to figure out why, but despite being logged out as part of match,
          // accessing confidenceScore directly just gives back undefined. Stringifying
          // and then parsing it seems to fix it
          const satisfactoryMatches = matches.filter(match => JSON.parse(JSON.stringify(match)).confidenceScore > 2)
          return satisfactoryMatches[Math.floor(Math.random() * satisfactoryMatches.length)]
        }
        throw new Error(`No matches for ${query}`)
      })
      .catch(err => {
        console.error(`Error doing fuzzy search in quotes:`, err)
        return getRandomQuote()
      })
  } else {
    // Otherwise, get random quote
    quote = getRandomQuote()
  }
  return quote
}
// function removeQuote(id) {
//   Quote.findOneAndDelete(
//     {}
//   )
// }

module.exports = {
  addQuote,
  getQuote,
  // removeQuote,
}
