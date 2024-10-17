# xk6-sql-driver-ramsql

Database driver extension for [xk6-sql](https://github.com/grafana/xk6-sql) k6 extension to support RamSQL database.

## Example

```JavaScript file=examples/example.js
import sql from "k6/x/sql";
import driver from "k6/x/sql/driver/ramsql";

const db = sql.open(driver, "test_db");

export function setup() {
  db.exec(`CREATE TABLE IF NOT EXISTS namevalue (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             name VARCHAR NOT NULL,
             value VARCHAR
           );`);
}

export function teardown() {
  db.close();
}

export default function () {
  db.exec("INSERT INTO namevalue (name, value) VALUES('extension-name', 'xk6-foo');");

  let results = sql.query(db, "SELECT * FROM namevalue WHERE name = $1;", "extension-name");
  for (const row of results) {
    console.log(`name: ${row.name}, value: ${row.value}`);
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
> - replace `RamSQL` with the database name in:
>   -  `README.md`
> - replace `ramsql` with the database driver name in:
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

