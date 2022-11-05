const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    //Solution 1
    // fs.readFile('test-file.txt', (err, data) => {
    //     if(err) console.log(err);
    //     res.end(data);
    // });

    //Solution 2
    // const readable = fs.createReadStream('test-file.txt');
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // });
    // readable.on('end', () => {
    //     res.end();
    // });
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500;
    //     res.end('File not found!');
    // });
    //In this solution we will face the problem of back pressure
    //Where our readable stream is emitting 'data' event at a faster
    //rate then what our writable stream can handle

    //Solution 3
    const readable = fs.createReadStream('test-file.txt');
    readable.pipe(res);
    //Pipe function handles the problem of back pressure
    //It makes sure rate of data going in and out are compatible
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening....');
});