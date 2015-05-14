var st = require('st')
var express = require('express');
var cons = require('consolidate');
var app = express();
var dev = app.get('env') === 'development';
var config = require('./data/config.json');
var postmark = require('postmark');
var mailer = new postmark.Client(process.env.POSTMARK_API_KEY || 'dev');
var bodyParser = require('body-parser');
var conversion = require("phantom-html-to-pdf")();

/**
 * Static files
 */
var st_conf = {
  path: dev ? 'app' :'dist',
  url: '/',
  index: 'index.html',
  passthrough: true,
  cache: dev ? false : {
    content: {
      cacheControl: 'public, max-age=' + process.env.ST_MAX_AGE || '600'
    }
  }
};
app.use(st(st_conf));

/**
 * Templating
 */
app.set('views', './views');
app.engine('hbs', cons.handlebars)
app.set('view engine', 'hbs');

/**
 * Checklist exports
 */
app.use(bodyParser.json());
app.post('/api/email', function(req, res){
  req.body.permalink = config.baseUrl + req.body.permalink; 
  app.render('email', req.body, function(err, text){
    if (err) {
      return res.status(500).send(error.message);
    }
    mailer.sendEmail({
      'From': config.mailer_from,
      'To': req.body.recipient,
      'Subject': config.mailer_subject,
      'TextBody': text
    }, function(error, success){
      if (error) {
        res.status(500).send(error.message);
      }
      res.sendStatus(200);
    });
  });
  
});

app.get('/api/pdf', function(req, res){
  var data = JSON.parse(req.query.data);
  data.permalink = config.baseUrl + data.permalink;
  app.render('pdf', data, function(err, html){
    console.log(html);
    conversion({ html: html }, function(err, pdf) {
      if (err) {
        res.status(500).send(err.message);
      }
      //res.attachment('checklist.pdf');
      pdf.stream.pipe(res);
    });
  });
});

/**
 * Legacy Routes
 */
app.get('/static/client/index.html', function(req, res){
  res.redirect('/');
});

/**
 * Startup
 */
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
  console.log('App env is ' + app.get('env'));
});