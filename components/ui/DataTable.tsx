"use client";

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useTheme } from "@/components/ThemeProvider";

interface Column {
  key: string;
  label: string;
  align?: "start" | "center" | "end";
}

interface DataTableProps<T> {
  columns: Column[];
  data: T[];
  renderCell: (item: T, columnKey: string) => React.ReactNode;
  ariaLabel?: string;
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  renderCell,
  ariaLabel = "Data table",
}: DataTableProps<T>) {
  const { theme } = useTheme();

  return (
    <>
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden md:block w-full overflow-x-auto">
        <Table
          aria-label={ariaLabel}
          classNames={{
            base: "min-w-full",
            wrapper: theme === "dark" ? "bg-dark-50 rounded-md" : "bg-white rounded-md",
            th: theme === "dark"
              ? "bg-black text-gray-400 border-b border-gray-800"
              : "bg-gray-50 text-gray-700 border-b border-gray-200",
            td: theme === "dark" ? "text-gray-300" : "text-gray-700",
            tr: theme === "dark"
              ? "border-b border-gray-800 hover:bg-gray-800/50"
              : "border-b border-gray-200 hover:bg-gray-50",
          }}
          style={{
            backgroundColor: theme === "dark" ? '#1a1a1a' : '#ffffff',
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                align={column.align || "center"}
                className="uppercase text-xs p-3 font-medium whitespace-nowrap"
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={data}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell className="whitespace-nowrap">
                    {renderCell(item, columnKey as string)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View - Visible only on mobile */}
      <div className="md:hidden space-y-3 p-4">
        {data.map((item) => {
          // Check if first column contains an image/avatar
          const firstColumnContent = renderCell(item, columns[0].key);
          const hasAvatar = React.isValidElement(firstColumnContent) &&
            Array.isArray((firstColumnContent.props as any)?.children) &&
            (firstColumnContent.props as any).children.some((child: any) =>
              React.isValidElement(child) && child.type === 'img'
            );

          return (
            <div
              key={item.id}
              className={`rounded-lg border p-4 ${theme === "dark"
                  ? "bg-dark-50 border-gray-800 hover:bg-gray-800/50"
                  : "bg-white border-gray-200 hover:bg-gray-50"
                } transition-colors`}
            >
              {/* Show first column (name/avatar) at top if it has an avatar */}
              {hasAvatar && (
                <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-700">
                  {renderCell(item, columns[0].key)}
                </div>
              )}

              {/* Rest of the fields */}
              <div className="space-y-3">
                {columns.slice(hasAvatar ? 1 : 0).map((column) => (
                  <div key={column.key} className="flex justify-between items-start gap-3">
                    <span
                      className={`text-xs font-medium uppercase flex-shrink-0 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                      {column.label}
                    </span>
                    <div className="text-right flex-1 flex justify-end">{renderCell(item, column.key)}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
