efw 与 Vue.js 集成示例

概述

本示例展示了如何将 efw 框架与 Vue.js 前端框架进行集成，实现前后端分离的开发模式。efw 负责后端数据处理和业务逻辑，Vue.js 负责前端的用户界面和状态管理，二者通过 RESTful API 进行通信。

核心文件

1. 集成界面页面 (helloVue.jsp)

2. 数据初始化处理 (helloVue_init.js)

3. 数据发送处理 (helloVue_send.js)


功能特性

1. 前端 Vue.js 功能

响应式数据绑定

// Vue 3 Composition API
const data = Vue.ref({});


事件处理

// 方法定义
const vueSend = function() {
    Efw('helloVue_send', { data: data.value })
    .then(function(response){
        data.value = response;
    });
};


模板语法

<!-- 双向数据绑定 -->
<input v-model="data.item1">

<!-- 条件渲染 -->
<span v-if="data.item18">选中</span>
<span v-else>未选中</span>

<!-- 列表渲染 -->
<tr v-for="(item, index) in data.item22datas" :key="index">


2. 后端 efw 功能

数据提供

// 使用 provide 方法返回数据
return new Result().provide(data);


错误处理

// 异常捕获和处理
try {
    // 处理逻辑
} catch (error) {
    return new Result()
        .provide({ error: error.message })
        .status(500);
}


消息传递

// 添加状态消息
return new Result()
    .provide(data)
    .message("操作成功");


3. 前后端通信

前端调用后端

// 使用 Efw 函数调用后端事件
Efw('helloVue_init')
.then(function(response){
    // 处理响应
})
.catch(function(error){
    // 处理错误
});


后端响应格式

// 标准响应格式
{
    data: {},       // 主要数据
    message: "",    // 状态消息
    status: 200     // HTTP状态码
}


配置说明

1. 项目结构


项目根目录/
├── WEB-INF/
│   ├── web.xml                 # Web应用配置
│   ├── efw/
│   │   ├── event/
│   │   │   ├── helloVue_init.js    # 初始化事件处理
│   │   │   └── helloVue_send.js    # 数据发送事件处理
│   │   └── sql/                # SQL定义文件（可选）
│   └── lib/                    # 依赖库
└── helloVue.jsp                # 主界面文件


3. 前端配置

Vue 3 特性利用

// Composition API
setup() {
    const data = Vue.ref({});
    const methods = {
        initializeData() { /* ... */ },
        sendToServer() { /* ... */ }
    };
    
    return { data, ...methods };
}


响应式数据处理

// 使用 Vue.ref 创建响应式数据
const formData = Vue.ref({
    username: '',
    email: '',
    preferences: {}
});

// 使用 Vue.computed 创建计算属性
const isValid = Vue.computed(() => {
    return formData.value.username && formData.value.email;
});


使用示例

1. 基本数据流

初始化流程

1. 页面加载时调用 helloVue_init 事件
2. 后端返回初始数据
3. Vue.js 将数据绑定到界面

数据发送流程

1. 用户在界面修改数据
2. 点击发送按钮触发 sendToServer 方法
3. 调用 helloVue_send 事件并传递数据
4. 后端处理数据并返回结果
5. 前端更新界面显示

2. 数据处理示例

前端数据收集

// 收集表单数据
const formData = {
    username: data.value.item1,
    email: data.value.item7,
    preferences: {
        theme: data.value.item17,
        notifications: data.value.item18
    }
};

// 发送到后端
Efw('userUpdate', { userData: formData });


后端数据处理

// 用户数据更新处理
userUpdate.fire = function(params) {
    const userData = params.userData;
    
    // 数据验证
    if (!userData.username || !userData.email) {
        throw new Error("用户名和邮箱为必填项");
    }
    
    // 业务逻辑处理
    const result = userService.updateUser(userData);
    
    return new Result()
        .provide(result)
        .message("用户更新成功");
};


3. 错误处理示例

前端错误处理

Efw('dataOperation', { data: formData })
.then(response => {
    // 处理成功响应
    console.log("操作成功", response);
})
.catch(error => {
    // 处理错误
    console.error("操作失败", error);
    alert("操作失败: " + error.message);
});


后端错误处理

dataOperation.fire = function(params) {
    try {
        // 业务逻辑
        if (!params.data) {
            throw new Error("无效的数据参数");
        }
        
        // 处理数据
        const result = processData(params.data);
        
        return new Result()
            .provide(result)
            .message("数据处理成功");
            
    } catch (error) {
        // 记录错误日志
        logger.error("数据处理错误", error);
        
        return new Result()
            .provide({ error: error.message })
            .message("数据处理失败")
            .status(500);
    }
};


最佳实践

1. 数据管理

状态管理

// 使用 Vue reactive 进行复杂状态管理
const appState = Vue.reactive({
    user: null,
    settings: {},
    isLoading: false,
    errors: []
});

// 提供状态更新方法
const setUser = (userData) => {
    appState.user = userData;
};

const setLoading = (loading) => {
    appState.isLoading = loading;
};


数据验证

// 前端验证
const validateForm = (formData) => {
    const errors = [];
    
    if (!formData.username) {
        errors.push("用户名不能为空");
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push("邮箱格式不正确");
    }
    
    return errors;
};

// 后端验证
userUpdate.fire = function(params) {
    const errors = validateUserData(params.userData);
    if (errors.length > 0) {
        throw new Error(errors.join(", "));
    }
    
    // 继续处理...
};


2. 性能优化

组件懒加载

// 异步加载组件
const AsyncComponent = Vue.defineAsyncComponent(() =>
    import('./components/AsyncComponent.vue')
);


数据缓存

// 使用缓存提高性能
const cachedData = Vue.ref(null);

const loadData = async () => {
    if (cachedData.value) {
        return cachedData.value;
    }
    
    const response = await Efw('getData');
    cachedData.value = response;
    return response;
};


3. 安全考虑

XSS 防护

// 对用户输入进行清理
const cleanInput = (input) => {
    return input.replace(/<script.*?>.*?<\/script>/gi, '');
};

// 在接收数据时进行清理
userUpdate.fire = function(params) {
    const cleanedData = {
        ...params.userData,
        username: cleanInput(params.userData.username),
        bio: cleanInput(params.userData.bio)
    };
    
    // 处理清理后的数据
};


CSRF 保护

// 添加CSRF令牌
const requestWithCsrf = (eventName, data) => {
    const csrfToken = getCsrfToken();
    return Efw(eventName, {
        ...data,
        _csrf: csrfToken
    });
};


高级功能

1. 实时数据更新

WebSocket 集成

// 建立WebSocket连接
const socket = new WebSocket('ws://localhost:8080/ws');

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    // 更新Vue数据
    data.value = { ...data.value, ...message };
};


服务器推送

// 服务器端推送数据
pushUpdate.fire = function(params) {
    const updateData = processUpdate(params);
    
    // 推送到所有连接的客户端
    webSocketServer.broadcast(updateData);
    
    return new Result()
        .provide(updateData)
        .message("更新已推送");
};


2. 文件上传支持

前端文件上传

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    Efw('uploadFile', { file: formData })
    .then(response => {
        console.log("上传成功", response);
    });
};


后端文件处理

```javascript
uploadFile.fire = function(params) {