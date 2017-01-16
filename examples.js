/**
 * Copyright (C) 2017 Orange
 *
 * This software is distributed under the terms and conditions of the 'MIT'
 * license which can be found in the file 'LICENSE.txt' in this package
 * distribution or at 'http://spdx.org/licenses/MIT'.
 *
 * @author Nicolas MOTEAU <nicolas.moteau@orange.com>
 */

var fsReadDirRecGen = require('./fs-readdir-rec-gen');
var path = require('path');

// File filter examples
function noHiddenFileFilter(fileName) {
    return fileName[0] !== '.';
};

function dotJsFilesFilter(fileName) {
    return fileName.endsWith('.js');
};

function classDotJsFileFilter() {
    var format = RegExp(/.*class.*\.js/i);
    return function(filename) {
        return format.test(filename);
    }
};

function classDotJsExceptDirFileFilter(exceptDirName) {
    var dirRegExp = RegExp('.*?\/' + exceptDirName + '\/.*');
    var format = RegExp(/.*class.*\.js/i);
    return function(filename) {
        return !dirRegExp.test(filename) && format.test(filename);
    }
};

// API usage examples

console.log('.js files in test/testData and subdirs:');
for (let file of fsReadDirRecGen('./test/testData', dotJsFilesFilter)) {
    console.log('Relative path to file : ' + file);
    console.log('Absolute path to file : ' + path.resolve(file));
}

console.log('All files in test/testData and not in subdirs:');
for (let file of fsReadDirRecGen('./test/testData', false)) {
    console.log('Relative path to file : ' + file);
}

console.log('All files in test/testData and subdirs:');
for (let file of fsReadDirRecGen('./test/testData')) {
    console.log('Relative path to file : ' + file);
}

console.log('All .*class.*.js files in test/testData and subdirs:');
for (let file of fsReadDirRecGen('./test/testData', classDotJsFileFilter())) {
    console.log('Relative path to file : ' + file);
}

console.log('All .*class.*.js files in test/testData and subdirs except "aa" dir:');
for (let file of fsReadDirRecGen('./test/testData', classDotJsExceptDirFileFilter('aa'))) {
    console.log('Relative path to file : ' + file);
}
