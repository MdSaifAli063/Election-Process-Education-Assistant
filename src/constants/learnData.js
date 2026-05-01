/**
 * Educational content for the Learn & Quiz module.
 */

export const modules = [
  {
    id: 'basics',
    icon: '📖',
    color: '#6366f1',
    title: 'Election Basics',
    desc: 'Foundational concepts every voter should know.',
    cards: [
      { front: 'What is a Democracy?', back: 'Democracy is a system of government where citizens directly or indirectly participate in decision-making through free and fair elections.' },
      { front: 'What is a Ballot?', back: 'A ballot is the official form used to record a voter\'s choices. It can be a paper form, a digital touchscreen, or a mail-in envelope.' },
      { front: 'What is a Polling Place?', back: 'A polling place is the location where voters go to cast their in-person ballots on Election Day.' },
      { front: 'What is a Precinct?', back: 'A precinct is the smallest geographic unit in an election system. Each precinct has its own polling place.' },
    ],
  },
  {
    id: 'registration',
    icon: '📋',
    color: '#8b5cf6',
    title: 'Voter Registration',
    desc: 'Everything about signing up to vote.',
    cards: [
      { front: 'What is Voter Registration?', back: 'Voter registration is the process of adding your name to the official list of eligible voters in your jurisdiction.' },
      { front: 'Why do we need to register?', back: 'Registration creates an official voter roll that helps election officials manage polling places and prevent duplicate voting.' },
      { front: 'What is Automatic Voter Registration?', back: 'Automatic Voter Registration (AVR) automatically registers eligible citizens when they interact with government agencies like the DMV.' },
      { front: 'What is Same-Day Registration?', back: 'Same-Day Registration (SDR) allows voters to register on Election Day itself at the polling place.' },
    ],
  },
  {
    id: 'process',
    icon: '⚙️',
    color: '#06b6d4',
    title: 'How Voting Works',
    desc: 'The mechanics of casting and counting votes.',
    cards: [
      { front: 'What is a Secret Ballot?', back: 'A secret ballot means your specific voting choices are private, protecting voters from intimidation.' },
      { front: 'What is Ranked Choice Voting?', back: 'Ranked Choice Voting (RCV) lets voters rank candidates in order of preference (1st, 2nd, 3rd choice).' },
      { front: 'What is a Provisional Ballot?', back: 'A provisional ballot is issued when there\'s a question about a voter\'s eligibility on Election Day.' },
      { front: 'What is a Recount?', back: 'A recount is a repeat tabulation of votes cast, usually triggered when the margin of victory is extremely small.' },
    ],
  },
  {
    id: 'types',
    icon: '🗂️',
    color: '#10b981',
    title: 'Types of Elections',
    desc: 'Understanding different election categories.',
    cards: [
      { front: 'Primary vs. General Election', back: 'A PRIMARY election selects a party\'s nominee. The GENERAL election is the main contest between nominees.' },
      { front: 'What is a Referendum?', back: 'A referendum asks voters to directly vote on a specific policy or law rather than choosing between candidates.' },
      { front: 'What is a Special Election?', back: 'A special election is held outside the normal schedule to fill a vacant seat (e.g., when a representative resigns).' },
      { front: 'What is a Runoff Election?', back: 'A runoff is held when no candidate receives the required majority (usually 50%+1) in the initial election.' },
    ],
  },
];

export const quizQuestions = [
  { q: 'At what minimum age can most citizens vote in national elections?', options: ['16', '18', '21', '25'], correct: 1, explanation: '18 is the minimum voting age in most countries, including the US (since the 26th Amendment in 1971).' },
  { q: 'What does "absentee voting" mean?', options: ['Voting for a candidate who is absent', 'Voting by mail when you cannot go to the polls in person', 'Refusing to vote in protest', 'Voting on behalf of someone else'], correct: 1, explanation: 'Absentee voting allows registered voters to cast a ballot by mail instead of appearing in person at a polling place.' },
  { q: 'What is the Electoral College in the United States?', options: ['A university that teaches politics', 'A group of electors who formally elect the President and Vice President', 'The building where Congress meets', 'A group of election officials who count votes'], correct: 1, explanation: 'The Electoral College consists of 538 electors. A candidate needs 270 electoral votes to win the presidency.' },
  { q: 'What is a "ballot initiative"?', options: ['When the government initiates a vote', 'A process that allows citizens to propose and vote on laws directly', 'The first ballot cast in an election', 'An initiative to increase voter turnout'], correct: 1, explanation: 'A ballot initiative lets citizens (not just legislators) propose new laws or constitutional amendments.' },
  { q: 'Which of the following protects the secrecy of your vote?', options: ['The First Amendment', 'Party affiliation registration', 'The secret ballot system', 'Election Day ID laws'], correct: 2, explanation: 'The secret ballot ensures that how you voted is private, protecting voters from coercion or punishment.' },
  { q: 'What happens if no candidate wins a majority in some elections?', options: ['The incumbent stays in power', 'A runoff election is held between the top candidates', 'The election is declared invalid', 'The legislature decides the winner'], correct: 1, explanation: 'If no candidate achieves a majority, a runoff election is typically held between the top two candidates.' },
  { q: 'Who officially certifies the results of a US presidential election?', options: ['The Supreme Court', 'The President of the United States', 'Congress, in a joint session', 'The Electoral College Board'], correct: 2, explanation: 'Congress meets in a joint session to officially count and certify the Electoral College votes.' },
  { q: 'What is "voter suppression"?', options: ['Keeping your vote private', 'Legal efforts to encourage more people to vote', 'Strategies or laws that make it harder for certain groups to vote', 'Suppressing election results until all votes are counted'], correct: 2, explanation: 'Voter suppression refers to strategies used to discourage or prevent specific groups of people from voting.' },
  { q: 'What does "nonpartisan" mean in the context of elections?', options: ['Against all political parties', 'Not favoring or affiliated with any political party', 'Supporting multiple parties at once', 'Voting for candidates from different parties'], correct: 1, explanation: 'Nonpartisan means impartial and not affiliated with or supporting any particular political party.' },
  { q: 'What is "gerrymandering"?', options: ['A type of election fraud', 'Drawing electoral district boundaries to favor one party or group', 'When voter turnout is extremely low', 'The process of certifying election results'], correct: 1, explanation: 'Gerrymandering is the manipulation of electoral district boundaries to give one political party an advantage.' },
];

export const badges = [
  { id: 'learner',   icon: '📚', title: 'Eager Learner',    desc: 'Completed your first module',      threshold: 1,  color: '#6366f1' },
  { id: 'scholar',   icon: '🎓', title: 'Election Scholar',  desc: 'Completed 3 modules',              threshold: 3,  color: '#8b5cf6' },
  { id: 'expert',    icon: '🏆', title: 'Democracy Expert',  desc: 'Completed all modules',            threshold: 4,  color: '#f59e0b' },
  { id: 'quiz50',    icon: '⭐', title: 'Quiz Starter',      desc: 'Scored 50%+ on the quiz',         threshold: 5,  color: '#06b6d4', quizBased: true },
  { id: 'quiz80',    icon: '🌟', title: 'Quiz Champion',     desc: 'Scored 80%+ on the quiz',         threshold: 8,  color: '#10b981', quizBased: true },
  { id: 'perfect',   icon: '💎', title: 'Perfect Score!',    desc: 'Got 10/10 on the quiz',           threshold: 10, color: '#ec4899', quizBased: true },
];
