# loadWithNewGlobal

`loadWithNewGlobal` is similar to the `load` function in that it loads a script from a file, a URL, or a script object. However, unlike `load`, `loadWithNewGlobal` creates a new ECMAScript global scope object and loads the script into it. The loaded script's global definitions are placed in this new global scope.  Furthermore, modifications made by the loaded script to built-in objects (such as `String.prototype.indexOf`) are *not* reflected in the caller's global scope; these modifications only affect the newly created global scope.

## Sample

```javascript
loadWithNewGlobal({
    script: "foo = 333; print(foo)",
    name: "test"
});
 
// prints undefined as "foo" is defined in the new global and not here
print(typeof foo);
```
from https://wiki.openjdk.org/display/Nashorn/Nashorn+extensions