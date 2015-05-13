var st = require('st')
var express = require('express');
var app = express();
var dev = app.get('env') === 'development';
var postmark = require('postmark');
var mailer = new postmark.Client(process.env.POSTMARK_API_KEY);
var bodyParser = require('body-parser');

var st_conf = {
  path: dev ? 'app' :'dist',
  url: '/',
  index: 'index.html',
  passthrough: true,
};
if (dev) {
  st_conf.cache = false;
}

app.use(st(st_conf));

app.use(bodyParser.json());
app.post('/api/email', function(req, res){
  mailer.sendEmail({
    'From': process.env.MAILER_FROM || 'hello@docready.org',
    'To': req.body.recipient,
    'Subject': process.env.MAILER_SUBJECT || 'DocReady Checklist',
    'TextBody': 'Test Email'
  }, function(error, success){
    if (error) {
      res.status(500).send(error.message);
    }
    res.sendStatus(200);
  });
});

//Support old style docready links
app.get('/static/client/index.html', function(req, res){
  res.redirect('/');
});

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
  console.log('App env is ' + app.get('env'));

});