describe('createElement should work ', () => {
  it('should addEventListener work', () => {
    const el = document.createElement('div');
    el.setAttribute('data-test', 'test');

    expect(el).toBeInstanceOf(HTMLDivElement);
    expect(el.getAttribute('data-test')).toBe('test');
  });
});