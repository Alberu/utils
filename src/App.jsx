import React, { Suspense, lazy } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// need to do this for it to work with github pages?
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { pages } from "./utils";
import HomePage from "./components/HomePage";

const App = () => {
  const modules = import.meta.glob("@/pages/*.jsx");

  const components = Object.values(modules).map((mod) => ({
    Component: mod.default,
    meta: mod.meta || { title: "Untitled", description: "" },
  }));

  const pageRoutes = Object.entries(modules).map(([path, importFn]) => {
    // Extract component name from path
    console.log(path)
    const componentName = path.match(/([^/]+)\.jsx$/)[1];
    console.log(componentName)
    
    // Create a lazy-loaded component for this path
    const LazyComponent = React.lazy(importFn);
    
    return {
      path: `/${componentName.toLowerCase()}`,
      Component: LazyComponent,
      // We'll load the meta when the component is actually rendered
    };
  });
  console.log(pageRoutes)

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* {components.map(({ Component, meta }, i) => {
            const slug = meta.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <Route
                key={i}
                path={`/${slug}`}
                element={<Component />}
              />
            );
          })} */}
          {pageRoutes.map(({ path, Component }, i) => (
            <Route
              key={i}
              path={path}
              element={<Component />}
            />
          ))}
          {/* {components.map(({ Component, meta }, i) => {
            return (
              <Route
                key={i}
                path={`/${meta.title}`}
                element={
                  <Suspense fallback={<div>Loading page...</div>}>
                    {React.createElement(lazy(Component))}
                  </Suspense>
                }
              />
            );
          })} */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
