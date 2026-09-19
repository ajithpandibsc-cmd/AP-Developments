import { motion } from 'framer-motion'
import { Code2, Palette, Film, FileText, Target, Eye, Heart } from 'lucide-react'
import Logo from '../components/Logo'

const SKILLS = [
  { icon: <Code2 size={20} />, label: 'React & Node.js',    color: '#7C3AED' },
  { icon: <Palette size={20} />, label: 'Figma & Illustrator', color: '#A3E635' },
  { icon: <Film size={20} />, label: 'Premiere & AE',       color: '#F97316' },
  { icon: <FileText size={20} />, label: 'Content Strategy',  color: '#06B6D4' },
]

const TECH = ['React.js','Node.js','MongoDB','Express.js','Tailwind CSS','Figma','Premiere Pro','After Effects','Illustrator','Next.js','PostgreSQL','AWS']

const TIMELINE = [
  { year: '2021', event: 'Started freelancing in web development and design.' },
  { year: '2022', event: 'Expanded into content creation and video editing.' },
  { year: '2023', event: 'Launched AP Developments as a unified digital studio.' },
  { year: '2024', event: 'Added AI-powered project planning tools for clients.' },
  { year: '2025', event: 'Scaled to 50+ projects across 4 service verticals.' },
]

const PROCESS = [
  { n:'01', title:'Discovery',  desc:'Understand your goals, audience, and constraints before a single line of code is written.' },
  { n:'02', title:'Planning',   desc:'AI-assisted scoping, timeline, and budget — transparent before the project begins.' },
  { n:'03', title:'Execution',  desc:'Iterative builds with regular check-ins. You see progress at every stage.' },
  { n:'04', title:'Delivery',   desc:'Quality-checked, optimized, and documented output — delivered on time.' },
  { n:'05', title:'Support',    desc:'Post-delivery support, revisions, and maintenance as needed.' },
]

export default function About() {
  return (
    <main className="pt-24">
      {/* Header */}
      <section className="section pb-0 relative overflow-hidden">
        <div className="orb w-96 h-96 bg-[var(--primary)] right-0 top-0 opacity-10" />
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 border border-[var(--border)]"
                style={{ color: 'var(--primary)', background: 'rgba(124,58,237,0.1)' }}>
                Behind AP Developments
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                We Build<br />
                <span className="gradient-text">Digital Experiences</span><br />
                People Remember.
              </h1>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                AP Developments is a freelance digital studio focused on building modern websites, creative content, engaging videos, and memorable visual designs.
              </p>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                The goal is simple: understand the client's idea, turn it into a clear digital plan, and deliver a polished result that works across devices.
              </p>
              <p className="text-[var(--muted)] leading-relaxed">
                AP Developments combines development and creative services so clients can manage multiple digital needs through one platform — saving time, money, and coordination headaches.
              </p>
            </motion.div>

            {/* Right: logo visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-64 h-64 rounded-3xl flex items-center justify-center border border-[rgba(124,58,237,0.3)] float-anim"
                  style={{ background: 'linear-gradient(135deg,rgba(124,58,237,0.1),rgba(6,182,212,0.05))', backdropFilter:'blur(20px)' }}>
                  <Logo size={120} />
                </div>
                <div className="absolute -inset-8 rounded-full opacity-20"
                  style={{ background: 'radial-gradient(circle,var(--primary),transparent 70%)' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills & Tech */}
      <section className="section border-t border-[var(--border)]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Skills */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-display text-3xl font-bold mb-8">Core Competencies</h2>
              <div className="grid grid-cols-2 gap-4">
                {SKILLS.map(s => (
                  <div key={s.label}
                    className="rounded-2xl p-5 border border-[var(--border)] flex items-center gap-3"
                    style={{ background: 'var(--card-bg)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${s.color}18`, color: s.color }}>
                      {s.icon}
                    </div>
                    <span className="font-medium text-sm">{s.label}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-display font-semibold text-lg mt-10 mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {TECH.map(t => (
                  <span key={t} className="text-xs px-3 py-1.5 rounded-xl border border-[var(--border)] text-[var(--muted)]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}>
              <h2 className="font-display text-3xl font-bold mb-8">Journey</h2>
              <div className="space-y-6 relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5"
                  style={{ background: 'linear-gradient(180deg,var(--primary),var(--secondary))' }} />
                {TIMELINE.map((t, i) => (
                  <div key={t.year} className="flex gap-6 pl-12 relative">
                    <div className="absolute left-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold border border-[var(--border)]"
                      style={{ background: 'var(--bg)', color: 'var(--primary)' }}>
                      {t.year.slice(2)}
                    </div>
                    <div>
                      <span className="font-display font-semibold text-sm block mb-1" style={{ color: 'var(--primary)' }}>{t.year}</span>
                      <p className="text-[var(--muted)] text-sm">{t.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="section border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-8 items-center bg-[var(--card-bg)] rounded-3xl p-8 border border-[var(--border)]">
              
              <div className="col-span-1 flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 mb-4 shadow-lg shadow-violet-500/20"
                  style={{ borderColor: 'var(--primary)' }}>
                  <img src="https://ui-avatars.com/api/?name=Ajithpandi+S&size=200&background=060606&color=7C3AED&rounded=true&bold=true" alt="Ajithpandi S" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-display font-bold text-xl">Ajithpandi S</h3>
                <p className="text-[var(--primary)] text-sm font-medium">Full-Stack Developer & Freelancer</p>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-4">
                <h2 className="font-display text-2xl font-bold mb-4">Meet the Founder</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Qualification</p>
                    <p className="text-sm font-medium">B.Sc. Computer Science</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Diploma</p>
                    <p className="text-sm font-medium">Diploma in Tally</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:ajithpandi24032005@gmail.com" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">ajithpandi24032005@gmail.com</a>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Mobile</p>
                    <a href="tel:+916369647192" className="text-sm font-medium hover:text-[var(--primary)] transition-colors">+91 63696 47192</a>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-[var(--muted)] uppercase tracking-wider mb-1">Address</p>
                    <p className="text-sm font-medium text-[var(--muted)]">Vellikuruchi, Vellikuruchi (P), Sivaganga – 630610, Tamil Nadu</p>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section border-t border-[var(--border)]">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl font-bold">How We Work</h2>
            <p className="text-[var(--muted)] mt-3">Our creative and development process — from first contact to final delivery.</p>
          </motion.div>
          <div className="grid md:grid-cols-5 gap-6">
            {PROCESS.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-lg mx-auto mb-4 border border-[var(--border)]"
                  style={{ background: 'rgba(124,58,237,0.1)', color: 'var(--primary)' }}>
                  {p.n}
                </div>
                <h3 className="font-display font-semibold text-sm mb-2">{p.title}</h3>
                <p className="text-[var(--muted)] text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section border-t border-[var(--border)]">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Target size={24}/>, title:'Mission', color:'var(--primary)', desc:'To make high-quality digital services accessible to every business and creator — with transparent pricing, AI-powered planning, and a single point of contact for all needs.' },
              { icon: <Eye size={24}/>,    title:'Vision',  color:'var(--secondary)', desc:'A world where every great idea gets the digital presence it deserves, regardless of the size of the business or budget.' },
              { icon: <Heart size={24}/>, title:'Values',  color:'var(--accent)',    desc:'Transparency in pricing. Quality in delivery. Respect for client ideas. Constant improvement. No hidden costs. No missed deadlines.' },
            ].map(item => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl p-8 border border-[var(--border)]"
                style={{ background: 'var(--card-bg)' }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${item.color}18`, color: item.color }}>
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-xl mb-4" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-[var(--muted)] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
