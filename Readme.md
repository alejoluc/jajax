# jajax

The no Bullshit, Just Ajax library

# Features

* Supports GET and POST
* Both Procedural and Object Oriented API
* Shorthand functions for quick and dirty GET and POST requests
* CommonJS complaint module (in case you want to use the library with browserify)
* Supports File Uploading
* Fully Documented

# Examples

## Using the procedural api to make a get request

    jajax.get('destination.php', function(responseText, statusText, xhrObject){
        console.log('The server responded: ' + responseText);
    });