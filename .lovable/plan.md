## Objetivo
Eliminar o espaço vazio entre o botão "Conhecer os Serviços" e a próxima secção, apenas em mobile.

## Causa
Em `src/components/HeroSection.tsx`, a secção usa `min-h-[100svh]` em mobile. Como o conteúdo (imagem + texto + botões) ocupa menos que a altura total do ecrã, sobra espaço em branco no fundo antes da secção seguinte.

## Alteração
No `<section>` de `HeroSection.tsx`:
- Remover `min-h-[100svh]` do mobile e manter apenas nas breakpoints maiores.
- Antes: `min-h-[100svh] md:min-h-[760px] lg:min-h-screen`
- Depois: `md:min-h-[760px] lg:min-h-screen`

Assim, em mobile a secção passa a ter a altura natural do seu conteúdo (imagem + texto + botões + paddings existentes), eliminando o espaço morto. Desktop e tablet ficam inalterados.

## Validação
- Preview mobile (390×844): confirmar que a próxima secção surge logo a seguir aos botões.
- Preview tablet e desktop: confirmar que nada mudou.
