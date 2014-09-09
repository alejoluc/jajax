var jajax = (function(){
    'use strict';
    function _extend(destination, source){
        for (var member in source){
            if (source.hasOwnProperty(member)){
                destination[member] = source[member];
            }
        }
        return destination;
    }

    function requestObjectFactory(){
        var xhr;
        if (window.ActiveXObject) {
            try {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                alert(e.message);
                xhr = null;
            }
        } else {
            xhr = new XMLHttpRequest();
        }

        return xhr;
    }

    function getDefaultOptions(){
        return {
            async: true,
            parameters: null,
            fileUploading: false
        };
    }

    function getParameterString(parameters){
        var parameterString = "";
        var parameterKeys = Object.keys(parameters);
        for (var i = 0; i < parameterKeys.length; i++){
            var parameterKey = parameterKeys[i];
            parameterString += parameterKey + "=" + parameters[parameterKey];
            if (i < (parameterKeys.length - 1)){
                parameterString += "&";
            }
        }
        return parameterString;
    }

    /**
     * @class jajax
     * @static
     */

     /**
      * Creates a request object and sends the request
      * @method ajax
      * @param {String} url
      * @param {Object} options
      * @example
      *
      *     var options = {
      *         async: true,
      *         method: 'POST',
      *         fileUploading: false,
      *         parameters: {id:4, fetchMenus:false},
      *         onSuccess: function(responseText, statusText, xhrObject){},
      *         onError: function(responseText, statusText, xhrObject){},
      *         onSuccess: function(responseText, statusText, xhrObject){}
      *     }
      *     jajax.ajax('destination.php', options);
      */
    function ajax(url, options){
        options = _extend(getDefaultOptions(), options);
        options.method = options.method.toUpperCase();

        var xhr = requestObjectFactory();
        xhr.open(options.method, url, options.async);

        if (options.method === 'POST') {
            if (options.fileUploading === true) {
                xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            } else {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            }
        }
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){
                console.log(xhr);
                if (xhr.status === 200) {
                    options.onSuccess(xhr.responseText, xhr.statusText, xhr);
                } else {
                    options.onError(xhr.responseText, xhr.statusText, xhr);
                }
                options.onComplete(xhr.responseText, xhr.statusText, xhr);
            }
        };

        var parameters = null;
        if (options.method === 'POST' && options.parameters !== null) {
            parameters = getParameterString(options.parameters);
        }
        xhr.send(parameters);
    }

    /**
     * Shorthand GET method
     * @method get
     * @param {String} url
     * @param {Function} onSuccessCallback
     * @example
     *
     *     jajax.get('destination.php', function(responseText, statusText, xhrObject){
     *         console.log('Server response: ' + responseText);
     *     });
     */
    function get(url, onSuccessCallback){
        var options = {};
        options.method = 'GET';
        options.onSuccess = onSuccessCallback;
        ajax(url, options);
    }

    /**
     * Shorthand POST method
     * @method post
     * @param {String} url
     * @param {Object|Null} data
     * @param {Function} onSuccessCallback
     * @example
     *
     *     jajax.post('destination.php', {id:4,fetchMenus:true}, function(responseText, statusText, xhrObject){
     *         console.log('Server response: ' + responseText);
     *     });
     */
    function post(url, data, onSuccessCallback){
        var options = {};
        options.method = 'POST';
        options.parameters = (typeof data !== 'undefined') ? data : null;
        options.onSuccess = onSuccessCallback;
        ajax(url, options);
    }

    var Request = (function(){
        /**
         * A Request object.
         * @class jajax.Request
         * @constructor
         * @param {String} [url]
         * @param {String} [method] **GET** or **POST**. Defaults to **GET**
         */
        function Request(url, method){
            this.setRequestURL(url);
            this.setRequestMethod((typeof method !== 'undefined') ? method : 'GET');
            this.parameters = null;

            this.fileUploading = false;
            this.async = true;

            this.callbackOnSuccess = function(){};
            this.callbackOnError = function(){};
            this.callbackOnComplete = function(){};
        }

        /**
         * @method setRequestURL
         * @param {String} url
         */
        Request.prototype.setRequestURL = function(url){
            this.url = url;
        }

        /**
         * @method setRequestMethod
         * @param {String} method **GET** or **POST**
         */
        Request.prototype.setRequestMethod = function(method){
            this.method = method;
        }

        /**
         * Sets the request parameters. If the request method is **GET** this has no effect
         * @method setParameters
         * @param {Object} parameters
         */
        Request.prototype.setParameters = function(parameters){
            this.parameters = parameters;
        }

        /**
         * Sets whether the form should be sent with Content-Type as multipart/form-data
         * @method setFileUploading
         * @param {Boolean} uploading
         */
        Request.prototype.setFileUploading = function(uploading){
            this.fileUploading = uploading;
        }

        /**
         * Sets whether the request should be an asynchronous request or not
         * @param {Boolean} async
         */
         Request.prototype.setAsync = function(async){
            this.async = async;
         }

        /**
         * Sets the callback to be executed if the request succeeds
         * @method onSuccess
         * @param {Function} callbackFunction
         */
        Request.prototype.onSuccess = function(callbackFunction){
            this.callbackOnSuccess = callbackFunction;
        }
        /**
         * Sets the callback to be executed if the request fails
         * @method onError
         * @param {Function} callbackFunction
         */
        Request.prototype.onError = function(callbackFunction){
            this.callbackOnError = callbackFunction;
        }
        /**
         * Sets the callback to be executed right after **success** or **error**
         * @method onComplete
         * @param {Function} callbackFunction
         */
        Request.prototype.onComplete = function(callbackFunction){
            this.callbackOnComplete = callbackFunction;
        }
        /**
         * Executes the Request
         * @method execute
         */
         Request.prototype.execute = function(){
            // Calls the ajax() function
            var options = {
                method: this.method,
                parameters: this.parameters,
                fileUploading: this.fileUploading,
                async: this.async,
                onSuccess: this.callbackOnSuccess,
                onError: this.callbackOnError,
                onComplete: this.callbackOnComplete
            };
            ajax(this.url, options);
         }
        return Request;
    }());

    var module = {};
    module.ajax = ajax;
    module.get = get;
    module.post = post;
    module.Request = Request;
    return module;
}());

if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = jajax;
}