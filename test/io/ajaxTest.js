// Generated by CoffeeScript 1.4.0
(function() {

  define(['jquery'], function($) {
    return describe("Ajax Test", function() {
      return it("should load JSON", function() {
        return $.getJSON('../circuits/voltdividesimple.json', function(data) {
          return console.log(data);
        });
      });
    });
  });

}).call(this);