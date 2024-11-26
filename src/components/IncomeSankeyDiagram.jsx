import React from "react";
import { ResponsiveSankey } from "@nivo/sankey";
import { tmp } from "@/utils";

const App = () => {
  const data = {
    nodes: [
      { id: "A" },
      { id: "B" },
      { id: "C" },
      { id: "D" }
    ],
    links: [
      { source: "A", target: "B", value: 10 },
      { source: "A", target: "C", value: 15 },
      { source: "B", target: "D", value: 5 },
      { source: "C", target: "D", value: 20 }
    ]
  };

  return (
    <div style={{ height: "500px" }}>
      <ResponsiveSankey data={tmp} />
    </div>
  );
};

export default App;
