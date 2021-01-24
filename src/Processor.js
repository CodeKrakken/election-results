function Processor() {
  this.partyInitials = {
    'C': 'Conservative Party',
    'L': 'Labour Party',
    'UKIP': 'UKIP',
    'LD': 'Liberal Democrats',
    'G': 'Green Party',
    'Ind': 'Independent',
    'SNP': 'SNP'
  }
}

Processor.prototype.process = function(result) {
  this.processedResult = result.split(',')
  this.constituency = this.processedResult.shift()
}

module.exports = Processor