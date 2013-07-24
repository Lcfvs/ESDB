/* 
Copyright 2013 Lcf.vs
Released under the MIT license
https://github.com/Lcfvs/ESDB
*/
var fs, path,
    stat, mkdir, writeFile, readFile,
    sep, resolve,
    utilsDir, flushdir, rmdirRecursive,
    dbDirectory, databases, loadTable, getView, LoopBreaker,
    sendDbAccessor, sendTbAccessor;

(function ( /* natives */ ) {
    fs = require('fs');
    path = require('path');
}());

(function ( /* shortcuts */ ) {
    stat = fs.stat;
    mkdir = fs.mkdir;
    writeFile = fs.writeFile;
    readFile = fs.readFile;
    sep = path.sep;

    resolve = (function () {
        var resolve;

        resolve = path.resolve;

        return function () {
            var arg0, arg1;

            arg0 = arguments[0];
            arg1 = arguments[1];

            return arg1 === undefined ? resolve(__dirname, arg0) : resolve(arg0, arg1);
        };
    }());
}());

(function ( /* utils */ ) {
    utilsDir = resolve('utils');
    flushdir = require(resolve(utilsDir, 'flushdir'));
    rmdirRecursive = require(resolve(utilsDir, 'rmdirRecursive'));
}());

(function ( /* commons */ ) {
    dbDirectory = resolve('databases');
    databases = {};

    loadTable = function loadTable(dbName, tbName, tbPath, accessor, callback) {
        readFile(tbPath, 'utf-8', function (err, data) {
            var error, table;

            if (err) {
                error = new Error('Unable to load table ' + dbName + '::' + tbName);
            } else {
                table = databases[dbName].tables[tbName] = JSON.parse(data);
                table.accessor = accessor;
            }

            callback(error);
        });
    };

    getView = function getView(dbName, tbName, labels, selector, callback) {
        var table, view, columns, columnLabels, record, index, error, securedRecord, stack, loopBreaker;

        table = databases[dbName].tables[tbName];
        view = {};
        columns = table.columns;
        columnLabels = Object.keys(columns);

        if (!isNaN(selector) && Math.abs(parseInt(selector, 10)) === selector) {
            record = {};
            index = selector.toString();

            labels.every(function (label) {
                if (columnLabels.indexOf(label) === -1) {
                    error = new Error('Label "' + label + '" not found in ' + dbName + '::' + tbName);
                } else {
                    record[label] = columns[label].data[index];
                }

                return !!error;
            });

            securedRecord = JSON.parse(JSON.stringify(record));
            view[index] = securedRecord;
        } else if (typeof selector === 'function') {
            stack = columns[columnLabels[0]];

            for (index in stack) {
                record = {};

                labels.every(function (label) {
                    if (columnLabels.indexOf(label) === -1) {
                        error = new Error('Label "' + label + '" not found in ' + dbName + '::' + tbName);
                    } else {
                        record[label] = columns[label].data[index];
                    }

                    return !!error;
                });

                loopBreaker = new LoopBreaker;

                if (error) {
                    loopBreaker.breakLoop();
                } else {
                    securedRecord = JSON.parse(JSON.stringify(record));

                    if (selector(securedRecord, parseInt(index), loopBreaker.breakLoop)) {
                        view[index] = securedRecord;
                    }
                }

                if (loopBreaker.getState()) {
                    break;
                }
            }
        } else {
            error = new Error('Invalid selector on ' + dbName + '::' + tbName);
        }

        callback(error, view);
    };

    LoopBreaker = function LoopBreaker() {
        var state;

        state = false;

        this.getState = function getState() {
            return state;
        };
        this.breakLoop = function breakLoop() {
            state = true;
        };
    };
}());

