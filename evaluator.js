/**
 * evalNumber
 * @param {Program} exp
 * 
 * Evaluate simple number
 */
function evalNumber(value) {
    return +value
}

/**
 * evalAddition
 * @param {Program} exp
 * 
 * Evaluate addition expression
 */
function evalAddition(exp) {
    return evaluate(exp[1]) + evaluate(exp[2])
}

/**
 * evalDivide
 * @param {Program} exp
 * 
 * Evaluate dividing expression
 */
function evalDivide(exp) {
    return evaluate(exp[1]) + evaluate(exp[2])
}

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
 * evaluate
 * @param {Program} exp
 * 
 * Expect expression of program as a param
 * and evaluate it in correct context
 * 
 * Program should be represented as a list
 * of tokens like ['+', '1', '2']
 */
function evaluate(exp) {
    if (isNumber(exp)) {
        return evalNumber(exp)
    }

    if (isAddition(exp)) {
        return evalAddition(exp)
    }

    if (isDivide(exp)) {
        return evalDivide(exp)
    }
}

var program = ['+', '1', '2']
console.log(evaluate(program))