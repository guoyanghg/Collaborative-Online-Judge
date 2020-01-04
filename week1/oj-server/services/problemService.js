var problems = [{
    id: 1,
    name: 'Two Sum',
    desc: 'Given two integers, find the sum',
    difficulty: 'hard'
},
    {
        id: 2,
        name: 'Three Sum',
        desc: 'Given three integers, find the sum',
        difficulty: 'hard'
    },
    {
        id: 3,
        name: 'Four Sum',
        desc: 'Given four integers, find the sum',
        difficulty: 'hard'
    }];

var ProblemModel = require('../models/problemModel');
var getProblems = function(){

    return new Promise((resolve, reject) => {
        ProblemModel.find({}, function (err, problems) {
            if(err){
                reject(err);
            }else{
                resolve(problems);
            }
        })
    });
};

var getProblem = function(id){
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({id:id}, function (err, problem) {
            if(err){
                reject(err);
            }else{
                resolve(problem);
            }
        })
    });
};

var addProblem = function(newProblem){
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({name:newProblem.name}, function (err, problem) {
            if(problem){
                reject("Problem name already exists!");
            }else{
                ProblemModel.count({}, function (err, num) {
                    newProblem.id = num + 1;
                    var mongoPro = new ProblemModel(newProblem);
                    mongoPro.save();
                    resolve(newProblem);
                });
            }
        })
    });
};



module.exports = {
    getProblems: getProblems,
    getProblem: getProblem,
    addProblem: addProblem
}