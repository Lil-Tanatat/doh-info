// Health status indicators JSON data
const healthStatusIndicators = [
  {
    title: "ค่า BMI",
    status: "GOOD",
  },
  {
    title: "ไขมันคอเลสเตอรอล",
    status: "GOOD",
  },
  {
    title: "ไขมันไตรกลีเซอรอล",
    status: "GOOD",
  },
  {
    title: "น้ำตาลในเลือด",
    status: "RISK",
  },
  {
    title: "ความดันโลหิต",
    status: "GOOD",
  },
  {
    title: "รอบเอว",
    status: "SICK",
  },
];

// Helper function to get status color
const getStatusColor = (status: string) => {
  switch (status) {
    case "GOOD":
      return "bg-green-500";
    case "RISK":
      return "bg-yellow-500";
    case "SICK":
      return "bg-red-500";
    default:
      return "bg-primary";
  }
};

interface CompanyStatusProps {
  className?: string;
}

export default function CompanyStatus({ className }: CompanyStatusProps) {
  return (
    <div
      className={`mb-8 flex flex-col items-center justify-between gap-4 md:flex-row md:items-start ${
        className || ""
      }`}
    >
      <div className="flex flex-col text-center md:text-left">
        <div className="text-xl font-semibold">ระบบดำเนินงานสุขภาวะองค์กร</div>
        <div className="text-[2.5rem] font-semibold text-highlight">
          สถานประกอบการ
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <div className="flex flex-col items-center gap-4 rounded-lg p-4 md:flex-row">
          <div className="text-center font-semibold md:text-right ">
            สถานะสุขภาวะ
            <br />
            ของสถานประกอบการ
          </div>
          <div className="flex flex-wrap justify-center">
            {healthStatusIndicators.map((indicator, index) => {
              const isFirst = index === 0;
              const isLast = index === healthStatusIndicators.length - 1;

              return (
                <div
                  key={index}
                  className={`flex w-22 flex-col items-center border-gray-200 px-2 ${
                    isFirst ? "border-l-2" : ""
                  } ${!isLast ? "border-r-2" : ""}`}
                >
                  <div
                    className={`mb-2 h-5 w-5 rounded-full border-2 border-white shadow-sm ${getStatusColor(
                      indicator.status
                    )}`}
                  ></div>
                  <div className="flex h-10 w-full items-center justify-center text-center text-sm font-semibold leading-tight">
                    {indicator.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
