/*
2020-1 Computer Grapics :: FINAL PROJECT - INTERACTIVE 3D GAME "Pongdang Pongdang"
20141150 Minwoo Choo

< MANUAL >
MOUSE Drag and Drop: throw a stone

P Key: screen shot
*/

const sketch1 = p => {
  p.X = 160;  // 0;
  p.Y = -200;  // 0;
  p.Z = 1700;
  p.centerX = 0;
  p.centerY = -100;
  p.centerZ = -2000;
  p.sounds = {
    bgm: undefined,
    wind: undefined,
    pong: undefined
  }
  p.models = {
    arm: {
      // ToDo. Add fingers and body? -> not enough time to implement it..... :(
      high: undefined,
      low: undefined
    }
  }
  p.MAX_WAVE = 3;

  p.preload = () => {
    // ToDo. Add sound effects (6/23 TUE)
    /*p.sounds.bgm = p.loadSound('assets/bgm.mp3');
    p.sounds.wind = p.loadSound('assets/wind.mp3');
    p.sounds.pong = p.loadSound('assets/pong.mp3');*/
    p.models.arm.high = p.loadModel('assets/arm_h.obj');
    p.models.arm.low = p.loadModel('assets/arm_l.obj');
    // ToDo. Add fingers and body? (6/23 TUE)
  }

  p.setup = () => {
    p.cnv = p.createCanvas(window.innerWidth, window.innerHeight, 'webgl');
    p.cnv.id('p5canvas');
    p.cnv.style('position', 'absolute');
    p.cnv.style('left', '0');
    p.cnv.style('top', '0');

    p.spotPos = new p5.Vector(-1000, -1000, 500);
    p.modelPos = new p5.Vector(-200, 0, 0);
    p.mrot = 0;
    p.srot = 0;

    p.arm = new Arm(p);
    p.wave = [];
    for (let i = 0; i < p.MAX_WAVE; i++) {
      p.wave.push(new Wave(p, i));
    }
  }

  p.draw = () => {
    p.clear();

    p.ambientLight(70);
    p.pointLight(100, 100, 100, p.sin(p.srot) * 4000, -1300, p.cos(p.srot) * 100 - 100);

    p.srot += 0.01;
    p.spotPos.x = 200 * p.cos(p.srot);
    p.spotPos.y = 200 * p.sin(p.srot) - 1000;
    p.spotDir = p5.Vector.sub(p.modelPos, p.spotPos);
    p.spotLight(0, 100, 100, p.spotPos, p.spotDir, p.radians(90), 1);

    p.camera(p.X, p.Y, p.Z, p.centerX, p.centerY, p.centerZ, 0, 1, 0);

    p.drawStone();
    p.drawArm();
    p.drawWave();
  }

  p.drawStone = () => {
    p.push();
    //
    p.pop();
  }

  p.drawArm = () => {
    p.push();
    p.arm.render();
    p.pop();
  }

  p.drawWave = () => {
    for (let i = 0; i < p.MAX_WAVE; i++) {
      p.wave[i].render();
    }
  }

  p.mouseClicked = () => {  // ToDo: execute when stone hits water
    p.wave[0].setActiveTime();
    // ToDo: init "power"
  }

  p.mousePressed = () => {
    // ToDo: increase "power"
  }

  p.mouseReleased = () => {
    // ToDo: throw a stone using "power"
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
}

const waterGL = p => {
  const lastTime = (new Date()).getTime() / 1000;

  p.setup = () => {
    p.cnv = p.createCanvas(window.innerWidth, window.innerHeight, 'webgl');
    p.cnv.id('waterGLcanvas');
    p.cnv.style('background', 'black');
    p.noStroke();
    p.simulatorCanvas = document.getElementById('waterGLcanvas')
    p.simulator = new Simulator(p.simulatorCanvas, window.innerWidth, window.innerHeight);
    p.simulator.setSize(215);
    p.simulator.setWind(-4.11, 2.83);
    p.simulator.setChoppiness(1.5);

    p.camera = new Camera(),
      p.projectionMatrix = makePerspectiveMatrix(new Float32Array(16), FOV, MIN_ASPECT, NEAR, FAR);
  }

  p.draw = () => {
    p.projectionMatrix = makePerspectiveMatrix(new Float32Array(16), FOV, MIN_ASPECT, NEAR, FAR);
    makePerspectiveMatrix(p.projectionMatrix, FOV, window.innerWidth / window.innerHeight, NEAR, FAR);
    p.deltaTime = ((new Date()).getTime() / 1000 - lastTime) / 1000 || 0.0;
    p.simulator.render(p.deltaTime, p.projectionMatrix, p.camera.getViewMatrix(), p.camera.getPosition());
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
}

function execsk1() {
  new p5(sketch1);
}

function execsk2() {
  new p5(waterGL);
}

setTimeout(execsk1, 100);
setTimeout(execsk2, 200);

function saveImage() {
  saveCanvas("image", "jpg");
}