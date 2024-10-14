import { default as cheerio } from 'cheerio'
import { default as htmlToText } from 'html-to-text'

export const convertHTMLToText = body => {
  return htmlToText.fromString(body.toString(), {
    ignoreHref: true,
    ignoreImage: true,
  })
}

export const getTitle = htmlBody => {
  let $ = cheerio.load(htmlBody)
  return $('title').text() || $('h1').text() || ''
}
