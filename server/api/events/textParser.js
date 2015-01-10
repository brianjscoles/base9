
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
  })
}


module.exports = function(text){
  return {
    category: getCategory(text),
    title: text.slice(0,70),
    address:
    startTime:
    endTime:
    price: getPrice(text)
  };
};




function getCategory(text){
  
  var words = text.split(' ');
  //TODO: scrub punctuation from end of words.

  var categoryConfidence = {};

  words.forEach(function(word){
    var categoryOfWord = KEYWORD_MAP[word];
    if(categoryOfWord){
      categoryConfidence[categoryOfWord] = categoryConfidence[categoryOfWord] || 0;
      categoryConfidence[categoryOfWord]++;
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
 

  var priceIndex = text.indexOf('$');
  if(priceIndex !== -1){
    var price = text.slice(priceIndex+1,priceIndex+10);
    price = price.slice(0, price.indexOf(' '));
    if('0123456789'.indexOf(price[price.length-1]) === -1){
        price = price.slice(0,price.length-1);
    }
  } else {
    //TODO: also hunt for 'dollars, bucks' and then grab the number just before it.

  }
  return(Number(price));
}



  // evnt.string('title', 255);
  // evnt.bigInteger('startTime', 255);
  // evnt.bigInteger('endTime', 255);
  // evnt.integer('price');
  // evnt.string('info', 2000);
  // evnt.string('category', 50);
  // evnt.string('streetAddress1', 100);
  // evnt.string('streetAddress2', 100);
  // evnt.string('city', 100);
  // evnt.string('state', 20);
  // evnt.string('zipCode', 40);
  // evnt.timestamps();



