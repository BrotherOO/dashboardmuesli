export const mockData = {
  overview: {
    revenue: 125400,
    revenueTrend: 12,
    conversionRate: 3.8,
    conversionTrend: -0.5,
    aov: 42.50,
    aovTrend: 5,
  },
  funnel: {
    totalVisitors: 12402,
    startedMixing: 8520,
    addedToCart: 2104,
    checkoutStarted: 1240,
    purchased: 471,
  },
  customers: {
    totalCustomers: 142832,
    clv: 84.20,
    retentionRate: 72,
    topIngredient: "Gefriergetrocknete Erdbeeren",
  },
  campaigns: [
    { name: "Frühjahrs-Mix", status: "active", roas: 3.2 },
    { name: "Berry Blast", status: "active", roas: 4.1 },
  ]
};

export const performanceData = [
  { day: '01. Okt', revenue: 4000, conversion: 2.4 },
  { day: '05. Okt', revenue: 3000, conversion: 1.3 },
  { day: '10. Okt', revenue: 2000, conversion: 9.8 },
  { day: '15. Okt', revenue: 2780, conversion: 3.9 },
  { day: '20. Okt', revenue: 1890, conversion: 4.8 },
  { day: '25. Okt', revenue: 2390, conversion: 3.8 },
  { day: '30. Okt', revenue: 3490, conversion: 4.3 },
];
