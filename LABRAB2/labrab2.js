const fs = require("fs")
const { values } = require("lodash")
const _ = require('lodash')

function task1(){
    let colors = require('./colors.json')
    console.log(_(colors)
            .map(x => Object.keys(x)[0])
            .filter(x => x.length < 6)
            .sortBy()
            .value())
}

function task2(){
    let colors = require('./colors.json')
    console.log(_(colors)
            .map(el => {return {'color': Object.keys(el)[0], 'rgb': Object.values(el)[0].slice(0,3)}})
            .sortBy(a => a.color)
            .value())
}

function task3(){
    let users = require('./users.json')
    console.log(_(users)
            .filter(el => el.address.geo.lat < 0)
            .map(el => {return {'username': el.username, 'city': el.address.city}})   
            .orderBy(['city'], ['desc'])
            .value())
}

function task4(){
    let clients = require('./clients.json').clients
    console.log(_(clients)
            .filter(el => el.address.city === 'Кунгур')
            .orderBy(['gender', 'age', 'name'], ['asc', 'desc', 'asc'])
            .value())
}

function task5(){
    let data = require('./data')
    console.log(_
            .orderBy(_
                .zip(data.colors, _.map(data.argb, x => rgbToHex(x)))
                .map(arr => _.zipObject(['color', 'hex_name'], arr)), ['color'], ['asc']))
}

function rgbToHex (arr) {
    var outParts = [
      arr[0].toString(16),
      arr[1].toString(16),
      arr[2].toString(16),
    ];
  
    outParts.forEach(function (part, i) {
      if (part.length === 1) {
        outParts[i] = '0' + part;
      }
    })
  
    return ('#' + outParts.join(''));
}

task3()