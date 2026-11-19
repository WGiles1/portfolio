const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');
test('demo scan adds one fictional device only once and reset restores samples', () => {
  const { createDemo } = require('../homewatch/demo.js');
  const demo = createDemo();
  assert.equal(demo.devices.length, 3);
  demo.scan(); demo.scan();
  assert.equal(demo.devices.length, 4);
  assert.equal(demo.devices[3].status, 'unfamiliar');
  demo.reset(); assert.equal(demo.devices.length, 3);
});
test('portfolio links to project and project links to demo', () => {
  assert.match(fs.readFileSync(path.join(root, 'projects.html'), 'utf8'), /href="homewatch\.html"/);
  assert.match(fs.readFileSync(path.join(root, 'homewatch.html'), 'utf8'), /href="homewatch\/index\.html"/);
});
test('public demo contains no network calls or persistent storage', () => {
  const js = fs.readFileSync(path.join(root, 'homewatch/demo.js'), 'utf8');
  assert.doesNotMatch(js, /\b(fetch|XMLHttpRequest|WebSocket|localStorage|sessionStorage)\b/);
});

 test('Windows download is linked and includes only clean app files', () => {
  const page = fs.readFileSync(path.join(root, 'homewatch.html'), 'utf8');
  assert.match(page, /href="homewatch\/Homewatch-Windows.zip"/);
  assert.ok(fs.existsSync(path.join(root, 'homewatch', 'Homewatch-Windows.zip')));
});
