'use strict';

// Source: https://github.com/codemirror/CodeMirror/tree/master/addon/lint/json-lint.js
function jsonLint(CodeMirror) {

  CodeMirror.registerHelper("lint", "json", function(text) {
    var found = [];
    if (!window.jsonlint) {
      if (window.console) {
        window.console.error("Error: window.jsonlint not defined, CodeMirror JSON linting cannot run.");
      }
      return found;
    }
    var jsonlint = window.jsonlint.parser || window.jsonlint;
    jsonlint.parseError = function(str, hash) {
      var loc = hash.loc;
      found.push({from: CodeMirror.Pos(loc.first_line - 1, loc.first_column),
        to: CodeMirror.Pos(loc.last_line - 1, loc.last_column),
        message: str});
    };
    try { jsonlint.parse(text); }
    catch(e) {}
    return found;
  });

}

module.exports = jsonLint;
//# sourceMappingURL=json-lint.js.map
