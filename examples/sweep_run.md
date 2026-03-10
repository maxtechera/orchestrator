# Sweep Run Example (dry)

Input board snapshot:

- NEO-100 — Code Review — priority 1
- NEO-101 — Todo — priority 2

Expected ranking:

1. NEO-100 (Code Review)
2. NEO-101 (Todo)

Expected dispatcher output:

```text
spawn NEO-100 [Code Review] p1
spawn NEO-101 [Todo] p2
```
