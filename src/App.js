import React , {Suspense} from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ToastProvider } from "react-toast-notifications";
import './utils/i18n'
import Routes from "./routes/routes";

function App() {
  const History = createBrowserHistory();

  return (
    <div>
       <Suspense fallback={null}>
      <ToastProvider>
        <Router history={History}>
          <Routes />
        </Router>
      </ToastProvider>
      </Suspense>
    </div>
  );
}
export default App;
