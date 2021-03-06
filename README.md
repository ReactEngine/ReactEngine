# ReactEngine
一个基于 [Reac Native](https://facebook.github.io/react-native) + [Redux](https://github.com/reactjs/redux) + [Strongloop](https://strongloop.com) 的快速开发框架.  
目的: 快速开发,原则上一个 JS 工程师可以搞定 iOS/Android/Server 开发.

# Client
ReactEngine 客户端部分,基于 [Reac Native](https://facebook.github.io/react-native) + [Redux](https://github.com/reactjs/redux) 的工程模板.

## 如何运行
### 1. 环境准备
安装**最新版** Nodejs: 详见 [nodejs.org](https://nodejs.org/en/download/)   
安装**最新版** React Native: 执行 ```npm install -g react-native-cli``` 详见 [Getting Started](http://facebook.github.io/react-native/docs/getting-started.html)  
如果你要运行 iOS 程序,请安装 Xcode 7.0 更新版本.  
如果你要运行 Android 程序,请参考 [Android Setup](http://facebook.github.io/react-native/docs/android-setup.html).  

#### 2. Clone 仓库并安装依赖:
```
git clone https://github.com/ReactEngine/ReactEngine.git
cd ReactEngine 
npm install -d
```

#### 3. 启动服务器 
参考: [ReactEngine-Server](https://github.com/ReactEngine/ReactEngine-Server)   
修改 ```src/services/strongloop/config.js```:

```
"urlBase": "http://10.10.10.148:3000/api/"  //改为你的服务器API地址
```

#### 4. 运行
iOS:    
用 XCode 打开```ios/ReactEngine.xcodeproj```,编译运行.    
Android:   
```
react-native run-android
```

#### 5. 代码生成器

[generator-reactengine](https://github.com/ReactEngine/generator-reactengine)可以帮你生成 Model 和 Moudle 的样板代码.

##### 安装

```bash
npm install -g yo   
npm install -g generator-reactengine
```

##### 生成 model

```bash
cd yo-project-dir # 进入你的工程目录     
yo reactengine:model [options] <modelName>
```

<p>
  <img src="./ScreenShots/CreateModel.png" width="340">
</p>

##### 生成 module

```
cd yo-project-dir # 进入你的工程目录
yo reactengine:module [options] <moduleName>
```

<p>
  <img src="./ScreenShots/CreateModule.png" width="450">
</p>

## 截图
iOS:  
<p>
  <img src="./ScreenShots/Register.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/Login.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/LoginError.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/ForgotPassword.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/Profile.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/ModuleAdd.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/ModuleList.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/ModuleUpdate.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/ModuleDelete.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
  <img src="./ScreenShots/ModuleEmpty.png" alt="App Screenshot" width="250"  style="margin-right: 10px;margin-bottom: 20px;">
</p>
