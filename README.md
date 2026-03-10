# OpenClaw Orchestrator

OpenClaw Orchestrator convierte trabajo de proyecto en ejecuciones aisladas y delegadas, para que el equipo gestione **trabajo** en lugar de supervisar paso a paso a cada agente.

> [!WARNING]
> Este orquestador está diseñado para entornos confiables y operación iterativa. La automatización está acotada por contratos de kanban, guardrails de revisión humana y políticas de no-merge por agentes.

## Cómo funciona

1. Lee trabajo desde Linear (sistema de verdad).
2. Decide qué tickets están accionables (según estado + contrato).
3. Delega ejecución a sub-agentes/skills especializados.
4. Exige evidencia de verificación y artefactos enlazados.
5. Devuelve el ticket al estado correcto (`In Review`, `QA`, `Done` o `Blocked by Max`).

En lugar de un "script único", OpenClaw usa bucles acotados (wake cycles) por skill supervisor.

## Boundary (qué sí / qué no)

**Sí hace:**
- Orquestación (selección, priorización, delegación, reconciliación).
- Aislamiento por ejecución (sub-agentes y sesiones separadas).
- Enforzar contrato de entrega (Inputs/Deliverables/Verification/Artifacts).

**No hace:**
- No reemplaza criterio humano en gates críticos.
- No mergea PRs por cuenta propia (Max mergea).
- No considera "hecho" un ticket sin evidencia verificable.

## Contrato canónico

El contrato de trabajo está en:

- `docs/KANBAN_CONTRACT.md`

Todo ticket operativo debe tener:

- `## Inputs`
- `## Deliverables`
- `## Verification`
- `## Artifacts`

Si falta este contrato, el orquestador reduce autonomía y prioriza completar estructura antes de ejecutar trabajo pesado.

## Modo `kanban:sweep`

`kanban:sweep` es el barrido de backlog para despacho rápido.

Referencia: `skills/kanban/SKILL.md`

Resumen operativo:

1. Lista tickets incompletos (una llamada).
2. Omite tickets con sesión activa.
3. Prioriza por tier de estado + prioridad Linear.
4. Spawnea sub-agentes (`cleanup="delete"`).
5. Notifica y termina (sin polling continuo).

Principio: **Do as little as possible. Spawn fast. Stop.**

## Skills relacionadas (runtime actual)

### Núcleo de orquestación
- `skills/kanban/SKILL.md` — barrido y despacho operativo (`kanban:sweep`).
- `skills/orchestrator/SKILL.md` — descomposición/delegación multi-paso.
- `skills/linear/linear/SKILL.md` — lectura/escritura mínima en Linear.
- `skills/model-router/SKILL.md` — selección de modelo por costo/complejidad.

### Supervisores always-on
- `skills/ship-engine-supervisor/SKILL.md` — ciclo maestro de Ship Engine.
- `skills/content-engine-supervisor/SKILL.md` — ciclo maestro de Content Engine.

### Validación de calidad
- `skills/ship-critic/SKILL.md` — PASS/REVISE antes de gates y `verified` (en production).

## Estado y transición (resumen)

Modelo base de estados (kanban):

- `Backlog` → no listo
- `Todo` → listo para pickup
- `In Progress` → ejecución
- `Code Review` → PR abierta, espera merge de Max
- `QA` → verificar post-merge
- `In Review` → artefacto no-código pendiente de revisión
- `Blocked by Max` → dependencia humana explícita
- `Done` → evidencia + artefactos completos

Reglas clave:

- PR creada por agente → `Code Review`.
- PR mergeada por Max → `QA`/`needs-qa`.
- Verificación aprobada + evidencias completas → `Done`.

## Guardrails operativos

- Nunca saltar hard gates sin decisión de Max.
- Nunca marcar `Done` sin verificación + artefactos.
- Nunca auto-publicar contenido de cuentas de Max sin aprobación explícita.
- Nunca modificar jobs cron desde skills de ejecución.
- Nunca mergear PRs desde agentes.

## Observabilidad

Salida esperada por ciclo:

- Comentarios en Linear con `status_summary` + `next_steps`.
- Estado de ticket consistente con evidencia real.
- Artefactos canónicos enlazados (PR, URLs, paths, docs).

## Diseño de implementación

OpenClaw Orchestrator es **skills-first**:

- No depende de un binario único de control.
- Se compone de skills especializadas + wake events + sub-agentes.
- El contrato (`KANBAN_CONTRACT.md`) mantiene consistencia entre engines.

## Referencias

- `docs/KANBAN_CONTRACT.md`
- `docs/SUB_AGENT_PATTERNS.md`
- `skills/kanban/SKILL.md`
- `skills/orchestrator/SKILL.md`
- `skills/ship-engine-supervisor/SKILL.md`
- `skills/content-engine-supervisor/SKILL.md`
- `skills/ship-engine/WORKFLOW.md`
