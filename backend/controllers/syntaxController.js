function tokenize(code) {
  // Handle multi-character operators first, then single characters
  return code
    .replace(/(>=|<=|==|!=|\+\+|--|\+=|-=|\*=|\/=|&&|\|\|)/g, ' $1 ') // Multi-character operators
    .replace(/([{}();=+\-*/<>!])/g, ' $1 ') // Single-character operators
    .split(/\s+/)
    .filter(Boolean);
}

function isIdentifier(token) {
  return /^[a-zA-Z_]\w*$/.test(token);
}

function isNumber(token) {
  return /^\d+$/.test(token);
}

function isType(token) {
  return ['int', 'float', 'char', 'double'].includes(token);
}

function parseExpression(tokens, index) {
  let expectingOperand = true;
  let lastTokenWasOperator = false;

  while (index < tokens.length) {
    const token = tokens[index];

    if (expectingOperand) {
      if (isIdentifier(token) || isNumber(token)) {
        index++;
        expectingOperand = false;
        lastTokenWasOperator = false;
      } else if (token === '(') {
        // Handle parenthesized expressions
        index++;
        const exprResult = parseExpression(tokens, index);
        if (!exprResult.success) return exprResult;
        index = exprResult.index;
        if (tokens[index] !== ')') {
          return { success: false, error: `Expected ')' after expression` };
        }
        index++;
        expectingOperand = false;
        lastTokenWasOperator = false;
      } else {
        return { success: false, error: `Expected identifier, number, or '(' but got '${token}'` };
      }
    } else {
      if (['+', '-', '*', '/', '>', '<', '>=', '<=', '==', '!=', '&&', '||'].includes(token)) {
        index++;
        expectingOperand = true;
        lastTokenWasOperator = true;
      } else {
        break; // end of expression
      }
    }
  }

  if (expectingOperand && lastTokenWasOperator) {
    return { success: false, error: `Incomplete expression at '${tokens[index - 1]}'` };
  }

  return { success: true, index };
}

function parseDeclaration(tokens, index) {
  const start = index;
  if (!isType(tokens[index])) {
    return { success: false, error: `Expected type specifier at '${tokens[index]}'`, index: start };
  }
  index++;
  if (!isIdentifier(tokens[index])) {
    return { success: false, error: `Expected identifier after type`, index: start };
  }
  index++;
  
  // Handle optional initialization
  if (tokens[index] === '=') {
    index++;
    const exprResult = parseExpression(tokens, index);
    if (!exprResult.success) return { ...exprResult, index: start };
    index = exprResult.index;
  }
  
  if (tokens[index] !== ';') {
    return { success: false, error: `Expected ';' at end of declaration`, index: start };
  }
  return { success: true, index: index + 1 };
}

function parseAssignment(tokens, index) {
  const start = index;
  if (!isIdentifier(tokens[index])) {
    return { success: false, error: `Expected identifier at '${tokens[index]}'`, index: start };
  }
  index++;
  if (tokens[index] !== '=') {
    return { success: false, error: `Expected '=' after identifier`, index: start };
  }
  index++;
  const exprResult = parseExpression(tokens, index);
  if (!exprResult.success) return { ...exprResult, index: start };
  index = exprResult.index;
  if (tokens[index] !== ';') {
    return { success: false, error: `Expected ';' at end of assignment`, index: start };
  }
  return { success: true, index: index + 1 };
}

function parseReturn(tokens, index) {
  const start = index;
  if (tokens[index] !== 'return') return { success: false, error: `Expected 'return'`, index: start };
  index++;
  const exprResult = parseExpression(tokens, index);
  if (!exprResult.success) return { ...exprResult, index: start };
  index = exprResult.index;
  if (tokens[index] !== ';') {
    return { success: false, error: `Expected ';' after return`, index: start };
  }
  return { success: true, index: index + 1 };
}

function parseBlock(tokens, index) {
  const start = index;
  if (tokens[index] !== '{') return { success: false, error: `Expected '{' to start block`, index: start };
  index++;

  const results = [];
  while (index < tokens.length && tokens[index] !== '}') {
    const stmtResult = parseStatement(tokens, index);
    if (!stmtResult.success) return stmtResult;
    index = stmtResult.index;
    results.push(stmtResult);
  }

  if (tokens[index] !== '}') return { success: false, error: `Expected '}' to close block`, index: start };
  return { success: true, index: index + 1, statements: results };
}

