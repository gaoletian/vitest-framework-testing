describe('window.history', () => {

  it('all method of history should work', () => {
    // initialize 
    expect(history).toBeDefined();

    // one
    history.replaceState({idx: 0}, null, '/mainapp/#/one');
    expect(location.href).toMatchInlineSnapshot('"https://example.com/mainapp/#/one"');
    expect(location.hash).toMatchInlineSnapshot('"#/one"');
    expect(history.length).toMatchInlineSnapshot('1');

    // two
    history.pushState({idx: 1}, null, '/mainapp/#/two');
    expect(location.href).toMatchInlineSnapshot('"https://example.com/mainapp/#/two"');
    expect(location.hash).toMatchInlineSnapshot('"#/two"');
    expect(history.length).toMatchInlineSnapshot('2');

    // three
    history.pushState({idx: 2}, null, '/mainapp/#/three');
    expect(location.href).toMatchInlineSnapshot('"https://example.com/mainapp/#/three"');
    expect(location.hash).toMatchInlineSnapshot('"#/three"');
    expect(history.length).toMatchInlineSnapshot('3')

    // back  not working
    history.back();
    expect(history.length).toMatchInlineSnapshot('3')
    expect(location.hash).toMatchInlineSnapshot('"#/two"');
    expect(location.href).toMatchInlineSnapshot('"https://example.com/mainapp/#/two"')

    history.go(-1);
    expect(history.length).toMatchInlineSnapshot('3')
    expect(location.hash).toMatchInlineSnapshot('"#/one"');
    expect(location.href).toMatchInlineSnapshot('"https://example.com/mainapp/#/one"')



    // forward not working
    history.forward();
    expect(location.href).toMatchInlineSnapshot('"https://example.com/mainapp/#/two"')
    expect(location.hash).toMatchInlineSnapshot('"#/two"');
    expect(history.length).toMatchInlineSnapshot('3')


    history.replaceState(null, null, '/mainapp/#/two?foo=bar');
    expect(location.href).toMatchInlineSnapshot('"https://example.com/mainapp/#/two?foo=bar"')
    expect(history.length).toMatchInlineSnapshot('3')


    // go
    history.go(-1);
    expect(history.length).toMatchInlineSnapshot('3')
    expect(location.hash).toMatchInlineSnapshot('"#/one"');
    expect(location.href).toMatchInlineSnapshot('"https://example.com/mainapp/#/one"')
    expect(history.state).toMatchInlineSnapshot(`
      {
        "idx": 0,
      }
    `);
  })
})