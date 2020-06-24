class Arm {
  constructor(p) {
    this.p = p;
    this.grap = false;
    this.pos = {
      x: 0,
      y: 0,
      z: 0
    }
    this.scale = 1;
    this.colors = {
      skin: p.color(255, 206, 186)
    }
  }

  handleGrap() {
    if (this.grap) {
      //
    }
  }

  drawArm() {
    const {p} = this;
    const {arm} = p.models;
    const ypos = p.mouseY < 300 ? 300 :
      p.mouseY > p.height - 200 ? p.height - 200 :
        p.mouseY;
    p.push();
    p.scale(10);
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

    p.translate(0, 0, 0);
    //p.rotateZ(p.HALF_PI/4);
    p.translate(0, 0, 0);
    p.rotateY(0);
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
    p.pop();

    p.pop();
  }

  render() {
    const {p} = this;
    p.push();
    this.drawArm();
    p.pop();
  }
}