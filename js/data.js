/**
 * VOLUNTEER HUB — Data
 * Partners, semester config, mock content, chatbot question banks.
 * Content model: one student → one partner → entire semester.
 */

export const partners = [
  { slug: 'st-kilda-mums',  name: 'St Kilda Mums',  role: 'Sorting & rehoming coordinator',  chips: ['Wheelchair accessible','Tram 96','Bike parking'] },
  { slug: 'sisterworks',    name: 'SisterWorks',     role: 'Textiles & community support',    chips: ['Lift access','Footscray station','Tea provided'] },
  { slug: 'foodfilled',     name: 'FoodFilled',      role: 'Food rescue operations',          chips: ['Closed-toe shoes','Driving helpful','Early starts'] },
  { slug: 'msa-wholefoods', name: 'MSA Wholefoods',  role: 'Kitchen prep & service',          chips: ['Wheelchair accessible','Clayton campus','Meal included'] },
  { slug: 'dixon-house',    name: 'Dixon House',     role: 'Neighbourhood drop-in support',   chips: ['Mandarin helpful','Tram 86','Afternoon sessions'] },
];

export const semester = {
  code: 'S1-2026', label: 'Semester 1, 2026',
  weekCount: 12, currentWeek: 7, startDate: '2026-03-02',
};

export const postTypes = [
  { value: 'reflection', label: 'Reflection', cls: 'reflection' },
  { value: 'insight',    label: 'Insight',    cls: 'insight' },
  { value: 'tip',        label: 'Tip',        cls: 'tip' },
  { value: 'question',   label: 'Question',   cls: 'question' },
];

export const mockPosts = [
  { id: 'p1', type: 'reflection', body: 'Week 7 was the first time I felt genuinely useful at St Kilda Mums. I ran the sorting table by myself for the last hour while my supervisor stepped out. Nerve-wracking but rewarding.', who: 'Jordan L.', partner: 'st-kilda-mums', week: 7, sparks: 6, replies: [{ body: 'That independence is a big milestone — it means they trust you.', who: 'Priya K.' }] },
  { id: 'p2', type: 'insight', body: 'At SisterWorks, the Wednesday textile sessions are led by Anwar. He\'s been there three years and takes time to teach every new volunteer properly. Don\'t rush the first session — just observe.', who: 'Mei C.', partner: 'sisterworks', week: 7, sparks: 14, replies: [] },
  { id: 'p3', type: 'tip', body: 'Dixon House keeps a Mandarin numerals reference card behind the main desk. It\'s not advertised — ask at reception on your first day. Saved me during the group activity.', who: 'Liam T.', partner: 'dixon-house', week: 7, sparks: 18, replies: [{ body: 'I wish I\'d known this three weeks ago!', who: 'Sofia R.' }] },
  { id: 'p4', type: 'question', body: 'Has anyone at FoodFilled been on a Saturday market run? I\'m nervous about the 6:30 start and the lifting. How heavy are the crates?', who: 'Amir H.', partner: 'foodfilled', week: 7, sparks: 3, replies: [{ body: 'Max about 10 kg. Wear sturdy shoes and bring water. The early start is actually the best part — it\'s calm before the crowds.', who: 'Jordan L.' }] },
  { id: 'p5', type: 'reflection', body: 'I had a conversation at MSA Wholefoods today with a student who comes for the free meal every week. It changed how I think about food insecurity on campus.', who: 'Priya K.', partner: 'msa-wholefoods', week: 6, sparks: 11, replies: [] },
  { id: 'p6', type: 'insight', body: 'The wheelchair access at St Kilda Mums is via the side roller door, not the front entrance. The front step is 14 cm. Contact the coordinator before your first visit if you need accessible entry.', who: 'Sofia R.', partner: 'st-kilda-mums', week: 6, sparks: 9, replies: [] },
  { id: 'p7', type: 'tip', body: 'At SisterWorks evening sessions, the last Route 96 tram departs around 21:30. Leave 10 minutes early to catch it — the walk to the stop takes a bit.', who: 'Mei C.', partner: 'sisterworks', week: 5, sparks: 7, replies: [] },
];

