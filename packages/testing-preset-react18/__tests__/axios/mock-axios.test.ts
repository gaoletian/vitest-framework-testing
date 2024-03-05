import _axios from 'axios';
import { Mock } from 'vitest';

vi.mock('axios');

beforeAll(() => {
  // @ts-ignore
  _axios.create.mockReturnValue(_axios);
});

test('mock axios', async () => {
  const axios = _axios as unknown as Mock & typeof _axios;
  ['get', 'post', 'delete', 'put', 'patch', 'request', 'create'].forEach(
    (method) => {
      assert.ok(vi.isMockFunction(axios[method]));
    },
  );
  const myaxios = axios.create();

  assert.ok(vi.isMockFunction(myaxios));

  axios.mockResolvedValueOnce({ data: 'testData' });
  await expect(axios('/url')).resolves.toMatchInlineSnapshot(`
    {
      "data": "testData",
    }
  `);

  axios.defaults.headers.common['Content-Type'] = 'xxx';

  assert.ok(axios.defaults.headers.common['Content-Type'] === 'xxx');
});
