'use strict'

const fs = require('fs')
const Countries = require('./countries.json')

let flags = {}
for(let tag in Countries) {
    flags[Countries[tag]] =
        "https://github.com/hjnilsson/country-flags/raw/master/png250px/"
        + tag.toLowerCase() + '.png'
}

fs.writeFile('flags.json', JSON.stringify(flags, null, 4))
