var resolve, ESDB;

resolve = require('path').resolve;
ESDB = require(resolve(__dirname, 'index.js'));

ESDB.createDb('DB_name', function (error, dbAccessor) {
    if (!error) {
        dbAccessor.createTable('TB_name', function (error, tbAccessor) {
            if (!error) {
                tbAccessor.createColumn('COL_name', true, function (error) {
                    if (!error) {
                        tbAccessor.insertRecords([{
                            COL_name: 1
                        },{
                            COL_name: 2
                        }], function (error) {
                                if (!error) {
                                    tbAccessor.selectRecords(['COL_name'], function (record, index, breakLoop) {
                                        // records selection
                                    }, function (error) {
                                        console.log(error || 'ok');
                                    });
                                } else {
                                    console.log(error);
                                }
                            }
                        );
                    } else {
                        console.log(error);
                    }
                });
            } else {
                console.log(error);
            }
        });
    } else {
        console.log(error);
    }
});