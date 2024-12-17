import React from "react";
import { ResponsiveSankey } from "@nivo/sankey";
import { tmp } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const IncomeSankeyDiagram = ({ data }) => {
  // const data = {
  //   nodes: [
  //     { id: "A", color: "#f00" },
  //     { id: "B", color: "#ABAA99" },
  //     { id: "C", color: "#2ECE2E" },
  //     { id: "D", color: "#FA961" },
  //   ],
  //   links: [
  //     { source: "A", target: "B", value: 10 },
  //     { source: "A", target: "C", value: 15 },
  //     { source: "B", target: "D", value: 5 },
  //     { source: "C", target: "D", value: 20 }
  //   ]
  // };

  // const colorScheme = ["#1f77b4", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
  const colorScheme = ['#f00', '#FA961F', '#2ECE2E', '#ABAA99'];
  const getColor = (bar) => colorScheme[bar.index % 10];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sankey visualisation</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: "500px" }}>
          <ResponsiveSankey
            data={data}
            // margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
            align="justify"
            // colors={getColor}

            // colors={{ scheme: "category10" }}
            // colors={{ scheme: "paired" }}
            // colors={{ datum: "node.color" }}
            colors={(node) => {
              // console.log(node)
              return (node.color)}
            }
            // colors={node => node.nodeColor}
            sort={'input'}
            nodeOpacity={0.6}
            nodeHoverOthersOpacity={0.6}
            nodeThickness={30}
            nodeSpacing={2}
            nodeBorderWidth={0}
            nodeBorderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
            nodeBorderRadius={2}
            linkOpacity={0.5}
            linkHoverOthersOpacity={0.1}
            linkContract={0}
            enableLinkGradient={true}
            labelPosition="inside"
            labelOrientation="horizontal"
            labelPadding={16}
            labelTextColor={{ from: "color", modifiers: [["darker", 1]] }}
            motionConfig="wobbly"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default IncomeSankeyDiagram;
