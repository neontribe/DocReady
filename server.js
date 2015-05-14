var st = require('st')
var express = require('express');
var app = express();
var dev = app.get('env') === 'development';
var postmark = require('postmark');
var mailer = new postmark.Client(process.env.POSTMARK_API_KEY || 'dev');
var bodyParser = require('body-parser');
var conversion = require("phantom-html-to-pdf")();

var st_conf = {
  path: dev ? 'app' :'dist',
  url: '/',
  index: 'index.html',
  passthrough: true,
  cache: dev ? false : {
    content: {
      cacheControl: 'public, max-age=3600'
    }
  }
};

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

app.get('/api/pdf', function(req, res){
  conversion({ html: "<h1>Hello World</h1>" }, function(err, pdf) {
    console.log(pdf.numberOfPages);
    pdf.stream.pipe(res);
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