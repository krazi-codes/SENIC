import { useState } from 'react';

// ============================================================
// DATA
// ============================================================

const FACTS = [
  {
    id: 1, title: 'TFSA', category: 'Registered Accounts',
    plain: 'A TFSA lets Canadians 18+ invest and save money without paying tax on the growth or withdrawals. You can put in up to $7,000 in 2026.',
    can: ['Your money grows tax-free inside a TFSA', 'You can withdraw anytime without penalty', 'Unused contribution room carries forward every year'],
    cannot: ['A TFSA guarantees returns', 'There are no rules about what you can invest in', 'You can put in unlimited amounts'],
    tags: 'tfsa registered savings tax-free withdrawal',
  },
  {
    id: 2, title: 'RRSP', category: 'Registered Accounts',
    plain: "An RRSP lets you save for retirement and reduce your taxable income today. You pay tax when you withdraw, usually in retirement when your income is lower.",
    can: ['RRSP contributions reduce your taxable income this year', 'Your investments grow tax-deferred inside an RRSP', "You can contribute 18% of last year's earned income up to a limit"],
    cannot: ['RRSPs are always better than TFSAs', 'You never pay tax on RRSP money', 'You should max out your RRSP before your TFSA'],
    tags: 'rrsp registered retirement savings tax deferred',
  },
  {
    id: 3, title: 'FHSA', category: 'Registered Accounts',
    plain: 'The FHSA is a new account that combines TFSA and RRSP benefits specifically for first-time home buyers. Contributions are tax-deductible and withdrawals for a home purchase are tax-free.',
    can: ['You can contribute up to $8,000 per year to an FHSA', 'Contributions are tax-deductible like an RRSP', 'Qualifying withdrawals for a first home are completely tax-free'],
    cannot: ['Everyone qualifies for an FHSA', 'FHSA funds can be used for any purpose tax-free', 'There is no lifetime limit on contributions'],
    tags: 'fhsa first home savings registered',
  },
  {
    id: 4, title: 'Index Fund / ETF', category: 'Investment Products',
    plain: 'An index fund or ETF is a basket of many stocks that tracks a market index like the S&P 500. Instead of picking individual stocks, you own a tiny piece of hundreds of companies at once.',
    can: ['ETFs typically have lower fees than actively managed funds', 'Index funds provide built-in diversification', 'You can buy ETFs on Scotia iTRADE commission-free'],
    cannot: ['ETFs always beat actively managed funds', 'Index investing has no risk', 'This specific ETF will perform well'],
    tags: 'etf index fund stocks investment scotiatrade',
  },
  {
    id: 5, title: 'Compound Interest', category: 'Financial Concepts',
    plain: "Compound interest means you earn returns not just on your original investment, but also on the returns you've already made. Over time, this creates exponential growth.",
    can: ['Starting earlier gives compound interest more time to work', 'Reinvesting returns accelerates growth significantly', 'Even small regular contributions compound meaningfully over decades'],
    cannot: ["Compound interest guarantees you'll get rich", 'Compound interest only applies to savings accounts', 'You need a lot of money to benefit from compound interest'],
    tags: 'compound interest growth savings time exponential',
  },
  {
    id: 6, title: 'Contribution Room', category: 'Registered Accounts',
    plain: "Contribution room is the maximum amount you're allowed to put into a registered account like a TFSA or RRSP in a given year. Unused room carries forward.",
    can: ['TFSA room accumulates every year starting at age 18', 'You can check your contribution room on the CRA My Account portal', 'Over-contributing to a TFSA triggers a 1% monthly penalty'],
    cannot: ['You can check contribution room inside the Scotia app without CRA access', 'Contribution room resets every January 1', 'Withdrawing from a TFSA permanently removes that room'],
    tags: 'contribution room limit tfsa rrsp cra penalty',
  },
  {
    id: 7, title: 'Diversification', category: 'Financial Concepts',
    plain: 'Diversification means spreading your investments across different types of assets so that if one goes down, the others can cushion the fall.',
    can: ['A diversified portfolio reduces your overall risk', 'ETFs and balanced mutual funds offer built-in diversification', 'Scotia Smart Investor automatically diversifies based on your risk tolerance'],
    cannot: ['Diversification eliminates all investment risk', 'You need thousands of dollars to diversify', 'More diversification always means better returns'],
    tags: 'diversification portfolio risk assets balanced',
  },
  {
    id: 8, title: 'Risk Tolerance', category: 'Financial Concepts',
    plain: "Risk tolerance is how much fluctuation in your portfolio value you're comfortable with. Higher potential returns generally come with higher potential losses.",
    can: ['Younger investors often have more time to recover from market dips', 'Scotia Smart Investor asks about your risk tolerance during setup', 'Conservative portfolios hold more bonds; aggressive portfolios hold more stocks'],
    cannot: ['High risk tolerance always leads to higher returns', "You should always invest aggressively when you're young", 'Risk tolerance never changes over time'],
    tags: 'risk tolerance portfolio conservative aggressive bonds stocks',
  },
];

const DISCLOSURES = {
  tiktok:    '#ad This video is sponsored by Scotiabank. I received compensation for this content. Scotia Smart Investor accounts are subject to terms and conditions. Investing involves risk. This is not personalized financial advice. Visit scotiabank.com for full details. CDIC eligible deposits.',
  youtube:   'Sponsored by Scotiabank. This video contains paid promotion. Scotia Smart Investor is provided by The Bank of Nova Scotia. All investments involve risk and may lose value. Past performance is not indicative of future results. This video does not constitute personalized financial advice. Scotia Smart Investor is not available in all regions. See scotiabank.com/smartinvestor for full terms, conditions, and risks.',
  instagram: 'Paid partnership with @scotiabank. This is a sponsored post. Investing involves risk. This is not financial advice. Scotia Smart Investor terms apply. Visit scotiabank.com for details. #ad #scotiabank',
  podcast:   "This episode is brought to you by Scotiabank. I've been compensated for this mention. Scotia Smart Investor is a digital investing tool provided by The Bank of Nova Scotia. Investing involves risk, including possible loss of principal. Nothing in this episode constitutes personalized financial or investment advice. For complete terms and conditions, visit scotiabank.com.",
};

