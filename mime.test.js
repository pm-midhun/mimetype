const mimetype = require('./index');

describe('File format testing', () => {
  test('Check JSON file => application/json', async () => {
    await expect(mimetype
        .getMimetype('./package.json'))
        .resolves.toBe('application/json');
  });

  test('Check JS file => application/javascript', async () => {
    await expect(mimetype.getMimetype('./index.js'))
        .resolves
        .toBe('application/javascript');
  });
});
