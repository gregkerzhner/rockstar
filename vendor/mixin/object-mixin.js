// this might be sinful, but it is pretty and I like it ;)
Object.defineProperty(Object.prototype, 'mixin', {
  value: function (receiver, giver) {
    for (var i in giver) {
      if (!this.hasOwnProperty(i)) {
        Object.defineProperty(receiver, i, {
          value: giver[i],
          enumerable: true
        });
      }
    }
  },
  enumerable: false
});