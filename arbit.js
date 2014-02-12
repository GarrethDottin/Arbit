var casper = require('casper').create({
  waitTimeout: 15000,
  logLevel: "debug",
  verbose: true,
  pageSettings: {
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.10 (KHTML, like Gecko) Chrome/23.0.1262.0 Safari/537.10',
  }
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
  aggregatedBuyingpoints: {}
}

var domMunipulations = {
  Username: function () {
    return $('#email').val('')
  },
  password: function () {
    return $('#password').val('')
  },

  login: function () {
    return tryLogin()
  },

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

casper.then(function () {
  var Username = this.evaluate(domMunipulations.Username)
  var password = this.evaluate(domMunipulations.password)
  var login = this.evaluate(domMunipulations.login)
})

casper.then(function (currentTime) {
  for (customizedVariables.currentTime = 0; customizedVariables.currentTime < customizedVariables.timer; customizedVariables.currentTime++) {
    this.waitFor(function check() {
      return this.grabLTCBuyValue();
    });
  }
});

// functions to grab value
casper.grabLTCBuyValue = function (Highpoint) {
  this.wait(5000, function (Highpoint) {
    customizedVariables.ltcPrice = this.evaluate(domMunipulations.grabLTCBuyValue);
    this.echo(customizedVariables.ltcPrice)
    this.checkLTCHighpoint(customizedVariables.ltcPrice );
  });
  return true;
};

// function to check values
casper.checkLTCHighpoint = function (ltcPrice) {
  if (customizedVariables.ltcPrice > customizedVariables.Highpoint) {
    customizedVariables.Highpoint = customizedVariables.ltcPrice;
    this.echo("Highpoint" + customizedVariables.Highpoint)
    customizedVariables.aggregatedHighpoints.push(customizedVariables.Highpoint);
  }
  this.buyorSell();
};

casper.buyorSell = function (ltcPrice, readytoBuy) {
  this.echo("this is hit: buyorSell")
  if (customizedVariables.readytoBuy === true) {
    this.checktoBuy(customizedVariables.ltcPrice, customizedVariables.Highpoint);
  } else {
    this.checktoSell();
  }
};

casper.checktoBuy = function (ltcPrice,Highpoint, priceDrop) {
  this.echo("this is hit: checktoBuy")
  var percentChange = 1 - customizedVariables.priceDrop;
  if (customizedVariables.Highpoint * percentChange >= customizedVariables.ltcPrice) {
    customizedVariables.readytoBuy = false;
    customizedVariables.buyingprice = customizedVariables.ltcPrice;
    casper.buyLTC();
  }
};


casper.simulateBuy = function () {
  var Today = new Date();
  customizedVariables.aggregatedBuyingpoints[customizedVariables.buyingprice] = Today
}
// Function to buy
casper.buyLTC = function () {
  this.echo("buy function is hit")
  var amountLtc = this.evaluate(domMunipulations.setAmount)
  var caclulateTotal = this.evaluate(domMunipulations.clickCalculateButton)
  this.wait(2000, function() {
  var clickBuyButton = this.evaluate(domMunipulations.clickBuyButton)
  });
    return true
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


// var fs = require('fs');

// var writeToFile = function() {
//   var l = '';
//   l += new Date(Date.now()).toISOString() + ',';
//   l += customizedVariables.Highpoint;
//   l += '\n';
//   fs.write('log.csv', l, 'a');
// };
//Issues:
  // II. waitfor issue //issue with loading was because I was making a request every second
//    B. Why does my wait need a return true // inorder to evalaute it needs a return true statement

// -Cannot click on buy button //change the selector to the actual function
// -Why is my jquery not evaluating
// -Setup CSV file to export
// -Setup Mock Trading
