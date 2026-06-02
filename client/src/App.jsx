import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard";
import Submissions from "./pages/Submissions";
import Export from "./pages/Export";
import Settings from "./pages/Settings";
import Logs from "./pages/Logs";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="submissions" element={<Submissions />} />
          <Route path="export" element={<Export />} />
          <Route path="settings" element={<Settings />} />
          <Route path="logs" element={<Logs />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;