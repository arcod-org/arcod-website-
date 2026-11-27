import { partners } from "@/lib/content";

export default function Marquee() {
  const list = [...partners, ...partners];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee flex w-max gap-14">
        {list.map((p, i) => (
          <span key={i} aria-hidden={i >= partners.length} className="whitespace-nowrap font-display text-[22px] font-bold text-[#6B7B74]">{p}</span>
        ))}
      </div>
    </div>
  );
}
