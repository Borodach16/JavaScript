const ut = require('./utils');

let array = ut.csv_to_json('./data_set.csv');
let rows = array.map(item => Object.values(item));

let query = "INSERT INTO data_set \
(day, city, name, count) VALUES ? "; // id, 

const conn = ut.get_conn();

conn.promise()
    .query(query, [rows])
    .then(() => console.log('rows inserted'))
    .catch((err) => console.error(err))
    .then(conn.end());