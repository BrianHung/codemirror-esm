'use strict';

var haskell = require('../haskell/haskell.js');

// Source: https://github.com/codemirror/CodeMirror/tree/master/mode/haskell-literate/haskell-literate.js
function haskellLiterate(CodeMirror) {
  haskell(CodeMirror);

  CodeMirror.defineMode("haskell-literate", function (config, parserConfig) {
    var baseMode = CodeMirror.getMode(config, (parserConfig && parserConfig.base) || "haskell");

    return {
      startState: function () {
        return {
          inCode: false,
          baseState: CodeMirror.startState(baseMode)
        }
      },
      token: function (stream, state) {
        if (stream.sol()) {
          if (state.inCode = stream.eat(">"))
            { return "meta" }
        }
        if (state.inCode) {
          return baseMode.token(stream, state.baseState)
        } else {
          stream.skipToEnd();
          return "comment"
        }
      },
      innerMode: function (state) {
        return state.inCode ? {state: state.baseState, mode: baseMode} : null
      }
    }
  }, "haskell");

  CodeMirror.defineMIME("text/x-literate-haskell", "haskell-literate");
}

module.exports = haskellLiterate;
//# sourceMappingURL=haskell-literate.js.map
