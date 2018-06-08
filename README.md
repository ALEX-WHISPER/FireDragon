# 火龙秘宝开发文档

---

## 环境与平台
+ 开发环境
    - 操作系统
        ```Windows 7 专业版 64-bit (6.1, Build 7601)```
    - 处理器
        ```Intel(R) Core(TM) i5-7500 CPU @ 3.40GHz (4 CPUs), ~3.4GHz```
    - 内存
        ``` 16384MB RAM ```
    - DirectX 版本
        ``` DirectX 11 ```
    - 显卡
        ``` Intel(R) HD Graphics 630 ```
    - 显存
    ``` 1824 MB ```
+ 开发平台
    ``` Cocos Creator v1.8.2 ```
+ 目标平台
    ``` Web Mobile ```

## 基本架构
+ MVC(Model-View-Controller)
    + Model: 数据存储
    + View：表现  Model  中的内容
    + Controller: 控制 Model 和 View 

## 节点树面板(Node Tree)说明
+ 基本结构
    + Canvas ``` 画布节点，场景内所有物体的根节点 ```
        + LoadingBlock ``` 游戏加载 ```
        + EnterRoomBlcok ``` 房间选择 ```
        + GamePlayBlock ``` 游戏 ```
        + MallBlock ``` 商城 ```
+ 单个节点结构 
    ``` 以 LoadingBlock 为例，其余节点所包含的内容均遵循相同的结构 ```
    + LoadingBlock
        + LoadingPanel ``` 加载界面(UI元素) ```
        + LoadingLogic ``` 空物体，附着控制加载功能的脚本组件 ```
## 资源管理面板(Assets)说明
+ Assets ``` 资源包根节点 ```
    + prefabs ``` 预制件物体 ```
    + res ``` 美术资源文件 ```
    + scenes ``` 场景文件 ```
    + scripts ``` 脚本文件(无后缀的表示目录文件，有后缀的为.js脚本文件) ```
        + **GameEntrySetting** ``` 游戏入口 ```
            + Entry.js ``` 游戏开始时，对各模块界面的开启和关闭控制 ```
        + **Loading** ``` 游戏加载 ```
            + LoadingBarControl.js ``` 进度条功能控制 ```
            + MiniHintOnLoading.js ``` 加载界面的小提示功能 ```
        + **EnterRoom** ``` 房间选择 ```
            + EnterRoom.js ``` 选房模块控制 ```
            + GameInfoDisplay.js ``` 选房界面信息初始化 ```
            + wxUserInfoDisplay.js ``` 微信用户信息初始化（小游戏API，发布平台改为H5原生平台后不再使用） ```
        + **GamePlay** ``` 游戏模块 ```
            + Enemies ``` 怪物类 ```
                + EnemyBase.js ``` 怪物基类 ```
                + Enemy_Multi.js ``` 有倍数的怪物 ```
                + Enemy_NonMulti.js ``` 无倍数的怪物（倍数概念，详见策划） ```
            + Game ``` 游戏逻辑控制 ```
                + GameController.js ``` 控制器，管理 GameModel 和 GameView ```
                + GameModel.js ``` 存储游戏模块关键数据 ```
                + GameView.js ``` 通过 GameController, 表现 GameModel 中的内容。即根据 GameModel 的数据，进行指定的 UI 表现 ```
                + GameFlag.js ``` 游戏时关键事件的标识符 ```
                + UserClickButtonEvents.js ``` 用户点击事件响应 ```
            + ObjectPools ``` 对象池 ```
                + CatchingMsgItemPool.js ``` 捕获记录（添加到ScrollView中的记录）对象池 ```
        + Mall ``` 商城 ```
            + MallController.js ``` 控制器，管理 MallController 和 MallView ```
            + MallModel.js ``` 存储商城模块关键数据 ```
            + MallView.js ``` 通过 MallController, 表现 MallModel 中的内容。即根据 MallModel 的数据，进行指定的 UI 表现 ```
            + MallFlags.js ``` 商城模块关键事件的标识符 ```
            + VoucherManager.js ``` 购买点券模块中，每条购买项目的逻辑控制(点券是动态创建的，可在 MallModel 中指定其初始值，也可在游戏中进行动态修改) ```
        + Utils ``` 工具 ```
            + Notification.js ``` 事件响应框架 ```
        + Net ``` 网络通信相关，基于 protobufjs 框架，详细用法可询问雨波 ```
        + _unused ``` 暂未使用的脚本。其中包含微信小游戏的部分 API 调用，如有需要可加以参考 ```

## 开发进度
> 截至本开发文档撰写当日(2018/06/08)，本项目客户端方面，游戏性逻辑部分基本开发完毕，部分交互逻辑、交互细节尚未得到策划与美术的确认；社交功能（微信登录、分享、支付等）尚未接入。同时，客户端尚未与服务端对接，因此所有游戏数据、金币结算等计算逻辑均来自于本地模拟。

## 真机预览
> 本项目原计划发布至微信小游戏平台，后改为 H5 原生平台，而真机预览流程一直沿用小游戏的打包预览流程，过程如下：
    
+ 更改发布平台
    + Project -> Build -> Platform，将目标平台改为 **WechatGame**
+ 打包
+ 通过 **微信web开发者工具** 打开导出项目
+ 将导出项目的 **res** 文件夹剪切至本地服务器
    + 原因
    ``` 微信小游戏游戏包大小上限为4M，故需要将所有资源文件移至服务器下，通过远程加载的方式加载游戏资源 ```
    + IIS 本地服务器
    ``` 由于尚无远程服务器支持，我自己搭建了一个 IIS 本地服务器用于存放游戏资源包 ```
        + 物理路径：D:\WorkSpace\IISLocalServer\8081\FireDragon
        + IP 地址：(即本机IP地址) 172.12.10.126
        + 端口号：8081
        + 详情：开始菜单 -> 搜索 'IIS' -> 网站 -> cocosDev
+ 设置远程加载路径
    ``` 在项目根目录下的 game.js 中，将本地服务器的 url(http://172.12.10.126:8081/FireDragon) 赋给字段： wxDownloader.REMOTE_SERVER_ROOT ```.
+ 预览
    ``` 在 IDE 中，点击"预览"，用微信扫描二维码，即可进入小游戏，进行真机预览 ```