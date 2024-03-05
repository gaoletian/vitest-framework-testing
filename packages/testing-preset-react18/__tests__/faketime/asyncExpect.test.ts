const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));

test('awit expect', async ( ) => {
  vi.useFakeTimers();
  vi.runAllTimers();
  vi.runAllTimersAsync();
  await delay(5000);
  expect(1).toBe(1);

  setTimeout(() => {
    expect(1).toBe(1);
  }, 5000)
  
})