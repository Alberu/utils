import { useState } from 'react'
import { Cell, Label, LabelList, Pie, PieChart, Sector } from "recharts"
import { ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// still need to figure out how this works really
const chartConfig = {
    takehometax: {
        label: "Take-Home Pay",
        color: "hsl(var(--chart-1))",
    },
    incometax: {
        label: "IncomeTax",
        color: "hsl(var(--chart-2))",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-3))",
    },
}

const CircularPieChart = ({ chartData }) => {
    const [hoveredIndex, setHoveredIndex] = useState(0)

    const handlePieEnter = (_, index) => {
        setHoveredIndex(index)
    }

    const displayedData = chartData[hoveredIndex]

    // const totalValue = chartData.reduce((sum, item) => sum + item.value, 0)

    // const RADIAN = Math.PI / 180;
    // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    //     const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
    //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

    //     return (
    //         <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    //             {`${(percent * 100).toFixed(0)}%`}
    //         </text>
    //     );
    // };

    const renderCustomizedLabel = ({ percent }) => {
        if (!percent) return null;
        return `${(percent * 100).toFixed(0)}%`;
      };

    return (
        <ChartContainer
            id="pie-chart"
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[300px]"
        >
            <PieChart>
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    stroke='#fff'
                    strokeWidth={5}
                    animationBegin={0}
                    animationDuration={500}
                    activeIndex={hoveredIndex}
                    label={renderCustomizedLabel}
                    labelLine={false}
                    onMouseEnter={handlePieEnter}
                    activeShape={({ outerRadius, ...props }) => (
                        <g>
                            <Sector {...props}
                                outerRadius={(outerRadius || 0) + 10} />
                            <Sector
                                {...props}
                                outerRadius={(outerRadius || 0) + 18}
                                innerRadius={(outerRadius || 0) + 14}
                            />
                        </g>
                    )}
                >
                    {/* <LabelList
                        dataKey="value"
                        position="inside"
                        stroke='none'
                        style={{
                            fill: 'white',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}
                        formatter={(value) => `${value}%`}
                    /> */}
                    {chartData.map((entry, index) => {
                        // const percentage = ((entry.value / totalValue) * 100).toFixed(1)
                        return (
                            <Cell key={`cell-${index}`} fill={entry.colour}>
                            </Cell>
                        )
                    })}


                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-2xl font-bold bg-white"
                                        >
                                            {displayedData?.value.toLocaleString()}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                        >
                                            {displayedData?.name}
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </Pie>
            </PieChart>
        </ChartContainer>
    )
}

export default CircularPieChart