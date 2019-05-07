(function (modules) {
    var installedModules = {}
    function require(moduleName) {
        if(installedModules[moduleName]) {
            return installedModules[moduleName].exports
        }

        var module = installedModules[moduleName] = {
            exports: {},
            name: moduleName,
            loaded: false
        }

        modules[moduleName].call(module.exports, module, module.exports, require)

        module.loaded = true
        return module.exports
    }

    return require('entry')
})({
    "entry": function(module, exports, require, global) {
        var module1 = require("./module1")
        var module2 = require('./module2')
        module1.foo()
        module2.foo()

        function hello() {
            console.log('hello')
        }

        module.exports = hello
    },
    "./module1": function(module, exports, require, global) {
        var module2 = require('./module2')
        console.log("init module1")

        console.log("this is module2.foo() in module1")
        module2.foo()
        console.log('\n')

        module.exports = {
            foo: function() {
                console.log("module1 foo")
            }
        }
    },
    "./module2": function(module, exports, require, global) {
        console.log('init module2')
        module.exports = {
            foo: function() {
                console.log('module2 foo')
            }
        }
    }
})