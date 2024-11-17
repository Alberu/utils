import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { pages } from "./utils";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {pages.map((page) => (
            <Route
              key={page.id}
              path={`/${page.id}`}
              element={
                <Suspense fallback={<div>Loading page...</div>}>
                  {React.createElement(
                    lazy(page.component)
                  )}
                </Suspense>
              }
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