const GOALS = [
  { id: 'home',       emoji: '🏠', label: 'First Home',     sub: 'Save for a down payment' },
  { id: 'education',  emoji: '🎓', label: 'Education',      sub: 'University or college fund' },
  { id: 'travel',     emoji: '✈️', label: 'Travel',         sub: 'A trip or experience' },
  { id: 'retirement', emoji: '🌱', label: 'Retirement',     sub: 'Long-term wealth building' },
  { id: 'emergency',  emoji: '🛡️', label: 'Emergency Fund', sub: '3–6 months of expenses' },
  { id: 'exploring',  emoji: '💡', label: 'Just Exploring', sub: "I'm new to investing" },
];

const ACCOUNT_MAP = {
  home:       { type: 'FHSA', name: 'First Home Savings Account',          room: '$8,000',           reasons: ['Tax-deductible contributions reduce your income tax now', 'Qualifying withdrawals for a first home are 100% tax-free', 'Combines the best of RRSP and TFSA in one account'] },
  education:  { type: 'RESP', name: 'Registered Education Savings Plan',   room: 'Lifetime $50,000', reasons: ['Government grants up to $500/year (CESG)', 'Tax-sheltered growth until withdrawn', "Money used for education is taxed in the student's hands (usually $0)"] },
  travel:     { type: 'TFSA', name: 'Tax-Free Savings Account',            room: '$7,000',           reasons: ['Withdraw anytime with no tax — perfect for flexible timelines', 'Your money grows tax-free while you save up', 'Unused room carries forward if your plans change'] },
  retirement: { type: 'RRSP', name: 'Registered Retirement Savings Plan',  room: '18% of income',   reasons: ['Contributions reduce your taxable income this year', 'Investments grow tax-deferred over decades', 'Withdrawals in retirement are usually taxed at a lower rate'] },
  emergency:  { type: 'TFSA', name: 'Tax-Free Savings Account',            room: '$7,000',           reasons: ['Instant access — withdraw any amount, any time', 'No tax on withdrawals, so you get the full amount', 'Your money still earns returns while sitting there'] },
  exploring:  { type: 'TFSA', name: 'Tax-Free Savings Account',            room: '$7,000',           reasons: ['Best starting point for new investors — simple and flexible', 'No tax on growth or withdrawals to worry about', 'You can always open additional accounts as your goals evolve'] },
};

const ACTIVITY = [
  { time: '2 hours ago', text: '3 new account openings via your link' },
  { time: '6 hours ago', text: 'TFSA fact card viewed 47 times' },
  { time: 'Yesterday',   text: 'Referral code used by 12 new visitors' },
  { time: '2 days ago',  text: 'Disclosure Generator used (TikTok format)' },
  { time: '3 days ago',  text: 'Script check passed — 0 issues flagged' },
];

const NAV_ITEMS = [
  { id: 'dashboard',   icon: '📊', label: 'Dashboard' },
  { id: 'facts',       icon: '📚', label: 'Fact Library' },
  { id: 'disclosure',  icon: '📋', label: 'Disclosure Generator' },
  { id: 'checker',     icon: '🔍', label: 'Script Checker' },
];

const PLATFORMS = [
  { id: 'tiktok',    label: 'TikTok',     icon: '🎵' },
  { id: 'youtube',   label: 'YouTube',    icon: '▶️' },
  { id: 'instagram', label: 'Instagram',  icon: '📷' },
  { id: 'podcast',   label: 'Podcast',    icon: '🎙️' },
];

// ============================================================
// DESIGN TOKENS
// ============================================================

const C = {
  navy:        '#0D1B2A',
  navyMid:     '#1A2E45',
  navyLight:   '#2D4A6A',
  red:         '#C8102E',
  redDark:     '#991B1C',
  gold:        '#F2A900',
  white:       '#FFFFFF',
  offwhite:    '#F5F7FA',
  textSec:     '#A0AEC0',
  textDark:    '#1A202C',
  greenLight:  '#86EFAC',
  dangerLight: '#FCA5A5',
};

