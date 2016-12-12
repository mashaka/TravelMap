'use strict'

const fs = require('fs')
const Countries = require('./countries.json')

let flags = {}
let tags = {}
for(let tag in Countries) {
    flags[Countries[tag]] = "https://github.com/hjnilsson/country-flags/raw/master/png250px/"
        + tag.toLowerCase() + '.png'
    tags[Countries[tag]] = tag
}

fs.writeFile('flags.json', JSON.stringify(flags, null, 4))
fs.writeFile('tags.json', JSON.stringify(tags, null, 4))