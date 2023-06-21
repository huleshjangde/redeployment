import { ToastContainer } from 'react-toastify';
import { AppProvider } from '../usecontext/usecontext';
import './globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}
