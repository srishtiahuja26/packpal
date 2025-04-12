// app/api/geminiChecklist/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { destination, type, category, startDate, endDate } =
      await req.json();

    const prompt = `
      Create a detailed checklist for a ${type} ${category} to ${destination} from ${startDate} to ${endDate}.
      Include items for packing, safety, documents, and any special gear.
    `;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-001:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
      Generate a collaborative trip packing checklist for a group, based on the following details:
      
      - Trip Type: ${type}
      - Category: ${category}
      - Destination: ${destination}
      - Start Date: ${startDate}
      - End Date: ${endDate}
      
      📝 Requirements:
      - Do NOT include any personal items (like toothbrushes, clothes, etc.)
      - Focus on group-use or shared items only (e.g., tents, first-aid kits, group snacks, shared documents).
      - Categorize the checklist into a JSON format like:
      
      {
        "travel_documents": ["printed tickets", "travel itinerary"],
        "group_gear": ["tent", "cooking stove", "foldable chairs"],
        "safety_items": ["first aid kit", "flashlight", "whistle"],
        "electronics": ["charging station", "power strips", "camera"],
        "miscellaneous": ["trash bags", "notebooks", "markers"]
      }
      
      ✅ Maximum 5 items per category.
      ✅ Use lowercase keys and double quotes.
      ✅ Output should be only the JSON object. No extra explanation or text.
                    `.trim(),
                },
              ],
            },
          ],
        }),
      }
    );
    const result = await response.json();
    console.log(result);
    const checklist =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No checklist generated.";

    return NextResponse.json({ success: true, checklist });
  } catch (error) {
    console.error("Error generating checklist:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
