import { convertHTMLToText, getTitle } from './helpers/html'
import {
  onlyGetSentences,
  splitContentToParagraphs,
  getBestSentence,
  getSortedSentences,
  getSentencesRanks
} from './helpers/summarizer'

export function summarizeHtml (html) {
  const title = getTitle(html)
  const text = convertHTMLToText(html)
  const content = onlyGetSentences(text)
  const { summary, cached } = summarize(content)
  return { title, summary, cached }
}

export function summarize (content, cached) {
  const dict = getSentencesRanks(content, cached)
  const paragraphs = splitContentToParagraphs(content)
  const summary = paragraphs
    .map((p) => getBestSentence(p, dict))
    .filter(s => s)
    .join('\n')

  return { summary, cached }
}

export function sortedSentences (content, n, cached) {
  if (typeof n === 'object') {
    cached = n
    n = 0
  }

  const dict = getSentencesRanks(content, cached)
  const sentences = getSortedSentences(content, dict, n)
  return { sentences, cached }
}
