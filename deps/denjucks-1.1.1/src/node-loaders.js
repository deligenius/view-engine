'use strict';

import * as path from 'https://deno.land/std/path/mod.ts';

import lib from './lib.js';
import Loader from './loader.js';
import PrecompiledLoader from './precompiled-loader.js';

function existsSync(p) {
	try {
		Deno.statSync(p);
		return true;
	} catch (e) {
		return false;
	}
}

var FileSystemLoader = Loader.extend({
    init: function(searchPaths, opts) {
        if(typeof opts === 'boolean') {
            console.log(
                '[nunjucks] Warning: you passed a boolean as the second ' +
                'argument to FileSystemLoader, but it now takes an options ' +
                'object. See http://mozilla.github.io/nunjucks/api.html#filesystemloader'
            );
        }

        opts = opts || {};
        this.pathsToNames = {};
        this.noCache = !!opts.noCache;

        if(searchPaths) {
            searchPaths = lib.isArray(searchPaths) ? searchPaths : [searchPaths];
            // For windows, convert to forward slashes
            this.searchPaths = searchPaths.map(path.normalize);
        }
        else {
            this.searchPaths = ['.'];
        }
    },

    getSource: function(name) {
        var fullpath = null;
        var paths = this.searchPaths;

        for(var i=0; i<paths.length; i++) {
            var basePath = path.resolve(paths[i]);
            var p = path.resolve(paths[i], name);

            // Only allow the current directory and anything
            // underneath it to be searched
            if(p.indexOf(basePath) === 0 && existsSync(p)) {
                fullpath = p;
                break;
            }
        }

        if(!fullpath) {
            return null;
        }

        this.pathsToNames[fullpath] = name;
		
		var decoder = new TextDecoder("utf-8");
        return { src: decoder.decode(Deno.readFileSync(fullpath)),
                 path: fullpath,
                 noCache: this.noCache };
    }
});

export default {
    FileSystemLoader: FileSystemLoader,
    PrecompiledLoader: PrecompiledLoader
};
