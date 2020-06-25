class Arm {
  constructor(p) {
    this.p = p;
    this.grap = false;
    this.pos = {
      x: 0,
      y: 0,
      z: 0
    }
    this.scale = 10;
    this.colors = {
      skin: p.color(255, 206, 186)
    }

    this.stone_flying = false;
    this.stone_pos = {
      x: 0,
      y: -200,
      z: 0
    }

    this.startY = 0;
    this.endY = 0;
    this.ypos = 0;
  }

  handleGrap() {
    const {p} = this;
    // ToDo. add finger control...
    if (!this.grap && p.mouseIsPressed) {
      this.stone_pos.y += 10;
      if (this.stone_pos.y >= 0) {
        this.stone_pos.y = 0;
        this.grap = true;
      }
    }
  }

  handleStoneFlying() {
    const {p, stone_pos, stone_flying, ypos} = this;
    const {x, y, z} = stone_pos;
    if (stone_flying) {
      if (y < -370) {
        this.stone_flying = false;
        if (ypos < 880 && ypos > 470) {
          p.wave[0].setPos(z, y, x - 500);
          p.wave[0].setActiveTime();
          p.sounds.pong.play();
        }
      }
      p.arm.setStonePos(x + 15, y - 5, z);
    }
  }

  setStonePos(x, y, z) {
    this.stone_pos.x = x;
    this.stone_pos.y = y;
    this.stone_pos.z = z;
  }

  drawArm() {
    const {p, scale, stone_pos, stone_flying, ypos} = this;
    const {arm} = p.models;
    if (!stone_flying) {
      this.ypos = p.mouseY < 300 ? 300 :
        p.mouseY > p.height - 200 ? p.height - 200 :
          p.mouseY;
    }
    p.push();
    p.scale(scale);
    p.noStroke();
    p.fill(255, 206, 186);
    p.specularMaterial(this.colors.skin);
    p.shininess(60);
    p.translate(30, 50, 0);
    p.rotateX(p.PI);
    p.rotateY(p.PI - 1.3);
    p.rotateY(p.map(ypos, 300, p.height - 200, 0, 0.5));  // -6.48 to -4.77
    p.rotateZ(-p.HALF_PI / 5);
    //p.rotateX(p.mouseX/100);

    /* sangbak */
    p.push();
    p.model(arm.high);
    p.pop();

    /* habak */
    p.push();
    p.rotateY(p.HALF_PI * 1.2);
    p.translate(12, 5, 3);
    p.translate(0, 0, -34);

    p.rotateY(p.map(ypos, 300, p.height - 200, -4.77, -6.48));  // -6.48 to -4.77
    p.translate(0, 0, 34);
    p.model(arm.low);

    // find hand position and draw stone
    p.push();
    p.translate(20 + stone_pos.x, 32 + stone_pos.y, 40 + stone_pos.z);
    //console.log(stone_pos);
    p.rotateX(p.HALF_PI);
    if (stone_flying) {
      //p.rotateY(p.millis() / 1000);
    }
    p.fill(80, 80, 80);
    p.sphere(6, 3, 16);
    p.pop();

    p.pop();

    p.pop();
  }

  render() {
    const {p} = this;
    p.push();
    this.handleGrap();
    this.handleStoneFlying();
    this.drawArm();
    p.pop();
  }
}