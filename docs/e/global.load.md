# load

Loads and evaluates a script from a file, a URL, or a script object.

## Sample

```javascript
// Can load script from files, URLs

load("foo.js"); // Loads script from file "foo.js" from the current directory
load("[http://www.example.com/t.js](http://www.example.com/t.js)"); // Loads script file from the given URL

// Loads script from an object's properties.

// Object should have "script" and "name" properties.
//    "script" property contains string code of the script.
//    "name" property specifies the name to be used while reporting errors from the script.
// This is almost like the standard "eval" except that it associates a name with
// the script string for debugging purposes.

load({ script: "print('hello')", name: "myscript.js"})

// load can also load from pseudo URLs like "nashorn:", "fx:", "classpath:"

// "nashorn:" pseudo URL scheme
// for Nashorn's built-in scripts.

// Load Nashorn's parser support script - defines the 'parse'
// function in the global scope

load("nashorn:parser.js");

// Load Mozilla compatibility script - which defines global functions
// like importPackage, importClass for Rhino compatibility.

load("nashorn:mozilla_compat.js");

// "fx:" pseudo URL scheme for JavaFX support scripts
// "classpath:" pseudo URL scheme to load scripts from jjs classpath jars and directories

load("classpath:foo.js"); // Load the first foo.js found in jjs -classpath dir
```
from https://wiki.openjdk.org/display/Nashorn/Nashorn+extensions
