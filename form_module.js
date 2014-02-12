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
    this.wait(4000, function () {
      this.capture("attempt11.png", {
        top: 0,
        left: 300,
        width: 1000,
        height: 2000
      })
      this.echo('POSTED it.');
    })
});


casper.run(function() {
    this.echo('message sent').exit();
});



// casper.then(function() {
//   this.click('p a');
// });

