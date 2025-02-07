# Excel.close

The `close` function is used to close the Excel object.

## Sample

```javascript
var excel = new Excel("test.xlsx");
excel.save("my.xlsx").close();		// Both test.xlsx and my.xlsx will be kept.
```

## API

| Calling | Returning |
|---|---|
| `Excel.close()` | `void` |
