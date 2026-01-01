import React, { useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Box } from "@mui/material";
import TruckForm from "../components/TruckForm";
import { STATUS_COLORS, truckDataPanel } from "../constants/staticData";
import { Button } from "@/components/ui/button";
import axios from "axios";
import ConfirmationDialog from "@/components/ConfirmationDialog";

const TruckTable2Page = () => {
  const [localStore, setlocalStore] = useState([]);
  const [updatedId, setUpdatedId] = useState("");
  const [selectBg, setSelectBg] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [oneWayTripComplete, setOneWayTripComplete] = useState(false);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const columns = [
    { accessorKey: "truckNo", header: "TRUCK NO" },
    {
      accessorKey: "status",
      header: "STATUS",
      enableSorting: true,
      sortingFn: (rowA, rowB) => {
        const a = rowA.original.status;
        const b = rowB.original.status;

        if (
          a === "Waiting for order" ||
          (a === "Waiting for Return order" && b !== "Waiting for order") ||
          b === "Waiting for Return order"
        )
          return -1;
        if (
          (a !== "Waiting for order" &&
            a !== "Waiting for Return order" &&
            b === "Waiting for order") ||
          b === "Waiting for Return order"
        )
          return 1;
        return 0; // keep rest as-is
      },
      Cell: ({ cell }) => {
        const value = cell.getValue();
        const bgColor = STATUS_COLORS[value];
        return (
          <span
            style={{
              backgroundColor: bgColor,
              color: "#000",
              padding: "4px 10px",
              borderRadius: "12px",
              fontSize: "14 px",
              fontWeight: 500,
              whiteSpace: "nowrap",
              boxShadow: "0 3px 2px rgba(0,0,0,0.2)",
            }}
          >
            {value}
          </span>
        );
      },
    },
    { accessorKey: "currentLocation", header: "CURRENT LOCATION" },
    { accessorKey: "trip", header: "TRIP" },
    {
      accessorKey: "day",
      header: "DAY",
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return (
          <span
            style={{
              backgroundColor: value > 6 ? "#fb2c36d4" : "",
              color: "#000",
              padding: "4px 6px",
              borderRadius: "4px",
              fontSize: "14 px",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {value}
          </span>
        );
      },
    },
  ];

  const [deliveries, setDeliveries] = useState([
    { delivery: "", location: "", party: "", weight: "" },
  ]);

  const [formData, setFormData] = useState({
    selectedDelivery: "0",
    truckNo: "",
    status: "",
    currentLocation: "",
    trip: "",
    day: "",
  });

  const upDateFormData = async (val) => {
    const { status, data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/trucks/${val}`
    );
    if (status !== 200) return;
    setDeliveries(data?.deliveries);
    setUpdatedId(data?._id);
    setFormData({
      id: data._id,
      selectedDelivery: data?.selectedDelivery,
      truckNo: data.truckNo,
      status: data.status,
      currentLocation: data.currentLocation,
      trip: data.trip,
      day: data.day,
      tripId: data.tripId,
    });
    setSelectBg(true);
  };

  const handleTripConfirmation = async (oneWayTripId) => {
    try {
      const { status, data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/trucks/${oneWayTripId}`
      );
      if (status !== 200) return;
      const UpdatedDataWithCompleted = { ...data, tripStatus: "Completed" };

      const getUpdatedDataWithComplete = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/trucks/${oneWayTripId}`,
        UpdatedDataWithCompleted
      );
      if (getUpdatedDataWithComplete?.status === 200) {
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      console.error("Error While deleting Truck Oneway Trip: ", error);
    }
  };

  return (
    <div className="px-2 sm:px-12 py-6">
      <TruckForm
        localStore={localStore}
        setlocalStore={setlocalStore}
        deliveries={deliveries}
        setDeliveries={setDeliveries}
        formData={formData}
        setFormData={setFormData}
        updatedId={updatedId}
        setUpdatedId={setUpdatedId}
        setSelectBg={setSelectBg}
        selectBg={selectBg}
        setIsLoading={setIsLoading}
        setError={setError}
        setOneWayTripComplete={setOneWayTripComplete}
        refresh={refresh}
        setRefresh={setRefresh}
        setOpen={setOpen}
      />

      <MaterialReactTable
        columns={columns}
        data={localStore}
        enableRowActions
        enableExpanding
        initialState={{
          density: "compact",
          sorting: [{ id: "status", desc: false }],
          isFullScreen: true,
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
        muiTableBodyRowProps={({ row }) => ({
          onClick: () => {
            row.toggleExpanded();
          },
          sx: {
            cursor: "pointer",
          },
        })}
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
                      <tr
                        key={idx}
                        className={`${
                          row.original.selectedDelivery == idx
                            ? "bg-green-700 text-white"
                            : " text-dark"
                        } `}
                      >
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
              <Button
                className="bg-[#919191] ml-4 cursor-pointer"
                onClick={() => upDateFormData(row.original._id)}
              >
                Update
              </Button>
              {(row.original.status == "Unloading" ||
                row.original.status == "Delivery") &&
                row.original.selectedDelivery == deliveries.length - 1 && (
                  <ConfirmationDialog
                    open={open}
                    onOpenChange={setOpen}
                    handleTripConfirmation={handleTripConfirmation}
                    oneWayTripId={row.original._id} //  USING MONGODB _ID FOR ONEWAY TRIP ID !!!
                  />
                  // <Button
                  //   className="mt-8 ms-2 w-full sm:w-auto cursor-pointer"
                  //   type="button"
                  //   variant="destructive"
                  // >
                  //   Complete OneWay Delivery
                  // </Button>
                )}
            </Box>
          );
        }}
      />
    </div>
  );
};

export default TruckTable2Page;
