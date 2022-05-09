/**
 * @type {import('tmi.js').Events}
 */
const handlers = {
  action() {
    console.log(`action event received`)
  },
  anongiftpaidupgrade() {
    console.log(`anongiftpaidupgrade event received`)
  },
  chat() {
    console.log(`chat event received`)
  },
  cheer() {
    console.log(`cheer event received`)
  },
  connect() {
    console.log(`connect event received`)
  },
  disconnected() {
    console.log(`disconnected event received`)
  },
  giftpaidupgrade() {
    console.log(`giftpaidupgrade event received`)
  },
  join() {
    console.log(`join event received`)
  },
  part() {
    console.log(`part event received`)
  },
  raided() {
    console.log(`raided event received`)
  },
  resub() {
    console.log(`resub event received`)
  },
  subgift() {
    console.log(`subgift event received`)
  },
  submysterygift() {
    console.log(`submysterygift event received`)
  },
  subscription() {
    console.log(`subscription event received`)
  },
  whisper() {
    console.log(`whisper event received`)
  },
}
export default handlers
