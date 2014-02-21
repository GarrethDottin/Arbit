var casper = require('casper').create({
  waitTimeout: 15000,
  logLevel: "debug",
  verbose: true,
  pageSettings: {
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.10 (KHTML, like Gecko) Chrome/23.0.1262.0 Safari/537.10',
  }
});
var customizedVariables = {
  Highpoint: 0,
  currentTime: 0,
  timer: 5,
  readytoBuy: true,
  priceDrop: .1,
  aggregatedHighpoints: [],
  ltcPrice : 0,
  buyingprice: 0,
  aggregatedBuyingpoints: {},
  sellingPriceafterFees: 0,
  buySellvalues: {},
  ltcbuyCounter: 2,
}

var domMunipulations = {
  Username: function () {
    return $('#email').val('garreth.dottin@gmail.com')
    // val('p:R3@ch@M1ll10n')
  },
  password: function () {
    return $('#password').val('manchester1')
    // p:R3@ch@B1ll10n
  },

  login: function () {
    return tryLogin()
  },
  checkLTCAmount: function (num) {
    return $('.table:first-child .order:nth-child(' + num + ') td:nth-child(2)')[0].innerHTML;
  },
  grabLTCBuyValue: function (num) {
    return $('#orders_1 .table:first-child .order:nth-child(' + num + ') td')[0].innerHTML
  },
  setAmount: function() {
    return $('.tabla2 tr td:nth-child(2) #b_btc').val(2)
  },
  clickCalculateButton: function() {
    return ex_calculate('buy', 10);
  },

  clickBuyButton: function () {
    return ex_trade('buy', 10);
  },

  setSellAmount: function() {
    return $('#s_btc').val(2)
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
      return writeToFile()
      // return this.checkLTCAmount();

    });
  }
})
  casper.checkLTCAmount = function () {
    var ltc = this.evaluate(domMunipulations.checkLTCAmount, customizedVariables.ltcbuyCounter)
    var ltc = Number(ltc)
    return this.ltcGreaterthan2(ltc)
  }

  casper.ltcGreaterthan2 = function (ltc) {
    if  (ltc > 100) {
      return casper.grabLTCBuyValue(customizedVariables.ltcbuyCounter)
    }
    else {
      customizedVariables.ltcbuyCounter++
      var ltc = this.evaluate(domMunipulations.checkLTCAmount, customizedVariables.ltcbuyCounter)
      ltc = Number(ltc)
      this.ltcGreaterthan2(ltc)
    }
  }
// functions to grab value
casper.grabLTCBuyValue = function (Highpoint, counter) {
  this.wait(5000, function (Highpoint, counter) {
    customizedVariables.ltcPrice = this.evaluate(domMunipulations.grabLTCBuyValue,    customizedVariables.ltcbuyCounter);
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
    // casper.buyLTC();
    this.echo("buying price" + customizedVariables.buyingprice)
    this.echo("Simulated Buy")
    this.simulateBuy();
  }
};

casper.simulateBuy = function () {
  this.echo("simulate buy is hit")
  var Today = new Date();
  customizedVariables.aggregatedBuyingpoints[Today] = customizedVariables.buyingprice
  this.echo("aggregatedBuyingpoints" + customizedVariables.aggregatedBuyingpoints)
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
  customizedVariables.sellingPriceafterFees = (customizedVariables.buyingprice / .998) * 1.002
  if (customizedVariables.readytoBuy === false) {
    if(customizedVariables.ltcPrice >  customizedVariables.sellingPriceafterFees) {
      // this.sellLTC();
      this.echo("Simulated Sell")
      this.simulateSell();
    };
  }
}

casper.simulateSell = function () {
 customizedVariables.buySellvalues[customizedVariables.buyingprice] = customizedVariables.sellingPriceafterFees
 this.echo(customizedVariables.buySellvalues)

}

casper.sellLTC = function () {
  var setSellAmount = this.evaluate(domMunipulations.setSellAmount)
  var sellLtc = this.evaluate(domMunipulations.clickSellButton)
};
casper.run();


var fs = require('fs');

function writeToFile() {
  var l = '';
  l += new Date(Date.now()).toISOString() + ',';
  l += customizedVariables.Highpoint;
  l += '\n';
  fs.write('log.csv', l, 'a');
};
//Issues:

  // -How can I measure the end of a session if the current time is always at the end
  // -How can I get it to add to an existing excel file
