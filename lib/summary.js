var _ = require('underscore');

function splitContentToSentences(content) {
	content = content.replace("\n", ". ");
	return content.match(/(.+?\.(?:\s|$))/g);
}

function splitContentToParagraphs(content) {
	return content.split("\n\n");
}

function sentencesIntersection(sent1, sent2) {
	var s1 = sent1.split(" ");
	var s2 = sent2.split(" ");

	if((s1.length + s2.length) === 0) return 0;

	var intersect = _.intersection(s1, s2);
	var spliceHere = ((s1.length + s2.length) / 2);
	
	return intersect.splice(0, spliceHere).length;
}

function formatSentence(sentence) {
	return sentence.replace(/\W+/g, '');
}

function getBestSentence(paragraph, sentences_dict) {
	var sentences = splitContentToSentences(paragraph);

	if (sentences.length < 2) return "";

	var best_sentence = "", max_value = 0, strip_s;
	_.each(sentences, function(s) {
		strip_s = formatSentence(s);
		if(strip_s) {
			if(sentences_dict[strip_s] > max_value) {
				max_value = sentences_dict[strip_s];
				best_sentence = s;
			}
		}
	});

	return best_sentence;
}

exports.getSentencesRanks = function(content) {
	var sentences = splitContentToSentences(content);
	var n = sentences.length;

	// This is ugly, I know.
	var values = [];
	var val = [];
	_.each(_.range(n), function(x) {
		val = [];
		_.each(_.range(n), function(y) {
			val.push(0);
		});
		values.push(val);
	});
	_.each(_.range(0, n), function(i) {
		_.each(_.range(0, n), function(j) {
			values[i][j] = sentencesIntersection(sentences[i], sentences[j]);
		});
	});

	// Build sentence score dictionary
	var sentences_dict = {}, score = 0;
	_.any(_.range(0, n), function(i) {
		score = 0;
		_.any(_.range(0, n), function(j) {
			if(i !== j) score += values[i][j];
		});
		sentences_dict[formatSentence(sentences[i])] = score;
	});
	
	return sentences_dict;
}

exports.getSummary = function(title, content, sentences_dict) {
	var paragraphs = splitContentToParagraphs(content);

	var summary = [];
	summary.push(title);
	summary.push("");

	var sentence;
	_.each(paragraphs, function(p) {
		sentence = getBestSentence(p, sentences_dict);
		if(sentence) summary.push(sentence);
	});

	return summary.join("\n");
}