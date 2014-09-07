var jajax = (function(){

    function _extend(destination, source){
        for (var member in source){
            if (source.hasOwnProperty(member)){
                destination[member] = source[member];
            }
        }
        return destination;
    }

    function createRequestObject(){

    }

    function ajax(options){

    }

    function get(options){

    }

    function post(options){

    }

    var Request = (function(){
        /**
         * A Request object
         * @class Request
         * @constructor
         * @param {String} method **GET** or **POST**. Defaults to **GET**
         */
        function Request(method){
            this.method = (typeof method !== 'undefined') ? method : 'GET';
            this.parameters = {};

            this.beforeRequest = null;
            this.afterRequest = null;
            this.success = null;
            this.error = null;
            this.complete = null;
        }

        Request.prototype.setParameters(parameters){
            this.parameters = parameters;
        }
        Request.protoype.setBeforeRequestCallback
        return Request;
    }());

    var module = {};
    module.ajax = ajax;
    module.get = get;
    module.post = post;
    module.Request = Request;
    return module;
});