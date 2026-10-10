function clip2() {
    const result = new Scene();


    const transitionTime = 0.1;
    const stepTime = 0.2;
    const font = "monospace";
    const text = "Sorting Out Sorting";
    const n = text.length;

    let permutation = Array.from({ length: n }, (_, i) => i);
    permutation.reverse();

    const line = new Permutation(result, text, {
        y: 200,
        size: 32,
        font: font,
        color: "white",
        horizontalStep: 20
    }, permutation);


    const timeline = new Timeline(result);
    {

        let l = 0, r = n;
        while (l < r) {

            for (let i = r; i-l >= 2; i--) {
                const oa = line.item(i-1);
                const ob = line.item(i-2);
                if (oa.index < ob.index) {
                    line.swap(timeline, i-1, i-2, transitionTime);
                    timeline.wait(stepTime);
                }
            }
            
            timeline.transition(line.item(l).object, "color", 0, "green", "red");
            timeline.wait(stepTime);
            l++;

            for (let i = l; r-i >= 2; i++) {
                const oa = line.item(i);
                const ob = line.item(i+1);
                if (oa.index > ob.index) {
                    line.swap(timeline, i, i+1, transitionTime);
                    timeline.wait(stepTime);
                }
            }

            timeline.transition(line.item(r-1).object, "color", 0, "green", "red");
            timeline.wait(stepTime);
            r--;

        }
            
    }


    return result;
}
