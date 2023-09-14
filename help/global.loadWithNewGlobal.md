<H1>loadWithNewGlobal</H1>

loadWithNewGlobal is almost like the function "load" in that it loads script from a file or a URL or a script object. But unlike 'load', loadWithNewGlobal creates a fresh ECMAScript global scope object and loads the script into it. The loaded script's global definitions go into the fresh global scope. Also, the loaded script's modifications of builtin objects (like String.prototype.indexOf) is not reflected in the caller's global scope - these are affected in the newly created global scope.

<h2>Sample</h2>

```javascript
loadWithNewGlobal({
    script: "foo = 333; print(foo)",
    name: "test"
});
 
// prints undefined as "foo" is defined in the new global and not here
print(typeof foo);
```
from https://wiki.openjdk.org/display/Nashorn/Nashorn+extensions