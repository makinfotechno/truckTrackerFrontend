export const truckData = [ // for subrow type table only
  {
    truck: "GJ36V9205",
    status: "RUNNING",
    currentLocation: "Navsari",
    trip: 2,
    day: 2,
    subRows: [
      {
        delivery: "DELIVERY-1",
        location: "Bhiwandi",
        party: "Decoreta",
        weight: 16,
      },
      {
        delivery: "DELIVERY-2",
        location: "Vashi",
        party: "Hindustan",
        weight: 17.8,
      },
    ],
  },
  {
    truck: "GJ36V3805",
    status: "RUNNING",
    currentLocation: "Karjan",
    trip: 2,
    day: 2,
    subRows: [
      {
        delivery: "DELIVERY-1",
        location: "Powai",
        party: "ANJ Turnkey",
        weight: 21,
      },
      {
        delivery: "DELIVERY-2",
        location: "Vadala",
        party: "Hindustan",
        weight: 13.5,
      },
    ],
  },

  {
    truck: "GJ36V4118",
    status: "MUMBAI DELIVERY",
    currentLocation: "Santacruz",
    trip: 2,
    day: 5,
    subRows: [
      {
        delivery: "COMPLETE",
        location: "Andheri",
        party: "Paris",
        weight: 14,
      },
      {
        delivery: "COMPLETE",
        location: "Chembur",
        party: "Hindustan",
        weight: 10,
      },
      {
        delivery: "W-LABOUR",
        location: "Santacruz",
        party: "Hindustan",
        weight: 9,
      },
    ],
  },

  {
    truck: "GJ36V7765",
    status: "RUNNING",
    currentLocation: "Navsari",
    trip: 2,
    day: 2,
    subRows: [
      {
        delivery: "DELIVERY-1",
        location: "Ambernath",
        party: "Hindustan",
        weight: 9.5,
      },
      {
        delivery: "DELIVERY-2",
        location: "Neral",
        party: "Burham",
        weight: 15,
      },
    ],
  },
];

export const STATUS_COLORS = {
  "Running": "#b9f8cf",
  "Delivery": "#00c951",
  "Loading (Morbi)": "#8ec5ff",
  "Loading (Mumbai)": "#8ec5ff",
  "Ready to Dispatch (Mumbai)": "#fda5d5",
  "Ready to Dispatch (Morbi)": "#fda5d5",
  "Waiting for Return order": "#fff085 ",
  "Waiting for order": "#fff085",
  "Return": "#b9f8cf",
  "Unloading": "#00c951",
  "Available": "#ffb900",
  "Hold": "#fb2c36d4",
};

export const STATUS_LEGEND = [
  { label: 'Running / Return', color: '#b9f8cf', meaning: 'Truck is currently running / Returning' },
  { label: 'Delivery / Unloading', color: '#00c951', meaning: 'Active delivery / Unloading operation' },
  { label: 'Loading (Morbi / Mumbai)', color: '#8ec5ff', meaning: 'Loading in progress' },
  { label: 'Ready to Dispatch', color: '#fda5d5', meaning: 'Truck is ready and waiting for dispatch' },
  { label: 'Waiting for Order', color: '#fff085', meaning: 'Idle / waiting state' },
  // { label: 'Available', color: '#ffb900', meaning: 'Available for assignment' },
  { label: 'Hold', color: '#fb2c36', meaning: 'Blocked / needs attention' },
];