function parseIf(tokens, index) {
  const start = index;
  if (tokens[index] !== 'if') return { success: false, error: `Expected 'if'`, index: start };
  index++;
  if (tokens[index] !== '(') return { success: false, error: `Expected '(' after if`, index: start };
  index++;
  const exprResult = parseExpression(tokens, index);
  if (!exprResult.success) return { ...exprResult, index: start };
  index = exprResult.index;
  if (tokens[index] !== ')') return { success: false, error: `Expected ')' after condition`, index: start };
  index++;
  
  const blockResult = parseBlock(tokens, index);
  if (!blockResult.success) return { ...blockResult, index: start };
  index = blockResult.index;

  // Handle optional else
  if (tokens[index] === 'else') {
    index++;
    const elseBlockResult = parseBlock(tokens, index);
    if (!elseBlockResult.success) return { ...elseBlockResult, index: start };
    index = elseBlockResult.index;
  }

  return { success: true, index };
}

function parseWhile(tokens, index) {
  const start = index;
  if (tokens[index] !== 'while') return { success: false, error: `Expected 'while'`, index: start };
  index++;
  if (tokens[index] !== '(') return { success: false, error: `Expected '(' after while`, index: start };
  index++;
  const exprResult = parseExpression(tokens, index);
  if (!exprResult.success) return { ...exprResult, index: start };
  index = exprResult.index;
  if (tokens[index] !== ')') return { success: false, error: `Expected ')' after condition`, index: start };
  index++;
  
  const blockResult = parseBlock(tokens, index);
  if (!blockResult.success) return { ...blockResult, index: start };
  
  return { success: true, index: blockResult.index };
}

function parseFor(tokens, index) {
  const start = index;
  if (tokens[index] !== 'for') return { success: false, error: `Expected 'for'`, index: start };
  index++;
  if (tokens[index] !== '(') return { success: false, error: `Expected '(' after for`, index: start };
  index++;

  // Initialization (can be declaration or expression)
  let initResult;
  if (isType(tokens[index])) {
    initResult = parseDeclaration(tokens, index);
  } else {
    initResult = parseExpression(tokens, index);
    if (initResult.success && tokens[initResult.index] === ';') {
      initResult.index++; // Skip semicolon
    }
  }
  if (!initResult.success) return { ...initResult, index: start };
  index = initResult.index;

  // Condition
  const condResult = parseExpression(tokens, index);
  if (!condResult.success) return { ...condResult, index: start };
  index = condResult.index;
  if (tokens[index] !== ';') return { success: false, error: `Expected ';' after for condition`, index: start };
  index++;

  // Update
  const updateResult = parseExpression(tokens, index);
  if (!updateResult.success) return { ...updateResult, index: start };
  index = updateResult.index;
  if (tokens[index] !== ')') return { success: false, error: `Expected ')' after for update`, index: start };
  index++;

  // Body
  const blockResult = parseBlock(tokens, index);
  if (!blockResult.success) return { ...blockResult, index: start };
  
  return { success: true, index: blockResult.index };
}

function parseStatement(tokens, index) {
  if (isType(tokens[index])) return parseDeclaration(tokens, index);
  if (tokens[index] === 'if') return parseIf(tokens, index);
  if (tokens[index] === 'while') return parseWhile(tokens, index);
  if (tokens[index] === 'for') return parseFor(tokens, index);
  if (tokens[index] === 'return') return parseReturn(tokens, index);
  if (tokens[index] === '{') return parseBlock(tokens, index);
  return parseAssignment(tokens, index);
}

function parse(code) {
  const tokens = tokenize(code);
  const results = [];
  let index = 0;

  while (index < tokens.length) {
    const start = index;
    const stmtResult = parseStatement(tokens, index);
    const statementTokens = tokens.slice(start, stmtResult.index || tokens.length).join(' ');

    results.push({
      code: statementTokens,
      status: stmtResult.success ? '✅ Valid' : '❌ Syntax Error',
      error: stmtResult.error || '-',
    });

    if (!stmtResult.success) break;
    index = stmtResult.index;
  }

  return results;
}

exports.performSyntaxAnalysis = (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ message: 'No code provided' });

  const report = parse(code);
  res.json({ report });
};