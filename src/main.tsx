import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function initApp() {
  // Инициализация Telegram только если WebApp доступен
  if (window.Telegram?.WebApp) {
    import('./telegram').then(({ initTelegram }) => initTelegram());
  }

  const container = document.getElementById('root');
  const root = createRoot(container!);

  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
}

initApp();