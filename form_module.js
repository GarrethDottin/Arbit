var casper = require('casper').create();
casper.start('https://btc-e.com/exchange/ltc_btc');

casper.open('http://some.testserver.com/post.php', {
  method: 'post',
  data: {
      email: 'garreth.dottin@gmail.com',
      password:  'manchester1'
  }
});

casper.then(function() {
    this.echo('POSTED it.');
});

// casper.then(function() {
//     this.evaluateOrDie(function() {
//         return /message sent/.test(document.body.innerText);
//     }, 'sending message failed');
// });

casper.run(function() {
    this.echo('message sent').exit();
});

///###fill in form and then click button///
// casper.then(function() {
//   this.fill('#login', {
//     'email': 'garreth.dottin@gmail.com',
//     'password': 'manchester1'
//   }, true)

// });

// casper.then(function() {
//   this.click('p a');
// });

