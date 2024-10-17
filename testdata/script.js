const db = sql.open(driver, connection);

db.exec("CREATE TABLE test_table (id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL, value VARCHAR(50));");

for (let i = 0; i < 5; i++) {
  db.exec("INSERT INTO test_table (name, value) VALUES ('name-" + i + "', 'value-" + i + "');");
}

let all_rows = sql.query(db, "SELECT * FROM test_table;");
if (all_rows.length != 5) {
  throw new Error("Expected all five rows to be returned; got " + all_rows.length);
}

let one_row = sql.query(db, "SELECT * FROM test_table WHERE name = $1;", "name-2");
if (one_row.length != 1) {
  throw new Error("Expected single row to be returned; got " + one_row.length);
}

let no_rows = sql.query(db, "SELECT * FROM test_table WHERE name = $1;", "bogus-name");
if (no_rows.length != 0) {
  throw new Error("Expected no rows to be returned; got " + no_rows.length);
}

db.close();
