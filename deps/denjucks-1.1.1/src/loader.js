'use strict';

// import * as path from './deps/path/std/path/mod.ts';
import * as path from 'https://deno.land/std/path/mod.ts';

import Obj from './object.js';
import lib from './lib.js';

var Loader = Obj.extend({
    on: function(name, func) {
        this.listeners = this.listeners || {};
        this.listeners[name] = this.listeners[name] || [];
        this.listeners[name].push(func);
    },

    emit: function(name /*, arg1, arg2, ...*/) {
        var args = Array.prototype.slice.call(arguments, 1);

        if(this.listeners && this.listeners[name]) {
            lib.each(this.listeners[name], function(listener) {
                listener.apply(null, args);
            });
        }
    },

    resolve: function(from, to) {
        return path.resolve(path.dirname(from), to);
    },

    isRelative: function(filename) {
        return (filename.indexOf('./') === 0 || filename.indexOf('../') === 0);
    }
});

export default Loader;
