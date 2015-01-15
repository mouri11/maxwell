(function() {
  define([], function() {
    var FormatUtils;
    FormatUtils = (function() {
      function FormatUtils() {}

      FormatUtils.showFormat = function(decimalNum) {
        return decimalNum.toPrecision(2);
      };

      FormatUtils.shortFormat = function(decimalNum) {
        return decimalNum.toPrecision(1);
      };

      FormatUtils.longFormat = function(decimalNum) {
        return decimalNum.toPrecision(4);
      };


      /*
      Removes commas from a number containing a string:
      e.g. 1,234,567.99 -> 1234567.99
       */

      FormatUtils.noCommaFormat = function(numberWithCommas) {
        return numberWithCommas.replace(/,/g, '');
      };


      /*
      Adds commas to a number, and returns the string representation of that number
      e.g. 1234567.99 -> 1,234,567.99
       */

      FormatUtils.commaFormat = function(plainNumber) {
        var pattern, x, x1, x2;
        plainNumber += "";
        x = plainNumber.split(".");
        x1 = x[0];
        x2 = (x.length > 1 ? "." + x[1] : "");
        pattern = /(\d+)(\d{3})/;
        while (pattern.test(x1)) {
          x1 = x1.replace(pattern, "$1" + "," + "$2");
        }
        return x1 + x2;
      };

      return FormatUtils;

    })();
    return FormatUtils;
  });

}).call(this);
