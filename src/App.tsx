import { Route, Routes } from 'react-router-dom';
import { DashLayout, Layout, Public } from './components';
import { Login, Welcome } from './features/auth';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        <Route path='dash' element={<DashLayout />}>
          <Route index element={<Welcome />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
