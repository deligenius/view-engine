'use strict';

import lib from './src/lib.js';
import env from './src/environment.js';
import Loader from './src/loader.js';
import loaders from './src/loaders.js';
import precompile from './src/precompile.js';

let exports = {};
exports.Environment = env.Environment;
exports.Template = env.Template;

exports.Loader = Loader;
exports.FileSystemLoader = loaders.FileSystemLoader;
exports.PrecompiledLoader = loaders.PrecompiledLoader;
exports.WebLoader = loaders.WebLoader;

import compiler from './src/compiler.js';
import parser from './src/parser.js';
import lexer from './src/lexer.js';
import runtime from './src/runtime.js';
exports.lib = lib;
import nodes from './src/nodes.js';

import jinja_compat from './src/jinja-compat.js';
exports.installJinjaCompat = jinja_compat;

// A single instance of an environment, since this is so commonly used

var e;
exports.configure = function(templatesPath, opts) {
    opts = opts || {};
    if(lib.isObject(templatesPath)) {
        opts = templatesPath;
        templatesPath = null;
    }

    var TemplateLoader;
    if(loaders.FileSystemLoader) {
        TemplateLoader = new loaders.FileSystemLoader(templatesPath, {
            watch: opts.watch,
            noCache: opts.noCache
        });
    }
    else if(loaders.WebLoader) {
        TemplateLoader = new loaders.WebLoader(templatesPath, {
            useCache: opts.web && opts.web.useCache,
            async: opts.web && opts.web.async
        });
    }

    e = new env.Environment(TemplateLoader, opts);

    if(opts && opts.express) {
        e.express(opts.express);
    }

    return e;
};

exports.compile = function(src, env, path, eagerCompile) {
    if(!e) {
        exports.configure();
    }
    return new exports.Template(src, env, path, eagerCompile);
};

exports.render = function(name, ctx, cb) {
    if(!e) {
        exports.configure();
    }

    return e.render(name, ctx, cb);
};

exports.renderString = function(src, ctx, cb) {
    if(!e) {
        exports.configure();
    }

    return e.renderString(src, ctx, cb);
};

if(precompile) {
    exports.precompile = precompile.precompile;
    exports.precompileString = precompile.precompileString;
}

export default exports;
