// Source: https://github.com/codemirror/CodeMirror/tree/master/mode/spreadsheet/spreadsheet.js
function spreadsheet(CodeMirror) {

  CodeMirror.defineMode("spreadsheet", function () {
    return {
      startState: function () {
        return {
          stringType: null,
          stack: []
        };
      },
      token: function (stream, state) {
        if (!stream) { return; }

        if (state.stack.length === 0) {
          if ((stream.peek() == '"') || (stream.peek() == "'")) {
            state.stringType = stream.peek();
            stream.next(); 
            state.stack.unshift("string");
          }
        }

        switch (state.stack[0]) {
        case "string":
          while (state.stack[0] === "string" && !stream.eol()) {
            if (stream.peek() === state.stringType) {
              stream.next(); 
              state.stack.shift(); 
            } else if (stream.peek() === "\\") {
              stream.next();
              stream.next();
            } else {
              stream.match(/^.[^\\\"\']*/);
            }
          }
          return "string";

        case "characterClass":
          while (state.stack[0] === "characterClass" && !stream.eol()) {
            if (!(stream.match(/^[^\]\\]+/) || stream.match(/^\\./)))
              { state.stack.shift(); }
          }
          return "operator";
        }

        var peek = stream.peek();

        switch (peek) {
        case "[":
          stream.next();
          state.stack.unshift("characterClass");
          return "bracket";
        case ":":
          stream.next();
          return "operator";
        case "\\":
          if (stream.match(/\\[a-z]+/)) { return "string-2"; }
          else {
            stream.next();
            return "atom";
          }
        case ".":
        case ",":
        case ";":
        case "*":
        case "-":
        case "+":
        case "^":
        case "<":
        case "/":
        case "=":
          stream.next();
          return "atom";
        case "$":
          stream.next();
          return "builtin";
        }

        if (stream.match(/\d+/)) {
          if (stream.match(/^\w+/)) { return "error"; }
          return "number";
        } else if (stream.match(/^[a-zA-Z_]\w*/)) {
          if (stream.match(/(?=[\(.])/, false)) { return "keyword"; }
          return "variable-2";
        } else if (["[", "]", "(", ")", "{", "}"].indexOf(peek) != -1) {
          stream.next();
          return "bracket";
        } else if (!stream.eatSpace()) {
          stream.next();
        }
        return null;
      }
    };
  });

  CodeMirror.defineMIME("text/x-spreadsheet", "spreadsheet");
}

export default spreadsheet;
//# sourceMappingURL=spreadsheet.js.map
