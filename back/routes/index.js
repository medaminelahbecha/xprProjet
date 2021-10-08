var fs = require('fs');

module.exports = function(app) {
    fs.readdirSync('./routes').forEach(function(file) {
        let filename = file.substr(0, file.indexOf('.'));
        let route = './' + filename;
        if(filename != "index"){
           
            let myroute = require(route);
            app.use('/api/'+filename,myroute);
           console.log(route, typeof myroute,filename )
          
         }
    });
}