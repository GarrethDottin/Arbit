var casper = require('casper').create({
  waitTimeout: 15000,
  logLevel: "debug",
  verbose: true,
  pageSettings: {
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.10 (KHTML, like Gecko) Chrome/23.0.1262.0 Safari/537.10',
  }
  //, clientScripts: ['jquery-1.11.0.min.js']
});
var customizedVariables = {
  Highpoint: null,
  currentTime: 0,
  timer: 5000,
  readytoBuy: true,
  priceDrop: .1,
  aggregatedHighpoints: [],
  ltcPrice : null,
  buyingprice: null,
}

var domMunipulations = {
  grabLTCBuyValue: function () {
    return $('.table:first-child .order:nth-child(2) td:first-child')[0].innerHTML;
  },
  setAmount: function() {
    return $('.tabla2 tr td:nth-child(2) #b_btc').val(5)
  },
  clickCalculateButton: function() {
    return ex_calculate('buy', 10);
  },

  clickBuyButton: function () {
    return ex_trade('buy', 10);
  },

  setSellAmount: function() {
    return $('#s_btc').val(5)
  },

  clickSellButton: function () {
    return ex_trade('sell', 10);
  }
}

casper.start('https://btc-e.com/exchange/ltc_btc'); //+++ change the url

casper.on('complete.error', function(err) {
    this.die("Complete callback has failed: " + err);
});


casper.then(function (currentTime) {
  for (customizedVariables.currentTime = 0; customizedVariables.currentTime < customizedVariables.timer; customizedVariables.currentTime++) {
    this.waitFor(function check() {
      // return this.grabLTCBuyValue();
      return this.buyLTC();
    });
  }
});

// functions to grab value
casper.grabLTCBuyValue = function (Highpoint) {
  this.wait(10000, function (Highpoint) {
    customizedVariables.ltcPrice = this.evaluate(domMunipulations.grabLTCBuyValue);
    this.checkLTCHighpoint(customizedVariables.ltcPrice );
  });
  return true;
};

// function to check values
casper.checkLTCHighpoint = function (ltcPrice) {
  if (customizedVariables.ltcPrice > customizedVariables.Highpoint) {
    customizedVariables.Highpoint = customizedVariables.ltcPrice;
    customizedVariables.aggregatedHighpoints.push(customizedVariables.Highpoint);
  }
  this.buyorSell();
};

casper.buyorSell = function (ltcPrice, readytoBuy) {
  if (customizedVariables.readytoBuy === true) {
    this.checktoBuy(customizedVariables.ltcPrice, customizedVariables.Highpoint);
  } else {
    this.checktoSell();
  }
};

casper.checktoBuy = function (ltcPrice,Highpoint, priceDrop) {
  var percentChange = 1 - customizedVariables.priceDrop;
  if (customizedVariables.Highpoint * percentChange >= customizedVariables.ltcPrice) {
    customizedVariables.readytoBuy = false;
    customizedVariables.buyingprice = customizedVariables.ltcPrice;
    casper.buyLTC();
  }
};

// Function to buy
casper.buyLTC = function () {
  this.echo("buy function is hit")
  var amountLtc = this.evaluate(domMunipulations.setAmount)
  var caclulateTotal = this.evaluate(domMunipulations.clickCalculateButton)
// var caclulateTotal = this.evaluate(domMunipulations.clickCalculateButton)
  this.wait(2000, function() {
    this.capture("attempt3.png",  {
      top: 100,
      left: 100,
      width: 500,
      height: 1000
    })
    this.die()
  });
    return true

  // var caclulateTotal = this.evaluate(domMunipulations.clickCalculateButton)
  // var clickBuyButton = this.evaluate(domMunipulations.clickBuyButton)
};

casper.checktoSell = function () {
  sellingPriceafterFees = (customizedVariables.buyingprice / .998) * 1.002
  if (customizedVariables.readytoBuy === false) {
    if(customizedVariables.ltcPrice >  sellingPriceafterFees) {
      this.sellLTC();
    };
  }
}

// Function to sell
casper.sellLTC = function () {
  var setSellAmount = this.evaluate(domMunipulations.setSellAmount)
  var sellLtc = this.evaluate(domMunipulations.clickSellButton)
};
casper.run();


// Mock Trading
// -Record the point we bought in a hash  with a timestamp
// -
// -


//Issues:
  // I. Jquery implementation
  // II. waitfor issue
//    A.  Think its something to do with my loop
//    B. Why does my wait need a return true
// -Cannot click on buy button
// -Why is my jquery not evaluating
// -this.wait isnt working when I nest Functions
// -Setup CSV file to export
// -Setup Mock Trading
