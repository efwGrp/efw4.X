# efw 批处理示例介绍

EFW 提供了一个强大的批处理功能，允许开发者通过 JavaScript 编写批处理逻辑，并在 Windows 和 Linux 环境下执行。以下是一个完整的批处理示例。

## 1. 处理启动脚本

### 1.1 Windows 批处理启动脚本
**文件名**: `helloBatch.bat`

### 1.2 Linux 批处理启动脚本  
**文件名**: `helloBatch.sh`

## 2. 批处理业务逻辑

**主文件**: `helloBatch.js`

### 参数定义
```javascript
var helloBatch = {};
helloBatch.paramsFormat = {
    "sysDate": "format:yyy/MM/dd;display-name:sysdate"
};
```

### 主要功能模块
- **2.1** Excel 文件操作
- **2.2** PDF 文件处理
- **2.3** 文本和 CSV 文件处理
- **2.4** 数据库操作
- **2.5** REST API 调用
- **2.6** 邮件发送

## 3. 执行流程

1. **环境准备**: 设置 JDK、TOMCAT 路径和类路径
2. **参数传递**: 通过 JSON 格式传递系统日期参数
3. **日志记录**: 输出重定向到日志文件
4. **业务执行**: 按顺序执行各个功能模块
5. **结果返回**: 通过 Batch 对象返回执行结果

## 4. 技术特点

- **跨平台支持**: 提供 Windows 和 Linux 双版本启动脚本
- **统一 API**: 使用一致的 JavaScript API 进行各种操作
- **事务管理**: 支持数据库事务的提交和回滚
- **错误处理**: 完善的异常处理和日志记录机制
- **模板化**: 支持 Excel、PDF 等文件的模板化操作

## 5. 使用说明

### Windows 环境执行
```batch
helloBatch.bat
```

### Linux 环境执行
```bash
chmod +x helloBatch.sh
./helloBatch.sh
```

### 查看执行结果
```bash
tail -f $TOMCAT/logs/helloBatch.log
```

这个示例展示了 EFW 批处理框架的强大功能，涵盖了企业应用中常见的文件处理、数据库操作、API 集成等场景，为复杂的批处理任务提供了完整的解决方案。
