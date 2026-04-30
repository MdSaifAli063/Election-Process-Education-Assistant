import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Clock, Info } from 'lucide-react';
import './Timeline.css';

const stages = [
  {
    id: 1,
    icon: '📋',
    color: '#6366f1',
    phase: 'Pre-Election',
    title: 'Voter Registration',
    duration: '30–60 days before election',
    summary: 'Citizens who wish to vote must register with their local election authority before the deadline.',
    details: `Voter registration is the gateway to participating in democracy. Without it, you cannot cast a ballot on Election Day.\n\n**Who needs to register?**\nIn most countries, all eligible citizens must complete a registration process. Some states have automatic registration when you get a driver's license, but others require you to proactively sign up.\n\n**What information is required?**\n• Full legal name\n• Date of birth\n• Home address\n• Proof of citizenship\n• Government-issued ID number\n\n**Deadlines matter!**\nMost jurisdictions require registration 15–30 days before the election. Some states offer Same-Day Registration at the polls.`,
    tips: [
      'Register online for the fastest process',
      'Check your registration status before Election Day',
      'Update your registration if you move',
      'Help others register — it strengthens democracy!',
    ],
    milestone: 'Registration Deadline',
    status: 'completed',
  },
  {
    id: 2,
    icon: '📝',
    color: '#8b5cf6',
    phase: 'Pre-Election',
    title: 'Candidate Filing',
    duration: '90–120 days before election',
    summary: 'Prospective candidates officially declare their candidacy by filing paperwork and meeting legal requirements.',
    details: `Before any campaign can begin, candidates must formally enter the race by filing official documents with the election commission.\n\n**What candidates must file:**\n• Declaration of candidacy\n• Financial disclosure forms\n• Petition signatures (a minimum number of voter signatures showing community support)\n• Filing fee (in some jurisdictions)\n\n**Eligibility requirements:**\n• Meet age requirements (varies by office)\n• Be a citizen and resident\n• Not have certain criminal disqualifications\n\n**Primary elections:**\nIn party-based systems, candidates first compete in a party primary to become their party's nominee for the general election.`,
    tips: [
      'Candidates must meet specific age and residency requirements',
      'Filing fees are often non-refundable',
      'Petition signatures are verified by election officials',
      'Deadline violations can disqualify a candidacy',
    ],
    milestone: 'Filing Deadline',
    status: 'completed',
  },
  {
    id: 3,
    icon: '📣',
    color: '#06b6d4',
    phase: 'Campaign',
    title: 'Campaign Period',
    duration: '30–90 days of active campaigning',
    summary: 'Declared candidates actively seek voter support through rallies, ads, debates, and community engagement.',
    details: `The campaign period is when democracy comes alive. Candidates present their platforms, debate opponents, and connect with voters.\n\n**Key campaign activities:**\n• **Public rallies and events** — Town halls, speeches, meet-and-greets\n• **Media advertising** — TV, radio, digital, and social media ads\n• **Debates** — Structured discussions between candidates moderated by journalists\n• **Door-to-door canvassing** — Volunteers visit homes to discuss the candidate's platform\n• **Fundraising** — Collecting donations to fund campaign activities\n\n**Campaign finance regulations:**\nMost countries have strict rules about campaign donations — who can give, how much, and from where. Corporations and foreign nationals are typically prohibited from donating.\n\n**Blackout periods:**\nMany countries prohibit campaign advertising in the final 24–48 hours before Election Day.`,
    tips: [
      'Attend debates and town halls to hear candidates directly',
      'Fact-check campaign claims from reliable sources',
      'Campaign spending limits exist to ensure fair competition',
      'Volunteer for a campaign to get involved in the process',
    ],
    milestone: 'Debate Season',
    status: 'active',
  },
  {
    id: 4,
    icon: '🗳️',
    color: '#10b981',
    phase: 'Voting',
    title: 'Election Day (Voting)',
    duration: 'Single day (6am–8pm typically)',
    summary: 'The culmination of the process — registered voters cast their ballots at designated polling stations.',
    details: `Election Day is the heart of democracy. After weeks of campaigning, eligible voters make their choice and cast their ballot.\n\n**Voting process step-by-step:**\n1. **Find your polling place** using your registered address\n2. **Bring required ID** — requirements vary by location\n3. **Check in** with election workers who verify your registration\n4. **Receive your ballot** — paper or electronic\n5. **Mark your choices** in a private voting booth\n6. **Submit your ballot** into the counting machine or box\n7. **Receive your sticker** — the proud "I Voted" badge!\n\n**Alternative voting options:**\n• **Early Voting**: Cast your ballot 1–2 weeks before Election Day\n• **Absentee/Mail-in Ballot**: Vote from home via postal service\n• **Provisional Ballot**: For voters with registration issues on Election Day\n\n**Voter assistance:**\nIf you need help due to a disability, you have the legal right to assistance at the polling place.`,
    tips: [
      'Polling places close at a specific time — arrive early!',
      'If you\'re in line when polls close, you still have the right to vote',
      'Take your time — there\'s no rush in the voting booth',
      'Exit polls are surveys, not official results',
    ],
    milestone: 'Election Day',
    status: 'upcoming',
  },
  {
    id: 5,
    icon: '📊',
    color: '#f59e0b',
    phase: 'Post-Election',
    title: 'Vote Counting',
    duration: 'Hours to days after polls close',
    summary: 'Election officials systematically count all ballots, including in-person, early, and mail-in votes.',
    details: `After polls close, the meticulous process of counting every vote begins. This is one of the most carefully observed stages of the election.\n\n**Types of ballots counted:**\n• Election Day ballots (in-person)\n• Early voting ballots\n• Absentee/mail-in ballots (often take longest)\n• Provisional ballots (counted last, after eligibility verification)\n\n**How counting works:**\n• Ballots are scanned and tabulated by machines\n• Results are reported precinct-by-precinct\n• Party representatives (poll watchers) observe the process\n• Any damaged ballots are reviewed by bipartisan panels\n\n**Why does it take time?**\nMail-in ballots must be verified (signature matching), and in close races every vote must be painstakingly confirmed. Large elections with millions of voters naturally take longer.\n\n**Media projections vs. official results:**\nNews networks often "call" races based on statistical models before official counting is complete. These projections are educated estimates, not official results.`,
    tips: [
      'Results can take hours or even days to be final',
      'News projections are NOT official results',
      'Counting is transparent — observers from all parties are present',
      'Ballots are secure in locked rooms with camera surveillance',
    ],
    milestone: 'Results Reported',
    status: 'upcoming',
  },
  {
    id: 6,
    icon: '✅',
    color: '#ef4444',
    phase: 'Post-Election',
    title: 'Certification',
    duration: 'Days to weeks after Election Day',
    summary: 'Election officials formally certify the results after verification, resolving any recounts or legal challenges.',
    details: `Certification is the official process of declaring the results final and legally binding. It involves multiple layers of verification.\n\n**Steps in certification:**\n1. **Canvassing** — Election officials review all ballots and reconcile the count\n2. **Recount requests** — If a margin is very close, candidates can request a manual recount\n3. **Legal challenges** — Candidates can file court challenges to dispute results\n4. **Certification meeting** — Local officials officially certify their jurisdiction's results\n5. **State/national certification** — Higher authorities aggregate and certify all local results\n\n**Who certifies?**\nIn the US: County Boards → State Canvassing Boards → Secretary of State → Congress (for federal elections)\n\n**Post-certification:**\nOnce certified, results are legally final. Any further challenges must go through the courts, which set a very high bar for overturning certified results.`,
    tips: [
      'Certification deadlines vary by jurisdiction',
      'Recounts rarely change the outcome in non-razor-thin races',
      'Legal challenges must present specific evidence of irregularities',
      'The certification process is designed to be transparent and bipartisan',
    ],
    milestone: 'Results Certified',
    status: 'upcoming',
  },
  {
    id: 7,
    icon: '🏛️',
    color: '#ec4899',
    phase: 'Transition',
    title: 'Inauguration & Transition',
    duration: 'Weeks to months after certification',
    summary: 'The winner officially assumes office, marking the peaceful transfer of power — the hallmark of democracy.',
    details: `The inauguration is the ceremonial and legal act of the elected official taking office. It marks the culmination of the entire election process.\n\n**The transition period:**\nBetween certification and inauguration, the incoming and outgoing officials often cooperate on a smooth handover. In the US, this "lame duck" period lasts about 10 weeks (November → January 20).\n\n**The inauguration ceremony typically includes:**\n• Taking the **Oath of Office** — a legally binding promise to uphold the constitution\n• Delivery of an **inaugural address** — the new leader's vision for their term\n• **Ceremonial festivities** — parades, balls, and public celebrations\n\n**Why it matters:**\nThe peaceful transfer of power is considered one of the defining features of a healthy democracy. It demonstrates that leadership transitions happen through votes, not through force.\n\n**International observers:**\nMajor elections often attract international observers who certify the process was free and fair, lending global credibility to the outcome.`,
    tips: [
      'The oath of office is a binding legal commitment',
      'Inaugural addresses often set the tone for the entire term',
      'The peaceful transfer of power is not guaranteed in all countries',
      'Citizens play a role beyond Election Day — civic engagement continues!',
    ],
    milestone: 'Inauguration Day',
    status: 'upcoming',
  },
];

