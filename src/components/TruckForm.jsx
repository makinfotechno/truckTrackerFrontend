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
import { STATUS_COLORS, STATUS_LEGEND } from "@/constants/staticData";
import { X } from "lucide-react";
import axios from "axios";

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
}) {
  const [refresh, setRefresh] = useState(true);
  const [tripStatus, setTripStatus] = useState("Active");

  const addDeliveries = () => {
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
    console.log("submitDetails..........................");
    e.preventDefault();
    if (!formData.truckNo) {
      alert("Please Provide Truck number");
      return;
    }
    if (!formData.status) {
      alert("Please Provide Status of Truck");
      return;
    }

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
    const fetchData = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/trucks`);
      setlocalStore(data);
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="max-w-8xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-2 mb-4">
      <form onSubmit={submitDetails}>
        <div className="grid grid-cols-12 gap-4">
          {/* Left Section */}
          <div className="col-span-5">
            <div className="grid grid-cols-2 gap-2">
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
                  <SelectItem value="GJ36V9205">GJ36V9205</SelectItem>
                  <SelectItem value="GJ36V9460">GJ36V9460</SelectItem>
                  <SelectItem value="GJ36V3805">GJ36V3805</SelectItem>
                  <SelectItem value="GJ36V4118">GJ36V4118</SelectItem>
                  <SelectItem value="GJ36V7765">GJ36V7765</SelectItem>
                  <SelectItem value="GJ36V7984">GJ36V7984</SelectItem>
                  <SelectItem value="GJ36V3496">GJ36V3496</SelectItem>
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
                  {/* <SelectItem value="available" className="bg-amber-400">
                    Available
                  </SelectItem> */}
                  <SelectItem value="Hold" className="bg-rose-500">
                    Hold
                  </SelectItem>
                </SelectContent>
              </Select>

              <Input
                placeholder="Current Location"
                value={formData.currentLocation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentLocation: e.target.value,
                  })
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
              className="mt-4 float-left cursor-pointer"
              onClick={() => setColorCode((prev) => !prev)}
            >
              Color Code
            </Button>
          </div>

          <div className="col-span-1 flex items-start">
            <Button
              size="sm"
              onClick={addDeliveries}
              type="button"
              className="cursor-pointer"
            >
              Delivery +
            </Button>
          </div>

          <div className="col-span-6 flex flex-col">
            <RadioGroup
              // defaultValue="0"
              value={String(formData.selectedDelivery)}
              onValueChange={(value) => {
                setFormData({ ...formData, selectedDelivery: value });
              }}
            >
              {deliveries.map((item, index) => {
                const radioValue = String(index);
                return (
                  <div className="flex items-center" key={index}>
                    <div className="mr-2">
                      <RadioGroupItem
                        value={radioValue}
                        id={`delivery-${radioValue}`}
                        className="border-blue-600 data-[state=checked]:bg-blue-600 cursor-pointer"
                      />
                      {/* <Label htmlFor="index">Option One</Label> */}
                    </div>

                    <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                      <Input
                        placeholder="Delivery"
                        value={item.delivery}
                        onChange={(e) =>
                          onChangeHandler("delivery", index, e.target.value)
                        }
                        required
                      />
                      <Input
                        placeholder="Location"
                        value={item.location}
                        onChange={(e) =>
                          onChangeHandler("location", index, e.target.value)
                        }
                        required
                      />
                      <Input
                        placeholder="Party"
                        value={item.party}
                        onChange={(e) =>
                          onChangeHandler("party", index, e.target.value)
                        }
                        required
                      />
                      <Input
                        placeholder="Weight (kg)"
                        type="number"
                        value={item.weight}
                        onChange={(e) =>
                          onChangeHandler("weight", index, e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </div>

        <Button className="mt-8 cursor-pointer" type="submit">
          {updatedId ? "Update Details" : "Add Details"}
        </Button>
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
