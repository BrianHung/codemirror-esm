import htmlmixed from '../htmlmixed/htmlmixed.js';

// Source: https://github.com/codemirror/CodeMirror/tree/master/mode/tornado/tornado.js
function tornado(CodeMirror) {
  htmlmixed(CodeMirror);

  CodeMirror.defineMode("tornado:inner", function() {
    var keywords = ["and","as","assert","autoescape","block","break","class","comment","context",
      "continue","datetime","def","del","elif","else","end","escape","except",
      "exec","extends","false","finally","for","from","global","if","import","in",
      "include","is","json_encode","lambda","length","linkify","load","module",
      "none","not","or","pass","print","put","raise","raw","return","self","set",
      "squeeze","super","true","try","url_escape","while","with","without","xhtml_escape","yield"];
    keywords = new RegExp("^((" + keywords.join(")|(") + "))\\b");

    function tokenBase (stream, state) {
      stream.eatWhile(/[^\{]/);
      var ch = stream.next();
      if (ch == "{") {
        if (ch = stream.eat(/\{|%|#/)) {
          state.tokenize = inTag(ch);
          return "tag";
        }
      }
    }
    function inTag (close) {
      if (close == "{") {
        close = "}";
      }
      return function (stream, state) {
        var ch = stream.next();
        if ((ch == close) && stream.eat("}")) {
          state.tokenize = tokenBase;
          return "tag";
        }
        if (stream.match(keywords)) {
          return "keyword";
        }
        return close == "#" ? "comment" : "string";
      };
    }
    return {
      startState: function () {
        return {tokenize: tokenBase};
      },
      token: function (stream, state) {
        return state.tokenize(stream, state);
      }
    };
  });

  CodeMirror.defineMode("tornado", function(config) {
    var htmlBase = CodeMirror.getMode(config, "text/html");
    var tornadoInner = CodeMirror.getMode(config, "tornado:inner");
    return CodeMirror.overlayMode(htmlBase, tornadoInner);
  });

  CodeMirror.defineMIME("text/x-tornado", "tornado");
}

export default tornado;
//# sourceMappingURL=tornado.js.map
