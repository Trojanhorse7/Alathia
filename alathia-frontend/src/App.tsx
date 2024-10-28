import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

//Routes 
import Home from "pages/Home";

function App() {
  
  return (
    <div className="carvist">
      <Toaster richColors position="top-right" closeButton />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
