import { convertHTMLToText, getTitle } from './helpers/html.js'
import { isValidUrl } from './helpers/urls.js'
import axios from 'axios'
import {
  onlyGetSentences,
  splitContentToSentences,
  splitContentToParagraphs,
  sentencesIntersection,
  formatSentence,
  getBestSentence,
  getSortedSentences as getSortedSentencesInner,
  getSentencesRanks,
} from './helpers/summarizer.js'

export const summarizeFromUrl = function (url, callback) {
  if (isValidUrl(url)) {
    axios
      .get(url)
      .then(response => {
        const body = response.data

        let title = getTitle(body)
        let text = convertHTMLToText(body)
        let content = onlyGetSentences(text)

        return summarize(title, content, (err, result, dict) =>
          callback(err, result, dict)
        )
      })
      .catch(error => {
        callback(true, 'Failed to fetch the url. Please try again later.')
      })
  } else {
    callback(
      true,
      'Not a valid url. Please try passing a valid url like https://example.com/.'
    )
  }
}

export const summarize = (title, content, callback, sentences_dict) => {
  var summary = [],
    paragraphs = [],
    sentence = '',
    err = false
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

export const getSortedSentences = (content, n, callback, sentences_dict) => {
  if (typeof n === 'function') {
    callback = n
    n = 0
  }

  getSentencesRanks(
    content,
    dict => {
      getSortedSentencesInner(content, dict, n, sorted_sentences => {
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
