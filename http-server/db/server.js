
const http = require('http');
const products = require('./products')

const rever = http.createServer(async(req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/') {
       console.log('in /');
       res.write('{}'); 
    } else if (url === '/products') {
        const all = await products.getAll();
        res.write(JSON.stringify(all));
    }
res.end();
});

const PORT = 8880;
server.listen(PORT,() => {
    console.log(`Server is on ${PORT}`)
})