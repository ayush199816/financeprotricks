// Configuration
const DOC_TEMPLATE_ID = '1oLqhvwL-nmEtfn0tjS-0w0ohdfWakgFA9V-VasP3kdc'; // Replace with your Doc template ID
const DEST_FOLDER_ID = '1fIptyR9dgxJNQPuVn-TxzBlgLiYJJ3OY'; // Replace with your Folder ID
const UNSPLASH_ACCESS_KEY = 'zfEChoVVOefgkh5IStJEfDidClgdOdeQGjaQVWis1jI'; // Your Unsplash API Key
const BACKGROUND_IMAGE_ID = '14pdT21HfM905E3uFG2dtR09Rmw2Jmjb9'; // Background image ID
const GEMINI_API_KEY = 'AIzaSyBLSz9VSWZC6HFaRA61nejuwT1lRK-IVU8'; // Gemini API Key

function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('Itinerary Tools')
    .addItem('Generate Details', 'generateDetails')
    .addItem('Generate Vouchers', 'generateFullVoucher')
    .addItem('Setup Template Background', 'setupTemplateBackground')
    .addToUi();

  ui.createMenu("Quote")
    .addItem("Generate Quote PDF", "generateQuotePDF")
    .addToUi();
}

function generateDetails() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[21]; // Row 22 (0-indexed)
  const rows = data.slice(22); // Data starts from row 23
  
  // Find column indices by header names
  const sightseeingIdx = headers.indexOf("Sightseeing Name");
  const descriptionIdx = headers.indexOf("Description");
  const imageIdx = headers.indexOf("Image");
  const rawImageUrlIdx = headers.indexOf("Raw Image URL");
  
  // Check if required columns exist
  if (sightseeingIdx === -1) {
    SpreadsheetApp.getUi().alert("Error: Could not find 'Sightseeing Name' column");
    return;
  }
  
  if (descriptionIdx === -1 || imageIdx === -1 || rawImageUrlIdx === -1) {
    SpreadsheetApp.getUi().alert("Error: Missing required columns (Description, Image, or Raw Image URL)");
    return;
  }
  
  // Track progress
  let updatedCount = 0;
  
  // Process each row
  for (let i = 0; i < rows.length; i++) {
    const place = rows[i][sightseeingIdx];
    const existingDescription = rows[i][descriptionIdx];
    const existingImage = rows[i][imageIdx];
    
    // Skip if place is empty or both description and image already exist
    if (!place || (existingDescription && existingImage)) continue;
    
    // Get description and image URL if needed
    if (!existingDescription) {
      const description = getPlaceDescription(place);
      sheet.getRange(i + 23, descriptionIdx + 1).setValue(description); // Row 23 is the first data row
    }
    
    if (!existingImage) {
      const imageURL = getUnsplashImage(place);
      sheet.getRange(i + 23, imageIdx + 1).setFormula(`=IMAGE("${imageURL}")`);
      sheet.getRange(i + 23, rawImageUrlIdx + 1).setValue(imageURL);
    }
    
    updatedCount++;
    
    // Add a small delay to avoid rate limiting
    Utilities.sleep(500);
  }
  
  // Show completion message
  if (updatedCount > 0) {
    SpreadsheetApp.getActiveSpreadsheet().toast(`Updated ${updatedCount} rows with descriptions and images`, "Complete", 5);
  } else {
    SpreadsheetApp.getActiveSpreadsheet().toast("No new data to update", "Complete", 3);
  }
}

function normalizeInput(text) {
  // Convert to uppercase and split into words
  const words = text.trim().toUpperCase().split(/\s+/);
  
  // Sort words alphabetically and join back
  return words.sort().join(' ');
}

function getGeminiDescription(place) {
  Logger.log(`Getting Gemini description for: ${place}`);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
  
  const prompt = `Provide a brief, informative description of ${place} as a tourist destination. Focus on its historical significance, architectural features, and visitor experience. Keep it concise and engaging.`;
  
  try {
    const response = UrlFetchApp.fetch(url, {
      method: 'POST',
      contentType: 'application/json',
      payload: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });
    
    const json = JSON.parse(response.getContentText());
    if (json.candidates && json.candidates[0] && json.candidates[0].content) {
      const description = json.candidates[0].content.parts[0].text;
      Logger.log(`Gemini response received: ${description.substring(0, 100)}...`);
      return description;
    }
  } catch (e) {
    Logger.log(`Gemini API error: ${e}`);
  }
  return "";
}

