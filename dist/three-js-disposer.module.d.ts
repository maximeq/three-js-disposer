import { Object3D } from 'three';

declare class Disposer {
    disposeOnCascade: (o: Object3D) => void;
}

export { Disposer };
