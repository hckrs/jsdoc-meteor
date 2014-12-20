var path = require('path'),
    fork = require('child_process').fork;


function jsdoc(file, cb) {
  var tmplPath = __dirname,
      configPath = path.resolve(__dirname, "config.json"),
      jsdocPath = path.resolve(__dirname, "node_modules", "jsdoc", "jsdoc.js"),
      args = [ '-t', tmplPath, '-c', configPath, file ];

  // Compile using jsdoc 
  jsdoc = fork(jsdocPath, args);

  // Listen for compiled jsdoc data
  jsdoc.on('error', function(err) {
    cb(err);
  });

  // Listen for compiled jsdoc data
  jsdoc.on('message', function(data) {
    cb(null, data);
  });
}


module.exports = jsdoc;