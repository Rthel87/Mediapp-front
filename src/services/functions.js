export default {
  extractDate (timestamp) {
    const dateTime = timestamp.split('T')
    const date = dateTime[0].split('-')
    date.reverse()
    return date.join('-')
  }
}
