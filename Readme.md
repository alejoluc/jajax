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

### A custom GET request with all the possible options

    var options = {
        method: 'GET', //default
        async: true, //default
        fileUploading: false, //default
        parameters: null, //default, used only for POST requests
        beforeSend: function(xhrObject){}, //fired before sending the request, useful for modifying the xhr Object
        onSuccess: function(responseText, statusText, xhrObject){}, //fired if the request succeeds
        onError: function(responseText, statusText, xhrObject){}, //fired if it fails
        onComplete: function(responseText, statusText, xhrObject){}, //fired right after onSuccess or onError
    };
    jajax.ajax('destination.php', options);

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