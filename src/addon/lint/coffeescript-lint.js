// Source: https://github.com/codemirror/CodeMirror/tree/master/addon/lint/coffeescript-lint.js
export default function(CodeMirror) {
  "use strict";

  CodeMirror.registerHelper("lint", "coffeescript", function(text) {
    var found = [];
    if (!window.coffeelint) {
      if (window.console) {
        window.console.error("Error: window.coffeelint not defined, CodeMirror CoffeeScript linting cannot run.");
      }
      return found;
    }
    var parseError = function(err) {
      var loc = err.lineNumber;
      found.push({from: CodeMirror.Pos(loc-1, 0),
        to: CodeMirror.Pos(loc, 0),
        severity: err.level,
        message: err.message});
    };
    try {
      var res = coffeelint.lint(text);
      for(var i = 0; i < res.length; i++) {
        parseError(res[i]);
      }
    } catch(e) {
      found.push({from: CodeMirror.Pos(e.location.first_line, 0),
        to: CodeMirror.Pos(e.location.last_line, e.location.last_column),
        severity: 'error',
        message: e.message});
    }
    return found;
  });

}