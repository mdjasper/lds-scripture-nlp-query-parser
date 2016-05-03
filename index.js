let stopWords = [...require('stopWords').english, ...require('./customStopWords.js')];

let volumes = {
	'bofm': ['the book of mormon', 'book or mormon', 'bom'],
	'nt': ['the new testament', 'new testament', 'bible'],
	'ot': ['old testament', 'bible'],
	'dc-testament': ['doctrine and covenants', 'd and c', 'd & c'],
	'pgp': ['pearl of great price', 'pgp', 'moses', 'jst', 'abraham']
};

let findTerms = (phrase) => {
	//strip punctuation
	tokens = phrase.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\?]/g,"").split(' ');
	//created tokenized list of volume variants to remove
	let volumeTokens = [];
	Object.keys(volumes).forEach((volume)=>{
		return volumes[volume].forEach((variant) => {
			volumeTokens = [...volumeTokens, ...variant.split(' ')];
		})
	});
	//return tokens not in the volume variant list or the stop word list
	return tokens.filter((token)=>{
		return ![...stopWords, ...volumeTokens].includes(token);
	}).sort();
};

let findVolume = (phrase) => {
	let foundVolumes = [];
	Object.keys(volumes).forEach((volume) => {
		volumes[volume].forEach((variant) => {
			if(phrase.indexOf(variant) >= 0){
				foundVolumes.push(volume);
			}
		})
	});
	return foundVolumes;
};

let parse = (phrase = '') => {
	//lowercase and correct spelling of words in phrase
	phrase = phrase.toLowerCase();

	return {
		volume: findVolume(phrase),
		terms: findTerms(phrase)
	};
};

module.exports = {
	parse
};