function generateTargetCode(req, res) {
  const { intermediateCode } = req.body;

  if (!intermediateCode || !Array.isArray(intermediateCode)) {
    return res.status(400).json({ error: 'Invalid or missing intermediate code' });
  }

  const assemblyCode = intermediateCode.map(line => {
    if (line.includes('IF') && line.includes('GOTO')) {
      const parts = line.split(/IF\s+|\s+GOTO\s+/).filter(Boolean);
      return `CMP ${parts[0]}\nJMP_IF_TRUE ${parts[1]}`;
    }

    if (line.startsWith('GOTO')) {
      const label = line.split(' ')[1];
      return `JMP ${label}`;
    }

    if (line.endsWith(':')) {
      return `${line}`;
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
