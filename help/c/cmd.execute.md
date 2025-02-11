# cmd.execute

`execute` 函数用于调用程序或系统命令。如果执行过程中出现任何错误，将抛出 `CmdExecuteException` 异常。

## 示例

```javascript
cmd.execute(["java","-version"]);
```

## API

| 调用 | 返回值 |
|---|---|
| `cmd. execute ( params )` | `void` |

| 参数 | 类型 | 描述 |
|---|---|---|
| `params` | `Array` | 包含命令和参数的数组。 |