function getPlaceDescription(place) {
  Logger.log(`Getting description for: ${place}`);
  
  // First try to get description from WikiVoyage and Wikipedia
  const wikiVoyageText = getWikiVoyageIntro(place);
  Logger.log(`WikiVoyage result length: ${wikiVoyageText ? wikiVoyageText.length : 0}`);
  
  if (wikiVoyageText && wikiVoyageText.length > 50) {
    // Clean up the text to remove any technical artifacts
    const cleanedText = wikiVoyageText.replace(/\[\d+\]/g, '').trim();
    Logger.log(`Returning WikiVoyage text: ${cleanedText.substring(0, 100)}...`);
    return cleanedText;
  }

  const wikiText = getWikipediaIntro(place);
  Logger.log(`Wikipedia result length: ${wikiText ? wikiText.length : 0}`);
  
  if (wikiText && wikiText.length > 50) {
    // Clean up the text to remove any technical artifacts
    const cleanedText = wikiText.replace(/\[\d+\]/g, '').trim();
    Logger.log(`Returning Wikipedia text: ${cleanedText.substring(0, 100)}...`);
    return cleanedText;
  }

  // Try Gemini API if Wikipedia and WikiVoyage fail
  const geminiText = getGeminiDescription(place);
  if (geminiText && geminiText.length > 50) {
    Logger.log(`Returning Gemini text: ${geminiText.substring(0, 100)}...`);
    return geminiText;
  }

  // If no Wikipedia/WikiVoyage/Gemini info found, try fallback descriptions
  const fallbackDescriptions = {
    // Pattaya attractions
    "PATTAYA CITY TOUR": "Pattaya City Tour (Big Buddha + View Point) - Transfers if included, Ticket if Included. After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- In between 10:30 am - 10:45 am drop will be around 01:00 pm to 01:30 pm. Timing approx 3-4 hrs. Meet us at Meeting Point at Hotel Lobby. You'll visit the Big Buddha temple (Wat Phra Yai), head to a viewpoint that overlooks Pattaya Bay.",
   
    "BIG BUDDHA": "Pattaya City Tour (Big Buddha + View Point) - Transfers if included, Ticket if Included. After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- In between 10:30 am - 10:45 am drop will be around 01:00 pm to 01:30 pm. Timing approx 3-4 hrs. Meet us at Meeting Point at Hotel Lobby. You'll visit the Big Buddha temple (Wat Phra Yai), head to a viewpoint that overlooks Pattaya Bay.",
   
    "CORAL ISLAND": "Coral Island By Speed Boat With Lunch – (Shared Transfer). After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- Coral island Pickup in between 09:30 am - 09:45 am drop will be around 04:00 pm to 04:30 pm. Pick-up & Drop-off Location: Hotel location in Pattaya City, Pattaya City North and South, Activity Duration: 5 hours (Approx). Coral island includes:- KOH LARN Beach Board one of the speed boats and cruise to the offshore Coral island, locally known as Kho Larn. Explore it at your leisure. 5-hour tour to Coral Island by speedboat, from Pattaya be as active or relaxed as you like on a tour with a variety of options. Choose from activities like snorkeling, Sea Walking, parasailing, and jet skiing. Includes lunch, guide, speedboat, and hotel pickup and drop-off (For Activities need to pay extra).",
   
    "PATTAYA": "Pattaya On the leisure day:- On leisure days you can explore your own nearby palace like:- Pattaya beautiful beaches i.e., Jomtien beach, pattaya beach, Wong Amatbeach, Naklua beach, Tawaen beach, Bamboo beach etc and can take part in water sports, outdoor activities too and many more beaches to explore. PATTAYA WALKING STREET, CENTRAL PATTAYA, TERMINAL 21 PATTAYA, CENTRAL MARINA, OUTLET MALL PATTAYA, THEPPRASIT NIGHT MARKET. Nightclubs in pattaya i.e., Ruby club, Club insomnia, Bodega bar, Rass club pattaya, Castro show bar, Beecorner bar, 808 night club.",
   
    "FLOATING MARKET": "Floating Market Pattaya – (Transfers if included + Ticket if Included)(One Side Boat Ride). Pattaya Floating Market Timings: 09.00 am - 04.00 pm (Everyday), Activity Duration: 2 hours (Approx). Row through the largest floating market in Thailand featuring more than 114 shops and water vendors. Classified into 4 sections, each representing the north, northeast, central and south of Thailand, with many eateries, stalls, and souvenir shop.",
   
    "UNDERWATER WORLD": "Underwater World Show Pattaya – (Transfers if included + Ticket if Included). Under water world show pattaya and the activity timings: 9:00 AM - 6:00 PM (last admission at 5:30 pm). Activity Duration: 2-3 Hours (Approx.), Open daily. You can see more than 5000 aquatic animals from over 500 different species at the aquarium. Explore Underwater World Pattaya, divided into 6 zones including Touch Pool Zone, Magic Tank, and Coral Reef Zone. Marvel at the various marine creatures including Mulberry fish, Black Tip Reef Sharks, Big Eye Jack, and Fat Giant Grouper. Walk through the Underwater Tunnel which provides a 180-degree view of the marine species in their natural habitat. Engage in interactive activities like feeding majestic manta rays & koi fishes and thrilling dive with the sharks.",
   
    "ALCAZAR SHOW": "Evening Alcazar Show Pattaya - (Transfers if included + Ticket if Included). In the evening, Pick-up time is 6:00 PM from designated locations. Transfer to Alcazar Theater at 6:30 PM:(On on booked time) Depart for the Alcazar Theater, enjoying a scenic journey. The show happens in the evening and there are 3 - 4 shows every evening. They also offer a complimentary soft drink on arrival. Recording Video is not allowed, but you can click photos during the entire show without the use of Flash. The show happens in the center of Pattaya. There are several dances including dances of particular countries like Japan, China, India, etc. Each dance is on a theme and lights and music go very well with each theme. The music is extraordinary. The usage of lights is also excellent. Optional photos with performers (if available). Participants can share their favorite moments and discuss the show with newfound friends. Alcazar Show is one of the best things to experience in Pattaya (Photo session extra payable).",
   
    "SANCTUARY OF TRUTH": "Sanctuary of Truth Temple – (Transfers if included + Ticket if Included). Activity Timings: 08:30 AM - 5:00 PM in two different slot (Everyday), Activity Duration: 2- 3 hours (Approx). Sanctuary of Truth is known for a mixed structure of a temple and a castle with intricate interiors and detailed craftsmanship on display. The Sanctuary of Truth Pattaya is a magnificent construction of wood situated at the Rachvate cape of Naklua Pattaya City. Admire intricate carvings on the walls which represent the creators; Heaven, the Earth, the Father, the Moon, the Sun, and the Stars at Sanctuary of the Truth. The wooden carved sculptures reflect the Ancient Vision of Earth, Ancient Knowledge, and Eastern Philosophy A learned local guide will be there to explain the cultural philosophy of this magnificent structure.",
   
    "TIGER PARK": "Tiger Park (Smallest/Medium/Biggest) Pattaya – (Transfers if included + Ticket if Included). Tiger park pattaya Timing 9am - 5pm (Open daily including public holiday), Activity Duration: 2-3 hours. Tiger park includes:- 'Transfers if included, TIGER Ticket if IncludedS AVAILABLE (SMALLEST, MEDIUM AND THE BIGGEST ONE) ON THE SPOT YOU NEED TO BUY' - You can take picture with selective tiger in cage. There is Different types of Ticket if Included, depends on what you take - Walk around - You are allowed to see and walk around tigers outside the cage. Full Tiger Ticket if Included - You are allowed to Go in Cage of tiger and take picture with your phone with tigers.",
   
    "NONG NOOCH GARDEN": "Nong Nooch Garden With Indian Lunch – (Transfers if included + Ticket if Included). After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- Nong Nooch Tropical Botanical GardenTimings: 8:00 AM to 6:00 PM (Everyday), Activity Duration: 6-7 hours (approx.) Buffet Lunchtime: 11.30 AM - 2.00 PM. Visit one of the most beautiful and biggest botanical tropical gardens in Asia. Explore one of the world's ten most beautiful gardens and see the five rare species of plants including Hoya, Palm, Heliconia, Cycads & Bougainvillea. Get to know about the amazing concept of saving trees & reducing global warming while roaming around this famous botanical garden in Pattaya. See various gardens like Blue Garden, Tray Garden, Lotus Garden, Cactus Garden & French Garden and admire their unique themed settings. Head towards the Cactus Garden covered with a glass roof and see a wonderful spraying water system to keep moisture. Admire the spectacular decoration of the area filled with various tropical plants as you visit the tropical garden. Marvel at many huge rocks in diverse sizes and click amazing pictures while exploring the Stone Forest. Attend an amazing elephant show in the garden and be amazed by elephants playing football & volleyball. Enjoy a wonderful Thai cultural show and see various professional performers recreating historic events. Book Nong Nooch Tropical Botanical Garden Ticket if Includeds and visit this famous garden in Thailand, spread over 500 acres of area.",
   
    "MINI SIAM": "Mini Siam Pattaya - (Transfers if included + Ticket if Included). After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- Activity Timings: 09:00 AM to 07:00 PM. Activity Duration: 2- 3 hours (Approx). Explore Mini Siam park in Pattaya and feel like a global citizen as you look at the miniature models of famous landmarks from Thailand and around the world. Marvel at nearly 100 replicas of the world's iconic landmarks from the Eastern and Western hemispheres including the Eiffel Tower, Statue of Liberty, Taj Mahal etc. Admire Thai culture and the miniature landmarks of Ayutthaya, the Temple of the Emerald Buddha, and the Bridge at Mini Siam. Take a stroll through the beautifully landscaped gardens around the miniature models and get a chance to click photos around the world, not in 80 days but in less than 80 minutes.",
   
    "DOLPHIN SHOW": "Dolphin Show Pattaya (Normal Seat) - (Transfers if included + Ticket if Included). Duration 2 Hours | Morning, Afternoon, Evening slot available. Enjoy the dolphins and jumping through hoops, playing with trainers and bouncing on water. Perfect for both adults and children, the shows at Dolphins Bay Pattaya are one of the best Be entertained by the dolphins and fur seals, and take a picture with the friendly marine creatures for an additional fee. Please note that the only show timings available are 11:00hrs, 14:00hrs and 17:00 hrs. You will get an entrance Ticket if Included with a regular seat to the show.",
   
    "ART IN PARADISE": "Art in Paradise Pattaya - (Transfers if included + Ticket if Included). Art in paradise Opening hours: 9 a.m.- 10.30 p.m. 2 hours (approx.), Closed on Wednesday, Thursday. Art in Paradise is Thailand's first and the world's largest interactive museum in Pattaya with large dioramas, dinosaur figurines, jungle safari display and ocean-themed exhibits. Art in Paradise is a perfect place to enjoy the 'Optical illusion art. This gallery is divided into 10 different zones, all covering different aspects of art. The 10 zones include Mirage, Aqua, Zoo, Classic Art, Ayutthaya, Egyptian, Thai, Surrealism, Dinosaur, and Exhibition Room. Over 100 3D paintings and 10 themed galleries. The art gallery is spread in about 5,800 square meters, making it the largest in the world. They modified that building into an impressive display of over 140 marvelous paintings. These paintings were made in a way that they provide an interactive 3-D illusion.",
   
    "69 SHOWS": "69 Shows Pattaya - (Transfers if included + Ticket if Included). The cabaret style show featuring beautiful performances in elaborate costumes performing dance routines and lip-sync performances. Located in the heart of Pattaya, the theater offers an entertaining evening of music, dance and glamour. The shows are family-friendly and showcase Thai cultural elements mixed with international performances.",
   
    "89 SHOWS": "89 Shows Pattaya - (Transfers if included + Ticket if Included). A spectacular cabaret show in Pattaya featuring elaborate performances with dazzling costumes and impressive choreography. The venue offers multiple showtimes per evening and is one of Pattaya's popular nighttime entertainment options for visitors looking for a memorable cultural experience.",
   
    "SRIRACHA TIGER ZOO": "Sriracha Tiger Zoo Pattaya timings: 9.00 AM. - 6.00 PM (Daily), Activity Duration: 2-3 Hours (Approx). Sriracha Tiger Zoo includes animals like tiger, Play with Tiger Cubs, camels, ostriches, crocodiles, elephants, etc. Explore the biggest tiger zoo in Asia consisting more than 300 Panthera Tigris and nearly 100,000 species of crocodiles on site. Have fun interacting session by getting up close, personal, and bottle-feed an adorable, real life baby tiger. Meet, greet, and feed adorable tiger cubs, farm animals, ostriches, kangaroos, and more. Get an opportunity to witness a little miracle of life when baby crocodiles come out from their shell.",
   
    "FROST MAGICAL ICE": "Frost Magical Ice of Siam - Transfers if included + Ticket if Includeds - without boots. Will be open from 09:00 AM to 07:00 PM. Duration: 2-3 hours. Visit Frost Magical Ice of Siam's expansive 30,000 square metre winter wonderland where the temperature drops to a chilly level of -10°C, with intricate ice sculptures. Discover 'The Himmapan' and 'Siam Heaven' zones, showcasing detailed ice sculptures depicting mythical creatures and heavenly scenes inspired by Thai culture. Visit Frost Village for an icy adventure, featuring beautifully crafted ice houses and finely crafted sculptures. Have fun in a playroom housed inside Frost Magical Ice of Siam and enjoy exhilarating ice slides, adding excitement to your icy adventure.",
   
    // Bangkok attractions
    "BANGKOK": "Bangkok On the Leisure day:- On leisure days you can explore your own nearby palace like – VICTORY MONUMENT MARKET, SAMPENG MARKET, UNION MALL, TALAD ROT FAI SRINAKARIN NIGHT MARKET, PANTIP PLAZA, SIAM CENTER, PLATINUM FASHION MALL, ASIATIQUE THE RIVERFRONT, MBK CENTER (MA BOON KHRONG CENTER), KHAOSAN ROAD, ICONSIAM, CHINATOWN – BANGKOK, TERMINAL – 21, BTS SKYTRAIN, SIAM PARAGON, LUMPINI PARK, CENTRAL WORLD, CHATUCHAK WEEKEND MARKET.",
   
    "SAFARI WORLD": "Safari World With Marine Park + Lunch - Shared Transfer. After breakfast at hotel pickup will be done from the hotel lobby and the pickup timing will be:- Between 8:00 AM and 8:30 AM drop you nearby 05:30 pm to 05:45 pm and lunch is included in it. Safari world and marine park timing 9am till 5pm, Activity Duration: 6-8 Hours (Approx) Monday closed. Safari world and marine park includes:- SEA LION SHOW, COWBOY STUNT, ELEPHANT SHOW, DOLPHIN SHOW, SPY WAR, BIRD SHOW AND BEAUTIFUL AQUATIC WILDLIFE. (You can do any show based on time limit). Visit Safari World Bangkok, which is separated into two themes, to see both land and marine animals. Explore the Safari Park\'s animal kingdom to see a variety of wildlife, including giraffes, zebras, tigers, and lions, living in their natural environments. Watch seals, sharks, and other aquatic life swim in the Marine Park aquarium and be in awe of their unmatched beauty. Don\'t miss out on 7 spectacular performances throughout the day such as the elephant show, dolphin show, bird show, and more!",
   
    "EVENING CHAO PHRAYA": "Evening Chao Phraya Dinner River Cruise – (Shared Transfer) (Subject to Availability). In the evening Pickup in between 05:00 pm - 05:30 pm drop will be around 09:30pm to 10:00pm. Set out on an amazing Chao Phraya River Dinner cruise and enjoy the stunning views of the city's iconic landmarks, including glittering skyscrapers and historic temples. Savor a delicious buffet dinner featuring a variety of Thai and international dishes, including fresh seafood, grilled meats, and vegetarian options. Enjoy live entertainment by talented performers showcasing traditional Thai music and dance, adding a cultural touch to your evening. With picture-perfect views of Bangkok's skyline and landmarks, you'll have plenty of opportunities to capture insta-worthy pictures. Escape the hustle and bustle of Bangkok's streets and enjoy the peacefulness of the river as you glide along. Take a break from the crowds and soak up the peaceful ambiance of the river as you unwind over dinner.",
   
    "THE GRAND PALACE": "The Grand Palace & Emerald Buddha (Wat Phra Kaew). After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be: The Grand Palace & Emerald Buddha is open from 08:00 am - 3.30 pm everyday. Half Day Temple Tour Bangkok Duration: 4-5 hours (approx). Half day Bangkok temple tour includes:- THE GRAND PALACE & EMERALD BUDDHA (WAT PHRA KAEW). Emerald Buddha, called Phra Kaeo Morakot in Thai, is the most revered Buddha Idol in Thailand and the deity of the Royal Family. The statue is made of Jade and is seasonally decorated with different attires made of Gold and precious stones. The Grand Palace was once the residence and administrative complex of the Royal Family, now used more for ceremonial purposes. This Palace was built by King Rama 1 in 1782, the Founder of the Chakri Dynasty that rules Thailand till date. It houses several courts and buildings including the Temple of the Emerald Buddha.",
   
    "MAHANAKHON SKYWALK": "Mahanakhon Skywalk (Morning/Evening) – (Transfers if included + Ticket if Included). Mahanakhon skywalk includes:- Includes fast-track SkyWalk admission Ticket if Included. Timing: 10:00 AM - 07:00 PM (Morning slot / Evening slot), Activity Duration: 2-3 Hour. Soar to new heights and admire the captivating beauty of Bangkok at the Mahanakhon Skywalk, the city's highest observation deck. Go out onto the outdoor vantage point and look at the breathtaking panoramic view of the city, which will leave you in awe. Take a walk along the glass skywalk on the 78th floor, suspended 310 meters above the ground, for an adrenaline-pumping experience like no other.",
   
    "SEA LIFE OCEAN WORLD": "Sea Life Ocean World + Madame Tussaud - (Transfers if included + Ticket if Included). SEA LIFE Bangkok will operate from 9:00 am - 8:00 pm. Duration- 3 hours (approx.). SEA LIFE Bangkok Entrance Details: Last entry at 5:00 PM and closes at 6:00 PM. Visit two top attractions in Bangkok with a combo Ticket if Included for Madame Tussauds and SEA LIFE Bangkok Ocean World. See more than 90 wax statues of celebrities at Madame Tussauds, and pose for photos near your favorite figures. Then take in thousands of aquatic creatures at SEA LIFE Bangkok Ocean World, which is one of Southeast Asia's largest aquariums. Combo Ticket if Included for Madame Tussauds and SEA LIFE Bangkok Ocean World Snap photos next to Thai and international celebrity statues. View an array of fish and other marine animals at SEA LIFE Bangkok. 4D Movie is recommended for children above 7 years of Age. SEA LIFE Bangkok Ocean World, home to thousands of marine life. Family-friendly destinations in Bangkok.",
   
    "CHOCOLATE VILLE": "Chocolate Ville Bangkok (Only Transfers if included) - No Ticket if Includeds. In evening go for chocolate ville - Chocolate Ville is open: Monday–Friday: 3 PM–12 AM and Saturday–Sunday: 2 PM–12 AM. Chocolate Ville in Bangkok is better when visited in the evening or during the sunset. Chocolate Ville at Bangkok is the place best known for the facades of European village themes located on the Bangkok outskirts. It may be of some solace to know that, unlike most other attractions across Phuket, Chocolate Ville does not have an entrance fee. It is a beautiful place used for filming, and it is also home to renowned restaurants and various shops to suit the needs of all individuals.",
   
    "DREAM WORLD": "Dream World + Snow Town + Lunch Bangkok / Without Lunch - (Transfers if included + Ticket if Included). After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- From hotel lobby at 10:00 AM & drop back to hotel around 05:00 PM, Duration 5 to 6 hours (approx.) Dream World & Snow Town in Bangkok, Admission Ticket if Included included. Hassle-free pickup and drop-off at your Bangkok hotel. The shows like The Colors of the World Parade, Animal Show, exciting Hollywood Action, or some mind-boggling street performance. Experience non-stop fun at Dream World, from adrenaline-pumping roller coasters to beautiful, fairy-tale landscapes perfect for creating unforgettable memories. Step into themed zones like Snow Town, where real snow and winter activities let you escape to a frosty wonderland even in Southeast Asia's tropical climate. Feel the adrenaline rush as you race through high-speed loops and jaw-dropping twists on Thunder Loop, one of Thailand's most extreme roller coasters. Enjoy the amazing Viking Ship ride that takes you to the sky, giving you a thrilling experience and spectacular 360-degree views of Dream World and its surroundings. Stroll through a world of giants at The Giant's Garden, where everything is magnified, creating a surreal and magical environment that feels like stepping into a storybook.",
   
    "TEMPLE TOUR": "En Route Bangkok Temple Tour (Golden Buddha + Marble Buddha + Gems Gallery) - Transfers if included + Ticket if Includeds. After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be in between 10:30am - 10:45am drop will be around 02:00 pm to 02:30 pm. En route the Half Day Temple Tour Bangkok Duration: 4 hours (approx). Half day Bangkok temple tour includes:- WAT BENCHAMABOPHIT (THE MARBLE TEMPLE) AND WAT TRAIMIT (THE GOLDEN BUDDHA TEMPLE). Get picked up from your hotel in Bangkok and sit comfortably and prepare yourself for the upcoming wonderful journey and get ready to explore some of the iconic locations in Bangkok. Embark on this 4-hour trip to the iconic temples of Bangkok and learn about the culture and traditions of Thailand. Interact with the locals and make some friends. Start your half-day temple tour in Bangkok by visiting the Wat Benchamabophit, which is also called Marble Temple. Stop at this Marble Temple for 1 hour and see the outstanding combination of Italian Carrara marble and classical Thai architecture. After that, head over to the Wat Traimit, Temple of the Golden Buddha. It's officially titled Phra Phuttha Maha Suwana Patimakon, which is a golden Maravijaya Attitude seated Buddharupa statue and weighs around 5.5 tonnes.",
    
    // Phuket attractions
    "PHI PHI ISLAND": "PHI PHI ISLAND BY SPEED BOAT WITH LUNCH -(SHARED TRANSFER) (EXCLUDING NATIONAL PARK FEES). After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- Pickup in between 07:30 am - 08:00 am drop will be around 05:00 pm to 05:30 pm. Full day phi phi island tour included - 2 BIG ISLANDS -KOH PHI PHI DON AND KOH PHI PHI LE, AND - KOH MAYA BAY & VIKING CAVE. A visit to Phuket would not be complete without a visit to Phi Phi Island. It's the topic of conversation for travelers all over Thailand. Regarded as one of the most beautiful islands in the world, with stunning scenery, beautiful beaches, and bays. Soak up the sunshine on remote beaches with time to swim at your leisure.",
   
    "HALF DAY PHUKET CITY TOUR": "HALF DAY PHUKET CITY TOUR (INCLUDING BIG BUDDHA TEMPLE) - (SHARED TRANSFER). After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- Pickup in between 10:00am - 10:15am drop will be around 02:00 pm to 03:00 pm. Half day phuket city tour included - BIG BUDDHA TEMPLE (WAT PHRA YAI), WAT CHALONG, KARON VIEW POINT/ KATA BEACH. The pickup was from your hotel nearby Patong Beach. You will cover a viewpoint of the beaches, Big Buddha temple, city view point. If Client asks if there is also Phuket old town, Just say yes as it's shared out there too.",
   
   "HHalf Day Phuket City Tour (Excluding Big Buddha)": "HALF DAY PHUKET CITY TOUR (Excluding BIG BUDDHA TEMPLE) . After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- Pickup in between 10:00am - 10:15am drop will be around 02:00 pm to 03:00 pm. Half day phuket city tour included -  WAT CHALONG, KARON VIEW POINT/ KATA BEACH. The pickup was from your hotel nearby Patong Beach. You will cover a viewpoint of the beaches, city view point. If Client asks if there is also Phuket old town, Just say yes as it's shared out there too.",

    "JAMES BOND ISLAND": "JAMES BOND ISLAND BY SPEED BOAT WITH LUNCH -(SHARED TRANSFER) (EXCLUDING NATIONAL PARK FEES). After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- Pickup in between 07:30 am - 08:15am drop will be around 05:00 pm to 05:30 pm. James bond island Activity Duration: 9 hours (approx). James Bond island includes:- PANAK ISLAND, PHANG NGA BAY, PANYEE ISLAND, JAMES BOND ISLAND WITH PING KAN ISLAND, NAKA ISLAND. Departure from Ao Po pier to Hong Island with its famous limestone rock for an amazing canoeing scenery. Sightseeing at Panak Island to enjoy the fantastic limestones. Explore Ice Cream Cave, the most important cave in Phang Nga Bay with its large stalactites, stalagmites and bats. Enjoy lunch at a floating restaurant at Panyee Island, the Muslim village. Own sightseeing after lunch. Visit to the world famous James Bond Island with Ping Kan island. Relaxing and swimming at Naka Island. Arrival at Ao Po pier and transfer back to your hotel.",

    "TIGER KINGDOM": "TIGER KINGDOM (MEDIUM TIGER) - (PRIVATE TRANSFER + TICKET). TIGER PARK PHUKET – (ONLY TIGER TICKET PURCHASED BY THE CLIENT ON THE SPOT) - PRIVATE TRANSFER. After having breakfast at hotel, pickup will done from hotel lobby and will drop you at:- Tiger kingdom phuket Timing 9am - 5pm (Open daily including public holiday), Activity Duration: 2-3 hours. Tiger kingdom includes:- 'PRIVATE TRANSFER, TIGER TICKETS AVAILABLE (SMALLEST, MEDIUM AND THE BIGGEST ONE) ON THE SPOT YOU NEED TO BUY' - You can take picture with selective tiger in cage. There is Different types of Ticket, depends on what you take - Walk around - You are allowed to see and walk around tigers outside the cage, Full Tiger Ticket - You are allowed to Go in Cage of tiger and take picture with your phone with tigers.",

    "FANTASEA": "EVENING FANTASEA SHOW PHUKET (DINNER + TICKET) - SHARED TRANSFER. Pickup in between 05:30 am - 05:45am drop will be around 09:30pm to 10:00pm. Duration: 6 hours, Tour returns to your hotel at approximately 10:30pm. Fantasea show includes:- 'FANTASY OF A KINGDOM', 'PALACE OF THE ELEPHANT'S THEATER, GOLDEN KINNAREE BUFFET RESTAURANT, GOLDEN PAVILION, MAGIC MOUNTAIN, CULTURAL ILLUSION THEATRICAL SHOW, BEER GARDEN & DRINKS BARS, STREETS SHOWS, IYARA SPECTACULAR' FIREWORKS EXTRAVAGANZA, FESTIVAL GAMES, AND MANY MORE ACTIVITIES. Fantasea nighttime attraction offers a multitude of attractions not found anywhere else in the world Explore the magical cultural theme park of FantaSea, Enjoy the award winning spectacular show, Delicious buffet dinner at Asia's largest buffet restaurant.",

    "JAMES BOND HONG ISLAND": "JAMES BOND ISLAND + HONG ISLAND BY SPEED BOAT WITH LUNCH - SHARED TRANSFER (EXCLUDING NATIONAL PARK FEES). After breakfast from the hotel, your pick up from the hotel lobby and the pickup timing will be - Pick up between 07:30 am - 09:45am drop will be around 05:00 pm to 05:30 pm. Full day James bond+ Hong island tour include - kho ping kon, Panyee island, Part of Hong island. Visit James bond island/khao phing kan, an island that was featured in the movie THE MAN WITH THE GOLDEN GUN.....in this island you will be able to visit the cave and few meters away from the shores of this island, you will sea koh tapu, a 20 material island. Visit the famous fisherman village koh pan - yee for sightseeing and shopping a Muslim floating village built on stilts. This is where the Thai set lunch are served. Lunch is included in the price of the tour. Do sightseeing around khao maju and khao khein.. visit (part of Hong island) only 1 of 3 different points. (Depending on weather and tide condition.) 1. Lao landing/Paradise Island (for swimming) 2.koh pakbia (for swimming) 3.Laem kha (for snorkeling)",

    "PHUKET LEISURE": "PHUKET On the Leisure day. You can explore by yourself like - phuket patong beach kata, Kamala beach, Karon view point and patong market and nightclub...",

    "PHUKET CITY TOUR": "5 HOURS PHUKET CITY TOUR (INCLUDING WAT CHALONG TEMPLE + KARON VIEW POINT) - PRIVATE TRANSFER. After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- Pickup in between 10:00am - 10:15am drop will be around 02:00 pm to 03:00 pm. Half day phuket city tour included - BIG BUDDHA TEMPLE (WAT PHRA YAI), WAT CHALONG TEMPLE (CHAITHARARAM TEMPLE), KARON VIEW POINT & PHUKET OLD TOWN. All need to cover in 5 hr, so manage the time accordingly, if Any extra time occur then client have to pay on spot to driver.(Time start from Pickup and ends at drop) The pickup was from your hotel nearby Patong Beach. You will cover a viewpoint of the beaches, Big Buddha temple,Wat Chalong temple, City view point, and Phuket Old Town.",

    "ELEPHANT SANCTUARY": "5 HRS DISPOSAL VAN FOR ELEPHANT SANCTUARY + TIGER PARK PHUKET ONLY TRANSFER - NO TICKETS ADDED (TICKETS PURCHASED BY THE CLIENT ON THE SPOT). After having breakfast at hotel, pickup will done from hotel lobby and will drop you at:- Elephant sanctuary timing 09:30am to 05:00pm. Its available for both morning and afternoon slots. Visitors are allowed to watch the elephants play, take mud baths and touch and feed them. Capture unforgettable moments with elephants. Enjoy swimming and having a mud spa session together with your new elephant friends. Elephant Jungle Sanctuary offers you a once-in-a-lifetime opportunity to spend quality and fun time with your new adorable elephant friends in their natural home. Make friends with adorable elephants. Have a mud spa with these gentle giants! Spend a fun-filled and meaningful day at this wonderful elephant sanctuary. Choose to join the program in the morning or afternoon, or even opt to bond with these gentle giants the whole day. You will also gain an insight into their stories and have a chance to participate in their daily activities such as eating, swimming, and bathing.",

    "CARNIVAL MAGIC SHOW": "CARNIVAL MAGIC SHOW (WITH DINNER + TICKET) / (WITHOUT DINNER + TICKET) - SHARED TRANSFER. For carnival magic show at Phuket In evening the timings are;- Operating hours are 5:30pm – 11:30 pm. Open on these days (SAT/WED/MON). Please be ready at your hotel lobby 10 minutes before pick-up time and the transport can be slightly late due to traffic. Immerse yourself in Thai culture as you explore traditional festivals & fairs while visiting the famous Carnival Magic Park in Phuket. Stroll through a 16,000-square-metre indoor theatre, the River Palace Paradium with 2200 seats, and admire its breathtaking architecture. Be amazed by the spectacular views of more than 40 million dazzling lights as you visit the Kingdom of Lights, the palace grounds of the prince. Explore various Thai cultural carnival-style attractions in the theme park and spend a fun-packed time with rides, games & street performances.",

    "SEA AQUARIUM": "SEA AQUARIUM + AR TRICKEYE MUSEUM - (PRIVATE TRANSFER + TICKET). After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- Timing 10;30 am to 08 pm, Duration 2 to 3 hours (approx.) AQUARIA IS THE BEST AQUARIUM IN PHUKET AND THE BIGGEST IN THAILAND Located in the heart of the city, beneath Central Phuket Floresta A magical underwater journey at Phuket's best aquarium that takes you through the wonders of the ocean and the mysteries of the rivers. Be entertained and inspired by over 25,000 animals and interact with our knowledgeable and friendly staff to learn more about the wonders of the ocean. And Awaken all your five senses as you step into TRICK EYE'S WORLD OF 4D. Be entertained by the mystical encounter, feel your adrenaline rush, overcome your fears, feel love in the air, escape into fantasy and experience the trick world!",

    "DOLPHINS SHOW PHUKET": "DOLPHINS SHOW PHUKET (REGULAR SEAT) - PRIVATE TRANSFER + TICKETS. Duration 2 Hours | Morning, Afternoon, Evening slot available. Tuesday closed. Enjoy the dolphins and jumping through hoops, playing with trainers and bouncing on water. Perfect for both adults and children, the shows at Dolphins Bay Phuket are one of the best Be entertained by the dolphins and fur seals, and take a picture with the friendly marine creatures for an additional fee. Please note that the only show timings available are 11:00hrs, 14:00hrs and 17:00 hrs. You will get an entrance ticket with a regular seat to the show.",

    "SIAM NIRMIT SHOW": "SIAM NIRMIT SHOW:- In evening go for Siam nirmit show Opens everyday (except tuesday), Activity Timings: 08:30 PM, Duration: 1 Hour 20 Minutes, Dinner time - 6pm to 8pm. This show include Thai Village, Naga Courtyard activities, World Famous Thai Street Food. Siam Niramit, a world-class showcase of Thailand's arts and cultural heritage. Enjoy amazing Thai dances showcasing Thailand's cultural heritage and have an unforgettable experience. Explore the beautiful Thai Village, have a glimpse of daily life, and admire a range of Thai art & craft objects. Immerse yourself in 100 wonderful set pieces & artistic backdrops while enjoying state-of-the-art stage performances. Be amazed by the show of 100 performers with 500 colorful costumes as you see 3-act performances with special effects.",

    "HONG ISLAND": "HONG ISLAND BY LONG TAIL BOAT WITHOUT LUNCH - SHARED TRANSFER (EXCLUDING NATIONAL PARK FEES). Hong Island Activity Duration: 6-7 hours (approx.) Get ready to be picked up from your hotel in the morning and embark on this exciting trip to Hong Island. Visit the Hong Islands, part of Than Bok Horani National Park, with this group boat tour. With this day tour to Hong Island, explore the serenity of beaches and limestone cliffs while indulging in water activities. Enjoy a fun speedboat ride at the start of your journey and enjoy the stunning view of the background which consists of immense cliffs of Phang Nga Bay. You'll get the chance to snorkel in crystalline waters, sunbathe on white-sand beaches, and check out beautiful rock formations.",
    
    // Krabi attractions
    "4 ISLAND": "4 ISLAND BY LONG TAIL BOAT WITH LUNCH - (SHARED TRANSFER) (EXCLUDING NATIONAL PARK FEES). After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- Be picked up from your hotel in Krabi Town, or Ao Nang between 8:00 AM and 8:30 AM and drop you nearby 04:30 pm to 05:00 pm, Activity Duration: 7 hours (approx.) 4 islands include:- CHICKEN ISLAND, TUB ISLAND, RAILAY ISLAND AND PODA ISLAND. Enjoy a 20-minute boat ride to Railay Beach, where the boat will stop to pick up some remaining passengers at 9:30 AM.Visit the well-known beaches of Krabi like Tub island, Chicken Island, and many other beautiful beaches and Then, head to Phranang Cave which will be the first stop.Visit Phranang Cave, a very famous cave known as the house of a princess spirit who is respected and worshiped by the local people. Continue to Chicken Island where there is a distinctive rock formation that looks like a chicken. This is an excellent snorkeling spot with marine life that will amaze you. After relaxing here, enjoy your included lunch box.",

    "7 ISLAND": "7 ISLAND SUNSET BBQ DINNER KRABI – (SHARED TRANSFER) (EXCLUDING NATIONAL PARK FEES) BY LONG TAIL BOAT. After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- Pickup in between 01:00 pm - 01:30 pm drop will be around 08:00 pm to 08:30 pm. In the 7 island tour your national park fee is not included so now you will not be able to do snorkeling at 7 island. The 7 island tour includes - PODA ISLAND, CHICKEN ISLAND, TUP ISLAND, DOOR ISLAND, PHRA NANG BEACH, TALU AND MADURAI. Gear up for a memorable tour of 7 islands with your folks and spend an amazing time in the lap of nature. Get picked up from your hotel located in Krabi Town, Klong Muang Area, and Ao Nang Area at 01:00 PM and start your exciting afternoon trip. Reach Nopparat Thara Pier at 02:00 PM, hop on a longtail boat, and depart to the prominent islands. Enjoy adventurous snorkeling activities with your folks as you reach Yasawa Island. Arrive the Tang Ming Island and get an adventurous feel while you indulge in more snorkeling sessions.",

    "KRABI LEISURE": "KRABI On the Leisure day. You can explore by own Krabi Town, food, culture and ao nang beach and ao nang market",

    "KRABI JUNGLE TOUR": "KRABI JUNGLE TOUR (EMERALD POOL + HOT SPRING) - (SHARED TRANSFER) (EXCLUDING NATIONAL PARK FEES). After Breakfast in Hotel you will Pick Up in morning near 8 am. Emerald Pool: Our first stop is the stunning Emerald Pool. This mineral pool hidden in the midst of a lush forest is the perfect place to beat the mid-morning heat. Swim in the clear blue green waters and take photos of the picturesque surroundings before we walk along the path to our next destination. Blue Lagoon: Just short of 500m from the Emerald Pool, the Blue Pool is another gorgeous gem in the area surrounded by large, overhanging trees with roots that extend across the water. We'll spend some time here for photos and simply take a moment to appreciate the natural beauty. Hot Springs Waterfall: After enjoying a spot of lunch at a local restaurant, we'll take some time to rest and relax at the Hot Springs Waterfall.",
    
    // Koh Samui attractions
    "ANGTHONG NATIONAL PARK": "ANGTHONG NATIONAL PARK BY BIG BOAT - (SHARED TRANSFER)(EXCLUDING NATIONAL PARK FEES). After breakfast from the hotel, you will pick from hotel lobby and the pickup timing will be:- Pickup in between 08:00 am - 08:30 pm drop will be around 05:00 pm to 05:30 pm. In the angthong tour your national park fee is not included so now you will not be able to do snorkeling at angthong. Angthong Ang Thong National Park includes - THE KOH WUA TALAP ISLAND, AND THE KOH MAE, OR THE MOTHER ISLAND. The Viewpoint at Wua Talap is one of the biggest attractions of the Ang Thong National Marine Park tour Koh Samui. The Viewpoint is essentially an observation platform located on the peak of a nearby hill, which can be reached by climbing a series of wooden stairs. Once at the summit. You can get a full, unobstructed view of the glittering green sea below.",

    "KOH SAMUI LEISURE": "KOH SAMUI ON THE LEISURE DAY. After having breakfast you can go nearby places in Koh Samui i.e., Chaweng Beach, Lamai Beach, Wat Phra Yai, Angthong National Marine Park, Big Buddha Temple, Hin Ta & Hin Yai Rocks, Na Muang Waterfall, Wat Plai Laem, Fisherman's village, Secret Buddha Garden, Lamai Sunday Night Market, Samui Aquarium and Tiger Zoo and many more. Explore!",
    
    // Transfer descriptions
    "TRANSFER FROM BANGKOK AIRPORT TO PATTAYA HOTEL": "Arrival at Bangkok airport - meet & greet check in at Pattaya hotel. Day on leisure, overnight stay at hotel.",
    
    "TRANSFER FROM BANGKOK HOTEL TO BANGKOK AIRPORT": "After breakfast, checkout from your hotel. You will be picked up and transferred to the airport to catch your flight back home. Your trip ends with sweet memories. Have a safe flight.",
    
    "TRANSFER FROM PATTAYA HOTEL TO BANGKOK HOTEL": "After a scrumptious breakfast, check out from the hotel & transfer to Bangkok via private transfer and explore the Sukhmvit & Pratunam area.",
    
    "TRANSFER FROM BANGKOK AIRPORT TO BANGKOK HOTEL": "Arrival at Bangkok airport - meet & greet check in at Bangkok hotel. Day on leisure, overnight stay at hotel.",
    
    "TRANSFER FROM PATTAYA HOTEL TO BANGKOK AIRPORT": "After a scrumptious breakfast, check out from hotel & transfer to Bangkok hotel.",
    
    "TRANSFER FROM BANGKOK HOTEL TO PATTAYA HOTEL": "After a scrumptious breakfast, check out from the hotel & transfer to Pattaya via private transfer and explore the Jomtien beach, pattaya beach, Wong Amatbeach, Naklua beaches area.",
    
    // New transfer descriptions
    "TRANSFER FROM PHUKET AIRPORT TO KRABI HOTEL": "Arrival at Phuket airport - meet & greet check in at Krabi hotel. Day on leisure, overnight stay at hotel.",
    
    "TRANSFER FROM KRABI AIRPORT TO KRABI HOTEL": "Arrival at Krabi airport - meet & greet check in at Krabi hotel. Day on leisure, overnight stay at hotel.",
    
    "TRANSFER FROM PHUKET AIRPORT TO PHUKET HOTEL": "Arrival at Phuket airport - meet & greet check in at Phuket hotel. Day on leisure, overnight stay at hotel.",
    
    "TRANSFER FROM PHUKET HOTEL TO PHUKET AIRPORT": "After breakfast, checkout from your hotel. You will be picked up and transferred to the airport to catch your flight back home. Your trip ends with sweet memories. Have a safe flight.",
    
    "TRANSFER FROM KRABI HOTEL TO PHUKET HOTEL": "After a scrumptious breakfast, check out from the hotel & transfer to Phuket via private transfer and explore the Patong area.",
    
    "TRANSFER FROM PHUKET HOTEL TO KRABI HOTEL": "After a scrumptious breakfast, check out from the hotel & transfer to Krabi via private transfer and explore the Ao nang area.",
    
    "TRANSFER FROM KRABI HOTEL TO KRABI AIRPORT": "After breakfast, checkout from your hotel. You will be picked up and transferred to the airport to catch your flight back home. Your trip ends with sweet memories. Have a safe flight.",
    
    "TRANSFER FROM PHUKET HOTEL TO PHUKET AIRPORT & TRANSFER FROM BANGKOK AIRPORT TO BANGKOK HOTEL": "After having breakfast you will drop to the Phuket airport to fly to Bangkok and from Bangkok airport will drop you to the Bangkok hotel and overnight stay at the hotel.",
    
    "TRANSFER FROM PHUKET HOTEL TO PHUKET AIRPORT & TRANSFER FROM BANGKOK AIRPORT TO PATTAYA HOTEL": "After having breakfast you will drop to the Phuket airport to fly to Bangkok and from Bangkok airport will drop you to the Pattaya hotel and overnight stay at the hotel.",
    
    "TRANSFER FROM BANGKOK HOTEL TO BANGKOK AIRPORT & TRANSFER FROM KRABI AIRPORT TO KRABI HOTEL": "After having breakfast you will drop to the Bangkok airport to fly to Krabi and from Krabi airport will drop you to the krabi hotel and overnight stay at the hotel.",
    
    "TRANSFER FROM KRABI HOTEL TO KRABI AIRPORT & TRANSFER FROM BANGKOK AIRPORT TO PATTAYA HOTEL": "After having breakfast you will drop to the Krabi airport to fly to Bangkok and from Bangkok airport will drop you to the Pattaya hotel and overnight stay at the hotel.",
    
    "TRANSFER FROM KRABI HOTEL TO KRABI AIRPORT & TRANSFER FROM BANGKOK AIRPORT TO BANGKOK HOTEL": "After having breakfast you will drop to the Krabi airport to fly to Bangkok and from Bangkok airport will drop you to the Bangkok hotel and overnight stay at the hotel.",
    
    "TRANSFER FROM BANGKOK HOTEL TO BANGKOK AIRPORT & TRANSFER FROM PHUKET AIRPORT TO PHUKET HOTEL": "After having breakfast you will drop to the Bangkok airport to fly to Phuket and from Phuket airport will drop you to the Phuket hotel and overnight stay at the hotel.",
    
    "TRANSFER FROM KRABI HOTEL TO PHI PHI PIER": "Set sail for Phi Phi island on a ferry and admire the picturesque views en route. You will be picked up from your hotel within Ao Nang and transferred to Nopparat Pier (Krabi)to catch the ferry. Transfers from Ton Sai Pier to your hotel need to be arranged at your end.",
    
    "TRANSFER FROM PHI PHI PIER TO PHUKET HOTEL": "Enjoy the magical seascape as you take the ferry ride to Phuket. Hop on to the ferry from Ton Sai Pier and once you reach Rassada Pier, you will be transferred to your hotel in Phuket(Patong, Phuket Town, Kata, Karon only). Transfers from your hotel to Tonsai Pier need to be arranged at your end.",
    
    "TRANSFER FROM PHUKET HOTEL TO PHI PHI PIER": "After breakfast the driver picks you up from your hotel in Phuket at the prearranged time and transfers you to the Phuket Rassada Pier. From there, board the ferry, which takes you on a 2-hour ride to Ton Sai Pier on Phi Phi Island. From Ton Sai Pier, arrange your own transportation to your hotel in Phi Phi. 3 hours (approx.)",
    
    "TRANSFER FROM PHI PHI PIER TO PHUKET AIRPORT": "After breakfast, checkout from your hotel. You will be picked up from Phi Phi Pier and drop at Phuket Airport, you'll take a ferry from Phi Phi to Rassada Pier in Phuket, followed by a private transfer to the airport to catch your flight back home. Your trip ends with sweet memories. Have a safe flight.",

    "Dinner at an Indian Restaurant":"Have Amazing Dinner at the Indian Restauarnt",

    "Lunch at an Indian Restaurant":"Have Amazing Lunch at the Indian Restauarnt"
  };
  
  // Clean and normalize the input place
  const normalizedInput = normalizeInput(place);
  Logger.log(`Normalized input: ${normalizedInput}`);

  // Create a normalized version of the fallbackDescriptions keys
  const normalizedKeys = {};
  for (const key in fallbackDescriptions) {
    normalizedKeys[normalizeInput(key)] = fallbackDescriptions[key];
  }

  // Check for an exact match first
  if (fallbackDescriptions[place.trim().toUpperCase()]) {
    Logger.log('Found exact match in fallback descriptions');
    return fallbackDescriptions[place.trim().toUpperCase()];
  }
  
  // Check for normalized match
  if (normalizedKeys[normalizedInput]) {
    Logger.log('Found normalized match in fallback descriptions');
    return normalizedKeys[normalizedInput];
  }
  
  // If no exact or normalized match, try starts-with
  const cleanedUpperPlace = place.trim().toUpperCase();
  for (const key in fallbackDescriptions) {
    const upperKey = key.toUpperCase();
    if (cleanedUpperPlace.startsWith(upperKey)) {
      Logger.log('Found starts-with match in fallback descriptions');
      return fallbackDescriptions[key];
    }
  }

  Logger.log('No information found from any source');
  return "No travel information found for this location. Please try searching with a more specific name or check the spelling.";
}

