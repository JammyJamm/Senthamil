import { Main } from "./Main";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouterNav from "./RouterNav";
import { Laddu } from "./Laddu";
import { Sabi } from "./Sabi";
import { LadduAddData } from "./LadduAddData";
export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RouterNav />}>
          <Route index element={<Main />} />
          <Route path="senthamil" element={<Main />} />
          <Route path="sabi" element={<Sabi />} />
          <Route path="laddu" element={<Laddu />} />
          <Route path="ladduAddData" element={<LadduAddData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
