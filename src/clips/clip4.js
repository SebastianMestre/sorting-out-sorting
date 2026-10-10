class SortArray {
    constructor(scene, arr) {
        const n = arr.length;

        this.scene = scene;

        this.glowSize = 10;
        this.rectWidth_ = 20;
        this.verticalPadding = 100;
        this.heightStepSize = (HEIGHT - this.verticalPadding * 2) / n;
        this.gapSize = WIDTH / (n+1);

        this.blackDuration = 0.2;
        this.swapDuration = 0.2;

        this.items = [];
        for (let i = 0; i < n; ++i) {
            this.items.push({ value: arr[i] });
        }

        for (let i = 0; i < n; ++i) {
            const x = this.glowX(i);
            const y = this.glowY(i);
            const width = this.glowWidth(i);
            const height = this.glowHeight(i);
            const glow = scene.rectangle(x, y, width, height, "black");
            this.items[i].glow = glow;
        }

        for (let i = 0; i < n; ++i) {
            const x = this.rectX(i);
            const y = this.rectY(i);
            const width = this.rectWidth(i);
            const height = this.rectHeight(i);
            const rect = scene.rectangle(x, y, width, height, "green");
            this.items[i].rect = rect;
        }
    }

    value(i) { return this.items[i].value; }

    rectX(i) { return this.gapSize * (i + 1) - this.rectWidth_ / 2; }
    rectY(i) { return - this.rectHeight(i) + HEIGHT - this.verticalPadding; }
    rectWidth(i) { return this.rectWidth_; }
    rectHeight(i) { return this.items[i].value * this.heightStepSize; }
    
    glowX(i) { return this.rectX(i) - this.glowSize; }
    glowY(i) { return this.rectY(i) - this.glowSize; }
    glowHeight(i) { return this.rectHeight(i) + this.glowSize * 2; }
    glowWidth(i) { return this.rectWidth(i) + this.glowSize * 2; }

    glowOn(timeline, i) {
        timeline.transition(this.items[i].glow, "color", 0, null, "yellow");
    }
    glowOff(timeline, i) {
        timeline.transition(this.items[i].glow, "color", 0, null, "black");
    }

    darken(timeline, i) {
        timeline.transition(this.items[i].rect, "color", 0, null, "gray");
    }
    undarken(timeline, i) {
        timeline.transition(this.items[i].rect, "color", 0, null, "red");
    }

    red(timeline, i) {
        timeline.transition(this.items[i].rect, "color", 0, null, "red");
    }
    green(timeline, i) {
        timeline.transition(this.items[i].rect, "color", 0, null, "green");
    }

    black(timeline, i) {
        timeline.transition(this.items[i].rect, "color", this.blackDuration, "green", "black");
    }
    unblack(timeline, i) {
        timeline.transition(this.items[i].rect, "color", this.blackDuration, "black", "red");
    }

    swap(timeline, i, j) {
        const itemI = this.items[i];
        const itemJ = this.items[j];

        timeline.transition(itemI.rect, "x", this.swapDuration, this.rectX(i), this.rectX(j));
        timeline.transition(itemI.glow, "x", this.swapDuration, this.glowX(i), this.glowX(j));

        timeline.transition(itemJ.rect, "x", this.swapDuration, this.rectX(j), this.rectX(i));
        timeline.transition(itemJ.glow, "x", this.swapDuration, this.glowX(j), this.glowX(i));

        this.items[i] = itemJ;
        this.items[j] = itemI;
    }

}

function clip4() {
    const scene = new Scene();
    const timeline = new Timeline(scene);

    const arr = [2,4,6,3,1,7,5];
    const n = arr.length;

    const array = new SortArray(scene, arr);

    for (let i = 1; i <= n; ++i) {

        let cut = i-1;

        while (true) {
            if (cut == 0) break;

            array.glowOn(timeline, i-1);
            array.glowOn(timeline, cut-1);

            timeline.wait(0.5);

            array.glowOff(timeline, cut-1);
            array.glowOff(timeline, i-1);


            if (array.value(cut-1) < array.value(i-1)) {
                break;
            }

            array.darken(timeline, cut-1);

            timeline.wait(0.5);

            cut--;
        }

        timeline.wait(0.5);


        if (i-1 !== cut) {
            array.black(timeline, i-1);
            timeline.wait(array.blackDuration);

            for (let j = i-1; j > cut; --j) {
                array.swap(timeline, j, j-1);
                timeline.wait(array.swapDuration);
                array.undarken(timeline, j);
            }


            array.unblack(timeline, cut);
            timeline.wait(array.blackDuration);
        }


    }
    return scene;
}