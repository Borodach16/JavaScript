const ut = require('./utils');  

let query_insert = "INSERT INTO data_set \
(day, city, name, count) \
VALUES \
('2021-04-17', 'Александровск', 'elon musk', 202)";

const conn = ut.get_conn();

conn.promise()
    .query(query_insert)
    .then(() => console.log('row inserted'))
    .catch((err) => console.error(err))
    .then(conn.end());