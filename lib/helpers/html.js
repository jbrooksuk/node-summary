const cheerio = require('cheerio')
const htmlToText = require('html-to-text')

exports.convertHTMLToText = function (body) {
  return htmlToText.fromString(body.toString(), {
    ignoreHref: true,
    ignoreImage: true,
  })
}

exports.getTitle = function (htmlBody) {
  let $ = cheerio.load(htmlBody)
  return $('title').text() || $('h1').text() || ''
}
