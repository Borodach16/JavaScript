const get_conn = require('./utils').get_conn;

const conn = get_conn();

let query1 = "SELECT id, DATE_FORMAT(day, '%d.%m.%Y'), city, name, count \
FROM data_set ORDER BY count limit 20";

conn.promise()
    .query(query1)
    .then(([rows]) => console.table(rows))
    .catch((err) => { console.error(err) })
    .then(conn.end());