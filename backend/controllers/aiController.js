const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.generateCourseDescription = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title)
      return res.status(400).json({ message: "Course title required" });

    const prompt = `
You are an AI assistant for an e-learning platform.
Write a professional, engaging, clear, structured course description.

Course Title: ${title}

Make it interesting, motivating, and useful for students.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",   // fast + free
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    });

    const text = completion.choices[0].message.content;
    res.json({ description: text });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "AI Error",
      error: err.message
    });
  }
};
