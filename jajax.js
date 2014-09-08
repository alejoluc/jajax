var jajax = (function(){

    function _extend(destination, source){
        for (var member in source){
            if (source.hasOwnProperty(member)){
                destination[member] = source[member];
            }
        }
        return destination;
    }

    function requestObjectFactory(){

    }

    function ajax(options){

    }

    function get(options){

    }

    function post(options){

    }

    var Request = (function(){
        /**
         * A Request object.
         * @class Request
         * @constructor
         * @param {String} method **GET** or **POST**. Defaults to **GET**
         */
        function Request(method){
            this.method = (typeof method !== 'undefined') ? method : 'GET';
            this.parameters = {};

            this.onSuccess = null;
            this.onError = null;
            this.onComplete = null;

            this.requestObject = requestObjectFactory();
        }
        /**
         * @method setRequestMethod
         * @param {String} method **GET** or **POST**
         */
        Request.prototype.setRequestMethod(method){
            this.method = method;
        }

        /**
         * Sets the request parameters. If the request method is **GET** and the request URL already
         * contains parameters, the parameters passed to this function will be appended at the end.
         * @method setParameters
         * @param {Object} parameters
         */
        Request.prototype.setParameters(parameters){
            this.parameters = parameters;
        }
        /**
         * Sets the callback to be executed if the request succeeds
         * @method onSuccess
         * @param {Function} callbackFunction
         */
        Request.prototype.onSuccess = function(callbackFunction){
            this.onSuccess = callbackFunction;
        }
        /**
         * Sets the callback to be executed if the request fails
         * @method onError
         * @param {Function} callbackFunction
         */
        Request.prototype.onError = function(callbackFunction){
            this.onError = callbackFunction;
        }
        /**
         * Sets the callback to be executed right after **success** or **error**
         * @method onComplete
         * @param {Function} callbackFunction
         */
        Request.prototype.onComplete = function(callbackFunction){
            this.onComplete = callbackFunction;
        }
        /**
         * Executes the Request
         * @method execute
         */
         Request.prototype.execute = function(){
            // Calls the ajax() function
         }
        return Request;
    }());

    var module = {};
    module.ajax = ajax;
    module.get = get;
    module.post = post;
    module.Request = Request;
    return module;
});