var fs, readdir, resolve, rmdirRecursive, flushdir;

fs = require('fs');
readdir = fs.readdir;
resolve = require('path').resolve;

flushdir = function flushdir(path, callback) {
    if (rmdirRecursive === undefined) {
        rmdirRecursive = require(resolve(__dirname, 'rmdirRecursive'));
    }
    readdir(path, function (error, files) {
        var current, length;
        
        if (error) {
            callback(error, path);
        } else {
            current = 0;
            length = files.length;
            
            if (length) {
                files.forEach(function (name) {
                    var file;
                    
                    file = resolve(path, name);
                    
                    rmdirRecursive(file, function (error) {
                        if (error) {
                            callback(error, file);
                        } else {
                            current += 1;
                            
                            if (current === length) {
                                callback();
                            }
                        }
                    });
                });
            } else {
                callback();
            }
        }
    });
};

module.exports = flushdir;