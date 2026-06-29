import React from "react";

const markets = [
  { name: "S&P 500", value: "5,278", change: "+1.2%", up: true },
  { name: "NASDAQ", value: "16,742", change: "+0.8%", up: true },
  { name: "DOW", value: "38,954", change: "-0.3%", up: false },
  { name: "GOLD", value: "$2,312/oz", change: "+0.6%", up: true },
  { name: "OIL (WTI)", value: "$79.54", change: "-1.1%", up: false },
  { name: "BTC", value: "$67,240", change: "+3.1%", up: true },
  { name: "EUR/USD", value: "1.0843", change: "-0.1%", up: false },
  { name: "GBP/USD", value: "1.2741", change: "+0.2%", up: true },
  { name: "SILVER", value: "$28.40/oz", change: "+0.5%", up: true },
  { name: "APPLE", value: "$189.30", change: "+1.4%", up: true },
];

export default function MarketTicker() {
  const items = [...markets, ...markets];

  return (
    <div className="relative bg-black border-y border-gold/10 overflow-hidden py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((m, i) => (
          <div key={i} className="flex items-center gap-2 px-6 border-r border-gold/5">
            <span className="text-white/50 text-xs font-semibold tracking-wider uppercase">{m.name}</span>
            <span className="text-white text-xs font-bold">{m.value}</span>
            <span className={`text-xs font-semibold ${m.up ? "text-green-400" : "text-red-400"}`}>{m.change}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 40s linear infinite; }
      `}</style>
    </div>
  );
}