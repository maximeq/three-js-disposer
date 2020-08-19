(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('three-full')) :
    typeof define === 'function' && define.amd ? define(['three-full'], factory) :
    (global.THREEDisposer = factory(global.THREE));
}(this, (function (threeFull) { 'use strict';

    threeFull = threeFull && threeFull.hasOwnProperty('default') ? threeFull['default'] : threeFull;

    var Disposer = function(){};

    Disposer.prototype.constructor = Disposer;

    Disposer.prototype.disposeOnCascade = (function(){
        function disposeNode(node){
            if (node instanceof threeFull.Mesh)
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

    threeFull.Disposer = Disposer;

    var disposer = Disposer;

    return disposer;

})));
