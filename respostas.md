# Blueprint de Software — Projeto TCC

**Aluno(a):** [Seu Nome]
**Turma:** [Sua Turma]
**Data:** 23/04/2026

---

## 1. Problema e Contexto

Estudantes do ensino médio e pré-vestibular enfrentam grande dificuldade em manter consistência nos estudos. A rotina de preparação para o ENEM e Vestibulares exige disciplina, organização de horários, acompanhamento de progresso e motivação constante — elementos que raramente estão reunidos em uma única ferramenta acessível pelo celular.

Aplicativos genéricos de produtividade (como Notion ou Google Calendar) não foram projetados para esse público específico e carecem de elementos de engajamento adequados à faixa etária. O resultado é o abandono do plano de estudos, a falta de visibilidade sobre o próprio progresso e a perda de motivação ao longo do ciclo preparatório.

---

## 2. Público-alvo

**Perfil principal — Estudante (16–24 anos):**
- Está se preparando para o ENEM, vestibulares ou concursos
- Precisa organizar sua rotina de estudos e acompanhar o progresso
- Tem familiaridade com apps mobile e jogos (engajamento visual é fundamental)
- Usa o celular como principal dispositivo de acesso

**Funcionalidades esperadas pelo estudante:**
- Controlar o tempo de estudo com timer focado (Pomodoro)
- Organizar sua agenda semanal com tarefas por dia
- Acessar videoaulas recomendadas por matéria (ENEM/Vestibular)
- Personalizar seu mascote (sistema de progressão e recompensa)
- Estudar em grupo em tempo real com colegas

---

## 3. Solução Proposta

**Lumina** é um aplicativo web mobile-first que centraliza a rotina de estudos em uma interface gamificada e visualmente engajante. O estudante conta com um timer de foco personalizável, uma agenda semanal interativa, videoaulas curadas por matéria e um sistema de mascote customizável que evolui com o uso. A plataforma também oferece salas de estudo colaborativo em tempo real, permitindo que grupos de alunos estudem juntos de forma sincronizada.

---

## 4. Requisitos Funcionais

- **RF01 —** O sistema deve permitir cadastro e autenticação de usuários com e-mail e senha via Firebase Authentication.
- **RF02 —** O sistema deve exibir e controlar um timer de foco (estilo Pomodoro) com opção de iniciar, pausar, resetar e personalizar a duração.
- **RF03 —** O sistema deve salvar o estado do timer (tempo configurado, ativo/pausado) de forma persistente entre sessões.
- **RF04 —** O sistema deve exibir uma agenda semanal interativa, permitindo adicionar dias, adicionar tarefas por dia, marcar tarefas como concluídas e excluí-las.
- **RF05 —** O sistema deve exibir uma lista curada de videoaulas filtráveis por matéria (Matemática, Português, História, Física, Química, Biologia, Foco), redirecionando o usuário ao vídeo no YouTube ao clicar.
- **RF06 —** O sistema deve permitir a personalização de um mascote (Lumini) com itens de rosto, cabelo, roupa (top) e calça, gerenciados por uma loja de itens.
- **RF07 —** O sistema deve permitir a criação e entrada em salas de estudo em grupo com código único, sincronizando o estado do timer entre os participantes em tempo real.
- **RF08 —** O sistema deve exibir um perfil do usuário com informações cadastradas (nome, escola) e opções de configuração de conta.
- **RF09 —** O sistema deve redirecionar o usuário para o dashboard automaticamente após login, e para a tela de login se não autenticado.

---

## 5. Requisitos Não Funcionais

