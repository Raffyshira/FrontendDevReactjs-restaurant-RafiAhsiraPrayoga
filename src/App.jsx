// react router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Homepage from "@/pages/Homepage";

// pages view detail produk
import ViewDetail from "@/pages/view_detail/view_detail.jsx";

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/detail/:slug" element={<ViewDetail />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
