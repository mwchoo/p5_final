class Wave {
  constructor(p, id) {
    this.p = p;
    this.id = id;
    this.scale = 0.3;
    this.pos = {
      x: 0,
      y: 0,
      z: 0
    }

    this.angle = 99;
    this.w = 44;
    this.ma = p.atan(1 / p.sqrt(2));
    this.maxD = p.dist(0, 0, 200, 200);

    this.points = new ArrayList();
    this.l = 5; // spacing between points
    this.n = 60; // num of points
    this.t = 0;
    this.v = new p5.Vector();

    this.visible = false;
    this.startTime = undefined;
    this.timeDelta = 3000;
    this.execNextWave = false;

    this.go_stop = 0;

    if (id === 1) {
      this.waveColor = p.color(75, 116, 148);
    } else if (id === 2) {
      this.waveColor = p.color(88, 135, 164);
    } else {
      this.waveColor = p.color(62, 98, 127);
    }
  }

  setPos(x, y, z) {
    this.pos.x = x;
    this.pos.y = y;
    this.pos.z = z;
  }

  setActiveTime() {
    const {p} = this;
    this.startTime = p.millis();
    this.visible = true;
    this.execNextWave = false;
    this.go_stop = p.random(10);
  }

  checkActiveTime() {
    const {p, id, startTime, timeDelta, execNextWave} = this;
    if (id < p.MAX_WAVE - 1) {
      if (!execNextWave && startTime + timeDelta / 3 <= p.millis()) {
        // active next wave
        if (this.go_stop > 3) {
          p.wave[id + 1].setActiveTime();
          p.wave[id + 1].setPos(this.pos.x + p.random(-300, 300), this.pos.y, this.pos.z - p.random(1200, 2000));
          this.execNextWave = true;
        }
      }
    }
    if (startTime + timeDelta <= p.millis()) {
      // remove current wave
      this.visible = false;
    }
  }

  /*initWave() {
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
  }*/

  drawWave() {  // QUAD_STRIP is not implemented in webgl... :(
    const {p, pos, w, maxD, angle} = this;
    p.push();
    p.scale(this.scale);
    p.rotateX(-p.HALF_PI / 2);
    p.translate(pos.x, pos.y + 2000, pos.z - 2000);
    /*p.stroke(100);

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
    }*/

    for (let z = 0; z < 1000; z += w) {
      for (let x = 0; x < 1000; x += w) {
        p.push();
        let d = p.dist(x, z, 1000 / 2, 1000 / 2);
        let offset = p.map(d, 0, maxD, -p.PI / 2, p.PI / 2);
        let a = angle + offset;
        let h = p.map(p.sin(a), -1, 1, 0, 100);
        p.noStroke();
        p.translate(x - 1000 / 1.6, -250, z - 1000 / 2);
        p.fill(this.waveColor);
        p.translate(0, 0, h);
        p.box(w - 2, 2, w - 2);
        p.pop();
      }
    }
    this.angle -= 0.1;
    p.pop();
  }

  render() {
    const {p, visible} = this;
    p.push();
    if (visible) {
      //this.initWave();
      this.drawWave();
      this.checkActiveTime();
    }
    p.pop();
  }
}