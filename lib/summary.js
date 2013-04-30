var _ = require('underscore')
	, events = require('events')
	, eventEmitter = new events.EventEmitter();

function splitContentToSentences(content, callback) {
	content = content.replace("\n", ". ");
	callback(content.match(/(.+?\.(?:\s|$))/g));
}

function splitContentToParagraphs(content, callback) {
	callback(content.split("\n\n"));
}

function sentencesIntersection(sent1, sent2, callback) {
	var s1 = sent1.split(" ");
	var s2 = sent2.split(" ");

	if((s1.length + s2.length) === 0) {
		callback(true);
	}

	var intersect = _.intersection(s1, s2);
	var spliceHere = ((s1.length + s2.length) / 2);
	
	callback(false, intersect.splice(0, spliceHere).length);
}

function formatSentence(sentence, callback) {
	callback(sentence.replace(/\W+/g, ''));
}

function getBestSentence(paragraph, sentences_dict, callback) {
	splitContentToSentences(paragraph, function(sentences) {
		if (sentences.length < 2) return "";

		var best_sentence = "", max_value = 0, strip_s;
		_.each(sentences, function(s) {
			formatSentence(s, function(strip_s) {
				if(strip_s && sentences_dict[strip_s] > max_value) {
					max_value = sentences_dict[strip_s];
					best_sentence = s;
				}
			});
		});

		callback(best_sentence);
	});
}

function getSentencesRanks(content, callback) {
	splitContentToSentences(content, function(sentences) {
		var n = sentences.length;

		// This is ugly, I know.
		var values = [], _val = [];
		_.each(_.range(n), function(x) {
			_val = [];
			_.each(_.range(n), function(y) {
				_val.push(0);
			});
			values.push(_val);
		});
		// Assign each score to each sentence
		_.each(_.range(0, n), function(i) {
			_.each(_.range(0, n), function(j) {
				sentencesIntersection(sentences[i], sentences[j], function(err, intersection) {
					if(err) throw err;
					values[i][j] = intersection;
				});
			});
		});
		// Build sentence score dictionary
		var sentences_dict = {}, score = 0;
		_.any(_.range(0, n), function(i) {
			score = 0;
			_.any(_.range(0, n), function(j) {
				if(i !== j) score += values[i][j];
			});

			formatSentence(sentences[i], function(strip_s) {
				sentences_dict[strip_s] = score;
			});
		});

		callback(sentences_dict);
	});
}

exports.summarize = function(title, content, callback) {
	var summary = [], paragraphs = [], sentence = "", err = false;
	getSentencesRanks(content, function(dict) {
		splitContentToParagraphs(content, function(paragraphs) {
			summary.push(title); // Store the title.

			_.each(paragraphs, function(p) {
				getBestSentence(p, dict, function(sentence) {
					if(sentence) summary.push(sentence);
				});
			});
			
			// If we only have a title, then there is an issue.
			if(sentence.length === 2) err = true;
			callback(err, summary.join("\n"));
		});
	});
};