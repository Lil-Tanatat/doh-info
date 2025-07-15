import React, { useMemo, useState } from "react";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { MantineProvider, Button, Text } from "@mantine/core";
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { Select } from "@/components/select";
import Image from "next/image";
import { formatThaiDate } from "@/lib/utils";

interface ImportedEmployeeData {
  row_number: number;
  employee_code: string;
  tax_id: string;
  first_name: string;
  last_name: string;
  job_position: string;
  birth_date: string;
  gender: string;
  age: string | number;
  nationality: string;
  marital_status: string;
  weight_kg: number | string;
  height_cm: number | string;
  waist_cm: number | string;
  underlying_disease: string;
  bmi: number | string;
  blood_pressure_systolic: number | string;
  blood_pressure_diastolic: number | string;
  blood_sugar: number | string;
  cholesterol: number | string;
  triglyceride: string;
  health_behavior?: string | null;
  status: string;
  remark?: string | null;
}

interface TableProps {
  data: ImportedEmployeeData[];
  itemsPerPage?: number;
}

export default function ImportPreviewTable({
  data,
  itemsPerPage = 10,
}: TableProps) {
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [pageIndex, setPageIndex] = useState(0);

  const totalData = data?.length || 0;
  const totalPages = Math.ceil(totalData / pageSize);
  const currentPage = pageIndex + 1;
  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min((pageIndex + 1) * pageSize, totalData);

  const columns = useMemo<MRT_ColumnDef<ImportedEmployeeData>[]>(
    () => [
      // {
      //   accessorKey: "row_number",
      //   header: "แถว",
      //   size: 60,
      //   enableSorting: false,
      // },
      {
        accessorKey: "status",
        header: "สถานะ",
        size: 100,
        enableSorting: false,
        Cell: ({ cell }) => {
          const status = cell.getValue<string>();
          const statusColor =
            status === "OK" ? "text-green-700" : "text-red-700";
          return (
            <div className="flex justify-center items-center w-full">
              <div className={` ${statusColor} w-5 h-5`}>
                <IconCheck />
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "employee_code",
        header: "รหัสพนักงาน",
        size: 120,
        enableSorting: false,
      },
      {
        accessorKey: "first_name",
        header: "ชื่อ",
        size: 100,
      },
      {
        accessorKey: "last_name",
        header: "นามสกุล",
        size: 100,
        enableSorting: false,
      },
      {
        accessorKey: "tax_id",
        header: "รหัสประจำตัวประชาชน",
        size: 150,
        enableSorting: false,
      },
      {
        accessorKey: "job_position",
        header: "ตำแหน่ง",
        size: 150,
        enableSorting: false,
      },
      {
        accessorKey: "gender",
        header: "เพศ",
        size: 80,
        enableSorting: false,
      },
      {
        accessorKey: "birth_date",
        header: "วันเกิด",
        size: 80,
        Cell: ({ cell }) => formatThaiDate(cell.getValue<string>()),
      },
      {
        accessorKey: "nationality",
        header: "สัญชาติ",
        size: 100,
      },
      {
        accessorKey: "weight_kg",
        header: "น้ำหนัก (กก.)",
        size: 100,
      },
      {
        accessorKey: "height_cm",
        header: "ส่วนสูง (ซม.)",
        size: 100,
      },
      // {
      //   accessorKey: "bmi",
      //   header: "BMI",
      //   size: 80,
      // },
      {
        accessorKey: "blood_pressure_systolic",
        header: "ความดัน (ตัวบน)",
        size: 120,
      },
      {
        accessorKey: "blood_pressure_diastolic",
        header: "ความดัน (ตัวล่าง)",
        size: 120,
      },
      {
        accessorKey: "blood_sugar",
        header: "น้ำตาลในเลือด",
        size: 120,
      },
      {
        accessorKey: "cholesterol",
        header: "คอเลสเตอรอล",
        size: 120,
      },
      {
        accessorKey: "noted",
        header: "หมายเหตุ",
        size: 120,
      },
    ],
    []
  );

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    if (value) {
      setPageSize(parseInt(value));
      setPageIndex(0); // Reset to first page when changing page size
    }
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex < totalPages - 1) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setPageIndex(page - 1);
  };

  const getVisiblePages = () => {
    const visiblePages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      // Always show first page
      visiblePages.push(1);

      if (currentPage > 3) {
        visiblePages.push("...");
      }

      // Show current page and surrounding pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!visiblePages.includes(i)) {
          visiblePages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        visiblePages.push("...");
      }

      // Always show last page
      if (!visiblePages.includes(totalPages)) {
        visiblePages.push(totalPages);
      }
    }

    return visiblePages;
  };

  return (
    <MantineProvider
      theme={{
        fontFamily: "Noto Sans Thai",
      }}
    >
      <div
        className="employees-table-wrapper"
        style={{ overflowX: "auto", maxWidth: "100%" }}
      >
        <MantineReactTable
          columns={columns}
          data={data || []}
          mantineTableProps={{
            striped: true,
            highlightOnHover: true,
            withTableBorder: false,
            withColumnBorders: false,
            className: "employees-table",
          }}
          mantineTableHeadProps={{
            className: "employees-table-head",
          }}
          mantineTableHeadCellProps={{
            className: "employees-table-head-cell",
          }}
          mantineTableBodyCellProps={({ column }) => ({
            className:
              column.id === "employee_code" ||
              column.id === "first_name" ||
              column.id === "last_name" ||
              column.id === "job_position"
                ? "employees-table-body-cell-left"
                : "employees-table-body-cell-center",
          })}
          mantineTableBodyRowProps={({ renderedRowIndex }) => ({
            className:
              (renderedRowIndex ?? 0) % 2 === 0
                ? "employees-table-body-row-even"
                : "employees-table-body-row-odd",
          })}
          state={{
            pagination: { pageSize, pageIndex },
          }}
          enableSorting={true}
          enableColumnFilters={false}
          enableGlobalFilter={false}
          enablePagination={true}
          enableRowSelection={false}
          enableColumnActions={false}
          enableDensityToggle={false}
          enableFullScreenToggle={false}
          enableTopToolbar={false}
          enableBottomToolbar={false}
          renderEmptyRowsFallback={() => (
            <div className="employees-table-empty-state">
              <Image
                src="/images/no-data.png"
                alt="No data available"
                width={400}
                height={300}
                className="employees-table-empty-image"
              />
            </div>
          )}
        />
      </div>

      {/* Custom Pagination */}
      <div className="flex justify-between items-center mt-4 px-4 py-3 bg-white border-t border-gray-200">
        {/* Left side - Data range */}
        <div className="flex items-center">
          <Text size="sm" className="text-gray-600 font-bold">
            {totalData > 0
              ? `${startIndex}-${endIndex} จาก ${totalData} รายการ`
              : "0 จาก 0 รายการ"}
          </Text>
        </div>

        {/* Right side - Controls */}
        <div className="flex items-center gap-4">
          {/* Items per page dropdown */}
          <div className="flex items-center gap-2">
            <Text size="sm" className="text-gray-600">
              แสดง
            </Text>
            <Select
              options={["5", "10", "20", "30", "40", "50"]}
              value={pageSize.toString()}
              onChange={handlePageSizeChange}
              className="border-gray-200 border-2 rounded-md w-20 focus:outline-none h-10"
            />
          </div>

          {/* Pagination controls */}
          <div className="flex items-center">
            <Button
              className="cursor-pointer"
              variant="outline"
              size="sm"
              onClick={handlePrevPage}
              disabled={pageIndex === 0}
            >
              <div className="flex items-center gap-2">
                <IconChevronLeft /> ก่อนหน้า
              </div>
            </Button>

            <div className="flex items-center mx-2">
              {getVisiblePages().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 py-1 text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page as number)}
                    className={`px-3 py-1 rounded min-w-[40px] text-center mx-1 transition-colors ${
                      currentPage === page
                        ? "bg-highlight text-white border-highlight"
                        : "bg-white text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={pageIndex >= totalPages - 1}
            >
              <div className="flex items-center gap-2">
                ถัดไป <IconChevronRight />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}
