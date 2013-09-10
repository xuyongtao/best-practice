define("company/widgets/body/js/init-body-debug", [ "jquery/jquery/1.10.1/jquery-debug", "company/javascript/my-util-debug" ], function(require, exports, module) {
    var $ = require("jquery/jquery/1.10.1/jquery-debug");
    var complain = require("company/javascript/my-util-debug");
    complain();
    complain(1e8);
    seajs.log("loaded init-body done~~");
});