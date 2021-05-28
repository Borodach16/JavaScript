const get_conn = require('./utils').get_conn;

let query_truncate = "TRUNCATE data_set";
let query_delete = "DELETE FROM data_set";

// сравнить DELETE vs TRUNCATE - delete не обнуляет индексацию 

const conn = get_conn();

conn.promise()
    .query(query_truncate)
    .then(() => console.log('table truncated'))
    .catch((err) => console.error(err))
    .then(conn.end());