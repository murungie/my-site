import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./assets/logo.png";
/*
  Healthy Living Basics - React Draft (Enhanced)
  - Tailwind-ready with animations, gradients, and improved design
  - Pages: Home, Nutrition, Exercise, Wellness, Resources, Training, About, Contact
  - Includes interactive Quiz and styled Footer/Header
*/

// ---------- Sample Data ----------
// ---------- Sample Data ----------
const resources = [
  { id: 1, category: "nutrition", title: "ChooseMyPlate.gov", url: "https://www.myplate.gov/", summary: "Official U.S. Department of Agriculture guide to building a healthy plate." },
  { id: 2, category: "health", title: "Centers for Disease Control and Prevention (CDC)", url: "https://www.cdc.gov/", summary: "Evidence-based health and wellness information for individuals and communities." },
  { id: 3, category: "health", title: "World Health Organization (WHO)", url: "https://www.who.int/", summary: "Global authority on health, policy guidance, and public health research." },
  { id: 4, category: "education", title: "Harvard T.H. Chan School of Public Health", url: "https://hsph.harvard.edu/", summary: "Research, news, and resources on nutrition, health, and disease prevention." },
  { id: 5, category: "heart", title: "American Heart Association (AHA)", url: "https://www.heart.org/", summary: "Heart health tips, research, and prevention resources for cardiovascular wellness." },
  { id: 6, category: "research", title: "National Institute of Health (NIH)", url: "https://www.nih.gov/", summary: "Medical research and trusted resources for improving health and saving lives." },
];

const exercises = [
  { id: 1, title: "Brisk Walk (10–30 min)", desc: "Low-impact cardio that helps heart health and mood." },
  { id: 2, title: "Bodyweight Squats (3 sets x 10)", desc: "Leg strength and functional movement—modify depth as needed." },
  { id: 3, title: "Stretching Routine (5–10 min)", desc: "Gentle dynamic stretches to improve mobility and relieve tension." },
];

// ---------- Utility Components ----------
const Logo = () => (
  <div className="flex items-center gap-2">
    {/* ✅ Use imported logo.png instead of SVG */}
    <img src={logo} alt="Healthy Living Basics Logo" className="w-10 h-10 rounded-full" />
    <div>
      <div className="text-lg font-bold leading-tight text-white">Healthy Living Basics</div>
      <div className="text-xs text-gray-200 md:text-gray-300">Wellness made simple</div>
    </div>
  </div>
);

const ResourceCard = ({ r }) => (
  <a
    href={r.url}
    target="_blank"
    rel="noopener noreferrer"
    className="block p-4 border rounded-lg hover:shadow-lg transition transform hover:-translate-y-1 animate-slideDown"
  >
    <h4 className="font-semibold">{r.title}</h4>
    <p className="text-sm text-gray-600 mt-2">{r.summary}</p>
    <div className="text-xs text-gray-400 mt-3">{r.category.toUpperCase()}</div>
  </a>
);

