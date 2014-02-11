var casper = require('casper').create({
  // waitTimeout: 15000,
  logLevel: "debug",
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
  getLTCValue: function () {
    return $('.table:first-child .order:nth-child(2) td:first-child')[0].innerHTML;
  },
  setAmount: function() {
    return $('.tabla2 tr td:nth-child(2) #b_btc').val(5)
  },
  clickCalculateButton: function() {
    return $('a.button:first-child')[0].click()
  },
  clickBuyButton: function () {
    return $('a:contains("Buy LTC")')[0].click()
  }
}

casper.start('https://btc-e.com/exchange/ltc_btc'); //+++ change the url

casper.then(function (currentTime) {
  for (customizedVariables.currentTime = 0; customizedVariables.currentTime < customizedVariables.timer; customizedVariables.currentTime++) {
    this.waitFor(function check() {
      // return this.grabLTCValue();
      return this.buyLTC();
    });
  }
});

// functions to grab value
casper.grabLTCValue = function (Highpoint) {
  this.wait(2000, function (Highpoint) {
    var ltc = this.evaluate(domMunipulations.getLTCValue);
    this.echo('this is hit');
    this.echo(ltc);
    var ltcPrice = 0;
    this.checkLTCHighpoint(ltcPrice);
  });
  return true;
};

// function to check values
casper.checkLTCHighpoint = function (ltcPrice) {
  if (ltcPrice > customizedVariables.Highpoint) {
    customizedVariables.Highpoint = ltcPrice;
    customizedVariables.aggregatedHighpoints.push(customizedVariables.Highpoint);
  }
  this.buyorSell();
};

casper.buyorSell = function (ltcPrice, readytoBuy) {
  if (customizedVariables.readytoBuy === true) {
    this.checktoBuy(ltcPrice, customizedVariables.Highpoint);
  } else {
    this.sellLTC();
  }
};

casper.checktoBuy = function (ltcPrice,Highpoint, priceDrop) {
  var percentChange = 1 - customizedVariables.priceDrop;
  if (customizedVariables.Highpoint * percentChange >= ltcPrice) {
    customizedVariables.readytoBuy = false;
    casper.buyLTC();
  }
};

// Function to buy
casper.buyLTC = function () {
  this.echo("buy function is hit")
  //This evalaute only working sometimes in the current state
  var amountLtc = this.evaluate(domMunipulations.setAmount)
  var caclulateTotal = this.evaluate(domMunipulations.clickCalculateButton)
  var clickBuyButton = this.evaluate(domMunipulations.clickBuyButton)
};



// Function to sell
casper.sellLTC = function () {
  // fill out form currentTime
  this.echo('would be selling LTC at this point');
};
casper.run();
//Flow of Application
//Specify Casperjs details
//Start application
//check price
// check whether to buy or sell
//Check if its a highpoint
// Check whether its smart to buy
// Fill in Form to buy
//Check whether its smart to sell
// Fill in Form to sell
//Issues:
//Cannot Fill out form to buy
//Wait timeout is still causing issues
//

// -Outline Problems for Tenor
// -Get checktosell setup
// -Debugging Casperjs


// Tenor
// -Wait Timeout is causing issues why is that
//   I. Think its something to do with my loop
// -Cannot click out buy form for clicking button
// -Why is my jquery not evaluating
// -this.wait isnt working when I nest Functions
// -Setup CSV file to export
// -Setup Mock Trading
