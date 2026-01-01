import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { v4 as uuid } from "uuid";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  STATUS_COLORS,
  STATUS_LEGEND,
  truckList,
} from "@/constants/staticData";
import { Trash, X } from "lucide-react";
import axios from "axios";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import ConfirmDelete from "./ConfirmationDialog";

export default function TruckForm({
  setlocalStore,
  formData,
  deliveries,
  setDeliveries,
  setFormData,
  updatedId,
  setSelectBg,
  selectBg,
  setUpdatedId,
  localStore,
  setIsLoading,
  setError,
  setOneWayTripComplete,
  refresh,
  setRefresh,
  setOpen,
}) {
  const [tripStatus, setTripStatus] = useState("Active");

  const addDeliveries = () => {
    setOpen(true);
    setDeliveries([
      ...deliveries,
      { delivery: "", location: "", party: "", weight: "" },
    ]);
  };
  const [colorCode, setColorCode] = useState(false);
  const onChangeHandler = (field, index, value) => {
    setDeliveries((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    if (!formData.truckNo) {
      alert("Please Provide Truck number");
      return;
    }
    if (!formData.status) {
      alert("Please Provide Status of Truck");
      return;
    }
    try {
      if (updatedId) {
        const UpdatedFormData = { ...formData, deliveries };
        const getUpdatedData = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/trucks/${updatedId}`,
          UpdatedFormData
        );
        if (getUpdatedData?.status === 200) {
          setRefresh((prev) => !prev);
        }
        setUpdatedId("");
      } else {
        const allFormData = {
          ...formData,
          deliveries,
          tripId: uuid(),
          tripStatus: tripStatus,
        };
        const getData = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/trucks`,
          allFormData
        );
        if (getData?.status === 200) {
          setRefresh((prev) => !prev);
        }
      }
    } catch (error) {
      setError("Error submitting form. Please try again.");
      console.error("Error submitting form:", error);
    }

    setFormData({
      selectedDelivery: "0",
      truckNo: "",
      status: "",
      currentLocation: "",
      trip: "",
      day: "",
    });

    setDeliveries([{ delivery: "", location: "", party: "", weight: "" }]);
    setSelectBg(false);
  };

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
      setlocalStore(data.filter((i) => i.tripStatus !== "Completed"));
      setIsLoading(false);
    };
    fetchData();
  }, [refresh]);

  const deliveriesDeleteHandler = (index) => {
    if(deliveries.length === 1){
      alert("Atleast one delivery is required");
      return;
    }
    const updatedDeliveries = deliveries.filter((_, i) => i !== index);
    setDeliveries(updatedDeliveries);
  };

  const checkBooked = (truck) => {
    return localStore.some((i) => i.truckNo === truck.label);
  };

  return (
    <div className="max-w-8xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-2 mb-4">
      <form onSubmit={submitDetails}>
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      
          {/* LEFT SECTION */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          
              {/* Truck Number */}
              <Select
                value={formData.truckNo}
                onValueChange={(value) => {
                  if (localStore.some((truck) => truck.truckNo === value)) {
                    alert("Truck Already Booked !!!");
                    return;
                  }
                  setFormData({ ...formData, truckNo: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Truck Number" />
                </SelectTrigger>
                <SelectContent>
                  {truckList.map((truck) => {
                   let booked =  checkBooked(truck);
                    return (
                      <SelectItem
                        value={truck.value}
                        key={truck.value}
                        // disabled = {booked}
                        className={`${
                          booked ? "text-gray-500 font-light" : "#000"
                        }`}
                      >
                        {truck.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {/* Status */}
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({ ...formData, status: value })
                }
                required
              >
                <SelectTrigger
                  style={{
                    width: "100%",
                    backgroundColor: selectBg
                      ? `${STATUS_COLORS[formData.status]}`
                      : "#fff",
                  }}
                  required
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    value="Waiting for order"
                    className="bg-yellow-200"
                  >
                    Waiting for order
                  </SelectItem>
                  <SelectItem value="Loading (Morbi)" className="bg-blue-300">
                    Loading (Morbi)
                  </SelectItem>
                  <SelectItem
                    value="Ready to Dispatch (Morbi)"
                    className="bg-pink-300"
                  >
                    Ready to Dispatch (Morbi)
                  </SelectItem>
                  <SelectItem value="Running" className="bg-green-200">
                    Running
                  </SelectItem>
                  <SelectItem value="Delivery" className="bg-green-500">
                    Delivery
                  </SelectItem>
                  <SelectItem
                    value="Waiting for Return order"
                    className="bg-yellow-200"
                  >
                    Waiting for Return order
                  </SelectItem>
                  <SelectItem value="Loading (Mumbai)" className="bg-blue-300">
                    Loading (Mumbai)
                  </SelectItem>
                  <SelectItem
                    value="Ready to Dispatch (Mumbai)"
                    className="bg-pink-300"
                  >
                    Ready to Dispatch (Mumbai)
                  </SelectItem>
                  <SelectItem value="Return" className="bg-green-200">
                    Return
                  </SelectItem>
                  <SelectItem value="Unloading" className="bg-green-500">
                    Unloading
                  </SelectItem>
                  <SelectItem value="Hold" className="bg-rose-500">
                    Hold
                  </SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Current Location"
                value={formData.currentLocation}
                onChange={(e) =>
                  setFormData({ ...formData, currentLocation: e.target.value })
                }
                required
              />

              <Input
                placeholder="Trip"
                value={formData.trip}
                onChange={(e) =>
                  setFormData({ ...formData, trip: e.target.value })
                }
                required
              />

              <Input
                placeholder="Day"
                value={formData.day}
                onChange={(e) =>
                  setFormData({ ...formData, day: e.target.value })
                }
                required
              />
            </div>

            <Button
              type="button"
              className="mt-4 w-full sm:w-auto cursor-pointer float-start"
              onClick={() => setColorCode((prev) => !prev)}
            >
              Color Code
            </Button>
          </div>

          {/* ADD DELIVERY BUTTON */}
          <div className="lg:col-span-1 flex items-start">
            <Button
              size="sm"
              onClick={addDeliveries}
              type="button"
              className="w-full lg:w-auto cursor-pointer"
            >
              Delivery +
            </Button>
          </div>

          {/* DELIVERIES SECTION */}
          <div className="lg:col-span-6 flex flex-col">
            <RadioGroup
              value={String(formData.selectedDelivery)}
              onValueChange={(value) => {
                setFormData({ ...formData, selectedDelivery: value });
              }}
            >
              {deliveries.map((item, index) => {
                const radioValue = String(index);
                return (
                  <div
                    className="flex flex-col sm:flex-row sm:items-center gap-2 items-center"
                    key={index}
                  >
                    <div className="mr-2">
                      <RadioGroupItem
                        value={radioValue}
                        id={`delivery-${radioValue}`}
                        className="border-blue-600 data-[state=checked]:bg-blue-600 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-2 w-full">
                      <Input
                        placeholder="Delivery"
                        value={item.delivery}
                        onChange={(e) =>
                          onChangeHandler("delivery", index, e.target.value)
                        }
                      />
                      <Input
                        placeholder="Location"
                        value={item.location}
                        onChange={(e) =>
                          onChangeHandler("location", index, e.target.value)
                        }
                      />
                      <Input
                        placeholder="Party"
                        value={item.party}
                        onChange={(e) =>
                          onChangeHandler("party", index, e.target.value)
                        }
                      />
                      <Input
                        placeholder="Weight (kg)"
                        type="number"
                        value={item.weight}
                        onChange={(e) =>
                          onChangeHandler("weight", index, e.target.value)
                        }
                      />
                    </div>
                    <Trash
                      color="red"
                      className="mb-2 cursor-pointer"
                      onClick={() => deliveriesDeleteHandler(index)}
                    />
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </div>
        <div className="flex">
          <Button className="m-auto sm:w-auto cursor-pointer" type="submit">
            {updatedId ? "Update Details" : "Add Details"}
          </Button>
        </div>
      </form>
      {colorCode && <StatusLegend setColorCode={setColorCode} />}
    </div>
  );
}

const StatusLegend = ({ setColorCode }) => {
  return (
    <div className="mt-2 rounded-lg border bg-white p-4 shadow-sm relative">
      <h3 className="mb-4 text-sm font-semibold text-gray-700">
        Status Color Guide
      </h3>
      <X
        className="absolute right-0 top-0 m-1 cursor-pointer"
        onClick={() => setColorCode(false)}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {STATUS_LEGEND.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="h-4 w-4 rounded"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-gray-700">
              <strong>{item.label}</strong> — {item.meaning}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
