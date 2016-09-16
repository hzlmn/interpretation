function SourceReader(source) {
    this.source = source
    this.cursor = 0
}

SourceReader.prototype = {
    read: function () {
        return this.source[this.cursor++]
    },

    end: function () {
        return this.cursor > this.source.length
    }
}

function Lexer(source) {
    this.source = source
    this.reader = new SourceReader(this.source)
    this.tokens = []
    this.currentChar = this.reader.read()
}

Lexer.prototype = {
    constructor: Lexer,

    readChar: function () {
        this.currentChar = this.reader.read()    
    },

    readDigit: function () {
        var value = ''

        while (/\d/.test(this.currentChar)) {
            value += this.currentChar
            this.readChar()
        }
        
        this.tokens.push(value)
    },

    readSymbol: function () {
        this.tokens.push(this.currentChar)
        this.readChar()
    },

    readWs: function () {
        this.readChar()
    },

    tokenize: function () {
        while (!this.reader.end()) {
            if (/\d/.test(this.currentChar)) {
                this.readDigit()
            } else if (/\s/.test(this.currentChar)) {
                this.readWs()
            } else {
                this.readSymbol()
            }
        }

        return this.tokens
    }
    
}

var tokens = new Lexer('(2 + 2) / (3 +   2)').tokenize()

console.log(tokens)