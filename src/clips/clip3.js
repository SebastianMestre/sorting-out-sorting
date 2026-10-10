function clip3() {
    const result = new Scene();

    const font = "monospace";
    const text = "Linear Insertion";
    const n = text.length;

    let permutation = Array.from({ length: n }, (_, i) => i);

    function reverseRange(start, end) {
        while (end-start >= 2) {
            const swap = permutation[start];
            permutation[start] = permutation[end-1];
            permutation[end-1] = swap;
            start++;
            end--;
        }
    }

    const space = text.indexOf(" ");
    reverseRange(0, space);
    reverseRange(space + 1, n);

    const line = new Permutation(result, text, {
        y: 200,
        size: 32,
        font: font,
        color: "white",
        horizontalStep: 20
    }, permutation);

    const transitionTime = 0;
    const stepTime = 0.08;
    const restTime = 0.4;

    {
        const timeline = new Timeline(result);


        for (let i = 1; i <= n; i++) {


            const inserted = line.item(i-1);
            
            let target = i-1;
            while (target > 0 && line.item(target - 1).index > inserted.index) {
                target--;
            }

            for (let k = target; k < i; k++) {
                timeline.transition(line.item(k).object, "color", 0, "green", "black");
            }


            for (let k = i-1; k > target; k--) {
                line.swap(timeline, k, k-1, transitionTime);
            }

            for (let k = i-1; k >= target; k--) {
                timeline.transition(line.item(k).object, "color", 0, "blue", "red");
                timeline.wait(stepTime);
            }

            timeline.wait(restTime)

        }
    }

    return result;
}
