//
//
//


var casper = require('casper').create();

casper.start('https://btc-e.com/exchange/ltc_btc');

casper.then(function() {
  var currentPrice = this.evaluate(function() {
    return document.querySelector('#orders_1 .table tr:nth-child(2) td:first-child').textContent;
  });

  var currentVolume = this.evaluate(function() {
    return document.querySelector('#orders_1 .table tr:nth-child(2) td:nth-child(2)').textContent;

  });
  this.echo("The price is " + currentVolume);
  this.echo("The volume at that price " + currentVolume)

});


casper.run();
