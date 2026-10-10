class Timeline {

    constructor(scene) {
        this.scene = scene;
        this.currentTime = 0;
    }

    transition(object, key, duration, initialValue, finalValue) {
        return this.scene.transition(
            object,
            key,
            this.currentTime,
            this.currentTime + duration,
            initialValue,
            finalValue
        );
    }

    wait(duration) {
        this.currentTime += duration;
    }
}
