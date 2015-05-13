var st = require('st')
var express = require('express');
var app = express();
var dev = app.get('env') === 'development';

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