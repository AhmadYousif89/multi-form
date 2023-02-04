import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { SubscriptionProvider } from './context/subscription';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <SubscriptionProvider>
      <App />
    </SubscriptionProvider>
  </StrictMode>,
);
