const ut = require('./ut')
const _ = require('lodash')

function task1(){
    let students = ut.csv_to_json('./csv/students.csv')
    console.log(_(students)
            .map(x => +x.age)
            .reduce((a, b) => a + b) / students.length)
}

function task2(group){
    let groups = ut.csv_to_json('./csv/groups.csv')
    let students = ut.csv_to_json('./csv/students.csv')

    let ourGroup = _(groups)
                .filter(x => x.nameGr === group)
                .map(x => +x.id)
                .first()

    console.log(_(students)
                .filter(x => x.idGr == ourGroup)
                .map(x => +x.age)
                .reduce((a, b) => a + b) / Object.values(_(students)
                                                            .filter(x => x.idGr == ourGroup)
                                                            .countBy()
                                                            .value())[0])

}

function task3(){
    let students = ut.csv_to_json('./csv/students.csv')
    console.log(_(students)
                .filter(x => x.age >= 18)
                .value())
}

function task4(group){
    let groups = ut.csv_to_json('./csv/groups.csv')
    let students = ut.csv_to_json('./csv/students.csv')

    let ourGroup = _(groups)
                    .filter(x => x.nameGr === group)
                    .map(x => +x.id)
                    .first()

    console.log(_(students)
                .filter(x => x.idGr == ourGroup)
                .filter(x => x.age >= 18)
                .value()
    )

}

function task5(curator, dir){
    let groups = ut.csv_to_json('./csv/groups.csv')
    let students = ut.csv_to_json('./csv/students.csv')
    let curators = ut.csv_to_json('./csv/curators.csv')

    let curatorId = _(curators)
                    .filter(x => x.nameCur == curator)
                    .map(x => +x.id)
                    .first()

    let groupId = _(groups)
                    .filter(x => x.idCur == curatorId)
                    .map(x => +x.id)
                    .first()

    console.log(_(students)
                .filter(x => x.idGr == groupId)
               .orderBy(['nameSt'], [dir])
                .map(x => x.nameSt)
                .value()
                
    )

}

function task6(){
    let hobby = ut.csv_to_json('./csv/hobby.csv')
    let students = ut.csv_to_json('./csv/students.csv')
    let merge = ut.csv_to_json('./csv/merge.csv')

    console.table(_(merge)
                .map(el => {return {'name': _(students)
                                            .filter(x => x.id == el.idStudent)
                                            .map(x => x.nameSt)
                                            .first(),
                                     'hobby': _(hobby)
                                            .filter(x => x.id == el.idHobby)
                                            .map(x => x.name)
                                            .first()}})
                .orderBy(['name', 'hobby'], ['asc', 'desc'])
                .value()
    )
}

function task7(){
    let groups = ut.csv_to_json('./csv/groups.csv')
    let students = ut.csv_to_json('./csv/students.csv')

    console.table(_(students)
                .map(el => {return {'name': el.nameSt, 'age': el.age, 'group': _(groups)
                                                                            .filter(x => x.id == el.idGr)
                                                                            .map(x => x.nameGr)
                                                                            .first()}})
                .orderBy(['group', 'age'], ['asc', 'desc'])
                .map(el => {return {'group': el.group, 'name': el.name}})
                .value()

    )
}

function task8(hob){
    let hobby = ut.csv_to_json('./csv/hobby.csv')
    let students = ut.csv_to_json('./csv/students.csv')
    let merge = ut.csv_to_json('./csv/merge.csv')

    let hobId = _(hobby)
                .filter(x => x.name == hob)
                .map(x => +x.id)
                .first()
    
    console.table(_(merge)
               .filter(x => x.idHobby == hobId)
               .map(el => {return {'name': _(students)
                                        .filter(x => x.id == el.idStudent)
                                        .map(x => x.nameSt)
                                        .value()}})
                .value()
    )
}

//task1()
//task2('ПИнб-3')
//task3()
//task4('ПИнб-3')
//task5('Ляскин')
//task6()
//task7()
task8('футбол')