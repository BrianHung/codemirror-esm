'use strict';

// Source: https://github.com/codemirror/CodeMirror/tree/master/mode/diff/diff.js
function diff(CodeMirror) {

  CodeMirror.defineMode("diff", function() {

    var TOKEN_NAMES = {
      '+': 'positive',
      '-': 'negative',
      '@': 'meta'
    };

    return {
      token: function(stream) {
        var tw_pos = stream.string.search(/[\t ]+?$/);

        if (!stream.sol() || tw_pos === 0) {
          stream.skipToEnd();
          return ("error " + (
            TOKEN_NAMES[stream.string.charAt(0)] || '')).replace(/ $/, '');
        }

        var token_name = TOKEN_NAMES[stream.peek()] || stream.skipToEnd();

        if (tw_pos === -1) {
          stream.skipToEnd();
        } else {
          stream.pos = tw_pos;
        }

        return token_name;
      }
    };
  });

  CodeMirror.defineMIME("text/x-diff", "diff");

}

module.exports = diff;
//# sourceMappingURL=diff.js.map
