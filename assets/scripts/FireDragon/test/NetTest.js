var net = require("net")

cc.Class({
    extends: cc.Component,

    start: function() {
        let name = "test";
        let pwd = "233";
        let sLicenseKey = 1;
        // net.Login(name, pwd, sLicenseKey);
        net.Connect();
    }
});
