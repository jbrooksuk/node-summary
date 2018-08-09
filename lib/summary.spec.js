import 'should'
import fs from 'fs'
import path from 'path'
import { summarize, summarizeHtml, sortedSentences } from '..'

const content = `
Lior Degani, the Co-Founder and head of Marketing of Swayy, pinged me last week when I was in California to tell me about his startup and give me beta access. I heard his pitch and was skeptical. I was also tired, cranky and missing my kids – so my frame of mind wasn't the most positive.
I went into Swayy to check it out, and when it asked for access to my Twitter and permission to tweet from my account, all I could think was, "If this thing spams my Twitter account I am going to bitch-slap him all over the Internet." Fortunately that thought stayed in my head, and not out of my mouth.
One week later, I'm totally addicted to Swayy and glad I said nothing about the spam (it doesn't send out spam tweets but I liked the line too much to not use it for this article). I pinged Lior on Facebook with a request for a beta access code for TNW readers. I also asked how soon can I write about it. It's that good. Seriously. I use every content curation service online. It really is That Good.
What is Swayy? It's like Percolate and LinkedIn recommended articles, mixed with trending keywords for the topics you find interesting, combined with an analytics dashboard that shows the trends of what you do and how people react to it. I like it for the simplicity and accuracy of the content curation.
Everything I'm actually interested in reading is in one place – I don't have to skip from another major tech blog over to Harvard Business Review then hop over to another major tech or business blog. It's all in there. And it has saved me So Much Time

After I decided that I trusted the service, I added my Facebook and LinkedIn accounts. The content just got That Much Better. I can share from the service itself, but I generally prefer reading the actual post first – so I end up sharing it from the main link, using Swayy more as a service for discovery.
I'm also finding myself checking out trending keywords more often (more often than never, which is how often I do it on Twitter.com).


The analytics side isn't as interesting for me right now, but that could be due to the fact that I've barely been online since I came back from the US last weekend. The graphs also haven't given me any particularly special insights as I can't see which post got the actual feedback on the graph side (however there are numbers on the Timeline side.) This is a Beta though, and new features are being added and improved daily. I'm sure this is on the list. As they say, if you aren't launching with something you're embarrassed by, you've waited too long to launch.
It was the suggested content that impressed me the most. The articles really are spot on – which is why I pinged Lior again to ask a few questions:
How do you choose the articles listed on the site? Is there an algorithm involved? And is there any IP?
Yes, we're in the process of filing a patent for it. But basically the system works with a Natural Language Processing Engine. Actually, there are several parts for the content matching, but besides analyzing what topics the articles are talking about, we have machine learning algorithms that match you to the relevant suggested stuff. For example, if you shared an article about Zuck that got a good reaction from your followers, we might offer you another one about Kevin Systrom (just a simple example).
Who came up with the idea for Swayy, and why? And what's your business model?
Our business model is a subscription model for extra social accounts (extra Facebook / Twitter, etc) and team collaboration.
The idea was born from our day-to-day need to be active on social media, look for the best content to share with our followers, grow them, and measure what content works best.
Who is on the team?
Ohad Frankfurt is the CEO, Shlomi Babluki is the CTO and Oz Katz does Product and Engineering, and I [Lior Degani] do Marketing. The four of us are the founders. Oz and I were in 8200 [an elite Israeli army unit] together. Emily Engelson does Community Management and Graphic Design.
If you use Percolate or read LinkedIn's recommended posts I think you'll love Swayy.
Want to try Swayy out without having to wait? Go to this secret URL and enter the promotion code thenextweb . The first 300 people to use the code will get access.
Image credit: Thinkstock
`

describe('summarize', () => {
  it('can summarize text', () => {
    const { summary } = summarize(content)
    summary.should.equal('' +
`I like it for the simplicity and accuracy of the content curation.

I can share from the service itself, but I generally prefer reading the actual post first – so I end up sharing it from the main link, using Swayy more as a service for discovery.

The idea was born from our day-to-day need to be active on social media, look for the best content to share with our followers, grow them, and measure what content works best.`)

    const ratio = Math.trunc(100 - (100 * (summary.length / content.length)))
    content.length.should.equal(4278)
    summary.length.should.equal(424)
    ratio.should.equal(90)
  })

  it('can summarize html', () => {
    const html = fs.readFileSync(path.join(__dirname, '..', 'test', 'test1.html'))
    const { title, summary } = summarizeHtml(html)
    title.should.equal('Meet the 23-Year-Old Innovating The Nail Industry With Static Nails')
    summary.should.equal('"The best part is that these nails are non-damaging to natural nails, they can be customized without damaging the original design, they only take 5 minutes to apply, and can be worn up to 18 days, or reapplied up to 6 times.”Alexis Irene launched Static Nails on her 21st birthday, and after being in business for one week, she received a call from Kendo, the beauty brand incubator behind Ole Henriksen and Marc Jacobs Beauty.“James Vincent, a celebrity makeup artist introduced our product to tons of designers, which resulted in us doing lots of New York Fashion Week shows,” Irene said.')
  })
})

describe('getSortedSentences', function () {
  it('should get sorted sentences', function () {
    const { sentences } = sortedSentences(content, 5)
    sentences.should.deepEqual([
      'Our business model is a subscription model for extra social accounts (extra Facebook / Twitter, etc) and team collaboration.',
      'Oz and I were in 8200 [an elite Israeli army unit] together.',
      'Emily Engelson does Community Management and Graphic Design.',
      'Image credit: Thinkstock',
      'I\'m sure this is on the list.'
    ])
  })
})
