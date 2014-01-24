var casper = require('casper').create();
casper.start('https://btc-e.com/exchange/ltc_btc');

casper.open('http://some.testserver.com/post.php', {
  method: 'post',
  data: {
      email: 'garreth.dottin@gmail.com',
      password:  'manchester1'
  }
});

casper.run(function() {
    this.echo('message sent').exit();
});



