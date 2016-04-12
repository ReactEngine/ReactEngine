var test  = require('tape-catch');
var SI    = require('seamless-immutable');
var merge = require('./merge.js');

test('raise if not immutable', function(t) {
  var items = [{
    name: 'Sara'
  }];

  function merge() {
    merge(items, items, 'id');
  }

  t.throws(merge);
  t.end();

});

test('updates an existing item', function (t) {
  var items = SI([{
    id: 1,
    name: 'Sara'
  }]);

  var moreItems = SI([{
    id: 1,
    name: 'Julia'
  }]);

  var newItems = merge(items, moreItems, 'id');

  t.ok(newItems.length === 1);
  t.ok(newItems[0].name === 'Julia');
  t.end();
});

test('updates using a given key', function (t) {
  var items = SI([{
    _id: 1,
    name: 'Sara'
  }]);

  var moreItems = SI([{
    _id: 1,
    name: 'Julia'
  }]);

  var newItems = merge(items, moreItems, '_id');

  t.ok(newItems.length === 1);
  t.ok(newItems[0].name === 'Julia');
  t.end();
});

test('adds a new item', function(t) {
  var items = SI([{
    id: 1,
    name: 'Sara'
  }]);

  var moreItems = SI([{
    id: 2,
    name: 'Julia'
  }]);

  var newItems = merge(items, moreItems, 'id');

  t.ok(newItems.length === 2);
  t.end();
});

test('adds one item', function(t) {
  var items = SI([{
    id: 1,
    name: 'Sara'
  }]);

  var item = SI({
    id: 2,
    name: 'Julia'
  });

  var newItems = merge(items, item, 'id');

  t.ok(newItems.length === 2);
  t.end();
});

test('preserves the given order', function(t) {
  var items = SI([]);

  var more = SI([
    {
      id: 11,
      label: 'Eleven'
    },
    {
      id: 7,
      label: 'Sevent'
    }
  ]);

  var updated = merge(items, more, 'id');
  t.equal(updated.length, 2, 'it has two');
  t.equal(updated[0].id, 11, 'it has the right order');

  t.end();
});


