## 简介 ##
水滴金融后台管理系统基于的技术栈是 webpack@4、vue@2.5、vue-router@3、vuex@3
、element-ui@2.4、sass等主要技术。项目架构搭建参考了 [vuejs-templates/webpack](https://github.com/vuejs-templates/webpack) github 项目。


## 安装依赖 ##
- 安装 yarn@1.12.3: &nbsp; [官方安装方法](https://www.yarnpkg.com/zh-Hans/docs/install#mac-stable)
- 安装 node@10.13.0: 
  - window 系统前往 [官方网站](https://nodejs.org/en/download/) 下载对应版本并安装。
  - mac 系统可先安装 nvm, nvm 是一个 node 版本管理工具，[使用介绍](https://github.com/creationix/nvm/blob/master/README.md)。nvm 的安装命令 `brew install nvm`, 接着用 `nvm install 10.13.0` 安装 node。
- 运行 `yarn install` 命令，安装 package.json 里指定的依赖项。
   

## 本地开发 ##
运行 `yarn run dev` 会启动一个本地服务器，浏览器能访问到 http://localhost:8080, 说明本地开发环境运行成功。


## 构建生产 ##
运行 `yarn run build` 构建命令即会生成或更新 dist 文件夹。


## 目录结构 ##
    |---build                                // webpack配置文件
    |---dist                                 // 打包文件
    |---docs                                 // 文档(代码规范、git提交规范...)
    |---src 
    |   |---api                              // 后台接口 
    |   |---assets                           // 模块资源文件(会经过 webpack 处理)
    |   |   |---images                       // 图片
    |   |   |---styles                       // 样式
    |   |---components                       // 通用组件
    |   |---entries                          // 页面
    |   |---router                           // 路由
    |   |---services                         // 公共服务
    |   |---store                            // vuex 状态管理
    |   |---App.vue                          // 页面入口文件
    |   |---index.html                       // 模板文件
    |   |---main.js                          // 应用入口文件
    |---static                               // 纯静态资源
    |---.babelrc                             // bable 转译配置文件
    |---.editorconfig                        // 编辑器配置文件
    |---.gitignore                           // git 忽略的文件
    |---.postcssrc.js                        // postcss 配置文件
    |---package.json                         // 依赖配置文件
    |---README.md                            // 说明文件  
    |---yarn.lock                            // 依赖锁定文件
  

## Element UI库 ##
element-ui@2.4 是一套基于 vue 2.0 的PC端组件库，有助于方便快捷的实现页面结构与交互。使用方法请查阅[官方文档](http://element.eleme.io/#/zh-CN)。


## 图标库 ##
fontawesome@5.5.0 提供了大量丰富的图标，项目中使用的是免费版本，使用方法请查阅[官网](https://fontawesome.com/icons)。


## 规范文档 ##
docs 文件夹制定了js, css, html等的编码规范，git 的使用规范。为了保证项目编码风格一致，git 使用流程一致，请严格按照规范文档执行。

