import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { SubscriptionProvider } from './context/subscription';

const root = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(root).render(
  <StrictMode>
    <SubscriptionProvider>
      <App />
    </SubscriptionProvider>
  </StrictMode>,
);
