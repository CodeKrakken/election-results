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
  if(this.check(this.processedResult) === false) { return "Invalid result." }
  this.constituency = this.processedResult.shift()
  this.decodedResult = this.decode(this.processedResult)
  this.percentageResult = this.calculatePercentages(this.decodedResult)
  return this.presentResult()
}

Processor.prototype.check = function(result) {
  for(i=0;i<result.length-2;i+=2) {
    console.log(isNaN(result[i]) && !isNaN(result[i+1]))
    return isNaN(result[i]) && !isNaN(result[i+1])
  }
}

Processor.prototype.decode = function(array) {
  decoder = this
  array.forEach(function(value, index) {
    if(Object.keys(decoder.partyInitials).includes(value)) {
      array[index] = decoder.partyInitials[value]
    } else {
      array[index] = Number(value)
      decoder.totalVotes += Number(value)
    }
  })
  return array
}

Processor.prototype.calculatePercentages = function(array) {
  decoder = this
  array.forEach(function(value, index) {
    if(Number.isInteger(value)) {
      array[index] = Number(value / decoder.totalVotes * 100)
    }
  })
  return array
}

Processor.prototype.presentResult = function() {
  return `${this.constituency}\n\n${this.percentageResult[1]} - ${
    Math.round(this.percentageResult[0])}%\n${this.percentageResult[3]} - ${
    Math.round(this.percentageResult[2])}%\n${this.percentageResult[5]} - ${
    Math.round(this.percentageResult[4])}%\n${this.percentageResult[7]} - ${
    Math.round(this.percentageResult[6])}%`
}

module.exports = Processor