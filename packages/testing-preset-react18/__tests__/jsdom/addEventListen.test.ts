describe('test event mock ', () => {
  it('should addEventListener work', () => {
    const handlePageHide = vi.fn();
    window.addEventListener('pagehide', handlePageHide);

    window.dispatchEvent(new Event('pagehide'));
    window.dispatchEvent(new Event('pagehide'));

    expect(handlePageHide).toBeCalledTimes(2);
    expect(handlePageHide).toBeCalledWith(expect.any(Event));
  });
  
  it('should addEventListener work if option has once true', () => {
    const handlePageHide = vi.fn();
    window.addEventListener('pagehide', handlePageHide, {once: true});

    window.dispatchEvent(new Event('pagehide'));
    window.dispatchEvent(new Event('pagehide'));

    expect(handlePageHide).toBeCalledTimes(1);
    expect(handlePageHide).toBeCalledWith(expect.any(Event));
  });
});