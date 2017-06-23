'use strict';
require('newrelic');
var st = require('st');
var express = require('express');
var fs = require('fs');
var cons = require('consolidate');
var hbs = require('handlebars');
var app = express();
var dev = app.get('env') === 'development';
var config = require('./data/config.json');
var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var bodyParser = require('body-parser');
var conversion = require('phantom-html-to-pdf')();

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
cons.requires.handlebars = hbs;
cons.requires.handlebars.registerHelper('math', function(lvalue, operator, rvalue) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        '+': lvalue + rvalue,
        '-': lvalue - rvalue,
        '*': lvalue * rvalue,
        '/': lvalue / rvalue,
        '%': lvalue % rvalue
    }[operator];
});
app.set('views', './views');
app.engine('hbs', cons.handlebars);
app.set('view engine', 'hbs');

/**
 * Checklist exports
 */
app.use(bodyParser.json());
app.post('/api/email', function(req, res){
  req.body.permalink = config.baseUrl + req.body.permalink;
  app.render('email', req.body, function(err, text){
    if (err) {
      return res.status(500).send(err.message);
    }
    var from_email = new helper.Email(config.mailer_from);
    var to_email = new helper.Email(req.body.recipient);
    var content = new helper.Content('text/plain', text);
    var mail = new helper.Mail(from_email, config.mailer_subject, to_email, content);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request, function(error){
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
  fs.readFile('./app/styles/main.css', function(err, styles) {
    data.styles = styles.toString();
    app.render('pdf', data, function(err, html) {
      console.log(html);
      if (err) {
        return res.status(500).send(err.message);
      }
      conversion({ html: html }, function(err, pdf) {
        if (err) {
          res.status(500).send(err.message);
        }
        res.attachment('checklist.pdf');
        pdf.stream.pipe(res);
      });
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
