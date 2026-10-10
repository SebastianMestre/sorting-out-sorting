class Rectangle {
    constructor(scene, x, y, width, height, color) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = normalizeColor(color);
    }

    draw(ctx) {
        ctx.fillStyle = serializeColor(this.color);
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
