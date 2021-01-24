const { ConsoleReporter } = require("jasmine")

function Processor() {
  this.partyInitials = {
    'C': 'Conservative Party',
    'L': 'Labour Party',
    'UKIP': 'UKIP',
    'LD': 'Liberal Democrats',
    'G': 'Green Party',
    'Ind': 'Independent',
    'SNP': 'SNP'
  },
  this.totalVotes = 0
}

Processor.prototype.process = function(result) {
  this.processedResult = result.split(', ')
  this.constituency = this.processedResult.shift()
  this.decodedResult = this.decode(this.processedResult)
  this.percentageResult = this.calculatePercentages(this.decodedResult)
}

Processor.prototype.decode = function(array) {
  decoder = this
  array.forEach(function(value, index) {
    if(Object.keys(decoder.partyInitials).includes(value)) {
      array[index] = decoder.partyInitials[value]
    } else {
      array[index] = Number(value)
      decoder.totalVotes += value
    }
  })
  return array
}

Processor.prototype.calculatePercentages = function(array) {
  decoder = this
  array.forEach(function(value, index) {
    if(typeof value === Number) {
      console.log('number')
      array[index] = value / decoder.totalVotes * 100
    }
  })
}

module.exports = Processor