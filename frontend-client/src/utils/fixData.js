// TODO: remove after database values are consistent.
export default (x) => {
    if($.isArray(x)) {
        return x.filter((code) => code.length === 2)
    } else if($.isPlainObject(x)) {
        let invalidKeys = []
        for(let key in x) {
            if(key.length !== 2 || x[key] === 0) {
                invalidKeys.push(key)
            }
        }
        for(let key of invalidKeys) {
            delete x[key]
        }
        return x
    } else {
        throw 'Argument is not either array nor plain object!'
    }
}