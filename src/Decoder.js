function Decoder() {
  this.initials = {
    'C': 'Conservative Party',
    'L': 'Labour Party',
    'UKIP': 'UKIP',
    'LD': 'Liberal Democrats',
    'G': 'Green Party',
    'Ind': 'Independent',
    'SNP': 'SNP'
  }
  this.splitResult
}

Decoder.prototype.extractConstituency = function(rawResult) {
  this.splitResult = rawResult.split(',')
  this.constituency = this.splitResult[0]
  return this.constituency
}

module.exports = Decoder