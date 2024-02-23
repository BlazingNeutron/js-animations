/**
 * @jest-environment jsdom
 */
const SimpleAnimator = require('../../src/js/simpleAnimator');
const DotDrawObject = require('../../src/js/simpleObject');

let simpleAnimator, canvas;

beforeEach(() => {
  document.body.innerHTML =
    '<div class="content"/>';
  simpleAnimator = new SimpleAnimator();
  simpleAnimator.createCanvas();
  canvas = document.querySelector("canvas");
});

var sleepSetTimeout_ctrl;

function sleep(ms) {
  clearInterval(sleepSetTimeout_ctrl);
  return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

test('contains a canvas', () => {
  expect(canvas).not.toBeNull();
});

test('empty canvas init', () => {
  expect(canvas).toMatchSnapshot();
});

test('first frame', async () => {
  let dot = new DotDrawObject(simpleAnimator.ctx.a);
  simpleAnimator.objects = dot;
  simpleAnimator.updateObjectAndSwapFrame();
  expect(dot.x).toBe(1);
  await sleep(200);
  expect(canvas.toDataURL()).toMatchSnapshot();
});

test('second frame', async () => {
  let dot = new DotDrawObject(simpleAnimator.ctx.a);
  simpleAnimator.objects = dot;
  simpleAnimator.updateObjectAndSwapFrame();
  simpleAnimator.updateObjectAndSwapFrame();
  expect(dot.x).toBe(2);

  await sleep(200);
  expect(canvas.toDataURL()).toMatchSnapshot();
});

test('start animation', async () => {
  let dot = new DotDrawObject(simpleAnimator.ctx.a);
  simpleAnimator.objects = dot;
  simpleAnimator.startAnimationLoop();
  
  await sleep(200);
  expect(dot.x > 3).toBe(true);
});

test('animate multiple objects', async () => {
  let dot1 = new DotDrawObject(simpleAnimator.ctx.a);
  let dot2 = new DotDrawObject(simpleAnimator.ctx.a);
  dot1.y = 20;
  dot2.y = 40;
  simpleAnimator.objects = [ dot1, dot2 ];
  simpleAnimator.updateObjectAndSwapFrame();

  await sleep(200);
  expect(canvas.toDataURL()).toMatchSnapshot();
});