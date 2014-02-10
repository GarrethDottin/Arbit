var casper = require('casper').create({
  waitTimeout: 15000,
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
    return $('a.button:first-child')[0]
  },
  clickBuyButton: function () {
    return $('a:contains("Buy LTC")')[0]
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
  this.wait(1000, function (Highpoint) {
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

  //This evalaute only working sometimes in the current state
  //Evaluate needs to be set to a variable
  //Try doing the calculate button without the 0
  //Trydoing the calculate button with this.click and a selector instead of a function
  // also use a wait for
  var amountLtc = this.evaluate(domMunipulations.setAmount)
  this.capture('attempt1.png', {
        top: 100,
        left: 100,
        width: 500,
        height: 1000
    });
  links = this.evaluate(function() {
    return ("this part is working")
    // this.click($('a:contains("Buy LTC")')[0])
    // this.capture('attempt2.png', {
    //     top: 100,
    //     left: 100,
    //     width: 500,
    //     height: 400
    // });
  })
  this.echo(links)
  // var clickCalculate = this.evaluate(domMunipulations.clickCalculateButton)
  // var clickBuyButton = this.evaluate(domMunipulations.clickBuyButton)

  // // this.wait(500, function (clickBuyButton) {
  //     this.click(clickBuyButton)
  // // });
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