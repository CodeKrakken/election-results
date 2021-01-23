'use strict';

describe('result', function() {
  const Result = require('../src/Result.js')
  let result

  beforeEach(function() {
    result = new Result()
  })

  it('has a list of party codes', function() {
    expect(result.codes).toBeDefined()
  })

  it('has seven code/name pairs in the party code hash', function() {
    expect(Object.keys(result.codes).length).toEqual(7)
  })
})