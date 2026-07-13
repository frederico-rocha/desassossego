# Plano: Novo teste na secção Hero

## Contexto
A secção hero já tem um controlo temporário que alterna entre três variantes de degradé. O utilizador quer agora um novo conjunto de testes:

1. **Degradé atual** — o degradé original da esquerda para a direita (`bg-gradient-to-r from-primary/85 via-primary/70 to-primary/40`).
2. **Sem degradé, mas com azul claro uniforme** — uma sobreposição uniforme de `primary/40` (a cor mais clara do degradé atual) sobre toda a imagem.
3. **Degradé de baixo para cima** — o degradé inverte a direção, começando mais escuro em baixo e clareando para cima (`bg-gradient-to-t from-primary/85 via-primary/70 to-primary/40`).

## Alterações propostas

### 1. Atualizar as variantes em `src/components/HeroSection.tsx`
- Substituir o tipo `GradientVariant` e o objeto `gradientClasses` pelas novas três variantes:
  - `original`: `bg-gradient-to-r from-primary/85 via-primary/70 to-primary/40`
  - `uniform`: `bg-primary/40`
  - `bottom-top`: `bg-gradient-to-t from-primary/85 via-primary/70 to-primary/40`
- Atualizar a função `cycleGradient` para percorrer as novas variantes.
- Atualizar os rótulos do botão flutuante para refletir os novos testes.

### 2. Manter o controlo temporário
- O botão flutuante no canto inferior direito continua a permitir alternar entre as três variantes durante o teste.
- Quando o utilizador escolher a variante final, remove-se o controlo temporário e deixa-se apenas a opção selecionada.

## Validação
- Compilar o projeto para garantir que não há erros.
- Verificar no preview desktop e mobile que as três variantes são visíveis e que o texto mantém legibilidade.

## Nota
São alterações rápidas e reversíveis. O controlo temporário é apenas para comparação e será removido após decisão final.