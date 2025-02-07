# cmd.execute

The `execute` function is established to invoke a program or system command. If something goes wrong in the execution, `CmdExecuteException` will be thrown.

## Sample

```javascript
cmd.execute(["java","-version"]);
```

## API

| Calling | Returning |
|---|---|
| `cmd.execute(params)` | `void` |

| Parameters | Type | Description |
|---|---|---|
| `params` | `Array` | An array to contain the command and parameters. |