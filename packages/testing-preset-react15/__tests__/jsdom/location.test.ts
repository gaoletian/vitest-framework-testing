describe('window.location', () => {

  it('all method of location should work', () => {
    expect(location).toBeDefined();
    
    ['replace', 'href', 'reload', 'assign', 'host', 'protocol'].forEach(props => {
      expect(location[props]).toBeDefined();
    })

    expect(location.href).toMatchInlineSnapshot('"https://example.com/"');

    location.href = 'http://exmaple.com/one/';
    expect(location.href).toMatchInlineSnapshot('"http://exmaple.com/one/"')

    location.replace('http://exmaple.com/#/two');
    expect(location.href).toMatchInlineSnapshot('"http://exmaple.com/#/two"')

    location.assign('http://exmaple.com/#/three?appName=cc');
    expect(location.href).toMatchInlineSnapshot('"http://exmaple.com/#/three?appName=cc"')

  })
})