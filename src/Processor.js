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
  this.result = result.split(', ')
  if(this.result.length % 2 === 0) { return "Incomplete result." }
  if(!isNaN(this.result[0])) { return "Invalid constituency." }
  if(this.check(this.result) === false) { return this.response }
  this.constituency = this.result.shift()
  this.decodedResult = this.decode(this.result)
  this.percentageResult = this.calculatePercentages(this.decodedResult)
  return this.presentResult()
}

Processor.prototype.check = function(result) {
  for(i=1;i<result.length-2;i+=2) {
    if(isNaN(result[i])) {
      this.response = "Invalid count."
      return false
    } else if(!Object.keys(this.partyInitials).includes(result[i+1])) {
      this.response = "Invalid party."
      return false
    } else {
      return true
    }
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