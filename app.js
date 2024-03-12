const http = require('http');
const certificate = require('./certificates');
const utils = require('./utils');
const PORT = process.env.PORT || 5000;

const server = http.createServer(async (request, response) => {
    if(request.url === '/api/v1/certificates' && request.method === 'GET'){
        response.writeHead(200, {
            'content-Type': 'application/json',
            'content-disposition': 'JSON'
        });  
        response.end(JSON.stringify(certificate))
    }
    else if (request.url === '/api/v1/certificates' && request.method === 'POST'){
        let req_body = await utils(request);
        certificate.push(JSON.parse(req_body));
        response.writeHead(201, {
            'content-Type': 'application/json',
            'content-disposition': 'JSON'
        });
        response.end(JSON.stringify(JSON.parse(req_body)));
    }
    else if(request.url.match(/\/api\/v1\/certificates\/([A-Za-z])/) && request.method === 'DELETE'){
        const title = request.url.split('/')[4]
        const cert = certificate.find(t=> t.title === title.toString());
        if(!cert){
            response.writeHead(404, {
                'content-Type': 'application/json',
                'content-disposition': 'JSON'
            });
            response.end('This certificate title does not  exist');
        }
        else{
            const index = certificate.indexOf(cert);
            certificate.splice(index,1);
            response.writeHead(200, {
                'content-Type': 'application/json',
                'content-disposition': 'JSON'
            });
            response.end('Deleted the specified certificate');
        }
    }
});

server.listen(PORT, () => {
    console.log(`server is ready and running on PORT ${PORT}`);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log("port already in use");
    }
});
