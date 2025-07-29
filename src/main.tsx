import React from 'react'
import ReactDOM from 'react-dom/client'
import { initTelegram } from './telegram'
// import GlobalStyles from './styles/global'

// Определяем тип приложения по URL
const appType = () => {
  if (window.location.pathname.includes('profile')) return 'profile'
  if (window.location.pathname.includes('summary')) return 'summary'
  return 'main'
}

// Инициализация приложения
async function initializeApp() {
  // Инициализация Telegram WebApp
  if (window.Telegram?.WebApp) {
    initTelegram()
  }

  // Загрузка нужного компонента
  let AppComponent
  switch (appType()) {
    case 'profile':
      AppComponent = (await import('./ProfileApp')).default
      break
    case 'summary':
      AppComponent = (await import('./SummaryApp')).default
      break
    default:
      AppComponent = (await import('./App')).default
  }

  // Рендеринг
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <AppComponent />
      {/* <GlobalStyles /> */}
    </React.StrictMode>
  )
}

initializeApp().catch(console.error)