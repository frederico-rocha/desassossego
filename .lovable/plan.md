## Plano: Testes na secção Hero

### Contexto
A secção hero atual tem um degradé sobreposto à imagem de fundo, definido em `src/components/HeroSection.tsx`:
```
bg-gradient-to-r from-primary/85 via-primary/70 to-primary/40
```
Este degradé vai da esquerda para a direita e ajuda a garantir a legibilidade do texto e botões.

### Testes propostos

#### Teste 1 — Remover o degradé
- Remover completamente a `<div>` do degradé sobreposto.
- Resultado: imagem de fundo aparece sem qualquer escurecimento.

#### Teste 2 — Degradé de cima para baixo
- Manter a `<div>` do degradé, mas alterar a direção de `bg-gradient-to-r` para `bg-gradient-to-b`.
- Manter as mesmas cores e opacidades (`from-primary/85 via-primary/70 to-primary/40`).
- Resultado: escurecimento começa no topo e desvanece-se para a base.

### Como validar
- Compilar o projeto para garantir que não há erros.
- Visualizar a preview em desktop e mobile para confirmar o impacto na legibilidade do texto.

### Nota
São alterações rápidas e reversíveis. Posso aplicar primeiro um teste, depois o outro, ou criar uma forma simples de alternar entre eles se quiseres comparar lado a lado.