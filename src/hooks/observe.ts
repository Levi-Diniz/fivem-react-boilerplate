import { useEffect, useRef } from "react";
import { isEnvBrowser, noop } from "../utils/misc";
import type { NuiMessageDataFrame } from "../types";

type NuiHandlerSignature<T> = (data: T) => void;

export function Observe<T = unknown>(
  action: string,
  handler: NuiHandlerSignature<T>,
) {
  const savedHandler = useRef<NuiHandlerSignature<T>>(noop);

  // sempre mantém a referência atualizada
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: MessageEvent<NuiMessageDataFrame<T>>) => {
      const { action: eventAction, data } = event.data;

      if (eventAction === action) {
        if (isEnvBrowser()) {
          console.log("Observed event:", event);
        }

        savedHandler.current(data);
      }
    };

    window.addEventListener("message", eventListener);
    return () => window.removeEventListener("message", eventListener);
  }, [action]);
}
