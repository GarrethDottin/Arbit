var casper = require('casper').create();
casper.start('https://btc-e.com/exchange/ltc_btc');


 casper.then(function() {
    this.evaluate(function() {
      document.getElementById('b_btc').value = amountLTC;
    });
});

  casper.then(function() {
    this.evaluate(function() {
      document.getElementById('b_price').value = priceLTC;
    });
  });

casper.run()