// ============================================================
// GLOBAL CSS
// ============================================================

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; }
  body { background: #0D1B2A; font-family: 'Trebuchet MS', sans-serif; color: #fff; }
  button { cursor: pointer; border: none; outline: none; font-family: inherit; }
  input, textarea { font-family: inherit; }

  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes fadeIn  { from { opacity: 0; }              to { opacity: 1; transform: none; } }
  @keyframes slideIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }

  .tab-fade  { animation: fadeIn  0.15s ease; }
  .slide-in  { animation: slideIn 0.2s  ease-out; }
  .fade-in   { animation: fadeIn  0.3s  ease; }

  .sidebar-nav-btn:hover { color: #fff !important; background: rgba(255,255,255,0.06) !important; }
  .goal-card { transition: transform 150ms, border-color 150ms, background 150ms; }
  .goal-card:hover { transform: scale(1.02); }

  ::-webkit-scrollbar       { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: #0D1B2A; }
  ::-webkit-scrollbar-thumb { background: #2D4A6A; border-radius: 3px; }

  /* ── Sidebar responsive ── */
  .sidebar-mobile { display: none; }

  @media (max-width: 768px) {
    .creator-layout  { flex-direction: column !important; }
    .sidebar-desktop { display: none !important; }
    .sidebar-mobile  { display: flex !important; overflow-x: auto; background: #0D1B2A; border-bottom: 1px solid #2D4A6A; padding: 0 8px; gap: 4px; flex-shrink: 0; }
    .facts-grid      { grid-template-columns: 1fr !important; }
    .stat-grid       { grid-template-columns: repeat(2,1fr) !important; }
    .platform-row    { flex-wrap: wrap !important; }
    .platform-btn    { flex: 1 1 44% !important; }
    .portfolio-row   { flex-direction: column !important; }
    .header-inner    { flex-wrap: wrap; height: auto !important; padding: 12px 16px !important; gap: 10px; }
  }

  @media (min-width: 769px) {
    .stat-grid  { grid-template-columns: repeat(4,1fr); }
    .facts-grid { grid-template-columns: repeat(3,1fr); }
  }

  @media (max-width: 480px) {
    .phone-frame { border-radius: 0 !important; width: 100% !important; max-width: 100% !important; box-shadow: none !important; }
    .phone-outer { padding: 0 !important; }
  }
`;

// ============================================================
// COPY BUTTON
// ============================================================

function CopyButton({ text, label = 'Copy', style = {} }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    try { navigator.clipboard.writeText(text); } catch (_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      style={{
        background: copied ? '#166534' : C.gold,
        color: copied ? C.greenLight : C.textDark,
        border: 'none', borderRadius: 6,
        padding: '8px 16px', fontWeight: 700, fontSize: 13,
        cursor: 'pointer', transition: 'background 0.2s, color 0.2s',
        ...style,
      }}
    >
      {copied ? 'Copied ✓' : label}
    </button>
  );
}

// ============================================================
// HEADER
// ============================================================

function Header({ activeTab, setActiveTab }) {
  return (
    <header style={{ background: C.navy, borderBottom: `1px solid ${C.navyLight}`, position: 'sticky', top: 0, zIndex: 100 }}>
      <div
        className="header-inner"
        style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, padding: '0 24px' }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <div style={{ width: 4, height: 36, background: C.red, borderRadius: 2 }} />
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: C.white, letterSpacing: '-0.3px' }}>
            Scotia Creator Network
          </span>
          <span style={{ background: C.gold, color: C.textDark, fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 4, letterSpacing: '0.5px' }}>
            BETA
          </span>
        </div>

        {/* Tab pills */}
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          {[
            { id: 'creator',  label: 'Creator Portal' },
            { id: 'investor', label: 'Investor Onboarding' },
          ].map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: active ? C.red : 'transparent',
                  color: active ? C.white : C.textSec,
                  border: `1px solid ${active ? C.red : C.navyLight}`,
                  borderRadius: 20, padding: '7px 18px', fontSize: 14, fontWeight: 500,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.color = C.white; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.color = C.textSec; }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

// ============================================================
// SIDEBAR
// ============================================================

function Sidebar({ active, setActive }) {
  const ItemDesktop = ({ item }) => {
    const on = active === item.id;
    return (
      <button
        className="sidebar-nav-btn"
        onClick={() => setActive(item.id)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', padding: '12px 20px', textAlign: 'left',
          background: on ? C.navyMid : 'transparent',
          color: on ? C.white : C.textSec,
          borderLeft: `3px solid ${on ? C.red : 'transparent'}`,
          fontSize: 14, fontWeight: on ? 600 : 400,
          transition: 'all 0.15s',
        }}
      >
        <span style={{ fontSize: 16 }}>{item.icon}</span>
        {item.label}
      </button>
    );
  };

  const ItemMobile = ({ item }) => {
    const on = active === item.id;
    return (
      <button
        onClick={() => setActive(item.id)}
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          padding: '10px 14px', background: 'transparent',
          color: on ? C.white : C.textSec,
          borderBottom: `3px solid ${on ? C.red : 'transparent'}`,
          whiteSpace: 'nowrap', fontSize: 11, fontWeight: on ? 600 : 400, flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 18 }}>{item.icon}</span>
        {item.label}
      </button>
    );
  };

  return (
    <>
      <div
        className="sidebar-desktop"
        style={{
          width: 220, minHeight: 'calc(100vh - 64px)', background: C.navy,
          borderRight: `1px solid ${C.navyLight}`, padding: '16px 0',
          position: 'sticky', top: 64, alignSelf: 'flex-start', flexShrink: 0,
        }}
      >
        {NAV_ITEMS.map(item => <ItemDesktop key={item.id} item={item} />)}
      </div>
      <div className="sidebar-mobile">
        {NAV_ITEMS.map(item => <ItemMobile key={item.id} item={item} />)}
      </div>
    </>
  );
}

// ============================================================
// DASHBOARD
// ============================================================

function Dashboard() {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    try { navigator.clipboard.writeText('ALEX-SCN-2847'); } catch (_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const STATS = [
    { label: 'Total Clicks',     value: '4,821' },
    { label: 'Accounts Opened',  value: '312' },
    { label: 'Conversion Rate',  value: '6.5%' },
    { label: 'Est. Earnings',    value: '$1,248' },
  ];

  return (
    <div className="fade-in" style={{ padding: 24, maxWidth: 960 }}>
      {/* Profile card */}
      <div style={{ background: C.navyMid, border: `1px solid ${C.navyLight}`, borderRadius: 10, padding: '20px 24px', marginBottom: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: '50%', background: C.navyLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
            👤
          </div>
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: C.white }}>Alex Chen</div>
            <div style={{ fontSize: 13, color: C.textSec, marginTop: 2 }}>@alexchenfinance · TikTok + YouTube</div>
            <div style={{ marginTop: 6, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, color: C.textSec }}>Partner since Jan 2026</span>
              <span style={{ fontSize: 11, background: C.gold, color: C.textDark, padding: '2px 8px', borderRadius: 4, fontWeight: 700, letterSpacing: '0.3px' }}>Tier 1</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: C.navy, borderRadius: 8, padding: '10px 16px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: C.textSec, flexShrink: 0 }}>Referral Code:</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: C.gold, fontFamily: 'monospace', letterSpacing: 1 }}>ALEX-SCN-2847</span>
          <button
            onClick={copyCode}
            style={{
              marginLeft: 'auto', background: copied ? '#166534' : C.navyLight,
              color: copied ? C.greenLight : C.white, border: 'none', borderRadius: 6,
              padding: '5px 14px', fontSize: 12, fontWeight: 600, transition: 'all 0.2s',
            }}
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid" style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
        {STATS.map(s => (
          <div key={s.label} style={{ background: C.navyMid, border: `1px solid ${C.navyLight}`, borderRadius: 10, padding: '20px 16px', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.25)' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.gold, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.textSec }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Activity feed */}
      <div style={{ background: C.navyMid, border: `1px solid ${C.navyLight}`, borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.25)' }}>
        <div style={{ padding: '14px 20px', borderBottom: `1px solid ${C.navyLight}` }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.white }}>Recent Activity</span>
        </div>
        {ACTIVITY.map((item, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 20px', borderBottom: i < ACTIVITY.length - 1 ? `1px solid ${C.navyLight}` : 'none' }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.gold, marginTop: 4, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: C.textSec, flexShrink: 0, minWidth: 90 }}>{item.time}</span>
            <span style={{ fontSize: 13, color: C.white }}>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// FACT LIBRARY
// ============================================================

function FactCard({ fact }) {
  return (
    <div style={{ background: C.navyMid, border: `1px solid ${C.navyLight}`, borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: C.red, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: 700, fontSize: 15, color: C.white }}>{fact.title}</span>
        <span style={{ background: C.gold, color: C.textDark, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
          {fact.category}
        </span>
      </div>

      <div style={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ fontSize: 13, color: C.textSec, lineHeight: 1.65 }}>{fact.plain}</p>

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.greenLight, marginBottom: 6, letterSpacing: '0.5px' }}>✓ YOU CAN SAY</div>
          {fact.can.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
              <span style={{ color: C.greenLight, fontSize: 13, flexShrink: 0 }}>•</span>
              <span style={{ fontSize: 12, color: C.white, lineHeight: 1.55 }}>{item}</span>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.dangerLight, marginBottom: 6, letterSpacing: '0.5px' }}>✗ YOU CANNOT SAY</div>
          {fact.cannot.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 5 }}>
              <span style={{ color: C.dangerLight, fontSize: 13, flexShrink: 0 }}>•</span>
              <span style={{ fontSize: 12, color: C.white, lineHeight: 1.55 }}>{item}</span>
            </div>
          ))}
        </div>

        <CopyButton
          text={fact.plain}
          label="Copy Explanation"
          style={{ marginTop: 'auto', width: '100%', padding: '9px 0', fontSize: 13 }}
        />
      </div>
    </div>
  );
}

function FactLibrary() {
  const [search, setSearch] = useState('');

  const filtered = FACTS.filter(f => {
    const q = search.toLowerCase();
    return f.title.toLowerCase().includes(q) || f.tags.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
  });

  return (
    <div className="fade-in" style={{ padding: 24 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: C.white, marginBottom: 6 }}>Fact Library</h2>
        <p style={{ fontSize: 13, color: C.textSec }}>Scotiabank-approved facts. Know exactly what you can and cannot say.</p>
      </div>

      <div style={{ position: 'relative', marginBottom: 24 }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 15, color: C.textSec, pointerEvents: 'none' }}>🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search financial concepts… e.g. TFSA, RRSP, compound interest"
          style={{
            width: '100%', padding: '12px 16px 12px 40px',
            background: C.navyMid, border: `1px solid ${C.navyLight}`,
            borderRadius: 8, color: C.white, fontSize: 14,
            transition: 'border-color 0.15s, box-shadow 0.15s',
          }}
          onFocus={e => { e.target.style.borderColor = C.red; e.target.style.boxShadow = `0 0 0 2px ${C.red}44`; }}
          onBlur={e => { e.target.style.borderColor = C.navyLight; e.target.style.boxShadow = 'none'; }}
        />
      </div>

      <div className="facts-grid" style={{ display: 'grid', gap: 16 }}>
        {filtered.map(fact => <FactCard key={fact.id} fact={fact} />)}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '48px 0', color: C.textSec }}>
          No facts match "{search}"
        </div>
      )}
    </div>
  );
}

// ============================================================
// DISCLOSURE GENERATOR
// ============================================================

function DisclosureGenerator() {
  const [platform, setPlatform] = useState('tiktok');
  const text = DISCLOSURES[platform];

  return (
    <div className="fade-in" style={{ padding: 24, maxWidth: 820 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: C.white, marginBottom: 6 }}>Disclosure Generator</h2>
        <p style={{ fontSize: 13, color: C.textSec }}>Select your platform for exact copy-paste compliance language.</p>
      </div>

      <div className="platform-row" style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {PLATFORMS.map(p => {
          const on = platform === p.id;
          return (
            <button
              key={p.id}
              className="platform-btn"
              onClick={() => setPlatform(p.id)}
              style={{
                flex: 1, padding: '14px 12px',
                background: on ? C.red : C.navyMid,
                color: on ? C.white : C.textSec,
                border: `1px solid ${on ? C.red : C.navyLight}`,
                borderRadius: 8, fontSize: 14, fontWeight: 600,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 22 }}>{p.icon}</span>
              {p.label}
            </button>
          );
        })}
      </div>

      <div style={{ background: C.navyMid, borderLeft: `4px solid ${C.gold}`, borderRadius: '0 10px 10px 0', padding: '20px 24px', marginBottom: 16 }}>
        <p style={{ fontSize: 14, color: C.white, lineHeight: 1.7, fontStyle: 'italic' }}>"{text}"</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12, flexWrap: 'wrap' }}>
        <CopyButton text={text} label="Copy to Clipboard" style={{ padding: '10px 20px', fontSize: 14 }} />
        <span style={{ fontSize: 13, color: C.textSec }}>{text.length} characters</span>
      </div>

      <p style={{ fontSize: 12, color: C.textSec }}>
        Required by CRTC influencer marketing guidelines and ASC advertising standards.
      </p>
    </div>
  );
}

// ============================================================
// SCRIPT CHECKER
// ============================================================

function ScriptChecker() {
  const [text, setText]       = useState('');
  const [result, setResult]   = useState(null);
  const [checking, setChecking] = useState(false);

  const check = () => {
    setResult(null);
    if (!text.trim()) { setResult('clear'); return; }
    setChecking(true);
    setTimeout(() => { setChecking(false); setResult('warning'); }, 1200);
  };

  return (
    <div className="fade-in" style={{ padding: 24, maxWidth: 820 }}>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: C.white, marginBottom: 6 }}>Script Checker</h2>
        <p style={{ fontSize: 13, color: C.textSec }}>Paste your script. We'll flag anything that might cross into personalized financial advice.</p>
      </div>

      <textarea
        value={text}
        onChange={e => { setText(e.target.value); setResult(null); }}
        rows={8}
        placeholder="Paste your planned script or talking points here. We'll flag anything that might cross the line into personalized financial advice…"
        style={{
          width: '100%', padding: '14px 16px',
          background: C.navyMid, border: `1px solid ${C.navyLight}`,
          borderRadius: 8, color: C.white, fontSize: 14, lineHeight: 1.65,
          resize: 'vertical', transition: 'border-color 0.15s, box-shadow 0.15s',
        }}
        onFocus={e => { e.target.style.borderColor = C.red; e.target.style.boxShadow = `0 0 0 2px ${C.red}44`; }}
        onBlur={e => { e.target.style.borderColor = C.navyLight; e.target.style.boxShadow = 'none'; }}
      />

      <button
        onClick={check}
        disabled={checking}
        style={{
          marginTop: 12, background: checking ? C.redDark : C.red, color: C.white,
          border: 'none', borderRadius: 8, padding: '12px 28px', fontSize: 14, fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 8,
          opacity: checking ? 0.85 : 1, transition: 'background 0.15s',
        }}
      >
        {checking && (
          <span style={{
            width: 16, height: 16,
            border: `2px solid rgba(255,255,255,0.3)`,
            borderTopColor: C.white,
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'spin 0.8s linear infinite',
          }} />
        )}
        {checking ? 'Checking…' : 'Check My Script'}
      </button>

      {result === 'warning' && (
        <div className="fade-in" style={{ marginTop: 20, background: C.navyMid, border: `1px solid ${C.redDark}`, borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ background: '#991B1B28', padding: '14px 20px', borderBottom: `1px solid ${C.navyLight}` }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.dangerLight }}>⚠️ 1 issue found</div>
            <div style={{ fontSize: 13, color: C.textSec, marginTop: 2 }}>Your script looks mostly good. One phrase needs rewording before you post.</div>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textSec, marginBottom: 8, letterSpacing: '0.5px' }}>FLAGGED PHRASE</div>
              <div style={{ background: '#991B1B1A', border: `1px solid #991B1B`, borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ color: C.dangerLight, fontWeight: 700, fontSize: 14, marginBottom: 6 }}>❌ "You should put your money in a TFSA"</div>
                <div style={{ fontSize: 12, color: C.textSec, marginBottom: 8 }}>
                  <strong style={{ color: C.white }}>Why:</strong> Prescriptive advice directed at a specific action
                </div>
                <div style={{ fontSize: 12, color: C.textSec }}>
                  <strong style={{ color: C.white }}>Fix:</strong>{' '}
                  Try <em style={{ color: C.greenLight }}>"Many people find a TFSA useful for…"</em>{' '}
                  or <em style={{ color: C.greenLight }}>"A TFSA might be worth exploring if…"</em>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.8 }}>
              <div style={{ color: C.greenLight }}>✓ Everything else looks good.</div>
              <div style={{ color: C.greenLight }}>✓ No claims about specific returns detected.</div>
              <div style={{ color: C.textSec }}>ℹ️ Sponsorship language detected — add your disclosure at the start or end.</div>
            </div>
          </div>
        </div>
      )}

      {result === 'clear' && (
        <div className="fade-in" style={{ marginTop: 20, background: C.navyMid, border: '1px solid #166534', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.greenLight, marginBottom: 4 }}>✅ No issues found</div>
          <div style={{ fontSize: 13, color: C.textSec }}>Your script looks clean. Remember to include your required platform disclosure before posting.</div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// CREATOR PORTAL
// ============================================================

function CreatorPortal() {
  const [active, setActive] = useState('dashboard');

  return (
    <div className="creator-layout" style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
      <Sidebar active={active} setActive={setActive} />
      <main style={{ flex: 1, overflowX: 'hidden' }}>
        {active === 'dashboard'  && <Dashboard />}
        {active === 'facts'      && <FactLibrary />}
        {active === 'disclosure' && <DisclosureGenerator />}
        {active === 'checker'    && <ScriptChecker />}
      </main>
    </div>
  );
}

// ============================================================
// INVESTOR ONBOARDING — SHARED
// ============================================================

function ProgressBar({ step }) {
  return (
    <div style={{ padding: '16px 20px 12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: C.textSec }}>Step {step} of 4</span>
        <span style={{ fontSize: 11, color: C.textSec }}>Scotia Smart Investor</span>
      </div>
      <div style={{ height: 4, background: C.navyLight, borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 2, background: C.red, width: `${(step / 4) * 100}%`, transition: 'width 0.3s ease' }} />
      </div>
    </div>
  );
}

// ============================================================
// STEP 0 — REFERRAL LANDING
// ============================================================

function Step0({ onNext }) {
  return (
    <div className="slide-in" style={{ padding: '36px 24px 32px', display: 'flex', flexDirection: 'column', gap: 20, minHeight: 680 }}>
      {/* Logo */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: C.red, color: C.white, fontFamily: 'Georgia, serif', fontSize: 26, fontWeight: 700, padding: '8px 22px', borderRadius: 8 }}>
          Scotia
        </div>
        <div style={{ fontSize: 11, color: C.textSec, marginTop: 6, letterSpacing: '1.5px' }}>SMART INVESTOR</div>
      </div>

      {/* Creator */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>👋</div>
        <div style={{ fontSize: 19, fontWeight: 600, color: C.white }}>
          <span style={{ color: C.gold }}>Alex Chen</span> sent you here
        </div>
        <div style={{ marginTop: 12, padding: '12px 16px', background: C.navyMid, borderRadius: 8, fontSize: 14, color: C.textSec, fontStyle: 'italic', lineHeight: 1.6 }}>
          "I've been using Scotia Smart Investor for 3 months — here's how I got started."
        </div>
      </div>

      {/* Bonus */}
      <div style={{ background: C.navyMid, borderLeft: `4px solid ${C.gold}`, borderRadius: '0 8px 8px 0', padding: '14px 16px' }}>
        <div style={{ fontSize: 13, color: C.gold, fontWeight: 700, marginBottom: 6 }}>🎁 Your referral bonus:</div>
        <div style={{ fontSize: 15, color: C.white, fontWeight: 700 }}>First 3 months fee-free</div>
        <div style={{ fontSize: 15, color: C.white, fontWeight: 700, marginTop: 2 }}>+ $25 when you invest $50</div>
      </div>

      <div style={{ flex: 1 }} />

      {/* CTA */}
      <button
        onClick={onNext}
        style={{ width: '100%', padding: 16, background: C.red, color: C.white, border: 'none', borderRadius: 14, fontSize: 16, fontWeight: 700, transition: 'background 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.background = C.redDark; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.red; }}
      >
        Get Started — Free
      </button>

      <div style={{ textAlign: 'center', color: C.textSec, fontSize: 12, lineHeight: 1.8 }}>
        CDIC insured · No minimums<br />Takes less than 3 minutes
      </div>
    </div>
  );
}

// ============================================================
// STEP 1 — GOAL SELECTOR
// ============================================================

function Step1({ selectedGoal, setSelectedGoal, onNext }) {
  return (
    <div className="slide-in" style={{ padding: '24px 20px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: C.white, marginBottom: 6 }}>What are you saving for?</h2>
        <p style={{ fontSize: 13, color: C.textSec }}>We'll recommend the right account in seconds.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {GOALS.map(goal => {
          const on = selectedGoal === goal.id;
          return (
            <button
              key={goal.id}
              className="goal-card"
              onClick={() => setSelectedGoal(goal.id)}
              style={{
                background: on ? `${C.red}22` : C.navyMid,
                border: `2px solid ${on ? C.red : C.navyLight}`,
                borderRadius: 10, padding: '16px 10px',
                cursor: 'pointer', textAlign: 'center', position: 'relative',
              }}
            >
              {on && (
                <div style={{ position: 'absolute', top: 6, right: 8, background: C.red, color: C.white, width: 18, height: 18, borderRadius: '50%', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✓</div>
              )}
              <div style={{ fontSize: 28, marginBottom: 6 }}>{goal.emoji}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.white, marginBottom: 2 }}>{goal.label}</div>
              <div style={{ fontSize: 11, color: C.textSec }}>{goal.sub}</div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={!selectedGoal}
        style={{
          width: '100%', padding: 14,
          background: selectedGoal ? C.red : C.navyLight,
          color: selectedGoal ? C.white : C.textSec,
          border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
          cursor: selectedGoal ? 'pointer' : 'default', transition: 'background 0.15s',
        }}
      >
        Continue
      </button>
    </div>
  );
}

// ============================================================
// STEP 2 — ACCOUNT RECOMMENDATION
// ============================================================

function Step2({ goal, onNext }) {
  const acct = ACCOUNT_MAP[goal] || ACCOUNT_MAP.exploring;

  return (
    <div className="slide-in" style={{ padding: '24px 20px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 13, color: C.greenLight, fontWeight: 600 }}>✓ Based on your goal:</div>

      <div style={{ background: C.navyMid, border: `1px solid ${C.navyLight}`, borderTop: `3px solid ${C.red}`, borderRadius: 10, padding: 20 }}>
        <div style={{ fontSize: 10, color: C.gold, fontWeight: 700, letterSpacing: '2px', marginBottom: 4 }}>{acct.type}</div>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 16 }}>{acct.name}</div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: C.textSec, fontWeight: 700, marginBottom: 8, letterSpacing: '0.5px' }}>WHY THIS WORKS FOR YOU</div>
          {acct.reasons.map((r, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 7 }}>
              <span style={{ color: C.greenLight, fontSize: 14, flexShrink: 0 }}>•</span>
              <span style={{ fontSize: 13, color: C.white, lineHeight: 1.55 }}>{r}</span>
            </div>
          ))}
        </div>

        <div style={{ background: C.navy, borderRadius: 6, padding: '8px 12px', fontSize: 12, color: C.textSec }}>
          2026 contribution room:{' '}
          <strong style={{ color: C.gold }}>{acct.room}</strong>
        </div>
      </div>

      <div style={{ fontSize: 12, color: C.textSec }}>ℹ️ Not sure? You can change this anytime in your settings.</div>

      <button
        onClick={onNext}
        style={{ width: '100%', padding: 14, background: C.red, color: C.white, border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.background = C.redDark; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.red; }}
      >
        Open My {acct.type}
      </button>
    </div>
  );
}

// ============================================================
// STEP 3 — FIRST DEPOSIT
// ============================================================

function Step3({ selectedAmount, setSelectedAmount, customAmount, setCustomAmount, selectedPortfolio, setSelectedPortfolio, roundUpEnabled, setRoundUpEnabled, onNext }) {
  const PRESETS = [25, 50, 100, 250];
  const PORTFOLIOS = [
    { id: 'conservative', label: 'Conservative', risk: '🛡️ Low',    desc: 'Mostly bonds, steady growth' },
    { id: 'balanced',     label: 'Balanced',     risk: '⚖️ Medium', desc: 'Mix of stocks and bonds' },
    { id: 'growth',       label: 'Growth',       risk: '🚀 High',   desc: 'Mostly stocks, higher potential' },
  ];
  const effectiveAmount = customAmount ? (parseInt(customAmount, 10) || selectedAmount) : selectedAmount;

  return (
    <div className="slide-in" style={{ padding: '24px 20px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: C.white, marginBottom: 4 }}>Make your first investment</h2>
        <p style={{ fontSize: 13, color: C.textSec }}>Start with as little as $1. No minimums.</p>
      </div>

      {/* Amount */}
      <div>
        <div style={{ fontSize: 11, color: C.textSec, fontWeight: 700, marginBottom: 8, letterSpacing: '0.5px' }}>SELECT AMOUNT</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {PRESETS.map(amt => {
            const on = selectedAmount === amt && !customAmount;
            return (
              <button
                key={amt}
                onClick={() => { setSelectedAmount(amt); setCustomAmount(''); }}
                style={{
                  flex: 1, padding: '10px 0',
                  background: on ? C.red : C.navyMid,
                  color: on ? C.white : C.textSec,
                  border: `1px solid ${on ? C.red : C.navyLight}`,
                  borderRadius: 8, fontSize: 14, fontWeight: 700, transition: 'all 0.15s',
                }}
              >
                ${amt}
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, color: C.textSec, flexShrink: 0 }}>Or enter amount: $</span>
          <input
            type="number" min="1"
            value={customAmount}
            onChange={e => setCustomAmount(e.target.value)}
            placeholder="Other"
            style={{
              flex: 1, padding: '8px 12px',
              background: C.navyMid, border: `1px solid ${customAmount ? C.red : C.navyLight}`,
              borderRadius: 6, color: C.white, fontSize: 14,
              transition: 'border-color 0.15s',
            }}
          />
        </div>
      </div>

      {/* Portfolio */}
      <div>
        <div style={{ fontSize: 11, color: C.textSec, fontWeight: 700, marginBottom: 8, letterSpacing: '0.5px' }}>PORTFOLIO STYLE</div>
        <div className="portfolio-row" style={{ display: 'flex', gap: 8 }}>
          {PORTFOLIOS.map(p => {
            const on = selectedPortfolio === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPortfolio(p.id)}
                style={{
                  flex: 1, padding: '12px 8px', textAlign: 'center',
                  background: on ? `${C.red}22` : C.navyMid,
                  border: `2px solid ${on ? C.red : C.navyLight}`,
                  borderRadius: 8, cursor: 'pointer', position: 'relative', transition: 'all 0.15s',
                }}
              >
                {on && (
                  <div style={{ position: 'absolute', top: 4, right: 6, background: C.red, color: C.white, width: 14, height: 14, borderRadius: '50%', fontSize: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>✓</div>
                )}
                <div style={{ fontSize: 11, marginBottom: 3 }}>{p.risk}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.white, marginBottom: 2 }}>{p.label}</div>
                <div style={{ fontSize: 10, color: C.textSec, lineHeight: 1.4 }}>{p.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Round-up toggle */}
      <div style={{ background: C.navyMid, border: `1px solid ${C.navyLight}`, borderRadius: 8, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.white, marginBottom: 2 }}>🔄 Round-up Investing</div>
          <div style={{ fontSize: 11, color: C.textSec, lineHeight: 1.4 }}>Round every purchase up to the nearest dollar and invest the difference.</div>
        </div>
        <button
          onClick={() => setRoundUpEnabled(!roundUpEnabled)}
          aria-label="Toggle round-up investing"
          style={{
            width: 44, height: 24, borderRadius: 12,
            background: roundUpEnabled ? C.red : C.navyLight,
            border: 'none', cursor: 'pointer', position: 'relative',
            transition: 'background 0.2s', flexShrink: 0,
          }}
        >
          <div style={{
            position: 'absolute', width: 18, height: 18, borderRadius: '50%',
            background: C.white, top: 3, left: roundUpEnabled ? 23 : 3,
            transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }} />
        </button>
      </div>

      <button
        onClick={onNext}
        style={{ width: '100%', padding: 14, background: C.red, color: C.white, border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.background = C.redDark; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.red; }}
      >
        Invest ${effectiveAmount} Now
      </button>
    </div>
  );
}

// ============================================================
// STEP 4 — MILESTONE SHARE CARD
// ============================================================

function Step4({ goal, selectedAmount, customAmount }) {
  const acct = ACCOUNT_MAP[goal] || ACCOUNT_MAP.exploring;
  const amount = customAmount ? (parseInt(customAmount, 10) || selectedAmount) : selectedAmount;
  const [toast, setToast]           = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleShare = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const handleCopyCode = () => {
    try { navigator.clipboard.writeText('ALEX-SCN-2847'); } catch (_) {}
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="slide-in" style={{ padding: '28px 20px 32px', display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
      {toast && (
        <div className="fade-in" style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', background: C.gold, color: C.textDark, padding: '10px 18px', borderRadius: 8, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.35)' }}>
          Link copied — ready to paste into Instagram!
        </div>
      )}

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🎉</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 20, color: C.white, lineHeight: 1.3 }}>
          You just made your<br />first investment!
        </h2>
      </div>

      {/* Share card preview */}
      <div style={{ background: C.navy, borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.navyLight}`, boxShadow: '0 4px 20px rgba(0,0,0,0.35)' }}>
        <div style={{ padding: '20px 18px' }}>
          <div style={{ fontSize: 14, color: C.textSec, marginBottom: 10, lineHeight: 1.5 }}>
            I just made my first investment with Scotiabank. 🌱
          </div>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 24, fontWeight: 700, color: C.gold, marginBottom: 2 }}>
            ${amount} in my {acct.type}
          </div>
          <div style={{ fontSize: 13, color: C.white, marginBottom: 18 }}>Starting my future today.</div>
          <div style={{ background: C.navyMid, borderRadius: 8, padding: '10px 14px' }}>
            <div style={{ fontSize: 11, color: C.textSec, marginBottom: 2 }}>Use my code:</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: C.gold, fontFamily: 'monospace', letterSpacing: '1px' }}>ALEX-SCN-2847</div>
            <div style={{ fontSize: 11, color: C.textSec, marginTop: 2 }}>Both get 3 months free</div>
          </div>
        </div>
        <div style={{ background: C.red, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 3, height: 20, background: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
          <span style={{ fontFamily: 'Georgia, serif', fontWeight: 700, color: C.white, fontSize: 13, letterSpacing: '0.3px' }}>
            Scotia Smart Investor
          </span>
        </div>
      </div>

      <button
        onClick={handleShare}
        style={{ width: '100%', padding: 13, background: C.red, color: C.white, border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'background 0.15s' }}
        onMouseEnter={e => { e.currentTarget.style.background = C.redDark; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.red; }}
      >
        📤 Share to Instagram
      </button>

      <button
        onClick={handleCopyCode}
        style={{
          width: '100%', padding: 13, background: 'transparent',
          color: codeCopied ? C.greenLight : C.white,
          border: `1px solid ${codeCopied ? '#166534' : C.navyLight}`,
          borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
        }}
      >
        {codeCopied ? '✓ Copied!' : '📋 Copy Referral Code'}
      </button>

      <div style={{ textAlign: 'center', fontSize: 12, color: C.textSec, lineHeight: 1.8 }}>
        Your friend gets 3 months free.<br />
        You earn $25 per account opened.
      </div>
    </div>
  );
}

// ============================================================
// INVESTOR ONBOARDING
// ============================================================

function InvestorOnboarding() {
  const [step,              setStep]              = useState(0);
  const [selectedGoal,      setSelectedGoal]      = useState(null);
  const [selectedAmount,    setSelectedAmount]    = useState(50);
  const [customAmount,      setCustomAmount]      = useState('');
  const [selectedPortfolio, setSelectedPortfolio] = useState('balanced');
  const [roundUpEnabled,    setRoundUpEnabled]    = useState(true);

  return (
    <div
      className="phone-outer"
      style={{ padding: '32px 16px', minHeight: 'calc(100vh - 64px)', background: `linear-gradient(160deg, ${C.navy} 0%, #071018 100%)`, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}
    >
      <div
        className="phone-frame"
        style={{ width: 390, background: C.navy, borderRadius: 32, boxShadow: '0 20px 60px rgba(0,0,0,0.5)', overflow: 'hidden', border: `1px solid ${C.navyLight}`, minHeight: 700 }}
      >
        {step > 0 && <ProgressBar step={step} />}
        <div style={{ overflowY: 'auto' }}>
          {step === 0 && <Step0 onNext={() => setStep(1)} />}
          {step === 1 && (
            <Step1
              selectedGoal={selectedGoal}
              setSelectedGoal={setSelectedGoal}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <Step2
              goal={selectedGoal}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <Step3
              selectedAmount={selectedAmount}
              setSelectedAmount={setSelectedAmount}
              customAmount={customAmount}
              setCustomAmount={setCustomAmount}
              selectedPortfolio={selectedPortfolio}
              setSelectedPortfolio={setSelectedPortfolio}
              roundUpEnabled={roundUpEnabled}
              setRoundUpEnabled={setRoundUpEnabled}
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <Step4
              goal={selectedGoal}
              selectedAmount={selectedAmount}
              customAmount={customAmount}
              selectedPortfolio={selectedPortfolio}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// APP
// ============================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('creator');

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{ minHeight: '100vh', background: C.navy }}>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="tab-fade" key={activeTab}>
          {activeTab === 'creator' ? <CreatorPortal /> : <InvestorOnboarding />}
        </div>
      </div>
    </>
  );
}
