# rendersql
Una libreria para generar scripts sql

## Install
``` sh
    npm i rendersql
```

## Usage 
Import your priyect
```js
    import  Query  from 'rendersql';

    let table = new Array('table1');
    let columns = new Array('id', 'name');
    let params = {}

    new Query(table, columns, params)
```

## Parameter table
Receive an array of strings, references a tables of database.

## Parameter columns
Receive an array of strings, references a columns of tables.
