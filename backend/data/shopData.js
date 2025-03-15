// In-memory data store for mechanic shops
const shopData = [
  {
    id: 1,
    name: "Mike's Auto Service",
    description: "Full-service auto repair shop with certified mechanics and state-of-the-art equipment.",
    rating: 4.8,
    distance: 1.2,
    address: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      zip: "62704"
    },
    phone: "(555) 123-4567",
    website: "https://mikesautoservice.com",
    hours: [
      "Monday-Friday: 8:00 AM - 6:00 PM",
      "Saturday: 9:00 AM - 4:00 PM",
      "Sunday: Closed"
    ],
    services: [
      {
        name: "Oil Change",
        description: "Full synthetic oil change with filter replacement",
        price: 69.99
      },
      {
        name: "Brake Repair",
        description: "Brake pad replacement and rotor inspection",
        price: 249.99
      },
      {
        name: "Tire Rotation",
        description: "Rotate and balance all four tires",
        price: 49.99
      },
      {
        name: "Engine Diagnostics",
        description: "Computer diagnostics to identify engine issues",
        price: 89.99
      },
      {
        name: "Transmission Service",
        description: "Flush and replacement of transmission fluid",
        price: 179.99
      }
    ],
    specialties: ["European Cars", "Hybrid Vehicles", "Engine Repair"],
    reviews: [
      {
        id: 101,
        userName: "John D.",
        rating: 5,
        date: "2023-05-15",
        content: "Mike's team did an excellent job fixing my BMW's transmission issue. Fair price and completed a day early.",
        source: "Google"
      },
      {
        id: 102,
        userName: "Sarah M.",
        rating: 4,
        date: "2023-06-02",
        content: "Great service overall. Quoted price was accurate and the work was done well. Only reason for 4 stars is it took a bit longer than expected.",
        source: "Google"
      },
      {
        id: 103,
        userName: "Robert J.",
        rating: 5,
        date: "2023-04-28",
        content: "I've been bringing my car to Mike for years. Always honest about what needs to be fixed and what can wait. Highly recommend!",
        source: "In-App"
      }
    ]
  },
  {
    id: 2,
    name: "Precision Auto Care",
    description: "Specializing in domestic and Asian vehicles with competitive pricing and quick service.",
    rating: 4.5,
    distance: 2.8,
    address: {
      street: "456 Oak Ave",
      city: "Springfield",
      state: "IL",
      zip: "62701"
    },
    phone: "(555) 987-6543",
    website: "https://precisionautocare.com",
    hours: [
      "Monday-Friday: 7:30 AM - 7:00 PM",
      "Saturday: 8:00 AM - 5:00 PM",
      "Sunday: 10:00 AM - 3:00 PM"
    ],
    services: [
      {
        name: "Oil Change",
        description: "Conventional oil change with filter replacement",
        price: 49.99
      },
      {
        name: "Brake Repair",
        description: "Front or rear brake pad replacement",
        price: 219.99
      },
      {
        name: "Tire Rotation",
        description: "Rotate all four tires",
        price: 39.99
      },
      {
        name: "A/C Service",
        description: "Refrigerant recharge and system inspection",
        price: 129.99
      },
      {
        name: "Battery Replacement",
        description: "Battery testing and replacement if needed",
        price: 149.99
      }
    ],
    specialties: ["Asian Vehicles", "Quick Service", "Electrical Systems"],
    reviews: [
      {
        id: 201,
        userName: "Mike T.",
        rating: 5,
        date: "2023-07-10",
        content: "Fast and efficient service. My Honda was having electrical issues and they diagnosed and fixed it the same day. Fair price too.",
        source: "Google"
      },
      {
        id: 202,
        userName: "Linda K.",
        rating: 3,
        date: "2023-06-25",
        content: "Service was okay but the waiting area was cramped and uncomfortable. Car runs fine after the repair though.",
        source: "In-App"
      },
      {
        id: 203,
        userName: "David W.",
        rating: 5,
        date: "2023-05-30",
        content: "These guys know their stuff. Had a check engine light that two other shops couldn't figure out. Precision found and fixed it in an hour.",
        source: "Google"
      }
    ]
  },
  {
    id: 3,
    name: "Value Auto Repair",
    description: "Budget-friendly repairs with experienced mechanics. We focus on essential repairs without the frills.",
    rating: 4.2,
    distance: 3.5,
    address: {
      street: "789 Elm Blvd",
      city: "Springfield",
      state: "IL",
      zip: "62702"
    },
    phone: "(555) 456-7890",
    website: null,
    hours: [
      "Monday-Friday: 8:00 AM - 5:30 PM",
      "Saturday: 9:00 AM - 2:00 PM",
      "Sunday: Closed"
    ],
    services: [
      {
        name: "Oil Change",
        description: "Basic oil change with filter",
        price: 34.99
      },
      {
        name: "Brake Repair",
        description: "Basic brake pad replacement (parts extra)",
        price: 179.99
      },
      {
        name: "Tire Rotation",
        description: "Basic tire rotation",
        price: 29.99
      },
      {
        name: "Check Engine Light",
        description: "Diagnostic scan",
        price: 49.99
      },
      {
        name: "Fluid Top-Off",
        description: "Top off all fluids",
        price: 19.99
      }
    ],
    specialties: ["Budget Repairs", "Older Vehicles", "Basic Maintenance"],
    reviews: [
      {
        id: 301,
        userName: "Tom B.",
        rating: 4,
        date: "2023-06-15",
        content: "Good value for the money. Nothing fancy but they get the job done right.",
        source: "Google"
      },
      {
        id: 302,
        userName: "Janet M.",
        rating: 5,
        date: "2023-07-03",
        content: "Best prices in town and honest mechanics. They told me I didn't need the expensive repair another shop recommended.",
        source: "In-App"
      },
      {
        id: 303,
        userName: "Chris L.",
        rating: 3,
        date: "2023-05-22",
        content: "Decent work but the shop is a bit disorganized. Had to wait longer than promised to get my car back.",
        source: "Google"
      }
    ]
  },
  {
    id: 4,
    name: "Elite Auto Specialists",
    description: "Luxury vehicle specialists with certified technicians trained on high-end European and domestic models.",
    rating: 4.9,
    distance: 5.1,
    address: {
      street: "101 Luxury Lane",
      city: "Springfield",
      state: "IL",
      zip: "62703"
    },
    phone: "(555) 789-0123",
    website: "https://eliteautospecialists.com",
    hours: [
      "Monday-Friday: 9:00 AM - 6:00 PM",
      "Saturday: By appointment only",
      "Sunday: Closed"
    ],
    services: [
      {
        name: "Oil Change",
        description: "Premium synthetic oil with OEM filter",
        price: 99.99
      },
      {
        name: "Brake Repair",
        description: "Premium brake service with ceramic pads",
        price: 399.99
      },
      {
        name: "Computer Diagnostics",
        description: "Advanced computer diagnostics with specialized equipment",
        price: 149.99
      },
      {
        name: "Suspension Service",
        description: "Comprehensive suspension inspection and adjustment",
        price: 249.99
      },
      {
        name: "Detail Service",
        description: "Interior and exterior detailing",
        price: 299.99
      }
    ],
    specialties: ["Luxury Vehicles", "Performance Tuning", "Advanced Diagnostics"],
    reviews: [
      {
        id: 401,
        userName: "Elizabeth R.",
        rating: 5,
        date: "2023-07-05",
        content: "The only place I trust with my Mercedes. They understand luxury vehicles and treat them (and customers) with respect.",
        source: "Google"
      },
      {
        id: 402,
        userName: "James T.",
        rating: 5,
        date: "2023-06-18",
        content: "Worth every penny. They fixed issues with my BMW that two dealerships couldn't figure out.",
        source: "Google"
      },
      {
        id: 403,
        userName: "Sophia C.",
        rating: 4,
        date: "2023-05-29",
        content: "Excellent service and knowledge. Only giving 4 stars because of the higher prices, but the quality matches it.",
        source: "In-App"
      }
    ]
  },
  {
    id: 5,
    name: "Quick Fix Auto",
    description: "Rapid service for basic maintenance and repairs. Most jobs completed same-day.",
    rating: 4.0,
    distance: 1.7,
    address: {
      street: "222 Fast St",
      city: "Springfield",
      state: "IL",
      zip: "62704"
    },
    phone: "(555) 234-5678",
    website: "https://quickfixauto.com",
    hours: [
      "Monday-Friday: 7:00 AM - 8:00 PM",
      "Saturday: 8:00 AM - 6:00 PM",
      "Sunday: 9:00 AM - 4:00 PM"
    ],
    services: [
      {
        name: "Oil Change",
        description: "30-minute oil change with free inspection",
        price: 39.99
      },
      {
        name: "Tire Rotation",
        description: "15-minute tire rotation",
        price: 24.99
      },
      {
        name: "Battery Service",
        description: "Battery test and replacement",
        price: 129.99
      },
      {
        name: "Wiper Replacement",
        description: "Wiper blade replacement",
        price: 29.99
      },
      {
        name: "Headlight Replacement",
        description: "Headlight bulb replacement (bulb included)",
        price: 49.99
      }
    ],
    specialties: ["Quick Service", "Basic Maintenance", "No Appointment Needed"],
    reviews: [
      {
        id: 501,
        userName: "Alex M.",
        rating: 4,
        date: "2023-07-12",
        content: "In and out in 45 minutes for an oil change and tire rotation. Great when you're in a hurry.",
        source: "Google"
      },
      {
        id: 502,
        userName: "Rachel K.",
        rating: 3,
        date: "2023-06-28",
        content: "Fast service but a bit impersonal. Feels like a car assembly line.",
        source: "In-App"
      },
      {
        id: 503,
        userName: "Brian J.",
        rating: 5,
        date: "2023-06-05",
        content: "These guys saved me! Had a battery die before a meeting and they replaced it in 20 minutes. Lifesavers!",
        source: "Google"
      }
    ]
  }
];

module.exports = shopData;
