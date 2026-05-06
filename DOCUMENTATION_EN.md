# FiveM React Boilerplate Documentation

[English Version](./DOCUMENTATION_EN.md) | [Português](./DOCUMENTATION.md)


This project is an optimized boilerplate for developing NUI interfaces for FiveM using React, Vite, and TypeScript. It provides essential tools for communication between the FiveM Lua client and the frontend.

## 📁 Directory Structure

- `src/hooks`: Custom hooks for NUI communication.
- `src/providers`: Context providers (e.g., Visibility).
- `src/context`: React context definitions.
- `src/utils`: Utility functions and debug tools.
- `src/types.ts`: Global type definitions.
- `src/components`: UI components.

---

## 🛠️ Communication Tools (Hooks & Classes)

Communication between FiveM (Lua) and React happens through NUI messages.

### 1. `Observe` (Hook)
Used to listen for events sent by the Lua script via `SendNUIMessage`.

**Usage:**
```tsx
import { Observe } from "../hooks/observe";

const MyComponent = () => {
  Observe("updateData", (data: { name: string }) => {
    console.log("Received from Lua:", data.name);
  });

  return <div>...</div>;
};
```

### 2. `Post` (Class)
Used to send data from React back to the Lua script via `RegisterNUICallback`. Supports mock data for browser-based development.

**Usage:**
```tsx
import { Post } from "../hooks/post";

const handleClick = async () => {
  try {
    const response = await Post.create("closeUI", { reason: "clicked_button" }, { status: "ok" });
    console.log("Response from Lua:", response);
  } catch (err) {
    console.error("Error sending post", err);
  }
};
```

### 3. `useListen` (Hook)
A simple wrapper for `window.addEventListener`. Useful for listening to generic browser events or custom events.

**Usage:**
```tsx
import { useListen } from "../hooks/listen";

useListen("message", (event) => {
  // Custom logic
});
```

---

## 👁️ Visibility Management

The boilerplate comes with a built-in visibility system to show/hide the interface.

### `VisibilityProvider`
This provider should wrap your application (usually in `App.tsx` or `main.tsx`). It listens for the `setVisibility` event from Lua and manages the display state.

### `useVisibility` (Hook)
Allows you to access and change the visibility state in any component.

**Usage:**
```tsx
import { useVisibility } from "../context/VisibilityContext";

const MyComponent = () => {
  const { visible, setVisible } = useVisibility();

  return (
    <div>
      The NUI is {visible ? "Visible" : "Hidden"}
      <button onClick={() => setVisible(false)}>Close</button>
    </div>
  );
};
```

---

## 🐞 Debugger & Browser Development

Since FiveM's NUI only works in-game, this boilerplate includes tools for browser testing.

### `isEnvBrowser` (Util)
A function that returns `true` if you are running in the browser and `false` if inside FiveM.

### `Debugger` (Class)
Allows you to simulate Lua events while developing in the browser.

**Configuration (example in `main.tsx` or a debug file):**
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
], 2000); // Sends events after 2 seconds
```

---

## 🏷️ Types

The fundamental interfaces are in `src/types.ts`:

- `NuiMessageDataFrame<T>`: Defines the standard structure of a message sent by Lua (`action` and `data`).
- `NuiVisibilityFrame`: Defines the state of the visibility context.
- `NuiDebugEventFrame`: Defines the structure for debug events.

---

## 🚀 How to start creating a new UI

1. Ensure `VisibilityProvider` is wrapping your main component (see `src/App.tsx`).
2. Create your component in `src/components`.
3. Use `src/components/ExampleMenu.tsx` as a reference.
4. Use the `Observe` hook to receive data from your Lua script.
5. Use the `Post` class to send actions back to the Lua server/client.
6. Use the `Debugger` to simulate game behavior without needing to open FiveM every time.
