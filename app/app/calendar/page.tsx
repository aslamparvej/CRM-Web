"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// day-of-month -> events, keyed relative to the displayed month for demo purposes
const sampleEvents: Record<number, { title: string; time: string }[]> = {
  6: [{ title: "Demo — J. Alvarez", time: "11:00 AM" }],
  9: [{ title: "Quarterly check-in — Northwind", time: "2:00 PM" }],
  12: [
    { title: "Proposal review — Acme Co", time: "9:30 AM" },
    { title: "Team pipeline review", time: "4:00 PM" },
  ],
  18: [{ title: "Renewal call — Basalt Labs", time: "1:00 PM" }],
};

const CalendarPage = () => {
     const [cursor, setCursor] = useState(new Date());
 
  const { weeks, monthLabel, today } = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const today = new Date();
 
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
 
    const cells: (number | null)[] = [
      ...Array(startOffset).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);
 
    const weeks: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
 
    const monthLabel = firstDay.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
 
    return { weeks, monthLabel, today };
  }, [cursor]);
  const isCurrentMonth =
    cursor.getMonth() === new Date().getMonth() &&
    cursor.getFullYear() === new Date().getFullYear();
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">{monthLabel}</h2>
          <div className="flex items-center gap-1">
            <button
              onClick={() =>
                setCursor(
                  new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1),
                )
              }
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() =>
                setCursor(
                  new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1),
                )
              }
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-7 gap-1">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="py-2 text-center font-data text-[11px] uppercase tracking-wider text-muted-foreground"
            >
              {day}
            </div>
          ))}

          {weeks.flat().map((day, i) => {
            const isToday = isCurrentMonth && day === today.getDate();
            const events =
              day && isCurrentMonth ? sampleEvents[day] : undefined;

            return (
              <div
                key={i}
                className={cn(
                  "flex min-h-21 flex-col gap-1 rounded-lg border border-transparent p-2 text-sm",
                  day && "hover:border-border",
                )}
              >
                {day && (
                  <>
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-full font-data text-xs",
                        isToday
                          ? "bg-[#EEB30D] font-semibold text-[#15130B]"
                          : "text-foreground/70",
                      )}
                    >
                      {day}
                    </span>
                    <div className="space-y-1">
                      {events?.slice(0, 2).map((event) => (
                        <p
                          key={event.title}
                          className="truncate rounded bg-[#FDF3D9] px-1.5 py-0.5 text-[11px] text-[#8A5F06]"
                        >
                          {event.title}
                        </p>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="font-display text-base font-semibold">Upcoming</h2>
        <div className="mt-4 space-y-4">
          {Object.entries(sampleEvents).map(([day, events]) =>
            events.map((event) => (
              <div key={`${day}-${event.title}`} className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 flex-col items-center justify-center rounded-lg bg-[#FDF3D9] font-data text-[#8A5F06]">
                  <span className="text-[10px] leading-none">AUG</span>
                  <span className="text-sm font-semibold leading-none">
                    {day}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.time}</p>
                </div>
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
