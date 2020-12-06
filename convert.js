const request = require('superagent');
const fs = require('fs');
const admZip = require('adm-zip');
const gulp = require('gulp');
const strip = require('gulp-strip-comments');
const fsExtra = require('fs-extra')

request
  .get("https://github.com/codemirror/codemirror/archive/master.zip")
  .on('error', error => console.log(error))
  .pipe(fs.createWriteStream('./codemirror.zip'))
  .on('finish', () => {
    
    const zip = new admZip('./codemirror.zip')
    zip.extractEntryTo('CodeMirror-master/', './', true, true);
    
    gulp.src('./CodeMirror-master/mode/**/*.js')
      .pipe(strip())
      .pipe(gulp.dest('./mode/', {overwrite: true}))
      .on("end", () => readDirAndGetFilePaths('./mode').forEach( file => convertJStoES(file)));
  
    gulp.src('./CodeMirror-master/addon/**/*.js')
      .pipe(strip())
      .pipe(gulp.dest('./addon/', {overwrite: true}))
      .on("end", () => readDirAndGetFilePaths('./addon').forEach(file => convertJStoES(file)));
  });

function readDirAndGetFilePaths(path) {
  const paths = []
  fs.readdirSync(path, {withFileTypes: true}).forEach(dirent => {
    if (dirent.isFile()) {
      paths.push(`${path}/${dirent.name}`)
    } else if (dirent.isDirectory()) {
      Array.prototype.push.apply(paths, readDirAndGetFilePaths(`${path}/${dirent.name}`))
    }
  })
  return paths;
}

function convertJStoES(path) {
  const data = fs.readFileSync(path, {encoding: 'utf-8'});
  const lines = data.trim().split("\n");

  const FUNCTION_START_REGEX = /\(function(\s)*\(CodeMirror/
  const functionStart = lines.findIndex(line => FUNCTION_START_REGEX.test(line));

  if (functionStart == -1) {
    console.log(`${path} does not have a CodeMirror entrypoint.`)
    return
  }

  lines[functionStart] = "export default function(" + lines[functionStart].substring(lines[functionStart].indexOf("CodeMirror")) 
  lines[lines.length - 1] = lines[lines.length - 1].replace("});", "}");
  
  let functionLines = lines.slice(functionStart, lines.length);

  const REQUIRE_REGEX = /require\("([.\/a-z]*)"\)/g
  const IMPORTS_START_REGEX = /^(\s)*mod\(require\(/
  const importsStart = lines.findIndex(line => IMPORTS_START_REGEX.test(line));

  let matchArray, imports = []
  while (matchArray = REQUIRE_REGEX.exec(lines[importsStart])) {
    const [, match] = matchArray;
    match !== '../../lib/codemirror' && imports.push(match);
  }

  const headerImportLines = imports
    .filter(path => path.substring(0, 1) == "." && path != "../lib/codemirror")
    .map(importPath => {
      console.log("import", importPath)
      let name = importPath.split("/").pop().replace(/[-.]/g, "");
      return `import ${name} from "${importPath}"`
    })

  const functionImportLines = imports
    .filter(path => path.substring(0, 1) == "." && path != "../lib/codemirror")
    .map(importPath => {
      let name = importPath.split("/").pop().replace(/[-.]/g, "");
      return `${name}(CodeMirror)`;
    })

  functionLines.splice(1, 0, ...functionImportLines);

  const esOutput = [
    `// Source: https://github.com/codemirror/CodeMirror/tree/master/${path.substring(2)}`,
  ].concat(
    headerImportLines,
    functionLines,
  ).join('\n')
  
  fsExtra.outputFileSync(`./src/${path.substring(2)}`, esOutput)
}
