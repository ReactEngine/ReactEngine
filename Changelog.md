# Changelog 
## 0.0.1 (2016/3/1)
第一个版本,确定目录结构,集成 Strongloop 作为 API Server

## 0.0.2 (2016/3/5)
拆分 Server 和 Client 为2个项目   
使用 Redux 作为 state 管理框架  
集成用户登录/注册/忘记密码/ Profile 管理,路由切换  
调整 Redux 代码结构,以便使用工具生成代码  
为使 API 后台可替换(如 MaxLeap,或PHP/Java 等非 Nodejs Server),移除 strongloop isomorphic client,改为根据 API 生成 actions/reducers(参考 https://github.com/Kvoti/redux-rest)