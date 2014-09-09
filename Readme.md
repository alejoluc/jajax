# jajax

The no Bullshit, Just Ajax library

MIT License

# Features

* Works in all browsers, even old IE versions (*)
* The minified version is ~3kb
* Supports GET and POST
* Both Procedural and Object Oriented API
* Shorthand functions for quick and dirty GET and POST requests
* CommonJS complaint module (in case you want to use the library with browserify)

(*) I tested it, but please submit an issue if this is not the case

# Examples

## Procedural API

### Quick and dirty GET request

```javascript
jajax.get('destination.php', function(responseText, statusText, xhrObject){
    console.log('The server responded: ' + responseText);
});
```

### Quick and dirty POST request

```javascript
var postFields = {
    hello: 'world',
    hola: 'mundo'
};
jajax.post('destination.php', postFields, function(responseText, statusText, xhrObject){
    console.log('The server responded: ' + responseText);
});
```

### A custom GET request with all the possible options

All options are set to their default value.

**Note**: the *parameters* option is only used in POST requests. It should be a *{key:'value', ...}* object in that case.

```javascript
var options = {
    method: 'GET',
    async: true,
    fileUploading: false,
    parameters: null,
    beforeSend: function(xhrObject){},
    onSuccess: function(responseText, statusText, xhrObject){},
    onError: function(responseText, statusText, xhrObject){},
    onComplete: function(responseText, statusText, xhrObject){}
};
jajax.ajax('destination.php', options);
```

## Object Oriented API

### GET request

```javascript
var request = new jajax.Request('destination.php'); // GET is the default
request.onComplete(function(responseText, statusText, xhrObject){
    console.log('The server responded: ' + responseText);
});
request.execute();
```

### POST request

```javascript
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
```

### A custom POST request with all the possible options

```javascript
var req = new jajax.Request('destination.php', 'POST'); //Both arguments are optional
req.setURL('new_destination.php');
req.setMethod('POST');
req.setParameters({
    id: 5,
    fetchMenus: true
});
req.setFileUploading(false); //default value, no need to call it
req.setAsync(true); //default value, no need to call it
req.beforeSend(function(xhrObject){
    // This function will be fired right before sending the request.
    // Useful if you need to perform operations on the xhrObject, like sending custom headers
});
req.onSuccess(function(responseText, statusText, xhrObject){

});
req.onError(function(responseText, statusText, xhrObject){

});
req.onComplete(function(responseText, statusText, xhrObject){
    // Fired immediately after onSuccess or onError
});
req.execute();
```

## CommonJS

If you like to modularize your code and are using CommonJS to do so (via browserify, for example), you
can easily use jajax too! Just do:

```javascript
var jajax = require('./jajax.js');
jajax.get('destination.php', function(res){
    console.log('The server responded: ' + res);
})
```