# A recursive read dir, generator based implementation

A NodeJS module to get a generator for files in a directory and subdirectories, with a file filter capability.

Licence MIT

# API

    fsReadDirRecGen(dir [, options] [, filter] [, recursive=true])

* ```dir``` {String} - the directory where to look for files.
* ```options``` {String|Object} - optional, options passed NodeJs File System API (see [NodeJS' fs API](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)).
* ```filter``` {Function} - optional, a function to filter on file names. Defaults to no filter.
* ```recursive``` {Boolean} - optional, whether to search in sub directories. Defaults to true.

If ```dir``` does not exists, an exception if immediately thrown by NodeJS' ``̀`fs``̀` API.

# Examples
With a simple .js file filter:
```js
var fsReadDirRecGen = require('fs-readdir-rec-gen')

function dotJsFilesFilter(fileName) {
    return fileName.endsWith('.js');
};
for (let file of fsReadDirRecGen('./test/testData', dotJsFilesFilter)) {
    console.log('Relative path to file : ' + file);
}
```
```
Relative path to file : test/testData/aa/class3.js
Relative path to file : test/testData/abstractsuperclass.js
Relative path to file : test/testData/class.js
Relative path to file : test/testData/class2.js
```

With a RegExp file filter:
```js
var fsReadDirRecGen = require('fs-readdir-rec-gen')

function classdotJsFileFilter() {
    var format = RegExp(/.*class.*\.js/i);
    return function (filename) {
        return format.test(filename);
    }
};
for (let file of fsReadDirRecGen('./test/testData', classdotJsFileFilter())){
    console.log('Relative path to file : ' + file);
}
```

Without file filter:
```js
var fsReadDirRecGen = require('fs-readdir-rec-gen')

for (let file of fsReadDirRecGen('./test/testData')){
    console.log('Relative path to file : ' + file);
}
```

More examples in [examples.js](examples.js) and [test dir](test).
