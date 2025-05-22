// controllers/intermediateController.js

// A simple helper function to generate unique temp variable names
function createTempVarGenerator() {
  let count = 0;
  return () => `t${++count}`;
}

// Helper function to tokenize expressions simply by operators
function tokenizeExpression(expr) {
  // Split expression by operators but keep them as tokens
  // Operators supported: + - * / ( )
  const regex = /(\+|\-|\*|\/|\(|\))/g;
  let tokens = expr.split(regex).map(t => t.trim()).filter(t => t.length > 0);
  return tokens;
}

// Recursive function to generate intermediate code for an expression
// using a simple operator precedence (only * / higher than + -)
function generateExprIntermediate(tokens, tempVarGen, intermediate) {
  // Shunting-yard algorithm or simple precedence parser can be complex.
  // We'll do this in two passes for demonstration: first * and /, then + and -

  // Pass 1: handle * and /
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === '*' || tokens[i] === '/') {
      const op = tokens[i];
      const left = tokens[i - 1];
      const right = tokens[i + 1];
      const tempVar = tempVarGen();

      intermediate.push(`${tempVar} = ${left} ${op} ${right}`);

      // Replace tokens i-1 to i+1 with tempVar
      tokens.splice(i - 1, 3, tempVar);
      i = 0; // restart scan
    } else {
      i++;
    }
  }

  // Pass 2: handle + and -
  i = 0;
  while (i < tokens.length) {
    if (tokens[i] === '+' || tokens[i] === '-') {
      const op = tokens[i];
      const left = tokens[i - 1];
      const right = tokens[i + 1];
      const tempVar = tempVarGen();

      intermediate.push(`${tempVar} = ${left} ${op} ${right}`);

      // Replace tokens i-1 to i+1 with tempVar
      tokens.splice(i - 1, 3, tempVar);
      i = 0; // restart scan
    } else {
      i++;
    }
  }

  // After processing, tokens should have a single token which is the result
  return tokens[0];
}

// Main handler
exports.handleIntermediateCode = (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code is required' });

  const intermediate = [];
  const tempVarGen = createTempVarGenerator();

  const lines = code.split('\n').map(line => line.trim()).filter(Boolean);

  lines.forEach(line => {
    // Only handle simple assignments: e.g. a = b + c * d;
    if (line.includes('=')) {
      const parts = line.split('=');
      if (parts.length !== 2) {
        intermediate.push(`// Unsupported statement: ${line}`);
        return;
      }

      const left = parts[0].trim();
      let right = parts[1].trim();

      // Remove trailing semicolon if exists
      if (right.endsWith(';')) right = right.slice(0, -1).trim();

      // Tokenize right expression
      let tokens = tokenizeExpression(right);

      // Generate intermediate for expression
      const resultVar = generateExprIntermediate(tokens, tempVarGen, intermediate);

      // Final assignment
      intermediate.push(`${left} = ${resultVar}`);

    } else {
      // For non-assignment lines, just comment
      intermediate.push(`// Unsupported or non-assignment line: ${line}`);
    }
  });

  res.json({ code: intermediate });
};
