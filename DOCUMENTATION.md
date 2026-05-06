# Documentação do Boilerplate React para FiveM

[English Version](./DOCUMENTATION_EN.md) | [Português](./DOCUMENTATION.md)


Este projeto é um boilerplate otimizado para o desenvolvimento de interfaces (NUI) para FiveM utilizando React, Vite e TypeScript. Ele fornece ferramentas essenciais para a comunicação entre o cliente Lua do FiveM e o frontend.

## 📁 Estrutura de Pastas

- `src/hooks`: Hooks personalizados para comunicação NUI.
- `src/providers`: Provedores de contexto (ex: Visibilidade).
- `src/context`: Definições de contexto React.
- `src/utils`: Funções utilitárias e ferramentas de debug.
- `src/types.ts`: Definições de tipos globais.
- `src/components`: Componentes da interface.

---

## 🛠️ Ferramentas de Comunicação (Hooks & Classes)

A comunicação entre FiveM (Lua) e React ocorre através de mensagens NUI.

### 1. `Observe` (Hook)
Usado para ouvir eventos enviados pelo script Lua via `SendNUIMessage`.

**Uso:**
```tsx
import { Observe } from "../hooks/observe";

const MyComponent = () => {
  Observe("updateData", (data: { name: string }) => {
    console.log("Recebido do Lua:", data.name);
  });

  return <div>...</div>;
};
```

### 2. `Post` (Classe)
Usada para enviar dados do React de volta para o script Lua via `RegisterNUICallback`. Suporta dados de mock para desenvolvimento no navegador.

**Uso:**
```tsx
import { Post } from "../hooks/post";

const handleClick = async () => {
  try {
    const response = await Post.create("closeUI", { reason: "clicked_button" }, { status: "ok" });
    console.log("Resposta do Lua:", response);
  } catch (err) {
    console.error("Erro ao enviar post", err);
  }
};
```

### 3. `useListen` (Hook)
Um wrapper simples para o `window.addEventListener`. Útil para ouvir eventos genéricos do navegador ou eventos customizados.

**Uso:**
```tsx
import { useListen } from "../hooks/listen";

useListen("message", (event) => {
  // Lógica customizada
});
```

---

## 👁️ Gerenciamento de Visibilidade

O boilerplate vem com um sistema de visibilidade integrado para mostrar/esconder a interface.

### `VisibilityProvider`
Este provedor deve envolver sua aplicação (geralmente no `App.tsx` ou `main.tsx`). Ele ouve o evento `setVisibility` vindo do Lua e gerencia o estado de exibição.

### `useVisibility` (Hook)
Permite acessar e alterar o estado de visibilidade em qualquer componente.

**Uso:**
```tsx
import { useVisibility } from "../context/VisibilityContext";

const MyComponent = () => {
  const { visible, setVisible } = useVisibility();

  return (
    <div>
      O NUI está {visible ? "Visível" : "Escondido"}
      <button onClick={() => setVisible(false)}>Fechar</button>
    </div>
  );
};
```

---

## 🐞 Debugger & Desenvolvimento no Navegador

Como o NUI do FiveM só funciona dentro do jogo, este boilerplate inclui ferramentas para testar no navegador.

### `isEnvBrowser` (Util)
Função que retorna `true` se você estiver rodando no navegador e `false` se estiver dentro do FiveM.

### `Debugger` (Classe)
Permite simular eventos do Lua enquanto você desenvolve no navegador.

**Configuração (exemplo no `main.tsx` ou um arquivo de debug):**
```tsx
import { Debugger } from "./utils/debugger";

new Debugger([
  {
    action: "setVisibility",
    data: { visibility: true }
  },
  {
    action: "updateData",
    data: { name: "Antigravity" }
  }
], 2000); // Envia os eventos após 2 segundos
```

---

## 🏷️ Tipos (Types)

As interfaces fundamentais estão em `src/types.ts`:

- `NuiMessageDataFrame<T>`: Define a estrutura padrão de uma mensagem enviada pelo Lua (`action` e `data`).
- `NuiVisibilityFrame`: Define o estado do contexto de visibilidade.
- `NuiDebugEventFrame`: Define a estrutura para eventos de debug.

---

## 🚀 Como começar a criar uma nova UI

1. Certifique-se de que o `VisibilityProvider` está envolvendo o seu componente principal (veja o exemplo em `src/App.tsx`).
2. Crie seu componente em `src/components`.
3. Use o exemplo em `src/components/ExampleMenu.tsx` como base.
4. Use o hook `Observe` para receber dados do seu script Lua.
5. Use a classe `Post` para enviar ações de volta ao servidor/cliente Lua.
6. Use o `Debugger` para simular o comportamento do jogo sem precisar abrir o FiveM toda vez.
