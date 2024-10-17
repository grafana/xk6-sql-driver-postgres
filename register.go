// Package ramsql contains RamSQL driver registration for xk6-sql.
package ramsql

import (
	"github.com/grafana/xk6-sql/sql"

	// Blank import required for initialization of driver.
	_ "github.com/proullon/ramsql/driver"
)

func init() {
	sql.RegisterModule("ramsql")
}
