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
  return this.inspect()
}

Processor.prototype.inspect = function() {
  if(this.result.length % 2 === 0) { return "Incomplete result." }
  if(!isNaN(this.result[0])) { return "Invalid constituency." }
  for(i=1;i<this.result.length-2;i+=2) {
    if(isNaN(this.result[i])) { return "Invalid count." }
    if(!Object.keys(this.partyInitials).includes(this.result[i+1])) { return "Invalid party." } 
  }
  return this.complete()
}

Processor.prototype.complete = function() {
  this.constituency = this.result.shift()
  this.decode(this.result)
  this.result = this.calculatePercentages(this.result)
  return this.presentResult()
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
  return `${this.constituency}\n\n${this.result[1]} - ${
    Math.round(this.result[0])}%\n${this.result[3]} - ${
    Math.round(this.result[2])}%\n${this.result[5]} - ${
    Math.round(this.result[4])}%\n${this.result[7]} - ${
    Math.round(this.result[6])}%`
}

module.exports = Processor