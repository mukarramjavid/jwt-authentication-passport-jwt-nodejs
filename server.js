const app = require('./src/index');


const server = app.listen(2000, () => {
    console.log(`Listening to port 2000`);
});