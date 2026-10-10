const canvas = document.getElementById("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");

const clipNumber = clipNumberFromLocation();
loadAndRender(clipNumber);

function clipNumberFromLocation() {
    const raw = new URLSearchParams(location.search).get("clip");
    if (raw == null || raw === "") {
        return 1;
    }

    const number = Number(raw);
    if (!Number.isInteger(number) || number < 1) {
        return null;
    }
    return number;
}

function loadAndRender(number) {
    if (number == null) {
        showMessage("Clip must be a positive integer, as in ?clip=1");
        return;
    }

    loadScript("clips/clip" + number + ".js").then(function () {
        const clip = globalThis["clip" + number];
        if (typeof clip !== "function") {
            showMessage("Clip " + number + " did not define clip" + number + "()");
            return;
        }

        try {
            renderScene(clip());
        } catch (error) {
            showMessage(error.message);
        }
    }).catch(function () {
        showMessage("Could not load clip " + number);
    });
}

function loadScript(src) {
    return new Promise(function (resolve, reject) {
        const script = document.createElement("script");
        script.src = src;
        script.onload = function () { resolve(); };
        script.onerror = function () { reject(); };
        document.body.appendChild(script);
    });
}

function renderScene(scene) {
    playScene(scene, function () {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (const object of scene.objects) {
            object.draw(ctx);
        }
    });
}

function showMessage(message) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px monospace";
    ctx.textBaseline = "top";
    ctx.fillText(message, 24, 24);
}
