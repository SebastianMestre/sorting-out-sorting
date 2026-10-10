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
        if (transition.start > time) {
            continue;
        }

        const duration = transition.end - transition.start;
        let progress = duration <= 0 ? 1 : (time - transition.start) / duration;
        if (progress < 0) {
            progress = 0;
        }
        if (progress > 1) {
            progress = 1;
        }

        transition.object[transition.key] = transitionValue(transition.initial, transition.final, progress);
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
