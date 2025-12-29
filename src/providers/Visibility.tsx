import React, {
  Context,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { observe } from "@/hooks/observe";
import { Data } from "@/main";
import { isEnvBrowser } from "@/utils/misc";
import { Post } from "@/hooks/post";

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null);

interface VisibilityProviderValue {
  setVisible: (visible: boolean) => void;
  visible: boolean;
  data: Data;
  setData: (data: Data) => void;
}

type setVisibility = {
  visibility: boolean;
  data: Data;
};

// This should be mounted at the top level of your application, it is currently set to
// apply a CSS visibility value. If this is non-performant, this should be customized.
export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState<Data>({
    playerInfo: { cash: 0, coins: 0, name: "", id: 0, level: 0 },
    weaponTypeCategories: [],
    category: {
      skins: [],
      weapons: [],
      soundEffects: [],
      inventory: {
        weapons: [],
        sounds: [],
      }
    },
  });

  observe("setVisibility", (e: setVisibility) => {
    setVisible(e.visibility);
    if ( e.visibility ) {
      setData(e.data);
    }
  });

    // Handle pressing escape/backspace
  useEffect(() => {
    // Only attach listener when we are visible
    if (!visible) return;

    const keyHandler = (e: KeyboardEvent) => {
      if (["Escape"].includes(e.code)) {
        if (!isEnvBrowser()) Post.create("removeFocus");
        else setVisible(!visible);
      }
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [visible]);


  // useEffect(() => {
  //   console.log("Data: ", JSON.stringify(data));
  // }, [data]);

  return (
    <VisibilityCtx.Provider
      value={{
        visible,
        setVisible,
        data,
        setData,
      }}
    >
      <div
        style={{ visibility: visible ? "visible" : "hidden", height: "100%" }}
      >
        {children}
      </div>
    </VisibilityCtx.Provider>
  );
};

export const useVisibility = () =>
  useContext<VisibilityProviderValue>(
    VisibilityCtx as Context<VisibilityProviderValue>,
  );
