class Paint {
  constructor(context) {
    this.c = context;
  }

  line(x, y) {
    this.c.strokeStyle = this.color;
    this.c.lineWidth = this.radius;
    this.c.lineCap = 'round';
    if (this.x == undefined || this.y == undefined) {
      this.x = x;
      this.y = y;
    }

    this.c.beginPath();
    this.c.moveTo(this.x, this.y);
    this.c.lineTo(x, y);
    this.c.stroke();

    this.x = x;
    this.y = y;
  }

  start() {
    this.painting = true;
  }

  stop() {
    this.painting = false;
    this.x = undefined;
    this.y = undefined;
  }
}