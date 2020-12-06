import javascript from '../javascript/javascript.js';

// Source: https://github.com/codemirror/CodeMirror/tree/master/mode/pegjs/pegjs.js
function pegjs(CodeMirror) {
  javascript(CodeMirror);

  CodeMirror.defineMode("pegjs", function (config) {
    var jsMode = CodeMirror.getMode(config, "javascript");

    function identifier(stream) {
      return stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
    }

    return {
      startState: function () {
        return {
          inString: false,
          stringType: null,
          inComment: false,
          inCharacterClass: false,
          braced: 0,
          lhs: true,
          localState: null
        };
      },
      token: function (stream, state) {
        if (stream)

          { if (!state.inString && !state.inComment && ((stream.peek() == '"') || (stream.peek() == "'"))) {
            state.stringType = stream.peek();
            stream.next(); 
            state.inString = true; 
          } }
        if (!state.inString && !state.inComment && stream.match(/^\/\*/)) {
          state.inComment = true;
        }

        if (state.inString) {
          while (state.inString && !stream.eol()) {
            if (stream.peek() === state.stringType) {
              stream.next(); 
              state.inString = false; 
            } else if (stream.peek() === '\\') {
              stream.next();
              stream.next();
            } else {
              stream.match(/^.[^\\\"\']*/);
            }
          }
          return state.lhs ? "property string" : "string"; 
        } else if (state.inComment) {
          while (state.inComment && !stream.eol()) {
            if (stream.match(/\*\//)) {
              state.inComment = false; 
            } else {
              stream.match(/^.[^\*]*/);
            }
          }
          return "comment";
        } else if (state.inCharacterClass) {
          while (state.inCharacterClass && !stream.eol()) {
            if (!(stream.match(/^[^\]\\]+/) || stream.match(/^\\./))) {
              state.inCharacterClass = false;
            }
          }
        } else if (stream.peek() === '[') {
          stream.next();
          state.inCharacterClass = true;
          return 'bracket';
        } else if (stream.match(/^\/\//)) {
          stream.skipToEnd();
          return "comment";
        } else if (state.braced || stream.peek() === '{') {
          if (state.localState === null) {
            state.localState = CodeMirror.startState(jsMode);
          }
          var token = jsMode.token(stream, state.localState);
          var text = stream.current();
          if (!token) {
            for (var i = 0; i < text.length; i++) {
              if (text[i] === '{') {
                state.braced++;
              } else if (text[i] === '}') {
                state.braced--;
              }
            }          }
          return token;
        } else if (identifier(stream)) {
          if (stream.peek() === ':') {
            return 'variable';
          }
          return 'variable-2';
        } else if (['[', ']', '(', ')'].indexOf(stream.peek()) != -1) {
          stream.next();
          return 'bracket';
        } else if (!stream.eatSpace()) {
          stream.next();
        }
        return null;
      }
    };
  }, "javascript");

}

export default pegjs;
//# sourceMappingURL=pegjs.js.map
