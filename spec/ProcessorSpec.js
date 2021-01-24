'use strict';

describe('processor', function() {
  const Processor = require('../src/Processor.js')
  let processor

  beforeEach(function() {
    processor = new Processor()
  })

  it('has a list of party codes', function() {
    expect(processor.partyInitials).toBeDefined()
  })

  it('has seven code/name pairs in the party code hash', function() {
    expect(Object.keys(processor.partyInitials).length).toEqual(7)
  })

  it('responds to decode', function() {
    expect(processor.process).toBeDefined()
  })

  describe('after decoding', function() {
    beforeEach(function() {
      processor.process('Cardiff West, 11014, C, 17803, L, 4923, UKIP, 2069, LD')
    })

    it('can split a result string', function() {
      expect(processor.processedResult).toBeDefined()
    })
  
    it('can extract a constituency name from a result string', function() {
      expect(processor.constituency).toEqual('Cardiff West')
    })
  
    it('can extract a set of party/count pairs from a result string', function() {
      expect(processor.results).toBeInstanceOf(Object)
    })
  })
})