import { Route, Routes } from 'react-router-dom';
import { Layout, Login, Public } from './components';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
