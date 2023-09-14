<H1>load</H1>

Loads and evaluates script from a file or a URL or a script object.
<h2>Sample</h2>

```javascript
// can load script from files, URLs
 
load("foo.js"); // loads script from file "foo.js" from current directory
load("http://www.example.com/t.js"); // loads script file from given URL
 
// loads script from an object's properties.
 
// Object should have "script" and "name" properties.
//     "script" property contains string code of the script.
//     "name" property specifies name to be used while reporting errors from script
// This is almost like the standard "eval" except that it associates a name with
// the script string for debugging purpose.
 
load({ script: "print('hello')", name: "myscript.js"})
 
// load can also load from pseudo URLs like "nashorn:", "fx:", "classpath:"
 
// "nashorn:" pseudo URL scheme
// for nashorn's built-in scripts.
 
// load nashorn's parser support script - defines 'parse'
// function in global scope
 
load("nashorn:parser.js");
 
// load Mozilla compatibility script - which defines global functions
// like importPackage, importClass for rhino compatibility.
 
load("nashorn:mozilla_compat.js");
 
// "fx:" pseudo URL scheme for JavaFX support scripts
// "classpath:" pseudo URL scheme to load scripts from jjs classpath jars and directories
 
load("classpath:foo.js"); // load the first foo.js found in jjs -classpath dir
```
from https://wiki.openjdk.org/display/Nashorn/Nashorn+extensions
