/**
 * Copyright (C) 2017 Orange
 *
 * This software is distributed under the terms and conditions of the 'MIT'
 * license which can be found in the file 'LICENSE.txt' in this package
 * distribution or at 'http://spdx.org/licenses/MIT'.
 *
 * @author Nicolas MOTEAU <nicolas.moteau@orange.com>
 */

var fs = require('fs');
var path = require('path');

/**
 * Get a generator for file names contained in a directory an subdirectories.
 * The file names contain their relative path.
 * @param dir {String} - the directory where to look for files.
 * @param options {String|Object} - optional, options passed NodeJs File System API (see https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback).
 * @param filter {Function} - optional, a function to filter on file names. Defaults to no filter.
 * @param recursive {Boolean} - optional, whether to search in sub directories. Defaults to true.
 * @return a generator for files names
 */
function readdirRecGen(dir, options = undefined, filter = undefined, recursive = true) {
    /* Manage optional arguments only once in recursive calls*/
    if (typeof options !== 'string' && typeof options !== 'object') {
        // Shift arguments
        recursive = filter !== undefined ? filter : true;
        filter = options;
        options = undefined;
    }
    if (typeof filter !== 'function') {
        // Shift arguments
        recursive = filter !== undefined ? filter : true;
        filter = undefined;
    }

    // Check directory existence
    fs.statSync(dir);

    return _readdirRecGen(dir, options, filter, recursive);
}

/**
 * Get a generator for file names contained in a directory an subdirectories.
 * The file names contain their relative path.
 * @param dir {String} - the directory where to look for files
 * @param options {String|Object} - options passed NodeJs File System API (see https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)
 * @param filter {Function} - a function to filter on file names. If undefined, defaults to no filter.
 * @param recursive {Boolean} - whether to search in sub directories.
 * @return a generator for files names
 * @private
 */
function* _readdirRecGen(dir, options, filter, recursive) {
    for (let file of fs.readdirSync(dir, options)) {
        var relativePathFileName = path.join(dir, file);
        if (fs.statSync(relativePathFileName).isDirectory()) {
            if (recursive) {
                yield* _readdirRecGen(relativePathFileName, options, filter, recursive);
            }
        } else {
            if (filter) {
                if (filter(relativePathFileName)) {
                    yield relativePathFileName;
                }
            } else {
                yield relativePathFileName;
            }
        }
    }
}

module.exports = readdirRecGen;
