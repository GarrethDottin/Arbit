//module for logging  in
var casper = require('casper').create();
casper.start('https://btc-e.com/exchange/ltc_btc');

casper.open('http://some.testserver.com/post.php', {
  method: 'post',
  data: {
      email: 'garreth.dottin@gmail.com',
      password:  'manchester1'
  },
    headers: {
        'Content-type': 'multipart/form-data'
  }
});

casper.run(function() {
    this.capture("attempt12.png", {
      top: 0,
      left: 300,
      width: 1000,
      height: 2000
    })
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

