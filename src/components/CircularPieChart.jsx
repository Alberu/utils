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
    const sortedChartData = chartData.sort((a, b) => b.value - a.value)
    const [hoveredIndex, setHoveredIndex] = useState(0)

    const handlePieEnter = (_, index) => {
        setHoveredIndex(index)
    }

    const displayedData = sortedChartData[hoveredIndex]

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
                    data={sortedChartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    stroke='#000'
                    strokeWidth={0.5}
                    animationBegin={0}
                    animationDuration={500}
                    activeIndex={hoveredIndex}
                    label={renderCustomizedLabel}
                    labelLine={false}
                    onMouseEnter={handlePieEnter}
                    opacity={0.6}
                    activeShape={({ outerRadius, innerRadius, ...props }) => (
                        <g>
                            {/* <Sector
                                {...props}
                                outerRadius={(outerRadius || 0) - 10}
                                innerRadius={(innerRadius || 0)}
                            />
                            <Sector
                                {...props}
                                outerRadius={(outerRadius || 0)}
                                innerRadius={(outerRadius || 0) - 5}
                                fill='#000'
                            /> */}
                            <Sector
                                {...props}
                                outerRadius={(outerRadius || 0)}
                                innerRadius={(innerRadius || 0)}
                                opacity={0.6}
                            />
                            <Sector
                                {...props}
                                outerRadius={(outerRadius || 0) - 10}
                                innerRadius={(innerRadius || 0)}
                                opacity={1}
                            />
                        </g>
                    )}
                >
                    {sortedChartData.map((entry, index) => {
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
                                        // style={{fill: displayedData?.colour}}
                                        >
                                            {displayedData?.value.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                            style={{ fill: displayedData?.colour }}
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