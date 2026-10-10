class Scene {

    constructor() {
        this.objects = [];
        this.transitions = [];
    }

    text(x, y, size, font, color, text) {
        const textObject = new TextObject(this, x, y, size, font, color, text);
        this.objects.push(textObject);
        return textObject;
    }

    transition(object, key, start, end, initial, final) {
        const transition = new Transition(object, key, start, end, initial, final);
        this.transitions.push(transition);
        return transition;
    }
}
