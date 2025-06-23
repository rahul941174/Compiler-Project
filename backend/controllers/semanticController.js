exports.handleSemanticAnalysis = (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: 'Code is required' });

  const lines = code.split('\n').map(line => line.trim()).filter(Boolean);
  let scopeStack = [new Set()];
  const results = [];

  const isDeclared = (varName) => {
    for (let i = scopeStack.length - 1; i >= 0; i--) {
      if (scopeStack[i].has(varName)) return true;
    }
    return false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line === '{') {
      scopeStack.push(new Set());
      results.push({ code: line, status: '✅ Scope Start', error: '' });
      continue;
    }

    if (line === '}') {
      scopeStack.pop();
      results.push({ code: line, status: '✅ Scope End', error: '' });
      continue;
    }

    if (line.startsWith('int ') && /\(\s*\)/.test(line)) {
      results.push({ code: line, status: '✅ Valid', error: '' });
      continue;
    }

    if (line.startsWith('if') || line.startsWith('while')) {
      const match = line.match(/\((.*?)\)/);
      if (match) {
        const condition = match[1];
        const vars = condition.split(/[^a-zA-Z0-9_]/).filter(v => /^[a-zA-Z_]\w*$/.test(v));
        let hasError = false;
        for (const id of vars) {
          if (!isDeclared(id)) {
            results.push({ code: line, status: '❌ Error', error: `Use of undeclared variable '${id}' in condition` });
            hasError = true;
          }
        }
        if (!hasError) {
          results.push({ code: line, status: '✅ Valid', error: '' });
        }
      } else {
        results.push({ code: line, status: '❌ Error', error: 'Malformed condition in if/while' });
      }
      continue;
    }

    if (line.startsWith('int ') || line.startsWith('float ') || line.startsWith('char ') || line.startsWith('double ')) {
      const parts = line.split(/\s+/);
      const type = parts[0];
      const declaration = line.slice(type.length).trim().replace(/;$/, '');
      const varName = declaration.split('=')[0].trim();
      if (scopeStack[scopeStack.length - 1].has(varName)) {
        results.push({ code: line, status: '❌ Error', error: `Redeclaration of variable '${varName}'` });
      } else {
        scopeStack[scopeStack.length - 1].add(varName);
        results.push({ code: line, status: '✅ Valid', error: '' });
      }
      continue;
    }

    if (line.startsWith('return')) {
      const returnExpr = line.replace('return', '').replace(/;$/, '').trim();
      const vars = returnExpr.split(/[^a-zA-Z0-9_]/).filter(v => /^[a-zA-Z_]\w*$/.test(v));
      let hasError = false;
      for (const id of vars) {
        if (!isDeclared(id)) {
          results.push({ code: line, status: '❌ Error', error: `Use of undeclared variable '${id}' in return` });
          hasError = true;
        }
      }
      if (!hasError) {
        results.push({ code: line, status: '✅ Valid', error: '' });
      }
      continue;
    }

    if (line.includes('=')) {
      const cleanLine = line.replace(/;$/, '');
      const [lhs, rhs] = cleanLine.split('=').map(s => s.trim());

      if (!/^[a-zA-Z_]\w*$/.test(lhs)) {
        results.push({ code: line, status: '❌ Error', error: `Invalid left-hand side in assignment` });
        continue;
      }

      if (!isDeclared(lhs)) {
        results.push({ code: line, status: '❌ Error', error: `Use of undeclared variable '${lhs}'` });
        continue;
      }

      const vars = rhs.split(/[^a-zA-Z0-9_]/).filter(w => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(w));
      let hasError = false;
      for (const id of vars) {
        if (!isDeclared(id)) {
          results.push({ code: line, status: '❌ Error', error: `Use of undeclared variable '${id}'` });
          hasError = true;
        }
      }

      if (!hasError) {
        results.push({ code: line, status: '✅ Valid', error: '' });
      }
      continue;
    }

    results.push({ code: line, status: '❌ Error', error: 'Unsupported or invalid syntax' });
  }

  res.json({ report: results });
};
