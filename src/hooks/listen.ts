import { useEffect, useRef } from "react";

type EventHandlerSignature<T = Event> = (event: T) => void;

export const useListen = <T extends Event = Event>(
  event: string,
  handler: EventHandlerSignature<T>,
  target: EventTarget = window,
) => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: Event) => {
      savedHandler.current(event as T);
    };
    target.addEventListener(event, eventListener);
    return () => target.removeEventListener(event, eventListener);
  }, [event, target]);
};
