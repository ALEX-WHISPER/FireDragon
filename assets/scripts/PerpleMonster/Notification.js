
window.NOTIFICATION = (function () {
    var eventList = {};
    
    function on(type, callback, target) {
        if (typeof type !== "string" || typeof callback !== "function" || typeof target === "undefined") {
            cc.error("GLOBAL_DEF.js: NOTIFICATION method 'on' param error!");
            return;
        }
        if (typeof eventList[type] === "undefined") {
            eventList[type] = [];
        }
        eventList[type].push({callback: callback, target: target});
    }

    function once(type, callback, target) {
        if (typeof type !== "string" || typeof callback !== "function" || typeof target === "undefined") {
            cc.error("GLOBAL_DEF.js: NOTIFICATION method 'on' param error!");
            return;
        }
        if (typeof eventList[type] === "undefined") {
            eventList[type] = [];
        }
        eventList[type].push({callback: callback, target: target, once: true});
    }

    function emit(type, data) {
        if (typeof type !== "string") {
            cc.error("GLOBAL_DEF.js: NOTIFICATION method 'emit' param error!");
            return;
        }
        var list = eventList[type];
        if (typeof list !== "undefined") {
            for (var i = 0; i < list.length; i++) {
                var event = list[i];
                if (event) {
                    event.callback.call(event.target, data);
                    if(event.once){
                        off(type, event.callback, event.target);
                    }
                }
            }
        }
    }

    function off(type, callback, target) {
        if (typeof type !== "string" || typeof callback !== "function" || typeof target === "undefined") {
            cc.error("GLOBAL_DEF.js: NOTIFICATION method 'off' param error!");
            return;
        }
        var list = eventList[type];
        if (typeof list !== "undefined") {
            for (var i = 0; i < list.length; i++) {
                var event = list[i];
                if (event && event.callback === callback && event.target === target) {
                    list.splice(i, 1);
                    break;
                }
            }
        }
    }

    function offByType(type) {
        if (typeof type !== "string") {
            cc.error("GLOBAL_DEF.js: NOTIFICATION method 'offByType' param error!");
            return;
        }
        while (eventList[type].length > 1) {
            eventList[type].shift();
        }
        eventList[type] = undefined;
    }

    function offByTarget(target){
        if (typeof target === "undefined") {
            cc.error("GLOBAL_DEF.js: NOTIFICATION method 'offByTarget' param error!");
            return;
        }
        for(var key in eventList){
            for(var i = 0; i < eventList[key].length ; i++){
                if(eventList[key][i].target === target){
                    eventList[key].splice(i, 1);
                    cc.log('off ' + key);
                    break;
                }
            }
        }
    }
    return {on: on, once: once, emit: emit, off: off, offByType: offByType, offByTarget: offByTarget};
})();

module.exports = NOTIFICATION;