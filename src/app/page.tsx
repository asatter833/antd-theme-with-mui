"use client";

import { Button, Segmented } from "antd";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useTheme } from "./themeprovider";
import Link from "next/link";
import { FiArrowLeft, FiEdit2, FiMoon, FiStar, FiSun } from "react-icons/fi";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { cn } from "@/lib/utils";

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
          <Button type="dashed" size={"small"} href={`/brands/${params.id}`}>
            View
          </Button>
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
    <main className="min-h-screen p-8 space-y-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row bg-primary p-4 rounded justify-center space-y-2 gap-4">
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
          <Button type="primary" icon={<FiArrowLeft />}>
            Go Back
          </Button>
        </div>
        <div className="h-64 max-w-6xl mx-auto p-4 my-4 rounded border border-primary-500">
          <DataGrid
            rows={rows}
            density="compact"
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            classes={{
              "row--borderBottom": "!hidden",
              columnHeader: "bg-primary-500 text-primary",
            }}
            className="bg-primary-500"
            getRowClassName={() =>
              cn(
                "hover:bg-primary-100 hover:bg-opacity-40 hover:text-primary cursor-pointer"
              )
            }
          />
        </div>
        <div className="flex flex-row bg- justify-center items-center space-x-4 my-4">
          {/* Icon examples */}
          <FiSun className="text-2xl text-primary" />
          <FiMoon className="text-2xl text-primary-500" />
          <FiStar className="text-2xl text-yellow-500" />
        </div>

        <div className="bg-primary-500 border border-primary-500 text-primary text-primary p-4 rounded ">
          Theme test - Current mode: {isDarkMode ? "Dark" : "Light"}
        </div>
        <div
          className="p-4 my-4 bg-primary-500 rounded text-primary"
          // style={{ backgroundColor: "var(--color-primary-500)" }}
        >
          Testing primary color var
        </div>
        <div
          className="p-6 my-6 text-primary rounded"
          style={{ backgroundColor: "var(--color-primary-500)" }}
        >
          This should have your primary color background
        </div>
        <div className="bg-primary-500 text-primary p-6 rounded mt-4">
          This uses tailwind bg-primary-500 class
        </div>
        <div className="bg-primary text-primary p-6 rounded mt-4">
          This uses tailwind bg-primary class
        </div>
      </div>
    </main>
  );
}
