import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";
import TruckForm from "../components/TruckForm";
import { STATUS_COLORS, truckDataPanel } from "../constants/staticData";
import { Button } from "@/components/ui/button";
import axios from "axios";
import ConfirmationDialog from "@/components/ConfirmationDialog";

const TripHistoryPage = () => {
  const [localStore, setlocalStore] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { accessorKey: "truckNo", header: "TRUCK NO" },
    {
      accessorKey: "status",
      header: "STATUS",
      enableSorting: true,
    },
    { accessorKey: "currentLocation", header: "CURRENT LOCATION" },
    { accessorKey: "trip", header: "TRIP" },
    {
      accessorKey: "day",
      header: "DAY",
    },
    {
      id: "updatedAt", // REQUIRED when using accessorFn
      header: "Trip Completion",

      accessorFn: (row) => (row.updatedAt ? new Date(row.updatedAt) : null), // 👈 KEY FIX

      filterVariant: "date-range",
      filterFn: "between", // 👈 IMPORTANT
      sortingFn: "datetime",

      Cell: ({ cell }) => {
        const value = cell.getValue();
        if (!value) return "-";

        return value.toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
        });
      },
    },
  ];

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/trucks`
      );
      if (data.status === "error") {
        alert("Error fetching data from server");
        setIsLoading(false);
        return;
      }
      setlocalStore(data.filter((i) => i.tripStatus === "Completed"));
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="px-2 sm:px-12 py-6">
      <h2 className="text-2xl font-semibold text-blue-800 tracking-tight text-start mt-2 mb-6">
        History of Trips
      </h2>

      <MaterialReactTable
        columns={columns}
        data={localStore}
        enableRowActions
        enableColumnFilters
        initialState={{
          density: "compact",
          sorting: [{ id: "updatedAt", desc: true }],
          // isFullScreen: true,
        }}
        state={{ isLoading }}
        muiTableHeadRowProps={{
          sx: {
            backgroundColor: "#1976d2",
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            color: "#fff",
            fontWeight: "bold",
          },
        }}
        renderDetailPanel={({ row }) => {
          const deliveries = row.original.deliveries;
          if (!deliveries || deliveries.length === 0)
            return <Box p={2}>No deliveries</Box>;
          return (
            <Box pb={2} pt={0} mt={0} className="flex justify-center">
              <table
                style={{
                  width: "60%",
                  borderCollapse: "collapse",
                }}
              >
                <thead style={{ backgroundColor: "#a5a0a06b" }}>
                  <tr>
                    <th style={{ border: "1px solid #ccc", padding: "4px" }}>
                      Delivery
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "4px" }}>
                      Location
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "4px" }}>
                      Party
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "4px" }}>
                      Weight
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {deliveries.map((d, idx) => {
                    return (
                      <tr key={idx}>
                        <td
                          style={{ border: "1px solid #ccc", padding: "4px" }}
                        >
                          {d.delivery}
                        </td>
                        <td
                          style={{ border: "1px solid #ccc", padding: "4px" }}
                        >
                          {d.location}
                        </td>
                        <td
                          style={{ border: "1px solid #ccc", padding: "4px" }}
                        >
                          {d.party}
                        </td>
                        <td
                          style={{ border: "1px solid #ccc", padding: "4px" }}
                        >
                          {d.weight}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {/* <Button
                className="bg-[#919191] ml-4 cursor-pointer"
                onClick={() => upDateFormData(row.original._id)}
              >
                Update
              </Button> */}
            </Box>
          );
        }}
      />
    </div>
  );
};

export default TripHistoryPage;
