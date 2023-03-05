import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store";
import 'nprogress/nprogress.css';
import App from 'src/App';
// import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';

ReactDOM.render(
  <HelmetProvider>
    {/* <SidebarProvider > */}

    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    {/* </SidebarProvider> */}
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
