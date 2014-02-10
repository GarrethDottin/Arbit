//store variable holding the amount of litecoin we have COM
//Look into loading a module
//Grab the id field I need COM
//set the value to the variable COM
//Take a picture of it COM
//Input the field values and take a picture COM
//Save the field value as a function COM
//Click the buy button
//Compile Code
//Look into modules
//Buy Bitcoin
var casper = require('casper').create();
casper.start('https://btc-e.com/exchange/ltc_btc');

function phrase (){
  return 5;
};
casper.then(function(){
  this.evaluate(function(phrase) {
        document.getElementById('b_btc').value = phrase();
    }, phrase);
  var currentBuyingPrice = this.evaluate(function() {
  return document.querySelector('b_btc').value;
  });
  this.echo("currentBuyingPrice: " + currentBuyingPrice)
});

casper.then(function() {
  // this.click('table.inblock.tabla2 .button:nth-child(1)');
  // });

  this.evaluate(function(){
    $('table.inblock.tabla2 .button:nth-child(1)').click()
  });

});
casper.then(function(){
  this.captureSelector('btc2.png', '#content');
});
casper.run();




