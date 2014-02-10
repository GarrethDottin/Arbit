var casper = require('casper').create({
  waitTimeout: 15000,
  stepTimeout: 10000,
  // logLevel: "debug",
  verbose: true,
  pageSettings: {
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.10 (KHTML, like Gecko) Chrome/23.0.1262.0 Safari/537.10',
  },
  clientScripts: ['jquery-1.11.0.min.js']
});
var customizedVariables = {
  Highpoint: null,
  currentTime: 0,
  timer: 5000,
  readytoBuy: true,
  priceDrop: .1,
  aggregatedHighpoints: []
}

var domMunipulations = {
  getValue: function () {
    return $('.table:first-child .order:nth-child(2) td:first-child')[0].innerHTML;
  }
}

casper.start('https://btc-e.com/exchange/ltc_btc'); //+++ change the url

casper.then(function (currentTime) {
  for (customizedVariables.currentTime = 0; customizedVariables.currentTime < customizedVariables.timer; customizedVariables.currentTime++) {
    this.waitFor(function check() {
      return this.grabLTCValue();
    });
  }
});


// functions to grab value
casper.grabLTCValue = function (Highpoint) {
  this.wait(1000, function (Highpoint) {
    var ltc = this.evaluate(domMunipulations.getValue);

    this.echo('this is hit');
    this.echo(ltc);

    var ltcPrice = 0;
    this.checkLTCHighpoint(ltcPrice);
  });

  return true;
};

casper.buyorSell = function (ltcPrice, readytoBuy) {
  if (customizedVariables.readytoBuy === true) {
    this.checktoBuy(ltcPrice, customizedVariables.Highpoint);
  } else {
    this.sellLTC();
  }
};

// function to check values
casper.checkLTCHighpoint = function (ltcPrice) {
  if (ltcPrice > customizedVariables.Highpoint) {
    customizedVariables.Highpoint = ltcPrice;
    customizedVariables.aggregatedHighpoints.push(customizedVariables.Highpoint);
  }
  this.buyorSell();
};


// Function to trigger buying
casper.checktoBuy = function (ltcPrice,Highpoint, priceDrop) {
  var percentChange = 1 - customizedVariables.priceDrop;
  if (customizedVariables.Highpoint * percentChange >= ltcPrice) {
    customizedVariables.readytoBuy = false;
    casper.buyLTC();
  }
};
// Function to buy
casper.buyLTC = function () {
  // fill in the form
  this.echo('would be buying LTC at this point');
  // lastBuyPrice = getPrice();
};

// Function to sell
casper.sellLTC = function () {
  // fill out form currentTime
  this.echo('would be selling LTC at this point');
};



casper.run();