export const truckDataPanel = [
  {
    truckNo: "GJ01AB1234",
    status: "RUNNING",
    currentLocation: "Ahmedabad",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Surat", party: "Reliance", weight: 18.2 },
      { delivery: "DELIVERY-2", location: "Vapi", party: "Tata", weight: 12.5 }
    ],
    trip: 1,
    day: 1
  },
  {
    truckNo: "GJ02CD5678",
    status: "HOLD",
    currentLocation: "Vadodara",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Ankleshwar", party: "Adani", weight: 20 }
    ],
    trip: 1,
    day: 1
  },
  {
    truckNo: "MH04EF9012",
    status: "RUNNING",
    currentLocation: "Thane",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Navi Mumbai", party: "Hindustan", weight: 15.3 },
      { delivery: "DELIVERY-2", location: "Panvel", party: "Ultratech", weight: 19 }
    ],
    trip: 2,
    day: 2
  },
  {
    truckNo: "RJ14GH3456",
    status: "COMPLETED",
    currentLocation: "Jaipur",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Ajmer", party: "Ambuja", weight: 14 }
    ],
    trip: 1,
    day: 3
  },
  {
    truckNo: "MP09IJ7890",
    status: "RUNNING",
    currentLocation: "Indore",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Bhopal", party: "Birla", weight: 22 }
    ],
    trip: 3,
    day: 2
  },
  {
    truckNo: "UP32KL1122",
    status: "HOLD",
    currentLocation: "Lucknow",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Kanpur", party: "ITC", weight: 16.8 }
    ],
    trip: 2,
    day: 1
  },
  {
    truckNo: "DL01MN3344",
    status: "RUNNING",
    currentLocation: "Delhi",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Gurgaon", party: "Amazon", weight: 11.4 },
      { delivery: "DELIVERY-2", location: "Noida", party: "Flipkart", weight: 13.6 }
    ],
    trip: 4,
    day: 2
  },
  {
    truckNo: "HR26OP5566",
    status: "COMPLETED",
    currentLocation: "Faridabad",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Rohtak", party: "Maruti", weight: 17 }
    ],
    trip: 1,
    day: 4
  },
  {
    truckNo: "PB10QR7788",
    status: "RUNNING",
    currentLocation: "Ludhiana",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Jalandhar", party: "Hero", weight: 20.5 }
    ],
    trip: 2,
    day: 2
  },
  {
    truckNo: "WB20ST9900",
    status: "HOLD",
    currentLocation: "Kolkata",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Howrah", party: "Berger", weight: 14.9 }
    ],
    trip: 1,
    day: 3
  },
  {
    truckNo: "TN09UV1111",
    status: "RUNNING",
    currentLocation: "Chennai",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Vellore", party: "Ashok Leyland", weight: 23 }
    ],
    trip: 3,
    day: 1
  },
  {
    truckNo: "KA03WX2222",
    status: "RUNNING",
    currentLocation: "Bengaluru",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Mysuru", party: "Infosys", weight: 10.5 }
    ],
    trip: 2,
    day: 3
  },
  {
    truckNo: "AP16YZ3333",
    status: "COMPLETED",
    currentLocation: "Vijayawada",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Guntur", party: "ITC", weight: 12 }
    ],
    trip: 1,
    day: 5
  },
  {
    truckNo: "TS08AA4444",
    status: "RUNNING",
    currentLocation: "Hyderabad",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Warangal", party: "Dr Reddy", weight: 18 }
    ],
    trip: 4,
    day: 2
  },
  {
    truckNo: "OR05BB5555",
    status: "HOLD",
    currentLocation: "Bhubaneswar",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Cuttack", party: "JSW", weight: 21 }
    ],
    trip: 2,
    day: 3
  },
  {
    truckNo: "CG07CC6666",
    status: "RUNNING",
    currentLocation: "Raipur",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Bilaspur", party: "SAIL", weight: 24 }
    ],
    trip: 3,
    day: 1
  },
  {
    truckNo: "BR01DD7777",
    status: "COMPLETED",
    currentLocation: "Patna",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Gaya", party: "L&T", weight: 13 }
    ],
    trip: 1,
    day: 4
  },
  {
    truckNo: "JK02EE8888",
    status: "RUNNING",
    currentLocation: "Jammu",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Udhampur", party: "NHPC", weight: 19 }
    ],
    trip: 2,
    day: 2
  },
  {
    truckNo: "HP12FF9999",
    status: "HOLD",
    currentLocation: "Shimla",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Solan", party: "Cipla", weight: 11 }
    ],
    trip: 1,
    day: 3
  },
  {
    truckNo: "AS01GG0001",
    status: "RUNNING",
    currentLocation: "Guwahati",
    deliveries: [
      { delivery: "DELIVERY-1", location: "Tezpur", party: "Oil India", weight: 22.4 }
    ],
    trip: 3,
    day: 2
  }
];


