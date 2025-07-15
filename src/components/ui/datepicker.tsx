import * as React from "react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder,
  className,
  id,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    value ? new Date(value) : null
  );
  const [displayValue, setDisplayValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const calendarRef = React.useRef<HTMLDivElement>(null);

  // Update display value when value prop changes
  React.useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setDisplayValue(formatDateForDisplay(date));
    } else {
      setSelectedDate(null);
      setDisplayValue("");
    }
  }, [value]);

  // Close calendar when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDateForDisplay = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateForSubmission = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    const formattedDisplay = formatDateForDisplay(date);
    const formattedSubmission = formatDateForSubmission(date);
    setDisplayValue(formattedDisplay);
    onChange?.(formattedSubmission);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDate(null);
    setDisplayValue("");
    onChange?.("");
  };

  const generateCalendar = () => {
    const currentDate = selectedDate || new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === today.toDateString();
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <button
          key={i}
          type="button"
          onClick={() => handleDateSelect(date)}
          className={cn(
            "w-8 h-8 text-sm hover:bg-blue-100 rounded",
            !isCurrentMonth && "text-gray-400",
            isToday && "bg-blue-500 text-white hover:bg-blue-600",
            isSelected && !isToday && "bg-blue-100 text-blue-700",
            isCurrentMonth && !isToday && !isSelected && "text-gray-900"
          )}
        >
          {date.getDate()}
        </button>
      );
    }

    return days;
  };

  const navigateMonth = (direction: number) => {
    const currentDate = selectedDate || new Date();
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setSelectedDate(newDate);
  };

  const currentMonth = selectedDate || new Date();
  const monthNames = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={displayValue}
        placeholder={placeholder || "เลือกวันที่"}
        onClick={handleInputClick}
        readOnly
        className={cn(
          "flex h-9 w-full min-w-0 rounded-md border border-input bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none cursor-pointer",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
          className
        )}
      />

      {displayValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}

      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              ←
            </button>
            <span className="font-medium">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((day) => (
              <div
                key={day}
                className="w-8 h-8 text-sm font-medium text-center text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">{generateCalendar()}</div>
        </div>
      )}
    </div>
  );
}
