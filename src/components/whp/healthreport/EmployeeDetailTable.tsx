import React, { useMemo } from "react";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
// import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";
import { MantineProvider } from "@mantine/core";
import Image from "next/image";

interface EmployeeData {
  title: string;
  result: number;
  standard: string | number;
  status: "SICK" | "RISK" | "GOOD";
  recommendation: string;
}

interface TableProps {
  data: EmployeeData[];
  itemsPerPage?: number;
}

const StatusDot = ({ status }: { status: "SICK" | "RISK" | "GOOD" }) => {
  const colorClasses = {
    SICK: "bg-red-500",
    RISK: "bg-yellow-500",
    GOOD: "bg-green-500",
  };

  return (
    <div className="flex justify-center">
      <div className={`w-3 h-3 rounded-full ${colorClasses[status]}`} />
    </div>
  );
};

export default function EmployeeDetailTable({
  data,
  itemsPerPage = 15,
}: TableProps) {
  const columns = useMemo<MRT_ColumnDef<EmployeeData>[]>(
    () => [
      // {
      //   accessorKey: "id",
      //   header: "ID",
      //   size: 80,
      // },
      {
        accessorKey: "title",
        header: "รายการ",
        size: 200,
        enableSorting: false,
      },
      {
        accessorKey: "result",
        header: "ค่า/ผลตรวจ",
        size: 150,
        Cell: ({ cell, row }) => {
          const value = cell.getValue<number>();
          const title = row.original.title.toLowerCase();

          // Format BMI values to 1 decimal place
          if (title.includes("bmi") || title.includes("ดัชนีมวลกาย")) {
            return value.toFixed(1);
          }

          return value;
        },
      },
      {
        accessorKey: "standard",
        header: "เกณฑ์ปกติ",
        size: 200,
      },

      {
        accessorKey: "status",
        header: "สถานะ",
        size: 120,
        enableSorting: false,
        Cell: ({ cell }) => (
          <StatusDot status={cell.getValue<"SICK" | "RISK" | "GOOD">()} />
        ),
      },
      {
        accessorKey: "recommendation",
        header: "คำแนะนำ",
        size: 300,
        enableSorting: false,
      },
    ],
    []
  );

  return (
    <MantineProvider
      theme={{
        fontFamily: "Noto Sans Thai",
      }}
    >
      <div className="bg-white rounded-xl shadow-none overflow-hidden">
        <MantineReactTable
          columns={columns}
          data={data || []}
          mantineTableProps={{
            striped: true,
            highlightOnHover: true,
            withTableBorder: false,
            withColumnBorders: false,
            className: "w-full employees-table",
            style: { borderRadius: "0.75rem" },
          }}
          mantineTableHeadProps={{
            className: "!bg-primary",
          }}
          mantineTableHeadCellProps={{
            className: "px-4 py-3 text-white !bg-highlight !font-normal",
            style: {
              whiteSpace: "pre-line",
              textAlign: "center",
              verticalAlign: "middle",
            },
          }}
          mantineTableBodyCellProps={({ column }) => ({
            className: `px-4 py-3 text-sm ${
              column.id === "id" ||
              column.id === "name" ||
              column.id === "position"
                ? "text-gray-900 text-left"
                : "text-center"
            }`,
          })}
          mantineTableBodyRowProps={({ renderedRowIndex }) => ({
            className: `border-b border-gray-200 hover:bg-gray-50 ${
              (renderedRowIndex ?? 0) % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`,
          })}
          mantinePaginationProps={{
            showRowsPerPage: false,
            className:
              "flex items-center justify-between px-4 py-3 border-t border-gray-200",
          }}
          initialState={{
            pagination: { pageSize: itemsPerPage, pageIndex: 0 },
          }}
          enableSorting={true}
          enableColumnFilters={false}
          enableGlobalFilter={false}
          enablePagination={false}
          enableRowSelection={false}
          enableColumnActions={false}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          enableTopToolbar={false}
          renderEmptyRowsFallback={() => (
            <div className="flex justify-center items-center py-16 w-full">
              <Image
                src="/images/no-data.png"
                alt="No data available"
                width={400}
                height={300}
                className="max-w-md w-auto h-auto opacity-80 mx-auto"
              />
            </div>
          )}
        />
      </div>
    </MantineProvider>
  );
}
