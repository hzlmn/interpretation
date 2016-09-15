/**
 * @class Parser
 * @param {String} program
 *
 * Parser expect raw source string
 * and produce correct AST structure for it
 */
function Parser(program) {

    /**
     * @property tokens
     *
     * Just for now `tokens` simply splitted by ws
     * both we are not interested in ws
     * in more complex examples
     * Tokenizer implemented as a separate class
     * that analyse source char by char
     *
     */
    this.tokens = program.split(/\s/)

    /**
     * @property cursor
     *
     * Initial position in tokens
     */
    this.cursor = 0

    /**
     * @property ast
     *
     * Initial structure of our AST
     */
    this.ast = []
}

/**
 * @method parse
 *
 * `parse` base method of `Parser`,
 *  process each token and generate proper AST nodes
 */
Parser.prototype.parse = function () {

    // while we are not reached end of token
    // process each one
    while (this.cursor < this.tokens.length) {
        var char = this.tokens[this.cursor++]

        // if char is a digit
        if (/\d/.test(char)) {
            // get next value
            var nextChar = this.tokens[this.cursor++]

            // if next value is operation
            // add proper ast node
            // example ['+', value, nextValue]
            if (/[+-\/*]/.test(nextChar)) {
                this.ast.push([
                    nextChar,
                    char,
                    this.tokens[this.cursor]
                ])
            }
        }
    }

    return this.ast
}

// HELPERS

/**
 * isAddition
 * @param {Program} exp
 *
 * Check if expression is addition of numbers
 */
function isAddition(exp) {
    return tagExpression('+', exp)
}

// check if expression is a simple number
function isNumber(exp) {
    return !isNaN(+exp)
}

/**
 * isDivide
 * @param {Program} exp
 *
 * Check if expression is dividing numbers
 */
function isDivide(exp) {
    return tagExpression('-', exp)
}

/**
 * isMultiply
 * @param {Program} exp
 *
 * Check if expression is multiplication operation
 */
function isMultiply(exp) {
    return tagExpression('*', exp)
}

/**
 * isDivision
 * @param {Program} exp
 *
 * Check if expression is division of numbers
 */
function isDivision(exp) {
    return tagExpression('/', exp)
}


/**
 * tagExpression
 * @param {String} tag
 * @param {Program} exp expression
 *
 * Accept tag and expression as params
 * and check if expression has correct tag on left hand
 */
function tagExpression(tag, exp) {
    return Array.isArray(exp) && exp[0] === tag
}


/**
 * @class Evaluator
 * @param {AbstractSyntaxTree} ast
 *
 * Evaluate program statement by statement
 */
function Evaluator(ast) {
    /**
     * @property ast
     *
     * AST structure of our program,
     * each element is separate statement
     */
    this.ast = ast
}

Evaluator.prototype = {

    /**
		 * @method evalNumber
     * @param  {Program} exp
		 *
		 * Evaluate simple number
     */
    evalNumber: function (exp) {
        return +exp
    },

    /**
		 * @method evalAddition
     * @param  {Program} exp
		 *
		 * Evaluate addition operation
     */
    evalAddition: function (exp) {
        return this.evaluate(exp[1]) + this.evaluate(exp[2])
    },

		/**
		 * @method evalDivide
     * @param  {Program} exp
		 *
		 * Evaluate dividing operation
     */
    evalDivide: function (exp) {
        return this.evaluate(exp[1]) - this.evaluate(exp[2])
    },

		/**
		 * @method evalMultiply
     * @param  {Program} exp
		 *
		 * Evaluate multiplication operation
     */
    evalMultiply: function (exp) {
        return this.evaluate(exp[1]) * this.evaluate(exp[2])
    },

		/**
		 * @method evalMultiply
     * @param  {Program} exp
		 *
		 * Evaluate multiplication operation
     */
    evalDivision: function (exp) {
        return this.evaluate(exp[1]) / this.evaluate(exp[2])
    },

		// base method for evaluating
    evaluate: function (exp) {
        var expressionType = this.getType(exp)
        return this['eval' + expressionType](exp)
    },

		// get type of expression
    getType: function (exp) {
        if (isNumber(exp)) {
            return 'Number'
        }

        if (isAddition(exp)) {
            return 'Addition'
        }

        if (isDivide(exp)) {
            return 'Divide'
        }

        if (isMultiply(exp)) {
            return 'Multiply'
        }

				if (isDivision(exp)) {
						return 'Division'
				}
    },

    eval: function () {
        var results = this.ast.map(this.evaluate.bind(this))
        return results
    }

}


var ast = new Parser('2 / 4').parse()
var ev = new Evaluator(ast)
console.log(ev.eval())