function getCombinedPlaceIntro(place) {
  const wikiVoyageText = getWikiVoyageIntro(place);
  if (wikiVoyageText && wikiVoyageText.length > 50) return wikiVoyageText;

  const wikiText = getWikipediaIntro(place);
  return wikiText || "No travel info found.";
}

function getWikiVoyageIntro(place) {
  Logger.log(`Searching WikiVoyage for: ${place}`);
  // Add common location suffixes to improve search
  const searchTerms = [
    place,
    `${place} (monument)`,
    `${place} (temple)`,
    `${place} (palace)`,
    `${place} (attraction)`
  ];

  for (const searchTerm of searchTerms) {
    Logger.log(`Trying WikiVoyage search term: ${searchTerm}`);
    const url = `https://en.wikivoyage.org/w/api.php?action=query&prop=extracts&format=json&exintro&explaintext&redirects=1&titles=${encodeURIComponent(searchTerm)}&origin=*`;
    try {
      const response = UrlFetchApp.fetch(url);
      const json = JSON.parse(response.getContentText());
      
      // Check for redirects
      if (json.query.redirects) {
        Logger.log(`Found redirect: ${json.query.redirects[0].to}`);
        const redirectUrl = `https://en.wikivoyage.org/w/api.php?action=query&prop=extracts&format=json&exintro&explaintext&titles=${encodeURIComponent(json.query.redirects[0].to)}&origin=*`;
        const redirectResponse = UrlFetchApp.fetch(redirectUrl);
        const redirectJson = JSON.parse(redirectResponse.getContentText());
        const pageId = Object.keys(redirectJson.query.pages)[0];
        const extract = redirectJson.query.pages[pageId].extract;
        
        if (extract && !extract.includes("does not exist")) {
          return extract;
        }
      }
      
      const pageId = Object.keys(json.query.pages)[0];
      const extract = json.query.pages[pageId].extract;
      
      Logger.log(`WikiVoyage response for ${searchTerm}: ${extract ? 'Found content' : 'No content'}`);
      
      // Check if we got a valid response (not a missing page)
      if (extract && !extract.includes("does not exist")) {
        return extract;
      }
    } catch (e) {
      Logger.log(`WikiVoyage error for ${searchTerm}: ${e}`);
      continue;
    }
  }
  return "";
}

