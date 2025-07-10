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
  const [timeEntries, setTimeEntries] = useState(
    daysOfWeek.reduce((acc, day) => {
      const isWeekend = day === "Saturday" || day === "Sunday";
      acc[day] = {
        start: isWeekend ? "" : "08:30",
        end: isWeekend ? "" : "17:00",
      };
      return acc;
    }, {})
  );

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
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Weekly Time Planner</h1>
      {daysOfWeek.map((day) => (
        <div key={day} className="flex items-center justify-between gap-2">
          <span className="w-24">{day}</span>
          <input
            type="time"
            value={timeEntries[day].start}
            onChange={(e) => handleChange(day, "start", e.target.value)}
            className="border p-1 rounded"
          />
          <span>to</span>
          <input
            type="time"
            value={timeEntries[day].end}
            onChange={(e) => handleChange(day, "end", e.target.value)}
            className="border p-1 rounded"
          />
        </div>
      ))}
      <div className="mt-6 text-lg font-semibold">
        Total Time: <span className="text-blue-600">{totalWorked}</span>
      </div>
    </div>
  );
}
