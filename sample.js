//check the values of the selling price
//change to int
//Fill in the form if a certain criterium is met
//Reload the page
//PsuedoCode the

var casper = require('casper').create();
casper.start('https://btc-e.com/exchange/ltc_btc');

casper.then(function() {
  var currentBuyingPrice = this.evaluate(function() {
    return document.querySelector('#orders_1 .table tr:nth-child(2) td:first-child').textContent;
  });

  var currentLtcVol = this.evaluate(function() {
    return document.querySelector('#orders_1 .table tr:nth-child(2) td:nth-child(2)').textContent;
  });

  var currentBTCVol = this.evaluate(function() {
    return document.querySelector('#orders_1 .table tr:nth-child(2) td:first-child').textContent;
  });

  this.echo("To buy ltc the price is " + currentBuyingPrice);
  this.echo("The LTC volume at that price " + currentLtcVol)
  this.echo("The BTC volume at that price  " + currentBTCVol )

});
casper.then(function() {
  var currentSellingPrice = this.evaluate(function() {
    return document.querySelector('#orders_2 .table tr:nth-child(2) td:first-child').textContent;
  });

  var currentLtcVol = this.evaluate(function() {
    return document.querySelector('#orders_2 .table tr:nth-child(2) td:nth-child(2)').textContent;
  });

  var currentBTCVol = this.evaluate(function() {
    return document.querySelector('#orders_2 .table tr:nth-child(2) td:first-child').textContent;
  });

  this.echo("To sell ltc the price is " + currentSellingPrice);

  this.echo("The amount of LTC being sold " + currentLtcVol);

  this.echo("The amount of BTC being sold at that price " + currentBTCVol);
});

//Buy LTC
casper.then(function() {
  var ltcAmount = this.evaluate(function() {
    return document.querySelector('#b_bt').textContent;
  });

  this.evaluate(function() {
     document.querySelector('#b_btc').textContent = '5';
  });


  this.echo("value is " + this.evaluate(function() {
    return document.querySelector('#b_btc').textContent}));


  // var pricPerLTC = this.evaluate(function() {
  //   document.querySelector('#b_price').textContent = '3';
  // });


  // this.echo("the price per ltc is " + pricPerLTC);
  // this.echo("the ltcAmount i'm purchasing is " + ltcAmount);
 });


casper.run();
