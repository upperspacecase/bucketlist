
const rawCsvData = [
    { Name: "fit for service 1 year community and trips", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "", Tags: "Giving back" },
    { Name: "Tasting menu at the 3 top restaurants in the world", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "at the 3 top restaurants in the world + 65 omakase best 3 sushi restaurants in the world", Tags: "Food" },
    { Name: "Be in my hands 1B$ do donate however I want", Planning: "", Control: "Bucket List Wish", Country: "Everywhere", Decade: "30-40", Location: "", Tags: "Philanthropy" },
    { Name: "Acrobatic Airplane", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "Everywhere", Tags: "Adventure" },
    { Name: "Donate $1B however I want", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "Everywhere", Tags: "Philanthropy" },
    { Name: "Waterpark Bali", Planning: "", Control: "In my hands", Country: "Indonesia", Decade: "30-40", Location: "Bali", Tags: "" },
    { Name: "Blue hills ranch swim with sea otters", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Waco, TX", Tags: "Animals", Website: "https://www.bluehillsranch.com/" },
    { Name: "Bubble Hotel in forest in Iceland", Planning: "", Control: "In my hands", Country: "Iceland", Decade: "30-40", Location: "", Tags: "Overnight Experience", Website: "https://www.buubble.com/" },
    { Name: "Broadway moulin Rouge", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "New York City", Tags: "Show" },
    { Name: "Heidi clum Halloween party", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "New York City", Tags: "Parties / Festival", Date: "Oct 31" },
    { Name: "high tea in london ideally with royalty /“tea with the Queen”", Planning: "", Control: "In my hands", Country: "UK", Decade: "30-40", Location: "London", Tags: "" },
    { Name: "Color Festival (India) xs", Planning: "", Control: "In my hands", Country: "India", Decade: "30-40", Location: "", Tags: "Parties / Festival" },
    { Name: "Stunt school 2 week Bulgaria", Planning: "", Control: "In my hands", Country: "Bulgaria", Decade: "30-40", Location: "", Tags: "" },
    { Name: "20M- have enough money in advance now to live abundantly and free for the rest lf my life", Planning: "", Control: "Bucket List Wish", Country: "", Decade: "30-40", Location: "Everywhere", Tags: "Philanthropy" },
    { Name: "2 week RV trip South Island New Zeland", Planning: "Low", Control: "In my hands", Country: "New Zealand", Decade: "30-40", Location: "South Island, NZ", Tags: "Adventure" },
    { Name: "1 month in Puerto Escondido", Planning: "High", Control: "In my hands", Country: "Mexico", Decade: "30-40", Location: "Puerto Escondido", Tags: "Experience lifestyle" },
    { Name: "50 countries", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "Everywhere", Tags: "Home" },
    { Name: "at home massage on mdma", Planning: "", Control: "In my hands", Country: "Everywhere", Decade: "30-40", Location: "Home Massage", Tags: "Drugs" },
    { Name: "fly over active volcano or close enough", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Swim with little sharks somewhere", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "Anywhere", Tags: "" },
    { Name: "Airport first random international Flight", Planning: "", Control: "In my hands", Country: "Everywhere", Decade: "30-40", Location: "Airport", Tags: "Travel" },
    { Name: "Be pregnant", Planning: "", Control: "Bucket List Wish", Country: "Everywhere", Decade: "30-40", Location: "", Tags: "Home" },
    { Name: "stay Hanging hotel/lunch night side cliffs Cusco", Planning: "", Control: "In my hands", Country: "Peru", Decade: "30-40", Location: "", Tags: "Food" },
    { Name: "Festa Del Redentore Venice", Planning: "", Control: "In my hands", Country: "Italy", Decade: "30-40", Location: "Venice", Tags: "Parties / Festival", Website: "https://www.vivovenetia.com/festa-redentore/" },
    { Name: "Visit the Tajmahal", Planning: "", Control: "In my hands", Country: "India", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Sleep in an Earth Ship", Planning: "", Control: "In my hands", Country: "Mexico", Decade: "30-40", Location: "", Tags: "" },
    { Name: "sensory therapy", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "", Tags: "Therapy" },
    { Name: "Cloney $1M friends dinner distribution", Planning: "", Control: "Bucket List Wish", Country: "", Decade: "30-40", Location: "Everywhere", Tags: "Philanthropy" },
    { Name: "Do a Bollywood movie", Planning: "", Control: "Bucket List Wish", Country: "India", Decade: "30-40", Location: "Mumbai", Tags: "Career" },
    { Name: "Sphere Vegas", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Las Vegas", Tags: "" },
    { Name: "Blue hole Belize", Planning: "", Control: "In my hands", Country: "Belize", Decade: "30-40", Location: "Blue hole Belize", Tags: "Adventure" },
    { Name: "blind in the city experience Hongkong", Planning: "", Control: "In my hands", Country: "Hongkong", Decade: "30-40", Location: "Hongkong", Tags: "" },
    { Name: "After Life Concert (Tale of US)", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "", Tags: "Parties / Festival", Website: "https://www.after.life/events" },
    { Name: "Balloon Museum Madrid", Planning: "", Control: "In my hands", Country: "Spain", Decade: "30-40", Location: "Madrid", Tags: "Arts location" },
    { Name: "omakase best 3 sushi restaurants in the world", Planning: "", Control: "In my hands", Country: "Japan", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Electric Daisy Carnival Vegas", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Las Vegas", Tags: "Parties / Festival" },
    { Name: "Love for life", Planning: "", Control: "Bucket List Wish", Country: "", Decade: "30-40", Location: "Everywhere", Tags: "Home" },
    { Name: "Singing bowl sound massage/therapy", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "Anywhere", Tags: "" },
    { Name: "Salt deserts Bolivia", Planning: "Medium", Control: "In my hands", Country: "Bolivia", Decade: "30-40", Location: "Bolivia", Tags: "" },
    { Name: "Run with penguins Ushuaia terra do Fogo Patagônia or South Africa", Planning: "", Control: "In my hands", Country: "South Africa", Decade: "30-40", Location: "Ushuaia terra do Fogo Patagônia", Tags: "Animals" },
    { Name: "take acid at Disney", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Los Angels", Tags: "Drugs" },
    { Name: "Sypadam Island", Planning: "", Control: "In my hands", Country: "Indonesia", Decade: "30-40", Location: "Malásia Borneo", Tags: "" },
    { Name: "Airplane Zero Gravity Vegas", Planning: "Medium", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Las Vegas", Tags: "Adventure", Website: "https://www.gozerog.com/reservations/las-vegas-nv-las/" },
    { Name: "Sushi for breakfast from the docs in Japan", Planning: "", Control: "In my hands", Country: "Japan", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Met Gala", Planning: "", Control: "Bucket List Wish", Country: "USA", Decade: "30-40", Location: "New York City", Tags: "Career" },
    { Name: "Mew Wolf", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Survivor trip Amazonia", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Amazonia", Tags: "" },
    { Name: "Glass bottom kayaks Florida", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Florida Keys", Tags: "" },
    { Name: "Go to Oscars", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Los Angels", Tags: "Invite only Event" },
    { Name: "Surf camp Nicaragua", Planning: "Medium", Control: "In my hands", Country: "Nicaragua", Decade: "30-40", Location: "Nicaragua", Tags: "" },
    { Name: "Egypt see the pyramids", Planning: "", Control: "In my hands", Country: "Egypt", Decade: "30-40", Location: "", Tags: "Sightseeing" },
    { Name: "Santorini", Planning: "", Control: "In my hands", Country: "Italy", Decade: "30-40", Location: "Santorini", Tags: "" },
    { Name: "go up the Nile", Planning: "", Control: "In my hands", Country: "Egypt", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Cherry Flower Blossom", Planning: "", Control: "In my hands", Country: "Japan", Decade: "30-40", Location: "", Tags: "Sightseeing" },
    { Name: "Indian wedding", Planning: "", Control: "In my hands", Country: "India", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Zorbing", Planning: "", Control: "In my hands", Country: "New Zealand", Decade: "30-40", Location: "Rotorua", Tags: "Adventure" },
    { Name: "Fly through the Northern Lights", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "", Tags: "Travel" },
    { Name: "Paraglide over piramides", Planning: "", Control: "In my hands", Country: "Egypt", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Murder mystery weekend And or dinner express train london", Planning: "", Control: "In my hands", Country: "UK", Decade: "30-40", Location: "Weekend And or dinner express train london", Tags: "" },
    { Name: "Tatajuba Ceará Brasil Zip Line", Planning: "", Control: "In my hands", Country: "Brazil", Decade: "30-40", Location: "Ceará Brasil Zip Line", Tags: "" },
    { Name: "Sunsrise matchu Pichu", Planning: "High", Control: "In my hands", Country: "Peru", Decade: "30-40", Location: "Pichu", Tags: "" },
    { Name: "Sleep on the Pinecone Treehouse CA", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "The Pinecone treehouse CA", Tags: "Overnight Experience", Website: "https://www.airbnb.co.uk/rooms/26336387" },
    { Name: "Go to Vanity Fair", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "", Tags: "Invite only Event" },
    { Name: "Light fest Mojave’s desert or rise festival", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "California", Tags: "Parties / Festival" },
    { Name: "Have a baby girl", Planning: "", Control: "Bucket List Wish", Country: "", Decade: "30-40", Location: "Everywhere", Tags: "Home" },
    { Name: "Best picture at Cannes/red carpet", Planning: "", Control: "Bucket List Wish", Country: "France", Decade: "30-40", Location: "Cannes", Tags: "Career" },
    { Name: "Stay a night and experience at Versailles Palace", Planning: "", Control: "In my hands", Country: "France", Decade: "30-40", Location: "Versailles Palace", Tags: "" },
    { Name: "Tahoe Hotel SF “ROOM Service” BM weekend part", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Tahoe", Tags: "" },
    { Name: "The forge Chicago", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Chicago", Tags: "" },
    { Name: "Holders beach penguins Cape Town", Planning: "", Control: "In my hands", Country: "South Africa", Decade: "30-40", Location: "Cape Town", Tags: "Animals" },
    { Name: "Presidential Train", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Night in Sahara desert", Planning: "Medium", Control: "In my hands", Country: "", Decade: "30-40", Location: "Sahara desert", Tags: "" },
    { Name: "ISTA", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Cápsula Crio t", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Go to all 5 blue zones", Planning: "", Control: "In my hands", Country: "Japan", Decade: "30-40", Location: "", Tags: "Experience lifestyle" },
    { Name: "Boat Ski (jetski?)", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "Everywhere", Tags: "Adventure" },
    { Name: "Taos and meet tribe", Planning: "", Control: "In my hands", Country: "Mexico", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Pilot a Helicopter", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Los Angels", Tags: "", Website: "http://www.star-helicopters.com/" },
    { Name: "Massage with no time to end", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "Anywhere", Tags: "" },
    { Name: "Casa cenote swim with crocodile", Planning: "", Control: "In my hands", Country: "Mexico", Decade: "30-40", Location: "", Tags: "Adventure" },
    { Name: "Woman’s art Mama Gena course", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "New York", Tags: "", Website: "https://mamagenas.com/" },
    { Name: "Monroe institute", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Virginia", Tags: "" },
    { Name: "Boom Festival", Planning: "", Control: "In my hands", Country: "Portugal", Decade: "30-40", Location: "Portugal", Tags: "Parties / Festival" },
    { Name: "New Orleans Com Mãe Mardi Gras", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "New Orleans", Tags: "" },
    { Name: "obstacle course from the bachelor okc riversport", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "from the bachelor okc riversport", Tags: "" },
    { Name: "Team Lab", Planning: "", Control: "In my hands", Country: "Japan", Decade: "30-40", Location: "Tokyo", Tags: "", Website: "https://www.teamlab.art/e/planets/" },
    { Name: "Use a JetPack", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "Anywhere", Tags: "" },
    { Name: "zamna/man image festival", Planning: "", Control: "In my hands", Country: "Mexico", Decade: "30-40", Location: "Tulum", Tags: "Parties / Festival" },
    { Name: "Ride a Electric surfboard", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "Anywhere", Tags: "" },
    { Name: "be surprised with trip don’t know where", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "", Tags: "Travel" },
    { Name: "Cuddle Mini pigs café Japan", Planning: "", Control: "In my hands", Country: "Japan", Decade: "30-40", Location: "", Tags: "Animals" },
    { Name: "Ibiza opening weekend", Planning: "Medium", Control: "In my hands", Country: "Spain", Decade: "30-40", Location: "Ibiza", Tags: "Parties / Festival", Date: "June" },
    { Name: "leechan Budah statue", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "statue", Tags: "" },
    { Name: "Harry potter experience (Japan?)", Planning: "", Control: "In my hands", Country: "Japan", Decade: "30-40", Location: "", Tags: "Theme Parks" },
    { Name: "Carnaval in Rio Dance on the sambódromo", Planning: "", Control: "In my hands", Country: "Brazil", Decade: "30-40", Location: "", Tags: "Parties / Festival" },
    { Name: "Miami art Basel and parties", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "Miami", Tags: "Party" },
    { Name: "mantanees florida", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Florida", Tags: "" },
    { Name: "Petra Jordânia Petra by light night show", Planning: "", Control: "In my hands", Country: "Jordan", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Win an Oscar best actress", Planning: "", Control: "Bucket List Wish", Country: "", Decade: "30-40", Location: "Los Angels", Tags: "Career" },
    { Name: "Try a water bed", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "Anywhere", Tags: "" },
    { Name: "Be represented by wme", Planning: "", Control: "In my hands", Country: "Everywhere", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Floating in Red Sea", Planning: "", Control: "In my hands", Country: "Jordan", Decade: "30-40", Location: "Red Sea", Tags: "" },
    { Name: "Train Lisboa-Nepal orient express", Planning: "", Control: "In my hands", Country: "Lisboa", Decade: "30-40", Location: "Orient express", Tags: "" },
    { Name: "See a Bollywood movie in theaters", Planning: "", Control: "In my hands", Country: "India", Decade: "30-40", Location: "Bollywood", Tags: "Career" },
    { Name: "Everglades", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Florida", Tags: "" },
    { Name: "Flying Trapeze", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "Everywhere", Tags: "" },
    { Name: "Stay in a hotel over the water in Maldives (or similar)", Planning: "", Control: "In my hands", Country: "Maldives", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Paragliding out of cliff in Brazil", Planning: "", Control: "In my hands", Country: "Brazil", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Damanhur temples/ community/ Italy", Planning: "", Control: "In my hands", Country: "Italy", Decade: "30-40", Location: "Italy", Tags: "Sightseeing" },
    { Name: "canoo between canyons lake powel", Planning: "", Control: "In my hands", Country: "USA", Decade: "30-40", Location: "Canyons Lake Powel", Tags: "Adventure" },
    { Name: "Royal Ascot", Planning: "", Control: "In my hands", Country: "", Decade: "30-40", Location: "", Tags: "" },
    { Name: "Adopt", Planning: "High", Control: "Bucket List Wish", Country: "", Decade: "30-40", Location: "Everywhere", Tags: "Home" },
    { Name: "Canyon Swing", Planning: "Low", Control: "In my hands", Country: "New Zealand", Decade: "30-40", Location: "Queenstown", Tags: "Adventure" },
    { Name: "Fancy Mansion Carnaval in Venice Italy", Planning: "", Control: "In my hands", Country: "Italy", Decade: "30-40", Location: "Venice", Tags: "" }
];

import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Experience from "@/models/Experience";
import { auth } from "@/libs/auth";

// Curated list of high-quality Unsplash images for various categories
const curatedImages = [
    "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&h=600&fit=crop", // culture
    "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop", // aurora
    "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&h=600&fit=crop", // sakura
    "https://images.unsplash.com/photo-1518730518541-d0843268c287?w=800&h=600&fit=crop", // venice
    "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop", // machu picchu
    "https://images.unsplash.com/photo-1507501336603-6e31db2be093?w=800&h=600&fit=crop", // balloons
    "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop", // santorini
    "https://images.unsplash.com/photo-1576089073624-b5751a8f4de9?w=800&h=600&fit=crop", // holi
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop", // safari
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop", // ice hotel
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop", // great wall
    "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&h=600&fit=crop", // reef
];

// Helper to map CSV fields to our Schema
const mapToSchema = (item, index) => {
    let difficulty = "easy";
    if (item.Planning === "Medium") difficulty = "moderate";
    if (item.Planning === "High") difficulty = "bucket-list";

    // Use existing categories or map new ones to them
    // Available: Adventure, Culture, Nature, Food, Festivals, Wellness
    let category = "Adventure"; // Default
    const tag = item.Tags?.toLowerCase() || "";

    if (tag.includes("party") || tag.includes("festival")) category = "Festivals";
    else if (tag.includes("food") || tag.includes("restaurant") || tag.includes("lifestyle")) category = "Food";
    else if (tag.includes("nature") || tag.includes("animal") || tag.includes("sightseeing")) category = "Nature";
    else if (tag.includes("culture") || tag.includes("career") || tag.includes("home") || tag.includes("show")) category = "Culture";
    else if (tag.includes("wellness") || tag.includes("therapy") || tag.includes("drug")) category = "Wellness";

    // Map country to region roughly
    let region = "europe"; // Default
    const country = (item.Country || "").toLowerCase();

    if (country.includes("usa") || country.includes("mexico") || country.includes("brazil") || country.includes("peru") || country.includes("belize") || country.includes("nicaragua")) region = "americas";
    else if (country.includes("japan") || country.includes("india") || country.includes("indonesia") || country.includes("thailand") || country.includes("china") || country.includes("maldives")) region = "asia";
    else if (country.includes("africa") || country.includes("egypt") || country.includes("morocco") || country.includes("jordan")) region = "africa"; // Jordan in MidEast/Asia typically but grouping loosely
    else if (country.includes("australia") || country.includes("new zealand")) region = "oceania";

    // Cycle through curated images to avoid broken links
    const image = curatedImages[index % curatedImages.length];

    return {
        title: item.Name,
        location: item.Location || item.Country || "Worldwide",
        country: item.Country || "Worldwide",
        image: image,
        category: category,
        region: region,
        savedCount: Math.floor(Math.random() * 5000) + 100, // Random saved count
        difficulty: difficulty,
        bestTime: item.Date || undefined,
        website: item.Website || undefined,
        tips: item.Note || undefined
    };
};

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectMongo();

        // Clear only THIS user's experiences (do not wipe the whole database)
        await Experience.deleteMany({ userId: session.user.id });

        console.log("Seeding new CSV data...");
        const experiencesData = rawCsvData.map((row, index) => ({
            ...mapToSchema(row, index),
            userId: session.user.id,
            addedBy: session.user.name || "You",
            completed: false,
        }));

        await Experience.insertMany(experiencesData);

        return NextResponse.json({
            success: true,
            message: "Database seeded with CSV data!",
            count: experiencesData.length
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