(function ( /* core */ ) {
    sendDbAccessor = function sendDbAccessor(dbName, dbPath, callback) {
        var accessor;

        if (databases[dbName] === undefined) {

            accessor = {
                createTable: function createTable(tbName, callback) {
                    var tbPath;

                    tbPath = resolve(dbPath, tbName + '.json');

                    writeFile(tbPath, '{"columns":{},"autoIncrement":-1}', {
                        flag: 'wx'
                    }, function (error) {
                        if (error) {
                            callback(new Error('Table "' + dbName + sep + tbName + '" already exists'));
                        } else {
                            sendTbAccessor(dbName, tbName, tbPath, callback);
                        }
                    });
                },

                selectTable: function selectTable(tbName, callback) {
                    var tbPath;

                    tbPath = resolve(dbPath, tbName + '.json');

                    stat(tbPath, function (error, stats) {
                        if (error || !stats.isFile()) {
                            callback(new Error('Unknown table "' + tbName + '" in "' + dbName + '"'));
                        } else {
                            sendTbAccessor(dbName, tbName, tbPath, callback);
                        }
                    });
                },

                truncateTable: function truncateTable(tbName, callback) {
                    var columnLabels, tbPath;

                    tbPath = resolve(dbPath, tbName + '.json');
                    columnLabels = Object.keys(databases[dbName].tables[tbName].columns);

                    writeFile(tbPath, '{"columns":{' + (columnLabels.length === 0 ? '' : '"' + columnLabels.join('":{},"') + '":{}') + '},"autoIncrement":-1}', {
                        flag: 'r+'
                    }, function (error) {
                        if (error) {
                            callback(error);
                        } else {
                            sendTbAccessor(dbName, tbName, tbPath, callback);
                        }
                    });
                },

                flushTable: function flushTable(tbName, callback) {
                    var tbPath;

                    tbPath = resolve(dbPath, tbName + '.json');

                    writeFile(tbPath, '{"columns":{},"autoIncrement":-1}', {
                        flag: 'r+'
                    }, function (error) {
                        if (error) {
                            callback(error);
                        } else {
                            sendTbAccessor(dbName, tbName, tbPath, callback);
                        }
                    });
                },

                dropTable: function dropTable(tbName, callback) {
                    var tbPath;

                    tbPath = resolve(dbPath, tbName + '.json');

                    unlink(tbPath, function (error) {
                        if (error) {
                            callback(error);
                        } else {
                            delete databases[dbName][tbName];
                            callback();
                        }
                    });
                }
            };

            Object.freeze(accessor);

            databases[dbName] = {
                tables: {},
                accessor: accessor
            };
        }

        callback(null, databases[dbName].accessor);
    };

    sendTbAccessor = function sendTbAccessor(dbName, tbName, tbPath, callback) {
        var db, table;

        db = databases[dbName];

        if (db.tables[tbName] === undefined) {
            table = db.tables[tbName];

            accessor = {
                createColumn: function createColumn(label, isUnique, callback) {
                    var db, table, columns, columnLabels, currentIndex, error;

                    db = databases[dbName];
                    table = JSON.parse(JSON.stringify(db.tables[tbName]));
                    columns = table.columns;

                    if ( !! isUnique !== isUnique) {
                        error = new Error('Invalid isUnique value in ' + dbName + '::' + tbName);
                    } else if (table.autoIncrement !== -1) {
                        error = new Error('Unable to create a new column in a non-empty table on ' + dbName + '::' + tbName);
                    } else if (columns.hasOwnProperty(label)) {
                        error = new Error('Label "' + lbName + '" already exists in ' + dbName + '::' + tbName);
                    } else {
                        columns[label] = {
                            isUnique: !! isUnique,
                            data: {}
                        };

                        delete table.accessor;

                        writeFile(tbPath, JSON.stringify(table), {
                            flag: 'r+'
                        }, function (error) {
                            if (error) {
                                callback(error);
                            } else {
                                loadTable(dbName, tbName, tbPath, db.tables[tbName].accessor, function () {
                                    callback(error, currentIndex);
                                });
                            }
                        });

                        return;
                    }

                    callback(error);
                },

                dropColumn: function dropColumn(label, callback) {
                    var db, table, columns, columnLabels, currentIndex, error;

                    db = databases[dbName];
                    table = JSON.parse(JSON.stringify(db.tables[tbName]));
                    columns = table.columns;

                    if (table.autoIncrement !== -1) {
                        error = new Error('Unable to delete a column in a non-empty table on ' + dbName + '::' + tbName);
                    } else if (!columns.hasOwnProperty(label)) {
                        error = new Error('Label "' + lbName + '" not found in ' + dbName + '::' + tbName);
                    } else {
                        delete columns[label];
                        delete table.accessor;

                        writeFile(tbPath, JSON.stringify(table), {
                            flag: 'r+'
                        }, function (error) {
                            if (error) {
                                callback(error);
                            } else {
                                loadTable(dbName, tbName, tbPath, db.tables[tbName].accessor, function () {
                                    callback(error, currentIndex);
                                });
                            }
                        });

                        return;
                    }

                    callback(error);
                },

                insertRecords: function insertRecords(data, callback) {
                    var db, table, tableValues, columns, columnLabels, currentIndex, error;

                    db = databases[dbName];
                    table = db.tables[tbName];
                    tableValues = {};
                    columns = table.columns;
                    columnLabels = Object.keys(columns);
                    currentIndex = table.autoIncrement > -1 ? table.autoIncrement : -1;

                    columnLabels.forEach(function (label) {
                        var column, data, dataKeys;

                        column = table.columns[label];
                        data = column.data;
                        dataKeys = Object.keys(data);

                        if (column.isUnique) {
                            tableValues[label] = [];

                            dataKeys.forEach(function (value) {
                                tableValues[label].push(JSON.stringify(data[value]));
                            });
                        }
                    });

                    data.every(function (record, index) {
                        var recordLabels;

                        recordLabels = Object.keys(record);

                        recordLabels.every(function (label) {
                            if (columnLabels.indexOf(label) === -1) {
                                error = new Error('Invalid data labels, expected ' + columnLabels + ' but ' + recordLabels + ' found on ' + dbName + '/' + tbName);
                            }

                            return !error;
                        });

                        if (!error) {
                            currentIndex += 1;

                            columnLabels.every(function (label) {
                                var value;

                                value = record.hasOwnProperty(label) ? JSON.parse(JSON.stringify(record[label])) : null;

                                if (value !== null && tableValues[label] !== undefined && tableValues[label].indexOf(value) !== -1) {
                                    error = new Error('Invalid unique "' + label + '" value in ' + dbName + '::' + tbName);
                                } else {
                                    columns[label].data[currentIndex.toString()] = value;
                                }

                                return !error;
                            });

                            table.autoIncrement = currentIndex;
                        }

                        return !error;
                    });

                    delete table.accessor;

                    if (!error) {
                        writeFile(tbPath, JSON.stringify(table), {
                            flag: 'r+'
                        }, function (error) {
                            if (error) {
                                callback(error);
                            } else {
                                loadTable(dbName, tbName, tbPath, db.tables[tbName].accessor, function () {
                                    callback(error, currentIndex);
                                });
                            }
                        });

                        return;
                    }
                    callback(error);
                },

                selectRecords: function selectRecords(labels, selector, callback) {
                    getView(dbName, tbName, labels, selector, function (error, view) {
                        callback(error, view !== undefined ? JSON.parse(JSON.stringify(view)) : undefined);
                    });
                },

                updateRecords: function updateRecords(labels, selector, updater, callback) {
                    getView(dbName, tbName, labels, selector, function (error, view) {
                        var db, table, tableValues, columns, securedView, indexes, index, currentIndex, record, response;

                        if (!error) {
                            db = databases[dbName];
                            table = JSON.parse(JSON.stringify(db.tables[tbName]));
                            tableValues = {};
                            columns = table.columns;
                            securedView = JSON.parse(JSON.stringify(view));
                            indexes = Object.keys(securedView);

                            columnLabels.forEach(function (label) {
                                var column, data, dataKeys;

                                column = table.columns[label];
                                data = column.data;
                                dataKeys = Object.keys(data);

                                if (column.isUnique) {
                                    tableValues[label] = [];

                                    dataKeys.forEach(function (value) {
                                        tableValues[label].push(JSON.stringify(data[value]));
                                    });
                                }
                            });

                            if (indexes.length > 0) {
                                for (index in indexes) {
                                    currentIndex = indexes[index];
                                    response = updater(securedView[currentIndex], parseInt(currentIndex));

                                    if (response) {
                                        labels.every(function (label) {
                                            var value;

                                            value = response[label];

                                            if (value !== null && tableValues[label] !== undefined && tableValues[label].indexOf(value) !== -1) {
                                                error = new Error('Invalid unique "' + label + '" value in ' + dbName + '::' + tbName);
                                            } else {
                                                columns[label].data[currentIndex] = value;
                                            }
                                            return !error;
                                        });
                                    }

                                    if (error) {
                                        break;
                                    }
                                }

                                delete table.accessor;

                                writeFile(tbPath, JSON.stringify(table), {
                                    flag: 'r+'
                                }, function (error) {
                                    if (error) {
                                        callback(error);
                                    } else {
                                        loadTable(dbName, tbName, tbPath, db.tables[tbName].accessor, function () {
                                            callback(error, currentIndex);
                                        });
                                    }
                                });
                            }
                        }

                        callback(error);
                    });
                },

                dropRecords: function dropRecords(labels, selector, callback) {
                    getView(dbName, tbName, labels, selector, function (error, view) {
                        var db, table, columns, columnLabels, indexes, index, currentIndex, record;

                        if (!error) {
                            db = databases[dbName];
                            table = JSON.parse(JSON.stringify(db.tables[tbName]));
                            columns = table.columns;
                            columnLabels = Object.keys(columns);
                            indexes = Object.keys(view);

                            if (indexes.length > 0) {
                                for (index in indexes) {
                                    currentIndex = indexes[index];

                                    columnLabels.forEach(function (label) {
                                        delete columns[label].data[currentIndex];
                                    });
                                }

                                delete table.accessor;

                                writeFile(tbPath, JSON.stringify(table), {
                                    flag: 'r+'
                                }, function (error) {
                                    if (error) {
                                        callback(error);
                                    } else {
                                        loadTable(dbName, tbName, tbPath, db.tables[tbName].accessor, function () {
                                            callback(error, currentIndex);
                                        });
                                    }
                                });

                                return;
                            }
                        }

                        callback(error);
                    });
                },

                get lastRecordIndex() {
                    return databases[dbName].tables[tbName].autoIncrement;
                }
            };

            Object.freeze(accessor);

            loadTable(dbName, tbName, tbPath, accessor, function (error) {
                var table;

                if (!error) {
                    table = db.tables[tbName];
                    callback(null, db.tables[tbName].accessor);
                } else {
                    callback(error);
                }
            });
        } else {
            table = db.tables[tbName];
            callback(null, table.accessor);
        }
    };
}());

