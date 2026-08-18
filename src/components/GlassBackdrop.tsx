export default function GlassBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#060814]" />
      <div className="absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-violet-600/35 blur-[120px]" />
      <div className="absolute top-1/3 -left-24 h-[28rem] w-[28rem] rounded-full bg-cyan-500/25 blur-[110px]" />
      <div className="absolute bottom-0 right-[-6rem] h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/20 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay" style={{ backgroundImage: "url(/grain.png)", backgroundSize: "180px" }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(6,8,20,0.35))]" />
    </div>
  );
}
