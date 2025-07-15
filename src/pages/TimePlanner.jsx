import PageLayout from "@/components/PageLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";

export const meta = {
  title: "Weekly Time Planner",
  description: "Change text into numbers and vice versa",
};

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Cypher() {
  const getDefaultTimeEntries = () => {
    return daysOfWeek.reduce((acc, day) => {
      const isWeekend = day === "Sat" || day === "Sun";
      acc[day] = {
        start: isWeekend ? "" : "08:00",
        end: isWeekend ? "" : "17:00",
      };
      return acc;
    }, {});
  };

  const [timeEntries, setTimeEntries] = useState(() => {
    const stored = localStorage.getItem("temp");
    try {
      const parsed = JSON.parse(stored);

      // Basic structural validation
      const isValid =
        parsed &&
        typeof parsed === "object" &&
        daysOfWeek.every(
          (day) =>
            parsed[day] &&
            typeof parsed[day].start === "string" &&
            typeof parsed[day].end === "string"
        );

      return isValid ? parsed : getDefaultTimeEntries();
    } catch (error) {
      return getDefaultTimeEntries();
    }
  });

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

  useEffect(() => {
    if (!localStorage) return;
    localStorage.setItem("temp", JSON.stringify(timeEntries));
  }, [timeEntries]);

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead>Start</TableHead>
              <TableHead></TableHead>
              <TableHead>End</TableHead>
              <TableHead>Worked</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {daysOfWeek.map((day) => {
              const dailyMinutes = getWorkedMinutesForDay(day);
              const formattedDaily = formatHHMM(dailyMinutes);

              return (
                <TableRow key={day}>
                  <TableCell className="font-medium">{day}</TableCell>
                  <TableCell>
                    <input
                      type="time"
                      value={timeEntries[day].start}
                      onChange={(e) =>
                        handleChange(day, "start", e.target.value)
                      }
                      className="border rounded p-1 w-full"
                    />
                  </TableCell>
                  <TableCell>to</TableCell>
                  <TableCell>
                    <input
                      type="time"
                      value={timeEntries[day].end}
                      onChange={(e) => handleChange(day, "end", e.target.value)}
                      className="border rounded p-1 w-full"
                    />
                  </TableCell>
                  <TableCell>
                    {dailyMinutes > 0 ? formattedDaily : "--:--"}
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() => resetDay(day)}
                      className="text-blue-600 hover:underline"
                    >
                      Reset
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="mt-6 text-lg font-semibold">
          Total Time: <span className="text-blue-600">{totalWorked}</span>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Reset All
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
