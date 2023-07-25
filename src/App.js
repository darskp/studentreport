import Chapters from "./components/chapters/chapters";
import { BrowserRouter,Router,Route, Routes } from "react-router-dom";
import SortableTable from "./components/studentwisePerformance/StudentwisePerformance";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Chapters/>}/>
      <Route path="/student-performance" element={<SortableTable/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
