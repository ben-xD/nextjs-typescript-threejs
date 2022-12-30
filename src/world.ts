import * as THREE from "three";

export class World {
    private renderer: THREE.Renderer
    private readonly scene: THREE.Scene;
    private clock: THREE.Clock
    private readonly camera: THREE.Camera;
    private readonly width: number;
    private readonly height: number;
    private readonly scale: number;

    constructor(private canvas?: HTMLCanvasElement) {
        this.scale = 3;
        this.width = 160 * this.scale;
        this.height = 90 * this.scale;

        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();

        this.addAxisHelper();
        this.renderer = new THREE.WebGLRenderer({canvas: canvas});
        this.renderer.setSize(this.width, this.height);

        this.addLighting();

        this.addObjects();

        this.camera = this.createCamera();

        this.tick();
    }

    private createCamera = (): THREE.Camera => {
        const camera = new THREE.PerspectiveCamera(75, this.width / this.height);
        camera.position.z = 3;
        this.scene.add(camera);
        return camera;
    }

    private addLighting = () => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(ambientLight);
    }

    private addAxisHelper = () => {
        const axesHelper = new THREE.AxesHelper(1);
        axesHelper.position.set(-2, -2, 0)
        this.scene.add(axesHelper);
    }

    tick = () => {
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.tick);

        // Using THREE.Clock for animation
        // mesh.rotation.y += 1 * clock.getDelta();
        // // Can't use delta time here because the value is always close to 0,
        // // and therefore the position will be set to 0 all the time.
        // mesh.position.y = Math.sin(clock.getElapsedTime());
        // // camera.lookAt(mesh.position);
    }

    close = () => {
        console.log("closed")
    }

    private addObjects = () => {
        /**
         * Objects
         */
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const material = new THREE.MeshPhongMaterial({color: 0x806dde});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -2;
        this.scene.add(mesh);

        // mesh.position.set(2, 1, -1)
        // mesh.rotation.set(Math.PI/4, 0, 0)
        mesh.rotation.set(0, Math.PI / 4, 0);
    }
}