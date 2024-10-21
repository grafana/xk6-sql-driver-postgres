import sql from "k6/x/sql";
import driver from "k6/x/sql/driver/postgres";

// The second argument is a PostgreSQL connection string, e.g.
// postgres://myuser:mypass@127.0.0.1:5432/postgres?sslmode=disable
const db = sql.open(driver, "");

export function setup() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS keyvalues
      (
        id SERIAL PRIMARY KEY,
        key VARCHAR(50) NOT NULL,
        value VARCHAR(50)
      );
  `);
}

export function teardown() {
  db.close();
}

export default function () {
  let result = db.exec(`
    INSERT INTO roster
      (given_name, family_name)
    VALUES
      ('Peter', 'Pan'),
      ('Wendy', 'Darling'),
      ('Tinker', 'Bell'),
      ('James', 'Hook');
  `);
  console.log(`${result.rowsAffected()} rows inserted`);

  let rows = db.query("SELECT * FROM roster WHERE given_name = $1;", "Peter");
  for (const row of rows) {
    console.log(`${row.family_name}, ${row.given_name}`);
  }
}
