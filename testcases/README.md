# testcases/ — test case inputs

Put your test cases here: Excel, CSV, Word, Gherkin (`.feature`), Markdown, PDF.

```
testcases/
  project/          test plan for the whole project (optional)
  {module}/
    input/          your test cases for that module
                    (generated next to input/: test-cases.md — your cases + generated gap cases)
```

Keep your IDs (TC-01 …) — they are preserved everywhere. Add a **Role** column if you can (which user role runs the case). Results never go here — they are written to `testresults/`.
