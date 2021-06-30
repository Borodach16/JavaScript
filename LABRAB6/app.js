// npm i hbs express mysql2 ИЛИ npm i если есть package.json
const mysql = require("mysql2");
const express = require("express");

const pool = mysql.createPool({
    host: "pgsha.ru",
    port: "35006",
    user: "soft0067",
    password: "J6M6p979",
    database: "soft0067_labrab06"    
});

const app = express();
const urlencodedParser = express.urlencoded({extended: false});
app.use('/css', express.static(__dirname + '/css'));
app.set("view engine", "hbs");

/* отобразить абитуриентов */

app.get("/", function(req, res) { // получим список абитуриентов
    let query = "SELECT * FROM components";
    pool.query(query, function(err, data) {
        if (err) return console.log(err);
        res.render("index.hbs", {
            components: data
        });
    });
});

/* добавить нового абитуриента */

app.get("/create", function(req, res) { // добавить абитуриента
    res.render("create.hbs");
});

app.post("/create", urlencodedParser, function (req, res) { // сохранить запись в БД
    if (!req.body) return res.sendStatus(400);
    const name = req.body.name;
    const price = req.body.price;
    const rating = req.body.rating;
    const maker = req.body.maker;
    let query = "INSERT INTO components (name, price, rating, maker) VALUES (?,?,?,?)";
    let params = [name, price, rating, maker];
    pool.query(query, params, function(err, data) {
        if (err) return console.error(err);
        res.redirect("/");
    });
});

/* изменить данные абитуриента */

app.get("/edit/:id", function(req, res) {
    const id = req.params.id;
    pool.query("SELECT * FROM components WHERE id=?", [id], function(err, data) {
        if (err) return console.error(err);
        res.render("edit.hbs", {
            component: data[0]
        });
    });
});

app.get("/remove", function(req, res) {
    let query = "TRUNCATE TABLE components";
    pool.query(query, function(err, data) {
        if (err) return console.log(err);
        res.redirect("/");
    });
});

app.get("/backup", function(req, res){
    const ctj = require('./utils').csv_to_json;
    const get_conn = require('./utils').get_conn;

    let array = ctj('./csv/data.csv');
    let inserted_rows = array.map(item => Object.values(item));

    let query_truncate = "TRUNCATE components";
    let query_insert = "INSERT INTO components (name, price, rating, maker) VALUES ? ";
    
    const conn = get_conn();

    conn.promise()
        .query(query_truncate)
        .then(() => { 
            conn.promise()
                .query(query_insert, [inserted_rows])
                .catch((err) => console.error('ins -> ', err));
        })
        .then(() => {
            conn.promise()
                .query("SELECT * FROM components")
                .then(([data]) => {
                    res.render("index.hbs", {
                    components: data
                    });
                })
                .then(conn.end())
                .catch((err) => console.error('sel ->', err));
        })  
        .catch((err) => console.error('trunc ->', err));
})

app.post("/edit", urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const rating = req.body.rating;
    const maker = req.body.maker;
    let query = "UPDATE components SET name=?, price=?, rating=?, maker=? WHERE id=?";
    let params = [name, price, rating, maker, id];
    pool.query(query, params, function(err, data) {
        if (err) return console.error(err);
        res.redirect("/");
    });
});

/* удалить запись про абитуриента */ 

app.post("/delete/:id", function(req, res) {
    const id = req.params.id;
    pool.query("DELETE FROM components WHERE id=?", [id], function(err, data) {
        if (err) return console.log(err);
        res.redirect("/");
    });
});

/* отсортировать абитуриентов */

app.get("/sort/:field.:direct", function(req, res) { // получим список абитуриентов
    const field = req.params.field;
    const direct = req.params.direct;
    let query = "SELECT * FROM components ORDER BY " + field + " " + direct;
    pool.query(query, function(err, data) {
        if (err) return console.log(err);
        res.render("index.hbs", {
            abiturs: data
        });
    });
});

app.listen(3000, function() {
    console.log("смотрим работу через браузер - http://localhost:3000/");
    let isWin = process.platform === "win32";
    let hotKeys = isWin? "Ctrl+C": "Ctrl+D"; // Windows / Linux
    console.log(`остановить сервер - ${hotKeys}`);
});
