class Transition {
    constructor(object, key, startTime, endTime, initialValue, finalValue) {
        this.object = object;
        this.key = key;
        this.startTime = startTime;
        this.endTime = endTime;
        this.initialValue = initialValue;
        this.finalValue = finalValue;

        if (key === "color") {
            if (initialValue != null) {
                this.initialValue = normalizeColor(initialValue);
            }
            this.finalValue = normalizeColor(finalValue);
        }
    }
}
