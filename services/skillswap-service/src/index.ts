import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors());
app.use(express.json());

const mockMentors = [
  { id: '1', name: "David L.", skill: "Distributed Systems & Rust", bio: "Leading the systems research lab. Expertise in high-performance computing and consensus algorithms.", tags: ["Rust", "AI", "Systems"], rating: 4.9, aura: "border-purple-500/30", glow: "rgba(168, 85, 247, 0.2)" },
  { id: '2', name: "Sarah K.", skill: "Brand Identity & Motion", bio: "Award-winning designer with 3+ years experience. Cinema 4D and AfterEffects pro.", tags: ["Figma", "Design", "Motion"], rating: 5.0, aura: "border-pink-500/30", glow: "rgba(236, 72, 153, 0.2)" },
  { id: '3', name: "Mike R.", skill: "Microservices & Auth", bio: "Ex-Google architect focusing on scalable backend systems. Passionate about TDD and security.", tags: ["Node.js", "Docker", "Security"], rating: 4.8, aura: "border-blue-500/30", glow: "rgba(59, 130, 246, 0.2)" },
  { id: '4', name: "Ariana V.", skill: "Economics & Game Theory", bio: "Published researcher in digital economies.", tags: ["Math", "Economics", "Python"], rating: 4.7, aura: "border-cyan-500/30", glow: "rgba(34, 211, 238, 0.2)" }
];

app.get('/skills', (req, res) => {
  res.json({ success: true, data: mockMentors });
});

app.post('/matches/find', (req, res) => {
  const { learningObjective } = req.body;
  if (!learningObjective) return res.status(400).json({ error: 'Missing learningObjective' });

  // Simple keyword matching simulation for the AI engine
  const matches = mockMentors.filter(m => 
    m.skill.toLowerCase().includes(learningObjective.toLowerCase()) ||
    m.tags.some(t => learningObjective.toLowerCase().includes(t.toLowerCase()))
  );

  res.json({ 
    success: true, 
    data: matches.length > 0 ? matches : mockMentors.slice(0, 2), // return some defaults if no match
    matchAccuracy: matches.length > 0 ? 0.94 : 0.45
  });
});

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'skillswap-service' }));

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB, running in degraded mode:', err);
  });

app.listen(PORT, () => console.log(`🚀 SkillSwap Service running on port ${PORT}`));
