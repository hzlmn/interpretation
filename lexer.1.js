function Lexer(source) {
    this.source = source
    this.tokens = []
    this.cursor = 0
    this.currentChar = ''

    this.readNextChar()
}

Lexer.prototype = {
    constructor: Lexer,

    readNextChar: function () {
        this.currentChar = this.source[this.cursor++] || ''
    },

    readDigit: function () {
        var value = ''

        while (/\d/.test(this.currentChar)) {
            value += this.currentChar
            this.readNextChar()
        }
        
        this.tokens.push(value)
    },

    readSymbol: function () {
        this.tokens.push(this.currentChar)
        this.readNextChar()
    },

    readWs: function () {
        this.readNextChar()
    },

    tokenize: function () {
        while (this.currentChar) {
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