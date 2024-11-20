import { useState } from 'react'
import { Cell, Label, LabelList, Pie, PieChart, Sector } from "recharts"
import { ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

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
                    strokeWidth={5}
                    activeIndex={hoveredIndex}
                    onMouseEnter={handlePieEnter}
                    activeShape={({
                        outerRadius,
                        ...props
                    }) => (
                        <g>
                            <Sector {...props} outerRadius={(outerRadius || 0) + 10} />
                            {/* <Sector
                                {...props}
                                outerRadius={(outerRadius || 0) + 25}
                                innerRadius={(outerRadius || 0) + 12}
                            /> */}
                        </g>
                    )}
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={entry.name === 'Income Tax' ? "#ff0000" :
                                entry.name === 'National Insurance' ? '#FA961F': '#000'}
                        />
                    ))}

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
                                            className="fill-foreground text-2xl font-bold"
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