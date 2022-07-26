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
    public params: any;

    //constructor
    constructor(
        table: Array<String>,
        columns: Array<String>,
        params: any
    ) {
        this.table = table;
        this.columns = columns;
        this.params = params
    }

    renderSQl() {
        return {
            select: `${this.select()} ${this.from()} ${this.where()} ${this.groupColumns()} ${this.order()}  ${this.limit()}`,
            count: `${this.count()}`
        }
    }

    /**
     * SELECT DE COLUMNAS DE LA TABLA
     */
    select() {
        return `SELECT ${this.columns}`;
    }

    /**
    * Generar parte de consulta FROM SQL
    */
    from() {
        let from = `FROM `;
        if (this.table.length == 1) {
            from = `${from} ${this.table}`
        } else {
            for (let i = 0; i < this.table.length; i++) {
                if (i == 0) {
                    from = `${from} ${this.table[i]}`
                } else {
                    if (this.table.length > 2) {
                        from = `${from} INNER JOIN ${this.table[i]} ON ${this.table[i-1]}.id_${this.table[i]} = ${this.table[i]}.id`
                    } else {
                        from = `${from} INNER JOIN ${this.table[i]} ON ${this.table[0]}.id_${this.table[i]} = ${this.table[i]}.id`
                    }
                }
            }
        }
        return from;
    }

    order() {
        if (this.params.orderby != undefined && this.params.orderColumn != undefined) {
            return `ORDER BY ${this.params.orderColumn} ${this.params.orderby}`;
        } else {
            return '';
        }

    }

    /**
    * 
    * @param paginaNumero indice de pagina a mostrar
    * @param paginaTamano numero de registros a mostrar
    */
    limit() {
        let page = Number(this.params.page) * Number(this.params.size) - Number(this.params.size);
        return `LIMIT ${page}, ${this.params.size}`
    }

    /**
     * condiciones que llegan en los paramtros urls
     */
    where() {
        let where = `WHERE `;
        if (this.params.filterCondition != undefined) {
            if (Array.isArray(this.params.filterCondition)) {
                let iteration = this.params.filterCondition.length;
                for (let i = 0; i < iteration; i++) {
                    where = `${where} ${this.params.filterColumn[i]} ${this.params.filterCondition[i]} ${this.params.fllterValue[i]}`;
                    if (this.params.filterRelation && !Array.isArray(this.params.filterRelation)) {
                        if (i == 0) {
                            where = `${where} ${this.params.filterRelation}`;
                        }
                    } else if (this.params.filterRelation && Array.isArray(this.params.filterRelation)) {
                        if (this.params.filterRelation[i] != undefined) {
                            where = `${where} ${this.params.filterRelation[i]}`;
                        }
                    }
                }
                return where;
            } else {
                where = `${where} ${this.params.filterColumn} ${this.params.filterCondition} ${this.params.fllterValue}`;
            }
            return where;
        } else {
            return '';
        }
    }

    groupColumns() {
        if (this.params.groupColumn) {
            return `GROUP BY ${this.params.groupColumn}`;
        } else {
            return '';
        }
    }

    /**
     * conteo de registros
     */
    count() {
        if (this.where().length > 0) {
            return `SELECT count(*) as total ${this.from()} ${this.where()}`;
        } else {
            return `SELECT count(*) as total ${this.from()}`;
        }
    }
}