const phaseColors = { 'Pre-Election': '#6366f1', Campaign: '#06b6d4', Voting: '#10b981', 'Post-Election': '#f59e0b', Transition: '#ec4899' };

export default function Timeline() {
  const [expanded, setExpanded] = useState(null);
  const [activePhase, setActivePhase] = useState('All');

  const phases = ['All', 'Pre-Election', 'Campaign', 'Voting', 'Post-Election', 'Transition'];
  const filtered = activePhase === 'All' ? stages : stages.filter(s => s.phase === activePhase);

  return (
    <div className="timeline-page page-enter">
      {/* Page Header */}
      <div className="page-hero" style={{ '--hero-color': '#6366f1' }}>
        <div className="container page-hero__inner">
          <span className="badge badge-primary">
            <Clock size={12} /> Interactive Timeline
          </span>
          <h1 className="text-display page-hero__title">
            The Complete Election <span className="gradient-text">Timeline</span>
          </h1>
          <p className="page-hero__subtitle">
            Explore every stage of the election process — from voter registration to inauguration — with detailed explanations and expert tips.
          </p>
        </div>
      </div>

      {/* Phase Filter */}
      <div className="timeline-filter sticky-filter">
        <div className="container timeline-filter__inner">
          {phases.map(p => (
            <button
              key={p}
              className={`timeline-filter__btn ${activePhase === p ? 'timeline-filter__btn--active' : ''}`}
              onClick={() => setActivePhase(p)}
              style={activePhase === p && p !== 'All' ? { borderColor: phaseColors[p], color: phaseColors[p], background: `${phaseColors[p]}15` } : {}}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="container timeline-container">
        <div className="timeline">
          {filtered.map((stage, idx) => (
            <div key={stage.id} className={`timeline-item ${expanded === stage.id ? 'timeline-item--expanded' : ''}`}>
              {/* Connector Line */}
              {idx < filtered.length - 1 && (
                <div className="timeline-line" style={{ background: `linear-gradient(${stage.color}, ${filtered[idx+1].color})` }}></div>
              )}

              {/* Node */}
              <div className="timeline-node" style={{ background: stage.color, boxShadow: `0 0 20px ${stage.color}60` }}>
                <span>{stage.icon}</span>
              </div>

              {/* Card */}
              <div className="timeline-card card" style={{ '--card-color': stage.color }}>
                <div className="timeline-card__meta">
                  <span className="badge" style={{ background: `${stage.color}18`, color: stage.color }}>
                    {stage.phase}
                  </span>
                  <span className="timeline-card__duration">
                    <Clock size={12} /> {stage.duration}
                  </span>
                  <span className={`timeline-card__status timeline-card__status--${stage.status}`}>
                    {stage.status === 'completed' ? '✓ Completed' : stage.status === 'active' ? '● Active' : '○ Upcoming'}
                  </span>
                </div>

                <div className="timeline-card__header">
                  <h2 className="timeline-card__title">
                    <span className="timeline-card__num">{String(stage.id).padStart(2, '0')}</span>
                    {stage.title}
                  </h2>
                  <button
                    className="timeline-card__toggle"
                    onClick={() => setExpanded(expanded === stage.id ? null : stage.id)}
                    aria-expanded={expanded === stage.id}
                    aria-label={expanded === stage.id ? 'Collapse' : 'Expand'}
                    style={{ background: `${stage.color}15`, color: stage.color }}
                  >
                    {expanded === stage.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>

                <p className="timeline-card__summary">{stage.summary}</p>

                {/* Milestone badge */}
                <div className="timeline-card__milestone">
                  <span style={{ color: stage.color }}>★</span> Key Milestone: <strong>{stage.milestone}</strong>
                </div>

                {/* Expanded Details */}
                {expanded === stage.id && (
                  <div className="timeline-card__details animate-fade-up">
                    <div className="divider"></div>
                    <div className="timeline-details">
                      <div className="timeline-details__text">
                        {stage.details.split('\n\n').map((para, i) => (
                          <p key={i} className="timeline-details__para" dangerouslySetInnerHTML={{
                            __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>')
                          }} />
                        ))}
                      </div>
                      <div className="timeline-details__tips">
                        <h3 className="timeline-details__tips-title">
                          <Info size={15} style={{ color: stage.color }} /> Pro Tips
                        </h3>
                        <ul className="timeline-details__tips-list">
                          {stage.tips.map(tip => (
                            <li key={tip} className="timeline-details__tip">
                              <span style={{ color: stage.color }}>→</span> {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress bar */}
                <div className="progress-bar" style={{ marginTop: 'var(--space-4)' }}>
                  <div className="progress-bar-fill" style={{
                    width: `${(stage.id / stages.length) * 100}%`,
                    background: `linear-gradient(90deg, ${stage.color}80, ${stage.color})`
                  }}></div>
                </div>
                <span className="text-caption" style={{ marginTop: 4, display: 'block' }}>
                  Stage {stage.id} of {stages.length}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
