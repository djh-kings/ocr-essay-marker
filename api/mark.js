import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { answer, question, markScheme } = req.body;

    // Validate input
    if (!answer || !question || !markScheme) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Construct the marking prompt
    const systemPrompt = `You are an experienced OCR J277 GCSE Computer Science examiner marking an 8-mark extended response question. Your task is to:

1. Apply the official OCR mark bands accurately and consistently
2. Consider both what is present AND what is missing
3. Be fair but rigorous - this is GCSE level (ages 14-16)
4. Award credit for valid points even if not explicitly in the mark scheme
5. Provide constructive, specific feedback that helps students improve

CRITICAL MARKING PRINCIPLES:
- Use OCR's three-band system: Low (1-3), Mid (4-6), High (7-8)
- Balance is essential for high marks - must discuss BOTH sides
- Award marks for quality of discussion, not just quantity of points
- Context application matters - generic answers score lower
- Clear structure and communication affects the mark

You must respond ONLY with valid JSON in exactly this format (no markdown, no extra text):
{
  "marks": <number 0-8>,
  "band": "<low|mid|high>",
  "strengths": ["<specific strength 1>", "<specific strength 2>"],
  "improvements": ["<specific improvement 1>", "<specific improvement 2>"],
  "feedback": "<2-3 sentence overall feedback paragraph>",
  "missingElements": ["<key element 1 not covered>", "<key element 2 not covered>"]
}`;

    const userPrompt = `QUESTION (${markScheme.totalMarks} marks):
${question.question}

OFFICIAL MARK SCHEME:

HIGH BAND (${markScheme.markBands.high.marks} marks):
${markScheme.markBands.high.descriptor}

MID BAND (${markScheme.markBands.mid.marks} marks):
${markScheme.markBands.mid.descriptor}

LOW BAND (${markScheme.markBands.low.marks} marks):
${markScheme.markBands.low.descriptor}

KEY POINTS TO LOOK FOR:
${JSON.stringify(markScheme.keyPoints, null, 2)}

COMMON MISTAKES TO AVOID:
${markScheme.commonMistakes.join('\n')}

EXAMINER GUIDANCE:
${markScheme.examinerComments}

---

STUDENT'S ANSWER:
${answer}

---

Mark this answer carefully using the criteria above. Be specific in your feedback.`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      temperature: 0,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt
        }
      ]
    });

    // Extract the response
    const responseText = message.content[0].text;
    
    // Try to parse JSON response
    let result;
    try {
      // Remove any markdown formatting if present
      const cleanedResponse = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      result = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse Claude response:', responseText);
      throw new Error('Invalid response format from AI');
    }

    // Validate the response structure
    if (!result.marks || !result.band || !result.feedback) {
      throw new Error('Incomplete response from AI');
    }

    // Ensure marks are within range
    result.marks = Math.max(0, Math.min(8, result.marks));

    return res.status(200).json(result);

  } catch (error) {
    console.error('Marking error:', error);
    return res.status(500).json({ 
      error: 'Failed to mark answer',
      details: error.message 
    });
  }
}
