var emailExistence = require('./lib/index.js');

emailExistence.check('nmanousos@gmail.com', function(err,res){
    if(!err){
        console.log('res: '+res);
    }
});