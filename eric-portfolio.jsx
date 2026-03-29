import { useState, useEffect, useRef } from "react";

const data = {
  name: "Eric Ye",
  title: "Software Engineer",
  location: "Brisbane, QLD, Australia",
  email: "ericye223378@gmail.com",
  phone: "0481 205 303",
  github: "https://github.com/ericliol",
  bio: "Backend engineer building secure, scalable systems. Passionate about cryptography, AI tooling, and clean APIs.",
  work: [
    {
      company: "Cryptsoft",
      url: "https://cryptsoft.com",
      role: "Software Engineer",
      period: "Jun 2024 – Present",
      location: "Brisbane, QLD, Australia",
      points: [
        "Developed and enhanced KMIP-compliant server and client SDKs across C, C++, Java, Python, and C#",
        "Designed integration plugins for KMIP Server enabling interoperability with Microsoft SQL Server and Kubernetes",
        "Built web interface improvements using JavaScript, Node.js and Metro UI for key management systems",
        "Diagnosed and resolved complex cross-platform issues across 200+ operating systems",
        "Provided technical support and system integration guidance to global enterprise customers",
      ],
      badge: "Speaker — OpenSSL Conference 2025",
      badgeUrl: "https://2025.openssl-conference.org/speaker/detail-141.html#sectionLink",
    },
    {
      company: "Desygner",
      url: "https://desygner.com",
      role: "Backend Engineer",
      period: "May 2023 – Aug 2023",
      location: "Gold Coast, QLD",
      points: [
        "Integrated HubSpot CRM with internal systems via RESTful APIs",
        "Conducted API testing and bug fixes using Postman and Kotlin/PHP backend services",
        "Enhanced internal automation through server-side scripting and workflow improvements",
      ],
    },
  ],
  education: [
    {
      institution: "University of Queensland",
      degree: "Bachelor of Computer Science",
      major: "Data Science",
      period: "2021 – 2023",
      gpa: "6 / 7",
      courses: ["Software Engineering", "Advanced Database Systems", "Computer Systems", "Computation Theory", "Mathematical Probability"],
    },
  ],
  projects: [
    {
      name: "AI Workflow Automation",
      tags: ["Claude API", "GPT", "Gemini", "Python"],
      desc: "Built integrations using Claude Sonnet, GPT Codex, and Gemini for data generation, structured report output, and support workflow automation. Reduced manual effort in ticket triage and documentation pipelines.",
    },
    {
      name: "Post-Quantum Key Management",
      tags: ["KMIP", "OpenSSL", "Bouncy Castle", "QKD"],
      desc: "Presented at OpenSSL Conference 2025 on integrating OpenSSL, Bouncy Castle, and QKD via KMIP for future-proof key management in enterprise environments.",
      link: "https://2025.openssl-conference.org/speaker-sessions/detail-141.html#sectionLink",
      linkText: "Conference Talk",
    },
    {
      name: "Driverless Racing Vehicle",
      tags: ["ROS", "PyTorch", "Python", "Autonomous Systems"],
      desc: "Developed software for a driverless racing vehicle for the FSAE-A competition with UQ Racing Team. Implemented ML models for sensor data processing and real-time decision-making.",
    },
    {
      name: "KMIP / PKCS#11 SDKs",
      tags: ["C", "C++", "Java", "Python", "C#"],
      desc: "Contributed to enterprise-grade key management SDKs used by global customers. Improved cross-platform interoperability and server-side plugin stability in containerised environments.",
    },
  ],
  skills: {
    "Languages": ["C", "C++", "Java", "Python", "Node.js", "JavaScript", "C#"],
    "Backend & APIs": ["Fastify", "RESTful APIs", "JWT", "SSO", "2FA (TOTP/HOTP/Passkey)"],
    "Security": ["KMIP", "PKCS#11", "OpenSSL", "Cryptographic Key Management"],
    "AI & ML": ["Claude API", "GPT Codex", "Gemini", "PyTorch", "LLM Integrations"],
    "Cloud & DevOps": ["AWS (EC2, Lambda)", "Jenkins", "Buildbot", "GitHub", "Docker / Kubernetes"],
    "Testing": ["Unit Testing (TDD ~90%)", "Postman", "JMeter", "Selenium"],
  },
  blog: [
    {
      date: "Mar 2025",
      title: "Post-Quantum Cryptography in Practice: What Engineers Need to Know",
      summary: "A breakdown of post-quantum algorithms, why KMIP matters for key lifecycle management, and how we're integrating QKD at Cryptsoft.",
      tags: ["Cryptography", "KMIP", "Post-Quantum"],
    },
    {
      date: "Jan 2025",
      title: "Building AI Pipelines with Claude and GPT: Lessons from the Field",
      summary: "Real patterns I've used to automate support workflows, generate structured data, and build reliable LLM integrations without prompt chaos.",
      tags: ["AI", "Claude API", "Python"],
    },
    {
      date: "Nov 2024",
      title: "Cross-Platform SDK Development: Surviving 200+ OS Environments",
      summary: "How we approach compatibility testing, CI pipelines, and debugging cryptographic libraries across Linux, Windows, and containerised environments.",
      tags: ["DevOps", "C++", "SDK"],
    },
  ],
};

