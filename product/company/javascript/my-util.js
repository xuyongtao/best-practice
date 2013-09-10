define(function(require, exports, module) {

    var complain = function(money){
        return money? console.log('no money you say a jb!') : console.log('money is a jb!');
    };

    module.exports = complain;

});

