const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY)

// POST /api/ai/plan
const generatePlan = async (req, res, next) => {
  try {
    const { service, title, description, budget, timeline, priority } = req.body
    if (!service || !description) return res.status(400).json({ message: 'Service and description are required.' })

    const prompt = `
You are a senior project consultant at AP Developments, a digital studio offering Web Development, Content Creation, Video Editing, and Graphic Design.

A client has submitted the following project brief:
- Service: ${service}
- Project Title: ${title || 'Untitled'}
- Description: ${description}
- Budget: ${budget || 'Not specified'}
- Expected Delivery: ${timeline || 'Flexible'}
- Priority: ${priority || 'Standard'}

Please analyze this brief and respond ONLY with a valid JSON object in this exact format:
{
  "summary": "One or two sentence summary of the project.",
  "recommendedService": "The most appropriate service from the 4 AP Developments services",
  "estimatedScope": ["scope item 1", "scope item 2", "scope item 3", "scope item 4"],
  "suggestedTimeline": "e.g. 10-14 working days",
  "budgetRange": "e.g. ₹15,000 – ₹25,000",
  "recommendedPackage": "Starter | Professional | Premium | Custom",
  "nextSteps": ["step 1", "step 2", "step 3"]
}

IMPORTANT: 
- Be realistic. Do not guarantee the estimate is final.
- Only output the JSON object, no markdown, no explanation.
- Budget must be in Indian Rupees (₹).
`

    const model  = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    const text   = result.response.text().trim()

    // Extract JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return res.status(500).json({ message: 'AI response was invalid. Please try again.' })

    const plan = JSON.parse(jsonMatch[0])
    res.json({ plan })
  } catch (e) {
    if (e instanceof SyntaxError) return res.status(500).json({ message: 'AI returned malformed response.' })
    next(e)
  }
}

module.exports = { generatePlan }
