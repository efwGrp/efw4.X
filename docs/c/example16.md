# efw 与 Vue.js 集成示例

## 概述

本示例展示了如何将 efw 框架与 Vue.js 前端框架进行集成，实现前后端分离的开发模式。efw 负责后端数据处理和业务逻辑，Vue.js 负责前端的用户界面和状态管理，二者通过 efw事件 进行通信。

## 核心文件

1. **集成界面页面**: `helloVue.jsp`
2. **数据初始化处理**: `helloVue_init.js`
3. **数据发送处理**: `helloVue_send.js`

## 功能特性

### 1. 前端 Vue.js 功能

#### 响应式数据绑定
```javascript
// Vue 3 Composition API
const data = Vue.ref({});
```

#### 事件处理
```javascript
// 方法定义
const vueSend = function() {
    Efw('helloVue_send', { data: data.value })
    .then(function(ret){
        data.value = ret;
    });
};
```

#### 模板语法
```html
<!-- 双向数据绑定 -->
<input v-model="data.item1">

<!-- 条件渲染 -->
<span v-if="data.item18">选中</span>
<span v-else>未选中</span>

<!-- 列表渲染 -->
<tr v-for="(item, index) in data.item22datas" :key="index">
```

### 2. 后端 efw 功能

#### 数据提供
```javascript
// 使用 provide 方法返回数据
return new Result().provide(data);
```

#### 错误处理
框架会自动捕获数据库相关的错误且回滚事务处理。
没有特殊需求，不需要对数据库处理加try-catch处理。

#### 消息传递
```javascript
// 添加通知消息
return new Result()
    .provide(data)
    .alert("操作成功");

```
### 3. 基本数据流

#### 初始化流程
1. 页面加载时调用 helloVue_init 事件
2. 后端返回初始数据
3. Vue.js 将数据绑定到界面

#### 数据发送流程
1. 用户在界面修改数据
2. 点击发送按钮触发 vueSend 方法
3. 调用 helloVue_send 事件并传递数据
4. 后端处理数据并返回结果
5. 前端更新界面显示