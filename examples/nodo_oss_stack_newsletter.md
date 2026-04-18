# NODO newsletter issue, OSS stack

Ticket: MAX-539  
Surface: `maxtechera/orchestrator`  
Slug: `nodo/oss-stack`

## Subject line variants

1. Curiosity, `Tus agentes de IA se olvidan todo. Acá está la solución.`
2. Specific-result, `3 repos open source para que Claude Code deje de romper tu proyecto`
3. Contrarian, `Todo lo que te venden como "AI agent" es glue code. Mirá esto.`

## Preview text

`ship, orchestrator, memory, el stack open source que uso todos los días.`

## MailerLite setup notes

- Campaign type: broadcast
- Sequence length: 1 email
- Segment: `TBD_NODO_SEGMENT`
- UTM base: `utm_source=mailerlite&utm_campaign=nodo-oss-stack&utm_medium=email`
- Web version target: `https://maxtechera.dev/nodo/oss-stack`

## Body copy

Che,

Hay un patrón que veo seguido con agentes de IA en producción.

Arrancan bien, pero a la media hora ya están inventando contexto, olvidando decisiones y diciendo que terminaron sin mostrar ninguna prueba real.

No es un problema de modelo. Es un problema de sistema.

Si no tienen memoria, cada sesión vuelve a empezar de cero. Si no tienen orquestación, cada task se convierte en caos. Si no tienen verificación, terminás aprobando humo.

Por eso terminé armando un stack con 3 repos open source que uso juntos todos los días, `memory`, `orchestrator` y `ship`.

## 1. memory, para que las sesiones sobrevivan reinicios

`memory` le da memoria persistente a Claude Code, OpenClaw y Gemini CLI. Guarda contexto, decisiones y learnings entre sesiones con un sistema HOT, WARM y COLD que no te obliga a reexplicar todo cada vez.

El receipt importante es este, las sesiones sobreviven restarts. El agente puede retomar trabajo, decisiones previas y contexto de proyecto en vez de arrancar con amnesia.

**Install**

```bash
clawhub install memory
```

**CTA**  
[→ star memory](https://github.com/maxtechera/memory?utm_source=mailerlite&utm_campaign=nodo-oss-stack&utm_medium=email&utm_content=memory)

## 2. orchestrator, para que varios agentes trabajen con guardrails

`orchestrator` toma tickets, separa ejecución de verificación y obliga a entregar evidencia antes de mover una tarea. El agente que hizo el trabajo no se autoaprueba.

El receipt importante es este, podés correr agentes en paralelo con guardrails. Eso baja muchísimo el falso positivo típico de los agent stacks y cambia "parece que quedó" por "acá está la prueba".

**Install**

```bash
clawhub install orchestrator
```

**CTA**  
[→ star orchestrator](https://github.com/maxtechera/orchestrator?utm_source=mailerlite&utm_campaign=nodo-oss-stack&utm_medium=email&utm_content=orchestrator)

## 3. ship, para validar, construir y lanzar en un solo pipeline

`ship` monta arriba de esa base un pipeline GTM completo. Coordina stages, credenciales, critic, analyst y handoffs para que una idea no se quede en repo sino que llegue a distribución.

El receipt importante es este, podés validar, build y launch en un solo pipeline. Menos improvisación, más shipping real.

**Install**

```bash
clawhub install ship
```

**CTA**  
[→ star ship](https://github.com/maxtechera/ship?utm_source=mailerlite&utm_campaign=nodo-oss-stack&utm_medium=email&utm_content=ship)

## Lo que viene en La Academia

Esto también es la base de lo que voy a enseñar en La Academia sobre Claude Code.

No solo prompts. Sistemas reales para trabajar con agentes en producción, memoria persistente, orquestación multi-agent, verificación y shipping con receipts.

## CTA principal

Reply con tu use case.

Contame dónde se te rompen hoy los agentes, memoria, coordinación o shipping, y te digo cuál atacaría primero.

## CTA secundaria

Si querés ver los 3 repos con más contexto, acá están los posts de lanzamiento:

- [memory](https://github.com/maxtechera/memory?utm_source=mailerlite&utm_campaign=nodo-oss-stack&utm_medium=email&utm_content=memory-post)
- [orchestrator](https://github.com/maxtechera/orchestrator?utm_source=mailerlite&utm_campaign=nodo-oss-stack&utm_medium=email&utm_content=orchestrator-post)
- [ship](https://github.com/maxtechera/ship?utm_source=mailerlite&utm_campaign=nodo-oss-stack&utm_medium=email&utm_content=ship-post)

## Proof checklist

- 3 subject lines defined
- Preview text defined
- UTM-tagged CTA links included
- Web version target defined as `/nodo/oss-stack`
- HTML preview lives in `examples/nodo_oss_stack_newsletter_preview.html`
