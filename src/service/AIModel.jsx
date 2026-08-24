// AIModal.jsx

import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Load Gemini API Key
const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY
);

// ✅ Gemini Model Configuration
const config = {
  thinkingConfig: {
    thinkingBudget: -1,  // optional thinking mode
  },
  responseMimeType: "application/json",
};

// ✅ Use a stable and supported model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash", // ⚡ fastest + supports chat
});

// ✅ Create Chat Session
export const chatSession = model.startChat({
  config,
  history: [ // keep empty; you will send prompt dynamically

    {
      role: 'user',
      parts: [
        {
          text: `Generate Travel Plan for Location: Las Vegas for
          3 days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, description and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of location for 3 days with each day plan with best time to visit in JSON format.`,
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `**Initiating Las Vegas Research**

I've started gathering budget-friendly hotel options in Vegas for couples, focusing on price, location, ratings, and descriptions, along with coordinates. Next, I'll delve into crafting a compelling 3-day itinerary for an amazing Vegas experience.


**Analyzing Budget-Friendly Options**

I've been gathering some great options for a budget trip to Vegas! So far, I've got Circus Circus, Excalibur, and Luxor on the list, with nightly rates ranging from $10 to $58. This feels like a great starting point for more budget friendly options.


**Expanding Budget Considerations**

I've added more hotel options to the budget Vegas list, including Flamingo, The Strat, and Ellis Island, along with nightly rate ranges. I'm focusing on solidifying location details with geo-coordinates and imagery. Planning an itinerary, I am eyeing a welcome sign and free activities like the Bellagio Conservatory, Fountains, and the LINQ Promenade to create a 3-day plan. I'm focusing on the images, addresses, and geo-coordinates for the specific hotels.


**Refining Cheap Vegas Itinerary**

I'm developing a 3-day itinerary focusing on free or low-cost activities to get a better overview. I am now focused on a morning/afternoon/evening schedule and am filling it with free options like the Pinball Hall of Fame, the Venetian, and Fremont Street Experience. To get everything organized, I am looking for precise geo-coordinates, imagery, and ticket costs. To check any limitations, I'm verifying ratings and travel times for each place.


**Gathering Initial Data**

I've assembled a decent list of budget hotels, complete with essential details like pricing, addresses, and ratings. I also have geographical coordinates for a majority of the major attractions in the area, providing a robust foundation for analysis. Next, I plan to integrate this with public transportation data.


**Finalizing The Details**

I'm now refining the itinerary, solidifying image URLs for both hotels and attractions. I've compiled representative ratings for each spot. I've also calculated approximate travel times between locations. Finally, the plan for a 2-day trip is now detailed, covering the South Strip, Central Strip, and Old Vegas.


`,
        },
        {
          text: `\`\`\`json
{
  "TravelPlan": {
    "Location": "Las Vegas, Nevada",
    "Duration": "3 Days",
    "Budget": "Cheap/Budget-Friendly",
    "TargetAudience": "Couple",
    "HotelOptions": [
      {
        "HotelName": "Excalibur Hotel & Casino",
        "HotelAddress": "3850 Las Vegas Blvd S, Las Vegas, NV 89109",
        "Price": "$25 - $60 per night",
        "HotelImageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Excalibur_Hotel_%26_Casino_Las_Vegas.jpg",
        "GeoCoordinates": {
          "Latitude": 36.0927,
          "Longitude": -115.172
        },
        "Rating": 3.8,
        "Description": "A medieval-themed resort offering one of the best values on the Strip. Perfect for couples looking for an iconic stay without the high price tag."
      },
      {
        "HotelName": "Luxor Hotel & Casino",
        "HotelAddress": "3900 S Las Vegas Blvd, Las Vegas, NV 89119",
        "Price": "$30 - $75 per night",
        "HotelImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e0/Luxor_Hotel_Las_Vegas.jpg",
        "GeoCoordinates": {
          "Latitude": 36.0906,
          "Longitude": -115.1722
        },
        "Rating": 3.9,
        "Description": "Stay in a giant pyramid. This Egyptian-themed hotel offers unique architecture and budget-friendly rooms at the south end of the Strip."
      },
      {
        "HotelName": "The STRAT Hotel, Casino & Tower",
        "HotelAddress": "2000 Las Vegas Blvd S, Las Vegas, NV 89104",
        "Price": "$15 - $50 per night",
        "HotelImageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/df/The_Strat_Las_Vegas.jpg",
        "GeoCoordinates": {
          "Latitude": 36.1475,
          "Longitude": -115.1567
        },
        "Rating": 3.7,
        "Description": "Located between the Strip and Downtown, The STRAT offers the best views in the city and frequently has the lowest nightly rates on the main boulevard."
      },
      {
        "HotelName": "Flamingo Las Vegas Hotel & Casino",
        "HotelAddress": "3555 Las Vegas Blvd S, Las Vegas, NV 89109",
        "Price": "$35 - $80 per night",
        "HotelImageUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Flamingo_Las_Vegas_Strip.jpg",
        "GeoCoordinates": {
          "Latitude": 36.1165,
          "Longitude": -115.1709
        },
        "Rating": 4.0,
        "Description": "Central location with a retro-Vegas feel. Home to the Wildlife Habitat, making it a great budget choice for couples who want to be in the heart of the action."
      }
    ],
    "Itinerary": [
      {
        "Day": 1,
        "DayTheme": "Strip Icons & Romantic Walks",
        "BestTimeToVisit": "Morning to Night",
        "Plan": [
          {
            "PlaceName": "Welcome to Fabulous Las Vegas Sign",
            "PlaceDetails": "The most iconic photo spot in Vegas. Arrive early to avoid the longest lines.",
            "PlaceImageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Welcome_to_Fabulous_Las_Vegas.jpg",
            "GeoCoordinates": {
              "Latitude": 36.082,
              "Longitude": -115.1728
            },
            "TicketPricing": "Free",
            "Rating": 4.7,
            "TravelTime": "20-30 mins visit; 15 mins travel from Strip"
          },
          {
            "PlaceName": "Pinball Hall of Fame",
            "PlaceDetails": "A massive collection of vintage pinball machines. Entry is free; games cost quarters.",
            "PlaceImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Pinball_Hall_of_Fame_Las_Vegas.jpg",
            "GeoCoordinates": {
              "Latitude": 36.0825,
              "Longitude": -115.1725
            },
            "TicketPricing": "Free Entry (Games: $0.25 - $1.00)",
            "Rating": 4.6,
            "TravelTime": "1-2 hours visit; 5 mins walk from Sign"
          },
          {
            "PlaceName": "Bellagio Conservatory & Botanical Gardens",
            "PlaceDetails": "A 14,000-square-foot indoor garden that changes seasonally. Absolutely stunning and free.",
            "PlaceImageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Bellagio_Conservatory_%26_Botanical_Gardens.jpg",
            "GeoCoordinates": {
              "Latitude": 36.1129,
              "Longitude": -115.1764
            },
            "TicketPricing": "Free",
            "Rating": 4.8,
            "TravelTime": "45 mins visit; 15 mins travel by bus/tram"
          },
          {
            "PlaceName": "Fountains of Bellagio",
            "PlaceDetails": "The most romantic free show in Vegas. Music and light water show every 30 mins in the afternoon, 15 mins at night.",
            "PlaceImageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/db/Fountains_of_Bellagio.jpg",
            "GeoCoordinates": {
              "Latitude": 36.1125,
              "Longitude": -115.1767
            },
            "TicketPricing": "Free",
            "Rating": 4.9,
            "TravelTime": "15-30 mins visit; Adjacent to Conservatory"
          }
        ]
      },
      {
        "Day": 2,
        "DayTheme": "Wildlife, Canals & Old Vegas",
        "BestTimeToVisit": "Late Afternoon to Night",
        "Plan": [
          {
            "PlaceName": "Flamingo Wildlife Habitat",
            "PlaceDetails": "See live flamingos, swans, and turtles in a lush garden setting inside the Flamingo Hotel.",
            "PlaceImageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b2/Flamingo_Wildlife_Habitat.jpg",
            "GeoCoordinates": {
              "Latitude": 36.1162,
              "Longitude": -115.1705
            },
            "TicketPricing": "Free",
            "Rating": 4.5,
            "TravelTime": "30 mins visit; Central Strip location"
          },
          {
            "PlaceName": "The Venetian - Grand Canal Shoppes",
            "PlaceDetails": "Walk through the indoor replica of Venice, complete with canals and street performers in St. Mark's Square.",
            "PlaceImageUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b8/The_Venetian_Las_Vegas_Canals.jpg",
            "GeoCoordinates": {
              "Latitude": 36.1211,
              "Longitude": -115.1696
            },
            "TicketPricing": "Free to walk",
            "Rating": 4.7,
            "TravelTime": "1-2 hours visit; 10 mins walk from Flamingo"
          },
          {
            "PlaceName": "Fremont Street Experience (Viva Vision)",
            "PlaceDetails": "The historic heart of Vegas. Features a massive LED canopy with free light shows and live music every night.",
            "PlaceImageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/77/Fremont_Street_Experience.jpg",
            "GeoCoordinates": {
              "Latitude": 36.1707,
              "Longitude": -115.1439
            },
            "TicketPricing": "Free",
            "Rating": 4.6,
            "TravelTime": "2-3 hours visit; 15 mins travel by Deuce bus"
          },
          {
            "PlaceName": "Downtown Container Park",
            "PlaceDetails": "An open-air shopping and entertainment center made from shipping containers. Features a giant fire-breathing mantis.",
            "PlaceImageUrl": "https://upload.wikimedia.org/wikipedia/commons/5/52/Downtown_Container_Park_Vegas.jpg",
            "GeoCoordinates": {
              "Latitude": 36.168,
              "Longitude": -115.1388
            },
            "TicketPricing": "Free",
            "Rating": 4.5,
            "TravelTime": "1 hour visit; 5 mins walk from Fremont St"
          }
        ]
      },
      {
        "Day": 3,
        "DayTheme": "Nature & Desert Wonders",
        "BestTimeToVisit": "Morning (to beat the heat)",
        "Plan": [
          {
            "PlaceName": "Seven Magic Mountains",
            "PlaceDetails": "A vibrant desert art installation of neon boulders. Best visited in the early morning light.",
            "PlaceImageUrl": "https://upload.wikimedia.org/wikipedia/commons/a/af/Seven_Magic_Mountains.jpg",
            "GeoCoordinates": {
              "Latitude": 35.8399,
              "Longitude": -115.271
            },
            "TicketPricing": "Free",
            "Rating": 4.4,
            "TravelTime": "45 mins visit; 25 mins drive from Strip"
          },
          {
            "PlaceName": "Red Rock Canyon National Conservation Area",
            "PlaceDetails": "Beautiful red sandstone peaks and hiking trails. A 13-mile scenic drive offers multiple photo stops.",
            "PlaceImageUrl": "https://upload.wikimedia.org/wikipedia/commons/2/22/Red_Rock_Canyon_Las_Vegas.jpg",
            "GeoCoordinates": {
              "Latitude": 36.1355,
              "Longitude": -115.4279
            },
            "TicketPricing": "$15 per vehicle",
            "Rating": 4.9,
            "TravelTime": "2-4 hours visit; 30 mins drive from Strip"
          },
          {
            "PlaceName": "Ethel M Chocolate Factory & Cactus Garden",
            "PlaceDetails": "Self-guided chocolate factory tour with free samples and one of the largest botanical cactus gardens in the world.",
            "PlaceImageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d4/Ethel_M_Cactus_Garden.jpg",
            "GeoCoordinates": {
              "Latitude": 36.0592,
              "Longitude": -115.021
            },
            "TicketPricing": "Free",
            "Rating": 4.6,
            "TravelTime": "1 hour visit; 20 mins drive from Red Rock or Strip"
          }
        ]
      }
    ]
  }
}
\`\`\``,
        },
      ],
    },
  ],
});




