// ---------- Pages ----------
function Home() {
  return (
    <section className="max-w-4xl mx-auto p-6 animate-fadeIn">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="md:flex md:items-center gap-6">
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-3">Welcome to Healthy Living Basics</h1>
            <p className="text-gray-700 mb-4">
              Practical, evidence-based tips on nutrition, exercise and everyday wellness. Learn actionable steps you can apply today to feel healthier and more energetic.
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>Clear and simple nutrition guidance</li>
              <li>Short exercise routines for all levels</li>
              <li>Wellness tips for sleep, stress and hydration</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <Link to="/nutrition" className="px-4 py-2 bg-primary text-white rounded shadow hover:bg-primary-dark transition">Explore Nutrition</Link>
              <Link to="/training" className="px-4 py-2 border rounded hover:bg-gray-50">Training Materials</Link>
            </div>
          </div>

          <div className="md:w-1/2 mt-6 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=800&auto=format&fit=crop"
              alt="person with apple and water bottle"
              className="rounded-lg shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Nutrition() {
  return (
    <section className="max-w-4xl mx-auto p-6 animate-fadeIn">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-3">Nutrition Basics</h2>
        <p className="text-gray-700 mb-4">
          Use MyPlate as a simple visual guide: fill your plate with half vegetables & fruits, a quarter grains, and a quarter protein, plus a side of dairy or non-dairy alternative.
        </p>
        <img
          src="https://www.myplate.gov/sites/default/files/2021-03/MyPlate%20Graphic_1.png"
          alt="MyPlate guide"
          className="max-w-sm w-full rounded mb-4"
        />
        <NutritionQuiz />
      </div>
    </section>
  );
}

function NutritionQuiz() {
  const questions = [
    { id: 1, q: "Which food group should take up the largest portion of your plate?", options: ["Protein", "Vegetables & Fruits", "Grains"], a: 1 },
    { id: 2, q: "Which is a whole grain option?", options: ["White bread", "Brown rice", "Candy"], a: 1 },
  ];
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  function select(qid, idx) {
    setAnswers((s) => ({ ...s, [qid]: idx }));
  }
  function submit() {
    let s = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.a) s += 1;
    });
    setScore(s);
  }

  return (
    <div className="bg-emerald-50 p-4 rounded mt-4 animate-slideDown">
      <h4 className="font-semibold">Nutrition Quiz</h4>
      {questions.map((q) => (
        <div key={q.id} className="mb-3">
          <div className="font-medium">{q.q}</div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => select(q.id, i)}
                className={`text-left p-2 border rounded transition ${answers[q.id] === i ? "bg-primary-light" : "hover:bg-gray-100"}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-3 flex items-center gap-3">
        <button onClick={submit} className="px-3 py-1 bg-primary text-white rounded">Submit</button>
        {score !== null && <div className="text-sm text-gray-700">Score: {score} / {questions.length}</div>}
      </div>
    </div>
  );
}

function Exercise() {
  return (
    <section className="max-w-4xl mx-auto p-6 animate-fadeIn">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-3">Simple Exercises</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {exercises.map((e) => (
            <div key={e.id} className="p-4 border rounded hover:shadow-md transition">
              <h4 className="font-semibold">{e.title}</h4>
              <p className="text-sm text-gray-600 mt-2">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Wellness() {
  return (
    <section className="max-w-4xl mx-auto p-6 animate-fadeIn">
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-3xl font-bold mb-4 text-primary">Wellness Tips</h2>
        <p className="text-gray-700 mb-4">
          Wellness is about balancing physical, mental, and emotional health. 
          Here are some key habits you can start practicing today:
        </p>

        {/* Sleep */}
        <div className="p-4 border-l-4 border-primary bg-emerald-50 rounded">
          <h3 className="text-xl font-semibold mb-2">Sleep</h3>
          <p className="text-gray-700">
            Aim for 7–9 hours of quality sleep. Keep a regular schedule, limit screen time before bed, 
            and create a calming nighttime routine for better rest.
          </p>
        </div>

        {/* Hydration */}
        <div className="p-4 border-l-4 border-primary bg-emerald-50 rounded">
          <h3 className="text-xl font-semibold mb-2">Hydration</h3>
          <p className="text-gray-700">
            Drink plenty of water throughout the day. Carry a reusable bottle, track intake, 
            and swap sugary drinks for water or herbal tea to stay refreshed.
          </p>
        </div>

        {/* Stress Management */}
        <div className="p-4 border-l-4 border-primary bg-emerald-50 rounded">
          <h3 className="text-xl font-semibold mb-2">Stress Management</h3>
          <p className="text-gray-700">
            Practice deep breathing, meditation, or short walks to clear your mind. 
            Break big tasks into smaller steps and maintain supportive social connections.
          </p>
        </div>

        {/* Mental Health */}
        <div className="p-4 border-l-4 border-primary bg-emerald-50 rounded">
          <h3 className="text-xl font-semibold mb-2">Mental Health</h3>
          <p className="text-gray-700">
            Prioritize self-care by taking time for hobbies, journaling, or talking to trusted friends. 
            If you feel overwhelmed, don’t hesitate to reach out to a professional.
          </p>
        </div>

        {/* Work-Life Balance */}
        <div className="p-4 border-l-4 border-primary bg-emerald-50 rounded">
          <h3 className="text-xl font-semibold mb-2">Work-Life Balance</h3>
          <p className="text-gray-700">
            Schedule breaks, avoid overworking, and set clear boundaries between work and personal time. 
            Make space for exercise, family, and relaxation daily.
          </p>
        </div>
      </div>
    </section>
  );
}


function ResourcesPage() {
  return (
    <section className="max-w-6xl mx-auto p-6 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Resources</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r) => (
          <ResourceCard key={r.id} r={r} />
        ))}
      </div>
    </section>
  );
}

function Training() {
return (
<section className="max-w-4xl mx-auto p-6">
<div className="bg-white p-6 rounded shadow">
<h2 className="text-2xl font-bold mb-3">Training Materials</h2>
<p className="text-gray-700 mb-4">Download slides, workshop outlines and printable trackers to run a short healthy living workshop.</p>
<a href="#" className="inline-block px-4 py-2 bg-emerald-600 text-white rounded">Download Workshop Slides (PDF)</a>


<div className="mt-6">
<h3 className="font-semibold">Workshop Outline (summary)</h3>
<ol className="list-decimal pl-5 mt-2 text-gray-700">
<li>Introduction & objectives</li>
<li>Nutrition basics</li>
<li>Exercise demo</li>
<li>Wellness habits</li>
<li>Website navigation practice</li>
</ol>
</div>
</div>
</section>
);
}

function About() {
return (
<section className="max-w-4xl mx-auto p-6">
<div className="bg-white p-6 rounded shadow">
<h2 className="text-2xl font-bold mb-3">About the Author</h2>
<p className="text-gray-700">I am a motivated health, wellness, and business management specialist with experience in pharmacy support, nutrition education and creating digital health content. My aim is to translate evidence-based guidance into clear, actionable steps for everyday people.</p>


<h3 className="font-semibold mt-4">Skills</h3>
<ul className="list-disc pl-5 text-gray-700">
<li>Research & analysis of scientific health material</li>
<li>Content creation and basic web design</li>
<li>Health communication and patient education</li>
</ul>
</div>
</section>
);
}

function Contact() {
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const payload = { name: fd.get("name"), email: fd.get("email"), message: fd.get("message") };
    try {
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus("sent");
      e.target.reset();
    } catch (err) {
      setStatus("draft-saved");
    }
  }

  return (
    <section className="max-w-2xl mx-auto p-6 animate-fadeIn">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-3">Contact</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" placeholder="Name" className="w-full px-3 py-2 border rounded" required />
          <input name="email" type="email" placeholder="Email" className="w-full px-3 py-2 border rounded" required />
          <textarea name="message" rows={4} placeholder="Message" className="w-full px-3 py-2 border rounded" required />
          <button type="submit" className="px-4 py-2 bg-primary text-white rounded">Send</button>
          {status === "sent" && <div className="text-sm text-green-600">Message sent — thank you!</div>}
          {status === "draft-saved" && <div className="text-sm text-yellow-600">Draft saved locally (no backend).</div>}
        </form>
      </div>
    </section>
  );
}

// ---------- Layout ----------
function Nav() {
  return (
    <header className="bg-gradient-to-r from-primary-dark to-primary shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-white">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <NavLink to="/nutrition">Nutrition</NavLink>
          <NavLink to="/exercise">Exercise</NavLink>
          <NavLink to="/wellness">Wellness</NavLink>
          <NavLink to="/resources">Resources</NavLink>
          <NavLink to="/training">Training</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children }) {
  return (
    <Link to={to} className="px-3 py-1 text-sm text-white hover:bg-primary-light hover:text-gray-900 rounded transition">{children}</Link>
  );
}

function Footer() {
  return (
    <footer className="py-10 bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <h4 className="font-bold text-white mb-3">Healthy Living Basics</h4>
          <p className="text-gray-400">Simple, evidence-based tips on nutrition, exercise, and wellness.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/nutrition" className="hover:text-primary-light">Nutrition</Link></li>
            <li><Link to="/exercise" className="hover:text-primary-light">Exercise</Link></li>
            <li><Link to="/wellness" className="hover:text-primary-light">Wellness</Link></li>
            <li><Link to="/resources" className="hover:text-primary-light">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3">Stay Connected</h4>
          <div className="flex gap-3">
            <a href="#" className="hover:text-primary-light">Twitter</a>
            <a href="#" className="hover:text-primary-light">Facebook</a>
            <a href="#" className="hover:text-primary-light">📸 Instagram</a>
          </div>
        </div>
      </div>
      <div className="mt-6 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Healthy Living Basics — All Rights Reserved.
      </div>
    </footer>
  );
}

// ---------- App ----------
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <Nav />
        <main className="py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/exercise" element={<Exercise />} />
            <Route path="/wellness" element={<Wellness />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/training" element={<Training />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
