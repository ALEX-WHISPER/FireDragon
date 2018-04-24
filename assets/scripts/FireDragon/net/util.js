
var md5 = require('MD5')
var base64 = require('base64')

function GetQueryString(name)
{
    try {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)
            return  unescape(r[2]); 
        return null;
    } catch (err) {
        console.error("--------GetQueryString error:" + err);
        return null;
    }
}

function random(min, max) {
    return Math.round(Math.random() * (max - min)) + min
}
function int(v) {
    return Math.floor(v)
}

var c = new Array(30)
var jiang = 0
var jiao = null
function pushJiao(card) {
    card += 10
    for (var i = 0; i < jiao.length; i++) {
        if (jiao[i] == card) {
            return
        }
    }
    jiao.push(card)
}
 


function PwdMD5(str)
{
    return md5.hex_md5(base64.base64encode(md5.hex_md5(str.toLowerCase())))
} 

function xlrHttp(url, call)
{
     var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
            var response = xhr.responseText;
            call(response);
            xhr = null;
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
}

function Http(url, callback, target)
{
    //loadRemoteImg(url, callback, target);
    cc.loader.load(url, function (err, tex) {
        if(err)
        {
            console.log("------ " + err);
            return ;
        }    

        var newframe = new cc.SpriteFrame(tex);
        callback(target,newframe);
    });  
}

/*
*   rotation = 90/180 /270
*/

var RV = 0;
function setRotation(r)
{
    RV = r;
}

function convertVector2(v2)
{
    switch(RV)
    {
        case 90:
            var nv = cc.v2(-v2.y, -v2.x);
            return nv;
        case 180:
            var nv = cc.v2(-v2.x, v2.y);
            return nv;
        case 270:
            var nv = cc.v2(v2.y, v2.x);
            return nv;
        default:
            return v2;
    }
}

var preTick = 0
function checkClickRate()
{
     var cur  = new Date().getTime()
    if( cur - preTick < 250)
    {
        //提示操作过于频繁？
        return true
    }

    preTick = cur
    return false
}

var gBtnOn = false
function setBtnOn(b)
{
    gBtnOn = b
}

function bBtnOn()
{
    return gBtnOn
}


var uIconMap = {}
//保存 icon spriteFrame ,当已经有保存，并spriteframe 已经存在，则直接设置icon spriteFrame                       
function addIconCache(uid,node, iconUrl, spriteFrame)
{   
    if(uid == null)
        return false

    var it = uIconMap[uid]
    if(it == null)
    {
        it = {}
        it.node = node
        it.iconUrl = iconUrl
        it.spriteFrame = spriteFrame
        uIconMap[uid] = it
    }    
    else
    {
        if(node)
        {
            console.log("user " + uid + " node name " + node.parent.name)
            it.node = node
        }

        if(iconUrl)
            it.url = iconUrl

        //传进了spriteFrame 即加载好了icon
        if(it.spriteFrame != null)
        {   
            console.log("user " + uid + " set icon to "  + node.parent.name)
            if(node)
            {
                var sp = it.node.getComponent(cc.Sprite)
                sp.spriteFrame = it.spriteFrame
                it.node.active = true
            }

            return true
        }

        if(spriteFrame)
        {
            console.log("set new spriteFrame --> user " + uid )
            it.spriteFrame = null
            it.spriteFrame = spriteFrame
        }
    }


    return false
} 

function removeFromIconCache(uid)
{
    var it = uIconMap[uid]
    if(it)
    {
        it.node = null
        it.url = null
    }

    uIconMap[uid] = null
}

