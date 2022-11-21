import { Route, Routes } from 'react-router-dom';
import { DashLayout, Layout, Public } from './components';
import { ROLES } from './config/roles';
import { Login, PersistLogin, RequireAuth, Welcome } from './features/auth';
import { EditNote, NewNoteForm, NotesList } from './features/notes';
import { EditUser, NewUserForm, UsersList } from './features/users';
import { useTitle } from './hooks/useTitle';

function App() {
  useTitle('Pavel Tomilin');

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path='login' element={<Login />} />

        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route path='dash' element={<DashLayout />}>
              <Route index element={<Welcome />} />

              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />
                }
              >
                <Route path='users'>
                  <Route index element={<UsersList />} />
                  <Route path=':id' element={<EditUser />} />
                  <Route path='new' element={<NewUserForm />} />
                </Route>
              </Route>

              <Route path='notes'>
                <Route index element={<NotesList />} />
                <Route path=':id' element={<EditNote />} />
                <Route path='new' element={<NewNoteForm />} />
              </Route>
            </Route>
          </Route>
        </Route>
        {/*End Protected routes */}
      </Route>
    </Routes>
  );
}

export default App;
