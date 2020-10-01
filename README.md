three-js-disposer
================

[![License][license-badge]][license-badge-url]

Method to dispose of everything in a THREE.JS Object3D hierarchy (including its children). Especially usefull to clean up a complete scene.

Builds will create THREE.Disposer.

Usage :
new THREE.Disposer().disposeOnCascade(object3d);
