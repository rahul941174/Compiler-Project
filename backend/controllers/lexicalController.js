const KEYWORDS = ['int', 'float', 'return', 'if', 'else', 'while', 'for', 'char', 'double', 'void'];
const OPERATORS = ['+', '-', '*', '/', '=', '==', '!=', '<', '>', '<=', '>='];
const SEPARATORS = ['(', ')', '{', '}', ';', ',', '[', ']'];

function isIdentifier(token) {
  return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token) && !KEYWORDS.includes(token);
}

function isNumber(token) {
  return /^[0-9]+(\.[0-9]+)?$/.test(token);
}

function tokenize(code) {
  const tokens = [];
  const splitTokens = code.split(/(\s+|[\+\-\*\/\=\!\<\>\(\)\{\}\[\];,])/).filter(Boolean);

  splitTokens.forEach(token => {
    const trimmed = token.trim();
    if (!trimmed) return;

    if (KEYWORDS.includes(trimmed)) {
      tokens.push({ type: 'KEYWORD', value: trimmed });
    } else if (OPERATORS.includes(trimmed)) {
      tokens.push({ type: 'OPERATOR', value: trimmed });
    } else if (SEPARATORS.includes(trimmed)) {
      tokens.push({ type: 'SEPARATOR', value: trimmed });
    } else if (isNumber(trimmed)) {
      tokens.push({ type: 'NUMBER', value: trimmed });
    } else if (isIdentifier(trimmed)) {
      tokens.push({ type: 'IDENTIFIER', value: trimmed });
    } else {
      tokens.push({ type: 'UNKNOWN', value: trimmed });
    }
  });

  return tokens;
}

module.exports = { tokenize };
