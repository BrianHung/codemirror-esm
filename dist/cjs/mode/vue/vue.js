'use strict';

// Source: https://github.com/codemirror/CodeMirror/tree/master/mode/vue/vue.js
function vue(CodeMirror) {
  var tagLanguages = {
    script: [
      ["lang", /coffee(script)?/, "coffeescript"],
      ["type", /^(?:text|application)\/(?:x-)?coffee(?:script)?$/, "coffeescript"],
      ["lang", /^babel$/, "javascript"],
      ["type", /^text\/babel$/, "javascript"],
      ["type", /^text\/ecmascript-\d+$/, "javascript"]
    ],
    style: [
      ["lang", /^stylus$/i, "stylus"],
      ["lang", /^sass$/i, "sass"],
      ["lang", /^less$/i, "text/x-less"],
      ["lang", /^scss$/i, "text/x-scss"],
      ["type", /^(text\/)?(x-)?styl(us)?$/i, "stylus"],
      ["type", /^text\/sass/i, "sass"],
      ["type", /^(text\/)?(x-)?scss$/i, "text/x-scss"],
      ["type", /^(text\/)?(x-)?less$/i, "text/x-less"]
    ],
    template: [
      ["lang", /^vue-template$/i, "vue"],
      ["lang", /^pug$/i, "pug"],
      ["lang", /^handlebars$/i, "handlebars"],
      ["type", /^(text\/)?(x-)?pug$/i, "pug"],
      ["type", /^text\/x-handlebars-template$/i, "handlebars"],
      [null, null, "vue-template"]
    ]
  };

  CodeMirror.defineMode("vue-template", function (config, parserConfig) {
    var mustacheOverlay = {
      token: function (stream) {
        if (stream.match(/^\{\{.*?\}\}/)) { return "meta mustache"; }
        while (stream.next() && !stream.match("{{", false)) {}
        return null;
      }
    };
    return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || "text/html"), mustacheOverlay);
  });

  CodeMirror.defineMode("vue", function (config) {
    return CodeMirror.getMode(config, {name: "htmlmixed", tags: tagLanguages});
  }, "htmlmixed", "xml", "javascript", "coffeescript", "css", "sass", "stylus", "pug", "handlebars");

  CodeMirror.defineMIME("script/x-vue", "vue");
  CodeMirror.defineMIME("text/x-vue", "vue");
}

module.exports = vue;
//# sourceMappingURL=vue.js.map