- **RNF01 —** A interface deve ser responsiva e otimizada para telas mobile (max-width: 448px), funcionando corretamente em navegadores modernos sem instalação adicional.
- **RNF02 —** O tempo de carregamento inicial da aplicação deve ser inferior a 3 segundos em conexões padrão (4G/Wi-Fi).
- **RNF03 —** Os dados do usuário (autenticação, sessão, preferências) devem ser protegidos via Firebase Authentication, com acesso restrito por usuário autenticado.
- **RNF04 —** O sistema deve funcionar de forma fluida com animações a 60fps, utilizando aceleração por hardware sempre que possível.
- **RNF05 —** A interface deve ser visualmente acessível, com contraste adequado e fontes legíveis, seguindo as diretrizes mínimas de usabilidade mobile.
- **RNF06 —** O estado do timer e da agenda deve ser persistido entre recarregamentos de página (localStorage / Firebase Realtime Database).

---

## 6. Arquitetura e Tecnologias

**Padrão arquitetural:** SPA (Single Page Application) com arquitetura cliente-servidor via BaaS (Backend as a Service).

| Camada | Tecnologia | Justificativa |
|---|---|---|
| **Front-end** | React 19 + TypeScript | Componentização eficiente, tipagem estática que reduz erros em runtime e grande ecossistema de bibliotecas |
| **Estilização** | Tailwind CSS v4 | Utilitários CSS diretamente no JSX, design system consistente e builds otimizados |
| **Animações** | Framer Motion (motion/react) | Animações declarativas e performáticas nativas do React, essenciais para a experiência gamificada |
| **Roteamento** | React Router DOM v7 | Roteamento declarativo e rotas aninhadas, padrão do ecossistema React |
| **Build/Dev** | Vite 6 | Servidor de desenvolvimento ultrarrápido com HMR (Hot Module Replacement) instantâneo |
| **Autenticação** | Firebase Authentication | Autenticação segura gerenciada, sem necessidade de back-end próprio, suporte nativo a e-mail/senha |
| **Banco de dados** | Firebase Realtime Database | Sincronização em tempo real nativa, essencial para as salas de estudo colaborativo; sem custo para o volume do projeto |
| **Persistência local** | localStorage | Persistência leve de preferências (timer, customização) sem dependência de rede |
| **Ícones** | Lucide React | Biblioteca de ícones SVG leve, consistente e com API React nativa |

---

## 7. Fluxo Principal do Sistema

**Fluxo: Sessão de Estudo Completa**

1. O usuário acessa o app e é redirecionado para a tela de splash/login caso não esteja autenticado.
2. O usuário realiza o cadastro com nome, escola, e-mail e senha; ou efetua login com credenciais existentes.
3. Após autenticação, o sistema redireciona automaticamente para o **Dashboard**.
4. O usuário visualiza o timer de foco e o mascote personalizado (Lumini) na tela principal.
5. O usuário pressiona **Play** para iniciar o timer de foco; o timer faz a contagem regressiva com indicador visual circular.
6. Ao pausar ou concluir o tempo, o usuário navega para a **Agenda** pela barra de navegação inferior.
7. Na Agenda, o usuário verifica as tarefas do dia, marca como concluídas as que realizou e, se desejar, adiciona novas tarefas.
8. O usuário navega para a aba **Gabaritando** (Recomendações) e filtra por matéria do dia de estudo; ao clicar em uma aula, o YouTube abre em nova aba.
9. Opcionalmente, o usuário acessa a **Loja** para desbloquear novos itens para o mascote como recompensa pelo progresso.
10. O usuário pode criar ou entrar em uma **Sala de Grupo** para sincronizar o timer com colegas e estudar de forma colaborativa.
11. Ao encerrar a sessão, o usuário acessa **Configurações** para ajustar preferências ou efetuar logout com segurança.

---

## Checklist de Revisão

- [x] Problema descrito com situação real e específica
- [x] Público-alvo com perfis e necessidades identificadas
- [x] Solução conectada diretamente ao problema
- [x] Requisitos funcionais escritos como verbos de ação (RF01...RF09)
- [x] Requisitos não funcionais descrevem comportamento e qualidade
- [x] Tecnologias com justificativa técnica contextualizada
- [x] Fluxo completo em etapas numeradas cobrindo login → uso → saída
- [x] Escopo viável para desenvolvimento individual/dupla em semestre letivo
