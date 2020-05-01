import { convertHTMLToText, getTitle } from './helpers/html'
import { isValidUrl } from './helpers/urls'
import {
  onlyGetSentences,
  splitContentToSentences,
  splitContentToParagraphs,
  sentencesIntersection,
  formatSentence,
  getBestSentence,
  getSortedSentences,
  getSentencesRanks,
} from './helpers/summarizer'

const request = require('request')

exports.summarizeFromUrl = function (url, callback) {
  var summaryToolContext = this
  if (isValidUrl(url)) {
    request.get(url, function (error, response, body) {
      let title = getTitle(body)
      let text = convertHTMLToText(body)
      let content = onlyGetSentences(text)
      return summaryToolContext.summarize(
        title,
        content,
        (err, result, dict) => {
          if (err) {
            callback(err, result, dict)
          } else {
            callback(err, result, dict)
          }
        }
      )
    })
  } else {
    callback(
      true,
      'Not a valid url. Please try passing a valid url like https://example.com/.'
    )
  }
}

exports.summarize = (title, content, callback, sentences_dict) => {
  var summary = [],
    paragraphs = [],
    sentence = '',
    err = false
  if (arguments.length < 3) {
    if (content.constructor === Function) {
      callback = content
      content = title
      title = ''
    }
  }
  getSentencesRanks(
    content,
    dict => {
      splitContentToParagraphs(content, paragraphs => {
        summary.push(title) // Store the title.

        paragraphs.forEach(p => {
          getBestSentence(p, dict, sentence => {
            if (sentence) summary.push(sentence)
          })
        })

        // If we only have a title, then there is an issue.
        if (sentence.length === 2) err = true
        callback(err, summary.join('\n'), dict)
      })
    },
    sentences_dict
  )
}

exports.getSortedSentences = (content, n, callback, sentences_dict) => {
  if (typeof n === 'function') {
    callback = n
    n = 0
  }

  getSentencesRanks(
    content,
    dict => {
      getSortedSentences(content, dict, n, sorted_sentences => {
        if (sorted_sentences === '') {
          callback(new Error('Too short to summarize.'))
        } else {
          callback(null, sorted_sentences, dict)
        }
      })
    },
    sentences_dict
  )
}
