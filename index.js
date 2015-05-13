var st = require('st')
var express = require('express');
var app = express();

app.use(st({
  path: app.get('env') === 'development' ? 'app' :'dist',
  url: '/',
  index: 'index.html',
  passthrough: true
}));

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