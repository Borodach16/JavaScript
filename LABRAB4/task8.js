const get_conn = require('./utils').get_conn;

const conn = get_conn();

let query1 = "SELECT * FROM data_set where name = (SELECT name FROM data_set WHERE count = (SELECT max(count) FROM `data_set`)) ORDER BY day";

conn.promise()
    .query(query1)
    .then(([rows]) => console.table(rows))
    .catch((err) => { console.error(err) })
    .then(conn.end());