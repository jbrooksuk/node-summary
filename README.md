# Node-Summary
Summarizes text using a naive summarization algorithm, based off of the [Python implementation](https://gist.github.com/shlomibabluki/5473521) by [shlomibabluki](http://www.github.com/shlomibabluki).

# Installation
    $ npm install node-summary

# Example

For now, check out `tests\summary.js`.

# Usage

    summary.getSentenceRanks(content) // sentence_ranks
    // => Object

    summary.getSummary(title, content, sentence_ranks)
    // => String
