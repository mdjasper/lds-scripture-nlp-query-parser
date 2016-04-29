# lds-scripture-nlp-query-parser

Takes a sentence or phrase with a query about LDS Scriptures, and returns a data object that represents the parsed query

##Example

   let parser = require('lds-scripture-nlp-query-parser');
   parser.parse('show me verses about faith from the book of mormon');

   // { volume: 'book-of-mormon', terms: [ 'faith' ] }

   parser.parse('scripture about faith and hope from the new testiment or bom');

   //{ volume: 'new-testiment', terms: [ 'faith', 'hope' ] }