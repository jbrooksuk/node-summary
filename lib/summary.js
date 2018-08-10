import unfluff from 'unfluff'
import {
  splitContentToParagraphs,
  getBestSentence,
  getSortedSentences,
  getSentencesRanks
} from './helpers/summarizer'

export function summarizeHtml (html, lang = 'en') {
  const data = unfluff(html, lang)
  const { text } = data
  const { summary, cached } = summarize(text)
  return Object.assign(data, { summary, cached })
}

export function summarize (content, cached) {
  const dict = getSentencesRanks(content, cached)
  const paragraphs = splitContentToParagraphs(content)
  const summary = paragraphs
    .map((p) => getBestSentence(p, dict))
    .filter(s => s)
    .join('\n\n')

  return { summary, cached: dict }
}

export function sortedSentences (content, n, cached) {
  if (typeof n === 'object') {
    cached = n
    n = 0
  }

  const dict = getSentencesRanks(content, cached)
  const sentences = getSortedSentences(content, dict, n)
  return { sentences, cached: dict }
}
