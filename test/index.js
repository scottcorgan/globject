var globject = require('../');
var test = require('tape');
var obj = globject({
  '**value': 'value',
  '**/index.html': 'about.html'
});

test('it partially applies the globbing function', function (t) {
  t.equal(typeof obj, 'function', 'applied');
  t.end();
});

test('it gets a value from the object of globs', function (t) {
  t.equal(obj('value'), 'value', 'got value for value');
  t.equal(obj('/index.html'), 'about.html', 'got value for index.html');
  t.end();
});

test('returns undefined if no matches found', function (t) {
  t.equal(obj('nothing'), undefined, 'no match for nothing');
  t.end();
});

test('undefined routes object', function (t) {
  var obj = globject();
  t.equal(obj('nothing'), undefined, 'no match with no routes');
  t.end();
});

test('matches all routes with extension', function (t) {
  var routes = globject({
    '**/*.html': 'index.html',
    '**/*.jpg': 'default.jpg'
  });
  
  test('files', function (t) {
    t.equal(routes('some/dir/about.html'), 'index.html', 'sub directory mapped to index.html');
    t.equal(routes('/some/dir/about.html'), 'index.html', 'sub directory with leading slash mapped to index.html');
    t.equal(routes('/about.html'), 'index.html', 'file with leading slash mapped to index.html');
    t.equal(routes('about.html'), 'index.html', 'file mapped to index.html');
    t.end();
  });
  
  test('images', function (t) {
    t.notEqual(routes('/image.jpg'), 'index.html', 'image matching');
    t.notEqual(routes('sub/dir/image.jpg'), 'index.html', 'image matching in sub directory');
    t.equal(routes('/image.jpg'), 'default.jpg', 'maps any image');
    t.end();
  });
  
  t.end();
});