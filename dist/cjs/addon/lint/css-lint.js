'use strict';

// Source: https://github.com/codemirror/CodeMirror/tree/master/addon/lint/css-lint.js
function cssLint(CodeMirror) {

  CodeMirror.registerHelper("lint", "css", function(text, options) {
    var found = [];
    if (!window.CSSLint) {
      if (window.console) {
        window.console.error("Error: window.CSSLint not defined, CodeMirror CSS linting cannot run.");
      }
      return found;
    }
    var results = CSSLint.verify(text, options), messages = results.messages, message = null;
    for ( var i = 0; i < messages.length; i++) {
      message = messages[i];
      var startLine = message.line -1, endLine = message.line -1, startCol = message.col -1, endCol = message.col;
      found.push({
        from: CodeMirror.Pos(startLine, startCol),
        to: CodeMirror.Pos(endLine, endCol),
        message: message.message,
        severity : message.type
      });
    }
    return found;
  });

}

module.exports = cssLint;
//# sourceMappingURL=css-lint.js.map
