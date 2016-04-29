let stopWords = [...require('stopWords').english, ...require('./customStopWords.js')];

let volumes = {
	'book-of-mormon': ['the book of mormon', 'bom'],
	'new-testament': ['the new testament', 'new testament'],
	'old-testament': ['old testament'],
	'doctrine-and-covenants': ['doctrine and covenants', 'd and c', 'd & c']
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
	let foundVolume = '';
	Object.keys(volumes).forEach((volume) => {
		volumes[volume].forEach((variant) => {
			if(phrase.indexOf(variant) >= 0){
				foundVolume = volume;
			}
		})
	});
	return foundVolume;
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