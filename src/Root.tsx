import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePages } from './Pages/HomePages';
import { PeoplePages } from './Pages/PeoplePages';
import { PeopleProvider } from './store/PeopleContext';
import { ErrorPage } from './Pages/ErrorPage';

export const Root = () => {
  return (
    <PeopleProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePages />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="people" element={<PeoplePages />}>
              <Route path=":slug" element={<Navigate to="people" />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </PeopleProvider>
  );
};
