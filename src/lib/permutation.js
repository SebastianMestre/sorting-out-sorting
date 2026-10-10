class Permutation {

    constructor(scene, text, properties, permutation) {
        this.horizontalStep = properties.horizontalStep;
        const totalTextWidth = text.length * this.horizontalStep;
        this.centeringOffset = (WIDTH - totalTextWidth) / 2;

        this.permutation = permutation.slice();
        this.items = [];

        for (let index = 0; index < text.length; index++) {
            const object = scene.text(
                this.slotX(this.permutation.indexOf(index)),
                properties.y,
                properties.size,
                properties.font,
                properties.color,
                text[index]
            );
            this.items.push({ object, index });
        }
    }

    slotX(slot) {
        return this.centeringOffset + slot * this.horizontalStep;
    }

    item(slot) {
        return this.items[this.permutation[slot]];
    }

    swap(timeline, slotA, slotB, duration) {
        const itemA = this.item(slotA);
        const itemB = this.item(slotB);

        this.permutation[slotA] = itemB.index;
        this.permutation[slotB] = itemA.index;

        timeline.transition(itemA.object, "x", duration, this.slotX(slotA), this.slotX(slotB));
        timeline.transition(itemB.object, "x", duration, this.slotX(slotB), this.slotX(slotA));
    }
}
