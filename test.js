var emailExistence = require('./lib/index.js');

emailExistence.check('test@domain.com', function(err,res){
    if(!err){
        console.log('res: '+res);
    }
});