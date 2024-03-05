import _axios from 'axios';
import {Mock} from 'vitest'

vi.mock('axios')

beforeAll(() => {
  
  // @ts-ignore
  _axios.create.mockReturnValue(_axios)
})

test('mock axios', async () => {
  const axios = _axios as unknown as Mock & typeof _axios
  assert.ok(vi.isMockFunction(axios))
  assert.ok(vi.isMockFunction(axios.get))
  assert.ok(vi.isMockFunction(axios.post))
  assert.ok(vi.isMockFunction(axios.delete))
  assert.ok(vi.isMockFunction(axios.request))
  assert.ok(vi.isMockFunction(axios.create))
  assert.ok(vi.isMockFunction(axios.patch))
  assert.ok(vi.isMockFunction(axios.put))
  assert.ok(vi.isMockFunction(axios.patch))

  const myaxios = axios.create()

  assert.ok(vi.isMockFunction(myaxios))

  assert.ok(vi.isMockFunction(myaxios.get))

  axios.mockResolvedValueOnce({ data: 'testData' });
  await expect(axios('/url')).resolves.toMatchInlineSnapshot(`
    {
      "data": "testData",
    }
  `)

  axios.defaults.headers.common['Content-Type'] = 'xxx'

  assert.ok(axios.defaults.headers.common['Content-Type'] === 'xxx');

  
})