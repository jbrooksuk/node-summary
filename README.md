# node-summary
Summarizes text using a naive summarization algorithm, based off of the [Python implementation](https://gist.github.com/shlomibabluki/5473521) by [shlomibabluki](http://www.github.com/shlomibabluki).

[![Build Status](https://travis-ci.org/jbrooksuk/node-summary.png)](https://travis-ci.org/jbrooksuk/node-summary)

And now with UTF8 support, thanks to [xissy](https://github.com/xissy).

# The browser?
I've started working on a [browser branch](https://github.com/jbrooksuk/node-summary/tree/browser) which will enable the use of `node-summary` from Node.js and the browser. All tests are currently passing however I feel like some of the code should be further optimized for the client before I release it.

# Algorithm
The algorithm used is explained [here](http://thetokenizer.com/2013/04/28/build-your-own-summary-tool/). Essentially

> This algorithm extracts the key sentence from each paragraph in the text.

# Installation

    $ npm install node-summary

# Example

```javascript
var SummaryTool = require('node-summary');

var title = "Swayy is a beautiful new dashboard for discovering and curating online content [Invites]";
var content = "";
content += "Lior Degani, the Co-Founder and head of Marketing of Swayy, pinged me last week when I was in California to tell me about his startup and give me beta access. I heard his pitch and was skeptical. I was also tired, cranky and missing my kids – so my frame of mind wasn't the most positive.\n";
content += "I went into Swayy to check it out, and when it asked for access to my Twitter and permission to tweet from my account, all I could think was, \"If this thing spams my Twitter account I am going to bitch-slap him all over the Internet.\" Fortunately that thought stayed in my head, and not out of my mouth.\n";
content += "One week later, I'm totally addicted to Swayy and glad I said nothing about the spam (it doesn't send out spam tweets but I liked the line too much to not use it for this article). I pinged Lior on Facebook with a request for a beta access code for TNW readers. I also asked how soon can I write about it. It's that good. Seriously. I use every content curation service online. It really is That Good.\n";
content += "What is Swayy? It's like Percolate and LinkedIn recommended articles, mixed with trending keywords for the topics you find interesting, combined with an analytics dashboard that shows the trends of what you do and how people react to it. I like it for the simplicity and accuracy of the content curation.\n"; 
content += "Everything I'm actually interested in reading is in one place – I don't have to skip from another major tech blog over to Harvard Business Review then hop over to another major tech or business blog. It's all in there. And it has saved me So Much Time\n\n";
content += "After I decided that I trusted the service, I added my Facebook and LinkedIn accounts. The content just got That Much Better. I can share from the service itself, but I generally prefer reading the actual post first – so I end up sharing it from the main link, using Swayy more as a service for discovery.\n";
content += "I'm also finding myself checking out trending keywords more often (more often than never, which is how often I do it on Twitter.com).\n\n\n";
content += "The analytics side isn't as interesting for me right now, but that could be due to the fact that I've barely been online since I came back from the US last weekend. The graphs also haven't given me any particularly special insights as I can't see which post got the actual feedback on the graph side (however there are numbers on the Timeline side.) This is a Beta though, and new features are being added and improved daily. I'm sure this is on the list. As they say, if you aren't launching with something you're embarrassed by, you've waited too long to launch.\n";
content += "It was the suggested content that impressed me the most. The articles really are spot on – which is why I pinged Lior again to ask a few questions:\n";
content += "How do you choose the articles listed on the site? Is there an algorithm involved? And is there any IP?\n";
content += "Yes, we're in the process of filing a patent for it. But basically the system works with a Natural Language Processing Engine. Actually, there are several parts for the content matching, but besides analyzing what topics the articles are talking about, we have machine learning algorithms that match you to the relevant suggested stuff. For example, if you shared an article about Zuck that got a good reaction from your followers, we might offer you another one about Kevin Systrom (just a simple example).\n";
content += "Who came up with the idea for Swayy, and why? And what's your business model?\n";
content += "Our business model is a subscription model for extra social accounts (extra Facebook / Twitter, etc) and team collaboration.\n";
content += "The idea was born from our day-to-day need to be active on social media, look for the best content to share with our followers, grow them, and measure what content works best.\n";
content += "Who is on the team?\n";
content += "Ohad Frankfurt is the CEO, Shlomi Babluki is the CTO and Oz Katz does Product and Engineering, and I [Lior Degani] do Marketing. The four of us are the founders. Oz and I were in 8200 [an elite Israeli army unit] together. Emily Engelson does Community Management and Graphic Design.\n";
content += "If you use Percolate or read LinkedIn's recommended posts I think you'll love Swayy.\n";
content += "Want to try Swayy out without having to wait? Go to this secret URL and enter the promotion code thenextweb . The first 300 people to use the code will get access.\n";
content += "Image credit: Thinkstock";

SummaryTool.summarize(title, content, function(err, summary) {
	if(err) console.log("Something went wrong man!");

	console.log(summary);

	console.log("Original Length " + (title.length + content.length));
	console.log("Summary Length " + summary.length);
	console.log("Summary Ratio: " + (100 - (100 * (summary.length / (title.length + content.length)))));
});
```

The output of the above is:

```
Swayy is a beautiful new dashboard for discovering and curating online content [Invites]
I like it for the simplicity and accuracy of the content curation.

I can share from the service itself, but I generally prefer reading the actual post first – so I end up sharing it from the main link, using Swayy more as a service for discovery.. 
The idea was born from our day-to-day need to be active on social media, look for the best content to share with our followers, grow them, and measure what content works best.

Original Length 4364
Summary Length 515
Summary Ratio: 88.19890009165903
```

# Usage

    summary.summarize(title, content, function(err, summary) {
    	if(err) {
    		console.log("There was an error."); // Need better error reporting
    	}

    	console.log(summary);
    });

    summary.getSortedSentences(content, 5, function(err, sorted_sentences) {
        if(err) {
            console.log("There was an error."); // Need better error reporting
        }

        console.log(sorted_sentences);
    });

# Tests

	$ npm test

Tests are conducted using [mocha](https://npmjs.org/package/mocha) and [should](https://npmjs.org/package/should).

# Forks
- [node-sumparticles](https://github.com/philplckthun/node-sumuparticles) - A webarticle summarizer by @philplckthun.

# License
MIT - [http://jbrooksuk.mit-license.org](http://jbrooksuk.mit-license.org)


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/jbrooksuk/node-summary/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[![Support via Gittip](https://rawgithub.com/twolfson/gittip-badge/0.2.0/dist/gittip.png)](https://www.gittip.com/jbrooksuk)