(function (exports) {
    exports.createDb = function createDb(dbName, callback) {
        var dbPath;

        dbPath = resolve(dbDirectory, dbName);

        mkdir(dbPath, function (error) {
            if (error) {
                callback(new Error('Database "' + dbName + '" already exists'));
            } else {
                sendDbAccessor(dbName, dbPath, callback);
            }
        });
    };

    exports.selectDb = function selectDb(dbName, callback) {
        var dbPath;

        if (databases[dbName] === undefined) {
            dbPath = resolve(dbDirectory, dbName);

            stat(dbPath, function (error, stats) {
                if (error || !stats.isDirectory()) {
                    callback(new Error('Unknown database "' + dbName + '"'));
                } else {
                    sendDbAccessor(dbName, dbPath, callback);
                }
            });
        } else {
            callback(null, databases[dbName].accessor);
        }
    };

    exports.flushDb = function flushDb(dbName, callback) {
        var dbPath;

        dbPath = resolve(dbDirectory, dbName);

        flushDir(dbPath, function (error, errorPath) {
            if (!error) {
                delete databases[dbName];
                sendDbAccessor(dbName, dbPath, callback);
            }

            if (dbPath === errorPath) {
                callback(new Error('Unknown database "' + dbName + '"'));
            } else {
                callback(error, dbPath);
            }
        });
    };

    exports.dropDb = function dropDb(dbName, callback) {
        var dbPath;

        dbPath = resolve(dbDirectory, dbName);

        rmdirRecursive(dbPath, function (error, errorPath) {
            if (!error) {
                delete databases[dbName];
            }

            if (dbPath === errorPath) {
                callback(new Error('Unknown database "' + dbName + '"'));
            } else {
                callback(error, dbPath);
            }
        });
    };
}(module.exports));
