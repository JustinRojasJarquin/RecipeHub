import {
  Routes,
  Route
} from "react-router-dom";

import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRouter() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Auth />}
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRouter;