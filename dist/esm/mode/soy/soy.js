import htmlmixed from '../htmlmixed/htmlmixed.js';

// Source: https://github.com/codemirror/CodeMirror/tree/master/mode/soy/soy.js
function soy(CodeMirror) {
  htmlmixed(CodeMirror);

  var paramData = { noEndTag: true, soyState: "param-def" };
  var tags = {
    "alias": { noEndTag: true },
    "delpackage": { noEndTag: true },
    "namespace": { noEndTag: true, soyState: "namespace-def" },
    "@attribute": paramData,
    "@attribute?": paramData,
    "@param": paramData,
    "@param?": paramData,
    "@inject": paramData,
    "@inject?": paramData,
    "@state": paramData,
    "template": { soyState: "templ-def", variableScope: true},
    "literal": { },
    "msg": {},
    "fallbackmsg": { noEndTag: true, reduceIndent: true},
    "select": {},
    "plural": {},
    "let": { soyState: "var-def" },
    "if": {},
    "elseif": { noEndTag: true, reduceIndent: true},
    "else": { noEndTag: true, reduceIndent: true},
    "switch": {},
    "case": { noEndTag: true, reduceIndent: true},
    "default": { noEndTag: true, reduceIndent: true},
    "foreach": { variableScope: true, soyState: "for-loop" },
    "ifempty": { noEndTag: true, reduceIndent: true},
    "for": { variableScope: true, soyState: "for-loop" },
    "call": { soyState: "templ-ref" },
    "param": { soyState: "param-ref"},
    "print": { noEndTag: true },
    "deltemplate": { soyState: "templ-def", variableScope: true},
    "delcall": { soyState: "templ-ref" },
    "log": {},
    "element": { variableScope: true },
  };

  var indentingTags = Object.keys(tags).filter(function(tag) {
    return !tags[tag].noEndTag || tags[tag].reduceIndent;
  });

  CodeMirror.defineMode("soy", function(config) {
    var textMode = CodeMirror.getMode(config, "text/plain");
    var modes = {
      html: CodeMirror.getMode(config, {name: "text/html", multilineTagIndentFactor: 2, multilineTagIndentPastTag: false, allowMissingTagName: true}),
      attributes: textMode,
      text: textMode,
      uri: textMode,
      trusted_resource_uri: textMode,
      css: CodeMirror.getMode(config, "text/css"),
      js: CodeMirror.getMode(config, {name: "text/javascript", statementIndent: 2 * config.indentUnit})
    };

    function last(array) {
      return array[array.length - 1];
    }

    function tokenUntil(stream, state, untilRegExp) {
      if (stream.sol()) {
        for (var indent = 0; indent < state.indent; indent++) {
          if (!stream.eat(/\s/)) { break; }
        }
        if (indent) { return null; }
      }
      var oldString = stream.string;
      var match = untilRegExp.exec(oldString.substr(stream.pos));
      if (match) {
        stream.string = oldString.substr(0, stream.pos + match.index);
      }
      var result = stream.hideFirstChars(state.indent, function() {
        var localState = last(state.localStates);
        return localState.mode.token(stream, localState.state);
      });
      stream.string = oldString;
      return result;
    }

    function contains(list, element) {
      while (list) {
        if (list.element === element) { return true; }
        list = list.next;
      }
      return false;
    }

    function prepend(list, element) {
      return {
        element: element,
        next: list
      };
    }

    function popcontext(state) {
      if (!state.context) { return; }
      if (state.context.scope) {
        state.variables = state.context.scope;
      }
      state.context = state.context.previousContext;
    }

    function ref(list, name, loose) {
      return contains(list, name) ? "variable-2" : (loose ? "variable" : "variable-2 error");
    }

    function Context(previousContext, tag, scope) {
      this.previousContext = previousContext;
      this.tag = tag;
      this.kind = null;
      this.scope = scope;
    }

    function expression(stream, state) {
      var match;
      if (stream.match(/[[]/)) {
        state.soyState.push("list-literal");
        state.context = new Context(state.context, "list-literal", state.variables);
        state.lookupVariables = false;
        return null;
      } else if (stream.match(/map\b/)) {
        state.soyState.push("map-literal");
        return "keyword";
      } else if (stream.match(/record\b/)) {
        state.soyState.push("record-literal");
        return "keyword";
      } else if (stream.match(/([\w]+)(?=\()/)) {
        return "variable callee";
      } else if (match = stream.match(/^["']/)) {
        state.soyState.push("string");
        state.quoteKind = match[0];
        return "string";
      } else if (stream.match(/^[(]/)) {
        state.soyState.push("open-parentheses");
        return null;
      } else if (stream.match(/(null|true|false)(?!\w)/) ||
          stream.match(/0x([0-9a-fA-F]{2,})/) ||
          stream.match(/-?([0-9]*[.])?[0-9]+(e[0-9]*)?/)) {
        return "atom";
      } else if (stream.match(/(\||[+\-*\/%]|[=!]=|\?:|[<>]=?)/)) {
        return "operator";
      } else if (match = stream.match(/^\$([\w]+)/)) {
        return ref(state.variables, match[1], !state.lookupVariables);
      } else if (match = stream.match(/^\w+/)) {
        return /^(?:as|and|or|not|in|if)$/.test(match[0]) ? "keyword" : null;
      }

      stream.next();
      return null;
    }

    return {
      startState: function() {
        return {
          soyState: [],
          variables: prepend(null, 'ij'),
          scopes: null,
          indent: 0,
          quoteKind: null,
          context: null,
          lookupVariables: true, 
          localStates: [{
            mode: modes.html,
            state: CodeMirror.startState(modes.html)
          }]
        };
      },

      copyState: function(state) {
        return {
          tag: state.tag, 
          soyState: state.soyState.concat([]),
          variables: state.variables,
          context: state.context,
          indent: state.indent, 
          quoteKind: state.quoteKind,
          lookupVariables: state.lookupVariables,
          localStates: state.localStates.map(function(localState) {
            return {
              mode: localState.mode,
              state: CodeMirror.copyState(localState.mode, localState.state)
            };
          })
        };
      },

      token: function(stream, state) {
        var match;

        switch (last(state.soyState)) {
        case "comment":
          if (stream.match(/^.*?\*\//)) {
            state.soyState.pop();
          } else {
            stream.skipToEnd();
          }
          if (!state.context || !state.context.scope) {
            var paramRe = /@param\??\s+(\S+)/g;
            var current = stream.current();
            for (var match; (match = paramRe.exec(current)); ) {
              state.variables = prepend(state.variables, match[1]);
            }
          }
          return "comment";

        case "string":
          var match = stream.match(/^.*?(["']|\\[\s\S])/);
          if (!match) {
            stream.skipToEnd();
          } else if (match[1] == state.quoteKind) {
            state.quoteKind = null;
            state.soyState.pop();
          }
          return "string";
        }

        if (!state.soyState.length || last(state.soyState) != "literal") {
          if (stream.match(/^\/\*/)) {
            state.soyState.push("comment");
            return "comment";
          } else if (stream.match(stream.sol() ? /^\s*\/\/.*/ : /^\s+\/\/.*/)) {
            return "comment";
          }
        }

        switch (last(state.soyState)) {
        case "templ-def":
          if (match = stream.match(/^\.?([\w]+(?!\.[\w]+)*)/)) {
            state.soyState.pop();
            return "def";
          }
          stream.next();
          return null;

        case "templ-ref":
          if (match = stream.match(/(\.?[a-zA-Z_][a-zA-Z_0-9]+)+/)) {
            state.soyState.pop();
            if (match[0][0] == '.') {
              return "variable-2"
            }
            return "variable";
          }
          if (match = stream.match(/^\$([\w]+)/)) {
            state.soyState.pop();
            return ref(state.variables, match[1], !state.lookupVariables);
          }

          stream.next();
          return null;

        case "namespace-def":
          if (match = stream.match(/^\.?([\w\.]+)/)) {
            state.soyState.pop();
            return "variable";
          }
          stream.next();
          return null;

        case "param-def":
          if (match = stream.match(/^\*/)) {
            state.soyState.pop();
            state.soyState.push("param-type");
            return "type";
          }
          if (match = stream.match(/^\w+/)) {
            state.variables = prepend(state.variables, match[0]);
            state.soyState.pop();
            state.soyState.push("param-type");
            return "def";
          }
          stream.next();
          return null;

        case "param-ref":
          if (match = stream.match(/^\w+/)) {
            state.soyState.pop();
            return "property";
          }
          stream.next();
          return null;

        case "open-parentheses":
          if (stream.match(/[)]/)) {
            state.soyState.pop();
            return null;
          }
          return expression(stream, state);

        case "param-type":
          var peekChar = stream.peek();
          if ("}]=>,".indexOf(peekChar) != -1) {
            state.soyState.pop();
            return null;
          } else if (peekChar == "[") {
            state.soyState.push('param-type-record');
            return null;
          } else if (peekChar == "(") {
            state.soyState.push('param-type-template');
            return null;
          } else if (peekChar == "<") {
            state.soyState.push('param-type-parameter');
            return null;
          } else if (match = stream.match(/^([\w]+|[?])/)) {
            return "type";
          }
          stream.next();
          return null;

        case "param-type-record":
          var peekChar = stream.peek();
          if (peekChar == "]") {
            state.soyState.pop();
            return null;
          }
          if (stream.match(/^\w+/)) {
            state.soyState.push('param-type');
            return "property";
          }
          stream.next();
          return null;

        case "param-type-parameter":
          if (stream.match(/^[>]/)) {
            state.soyState.pop();
            return null;
          }
          if (stream.match(/^[<,]/)) {
            state.soyState.push('param-type');
            return null;
          }
          stream.next();
          return null;

        case "param-type-template":
          if (stream.match(/[>]/)) {
            state.soyState.pop();
            state.soyState.push('param-type');
            return null;
          }
          if (stream.match(/^\w+/)) {
            state.soyState.push('param-type');
            return "def";
          }
          stream.next();
          return null;

        case "var-def":
          if (match = stream.match(/^\$([\w]+)/)) {
            state.variables = prepend(state.variables, match[1]);
            state.soyState.pop();
            return "def";
          }
          stream.next();
          return null;

        case "for-loop":
          if (stream.match(/\bin\b/)) {
            state.soyState.pop();
            return "keyword";
          }
          if (stream.peek() == "$") {
            state.soyState.push('var-def');
            return null;
          }
          stream.next();
          return null;

        case "record-literal":
          if (stream.match(/^[)]/)) {
            state.soyState.pop();
            return null;
          }
          if (stream.match(/[(,]/)) {
            state.soyState.push("map-value");
            state.soyState.push("record-key");
            return null;
          }
          stream.next();
          return null;

        case "map-literal":
          if (stream.match(/^[)]/)) {
            state.soyState.pop();
            return null;
          }
          if (stream.match(/[(,]/)) {
            state.soyState.push("map-value");
            state.soyState.push("map-value");
            return null;
          }
          stream.next();
          return null;

        case "list-literal":
          if (stream.match(/\]/)) {
            state.soyState.pop();
            state.lookupVariables = true;
            popcontext(state);
            return null;
          }
          if (stream.match(/\bfor\b/)) {
            state.lookupVariables = true;
            state.soyState.push('for-loop');
            return "keyword";
          }
          return expression(stream, state);

        case "record-key":
          if (stream.match(/[\w]+/)) {
            return "property";
          }
          if (stream.match(/^[:]/)) {
            state.soyState.pop();
            return null;
          }
          stream.next();
          return null;

        case "map-value":
          if (stream.peek() == ")" || stream.peek() == "," || stream.match(/^[:)]/)) {
            state.soyState.pop();
            return null;
          }
          return expression(stream, state);

        case "import":
          if (stream.eat(";")) {
            state.soyState.pop();
            state.indent -= 2 * config.indentUnit;
            return null;
          }
          if (stream.match(/\w+(?=\s+as)/)) {
            return "variable";
          }
          if (match = stream.match(/\w+/)) {
            return /(from|as)/.test(match[0]) ? "keyword" : "def";
          }
          if (match = stream.match(/^["']/)) {
            state.soyState.push("string");
            state.quoteKind = match[0];
            return "string";
          }
          stream.next();
          return null;

        case "tag":
          var endTag = state.tag[0] == "/";
          var tagName = endTag ? state.tag.substring(1) : state.tag;
          var tag = tags[tagName];
          if (stream.match(/^\/?}/)) {
            var selfClosed = stream.current() == "/}";
            if (selfClosed && !endTag) {
              popcontext(state);
            }
            if (state.tag == "/template" || state.tag == "/deltemplate") {
              state.variables = prepend(null, 'ij');
              state.indent = 0;
            } else {
              state.indent -= config.indentUnit *
                    (selfClosed || indentingTags.indexOf(state.tag) == -1 ? 2 : 1);
            }
            state.soyState.pop();
            return "keyword";
          } else if (stream.match(/^([\w?]+)(?==)/)) {
            if (state.context && state.context.tag == tagName && stream.current() == "kind" && (match = stream.match(/^="([^"]+)/, false))) {
              var kind = match[1];
              state.context.kind = kind;
              var mode = modes[kind] || modes.html;
              var localState = last(state.localStates);
              if (localState.mode.indent) {
                state.indent += localState.mode.indent(localState.state, "", "");
              }
              state.localStates.push({
                mode: mode,
                state: CodeMirror.startState(mode)
              });
            }
            return "attribute";
          }
          return expression(stream, state);

        case "template-call-expression":
          if (stream.match(/^([\w-?]+)(?==)/)) {
            return "attribute";
          } else if (stream.eat('>')) {
            state.soyState.pop();
            return "keyword";
          } else if (stream.eat('/>')) {
            state.soyState.pop();
            return "keyword";
          }
          return expression(stream, state);
        case "literal":
          if (stream.match(/^(?=\{\/literal})/)) {
            state.soyState.pop();
            return this.token(stream, state);
          }
          return tokenUntil(stream, state, /\{\/literal}/);
        }

        if (stream.match(/^\{literal}/)) {
          state.indent += config.indentUnit;
          state.soyState.push("literal");
          state.context = new Context(state.context, "literal", state.variables);
          return "keyword";

        } else if (match = stream.match(/^\{([/@\\]?\w+\??)(?=$|[\s}]|\/[/*])/)) {
          var prevTag = state.tag;
          state.tag = match[1];
          var endTag = state.tag[0] == "/";
          var indentingTag = !!tags[state.tag];
          var tagName = endTag ? state.tag.substring(1) : state.tag;
          var tag = tags[tagName];
          if (state.tag != "/switch")
            { state.indent += ((endTag || tag && tag.reduceIndent) && prevTag != "switch" ? 1 : 2) * config.indentUnit; }

          state.soyState.push("tag");
          var tagError = false;
          if (tag) {
            if (!endTag) {
              if (tag.soyState) { state.soyState.push(tag.soyState); }
            }
            if (!tag.noEndTag && (indentingTag || !endTag)) {
              state.context = new Context(state.context, state.tag, tag.variableScope ? state.variables : null);
            } else if (endTag) {
              if (!state.context || state.context.tag != tagName) {
                tagError = true;
              } else if (state.context) {
                if (state.context.kind) {
                  state.localStates.pop();
                  var localState = last(state.localStates);
                  if (localState.mode.indent) {
                    state.indent -= localState.mode.indent(localState.state, "", "");
                  }
                }
                popcontext(state);
              }
            }
          } else if (endTag) {
            tagError = true;
          }
          return (tagError ? "error " : "") + "keyword";

        } else if (stream.eat('{')) {
          state.tag = "print";
          state.indent += 2 * config.indentUnit;
          state.soyState.push("tag");
          return "keyword";
        } else if (!state.context && stream.match(/\bimport\b/)) {
          state.soyState.push("import");
          state.indent += 2 * config.indentUnit;
          return "keyword";
        } else if (match = stream.match(/^<\{/)) {
          state.soyState.push("template-call-expression");
          state.tag = "print";
          state.indent += 2 * config.indentUnit;
          state.soyState.push("tag");
          return "keyword";
        } else if (match = stream.match(/^<\/>/)) {
          state.indent -= 2 * config.indentUnit;
          return "keyword";
        }

        return tokenUntil(stream, state, /\{|\s+\/\/|\/\*/);
      },

      indent: function(state, textAfter, line) {
        var indent = state.indent, top = last(state.soyState);
        if (top == "comment") { return CodeMirror.Pass; }

        if (top == "literal") {
          if (/^\{\/literal}/.test(textAfter)) { indent -= config.indentUnit; }
        } else {
          if (/^\s*\{\/(template|deltemplate)\b/.test(textAfter)) { return 0; }
          if (/^\{(\/|(fallbackmsg|elseif|else|ifempty)\b)/.test(textAfter)) { indent -= config.indentUnit; }
          if (state.tag != "switch" && /^\{(case|default)\b/.test(textAfter)) { indent -= config.indentUnit; }
          if (/^\{\/switch\b/.test(textAfter)) { indent -= config.indentUnit; }
        }
        var localState = last(state.localStates);
        if (indent && localState.mode.indent) {
          indent += localState.mode.indent(localState.state, textAfter, line);
        }
        return indent;
      },

      innerMode: function(state) {
        if (state.soyState.length && last(state.soyState) != "literal") { return null; }
        else { return last(state.localStates); }
      },

      electricInput: /^\s*\{(\/|\/template|\/deltemplate|\/switch|fallbackmsg|elseif|else|case|default|ifempty|\/literal\})$/,
      lineComment: "//",
      blockCommentStart: "/*",
      blockCommentEnd: "*/",
      blockCommentContinue: " * ",
      useInnerComments: false,
      fold: "indent"
    };
  }, "htmlmixed");

  CodeMirror.registerHelper("wordChars", "soy", /[\w$]/);

  CodeMirror.registerHelper("hintWords", "soy", Object.keys(tags).concat(
    ["css", "debugger"]));

  CodeMirror.defineMIME("text/x-soy", "soy");
}

export default soy;
//# sourceMappingURL=soy.js.map