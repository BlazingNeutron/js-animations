/**
 * @jest-environment jsdom
 */
const setup = require('../../src/js/simple');

document.body.innerHTML =
    '<div class="content"/>';

test('contains a canvas', () => {
  setup();
  let canvas = document.querySelector("canvas");
  expect(canvas).not.toBeNull();
});

test('renders empty canvas correctly', () => {
  setup();
  let canvas = document.querySelector("canvas");
  expect(canvas).toMatchSnapshot();
});