var faker = require('faker')
var fs = require('fs')
var includes = require('lodash.includes')

var num = process.argv[2]
const attributes = process.argv[3]
const attributesSplit = attributes.split(',')

var attrs = []
var values = []
const entries = []

fs.writeFile('db.txt', '\n')

getArrays()

while (num > 0) {
  var fake = []

  parseValues(values, fake)

  var entry = 'INSERT INTO models ( ' + attrs + ' )\nVALUES ( ' + fake + ' );\n'
  entries.push(entry)

  num -= 1
}

writeEntries()

function getArrays () {
  for (var i = 0; i < attributesSplit.length; i++) {
    const a = attributesSplit[i].split(':')[0]
    const v = attributesSplit[i].split(':')[1]
    if (!includes(attrs, a) || (!includes(values, v))) {
      attrs.push(a) && values.push(v)
    }
  }
}

function parseValues (data, array) {
  for (var i = 0; i < data.length; i++) {
    if (data[i] === 'number') {
      array.push(faker.fake('{{random.number}}'))
    }

    if (data[i] === 'string') {
      array.push("'" + faker.fake('{{random.word}}') + "'")
    }
  }
}

function writeEntries () {
  for (var i = 0; i < entries.length; i++) {
    fs.appendFile('db.txt', entries[i])
  }
}
