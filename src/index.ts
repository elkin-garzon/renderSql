export default class Query {
    /**
     * tables for database
     */
    public table: Array<String>;

    /**
     * columns tables database
     */
    public columns: Array<String>;

    /**
     * parameters search
     */
    public params: Array<String>;

    //constructor
    constructor(
        table: Array<String>,
        columns: Array<String>,
        params: Array<String>
    ) {
        this.table = table;
        this.columns = columns;
        this.params = params
    }


    /**
     * SELECT DE COLUMNAS DE LA TABLA
     */
    select() {
        return `SELECT ${this.columns}`;
    }
}