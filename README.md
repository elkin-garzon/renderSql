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
// return 
{
    "select": "SELECT id,nombre FROM  usuarios    LIMIT 0, 31",
    "count": "SELECT count(*) as total FROM  usuarios"
}
```

## Example return class Query
```js

```

```js
let table = new Array('users');
let columns = new Array('id', 'name');
let params = {
    size: '10',
    page: '1',
    filterColumn: 'id' 
    filterCondition: '='
    fllterValue: '1'
}

new Query(table, columns, params).renderSQl()
// return 
{
    "select": "SELECT id,nombre FROM  usuarios WHERE  id = 1  LIMIT 0, 10",
    "count": "SELECT count(*) as total FROM  usuarios WHERE  id_sucursal in (1)"
}
```

```js
let table = new Array('users');
let columns = new Array('id', 'name');
let params = {
    size: '10',
    page: '1',
    filterColumn: ['id', 'status'] 
    filterCondition: ['=', '!=']
    fllterValue: ['1', '0'],
    filterRelation: 'and'
}

new Query(table, columns, params).renderSQl()
// return 
{
    "select": "SELECT id,name FROM  users WHERE  id = 1 and status != 0 LIMIT 0, 31",
    "count": "SELECT count(*) as total FROM  users WHERE  id = 1 and status != 0 LIMIT 0, 31"
}
```