const CODE_LINES = [
  { t: "import anthropic", c: "#569cd6" },
  { t: "from cryptography.hazmat.primitives import hashes", c: "#9cdcfe" },
  { t: "client = anthropic.Anthropic()", c: "#dcdcaa" },
  { t: "def generate_key(algorithm: str) -> bytes:", c: "#dcdcaa" },
  { t: "    key = os.urandom(32)", c: "#ce9178" },
  { t: "    return encrypt_with_kmip(key)", c: "#9cdcfe" },
  { t: "async function handleRequest(ctx) {", c: "#569cd6" },
  { t: "  const token = await verifyJWT(ctx.headers);", c: "#9cdcfe" },
  { t: "  if (!token.valid) throw new AuthError();", c: "#f44747" },
  { t: "  return db.query('SELECT * FROM keys');", c: "#ce9178" },
  { t: "}", c: "#569cd6" },
  { t: "const response = await claude.messages.create({", c: "#dcdcaa" },
  { t: '  model: "claude-sonnet-4-20250514",', c: "#ce9178" },
  { t: '  messages: [{ role: "user", content: prompt }]', c: "#9cdcfe" },
  { t: "});", c: "#569cd6" },
  { t: "public static byte[] kmipRequest(", c: "#dcdcaa" },
  { t: "  KMIPClient client, String keyId) {", c: "#9cdcfe" },
  { t: "  return client.get(keyId).getValue();", c: "#4ec9b0" },
  { t: "}", c: "#569cd6" },
  { t: "router.post('/auth/totp', async (req, res) => {", c: "#dcdcaa" },
  { t: "  const valid = speakeasy.totp.verify({", c: "#9cdcfe" },
  { t: "    secret: user.totpSecret, token: req.body.code", c: "#ce9178" },
  { t: "  });", c: "#569cd6" },
  { t: "  res.json({ authenticated: valid });", c: "#4ec9b0" },
  { t: "});", c: "#569cd6" },
  { t: "model = torch.nn.Sequential(", c: "#dcdcaa" },
  { t: "  torch.nn.Linear(512, 256),", c: "#9cdcfe" },
  { t: "  torch.nn.ReLU(),", c: "#4ec9b0" },
  { t: "  torch.nn.Linear(256, 10)", c: "#9cdcfe" },
  { t: ")", c: "#569cd6" },
];

function CodeBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let frame = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const FONT_SIZE = 12;
    const LINE_H = 20;
    const COLS = [
      { x: 0.52, offset: 0,  speed: 0.4, alpha: 0.11 },
      { x: 0.70, offset: 10, speed: 0.28, alpha: 0.08 },
      { x: 0.86, offset: 20, speed: 0.5,  alpha: 0.06 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px 'Space Mono', 'Courier New', monospace`;

      COLS.forEach(col => {
        const n = CODE_LINES.length;
        const totalH = n * LINE_H;
        const scrollY = (frame * col.speed) % totalH;
        const xPos = canvas.width * col.x;

        for (let i = 0; i < n + Math.ceil(canvas.height / LINE_H) + 1; i++) {
          const lineIdx = (col.offset + i) % n;
          const rawY = i * LINE_H - scrollY;
          // wrap vertically
          const y = ((rawY % totalH) + totalH) % totalH;
          if (y > canvas.height + LINE_H) continue;

          // fade based on vertical position
          const norm = y / canvas.height;
          const fade = Math.sin(norm * Math.PI);
          ctx.globalAlpha = fade * col.alpha;
          ctx.fillStyle = CODE_LINES[lineIdx].c;
          ctx.fillText(CODE_LINES[lineIdx].t, xPos, y);
        }
      });

      ctx.globalAlpha = 1;
      frame++;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0,
    }} />
  );
}

const NAV = ["Work", "Education", "Projects", "Skills", "Blog"];

const tag = (t, i) => (
  <span key={i} style={{
    fontSize: "0.68rem", fontFamily: "monospace",
    background: "rgba(0,255,180,0.08)", color: "#00ffb4",
    border: "1px solid rgba(0,255,180,0.2)", borderRadius: "3px",
    padding: "2px 7px", marginRight: 5, marginBottom: 4,
    display: "inline-block", letterSpacing: "0.03em",
  }}>{t}</span>
);

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <h2 style={{
        fontFamily: "'Space Mono', monospace", fontSize: "0.75rem",
        letterSpacing: "0.25em", textTransform: "uppercase",
        color: "#00ffb4", margin: 0, marginBottom: 8,
      }}>{children}</h2>
      <div style={{ height: 1, background: "linear-gradient(90deg, #00ffb4 0%, transparent 100%)", width: 60 }} />
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredWork, setHoveredWork] = useState(null);
  const [hoveredBlog, setHoveredBlog] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });

  const S = {
    root: { background: "#060a0f", color: "#c8d8e8", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2.5rem", height: scrolled ? "52px" : "64px",
      background: scrolled ? "rgba(6,10,15,0.97)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(0,255,180,0.08)" : "none",
      transition: "all 0.3s ease", backdropFilter: scrolled ? "blur(12px)" : "none",
    },
    navLogo: { fontFamily: "'Space Mono', monospace", fontSize: "0.85rem", color: "#00ffb4", letterSpacing: "0.1em", fontWeight: 700, cursor: "pointer" },
    navLinks: { display: "flex", gap: "2rem", listStyle: "none", margin: 0, padding: 0 },
    navLink: { fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#7a9ab5", cursor: "pointer" },
    section: { maxWidth: 860, margin: "0 auto", padding: "6rem 2.5rem", borderTop: "1px solid rgba(255,255,255,0.04)" },
    card: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "1.8rem 2rem", marginBottom: "1.5rem", transition: "border-color 0.2s, background 0.2s" },
    cardHover: { background: "rgba(0,255,180,0.03)", border: "1px solid rgba(0,255,180,0.15)" },
    companyName: { fontFamily: "'Space Mono', monospace", fontSize: "1rem", fontWeight: 700, color: "#e8f4ff", marginBottom: 4 },
    roleLine: { display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" },
    role: { color: "#00ffb4", fontSize: "0.9rem", fontWeight: 500 },
    period: { fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#4a6a80", letterSpacing: "0.05em" },
    ul: { margin: "0.5rem 0 0 0", paddingLeft: "1.2rem" },
    li: { marginBottom: "0.4rem", color: "#8aacbf", fontSize: "0.92rem" },
    badge: { display: "inline-block", marginTop: "1rem", fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.08em", padding: "4px 10px", background: "rgba(0,255,180,0.06)", border: "1px solid rgba(0,255,180,0.25)", borderRadius: "3px", color: "#00ffb4", textDecoration: "none" },
    skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.2rem" },
    skillCard: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", padding: "1.4rem 1.5rem" },
    skillCat: { fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#00ffb4", marginBottom: "0.8rem" },
    skillItem: { fontSize: "0.88rem", color: "#8aacbf", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "4px 0" },
    projectGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "1.2rem" },
    heroBtn: { fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", padding: "10px 20px", border: "1px solid rgba(0,255,180,0.3)", borderRadius: "3px", color: "#00ffb4", background: "transparent", cursor: "pointer", transition: "all 0.2s", textDecoration: "none", display: "inline-block" },
    footer: { textAlign: "center", padding: "3rem 2rem", borderTop: "1px solid rgba(255,255,255,0.04)", fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#3a5a70", letterSpacing: "0.1em" },
  };

  const hoverGreen = e => e.currentTarget.style.color = "#00ffb4";
  const unhoverGrey = e => e.currentTarget.style.color = "#7a9ab5";
  const hoverBtnOn = e => { e.currentTarget.style.background = "rgba(0,255,180,0.08)"; e.currentTarget.style.borderColor = "#00ffb4"; };
  const hoverBtnOff = e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,255,180,0.3)"; };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <div style={S.root}>

        {/* Ambient glow */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 60% 40% at 15% 20%, rgba(0,255,180,0.04) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 80% 80%, rgba(0,120,255,0.04) 0%, transparent 60%)" }} />

        {/* NAV */}
        <nav style={S.nav}>
          <span style={S.navLogo} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>EY</span>
          <ul style={S.navLinks}>
            {NAV.map(n => (
              <li key={n} style={S.navLink} onMouseEnter={hoverGreen} onMouseLeave={unhoverGrey} onClick={() => scrollTo(n)}>{n}</li>
            ))}
            <li style={S.navLink}>
              <a href={data.github} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }} onMouseEnter={hoverGreen} onMouseLeave={unhoverGrey}>GitHub</a>
            </li>
          </ul>
        </nav>

        {/* HERO */}
        <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <CodeBackground />
          {/* Gradient mask so text stays readable */}
          <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(90deg, rgba(6,10,15,1) 45%, rgba(6,10,15,0.7) 70%, rgba(6,10,15,0.2) 100%)" }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: 900, margin: "0 auto", width: "100%", padding: "0 2.5rem" }}>
            <div style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.1s forwards" }}>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#00ffb4", marginBottom: "1.2rem" }}>
                // Brisbane, QLD → Tasmania
              </p>
            </div>
            <div style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.25s forwards" }}>
              <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontFamily: "'Space Mono', monospace", fontWeight: 700, lineHeight: 1.05, color: "#e8f4ff", margin: 0, marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>
                ERIC<br />YE
              </h1>
            </div>
            <div style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.4s forwards" }}>
              <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", color: "#7a9ab5", fontWeight: 400, margin: 0, marginBottom: "1.5rem", fontFamily: "'Space Mono', monospace" }}>
                Software Engineer
              </p>
            </div>
            <div style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.55s forwards" }}>
              <p style={{ fontSize: "1.05rem", color: "#a0b8cc", maxWidth: 480, marginBottom: "2.5rem", lineHeight: 1.8 }}>{data.bio}</p>
            </div>
            <div style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.7s forwards" }}>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href={`mailto:${data.email}`} style={S.heroBtn} onMouseEnter={hoverBtnOn} onMouseLeave={hoverBtnOff}>Email</a>
                <a href={data.github} target="_blank" rel="noreferrer" style={S.heroBtn} onMouseEnter={hoverBtnOn} onMouseLeave={hoverBtnOff}>GitHub</a>
                <span style={{ ...S.heroBtn, color: "#4a6a80", borderColor: "rgba(255,255,255,0.08)", cursor: "default" }}>{data.phone}</span>
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: "2.5rem", left: "2.5rem", zIndex: 2, fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "#2a4a60", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0, animation: "fadeUp 0.7s ease 1.1s forwards" }}>
            scroll ↓
          </div>
        </section>

        {/* WORK */}
        <section id="work" style={S.section}>
          <FadeIn><SectionTitle>Work Experience</SectionTitle></FadeIn>
          {data.work.map((w, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ ...S.card, ...(hoveredWork === i ? S.cardHover : {}) }} onMouseEnter={() => setHoveredWork(i)} onMouseLeave={() => setHoveredWork(null)}>
                <div style={S.roleLine}>
                  <div>
                    <div style={S.companyName}>
                      <a href={w.url} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#00ffb4"} onMouseLeave={e => e.target.style.color = "#e8f4ff"}>{w.company}</a>
                    </div>
                    <span style={S.role}>{w.role}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={S.period}>{w.period}</div>
                    <div style={{ ...S.period, marginTop: 2 }}>{w.location}</div>
                  </div>
                </div>
                <ul style={S.ul}>{w.points.map((p, j) => <li key={j} style={S.li}>{p}</li>)}</ul>
                {w.badge && <a href={w.badgeUrl} target="_blank" rel="noreferrer" style={S.badge}>🎤 {w.badge}</a>}
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={0.2}>
            <div style={{ ...S.card, borderStyle: "dashed" }}>
              <div style={S.roleLine}>
                <div><div style={S.companyName}>UQ Racing Team</div><span style={S.role}>Software Developer</span></div>
                <div style={S.period}>Extracurricular</div>
              </div>
              <ul style={S.ul}>
                <li style={S.li}>Built software for a driverless racing vehicle using ROS and PyTorch for the FSAE-A competition</li>
                <li style={S.li}>Implemented ML models for sensor data processing and autonomous decision-making</li>
                <li style={S.li}>Integrated software and hardware components for reliable real-time performance</li>
              </ul>
            </div>
          </FadeIn>
        </section>

        {/* EDUCATION */}
        <section id="education" style={S.section}>
          <FadeIn><SectionTitle>Education</SectionTitle></FadeIn>
          {data.education.map((e, i) => (
            <FadeIn key={i} delay={0.1}>
              <div style={S.card}>
                <div style={S.roleLine}>
                  <div><div style={S.companyName}>{e.institution}</div><span style={S.role}>{e.degree} — {e.major}</span></div>
                  <div style={{ textAlign: "right" }}>
                    <div style={S.period}>{e.period}</div>
                    <div style={{ ...S.period, color: "#00ffb4", marginTop: 4 }}>GPA {e.gpa}</div>
                  </div>
                </div>
                <div style={{ marginTop: "0.8rem", display: "flex", flexWrap: "wrap", gap: 6 }}>{e.courses.map((c, j) => tag(c, j))}</div>
              </div>
            </FadeIn>
          ))}
        </section>

        {/* PROJECTS */}
        <section id="projects" style={S.section}>
          <FadeIn><SectionTitle>Projects</SectionTitle></FadeIn>
          <div style={S.projectGrid}>
            {data.projects.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ ...S.card, height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ ...S.companyName, fontSize: "0.95rem", marginBottom: 8 }}>{p.name}</div>
                  <div style={{ marginBottom: 10, display: "flex", flexWrap: "wrap" }}>{p.tags.map((t, j) => tag(t, j))}</div>
                  <p style={{ ...S.li, flex: 1, margin: 0, lineHeight: 1.7 }}>{p.desc}</p>
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ ...S.badge, marginTop: 12, display: "inline-block" }}>{p.linkText} ↗</a>}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={S.section}>
          <FadeIn><SectionTitle>Skills</SectionTitle></FadeIn>
          <div style={S.skillsGrid}>
            {Object.entries(data.skills).map(([cat, items], i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div style={S.skillCard}>
                  <div style={S.skillCat}>{cat}</div>
                  {items.map((s, j) => <div key={j} style={{ ...S.skillItem, ...(j === items.length - 1 ? { borderBottom: "none" } : {}) }}>{s}</div>)}
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" style={S.section}>
          <FadeIn><SectionTitle>Blog</SectionTitle></FadeIn>
          <FadeIn delay={0.05}>
            <p style={{ color: "#2a4a5a", fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", marginBottom: "2rem", letterSpacing: "0.05em" }}>
              // thoughts on cryptography, AI engineering & systems
            </p>
          </FadeIn>
          {data.blog.map((post, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                style={{ ...S.card, cursor: "pointer", ...(hoveredBlog === i ? S.cardHover : {}) }}
                onMouseEnter={() => setHoveredBlog(i)}
                onMouseLeave={() => setHoveredBlog(null)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.6rem" }}>
                  <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.92rem", color: "#e8f4ff", margin: 0, fontWeight: 700, flex: 1, lineHeight: 1.5 }}>{post.title}</h3>
                  <span style={{ ...S.period, whiteSpace: "nowrap", marginLeft: "1rem" }}>{post.date}</span>
                </div>
                <p style={{ color: "#7a9ab5", fontSize: "0.9rem", margin: "0 0 0.8rem 0", lineHeight: 1.7 }}>{post.summary}</p>
                <div style={{ display: "flex", flexWrap: "wrap" }}>{post.tags.map((t, j) => tag(t, j))}</div>
              </div>
            </FadeIn>
          ))}
          <FadeIn delay={0.3}>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "#2a4a60", letterSpacing: "0.1em", marginTop: "1rem" }}>
              // more posts coming soon
            </p>
          </FadeIn>
        </section>

        {/* FOOTER */}
        <footer style={S.footer}>
          <div style={{ marginBottom: 8 }}>ERIC YE — SOFTWARE ENGINEER</div>
          <div style={{ color: "#2a3a50" }}>
            <a href={`mailto:${data.email}`} style={{ color: "inherit", textDecoration: "none", marginRight: 20 }}>{data.email}</a>
            <a href={data.github} target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>github/ericliol</a>
          </div>
        </footer>

        <style>{`
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: #060a0f; }
          ::-webkit-scrollbar-thumb { background: rgba(0,255,180,0.2); border-radius: 2px; }
        `}</style>
      </div>
    </>
  );
}
