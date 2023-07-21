const {sum, minus, multi, divide} = require('./math');


test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
test('adds 2 - 1 to equal 1', () => {
  expect(minus(2, 1)).toBe(1);
});
test('adds 2 / 1 to equal 2', () => {
  expect(divide(2, 1)).toBe(2);
});
test('adds 1 * 2 to equal 2', () => {
  expect(multi(1, 2)).toBe(2);
});