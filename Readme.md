# jajax

The no Bullshit, Just Ajax library

# Features

* The minified version is ~4kb
* Supports GET and POST
* Both Procedural and Object Oriented API
* Shorthand functions for quick and dirty GET and POST requests
* CommonJS complaint module (in case you want to use the library with browserify)

# Examples

## Procedural API

### Quick and dirty GET request

    jajax.get('destination.php', function(responseText, statusText, xhrObject){
        console.log('The server responded: ' + responseText);
    });

### Quick and dirty POST request

    var postFields = {
        hello: 'world',
        hola: 'mundo'
    };
    jajax.post('destination.php', postFields, function(responseText, statusText, xhrObject){
        console.log('The server responded: ' + responseText);
    });

## Object Oriented API

### GET request

    var request = new jajax.Request('destination.php'); // GET is the default
    request.onComplete(function(responseText, statusText, xhrObject){
        console.log('Te server responded: ' + responseText);
    });
    request.execute();

### POST request

    var request = new jajax.Request('destination.php', 'POST');
    var postFields = {
        hello: 'world',
        hola: 'mundo'
    };
    request.setParameters(postFields);
    request.onComplete(function(responseText, statusText, xhrObject){
        console.log('The server responded: ' + responseText);
    });
    request.execute();