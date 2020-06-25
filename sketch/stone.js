class Stone {
  constructor(p) {
    this.p = p;
    this.pos = {
      x: 0,
      y: 0,
      z: 0
    }
    this.visible = true;
    this.flying = false;
    this.color = p.color(80, 80, 80);
  }

  initStone() {
    // init pos of hand
    this.pos.x = 0;
    this.pos.y = 0;
    this.pos.z = 0;
    this.visible = true;
    this.flying = false;
  }

  setPos(x, y, z) {
    this.pos.x = x;
    this.pos.y = y;
    this.pos.z = z;
  }

  setFlying() {
    this.flying = true;
  }

  checkHitsWater() {
    const {x, y, z} = this.pos;
    if (y > 100) {
      console.log("HIT");
      this.visible = false;
    }
  }

  drawStone() {
    const {p, pos, flying, color} = this;
    const {x, y, z} = pos;
    p.push();
    p.noStroke();
    p.rotateX(p.HALF_PI/4);
    if (flying) {
      p.rotateY(p.millis() / 1000);
    } else {
      // chase hand position
      //const hand_pos = p.
      p.translate(-300, 0, 0);
    }
    p.fill(color);
    p.sphere(40, 3, 16);
    p.pop();
  }

  render() {
    const {p, visible} = this;
    if (visible) {
      //this.drawStone();
    }
  }
}