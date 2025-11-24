import { RouterProvider } from 'react-router';
import router from './route';
import { Provider } from 'react-redux';
import store from './stores/store';
function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
