import { Route, Routes } from 'react-router-dom';
import { Layout, Public } from './components';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
      </Route>
    </Routes>
  );
}

export default App;
