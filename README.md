# xk6-sql-driver-postgres

Database driver extension for [xk6-sql](https://github.com/grafana/xk6-sql) k6 extension to support Postgres database.

## Example

```JavaScript file=examples/example.js
import sql from "k6/x/sql";
import driver from "k6/x/sql/driver/postgres";

// The second argument is a PostgreSQL connection string, e.g.
// postgres://myuser:mypass@127.0.0.1:5432/postgres?sslmode=disable
const db = sql.open(driver, "");

export function setup() {
  db.exec(`CREATE TABLE IF NOT EXISTS keyvalues (
    id SERIAL PRIMARY KEY,
    key varchar(50) NOT NULL,
    value varchar(50)
  )`);
}

export function teardown() {
  db.close();
}

export default function () {
  db.exec("INSERT INTO keyvalues (key, value) VALUES('plugin-name', 'k6-plugin-sql');");
  let results = sql.query(db, "SELECT * FROM keyvalues WHERE key = $1;", "plugin-name");
  for (const row of results) {
    console.log(`key: ${row.key}, value: ${row.value}`);
  }
}
```

## Usage

Check the [xk6-sql documentation](https://github.com/grafana/xk6-sql) on how to use this database driver.

---

> [!IMPORTANT]
>
> ## TODO
>
> This is a repository template for creating an xk6-sql driver repository.
>
> After creating the driver repository, remember the following:
>
> - replace `Postgres` with the database name in:
>   -  `README.md`
> - replace `postgres` with the database driver name in:
>   - `README.md`
>   - `register.go`
>   - `register_test.go`
>   - `examples/example.js`
> - update SQL statements to match the database's SQL dialect in:
>   -  `testdata/script.js`
>   -  `examples/example.js`
>   -  `README.md`
> - change the go package and module name:
>   - `go.mod`
>   - `register.go`
>   - `register_test.go`
>   - `Makefile`
> - remove this alert blockquote from `README.md`

