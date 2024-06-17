// Create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const comments = [];

http.createServer((req, res) => {
    // Parse the URL of the request
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                });
                res.end('404 Not Found');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(data);
            }
        });
    } else if (pathname === '/comment') {
        // Get the data from the request
        const data = urlObj.query;
        // Add the data to the comments array
        comments.push(data);
        // Redirect to the home page
        res.writeHead(302, {
            'Location': '/'
        });
        res.end();
    } else if (pathname === '/getComments') {
        // Return the comments as JSON
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(comments));
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('404 Not Found');
    }
}).listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});