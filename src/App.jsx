import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/LoginPage";
import TripHistoryPage from "./pages/TripHistoryPage";
import AuthGuard from "./auth/AuthGuard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        {/* Protected */}
        <Route element={<AuthGuard />}>
          <Route path="/home" element={<Home />} />
          <Route path="/trip-history" element={<TripHistoryPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
