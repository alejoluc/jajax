# jajax

The no Bullshit, Just Ajax library

# Features

* The minified version is ~4kb
* Supports GET and POST
* Both Procedural and Object Oriented API
* Shorthand functions for quick and dirty GET and POST requests
* CommonJS complaint module (in case you want to use the library with browserify)
* Supports File Uploading
* Fully Documented

# Examples

## Using the procedural API to make a get request

    jajax.get('destination.php', function(responseText, statusText, xhrObject){
        console.log('The server responded: ' + responseText);
    });

## Using the Object Oriented API to make a get request

    var request = new jajax.Request('destination.php'); // GET is the default
    request.onComplete(function(responseText, statusText, xhrObject){
        console.log('Te server responded: ' + responseText);
    });
    request.execute();

## Using the procedural API to make a post request

    var postFields = {
        hello: 'world',
        hola: 'mundo'
    };
    jajax.post('destination.php', postFields, function(responseText, statusText, xhrObject){
        console.log('Te server responded: ' + responseText);
    });

## Using the Object Oriented API to make a post request

    var request = new jajax.Request('destination.php', 'POST');
    var postFields = {
        hello: 'world',
        hola: 'mundo'
    };
    request.setParameters(postFields);
    request.onComplete(function(responseText, statusText, xhrObject){
        console.log('Te server responded: ' + responseText);
    });
    request.execute();