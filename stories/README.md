# stories/ — requirement inputs

Put your documents here. Any format: PDF, Word, Markdown, Excel, images, HTML prototypes.

```
stories/
  project/            whole-project documents: BRS, FRS, specification, overall prototype
                      (generated here: roadmap.md, roles.md, traceability.md)
  {module}/
    input/            module documents: user stories, screens, HTML prototype, notes
                      (generated next to input/: requirements.md, dev-stories*.md)
  bugs/               bug reports for /fix-bug (copy .auto-build/templates/bug-report.md)
```

Module folder names become module names (`booking`, `payments`). If you only have whole-project documents, leave the module folders out — the Platform Architect splits the project into modules in `roadmap.md`.

When documents conflict, this order wins: FRS / spec → test cases → user stories → BRS → HTML prototype → screens → notes.
