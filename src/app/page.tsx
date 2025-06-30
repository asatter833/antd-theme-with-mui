"use client";

import { Button, Segmented } from "antd";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useTheme } from "./themeprovider";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "address", headerName: "Address", width: 350 },
  {
    field: "actions",
    type: "actions",
    flex: 1,
    minWidth: 150,
    getActions: (params) => [
      <GridActionsCellItem
        key={params.id}
        className="hover: bg-transparent"
        icon={
          <Link href={`/brands/${params.id}`}>
            <Button type="dashed" size={"small"}>
              View
            </Button>
          </Link>
        }
        label="Details"
      />,
      <GridActionsCellItem
        key={params.id}
        icon={
          <Link href={`/brands/${params.id}/edit`}>
            <FiEdit2 className="text-lg" />
          </Link>
        }
        label="Edit"
      />,
    ],
  },
];

const rows = [
  { id: 1, name: "John Doe", address: "456 Elm St" },
  { id: 2, name: "Jane Doe", address: "123 Main St" },
];

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();
  const value = isDarkMode ? "dark" : "light";

  const onChange = (val: string | string[]) => {
    if (val === "dark" && !isDarkMode) toggleTheme();
    else if (val === "light" && isDarkMode) toggleTheme();
  };

  return (
    <main className="min-h-screen p-8 bg-white dark:bg-neutral-900 space-y-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row bg-slate-100 dark:bg-neutral-800 p-4 rounded justify-center space-y-2 gap-4">
          <Segmented
            size="middle"
            shape="round"
            options={[
              { value: "light", icon: <SunOutlined /> },
              { value: "dark", icon: <MoonOutlined /> },
            ]}
            value={value}
            onChange={onChange}
          />
          <Button type="primary">Primary Button</Button>
          <Button>Default Button</Button>
          <Button type="dashed">Dashed Button</Button>
          <Button type="text">Text Button</Button>
          <Button type="link">Link Button</Button>
        </div>
        <div className="h-64 max-w-6xl mx-auto bg-slate-100 dark:bg-neutral-800 p-4 my-4 rounded shadow">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </div>

        <div className="bg-slate-100 dark:bg-neutral-800 text-black dark:text-white p-4 rounded transition-colors duration-300">
          Theme test - Current mode: {isDarkMode ? "Dark" : "Light"}
        </div>
      </div>
    </main>
  );
}
