Usopp


#### 智能分析平台-知识库平台

指标和维度唯一编码id知识库管理后台，用于异常分析数据准备，同时是分析知识库和标签反馈后台，用于原因分析模型学习和训练

## 前端页面构建步骤

``` bash
# install dependencies

npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test

```
## 后台构建步骤
### API概述

  * 提供rest api 服务
  * 提供可视化的文档浏览主页
  * 提供可测试api的UI交互
  
### 部署

  * 部署使用pm2工具进行应用管理及部署
  
      *  首次部署命令行执行:
            
    ```
     pm2 startOrRestart ecosystem.json --env production|pre
    ```
     

### api文档
  http://localhost:40000


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


