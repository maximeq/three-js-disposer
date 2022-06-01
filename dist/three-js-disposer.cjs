'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var require$$0 = require('three');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);

function checkDependancy(packageName, dependancyName, dependancy) {
    let duplicationMessage = `${packageName}: ${dependancyName} is duplicated. Your bundle includes ${dependancyName} twice. Please repair your bundle.`;
    try {
        if (THREE[dependancyName] === undefined) {
            THREE[dependancyName] = dependancy;
            return;
        }

        if (THREE[dependancyName] !== dependancy) {
            throw duplicationMessage;
        }
    } catch (error) {
        if (error !== duplicationMessage) {
            console.warn(
                `${packageName}: Duplication check unavailable.` + error
            );
        } else {
            throw error;
        }
    }
}

function checkThreeRevision(packageName, revision) {
    if (THREE.REVISION != revision) {
        console.error(
            `${packageName} depends on THREE revision ${revision}, but current revision is ${THREE.REVISION}.`
        );
    }
}

const THREE$1 = require$$0__default["default"];

var Disposer = function(){};

Disposer.prototype.constructor = Disposer;

Disposer.prototype.disposeOnCascade = (function(){
    function disposeNode(node){
        if (node instanceof THREE$1.Mesh)
        {
            if (node.geometry)
            {
                node.geometry.dispose();
            }

            if (node.material)
            {
                if (node.material && node.material.materials)
                {
                    for(var i=0;i<node.material.materials.length; ++i){
                        mtrl = node.material.materials[i];
                        if (mtrl.map)           mtrl.map.dispose();
                        if (mtrl.lightMap)      mtrl.lightMap.dispose();
                        if (mtrl.bumpMap)       mtrl.bumpMap.dispose();
                        if (mtrl.normalMap)     mtrl.normalMap.dispose();
                        if (mtrl.specularMap)   mtrl.specularMap.dispose();
                        if (mtrl.envMap)        mtrl.envMap.dispose();

                        mtrl.dispose();    // disposes any programs associated with the material
                    }
                }
                else
                {
                    if (node.material.map)          node.material.map.dispose();
                    if (node.material.lightMap)     node.material.lightMap.dispose();
                    if (node.material.bumpMap)      node.material.bumpMap.dispose();
                    if (node.material.normalMap)    node.material.normalMap.dispose();
                    if (node.material.specularMap)  node.material.specularMap.dispose();
                    if (node.material.envMap)       node.material.envMap.dispose();

                    node.material.dispose ();   // disposes any programs associated with the material
                }
            }
        }
    }   // disposeNode

    function disposeHierarchy (node, callback){
        for (var i = node.children.length-1; i>=0; i--){
            var child = node.children[i];
            disposeHierarchy (child, callback);
            callback (child);
        }
    }

    return function(o){
        disposeHierarchy(o, disposeNode);
    };

})();

var disposer = Disposer;

/*
 * This file encapsulates the xthree library.
 * It checks if the needed three examples and the library are duplicated.
 */

const PACKAGE_NAME = "three-js-disposer";

checkThreeRevision(PACKAGE_NAME, 130);
checkDependancy(PACKAGE_NAME, "Disposer", disposer);

exports.Disposer = disposer;
