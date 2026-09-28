import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BriefcaseBusiness,
  Download,
  GitBranch,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  X,
} from 'lucide-react'
import { portfolio } from './data/portfolio'
import { SectionHeading } from './components/SectionHeading'
import { AnimatedCounter } from './components/AnimatedCounter'

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const navLinks = portfolio.navigation

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [repos, setRepos] = useState([])
  const [repoError, setRepoError] = useState('')

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/rahulkumar090405-ops/repos?per_page=6')
        if (!response.ok) {
          throw new Error('Unable to load public GitHub repositories.')
        }

        const data = await response.json()
        setRepos(Array.isArray(data) ? data : [])
      } catch (error) {
        setRepoError('Public GitHub repositories are not available right now. View the profile link below.')
      }
    }

    fetchRepos()
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      { threshold: [0.2, 0.45, 0.7] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (id) => {
    setMenuOpen(false)
    const target = document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-400/30 selection:text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute right-[-8%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
      </div>

      <div className="fixed inset-x-0 top-0 z-50 h-1.5 bg-slate-900/80 backdrop-blur-sm">
        <div className="h-full w-1/3 bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button type="button" onClick={() => handleNavClick('home')} className="flex items-center gap-3 text-left text-sm font-semibold tracking-[0.2em] text-white/90 uppercase">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">RK</span>
            Rahul Kumar
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`text-sm transition ${activeSection === item.id ? 'text-cyan-300' : 'text-slate-300 hover:text-white'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="/resume/Rahul-Kumar-Resume.pdf" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400/50 hover:text-white">
              <Download size={16} />
              Download Resume
            </a>
          </div>

          <button type="button" className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-slate-100 lg:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {menuOpen ? (
          <div className="border-t border-white/10 bg-slate-950/90 px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`rounded-xl px-3 py-2 text-left text-sm ${activeSection === item.id ? 'bg-cyan-500/10 text-cyan-300' : 'text-slate-300 hover:bg-white/5'}`}
                >
                  {item.label}
                </button>
              ))}
              <a href="/resume/Rahul-Kumar-Resume.pdf" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950">
                <Download size={16} />
                Download Resume
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section id="home" className="relative mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="grid items-center gap-10 lg:grid-cols-[1.35fr_0.65fr]"
          >
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-cyan-200">
                <Sparkles size={14} />
                {portfolio.heroBadge}
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl">
                Rahul Kumar
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-lg text-slate-200 sm:text-xl">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Technical Lead</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Java Backend Engineer</span>
              </div>

              <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-xl">
                {portfolio.personal.intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => handleNavClick('projects')} className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                  View My Work
                  <ArrowRight size={16} />
                </button>
                <a href="/resume/Rahul-Kumar-Resume.pdf" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/50 hover:bg-cyan-500/10">
                  <Download size={16} />
                  Download Resume
                </a>
                <button type="button" onClick={() => handleNavClick('contact')} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-violet-400/50 hover:bg-violet-500/10">
                  Contact Me
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href={portfolio.social.linkedin === '#' ? '#contact' : portfolio.social.linkedin} target={portfolio.social.linkedin === '#' ? undefined : '_blank'} rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-400/50 hover:text-white">
                  <Globe size={16} /> LinkedIn
                </a>
                <a href={portfolio.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-400/50 hover:text-white">
                  <GitBranch size={16} /> GitHub
                </a>
                <a href={portfolio.social.email} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-400/50 hover:text-white">
                  <Mail size={16} /> Email
                </a>
              </div>

              <div className="mt-10 flex items-center gap-2 text-sm uppercase tracking-[0.22em] text-slate-400">
                <span className="block h-px w-12 bg-slate-600" />
                Scroll to explore ↓
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_25px_120px_rgba(38,86,110,0.35)] backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10" />
                <div className="relative">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-200">
                      <span className="h-2 w-2 rounded-full bg-cyan-300" />
                      Available
                    </span>
                    <span className="text-xs text-slate-400">Noida, India</span>
                  </div>

                  <div className="space-y-4">
                    {portfolio.stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
                        <div className="text-2xl font-semibold text-white">
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </div>
                        <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="About" title="Senior Java engineer with leadership, systems thinking, and delivery focus." description="I design resilient backend systems, modernize legacy platforms, and lead high-impact engineering teams with a strong emphasis on performance and maintainability." />

          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_10px_50px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-8">
              <p className="text-base leading-8 text-slate-300">{portfolio.about.paragraph}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {portfolio.about.highlights.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-500/10 p-6 sm:p-8">
              <div className="flex items-center gap-3 text-cyan-200">
                <BriefcaseBusiness className="h-5 w-5" />
                <span className="text-sm uppercase tracking-[0.2em]">Snapshot</span>
              </div>
              <div className="mt-6 space-y-5 text-sm text-slate-200">
                <div className="flex items-center gap-3"><MapPin size={16} className="text-cyan-300" /> <span>{portfolio.personal.location}</span></div>
                <div className="flex items-center gap-3"><Mail size={16} className="text-cyan-300" /> <span>{portfolio.personal.email}</span></div>
                <div className="flex items-center gap-3"><Globe size={16} className="text-cyan-300" /> <span>Java • Spring Boot • Microservices</span></div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section id="featured-project" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_30%),rgba(15,23,42,0.95)] p-5 shadow-[0_30px_100px_rgba(15,23,42,0.75)] backdrop-blur-sm sm:p-8 lg:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-cyan-200">
                  <Sparkles size={12} /> Featured Project
                </div>
                <h2 className="text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">{portfolio.featuredProject.name}</h2>
                <p className="mt-3 text-lg font-medium text-cyan-100">{portfolio.featuredProject.subtitle}</p>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">{portfolio.featuredProject.tagline}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {portfolio.featuredProject.tech.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200">{item}</span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setSelectedProject({
                    name: portfolio.featuredProject.name,
                    type: portfolio.featuredProject.subtitle,
                    description: portfolio.featuredProject.tagline,
                    year: '2026',
                    architecture: 'React Admin → API Gateway → Spring Boot microservices → MySQL, Redis, Kafka',
                    technologies: portfolio.featuredProject.tech,
                    features: portfolio.featuredProject.contributionSummary,
                    liveUrl: '#',
                    githubUrl: '#',
                    problem: 'Enterprise SaaS platform requiring scalable backend services, multi-tenant architecture, and accelerated delivery for a growing product footprint.',
                    solution: 'Led architecture, platform modernization, and backend delivery using Java, Spring Boot microservices, event-driven processing, and database optimization.'
                  })} className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
                    Explore Yujik
                    <ArrowRight size={16} />
                  </button>
                  <a href={portfolio.featuredProject.githubUrl === '#' ? undefined : portfolio.featuredProject.githubUrl} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-cyan-400/40 hover:bg-cyan-500/10">
                    {portfolio.featuredProject.githubUrl === '#' ? 'Enterprise Project — Private Repository' : 'GitHub'}
                  </a>
                </div>
              </div>

              <div className="relative rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5 shadow-[0_30px_80px_rgba(14,116,144,0.2)]">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.22em] text-cyan-200">My Contribution</span>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-2 py-1 text-[10px] text-cyan-100">{portfolio.featuredProject.teamNote}</span>
                </div>
                <ul className="space-y-3 text-sm leading-6 text-slate-200">
                  {portfolio.featuredProject.contributionSummary.map((item) => (
                    <li key={item} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {portfolio.featuredProject.highlights.map((item) => (
                <motion.div
                  key={`${item.value}-${item.label}`}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center shadow-[0_10px_30px_rgba(15,23,42,0.3)]"
                >
                  <div className="text-2xl font-semibold text-white">{item.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-300">{item.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 rounded-[1.75rem] border border-cyan-400/20 bg-slate-950/70 p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">Architecture</p>
                <span className="text-xs text-slate-400">High-level view</span>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.92),rgba(2,6,23,0.82))] p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),transparent_45%)]" />
                <div className="relative flex flex-col items-center gap-4 text-center text-sm text-slate-200">
                  <div className="rounded-full border border-cyan-400/30 bg-cyan-500/8 px-4 py-2 shadow-[0_0_18px_rgba(34,211,238,0.18)]">React Admin</div>
                  <div className="h-8 w-px bg-gradient-to-b from-cyan-400/60 to-slate-500/60" />
                  <div className="rounded-full border border-violet-400/30 bg-violet-500/8 px-4 py-2 shadow-[0_0_18px_rgba(168,85,247,0.18)]">API Gateway</div>
                  <div className="h-8 w-px bg-gradient-to-b from-violet-400/60 to-slate-500/60" />
                  <div className="rounded-full border border-emerald-400/30 bg-emerald-500/8 px-4 py-2 shadow-[0_0_18px_rgba(16,185,129,0.18)]">Spring Boot Microservices</div>
                  <div className="flex w-full max-w-xl justify-between gap-2 pt-2 text-xs text-slate-300 sm:text-sm">
                    <div className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-2">MySQL</div>
                    <div className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-2">Redis</div>
                    <div className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-2">Kafka</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <span className="inline-flex h-2 w-2 rounded-full bg-amber-300" />
                <span>Legacy Struts 2 Monolith</span>
              </div>
              <div className="text-cyan-200">↓</div>
              <div className="text-sm text-slate-200">Spring Boot Microservices</div>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">{portfolio.featuredProject.architecture.legacy}</p>
          </div>
        </motion.section>

        <motion.section id="delivery" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Delivery Model" title="Architecture-first engineering for resilient platforms and measurable business impact." description="I lead backend delivery with a balance of product clarity, scalable design, and performance-focused execution." />

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {[
              {
                title: 'System Design',
                text: 'Design resilient Java services, API boundaries, and multi-tenant backend flows that scale with business complexity.',
                accent: 'from-cyan-500/15 to-cyan-500/5',
              },
              {
                title: 'Platform Modernization',
                text: 'Modernize legacy stacks through incremental migration, strong code review habits, and well-governed service decomposition.',
                accent: 'from-violet-500/15 to-violet-500/5',
              },
              {
                title: 'Performance Engineering',
                text: 'Optimize data access, caching, event processing, and query patterns to improve responsiveness and system throughput.',
                accent: 'from-emerald-500/15 to-emerald-500/5',
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ y: -6 }}
                className={`rounded-[1.75rem] border border-white/10 bg-gradient-to-br ${item.accent} p-6 shadow-[0_18px_60px_rgba(15,23,42,0.45)]`}
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-sm font-semibold text-cyan-200">
                  {item.title.slice(0, 1)}
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Skills" title="Technologies and engineering strengths shaped by enterprise backend delivery." description="The core stack spans Java, Spring Boot, microservices, APIs, data platforms, and modern cloud delivery practices." />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {portfolio.skills.categories.map((category) => (
              <div key={category.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.35)]">
                <h3 className="mb-4 text-lg font-semibold text-white">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className="rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1.5 text-sm text-slate-200">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="experience" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Experience" title="Career progression across enterprise systems, product delivery, and technical leadership." description="From Java platform foundations to modern SaaS architecture and microservice transformation." />

          <div className="relative mt-10">
            <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-cyan-400/0 via-cyan-400/80 to-cyan-400/0 md:left-1/2" />

            <div className="space-y-8">
              {portfolio.experience[0].roles.map((role, index) => (
                <div key={role.title} className={`relative md:flex md:items-start ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className="md:w-1/2 md:pr-10">
                    <div className={`rounded-[1.6rem] border border-white/10 bg-white/5 p-5 shadow-[0_8px_30px_rgba(15,23,42,0.35)] ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                      <div className="mb-3 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-cyan-200">
                        <span>{role.period}</span>
                        <span>{role.project}</span>
                      </div>
                      <h3 className="text-2xl font-semibold text-white">{role.title}</h3>
                      <p className="mt-4 text-sm text-slate-400">{portfolio.experience[0].company} • {portfolio.experience[0].location}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {role.stack.map((tech) => (
                          <span key={tech} className="rounded-full border border-white/10 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-200">{tech}</span>
                        ))}
                      </div>
                      <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                        {role.highlights.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="absolute left-2.5 flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300 bg-slate-950 md:left-1/2 md:-translate-x-1/2">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Projects" title="Selected software work spanning commerce, finance, travel, and enterprise platforms." description="Each project below reflects a verified resume project. Links are intentionally kept configurable so they can be updated without guesswork." />

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {portfolio.projects.map((project) => (
              <motion.article
                key={project.name}
                whileHover={{ y: -6 }}
                className="group cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-[0_10px_40px_rgba(15,23,42,0.4)]"
                onClick={() => setSelectedProject(project)}
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">{project.year}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{project.name}</h3>
                  </div>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 p-2 text-cyan-200">
                    <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </span>
                </div>

                <p className="text-sm uppercase tracking-[0.15em] text-slate-400">{project.type}</p>
                <p className="mt-4 text-sm leading-7 text-slate-300">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-slate-900/80 px-2.5 py-1 text-[11px] text-slate-200">{tech}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section id="achievements" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Achievements" title="Measured outcomes and engineering impact from complex delivery work." description="These metrics are drawn directly from the resume and reflect operational scale, performance gains, and migration impact." />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {portfolio.achievements.map((achievement) => (
              <div key={achievement.label} className="rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/5 to-slate-900/90 p-5">
                <div className="text-3xl font-semibold text-white">
                  <AnimatedCounter value={achievement.value} suffix={achievement.suffix} />
                </div>
                <p className="mt-2 text-base font-medium text-slate-100">{achievement.label}</p>
                <p className="mt-2 text-sm text-slate-400">{achievement.detail}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="engineering-journey" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="My Engineering Journey" title="From Java backend foundations to technical leadership and modern platform engineering." description="A timeline of growth, delivery, and evolution across enterprise systems and SaaS products." />

          <div className="relative mt-8 border-l border-cyan-500/30 pl-6">
            {portfolio.engineeringJourney.map((item) => (
              <div key={item.year} className="relative mb-8 last:mb-0">
                <span className="absolute -left-[1.8rem] top-2 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_0_6px_rgba(34,211,238,0.15)]" />
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-200">{item.year}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-7 text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="architecture" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How I Build Systems" title="A modern backend architecture aligned with Java, Spring Boot, messaging, caching, and cloud-native delivery." description="This is a general engineering representation based on the technologies and architecture patterns from the resume." />

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col items-center gap-4 text-center text-sm text-slate-200 sm:flex-row sm:justify-center sm:gap-3">
              <div className="rounded-full border border-cyan-400/25 bg-cyan-500/5 px-4 py-2">Client</div>
              <span className="hidden text-slate-500 sm:block">↓</span>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">API / Gateway</div>
              <span className="hidden text-slate-500 sm:block">↓</span>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Spring Boot Services</div>
              <span className="hidden text-slate-500 sm:block">↓</span>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Kafka / Redis</div>
              <span className="hidden text-slate-500 sm:block">↓</span>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Databases</div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {['Docker', 'Kubernetes', 'Jenkins CI/CD'].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-center text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="education" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Education" title="Academic foundation in computer science engineering." />
          <div className="max-w-xl rounded-[1.7rem] border border-white/10 bg-white/5 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.4)]">
            <div className="mb-4 flex items-center gap-3 text-cyan-200">
              <GraduationCap size={18} />
              <span className="text-sm uppercase tracking-[0.2em]">Academic Background</span>
            </div>
            <h3 className="text-2xl font-semibold text-white">{portfolio.education[0].degree}</h3>
            <p className="mt-2 text-slate-300">{portfolio.education[0].field}</p>
            <p className="mt-2 text-slate-400">{portfolio.education[0].years}</p>
            <p className="mt-6 text-sm text-slate-300">{portfolio.education[0].institution}</p>
          </div>
        </motion.section>

        <motion.section id="ai" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="AI-Assisted Engineering" title="Productive engineering with modern AI tools and developer workflows." description="I regularly use GitHub Copilot, Claude AI, and Claude Code to accelerate development, testing, refactoring, and debugging." />

          <div className="rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-500/10 p-6 sm:p-8">
            <p className="text-base leading-8 text-slate-200">{portfolio.ai.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {portfolio.ai.tools.map((tool) => (
                <span key={tool} className="rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1.5 text-sm text-cyan-100">{tool}</span>
              ))}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {portfolio.ai.useCases.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-slate-300">{portfolio.ai.note}</p>
          </div>
        </motion.section>

        <motion.section id="github" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Open Source & GitHub" title="Public engineering work and repository activity." description="This section uses the public GitHub profile and repository metadata for the configured username only." />

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">GitHub Profile</p>
              <p className="mt-2 text-lg font-medium text-white">@{portfolio.github.username}</p>
            </div>
            <a href={portfolio.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:border-cyan-400/50 hover:text-cyan-200">
              <GitBranch size={16} /> View GitHub Profile
            </a>
          </div>

          {repoError ? (
            <div className="rounded-[1.5rem] border border-amber-400/30 bg-amber-500/10 p-4 text-sm text-amber-100">{repoError}</div>
          ) : null}

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {repos.length > 0 ? (
              repos.map((repo) => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:border-cyan-400/40 hover:bg-cyan-500/5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{repo.name}</h3>
                    <ArrowRight size={16} className="text-cyan-200 transition group-hover:translate-x-1" />
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{repo.description || 'Public repository with backend and application code.'}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                    {repo.language ? <span className="rounded-full border border-white/10 bg-slate-900/80 px-2 py-1">{repo.language}</span> : null}
                    {repo.stargazers_count ? <span className="rounded-full border border-white/10 bg-slate-900/80 px-2 py-1">★ {repo.stargazers_count}</span> : null}
                    {repo.forks_count ? <span className="rounded-full border border-white/10 bg-slate-900/80 px-2 py-1">Forks {repo.forks_count}</span> : null}
                  </div>
                </a>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm text-slate-300 md:col-span-2 xl:col-span-3">
                Public repository data is being loaded from GitHub. In the meantime, use the GitHub profile link above to review the live work.
              </div>
            )}
          </div>
        </motion.section>

        <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionReveal} className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Contact" title="Available for backend leadership, platform modernization, and Java engineering roles." description="I’m open to technical leadership, senior backend engineering, and architecture-focused opportunities." />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 sm:p-8">
              <h3 className="text-3xl font-semibold text-white">Rahul Kumar</h3>
              <p className="mt-2 text-slate-300">Technical Lead | Java Backend Engineer</p>

              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="flex items-center gap-3"><Mail size={16} className="text-cyan-300" /> <span>{portfolio.personal.email}</span></div>
                <div className="flex items-center gap-3"><MapPin size={16} className="text-cyan-300" /> <span>{portfolio.personal.location}</span></div>
                <div className="flex items-center gap-3"><GitBranch size={16} className="text-cyan-300" /> <span>{portfolio.social.github}</span></div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href={portfolio.social.email} className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950">
                  <Mail size={16} /> Email Me
                </a>
                <a href={portfolio.social.linkedin === '#' ? '#contact' : portfolio.social.linkedin} target={portfolio.social.linkedin === '#' ? undefined : '_blank'} rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100">
                  <Globe size={16} /> LinkedIn
                </a>
                <a href={portfolio.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100">
                  <GitBranch size={16} /> GitHub
                </a>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-500/10 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Professional Presence</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Follow me on LinkedIn</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">{portfolio.professionalPresence.intro}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={portfolio.social.linkedin === '#' ? '#contact' : portfolio.social.linkedin} target={portfolio.social.linkedin === '#' ? undefined : '_blank'} rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 hover:border-cyan-400/50">
                  <Globe size={16} /> LinkedIn
                </a>
                <a href={portfolio.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100 hover:border-cyan-400/50">
                  <GitBranch size={16} /> GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-sm text-slate-300 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold text-white">Rahul Kumar</p>
            <p className="mt-1 text-slate-400">Technical Lead | Java Backend Engineer</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span>Java</span>
            <span className="text-slate-500">•</span>
            <span>Spring Boot</span>
            <span className="text-slate-500">•</span>
            <span>Microservices</span>
            <span className="text-slate-500">•</span>
            <span>Cloud</span>
            <span className="text-slate-500">•</span>
            <span>DevOps</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href={portfolio.social.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
            <a href={portfolio.social.linkedin === '#' ? '#contact' : portfolio.social.linkedin} target={portfolio.social.linkedin === '#' ? undefined : '_blank'} rel="noreferrer" className="hover:text-white">LinkedIn</a>
            <a href={portfolio.social.email} className="hover:text-white">Email</a>
          </div>
        </div>

        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          © {currentYear} Rahul Kumar
        </div>
      </footer>

      {selectedProject ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-[1.8rem] border border-white/10 bg-slate-950 p-6 shadow-[0_25px_100px_rgba(15,23,42,0.8)] sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{selectedProject.year}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{selectedProject.name}</h3>
              </div>
              <button type="button" onClick={() => setSelectedProject(null)} className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 hover:text-white" aria-label="Close project details">
                <X size={18} />
              </button>
            </div>

            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-400">{selectedProject.type}</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">{selectedProject.description}</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Role</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{portfolio.featuredProject.role}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Tech Stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 bg-slate-900/80 px-2.5 py-1 text-xs text-slate-200">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Key Contributions</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                  {selectedProject.features.map((feature) => (
                    <li key={feature} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" /> <span>{feature}</span></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 md:col-span-2">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">Architecture</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{selectedProject.architecture}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={selectedProject.liveUrl} target={selectedProject.liveUrl === '#' ? undefined : '_blank'} rel={selectedProject.liveUrl === '#' ? undefined : 'noreferrer'} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100">
                <Globe size={16} /> Explore Yujik
              </a>
              <a href={selectedProject.githubUrl} target={selectedProject.githubUrl === '#' ? undefined : '_blank'} rel={selectedProject.githubUrl === '#' ? undefined : 'noreferrer'} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-100">
                <GitBranch size={16} /> {selectedProject.githubUrl === '#' ? portfolio.featuredProject.githubLabel : 'GitHub'}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
