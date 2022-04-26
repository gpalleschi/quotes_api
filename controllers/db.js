const Constants = require('./constants');
const Utility = require('./utility');

let db = null;

const connection = () => {
	const dbFileName = Constants.DB_PATH + Constants.DB_FILENAME;
	if ( db ) return db;
	db = require('knex')({ client: 'better-sqlite3',
                               connection: {
					    filename: dbFileName
                                     }
                              });
        db.raw('select 1+1 as result').catch(err => {
	       return null;
             }).then(console.log('Db Connection OK.'));
       return db;
}

const infoQuotes = async (language, tags=[]) => {
      let ret = { error: null,
                  data: null};
      try { 
          await db.transaction(async trx => {
          await trx.raw("select language, count(distinct quote) as quotes, count(distinct author) as authors from quotes where language = '" + language + "' group by language")
            //  .where('language','=',language)
             .then( resInfo => {
		    ret.data = resInfo;
                   })
             .catch(err => {
		    ret.error = Utility.formatErr(401,'infoQuotes',err.code + ' : ' + err.message);
                   })
          })

        } catch (err) {
	  ret.error =  Utility.formatErr(401,'infoQuotes',err.code + ' : ' + err.message);
        }                  
	return ret;
}


const randomQuote = async (language='en', tags=[]) => {
      let ret = { error: null,
                  data: null};
      try { 
          await db.transaction(async trx => {
          await trx.select('quote', 'author', 'tags')
             .from('quotes')
             .where('language','=',language)
	       .orderByRaw('random() limit 1')
             .then( resQuotes => {
		    ret.data = resQuotes;
                   })
             .catch(err => {
		    ret.error = Utility.formatErr(401,'randomQuote',err.code + ' : ' + err.message);
                   })
          })

        } catch (err) {
	  ret.error =  Utility.formatErr(401,'randomQuote',err.code + ' : ' + err.message);
        }                  
	return ret;
}

const getAuthors = async (language='en', search='%%', tags=[]) => {
      let ret = { error: null,
                  data: null
                };
      const toSearch = search.replace('%20',' ');            
      try { 
          await db.transaction(async trx => {
          await trx.select('author')
             .count('quote as totQuotes')
             .from('quotes')
             .where('language','=',language)
             .whereRaw('LOWER(author) LIKE LOWER(\'' + toSearch + '\')')
             .groupBy('author')
             .orderByRaw('totQuotes desc')
             .then( resQuotes => {
		    ret.data = resQuotes;
                   })
             .catch(err => {
		    ret.error = Utility.formatErr(401,'getAuthors',err.code + ' : ' + err.message);
                   })
          })

        } catch (err) {
	  ret.error =  Utility.formatErr(401,'getAuthors',err.code + ' : ' + err.message);
        }                  
	return ret;
}

const getQuotes = async (language, author, limit=Constants.LIMIT_QUOTES, tags=[]) => {
      let ret = { error: null,
                  data: { totQuotes: 0,
                          quotes: []
                        }
                };
      const authorToSearch = author.replace('%20',' ');
      try { 
          await db.transaction(async trx => {
          await trx.select('quote','author','tags')
             .from('quotes')
             .where('language','=',language)
             .whereRaw('LOWER(author) LIKE LOWER(\'' + authorToSearch + '\')')
             .then( resQuotes => {
                   for(let j=0;j<resQuotes.length;j++) {
                      ret.data.totQuotes++;   
                      ret.data.quotes.push(resQuotes[j.toString()]);
                      if ( j+1 >= limit ) break;
                   }})
             .catch(err => {
		    ret.error = Utility.formatErr(401,'getQuotes',err.code + ' : ' + err.message);
                   })
          })

      } catch (err) {
	  ret.error =  Utility.formatErr(401,'getQuotes',err.code + ' : ' + err.message);
      }                  

	return ret;
}

module.exports = {
     connection: connection,
     randomQuote: randomQuote,
     infoQuotes: infoQuotes,
     getAuthors: getAuthors,
     getQuotes: getQuotes
};