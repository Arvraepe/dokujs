(function (parent, undefined) {

    function abstractRequest (config) {

        var createParameters = function (params) {
            var paramStr = Object.keys(params).reduce(function (str, param) {
                return str + param + '=' + encodeURI(params[param]) + '&';
            }, "?");
            return paramStr.substr(0,paramStr.length - 1);
        };

        var request_url = "http://localhost:8091" + config.path + createParameters(config.params);
        $.ajax({
            type: config.type,
            url: request_url,
            body: config.body,
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                if (config.success) config.success.apply(config.scope, arguments);
            },
            error: function (xhr) {
                if (config.error) config.error.apply(config.scope, arguments);
            }
        });
    }

    if (!parent["example"]) {
        parent["example"] = function () {
            return {
                "users": {
                    "getUser": function (config) {
                        abstractRequest({
                            type: "get",
                            path: "/user",
                            success: config.onSuccess,
                            error: config.onError,
                            body: config.body,
                            params: {
                                id: config.params.id,
                                api_key: config.params.api_key
                            }
                        });
                    },
                    "createUser": function (config) {
                        abstractRequest({
                            type: "post",
                            path: "/user/create",
                            success: config.onSuccess,
                            error: config.onError,
                            body: config.body,
                            params: {
                                api_key: config.params.api_key
                            }
                        });
                    }
                },
                "products": {
                    "getProductsByCustomer": function (config) {
                        abstractRequest({
                            type: "get",
                            path: "/products/by/customer/:id",
                            success: config.onSuccess,
                            error: config.onError,
                            body: config.body,
                            params: {
                                api_key: config.params.api_key
                            }
                        });
                    }
                }
            }
        }();
    }

}(window));
