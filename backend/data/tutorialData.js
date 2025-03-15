// In-memory data store for car repair tutorials and troubleshooting
const tutorialData = [
  {
    id: 1,
    title: "How to Change Your Engine Oil",
    description: "A complete step-by-step guide to changing your car's engine oil and filter at home.",
    url: "https://www.youtube.com/watch?v=O1hF25Cowv8",
    category: "Maintenance",
    source: "ChrisFix",
    date: "2022-04-15"
  },
  {
    id: 2,
    title: "Diagnosing Engine Misfires: Causes and Solutions",
    description: "Learn how to identify and fix common causes of engine misfires, from bad spark plugs to fuel issues.",
    url: "https://www.youtube.com/watch?v=PNhuDCVIydw",
    category: "Engine",
    source: "Scotty Kilmer",
    date: "2022-07-21"
  },
  {
    id: 3,
    title: "How to Replace Brake Pads and Rotors",
    description: "Complete guide to replacing your vehicle's brake pads and rotors, with safety tips and tool recommendations.",
    url: "https://www.youtube.com/watch?v=lU6OKQxSg8U",
    category: "Brakes",
    source: "ChrisFix",
    date: "2021-11-05"
  },
  {
    id: 4,
    title: "Car Battery Replacement Guide",
    description: "Learn how to safely remove and install a new car battery with proper terminal connections.",
    url: "https://www.youtube.com/watch?v=YC--MLNIbik",
    category: "Electrical",
    source: "EricTheCarGuy",
    date: "2022-01-30"
  },
  {
    id: 5,
    title: "How to Replace an Alternator",
    description: "Step-by-step instructions for diagnosing alternator problems and replacing the alternator in most vehicles.",
    url: "https://www.youtube.com/watch?v=LGB6ZEjGm7Q",
    category: "Electrical",
    source: "Scotty Kilmer",
    date: "2022-05-12"
  },
  {
    id: 6,
    title: "Transmission Fluid Change DIY",
    description: "Complete guide to changing your automatic transmission fluid and filter at home.",
    url: "https://www.youtube.com/watch?v=o690DovjDAc",
    category: "Transmission",
    source: "ChrisFix",
    date: "2021-09-18"
  },
  {
    id: 7,
    title: "How to Fix Squeaky Brakes",
    description: "Diagnose and fix the most common causes of brake squeaking and noise.",
    url: "https://www.youtube.com/watch?v=9Oci98AwLzY",
    category: "Brakes",
    source: "EricTheCarGuy",
    date: "2022-08-03"
  },
  {
    id: 8,
    title: "Replacing Wheel Bearings Guide",
    description: "Detailed tutorial on diagnosing bad wheel bearings and replacing them properly.",
    url: "https://www.youtube.com/watch?v=GeOakFbg-1o",
    category: "Suspension",
    source: "ChrisFix",
    date: "2021-12-14"
  },
  {
    id: 9,
    title: "How to Flush Your Cooling System",
    description: "Complete coolant flush and refill procedure to maintain your engine's cooling system.",
    url: "https://www.youtube.com/watch?v=g8YZF5cW7E0",
    category: "Maintenance",
    source: "Scotty Kilmer",
    date: "2022-03-25"
  },
  {
    id: 10,
    title: "Fixing Power Window Problems",
    description: "Troubleshooting guide for diagnosing and repairing common electric window issues.",
    url: "https://www.youtube.com/watch?v=Mh0UaW9JdRA",
    category: "Electrical",
    source: "EricTheCarGuy",
    date: "2022-06-17"
  },
  {
    id: 11,
    title: "How to Replace Spark Plugs",
    description: "Learn how to replace spark plugs in your engine to improve performance and fuel economy.",
    url: "https://www.youtube.com/watch?v=PVmw2dSvmlA",
    category: "Engine",
    source: "ChrisFix",
    date: "2021-10-08"
  },
  {
    id: 12,
    title: "DIY Fuel Injector Cleaning",
    description: "How to clean fuel injectors without removing them from your engine.",
    url: "https://www.youtube.com/watch?v=ocnmULXJEZM",
    category: "Engine",
    source: "Scotty Kilmer",
    date: "2022-02-19"
  },
  {
    id: 13,
    title: "How to Replace a Car Starter",
    description: "Complete guide to diagnosing starter problems and replacing the starter motor.",
    url: "https://www.youtube.com/watch?v=tdHGgFQQzRs",
    category: "Electrical",
    source: "ChrisFix",
    date: "2022-01-05"
  },
  {
    id: 14,
    title: "Fixing Car A/C Problems",
    description: "Troubleshooting common air conditioning issues and recharging your A/C system.",
    url: "https://www.youtube.com/watch?v=mcBXLJwpy5s",
    category: "Maintenance",
    source: "EricTheCarGuy",
    date: "2022-05-30"
  },
  {
    id: 15,
    title: "How to Replace Shock Absorbers",
    description: "Step-by-step guide to replacing worn shock absorbers and struts for a smoother ride.",
    url: "https://www.youtube.com/watch?v=mQlIJ3U8SMY",
    category: "Suspension",
    source: "ChrisFix",
    date: "2021-08-22"
  },
  {
    id: 16,
    title: "Check Engine Light Diagnosis",
    description: "How to use an OBD2 scanner to read trouble codes and diagnose check engine light issues.",
    url: "https://www.youtube.com/watch?v=lRp75r04lNw",
    category: "DIY",
    source: "Scotty Kilmer",
    date: "2022-07-09"
  },
  {
    id: 17,
    title: "How to Replace a Timing Belt",
    description: "Comprehensive guide to replacing a timing belt before it fails and causes engine damage.",
    url: "https://www.youtube.com/watch?v=5dxOXRxdA1s",
    category: "Engine",
    source: "EricTheCarGuy",
    date: "2021-11-28"
  },
  {
    id: 18,
    title: "Fixing Power Steering Leaks",
    description: "How to identify and fix common power steering fluid leaks in your vehicle.",
    url: "https://www.youtube.com/watch?v=4HGVupJRS3M",
    category: "Maintenance",
    source: "ChrisFix",
    date: "2022-04-02"
  },
  {
    id: 19,
    title: "DIY Headlight Restoration",
    description: "Restore foggy, yellow headlights to like-new condition with simple household items.",
    url: "https://www.youtube.com/watch?v=UEJbKLZ7RmM",
    category: "DIY",
    source: "ChrisFix",
    date: "2022-06-10"
  },
  {
    id: 20,
    title: "How to Diagnose Suspension Noises",
    description: "Learn to identify the source of various suspension and steering noises while driving.",
    url: "https://www.youtube.com/watch?v=L6RUY5qMWww",
    category: "Suspension",
    source: "Scotty Kilmer",
    date: "2022-03-15"
  }
];

module.exports = tutorialData;
