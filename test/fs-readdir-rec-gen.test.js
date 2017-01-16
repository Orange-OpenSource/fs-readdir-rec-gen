/**
 * Copyright (C) 2017 Orange
 *
 * This software is distributed under the terms and conditions of the 'MIT'
 * license which can be found in the file 'LICENSE.txt' in this package
 * distribution or at 'http://spdx.org/licenses/MIT'.
 *
 * @author Nicolas MOTEAU <nicolas.moteau@orange.com>
 */

var assert = require('assert');
var path = require('path');

var readdirRecGen = require('../fs-readdir-rec-gen');

describe('fs-readdir-rec-gen', function() {

    it('should list all file in a directory and subdirectories by default', function(done) {
        var dir = 'test/testData';
        var expectedFiles = [
            'abstractsuperclass.js', 'class.js', 'class2.js', 'toto.txt',
            'aa/class3.js', 'aa/toto.txt',
            'aa/bb/b_toto.txt'
        ].map(file => path.join(dir, file));

        var allFiles = [];
        for (file of readdirRecGen(dir)) {
            allFiles.push(file);
        };

        assert.deepEqual(allFiles.sort(), expectedFiles.sort())
        done();
    });

    it('should list all file in a directory and subdirectories explicitly', function(done) {
        var dir = 'test/testData';
        var expectedFiles = [
            'abstractsuperclass.js', 'class.js', 'class2.js', 'toto.txt',
            'aa/class3.js', 'aa/toto.txt',
            'aa/bb/b_toto.txt'
        ].map(file => path.join(dir, file));

        var allFiles = [];
        for (file of readdirRecGen(dir, true)) {
            allFiles.push(file);
        };

        assert.deepEqual(allFiles.sort(), expectedFiles.sort())
        done();
    });

    it('should list all file in a directory only', function(done) {
        var dir = 'test/testData';
        var expectedFiles = [
            'abstractsuperclass.js', 'class.js', 'class2.js', 'toto.txt'
        ].map(file => path.join(dir, file));

        var allFiles = [];
        for (file of readdirRecGen(dir, false)) {
            allFiles.push(file);
        };

        assert.deepEqual(allFiles.sort(), expectedFiles.sort())
        done();
    });

    it('should list all file in a directory and subdirectories without options, with filter', function(done) {
        var dir = 'test/testData';
        var expectedFiles = [
            'abstractsuperclass.js', 'class.js', 'class2.js', 'aa/class3.js'
        ].map(file => path.join(dir, file));

        function dotJsFilesFilter(fileName) {
            return fileName.endsWith('.js');
        };
        var allFiles = [];
        for (file of readdirRecGen(dir, dotJsFilesFilter)) {
            allFiles.push(file);
        };

        assert.deepEqual(allFiles.sort(), expectedFiles.sort())
        done();
    });

    it('should list all file in a directory and subdirectories explicitly, without options, with filter', function(done) {
        var dir = 'test/testData';
        var expectedFiles = [
            'abstractsuperclass.js', 'class.js', 'class2.js', 'aa/class3.js'
        ].map(file => path.join(dir, file));

        function dotJsFilesFilter(fileName) {
            return fileName.endsWith('.js');
        };
        var allFiles = [];
        for (file of readdirRecGen(dir, dotJsFilesFilter, true)) {
            allFiles.push(file);
        };

        assert.deepEqual(allFiles.sort(), expectedFiles.sort())
        done();
    });

    it('should list all file in a directory and not subdirectories without options, with filter', function(done) {
        var dir = 'test/testData';
        var expectedFiles = [
            'abstractsuperclass.js', 'class.js', 'class2.js'
        ].map(file => path.join(dir, file));

        function dotJsFilesFilter(fileName) {
            return fileName.endsWith('.js');
        };
        var allFiles = [];
        for (file of readdirRecGen(dir, dotJsFilesFilter, false)) {
            allFiles.push(file);
        };

        assert.deepEqual(allFiles.sort(), expectedFiles.sort())
        done();
    });

    it('should list all file in a directory and subdirectories with options', function(done) {
        var dir = 'test/testData';
        var expectedFiles = [
            'abstractsuperclass.js', 'class.js', 'class2.js', 'toto.txt',
            'aa/class3.js', 'aa/toto.txt',
            'aa/bb/b_toto.txt'
        ].map(file => path.join(dir, file));

        var options = 'utf-8';
        var allFiles = [];
        for (file of readdirRecGen(dir, options)) {
            allFiles.push(file);
        };

        assert.deepEqual(allFiles.sort(), expectedFiles.sort())
        done();
    });

    it('should list all file in a directory and subdirectories with options & filter', function(done) {
        var dir = 'test/testData';
        var expectedFiles = [
            'abstractsuperclass.js', 'class.js', 'class2.js', 'aa/class3.js'
        ].map(file => path.join(dir, file));

        var options = 'utf-8';

        function dotJsFilesFilter(fileName) {
            return fileName.endsWith('.js');
        };
        var allFiles = [];
        for (file of readdirRecGen(dir, options, dotJsFilesFilter)) {
            allFiles.push(file);
        };

        assert.deepEqual(allFiles.sort(), expectedFiles.sort())
        done();
    });

    it('should list all file in a directory and subdirectories with options & filter & recursive=true', function(done) {
        var dir = 'test/testData';
        var expectedFiles = [
            'abstractsuperclass.js', 'class.js', 'class2.js', 'aa/class3.js'
        ].map(file => path.join(dir, file));

        var options = 'utf-8';

        function dotJsFilesFilter(fileName) {
            return fileName.endsWith('.js');
        };
        var allFiles = [];
        for (file of readdirRecGen(dir, options, dotJsFilesFilter, true)) {
            allFiles.push(file);
        };

        assert.deepEqual(allFiles.sort(), expectedFiles.sort())
        done();
    });

    it('should list all file in a directory and subdirectories with options & filter & recursive=false', function(done) {
        var dir = 'test/testData';
        var expectedFiles = [
            'abstractsuperclass.js', 'class.js', 'class2.js'
        ].map(file => path.join(dir, file));

        var options = 'utf-8';

        function dotJsFilesFilter(fileName) {
            return fileName.endsWith('.js');
        };
        var allFiles = [];
        for (file of readdirRecGen(dir, options, dotJsFilesFilter, false)) {
            allFiles.push(file);
        };

        assert.deepEqual(allFiles.sort(), expectedFiles.sort())
        done();
    });

    it('should throw a no such file or directory exception', function(done) {
        var dir = 'test/badDirName';
        assert.throws(
            function () {
                readdirRecGen(dir);
            },
            function(err) {
                if ( (err instanceof Error) && /Error: ENOENT: no such file or directory/.test(err) ) {
                    return true;
                }
            },
            'Unexpected error');
        done();
    });

});
