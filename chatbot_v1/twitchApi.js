const axios = require(`axios`)

let ACCESS_TOKEN = ``
let EXPIRATION = 0

async function getAuthToken() {
  if (!ACCESS_TOKEN || Date.now() >= EXPIRATION) {
    const { access_token, expires_in } = await getFreshAuthToken()
    ACCESS_TOKEN = access_token
    // Set expiration to one minute before actual expiration, just to be safe
    EXPIRATION = Date.now() + expires_in * 1000 - 60 * 1000
  }
  return ACCESS_TOKEN
}
function getFreshAuthToken() {
  return axios({
    method: `POST`,
    url: `https://id.twitch.tv/oauth2/token?client_id=${process.env.API_CLIENT_ID}&client_secret=${process.env.API_CLIENT_SECRET}&grant_type=client_credentials`,
  }).then(({ data }) => data)
}
async function getStreamData(username = `verygooddev`) {
  return axios({
    method: `GET`,
    url: `https://api.twitch.tv/helix/streams?user_login=${username}`,
    headers: {
      Authorization: `Bearer ${await getAuthToken()}`,
      'Client-ID': process.env.API_CLIENT_ID,
    },
  }).then(({ data, ...res }) => {
    // TODO: Headers include data on how many requests left for this endpoint. Implement something that uses that info
    console.log({ headers: res.headers, timestamp: Date.now(), data })
    return data
  })
}

module.exports = {
  getStreamData,
}
