let stopWords = [...require('stopwords').english, ...require('./customStopWords.js')];

let volumes = {
	'bofm': ['the book of mormon', 'book of mormon', 'bom', 'bofm'],
	'nt': ['the new testament', 'new testament', 'bible', 'nt'],
	'ot': ['the old testament', 'old testament', 'bible', 'ot'],
	'dc-testament': ['doctrine and covenants', 'd and c', 'd & c', 'd&c'],
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
		testaments: findVolume(phrase),
		terms: findTerms(phrase)
	};
};

module.exports = {
	parse
};
