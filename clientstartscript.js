// for pm2 npm windows
// https://github.com/Unitech/pm2/issues/2808
const cmd = require('node-cmd'); 
cmd.run('npm run -C ./packages/client start');