import { Route, Routes } from 'react-router-dom';
import { DashLayout, Layout, Login, Public } from './components';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        <Route path='dash' element={<DashLayout />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
