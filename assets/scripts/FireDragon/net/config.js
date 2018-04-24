var userSet = cc.Class({

    properties:{
        // musicValumn : 0.5,
        // soundValumn : 0.5, 
        account:"",
        pwd:"" 
    },


    ctor:function()
    {

    },

    // setMusicVolumn:function(v)
    // {
    //     this.musicValumn = v;
    // },

    // setSoundVolumn:function(v)
    // {
    //     this.soundValumn = v;
    // }, 

    load:function()
    {
        var userData = JSON.parse(cc.sys.localStorage.getItem('userData'));
        // let obj= jsb.fileUtils.getDataFromFile('c:/NewData');
        if(userData)
        {  
            // this.musicValumn = userData.musicValumn;
            // this.soundValumn =  userData.soundValumn; 
            this.account = userData.account;
            this.pwd = userData.pwd;
            // this.palyKaiguan=userData.palyKaiguan;
            // this.herokaiguan=userData.herokaiguan;
            // this.beilv=userData.beilv;
            // this.music1=userData.music1;
            // this.music2=userData.music2;
            // this.music3=userData.music3;
        }
    },
    // 保存数据 写入文件
    save:function()
    { 
        cc.sys.localStorage.setItem('userData', JSON.stringify(config)); 
        // let str='fasfsaf';  
        // jsb.fileUtils.writeStringToFile(str,'c:/NewData');
    }, 
    
    //保存设置数据写入文件
    saveSetting:function(obj){
        cc.sys.localStorage.setItem('settingData', JSON.stringify(obj));
    },

    //读取保存数据
    getSetting:function(){
        var settingData = JSON.parse(cc.sys.localStorage.getItem('settingData'));
        return settingData;   
   }

});


var config = new userSet();

const GameVersion = {
    curVersion: 1.0,
    minVersion: 1.0,
    maxVersion:1.0
} 

const App = {
    Id:"wx565173bf6345d222",
    Secret:"a3fa18c606434de1f7a9e0eea3a3a800",
} 

module.exports=
{
    Instance:config,
    Version:GameVersion, 
    App:App, 
}

