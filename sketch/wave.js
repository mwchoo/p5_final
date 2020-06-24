class Wave {
  constructor(p) {
    this.p = p;
    this.pos = {
      x: 0,
      y: 0,
      z: 0
    }
    this.points = new ArrayList();
    this.l = 5; // spacing between points
    this.n = 60; // num of points
    this.t = 0;
    this.v = new p5.Vector();
    this.visible = false;
    this.startTime = undefined;
    this.timeDelta = 3000;
  }

  setPos(x, y, z) {
    this.pos.x = x;
    this.pos.y = y;
    this.pos.z = z;
  }

  setActiveTime() {
    this.startTime = p.millis();
    this.visible = true;
  }

  checkActiveTime() {
    const {p, startTime, timeDelta} = this;
    if (startTime + timeDelta >= p.millis()) {
      this.visible = false;
    }
  }

  initWave() {
    const {p, l, n, t} = this;
    this.t = p.millis() / 500;
    //translate(width/2, height/2, 0);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const x2 = (l * i + l / 2 - l * n / 2);
        const y2 = (l * j + l / 2 - l * n / 2);

        const distance = p.dist(0, 0, x2, y2);
        let z = p.exp(-distance / 520) * p.sin(((distance) / 10) - t) * 25;

        this.points.add(new p5.Vector(x2, y2, z));
      }
    }
  }

  drawWave() {
    const {p, l, n, t, v, points, pos} = this;
    p.push();
    p.translate(pos.x, pos.y, pos.z);
    p.stroke(100);

    for (let i = 0; i < n - 1; i++) {
      p.beginShape(p.QUAD_STRIP);
      //noStroke();
      for (let j = 0; j < n - 1; j++) {
        this.v = points.get(j + n * i);
        //stroke(127+v.z*10, 127+v.z*5, 127);
        p.vertex(v.x, v.y, v.z);
        this.v = points.get(j + n * (i + 1));
        p.vertex(v.x, v.y, v.z);
      }
      p.endShape();
    }
    p.pop();
  }

  render() {
    const {p, visible} = this;
    p.push();
    if (visible) {
      this.initWave();
      this.drawWave();
    }
    p.pop();
  }
}