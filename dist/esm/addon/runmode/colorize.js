import runmode from './runmode.js';

// Source: https://github.com/codemirror/CodeMirror/tree/master/addon/runmode/colorize.js
function colorize(CodeMirror) {
  runmode(CodeMirror);

  var isBlock = /^(p|li|div|h\\d|pre|blockquote|td)$/;

  function textContent(node, out) {
    if (node.nodeType == 3) { return out.push(node.nodeValue); }
    for (var ch = node.firstChild; ch; ch = ch.nextSibling) {
      textContent(ch, out);
      if (isBlock.test(node.nodeType)) { out.push("\n"); }
    }
  }

  CodeMirror.colorize = function(collection, defaultMode) {
    if (!collection) { collection = document.body.getElementsByTagName("pre"); }

    for (var i = 0; i < collection.length; ++i) {
      var node = collection[i];
      var mode = node.getAttribute("data-lang") || defaultMode;
      if (!mode) { continue; }

      var text = [];
      textContent(node, text);
      node.innerHTML = "";
      CodeMirror.runMode(text.join(""), mode, node);

      node.className += " cm-s-default";
    }
  };
}

export default colorize;
//# sourceMappingURL=colorize.js.map