const company=['','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

function numConversion(num)
{  
    let str=''; 
    for(let i=300;i>0;i--){
        if(num>=Math.pow(10,3*i)){ 
           if(i>26){ 
            //    console.log(Math.ceil(i/26),i%26,i)
               str=(num/Math.pow(10,3*i)).toFixed(1); 
               str +=company[Math.floor(i/26)];
               str +=company[i%26+1];
           }else{
               str=(num/Math.pow(10,3*i)).toFixed(1);
               str +=company[i];
           }
           return str;
        }
    } 
     return Math.round(num)+'';
} 

// function uint8arrayToStringMethod(myUint8Arr) {
//    return String.fromCharCode.apply(null, myUint8Arr);
// }


// function Utf8ArrayToStr(array) {
//     var out, i, len, c;
//     var char2, char3;

//     out = "";
//     len = array.length;
//     i = 0;
//     while(i < len) {
//     c = array[i++];
//     switch(c >> 4)
//     { 
//       case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
//         // 0xxxxxxx
//         out += String.fromCharCode(c);
//         break;
//       case 12: case 13:
//         // 110x xxxx   10xx xxxx
//         char2 = array[i++];
//         out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
//         break;
//       case 14:
//         // 1110 xxxx  10xx xxxx  10xx xxxx
//         char2 = array[i++];
//         char3 = array[i++];
//         out += String.fromCharCode(((c & 0x0F) << 12) |
//                        ((char2 & 0x3F) << 6) |
//                        ((char3 & 0x3F) << 0));
//         break;
//     }
//     }

//     return out;
// }

// /*
//  * Interfaces:
//  * utf8 = utf16to8(utf16);
//  * utf16 = utf16to8(utf8);
//  */

// function utf16to8(str) {
//     var out, i, len, c;

//     out = "";
//     len = str.length;
//     for(i = 0; i < len; i++) {
// 	c = str.charCodeAt(i);
// 	if ((c >= 0x0001) && (c <= 0x007F)) {
// 	    out += str.charAt(i);
// 	} else if (c > 0x07FF) {
// 	    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
// 	    out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F));
// 	    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
// 	} else {
// 	    out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F));
// 	    out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F));
// 	}
//     }
//     return out;
// }

// function utf8to16(str) {
//     var out, i, len, c;
//     var char2, char3;

//     out = "";
//     len = str.length;
//     i = 0;
//     while(i < len) {
// 	c = str.charCodeAt(i++);
// 	switch(c >> 4)
// 	{ 
// 	  case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
// 	    // 0xxxxxxx
// 	    out += str.charAt(i-1);
// 	    break;
// 	  case 12: case 13:
// 	    // 110x xxxx   10xx xxxx
// 	    char2 = str.charCodeAt(i++);
// 	    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
// 	    break;
// 	  case 14:
// 	    // 1110 xxxx  10xx xxxx  10xx xxxx
// 	    char2 = str.charCodeAt(i++);
// 	    char3 = str.charCodeAt(i++);
// 	    out += String.fromCharCode(((c & 0x0F) << 12) |
// 					   ((char2 & 0x3F) << 6) |
// 					   ((char3 & 0x3F) << 0));
// 	    break;
// 	}
//     }

//     return out;
// }

// function str2UTF8(str){  
//     var bytes = new Array();   
//     var len,c;  
//     len = str.length;  
//     for(var i = 0; i < len; i++){  
//         c = str.charCodeAt(i);  
//         if(c >= 0x010000 && c <= 0x10FFFF){  
//             bytes.push(((c >> 18) & 0x07) | 0xF0);  
//             bytes.push(((c >> 12) & 0x3F) | 0x80);  
//             bytes.push(((c >> 6) & 0x3F) | 0x80);  
//             bytes.push((c & 0x3F) | 0x80);  
//         }else if(c >= 0x000800 && c <= 0x00FFFF){  
//             bytes.push(((c >> 12) & 0x0F) | 0xE0);  
//             bytes.push(((c >> 6) & 0x3F) | 0x80);  
//             bytes.push((c & 0x3F) | 0x80);  
//         }else if(c >= 0x000080 && c <= 0x0007FF){  
//             bytes.push(((c >> 6) & 0x1F) | 0xC0);  
//             bytes.push((c & 0x3F) | 0x80);  
//         }else{  
//             bytes.push(c & 0xFF);  
//         }  
//     }  
//     return bytes;  
// } 

function lengthUTF8(len){
    var bytes = new Array();   
    for(var i = 0; i < len; i++){ 
          bytes.push(0xFF);  
    }
    return bytes;  
}

function getDeviceInfo(){
     //获取设备信息   
     if(cc.sys.platform == cc.sys.ANDROID){
         return jsb.reflection.callStaticMethod("org/cocos2dx/lib/Cocos2dxActivity", "GetIMEI", "()Ljava/lang/String;"); 
     }else{
           if(cc.sys.os  == cc.sys.OS_IOS && cc.sys.isNative){
            //  return "{$BRAND$:$Apple$, $DEVICE$:$Unknown$}" 
                let ret = jsb.reflection.callStaticMethod("RootViewController","DeviceInfo");
                if(ret)
                   return ret;
           }else{
                return "{$BRAND$:$Microsoft$, $DEVICE$:$Windows$}" 
           } 
     } 
} 

const UNKNOWN=1; 
const IOS=2;
const ANDROID=3;
function getPlatFrom(){
     return cc.sys.platform;
    //  console.log('当前设备平台',cc.sys.platform);
    //  if(cc.sys.platform == cc.sys.ANDROID)
    //     return ANDROID
    //  else if(cc.sys.platform == cc.sys.IPHONE || cc.sys.platform == cc.sys.IPAD)
    //     return IOS
    //  return UNKNOWN;
}

module.exports = {
    random: random, 
    PwdMD5:PwdMD5,
    GetQueryString:GetQueryString,
    Http:Http,
    xlrHttp:xlrHttp,
    setRotation:setRotation,
    convertVector2:convertVector2,
    checkClickRate:checkClickRate,
    setBtnOn:setBtnOn,
    bBtnOn:bBtnOn,
    addIconCache:addIconCache,
    removeFromIconCache:removeFromIconCache,
    numConversion:numConversion,
    // uint8arrayToStringMethod:uint8arrayToStringMethod,
    // Utf8ArrayToStr:Utf8ArrayToStr,
    // utf16to8:utf16to8,
    // utf8to16:utf8to16,
    // str2UTF8:str2UTF8,
    getDeviceInfo:getDeviceInfo, 
    getPlatFrom:getPlatFrom
}