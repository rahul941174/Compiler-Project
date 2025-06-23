let labelCount = 0;
function createLabel() {
  return `LABEL${labelCount++}`;
}

function createTempVarGenerator() {
  let count = 0;
  return () => `t${++count}`;
}

function tokenizeExpression(expr) {
  const regex = /(\+|\-|\*|\/|\(|\))/g;
  return expr.split(regex).map(t => t.trim()).filter(t => t.length > 0);
}

function generateExprIntermediate(tokens, tempVarGen, intermediate) {
  let i = 0;
  while (i < tokens.length) {
    if (tokens[i] === '*' || tokens[i] === '/') {
      const op = tokens[i], left = tokens[i - 1], right = tokens[i + 1];
      const tempVar = tempVarGen();
      intermediate.push(`${tempVar} = ${left} ${op} ${right}`);
      tokens.splice(i - 1, 3, tempVar);
      i = 0;
    } else i++;
  }

  i = 0;
  while (i < tokens.length) {
    if (tokens[i] === '+' || tokens[i] === '-') {
      const op = tokens[i], left = tokens[i - 1], right = tokens[i + 1];
      const tempVar = tempVarGen();
      intermediate.push(`${tempVar} = ${left} ${op} ${right}`);
      tokens.splice(i - 1, 3, tempVar);
      i = 0;
    } else i++;
  }

  return tokens[0];
}

exports.handleIntermediateCode = (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code is required' });

  const intermediate = [];
  const tempVarGen = createTempVarGenerator();
  const lines = code.split('\n').map(l => l.trim()).filter(Boolean);

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('int ') && line.includes('main')) {
      i++;
      continue;
    }

    if (line === '{' || line === '}') {
      i++;
      continue;
    }

    if (line.startsWith('return')) {
      i++;
      continue;
    }

    if (line.startsWith('if') && line.includes('(') && line.includes(')')) {
      const conditionMatch = line.match(/\((.*?)\)/);
      const condition = conditionMatch ? conditionMatch[1].trim() : null;

      const [left, op, right] = condition.split(/([<>=!]=?|==)/).map(t => t.trim());
      const trueLabel = createLabel();
      const endLabel = createLabel();

      intermediate.push(`IF ${left} ${op} ${right} GOTO ${trueLabel}`);
      intermediate.push(`GOTO ${endLabel}`);
      intermediate.push(`${trueLabel}:`);

      i++;
      if (lines[i] === '{') i++;

      while (i < lines.length && lines[i] !== '}') {
        const stmt = lines[i];
        if (stmt.includes('=')) {
          const [lhs, rhsRaw] = stmt.split('=');
          const rhs = rhsRaw.replace(';', '').trim();
          const tokens = tokenizeExpression(rhs);
          const result = generateExprIntermediate(tokens, tempVarGen, intermediate);
          intermediate.push(`${lhs.trim()} = ${result}`);
        }
        i++;
      }

      intermediate.push(`${endLabel}:`);
      i++;
      continue;
    }

    if (line.includes('=')) {
      const [lhs, rhsRaw] = line.split('=');
      const rhs = rhsRaw.replace(';', '').trim();
      const tokens = tokenizeExpression(rhs);
      const result = generateExprIntermediate(tokens, tempVarGen, intermediate);
      intermediate.push(`${lhs.trim()} = ${result}`);
      i++;
      continue;
    }

    i++;
  }

  res.json({ code: intermediate });
};
