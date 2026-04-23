# Design System: Lumina

## Direction
- **Personality:** Energética, Gen-Z, Limpa e Assertiva (Neo-Brutalism Light)
- **Foundation:** Pastel Purple (Calmante, criativa)
- **Depth:** Bordas marcadas e contrastantes, sombras sólidas sutis
- **Surfaces:** Combinação de flats e transparências

## Tokens

### Spacing (Tailwind 8px scale)
- Base: 8px
- Micro: 4px (`gap-1`, `p-1`)
- Tight: 8px (`gap-2`, `p-2`)
- Medium: 16px (`gap-4`, `p-4`)
- Large: 24px (`gap-6`, `p-6`)
- X-Large: 32px (`gap-8`, `p-8`)
- Container padding: 24px nas laterais (`px-6`)

### Colors
Definidos em `index.css` via Tailwind v4 `@theme`:
- `--color-lumina-bg-primary`: #E9D5FF (Fundo Base)
- `--color-lumina-bg-secondary`: #D8B4FE (Superfícies)
- `--color-lumina-border`: #C084FC (Contornos)
- `--color-lumina-text-main`: #2B124C (Texto Principal, Alto Contraste)
- `--color-lumina-text-sub`: #4C1D95 (Texto Secundário)
- `--color-lumina-accent`: #6D28D9 (CTAs e Ações)
- `--color-lumina-accent-hover`: #8B5CF6 (Hover State)
- `--color-lumina-surface-light`: #F3E8FF (Fundos claros, botões auxiliares)

### Radii / Corners
- Card Menor / Inputs: 24px (`rounded-3xl` ou `rounded-[1.5rem]`)
- Cards Maiores: 32px (`rounded-[2rem]`)
- Botões e Tags: Pílulas perfeitas (`rounded-full`)

## Patterns

### Button Primary
- Height: 56px (para touch ideal, Fitts' law) - ex: `py-4`
- Radius: `rounded-full` ou `rounded-[2rem]`
- Color: `bg-lumina-accent` com texto alternativo
- Style: Shadow sutil, border transição

### Input Field
- Padding: `p-6 pb-2 pt-8` para label flutuante interno
- Border: `border-2 border-lumina-border focus:border-lumina-accent`
- Radius: `rounded-3xl`

### Layout Grids
- Gap Padrão: 16px (`gap-4`)
- Margins de seções: 32px a 48px (`mb-8`, `my-12`)
