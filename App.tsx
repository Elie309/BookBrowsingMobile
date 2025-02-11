import { Provider as ReduxProvider } from 'react-redux';
import AppRouter from './pages/AppRouter';
import store from './utils/store';

export default function App() {


  return (
    <ReduxProvider store={store}>
      <AppRouter />
    </ReduxProvider>
  );
}
