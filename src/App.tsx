import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "react-hot-toast";
// import { Sonner } from "sonner";
import JobCampaign from "./pages/campaign/JobCampaign";

const AppRoutes = () => {
  return (
    <>
      {/* <ScrollToTop /> */}
      {/* <Suspense fallback={<PageLoader />}> */}
      <Routes>
        <Route path="/" element={<JobCampaign />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* </Suspense> */}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
