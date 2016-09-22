
function stream(source) {
    if (typeof source !== 'string' || !source.length) {
        throw new Error('invaid type of source string')
    }

    var cursor = 0
    return {
        next: function () {
            return source[cursor++]
        },
        
        current: function () {
            return source[current]
        },

        end: function () {
            return cursor > source.length
        }
    }
}

function Lexer(source) {
    this.source = source
    this.stream = stream(this.source)
    this.currentChar = ''

    this.readNextChar()
}

Lexer.prototype = {
    constructor: Lexer,

    readNextChar: function() {
        this.currentChar = this.stream.next()
    },

    readDigit: function () {
        var value = ''
        while (/\d/.test(this.currentChar)) {
            value += this.readNextChar()
        }
        return value
    },

    readNextToken: function () {
        if (/\d/.test(this.currentChar)) {
            return this.readDigit()
        }
    },

}

Lexer.tokenize = function (source) {
    var lexer = new Lexer(source)
    var tokens = []
    do {
        tokens.push(lexer.readNextToken())
    } while (!lexer.stream.end())
}

const sourceString = `def test() { return 1 }` 

var lexer = new Lexer(sourceString).tokenize()