export const mockWikiEntries = [
  { id: 'w1', partner: 'sisterworks',    category: 'culture',       title: 'Wednesday Textiles Lead',  body: 'Wednesday textile sessions are coordinated by Anwar, who has been at SisterWorks for three years. Very welcoming to new volunteers — let him guide your first session.', semester: 'S1-2026', who: 'Mei C.', upvotes: 14 },
  { id: 'w2', partner: 'st-kilda-mums',  category: 'accessibility', title: 'Wheelchair Access',        body: 'Wheelchair access via the side roller door. The front entrance has a 14 cm step. Contact the coordinator before your first visit if you need accessible entry.', semester: 'S2-2025', who: 'Sofia R.', upvotes: 9 },
  { id: 'w3', partner: 'foodfilled',     category: 'logistics',     title: 'What to Bring',            body: 'Closed-toe shoes required for all sessions. Bring a water bottle. Saturday market crates are max ~10 kg. Driving is helpful but not essential for Brunswick runs.', semester: 'S1-2026', who: 'Amir H.', upvotes: 7 },
  { id: 'w4', partner: 'msa-wholefoods', category: 'tips',          title: 'Meal Provided After Shift', body: 'A meal is provided after a three-hour shift. Vegan by default. Flag allergies to staff before service begins, not after.', semester: 'S1-2026', who: 'Priya K.', upvotes: 11 },
  { id: 'w5', partner: 'dixon-house',    category: 'tips',          title: 'Mandarin Reference Card',  body: 'A Mandarin numerals reference card is kept behind the main desk. Not advertised — ask at reception. Useful for group activities and conversation circles.', semester: 'S1-2026', who: 'Liam T.', upvotes: 18 },
  { id: 'w6', partner: 'sisterworks',    category: 'logistics',     title: 'Last Tram Timing',         body: 'Route 96 last tram departs around 21:30. Leave evening sessions 10 minutes early to make it. The walk to the stop is ~5 minutes.', semester: 'S2-2025', who: 'Mei C.', upvotes: 6 },
  { id: 'w7', partner: 'st-kilda-mums',  category: 'culture',       title: 'The Sorting System',       body: 'Items sorted by condition (A/B/C) and type. The coordinator walks you through on your first shift — takes about 15 minutes. Don\'t stress about getting it wrong initially.', semester: 'S1-2025', who: 'Jordan L.', upvotes: 5 },
];

/* Chatbot question banks — same structure, used as system prompt context for Gemini */
export const questionBanks = [
  { fortnight: 1, theme: 'First Impressions', weeks: 'Wk 1–2',  prompt: 'The student has just started their volunteer placement. Ask about first impressions, what stood out, expectations vs reality, how staff welcomed them, and any practical surprises.' },
  { fortnight: 2, theme: 'Routines & Relationships', weeks: 'Wk 3–4', prompt: 'The student is settling in. Ask about emerging routines, relationships with staff and other volunteers, early challenges, how the organisation operates, and logistics.' },
  { fortnight: 3, theme: 'Skills & Surprises', weeks: 'Wk 5–6', prompt: 'Halfway point. Ask about skills developed, surprising moments, peer comparisons, memorable moments, what they would change, and connection to the community served.' },
  { fortnight: 4, theme: 'Deeper Engagement', weeks: 'Wk 7–8', prompt: 'Past halfway. Ask about new responsibilities, difficult situations, evolving understanding of the organisation\'s mission, ideal volunteer shift design, personal changes, and advice for newcomers.' },
  { fortnight: 5, theme: 'Impact & Growth', weeks: 'Wk 9–10', prompt: 'Near the end. Ask about impact of their work, connection to studies, self-knowledge, evolving relationships, a story worth sharing, and program feedback.' },
  { fortnight: 6, theme: 'Looking Back', weeks: 'Wk 11–12', prompt: 'Final reflection. Ask about pride, hardest moments, people to acknowledge, advice for next semester\'s students, legacy, future involvement, and what they\'d tell their Week 1 self.' },
];

export function partnerBySlug(slug) { return partners.find(p => p.slug === slug); }
export function currentFortnight(week = semester.currentWeek) { return Math.min(6, Math.ceil(week / 2)); }
