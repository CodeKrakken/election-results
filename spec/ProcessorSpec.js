'use strict';
const fs = require('fs')

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

  it('presents the results attractively', function() {
    expect(processor.process('Cardiff West, 11014, C, 17803, L, 4923, UKIP, 2069, LD')).toEqual('Cardiff West\n\nConservative Party - 31%\nLabour Party - 50%\nUKIP - 14%\nLiberal Democrats - 6%')
  })

  it('can identify a number in place of a constituency name', function() {
    expect(processor.process('69, 11014, C, 17803, L, 4923, UKIP, 2069, LD')).toEqual('Invalid constituency - 69')
  })

  it('can identify an invalid party abbreviation', function() {
    expect(processor.process('Cardiff West, 11014, MRLP, 17803, L, 4923, UKIP, 2069, LD')).toEqual('Invalid party - MRLP')
  })

  it('can identify a word in place of a vote count', function() {
    expect(processor.process('Cardiff West, 11014, C, 17803, L, racism, UKIP, 2069, LD')).toEqual('Invalid count - racism')
  })

  it('can identify a negative number word count', function() {
    expect(processor.process('Cardiff West, -11014, C, 17803, L, 4923, UKIP, 2069, LD')).toEqual('Invalid count - -11014')
  })

  it('can log an invalid count in an error log file', function() {
    processor.process('Cardiff West, 11014, C, 17803, L, racism, UKIP, 2069, LD')
    const log = fs.readFileSync('errors.txt', 'utf8')
    expect(log).toContain('Cardiff West, 11014, C, 17803, L, racism, UKIP, 2069, LD - Invalid count - racism')
  })

  it('can identify a missing result', function() {
    expect(processor.process('Cardiff West, 11014, C, 17803, L, 4923, UKIP, 2069')).toEqual('Incomplete result')
  })

  it('logs a missing result in an error log', function() {
    processor.process('Cardiff West, 11014, C, 17803, L, 4923, UKIP, 2069')
    const log = fs.readFileSync('errors.txt', 'utf8')
    expect(log).toContain('Cardiff West, 11014, C, 17803, L, 4923, UKIP, 2069 - Incomplete result')
  })

  it('logs an incorrect constituency in a log file', function() {
    processor.process('69, 11014, C, 17803, L, 4923, UKIP, 2069, LD')
    const log = fs.readFileSync('errors.txt', 'utf8')
    expect(log).toContain('69, 11014, C, 17803, L, 4923, UKIP, 2069, LD - Invalid constituency - 69')
  })

  it('logs an invalid party in a log file', function() {
    processor.process('Cardiff West, 11014, 69, 17803, L, 4923, UKIP, 2069, LD')
    const log = fs.readFileSync('errors.txt', 'utf8')
    expect(log).toContain('Cardiff West, 11014, MRLP, 17803, L, 4923, UKIP, 2069, LD - Invalid party - MRLP')
  })

  describe('after decoding', function() {
    beforeEach(function() {
      processor.process('Cardiff West, 11014, C, 17803, L, 4923, UKIP, 2069, LD')
    })

    it('can split a result string', function() {
      expect(processor.result).toBeDefined()
    })
  
    it('can extract a constituency name from a result string', function() {
      expect(processor.constituency).toEqual('Cardiff West')
    })
  
    it('can substitute initials for full party names', function() {
      expect(processor.result[1]).toEqual('Conservative Party')
    })

    it('calculates the total votes cast', function() {
      expect(processor.totalVotes).toEqual(35809)
    })

    it("calculates the percentage of each party's total cast votes", function() {
      expect(processor.result[0]).toEqual('31%')
    })

  })
})