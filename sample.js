//check the values of the selling price
//change to int
//Fill in the form if a certain criterium is met
//Reload the page


var casper = require('casper').create();
casper.start('https://btc-e.com/exchange/ltc_btc');

casper.then(function() {
  var currentSellingPrice = this.evaluate(function() {
    return document.querySelector('#orders_1 .table tr:nth-child(2) td:first-child').textContent;
  });

  var currentLtcVol = this.evaluate(function() {
    return document.querySelector('#orders_1 .table tr:nth-child(2) td:nth-child(2)').textContent;

  });

  this.echo("The price is " + currentSellingPrice);
  this.echo("The LTC volume at that price " + currentLtcVol)
  this.echo("the ")

});
casper.then(function() {
  f


})



casper.run();
