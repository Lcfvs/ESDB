var fs, stat, unlink, rmdir, resolve, flushdir, rmdirRecursive;

fs = require('fs');
stat = fs.stat;
unlink = fs.unlink;
rmdir = fs.rmdir;
resolve = require('path').resolve;

rmdirRecursive = function rmdirRecursive(path, callback) {
    if (flushdir === undefined) {
        flushdir = require(resolve(__dirname, 'flushdir'));
    }
    stat(path, function (error, stats) {
        if (error) {
            callback(error, path);
        } else if (stats.isFile()) {
            unlink(path, function (error) {
                if (error) {
                    callback(error, path);
                } else {
                    callback();
                }
            });
        } else if (stats.isDirectory()) {
            flushdir(path, function(error, errorPath) {
                if (error) {
                    callcack(error, errorPath);
                } else {
                    rmdir(path, callback);
                }
            });
        }
    });
};

module.exports = rmdirRecursive;