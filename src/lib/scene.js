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

    rectangle(x, y, width, height, color) {
        const rectangle = new Rectangle(this, x, y, width, height, color);
        this.objects.push(rectangle);
        return rectangle;
    }

    transition(object, key, startTime, endTime, initialValue, finalValue) {
        const transition = new Transition(object, key, startTime, endTime, initialValue, finalValue);
        this.transitions.push(transition);
        return transition;
    }
}
