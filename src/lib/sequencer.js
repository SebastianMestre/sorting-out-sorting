let playbackFrame = 0;

function playScene(scene, draw) {
    cancelAnimationFrame(playbackFrame);
    const origin = performance.now();

    function tick(now) {
        applyTransitions(scene, (now - origin) / 1000);
        draw(scene);
        playbackFrame = requestAnimationFrame(tick);
    }

    tick(origin);
}

function applyTransitions(scene, time) {
    for (const transition of scene.transitions) {
        if (transition.startTime > time) {
            continue;
        }

        const duration = transition.endTime - transition.startTime;
        let progress = duration <= 0 ? 1 : (time - transition.startTime) / duration;
        if (progress < 0) {
            progress = 0;
        }
        if (progress > 1) {
            progress = 1;
        }

        if (transition.initialValue == null) {
            transition.initialValue = transition.object[transition.key];
        }

        if (transition.key === "color") {
            transition.object.color = lerpColor(transition.initialValue, transition.finalValue, progress);
        } else {
            transition.object[transition.key] = transitionValue(transition.initialValue, transition.finalValue, progress);
        }
    }
}

function transitionValue(initial, final, progress) {
    if (typeof initial === "number" && typeof final === "number") {
        return initial + (final - initial) * progress;
    }
    if (progress >= 1) {
        return final;
    }
    return initial;
}
