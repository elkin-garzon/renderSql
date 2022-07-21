# rendersql
Una libreria para generar scripts sql

## Install
``` sh
npm i rendersql
```

## Usage 
Import your proyect
```js
import  Query  from 'rendersql';

let table = new Array('users');
let columns = new Array('id', 'name');
let params = {
    size: '10',
    page: '1'
}

new Query(table, columns, params).renderSQl()
```

## Example return class Query
```js
{
    "select": "SELECT id,nombre FROM  usuarios    LIMIT 0, 31",
    "count": "SELECT count(*) as total FROM  usuarios"
}
```

## Parameter table
Receive an array of strings, references a tables of database.

## Parameter columns
Receive an array of strings, references a columns of tables.
