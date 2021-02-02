const { ConsoleReporter } = require("jasmine")
const fs = require('fs')

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
  if(this.result.length % 2 === 0) { return this.error("Incomplete result") }
  if(!isNaN(this.result[0])) { return this.error(`Invalid constituency - ${this.result[0]}` )}
  for(i=1;i<this.result.length-2;i+=2) {
    if(!Object.keys(this.partyInitials).includes(this.result[i+1])) { return this.error(`Invalid party - ${this.result[i+1]}`) }
    resultInteger = parseFloat(this.result[i])
    if(!Number.isInteger(resultInteger) || resultInteger < 0) { return this.error(`Invalid count - ${this.result[i]}` )}
  }
  return this.complete()
}

Processor.prototype.log = function(message) {
  fs.appendFile('log.txt', message + '\n\n\n', function(err) {
    if (err) return console.log(err);
  })
  return message
}

Processor.prototype.error = function(message) {
  fs.appendFile('errors.txt', `${this.result.join(', ')} - ${message}\n\n`, function (err) {
    if (err) return console.log(err);
  });
  return message
}

Processor.prototype.complete = function() {
  this.constituency = this.result.shift()
  this.decode(this.result)
  this.calculatePercentages(this.result)
  return this.log(this.presentResult())
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
      rawPercentage = Number(value / decoder.totalVotes * 100)
      array[index] = Math.round(rawPercentage) + '%'
    }
  })
  return array
}

Processor.prototype.presentResult = function() {
  return `${this.constituency}\n\n${this.result[1]} - ${
    this.result[0]}\n${this.result[3]} - ${
    this.result[2]}\n${this.result[5]} - ${
    this.result[4]}\n${this.result[7]} - ${
    this.result[6]}`
}

module.exports = Processor