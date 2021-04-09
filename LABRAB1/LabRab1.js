var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];

rl.on('line', function(line){
    lines.push(line);
});

rl.on('close', () => {
    let n = lines[0];
    let line = new Array();
    for(let i = 1; i <= 20; i++){
        var tmp = {
            Language: lines[i].split(';')[0],
            Rating: +lines[i].split(';')[1]
        }
        line.push(tmp);
    }
    line.sort((a,b) => a.Rating - b.Rating);

    console.log();
    console.log();
    console.log(line);
});