// targetController.js

function generateTargetCode(req, res) {
  const { intermediateCode } = req.body;

  if (!intermediateCode || !Array.isArray(intermediateCode)) {
    return res.status(400).json({ error: 'Invalid or missing intermediate code' });
  }

  const assemblyCode = intermediateCode.map((line, index) => {
    if (line.startsWith('//')) {
      return `; ${line}`; // Treat comments as assembly comments
    }

    if (line.includes('IF') && line.includes('GOTO')) {
      // Handle conditional jump
      const parts = line.split(/IF\s+|\s+GOTO\s+/).filter(Boolean); // [cond, label]
      return `CMP ${parts[0]} \nJMP_IF_TRUE ${parts[1]}`;
    }

    if (line.startsWith('GOTO')) {
      const label = line.split(' ')[1];
      return `JMP ${label}`;
    }

    if (line.endsWith(':')) {
      return `${line}`; // Label definition
    }

    if (line.includes('=')) {
      const [lhs, rhs] = line.split('=').map(p => p.trim());
      return `MOV ${lhs}, ${rhs}`;
    }

    return `; Unsupported line: ${line}`;
  });

  res.json({ code: assemblyCode });
}

module.exports = { generateTargetCode };
