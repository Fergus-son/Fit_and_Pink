import { useEffect, useState } from "react";

export function useTelegramViewport() {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    stableHeight: window.innerHeight,
  });

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    const handleResize = () => {
      if (tg?.viewportWidth && tg?.viewportHeight) {
        setViewport({
          width: tg.viewportWidth,
          height: tg.viewportHeight,
          stableHeight: tg.viewportStableHeight ?? tg.viewportHeight,
        });
      } else {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight,
          stableHeight: window.innerHeight,
        });
      }
    };

    handleResize(); // инициализация

    tg?.onEvent?.("viewportChanged", handleResize);

    return () => {
      tg?.offEvent?.("viewportChanged", handleResize);
    };
  }, []);

  return viewport;
}
