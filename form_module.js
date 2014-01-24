//module for filling in form

casper.then(function() {
  this.fill('#login', {
    'email': 'garreth.dottin@gmail.com',
    'password': 'manchester1'
  }, true)

});

casper.then(function() {
    this.evaluateOrDie(function() {
        return /message sent/.test(document.body.innerText);
    }, 'sending message failed');
});

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

// casper.run(function() {
//     this.echo('message sent').exit();
// });