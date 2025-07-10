import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";

export const meta = {
  title: "Weekly Time Planner",
  description: "Change text into numbers and vice versa",
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function Cypher() {
  const getDefaultTimeEntries = () => {
    return daysOfWeek.reduce((acc, day) => {
      const isWeekend = day === "Saturday" || day === "Sunday";
      acc[day] = {
        start: isWeekend ? "" : "08:00",
        end: isWeekend ? "" : "17:00",
      };
      return acc;
    }, {});
  };

  const [timeEntries, setTimeEntries] = useState(getDefaultTimeEntries());

  const handleReset = () => {
    setTimeEntries(getDefaultTimeEntries());
  };

  const resetDay = (day) => {
    const defaultEntry = getDefaultTimeEntries()[day];
    setTimeEntries((prev) => ({
      ...prev,
      [day]: defaultEntry,
    }));
  };

  const handleChange = (day, type, value) => {
    setTimeEntries((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
      },
    }));
  };

  const getWorkedMinutesForDay = (day) => {
    const { start, end } = timeEntries[day];
    if (!start || !end) return 0;

    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;

    if (endTotal <= startTotal) return 0;

    let workedMinutes = endTotal - startTotal;

    if (workedMinutes > 30) {
      workedMinutes -= 30;
    }

    return workedMinutes;
  };

  const calculateTotalMinutes = () => {
    let totalMinutes = 0;

    daysOfWeek.forEach((day) => {
      totalMinutes += getWorkedMinutesForDay(day);
    });

    return totalMinutes;
  };

  const formatHHMM = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  const totalWorked = formatHHMM(calculateTotalMinutes());

  return (
    <PageLayout>
      <Card>
        <CardContent>
          <div className="max-w-xl mx-auto p-4 space-y-4">
            {daysOfWeek.map((day) => {
              const dailyMinutes = getWorkedMinutesForDay(day);
              const formattedDaily = formatHHMM(dailyMinutes);

              return (
                <div
                  key={day}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-2"
                >
                  <div className="flex justify-between sm:w-24 font-medium">
                    {day}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
                    <input
                      type="time"
                      value={timeEntries[day].start}
                      onChange={(e) =>
                        handleChange(day, "start", e.target.value)
                      }
                      className="border p-1 rounded w-full sm:w-28"
                    />
                    <span className="hidden sm:inline">to</span>
                    <input
                      type="time"
                      value={timeEntries[day].end}
                      onChange={(e) => handleChange(day, "end", e.target.value)}
                      className="border p-1 rounded w-full sm:w-28"
                    />
                  </div>

                  <div className="flex justify-between sm:justify-end items-center gap-2 sm:w-32 text-sm text-gray-700">
                    <span className="w-16 text-right">
                      {dailyMinutes > 0 ? formattedDaily : "--:--"}
                    </span>
                    <button
                      onClick={() => resetDay(day)}
                      className="text-blue-600 hover:underline whitespace-nowrap"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="mt-6 text-lg font-semibold">
              Total Time: <span className="text-blue-600">{totalWorked}</span>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleReset}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Reset to all
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
}
