const app = require('./app');

 const { port } = require('./config');

 app.listen(port, () => {
   console.log(`\nlistening on http://localhost:${port}\n`)
 });
 