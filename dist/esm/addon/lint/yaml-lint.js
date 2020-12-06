// Source: https://github.com/codemirror/CodeMirror/tree/master/addon/lint/yaml-lint.js
function yamlLint(CodeMirror) {



  CodeMirror.registerHelper("lint", "yaml", function(text) {
    var found = [];
    if (!window.jsyaml) {
      if (window.console) {
        window.console.error("Error: window.jsyaml not defined, CodeMirror YAML linting cannot run.");
      }
      return found;
    }
    try { jsyaml.loadAll(text); }
    catch(e) {
      var loc = e.mark,
        from = loc ? CodeMirror.Pos(loc.line, loc.column) : CodeMirror.Pos(0, 0),
        to = from;
      found.push({ from: from, to: to, message: e.message });
    }
    return found;
  });

}

export default yamlLint;
//# sourceMappingURL=yaml-lint.js.map