function getWikipediaIntro(place) {
  Logger.log(`Searching Wikipedia for: ${place}`);
  // Add common location suffixes to improve search
  const searchTerms = [
    place,
    `${place} (monument)`,
    `${place} (temple)`,
    `${place} (palace)`,
    `${place} (attraction)`
  ];

  for (const searchTerm of searchTerms) {
    Logger.log(`Trying Wikipedia search term: ${searchTerm}`);
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro&explaintext&redirects=1&titles=${encodeURIComponent(searchTerm)}&origin=*`;
    try {
      const response = UrlFetchApp.fetch(url);
      const json = JSON.parse(response.getContentText());
      
      // Check for redirects
      if (json.query.redirects) {
        Logger.log(`Found redirect: ${json.query.redirects[0].to}`);
        const redirectUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro&explaintext&titles=${encodeURIComponent(json.query.redirects[0].to)}&origin=*`;
        const redirectResponse = UrlFetchApp.fetch(redirectUrl);
        const redirectJson = JSON.parse(redirectResponse.getContentText());
        const pageId = Object.keys(redirectJson.query.pages)[0];
        const extract = redirectJson.query.pages[pageId].extract;
        
        if (extract && !extract.includes("does not exist")) {
          return extract;
        }
      }
      
      const pageId = Object.keys(json.query.pages)[0];
      const extract = json.query.pages[pageId].extract;
      
      Logger.log(`Wikipedia response for ${searchTerm}: ${extract ? 'Found content' : 'No content'}`);
      
      // Check if we got a valid response (not a missing page)
      if (extract && !extract.includes("does not exist")) {
        return extract;
      }
    } catch (e) {
      Logger.log(`Wikipedia error for ${searchTerm}: ${e}`);
      continue;
    }
  }
  return "";
}

