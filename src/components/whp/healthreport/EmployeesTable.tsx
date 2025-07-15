import React, { useMemo, useState } from "react";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import {
  IconEye,
  IconEdit,
  IconTrash,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { MantineProvider, Button, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { Select } from "@/components/select";
import Image from "next/image";

interface EmployeeData {
  id: string;
  employeeCode: string;
  name: string;
  position: string;
  statusBMI: "DANGER" | "WARNING" | "NORMAL" | string;
  statusBloodPressure: "DANGER" | "WARNING" | "NORMAL" | string;
  statusCholesterol: "DANGER" | "WARNING" | "NORMAL" | string;
  statusBloodSugar: "DANGER" | "WARNING" | "NORMAL" | string;
  statusMentalHealth: "DANGER" | "WARNING" | "NORMAL" | string;
  statusOverall: "DANGER" | "WARNING" | "NORMAL" | string;
}

interface TableProps {
  data: EmployeeData[];
  itemsPerPage?: number;
  isLoading?: boolean;
}

const StatusDot = ({
  status,
}: {
  status: "DANGER" | "WARNING" | "NORMAL" | string;
}) => {
  const colorClasses = {
    DANGER: "bg-red-500",
    WARNING: "bg-yellow-500",
    NORMAL: "bg-green-500",
  };

  // Handle case where status might be "-" or undefined - show gray dot
  const colorClass =
    colorClasses[status as keyof typeof colorClasses] || "bg-gray-500";

  return (
    <div className="flex justify-center">
      <div className={`w-3 h-3 rounded-full ${colorClass}`} />
    </div>
  );
};

export default function EmployeesTable({
  data,
  itemsPerPage = 10,
  isLoading = false,
}: TableProps) {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(itemsPerPage);
  const [pageIndex, setPageIndex] = useState(0);

  const totalData = data?.length || 0;
  const totalPages = Math.ceil(totalData / pageSize);
  const currentPage = pageIndex + 1;
  const startIndex = pageIndex * pageSize + 1;
  const endIndex = Math.min((pageIndex + 1) * pageSize, totalData);

  const columns = useMemo<MRT_ColumnDef<EmployeeData>[]>(
    () => [
      {
        accessorKey: "employeeCode",
        header: "ID",
        size: 80,
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "ชื่อ-นามสกุล",
        size: 150,
        enableSorting: false,
      },
      {
        accessorKey: "position",
        header: "ตำแหน่ง",
        size: 150,
        enableSorting: false,
      },
      {
        accessorKey: "statusBMI",
        header: "สถานะสุขภาพ ค่า BMI",
        enableSorting: true,
        size: 120,
        Cell: ({ cell }) => (
          <StatusDot
            status={cell.getValue<"DANGER" | "WARNING" | "NORMAL" | string>()}
          />
        ),
      },
      {
        accessorKey: "statusBloodPressure",
        header: "สถานะสุขภาพไขมันคอเลสเตอรอล",
        enableSorting: true,
        size: 120,
        Cell: ({ cell }) => (
          <StatusDot
            status={cell.getValue<"DANGER" | "WARNING" | "NORMAL" | string>()}
          />
        ),
      },
      {
        accessorKey: "statusCholesterol",
        header: "สถานะสุขภาพไขมันไตรกลีเซอไรด์",
        enableSorting: true,
        size: 120,
        Cell: ({ cell }) => (
          <StatusDot
            status={cell.getValue<"DANGER" | "WARNING" | "NORMAL" | string>()}
          />
        ),
      },
      {
        accessorKey: "statusBloodSugar",
        header: "สถานะสุขภาพน้ำตาลในเลือด",
        enableSorting: true,
        size: 120,
        Cell: ({ cell }) => (
          <StatusDot
            status={cell.getValue<"DANGER" | "WARNING" | "NORMAL" | string>()}
          />
        ),
      },
      {
        accessorKey: "statusMentalHealth",
        header: "สถานะสุขภาพความดันโลหิต",
        enableSorting: true,
        size: 120,
        Cell: ({ cell }) => (
          <StatusDot
            status={cell.getValue<"DANGER" | "WARNING" | "NORMAL" | string>()}
          />
        ),
      },
      {
        accessorKey: "statusOverall",
        header: "สถานะสุขภาพรอบเอว",
        enableSorting: true,
        size: 120,
        Cell: ({ cell }) => (
          <StatusDot
            status={cell.getValue<"DANGER" | "WARNING" | "NORMAL" | string>()}
          />
        ),
      },
      {
        accessorKey: "Action",
        header: "แก้ไข | ลบ | ดู",
        size: 120,
        enableSorting: false,
        Cell: ({ cell }) => (
          <div className="action-buttons-container">
            <button className="action-button-edit">
              <IconEdit className="action-button-icon" />
            </button>
            |
            <button className="action-button-delete">
              <IconTrash className="action-button-icon" />
            </button>
            |
            <button
              className="action-button-view"
              onClick={() => {
                router.push(`/whp/detail/${cell.row.original.id}`);
              }}
            >
              <IconEye className="action-button-icon" />
            </button>
          </div>
        ),
      },
    ],
    [router]
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
      <div className="employees-table-wrapper">
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
              column.id === "id" ||
              column.id === "name" ||
              column.id === "position"
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
          renderEmptyRowsFallback={() =>
            isLoading ? (
              <div className="employees-table-empty-state">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>{" "}
                  <div className="text-gray-900 mt-5">กำลังโหลดข้อมูล...</div>
                </div>
              </div>
            ) : (
              <div className="employees-table-empty-state">
                <Image
                  src="/images/no-data.png"
                  alt="No data available"
                  width={400}
                  height={300}
                  className="employees-table-empty-image"
                />
              </div>
            )
          }
        />

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
      </div>
    </MantineProvider>
  );
}
