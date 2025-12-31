import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/LoginPage";
import AuthGuard from "./auth/AuthGuard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<AuthGuard />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
