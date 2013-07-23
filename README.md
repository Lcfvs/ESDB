ESDB
====

A powerful and lightweight JavaScript Object DBMS, under the MIT license.


ESDB methods :
--------------

<dl>
    <dt>
        <strong>[async] ESDB.createDb(dbName, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Creates a database, asynchronously (if not exists)
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        String <strong>dbName</strong> :
                    </dt>
                    <dd>
                        The name of the new database
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                            <dd>
                                Object <strong>databaseAccessor</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>[async] ESDB.selectDb(dbName, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Selects a database, asynchronously (if exists)
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        String <strong>dbName</strong> :
                    </dt>
                    <dd>
                        The name of the database
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                            <dd>
                                Object <strong>databaseAccessor</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>[async] ESDB.flushDb(dbName, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Flushes a database, asynchronously (if exists)
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        String <strong>dbName </strong>:
                    </dt>
                    <dd>
                        The name of the database
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                            <dd>
                                Object <strong>databaseAccessor</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>[async] ESDB.dropDb(dbName, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Drops a database, asynchronously (if exists)
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        String <strong>dbName</strong> :
                    </dt>
                    <dd>
                        The name of the database
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
</dl>


databaseAccessor methods
------------------------

<dl>
    <dt>
        <strong>[async] databaseAccessor.createTable(tbName, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Creates a table in the selected database, asynchronously (if not exists)
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        String <strong>tbName</strong> :
                    </dt>
                    <dd>
                        The name of the new table
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                            <dd>
                                Object <strong>tableAccessor</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>[async] databaseAccessor.selectTable(tbName, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Selects a table in the selected database, asynchronously (if exists)
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        String <strong>tbName</strong> :
                    </dt>
                    <dd>
                        The name of the table
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                            <dd>
                                Object <strong>tableAccessor</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>[async] databaseAccessor.truncateTable(tbName, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Truncates a table in the selected database, asynchronously (if exists)<br />
                Preserves the table structure
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        String <strong>tbName</strong> :
                    </dt>
                    <dd>
                        The name of the table
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                            <dd>
                                Object <strong>tableAccessor</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>[async] databaseAccessor.flushTable(tbName, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Flushes a table in the selected database, asynchronously (if exists)<br />
                All columns and data are deleted
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        String <strong>tbName</strong> :
                    </dt>
                    <dd>
                        The name of the table
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                            <dd>
                                Object <strong>tableAccessor</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>[async] databaseAccessor.dropTable(tbName, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Drops a table in the selected database, asynchronously (if exists)<br />
                The entire table is deleted
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        String <strong>tbName</strong> :
                    </dt>
                    <dd>
                        The name of the table
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
</dl>


tableAccessor methods & properties :
------------------------------------

<dl>
    <dt>
        <strong>[async] tableAccessor.createColumn(label, isUnique, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Creates a column in the selected table, asynchronously (if not exists)
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        String <strong>label</strong> :
                    </dt>
                    <dd>
                        The name of the column
                    </dd>
                    <dt>
                        Boolean <strong>isUnique</strong> :
                    </dt>
                    <dd>
                        If the column fields values must be uniques (not on objects)
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>[async] tableAccessor.dropColumn(label, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Drops a column in the selected table, asynchronously (if exists)
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        String <strong>label</strong> :
                    </dt>
                    <dd>
                        The name of the column
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>[async] tableAccessor.insertRecords(data, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Inserts some data in the selected table, asynchronously<br />
                Each undefined field is registered as null
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        Object <strong>data</strong> :
                    </dt>
                    <dd>
                        The data object
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                            <dd>
                                Integer <strong>currentIndex</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>[async] tableAccessor.selectRecords(labels, selector, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Selects some data in the selected table, asynchronously
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        Array <strong>labels</strong> :
                    </dt>
                    <dd>
                        The selected column labels list
                    </dd>
                    <dt>
                        Absolute Integer or Function<strong>selector</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                If the selector is an absolute integer :
                            </dt>
                            <dd>
                                This method selects the record with the specified index
                            </dd>
                            <dt>
                                If the selector is a function :
                            </dt>
                            <dd>
                                This method returns all records where the selector returns true
                            </dd>
                            <dd>
                                <dl>
                                    <dt>
                                        Arguments :
                                    </dt>
                                    <dd>
                                        <dl>
                                            <dt>
                                                Object <strong>record</strong> :
                                            </dt>
                                            <dd>
                                                The current record
                                            </dd>
                                            <dt>
                                                Integer <strong>index</strong> :
                                            </dt>
                                            <dd>
                                                The current record index
                                            </dd>
                                            <dt>
                                                Function <strong>loopBreak</strong> :
                                            </dt>
                                            <dd>
                                                A function to stop the loop
                                            </dd>
                                        </dl>
                                    </dd>
                                </dl>
                            </dd>
                        </dl>
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                            <dd>
                                Array <strong>records</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>[async] tableAccessor.updateRecords(labels, selector, updater, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Updates some data in the selected table, asynchronously
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        Array <strong>labels</strong> :
                    </dt>
                    <dd>
                        The selected column labels list
                    </dd>
                    <dt>
                        Absolute Integer or Function<strong>selector</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                If the selector is an absolute integer :
                            </dt>
                            <dd>
                                This method selects the record with the specified index
                            </dd>
                            <dt>
                                If the selector is a function :
                            </dt>
                            <dd>
                                This method returns all records where the selector returns true
                            </dd>
                            <dd>
                                <dl>
                                    <dt>
                                        Arguments :
                                    </dt>
                                    <dd>
                                        <dl>
                                            <dt>
                                                Object <strong>record</strong> :
                                            </dt>
                                            <dd>
                                                The current record
                                            </dd>
                                            <dt>
                                                Integer <strong>index</strong> :
                                            </dt>
                                            <dd>
                                                The current record index
                                            </dd>
                                            <dt>
                                                Function <strong>loopBreak</strong> :
                                            </dt>
                                            <dd>
                                                A function to stop the loop
                                            </dd>
                                        </dl>
                                    </dd>
                                </dl>
                            </dd>
                        </dl>
                    </dd>
                    <dt>
                        Function<strong>updater</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                Role :
                            </dt>
                            <dd>
                                The function that updates the selected record, one at a time
                            </dd>
                            <dd>
                                Returns the updated record
                            </dd>
                            <dd>
                                <dl>
                                    <dt>
                                        Arguments :
                                    </dt>
                                    <dd>
                                        <dl>
                                            <dt>
                                                Object <strong>record</strong> :
                                            </dt>
                                            <dd>
                                                The current record
                                            </dd>
                                            <dt>
                                                Integer <strong>index</strong> :
                                            </dt>
                                            <dd>
                                                The current record index
                                            </dd>
                                        </dl>
                                    </dd>
                                </dl>
                            </dd>
                        </dl>
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>[async] tableAccessor.dropRecords(labels, selector, callback);</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Drops some data in the selected table, asynchronously
            </dd>
            <dt>
                <strong>Arguments :</strong>
            </dt>
            <dd>
                <dl>
                    <dt>
                        Array <strong>labels</strong> :
                    </dt>
                    <dd>
                        The selected column labels list
                    </dd>
                    <dt>
                        Absolute Integer or Function<strong>selector</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                If the selector is an absolute integer :
                            </dt>
                            <dd>
                                This method selects the record with the specified index
                            </dd>
                            <dt>
                                If the selector is a function :
                            </dt>
                            <dd>
                                This method returns all records where the selector returns true
                            </dd>
                            <dd>
                                <dl>
                                    <dt>
                                        Arguments :
                                    </dt>
                                    <dd>
                                        <dl>
                                            <dt>
                                                Object <strong>record</strong> :
                                            </dt>
                                            <dd>
                                                The current record
                                            </dd>
                                            <dt>
                                                Integer <strong>index</strong> :
                                            </dt>
                                            <dd>
                                                The current record index
                                            </dd>
                                            <dt>
                                                Function <strong>loopBreak</strong> :
                                            </dt>
                                            <dd>
                                                A function to stop the loop
                                            </dd>
                                        </dl>
                                    </dd>
                                </dl>
                            </dd>
                        </dl>
                    </dd>
                    <dt>
                        Function <strong>callback</strong> :
                    </dt>
                    <dd>
                        <dl>
                            <dt>
                                <strong>Arguments :</strong>
                            </dt>
                            <dd>
                                Error <strong>error</strong>
                            </dd>
                        </dl>
                    </dd>
                </dl>
            </dd>
        </dl>
    </dd>
    <dt>
        <strong>Integer readonly tableAccessor.lastRecordIndex;</strong>
    </dt>
    <dd>
        <dl>
            <dt>
                <strong>Role :</strong>
            </dt>
            <dd>
                Contains the last record index
            </dd>
        </dl>
    </dd>
</dl>