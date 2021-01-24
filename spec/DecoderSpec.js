'use strict';

describe('decoder', function() {
  const Decoder = require('../src/Decoder.js')
  let decoder

  beforeEach(function() {
    decoder = new Decoder()
  })

  it('has a list of party codes', function() {
    expect(decoder.initials).toBeDefined()
  })

  it('has seven code/name pairs in the party code hash', function() {
    expect(Object.keys(decoder.initials).length).toEqual(7)
  })

  it('responds to extract', function() {
    expect(decoder.extractConstituency).toBeDefined()
  })

  it('can extract a constituency name from a result string', function() {
    expect(decoder.extractConstituency('Cardiff West, 11014, C, 17803, L, 4923, UKIP, 2069, LD')).toEqual('Cardiff West')
  })

})