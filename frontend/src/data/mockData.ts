export const mockWaterQualityReports = [
  { id: 1, location: "North Reservoir", text: "Water sample shows traces of lead and high turbidity. Immediate treatment required. Contamination level moderate.", status: "Warning" },
  { id: 2, location: "East Pumping Station", text: "All parameters normal. pH is 7.2, dissolved oxygen optimal. No mercury or arsenic found.", status: "Safe" },
  { id: 3, location: "South Treatment Plant", text: "Severe contamination detected. High levels of arsenic and mercury in the raw water intake.", status: "Critical" },
  { id: 4, location: "West Distribution", text: "Minor turbidity issues, possible pipe degradation. Routine maintenance recommended.", status: "Warning" },
];

export const mockNetworkData = {
  nodes: [
    { id: "R1", label: "Reservoir 1", type: "reservoir" },
    { id: "R2", label: "Reservoir 2", type: "reservoir" },
    { id: "P1", label: "Pumping Station 1", type: "pump" },
    { id: "P2", label: "Pumping Station 2", type: "pump" },
    { id: "T1", label: "Treatment Plant 1", type: "treatment" },
    { id: "C1", label: "City Zone A", type: "consumer" },
    { id: "C2", label: "Industrial Zone", type: "consumer" }
  ],
  edges: [
    { source: "R1", target: "P1", capacity: 100 },
    { source: "R2", target: "P1", capacity: 50 },
    { source: "R2", target: "P2", capacity: 80 },
    { source: "P1", target: "T1", capacity: 120 },
    { source: "P2", target: "T1", capacity: 70 },
    { source: "T1", target: "C1", capacity: 100 },
    { source: "T1", target: "C2", capacity: 60 }
  ]
};

export const mockSensorData = Array.from({ length: 20 }, (_, i) => ({
  id: `S${i+1}`,
  timestamp: new Date(Date.now() - i * 3600000).toISOString(),
  pH: (6.5 + Math.random() * 1.5).toFixed(2),
  turbidity: (Math.random() * 5).toFixed(2),
  flowRate: Math.floor(Math.random() * 100) + 50
}));
