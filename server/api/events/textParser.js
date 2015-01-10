
var CATEGORY_KEYWORDS = {
  'Party': 'party, dance, drink, night, bash',
  'Music': 'song, performance, artist, concert, listen, album, tour, songwriter, soloist',
  //etc.
  //etc.
};

//builds a hash from CATEGORY_KEYWORDS, to provide faster lookup while screening text
//for keywords
var KEYWORD_MAP = {};
for(var category in CATEGORY_KEYWORDS){
  var keywords = CATEGORY_KEYWORDS[category].split(', ');
  keywords.forEach(function(keyword){
    KEYWORD_MAP[keyword] = category;
  });
}


module.exports = function(text){
  var times = getTimes(text);


  return {
    category: getCategory(text),
    title: text.slice(0,text.indexOf('\n')),  //will this \n slicing work? depends on the text that is passed in.
    address: getAddress(text),
    startTime: times[0],
    endTime: times[1],
    price: getPrice(text)
  };
};




function getCategory(text){
  
  var words = text.split(' ');
  //TODO: scrub punctuation from end of words.

  var categoryConfidence = {};

  words.forEach(function(word){
    var wordCategory = KEYWORD_MAP[word];
    if(wordCategory){
      categoryConfidence[wordCategory] = categoryConfidence[wordCategory] || 0;
      categoryConfidence[wordCategory]++;
    }
  });

  var selectedCategory = 'Other';
  var max = 0;

  for(var category in categoryConfidence){
    if(categoryConfidence[category] > max){
      max = categoryConfidence[category];
      selectedCategory = category;
    }
  }

  return selectedCategory;
}



function getPrice(text){
 

  var dollarSignIndex = text.indexOf('$');
  var price;

  if(dollarSignIndex !== -1){
    price = text.slice(dollarSignIndex+1,dollarSignIndex+10);
    price = price.slice(0, price.indexOf(' '));
    if('0123456789'.indexOf(price[price.length-1]) === -1){
        price = price.slice(0,price.length-1);
    }
  } else {
    //TODO: also hunt for 'dollars, bucks' and then grab the number just before it.

  }
  return(Number(price));
}

function getAddress(text){
  
  //look for address numbers - numbers of length 3 to 4, usually.
  //look for two capital letters such as CA, NY, CO
  //look for a zip code - five digit number.  goldmine!
  //look for a preponderance of commas.
  //look for Capitalized Words - the street name.
  //look for the words 'address', 'venue', etc.

  //if conflicted - i.e. there were multiple hits for some of these fields -
    //based on the index of all these things (do string.search(/regex/))
    //grab a best-guess chunk of the text.  eg. average index is 80.  slice 60 to 120.
    //then, within that chunk, search again.

  //if not conflicted - just grab stuff from the main body.
    
}

function getTimes(text){


  
}

