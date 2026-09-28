export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div style={{ maxWidth: '42rem' }} className="mb-10 md:mb-14">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-cyan-300/80">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base text-slate-300 md:text-lg">{description}</p> : null}
    </div>
  )
}
