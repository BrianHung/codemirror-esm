const fs = require('fs');

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

readDirAndGetFilePaths('./src')
  .forEach(path => { 
    const t = (path.split("/")[4] || path.split("/")[3]).replace(".js", "").replace(/[-.]/g, "")
    console.log(`export { default as ${t} } from '.${path.substring(5)}'`)
  })