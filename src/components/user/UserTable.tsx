import React, { useMemo } from "react";
import { MantineReactTable, type MRT_ColumnDef } from "mantine-react-table";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { MantineProvider } from "@mantine/core";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface EmployeeData {
  id: string;
  name: string;
  email: string;
  username: string;
  nationalId: string;
  job_position: string;
  role: string;
}

interface TableProps {
  data: EmployeeData[];
  itemsPerPage?: number;
}

export default function UserTable({ data, itemsPerPage = 15 }: TableProps) {
  const router = useRouter();
  const columns = useMemo<MRT_ColumnDef<EmployeeData>[]>(
    () => [
      {
        accessorKey: "name",
        header: "ชื่อ-นามสกุล",
        size: 200,
      },
      // {
      //   accessorKey: "email",
      //   header: "อีเมล",
      //   size: 200,
      // },
      {
        accessorKey: "username",
        header: "ชื่อผู้ใช้งาน",
        size: 150,
      },
      {
        accessorKey: "nationalId",
        header: "เลขบัตรประจำตัวประชาชน",
        size: 200,
      },
      {
        accessorKey: "job_position",
        header: "ตำแหน่ง",
        size: 150,
      },
      {
        accessorKey: "role",
        header: "บทบาทการใช้งาน",
        size: 150,
      },
      {
        accessorKey: "Action",
        header: "แก้ไข | ลบ",
        size: 120,
        Cell: ({ row }) => (
          <div className="flex gap-2 items-center justify-center">
            <button
              className="p-1 text-gray-500 hover:text-green-600 transition-colors"
              onClick={() => {
                router.push(`/user/edit/${row.original.id}`);
              }}
            >
              <IconEdit className="w-5 h-5" />
            </button>
            |
            <button className="p-1 text-gray-500 hover:text-red-600 transition-colors">
              <IconTrash className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    [router]
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
            className: "w-full",
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
              column.id === "id" || column.id === "name"
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
          enableSorting={false}
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
