import { Route, Routes } from 'react-router-dom';
import { DashLayout, Layout, Public } from './components';
import { Login, PersistLogin, Welcome } from './features/auth';
import { EditNote, NewNoteForm, NotesList } from './features/notes';
import { EditUser, NewUserForm, UsersList } from './features/users';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        <Route element={<PersistLogin />}>
          <Route path='dash' element={<DashLayout />}>
            <Route index element={<Welcome />} />

            <Route path='users'>
              <Route index element={<UsersList />} />
              <Route path=':id' element={<EditUser />} />
              <Route path='new' element={<NewUserForm />} />
            </Route>

            <Route path='notes'>
              <Route index element={<NotesList />} />
              <Route path=':id' element={<EditNote />} />
              <Route path='new' element={<NewNoteForm />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
