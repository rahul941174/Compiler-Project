const express = require('express');
const router = express.Router();

const { tokenize } = require('../controllers/lexicalController');
const { performSyntaxAnalysis } = require('../controllers/syntaxController');
const { handleSemanticAnalysis } = require('../controllers/semanticController');
const { handleIntermediateCode } = require('../controllers/intermediateController');
const { generateTargetCode } = require('../controllers/targetController'); // ✅ Import Target Code controller

router.post('/compile', async (req, res) => {
  const { code } = req.body;
  console.log('Code received:', code);

  try {
    // ✅ Lexical Analysis
    const tokens = tokenize(code);
    console.log('Tokens:', tokens);

    // ✅ Syntax Analysis
    const fakeResSyntax = createFakeRes();
    await performSyntaxAnalysis({ body: { code } }, fakeResSyntax);

    // ✅ Semantic Analysis
    const fakeResSemantic = createFakeRes();
    await handleSemanticAnalysis({ body: { code } }, fakeResSemantic);

    // ✅ Intermediate Code Generation
    const fakeResIntermediate = createFakeRes();
    await handleIntermediateCode({ body: { code } }, fakeResIntermediate);

    // ✅ Target Code Generation
    const fakeResTarget = createFakeRes();
    await generateTargetCode({ body: { intermediateCode: fakeResIntermediate.result.code } }, fakeResTarget);

    // ✅ Final Response
    res.json({
      tokens,
      parseTree: fakeResSyntax.result,
      semanticResult: fakeResSemantic.result,
      intermediateCode: fakeResIntermediate.result,
      targetCode: fakeResTarget.result
    });

  } catch (err) {
    console.error('Compilation error:', err);
    res.status(500).json({ error: 'Compilation failed.', details: err.message });
  }
});

// ✅ Helper: Simulate `res.json()` internally
function createFakeRes() {
  const fake = {};
  fake.json = (data) => {
    fake.result = data;
  };
  return fake;
}

module.exports = router;