function getUnsplashImage(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`;
  try {
    const response = UrlFetchApp.fetch(url);
    const json = JSON.parse(response.getContentText());
    return json.results?.[0]?.urls?.small || "https://via.placeholder.com/150";
  } catch (e) {
    Logger.log(`Unsplash error for ${query}: ${e}`);
    return "https://via.placeholder.com/150";
  }
}

function generateFullVoucher() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[21]; // Row 22 (0-indexed)
  const rows = data.slice(22); // Data starts from row 23
  const folder = DriveApp.getFolderById(DEST_FOLDER_ID);

  // Find columns by header names
  const dayIdx = headers.indexOf("Day");
  const dateIdx = headers.indexOf("Date");
  const sightseeingIdx = headers.indexOf("Sightseeing Name");
  const pickupIdx = headers.indexOf("Pickup Location");
  const dropIdx = headers.indexOf("Drop Location");
  const pickupTimeIdx = headers.indexOf("Pickup Time");
  const returnTimeIdx = headers.indexOf("Return Time");
  const samePickupDropIdx = headers.indexOf("Same Pickup/Drop (Y/N)");
  const descriptionIdx = headers.indexOf("Description");
  const imageUrlIdx = headers.indexOf("Raw Image URL");

  // Fetch top section values directly from cells
  const clientName = sheet.getRange('B1').getValue();
  const bookingCode = sheet.getRange('B2').getValue();
  const destination = sheet.getRange('B3').getValue();

  // Get all hotel rows (A13:C21)
  const hotelRows = sheet.getRange('A13:C21').getValues().filter(row => row[0] || row[1] || row[2]);
  // Get first hotel, start date, end date for summary
  const hotel = hotelRows.length > 0 ? hotelRows[0][0] : '';
  const startDate = hotelRows.length > 0 ? hotelRows[0][1] : '';
  const endDate = hotelRows.length > 0 ? hotelRows[0][2] : '';

  // Get all flight details (B5:B11)
  const flightDetails = sheet.getRange('B5:B11').getValues().flat().filter(String);

  // Get or create a copy of the template document
  let docCopy;
  try {
    docCopy = DriveApp.getFileById(DOC_TEMPLATE_ID).makeCopy(`${clientName} - Full Itinerary`, folder);
  } catch (e) {
    SpreadsheetApp.getUi().alert("Error creating document: " + e);
    return;
  }
  
  // Open the document
  const doc = DocumentApp.openById(docCopy.getId());
  const body = doc.getBody();
  
  // Set the font family to DM Serif for the entire document
  body.setFontFamily("DM Serif Display");
  
  // Clear ALL content from the document
  const totalElements = body.getNumChildren();
  let paragraphFound = false;
  
  if (totalElements > 0) {
    for (let i = 0; i < totalElements; i++) {
      if (body.getChild(i).getType() === DocumentApp.ElementType.PARAGRAPH) {
        paragraphFound = true;
        break;
      }
    }
    
    if (!paragraphFound) {
      body.appendParagraph("");
    }
    
    for (let i = 0; i < body.getNumChildren(); i++) {
      const child = body.getChild(i);
      
      if (child.getType() === DocumentApp.ElementType.PARAGRAPH) {
        child.asParagraph().setText(" ");
      } else {
        try {
          body.removeChild(child);
          i--;
        } catch (e) {
          Logger.log("Could not remove element: " + e);
        }
      }
    }
  } else {
    body.appendParagraph(" ");
  }
  
  // Client information section
  const clientInfoTable = body.appendTable();
  clientInfoTable.setBorderWidth(0);
  
  // Add client information rows
  const infoRows = [
    ["Client Name:", clientName || ''],
    ["Booking Code:", bookingCode || ''],
    ["Trip Start Date:", startDate || ''],
    ["Trip End Date:", endDate || ''],
    ["Destination:", destination || '']
  ];
  
  infoRows.forEach(([label, value]) => {
    const row = clientInfoTable.appendTableRow();
    const labelCell = row.appendTableCell().setText(label);
    labelCell.setFontSize(12).setBold(true).setFontFamily("DM Serif Display");
    const valueCell = row.appendTableCell().setText(value);
    valueCell.setFontSize(12).setFontFamily("DM Serif Display");
  });
  
  // Style the table cells
  for (let i = 0; i < clientInfoTable.getNumRows(); i++) {
    for (let j = 0; j < clientInfoTable.getRow(i).getNumCells(); j++) {
      clientInfoTable.getRow(i).getCell(j).setPaddingTop(2).setPaddingBottom(2).setFontFamily("DM Serif Display");
    }
  }
  
  body.appendParagraph('').setFontSize(8).setFontFamily("DM Serif Display");
  
  // Flight Details Section
  const flightHeader = body.appendParagraph("FLIGHT DETAILS");
  flightHeader.setHeading(DocumentApp.ParagraphHeading.HEADING2)
    .setFontSize(14)
    .setAlignment(DocumentApp.HorizontalAlignment.LEFT)
    .setFontFamily("DM Serif Display");
  
  if (flightDetails.length > 0) {
    flightDetails.forEach((flight, index) => {
      body.appendParagraph(`Flight Details ${index + 1}:   ${flight}`).setFontSize(12).setFontFamily("DM Serif Display");
    });
  } else {
    body.appendParagraph("No flight details available").setFontSize(12).setFontFamily("DM Serif Display");
  }
  
  body.appendParagraph('').setFontSize(8).setFontFamily("DM Serif Display");
  
  // Hotel Details Section
  const hotelHeader = body.appendParagraph("HOTEL DETAILS");
  hotelHeader.setHeading(DocumentApp.ParagraphHeading.HEADING2)
    .setFontSize(14)
    .setAlignment(DocumentApp.HorizontalAlignment.LEFT)
    .setFontFamily("DM Serif Display");
  
  if (hotelRows.length > 0) {
    hotelRows.forEach(row => {
      const [hotelName, checkIn, checkOut] = row;
      const hotelLine = body.appendParagraph(`${hotelName}:        Check-in: ${checkIn || 'Not specified'}, Check-out: ${checkOut || 'Not specified'}`);
      hotelLine.setFontSize(12).setFontFamily("DM Serif Display");
    });
  } else {
    body.appendParagraph('No hotel details available').setFontSize(12).setFontFamily("DM Serif Display");
  }
  
  // Add page break before Day-By-Day Summary
  body.appendPageBreak();
  
  // DAY-BY-DAY SUMMARY STARTS HERE - PAGE 2
  const summaryHeader = body.appendParagraph("DAY-BY-DAY SUMMARY");
  summaryHeader.setHeading(DocumentApp.ParagraphHeading.HEADING2)
    .setFontSize(14)
    .setAlignment(DocumentApp.HorizontalAlignment.LEFT)
    .setFontFamily("DM Serif Display");
  
  // Organize activities by day for the summary
  const activitiesByDay = {};
  rows.forEach(row => {
    const day = row[dayIdx];
    if (!day) return;
    if (!activitiesByDay[day]) activitiesByDay[day] = [];
    activitiesByDay[day].push(row);
  });

  const sortedDays = Object.keys(activitiesByDay).sort((a, b) => Number(a) - Number(b));
  
  const summaryTable = body.appendTable();
  summaryTable.setBorderWidth(1);
  
  // Add header row
  let headerRow = summaryTable.appendTableRow();
  headerRow.appendTableCell().setText("Day").setFontSize(12).setBold(true).setFontFamily("DM Serif Display");
  headerRow.appendTableCell().setText("Date").setFontSize(12).setBold(true).setFontFamily("DM Serif Display");
  headerRow.appendTableCell().setText("Place").setFontSize(12).setBold(true).setFontFamily("DM Serif Display");
  
  // Add each day to the summary
  for (const day of sortedDays) {
    const dayActivities = activitiesByDay[day];
    const date = dayActivities[0][dateIdx];
    
    for (const activity of dayActivities) {
      const sightseeing = activity[sightseeingIdx];
      if (!sightseeing) continue;
      
      const summaryRow = summaryTable.appendTableRow();
      summaryRow.appendTableCell().setText(`Day ${day}`).setFontSize(12).setFontFamily("DM Serif Display");
      summaryRow.appendTableCell().setText(`${date}`).setFontSize(12).setFontFamily("DM Serif Display");
      summaryRow.appendTableCell().setText(sightseeing).setFontSize(12).setFontFamily("DM Serif Display");
    }
  }
  
  // Add page break before detailed itinerary
  body.appendPageBreak();
  
  // DETAILED ITINERARY STARTS HERE - PAGE 3 ONWARDS
  const itineraryTitle = body.appendParagraph("DETAILED ITINERARY");
  itineraryTitle.setHeading(DocumentApp.ParagraphHeading.HEADING1)
    .setFontSize(16)
    .setAlignment(DocumentApp.HorizontalAlignment.CENTER)
    .setFontFamily("DM Serif Display");
  
  body.appendParagraph('').setFontFamily("DM Serif Display");
  
  // Add day-by-day detailed itinerary
  for (const day of sortedDays) {
    const dayActivities = activitiesByDay[day];
    const date = dayActivities[0][dateIdx];

    const dayHeader = body.appendParagraph(`DAY ${day} - ${date}`);
    dayHeader.setHeading(DocumentApp.ParagraphHeading.HEADING3).setFontSize(12).setBold(true).setFontFamily("DM Serif Display");

    for (const activity of dayActivities) {
      const sightseeing = activity[sightseeingIdx];
      const pickup = activity[pickupIdx];
      const drop = activity[dropIdx];
      const pickupTime = activity[pickupTimeIdx];
      const returnTime = activity[returnTimeIdx];
      const samePickupDrop = activity[samePickupDropIdx];
      const description = activity[descriptionIdx];
      const imageURL = activity[imageUrlIdx];

      if (!sightseeing) continue;

      // Activity name with enhanced styling
      const nameHeader = body.appendParagraph(sightseeing);
      nameHeader.setFontSize(14)
        .setBold(true)
        .setBackgroundColor('#f8f9fa')
        .setFontFamily("DM Serif Display");
      
      // Activity details with improved formatting
      const detailsPara = body.appendParagraph(`Pickup From: ${pickup} at ${formatTime(pickupTime)} | Drop To: ${drop}`);
      detailsPara.setFontSize(11)
        .setForegroundColor('#666666')
        .setFontFamily("DM Serif Display");
      
      if (samePickupDrop && samePickupDrop.toUpperCase() === 'Y') {
        const returnPara = body.appendParagraph(`Return Time: ${formatTime(returnTime)}`);
        returnPara.setFontSize(11)
          .setForegroundColor('#666666')
          .setFontFamily("DM Serif Display");
      }
      
      // For description and image, create a more descriptive layout
      if (description || (imageURL && imageURL.startsWith('http'))) {
        // Create a table with 1 row, 2 columns for description and image
        const descImgTable = body.appendTable();
        descImgTable.setBorderWidth(0); // Remove border
        const row = descImgTable.appendTableRow();
        // Description cell
        const descCell = row.appendTableCell();
        const descPara = descCell.appendParagraph(description || "");
        descPara.setFontSize(7).setFontFamily("DM Serif Display");
        descCell.setFontFamily("DM Serif Display");
        // Image cell
        const imgCell = row.appendTableCell();
        imgCell.setFontFamily("DM Serif Display");
        if (imageURL && imageURL.startsWith('http')) {
          try {
            const blob = UrlFetchApp.fetch(imageURL).getBlob();
            const img = imgCell.appendImage(blob);
            img.setWidth(120);
            img.setHeight(90);
          } catch (e) {
            imgCell.setText("Image not available").setFontFamily("DM Serif Display");
          }
        } else {
          imgCell.setText("No image").setFontFamily("DM Serif Display");
        }
      }

      // Add a separator between activities
      body.appendParagraph('').setFontFamily("DM Serif Display");
    }

    if (day !== sortedDays[sortedDays.length - 1]) {
      body.appendPageBreak();
    }
  }

  doc.saveAndClose();

  const pdf = DriveApp.getFileById(docCopy.getId()).getAs('application/pdf');
  folder.createFile(pdf);

  SpreadsheetApp.getActiveSpreadsheet().toast("Itinerary PDF with images generated!", "Done", 3);
}

function formatTime(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'hh:mm a');
  }
  return value.toString();
}

// Add this new function for setting up the template with background
function setupTemplateBackground() {
  try {
    // Open the template document
    const templateDoc = DocumentApp.openById(DOC_TEMPLATE_ID);
    const body = templateDoc.getBody();
    
    // Clear the document
    try {
      body.clear();
      body.appendParagraph(" ");  // Add at least one paragraph
    } catch (e) {
      // Clear failed, try to clean manual
      while (body.getNumChildren() > 0) {
        try {
          body.removeChild(body.getChild(0));
        } catch (e) {
          break;  // Can't remove anymore
        }
      }
      body.appendParagraph(" ");  // Ensure at least one paragraph
    }
    
    // Get the document dimensions
    const pageWidth = body.getPageWidth();
    const pageHeight = body.getPageHeight();
    
    // Get the background image
    const backgroundImage = DriveApp.getFileById(BACKGROUND_IMAGE_ID).getBlob();
    
    // Insert as the first element
    const img = body.insertImage(0, backgroundImage);
    
    // Set image to fill the page
    img.setWidth(pageWidth);
    img.setHeight(pageHeight);
    
    // Make it slightly transparent
    img.setAttributes({
      opacity: 0.15,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0
    });
    
    // Center the image
    img.getParent().asParagraph().setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    
    // Save the document
    templateDoc.saveAndClose();
    
    SpreadsheetApp.getActiveSpreadsheet().toast("Template background updated successfully", "Success", 3);
    return true;
  } catch (e) {
    SpreadsheetApp.getActiveSpreadsheet().toast("Error setting template background: " + e, "Error", 5);
    return false;
  }
}

function generateQuotePDF() {
  const folderId = "18mTKHuwf_mxQz-9BX64-H1leIVljjqVx"; // Target folder ID
  const sheetName = "Generated Quote"; // Sheet to export
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(sheetName);
  const folder = DriveApp.getFolderById(folderId);

  // Get file name from cell C3
  let fileName = sheet.getRange("C3").getValue().toString().trim();
  if (!fileName) fileName = "Quote"; // fallback

  // Sanitize filename
  fileName = fileName.replace(/[\\\/:*?"<>|]/g, "");

  // Get blob of the sheet as PDF
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheet.getId()}/export?exportFormat=pdf&format=pdf` +
              `&gid=${sheet.getSheetId()}` +
              `&range=${sheet.getName()}!A1:Z50` + // Customize range if needed
              `&size=A4&portrait=true&fitw=true&top_margin=0.50&bottom_margin=0.50&left_margin=0.50&right_margin=0.50&sheetnames=false&printtitle=false&pagenumbers=false&gridlines=false&fzr=false`;

  const token = ScriptApp.getOAuthToken();
  const response = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  const pdfBlob = response.getBlob().setName(fileName + ".pdf");

  // Save the file to the specified folder
  folder.createFile(pdfBlob);

  SpreadsheetApp.getUi().alert("PDF saved as: " + fileName + ".pdf");
}
