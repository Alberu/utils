import React, { Suspense, lazy } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// need to do this for it to work with github pages?
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { pages } from "./utils";
import HomePage from "./components/HomePage";

const App = () => {
  // Import just the metadata
  const metaModules = import.meta.glob("@/pages/*.jsx", { 
    eager: true,
    import: 'meta'
  });

  // Set up the imports for the actual lazy loaded components
  const componentImports = import.meta.glob("@/pages/*.jsx");
  
  const pageRoutes = Object.entries(metaModules).map(([path, meta]) => {
    const componentName = path.match(/([^/]+)\.jsx$/)[1];
    
    const LazyComponent = React.lazy(() => componentImports[path]());
    
    const routePath = meta && meta.id ? `/${meta.id}` : `/${componentName.toLowerCase()}`;
    console.log(routePath)
    
    return {
      path: routePath,
      Component: LazyComponent,
      meta: meta || { title: componentName }  // Store the metadata
    };
  });

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {pageRoutes.map(({ path, Component }, i) => (
            <Route
              key={i}
              path={path}
              element={<Component />}
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
