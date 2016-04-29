var parser = require('./index.js');

let p = (phrase) => {
	console.log(parser.parse(phrase));
};

p('show me verses about faith from the book of mormon');

p('scripture about baptism in the new testament');

p('tell me about hope and charity and perhaps some faith');

p("I'd like to know more about the nephite battles in the book of mormon");

p('Do children need to be baptised?');

p('I need a spiritual thought on faith from the book of mormon');

p('please tell me about alma and amulek');

p('scripture about faith and hope from the new testament or bom');
