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
  /* ── St Kilda Mums ── */
  { id: 'w01', partner: 'st-kilda-mums', category: 'culture',       title: 'The Sorting System',             body: 'Items sorted by condition (A/B/C) and type. The coordinator walks you through on your first shift — takes about 15 minutes. Don\'t stress about getting it wrong initially.', semester: 'S1-2025', who: 'Jordan L.', upvotes: 22 },
  { id: 'w02', partner: 'st-kilda-mums', category: 'accessibility', title: 'Wheelchair Access',              body: 'Wheelchair access via the side roller door, not the front entrance. The front step is 14 cm. Contact the coordinator before your first visit if you need accessible entry.', semester: 'S2-2025', who: 'Sofia R.', upvotes: 17 },
  { id: 'w03', partner: 'st-kilda-mums', category: 'logistics',     title: 'Parking & Transport',            body: 'Street parking is free but limited — arrive 10 minutes early. Tram 67 stops two blocks away (Glenhuntly Rd). Bike racks at the side entrance.', semester: 'S1-2026', who: 'Jordan L.', upvotes: 9 },
  { id: 'w04', partner: 'st-kilda-mums', category: 'tips',          title: 'Emotional Items',                body: 'You will occasionally sort items that belonged to families going through loss. Staff are trained to handle this but it can catch you off guard. It\'s okay to step out for a few minutes.', semester: 'S2-2025', who: 'Tara M.', upvotes: 31 },
  { id: 'w05', partner: 'st-kilda-mums', category: 'culture',       title: 'Morning Briefing',               body: 'Every shift starts with a 5-minute stand-up in the sorting room. The coordinator shares priorities for the day and any urgent rehoming requests. Be there on time — they start sharp.', semester: 'S1-2026', who: 'Sofia R.', upvotes: 12 },
  { id: 'w06', partner: 'st-kilda-mums', category: 'logistics',     title: 'What to Wear',                   body: 'Comfortable clothes you don\'t mind getting dusty. Closed-toe shoes. The warehouse is cold in winter — layers recommended. Gloves provided but bringing your own is better.', semester: 'S1-2025', who: 'Nadia P.', upvotes: 8 },
  { id: 'w07', partner: 'st-kilda-mums', category: 'tips',          title: 'Quiet Days',                     body: 'Mondays after school holidays tend to be slow. Use quiet time to reorganise shelving or audit the condition labels — the coordinator appreciates initiative.', semester: 'S1-2026', who: 'Jordan L.', upvotes: 6 },

  /* ── SisterWorks ── */
  { id: 'w08', partner: 'sisterworks', category: 'culture',       title: 'Wednesday Textiles Lead',          body: 'Wednesday textile sessions are coordinated by Anwar, who has been at SisterWorks for three years. Very welcoming to new volunteers — let him guide your first session rather than jumping in.', semester: 'S1-2026', who: 'Mei C.', upvotes: 24 },
  { id: 'w09', partner: 'sisterworks', category: 'logistics',     title: 'Last Tram Timing',                body: 'Route 96 last tram departs around 21:30. Leave evening sessions 10 minutes early to make it. The walk to the stop is about 5 minutes.', semester: 'S2-2025', who: 'Mei C.', upvotes: 15 },
  { id: 'w10', partner: 'sisterworks', category: 'culture',       title: 'Tea Is Part of the Work',          body: 'Tea breaks are not downtime — they\'re where the women share stories and build trust. Sit down, accept the tea, ask questions. This is where the real community support happens.', semester: 'S1-2025', who: 'Rachael D.', upvotes: 38 },
  { id: 'w11', partner: 'sisterworks', category: 'tips',          title: 'Language Barriers',                body: 'Many participants speak limited English. Speak slowly, use gestures, and don\'t finish their sentences. Google Translate on your phone is acceptable and they appreciate the effort.', semester: 'S2-2025', who: 'Yuki S.', upvotes: 19 },
  { id: 'w12', partner: 'sisterworks', category: 'accessibility', title: 'Prayer Room',                      body: 'A small prayer room is available on the first floor, left of the kitchen. It\'s not signposted. Ask the front desk if you need it — they\'re very accommodating.', semester: 'S1-2026', who: 'Amir H.', upvotes: 11 },
  { id: 'w13', partner: 'sisterworks', category: 'logistics',     title: 'Session Types',                    body: 'Monday = sewing/textiles, Wednesday = community kitchen, Friday = mixed crafts. Wednesday is the most social. Monday is quieter and good for focused work.', semester: 'S1-2026', who: 'Mei C.', upvotes: 13 },
  { id: 'w14', partner: 'sisterworks', category: 'tips',          title: 'Don\'t Correct — Collaborate',     body: 'If a participant\'s sewing or craft work looks different from the pattern, don\'t correct them. Ask about their approach. Many women bring techniques from home countries that are better than the template.', semester: 'S1-2025', who: 'Rachael D.', upvotes: 27 },

  /* ── FoodFilled ── */
  { id: 'w15', partner: 'foodfilled', category: 'logistics',     title: 'What to Bring',                    body: 'Closed-toe shoes required for all sessions. Bring a water bottle. Saturday market crates are max ~10 kg. Driving is helpful but not essential — carpooling is common.', semester: 'S1-2026', who: 'Amir H.', upvotes: 10 },
  { id: 'w16', partner: 'foodfilled', category: 'culture',       title: 'The Vendor Relationships',          body: 'FoodFilled has longstanding relationships with market vendors. Introduce yourself, be polite, and never take more than offered. The vendors remember faces and goodwill matters.', semester: 'S2-2025', who: 'Tom K.', upvotes: 20 },
  { id: 'w17', partner: 'foodfilled', category: 'tips',          title: 'Produce Handling',                  body: 'Sort rescued produce immediately by condition: firm and ripe goes to partner programs, soft goes to community kitchen, anything spoiled is composted. Don\'t mix categories in the same crate.', semester: 'S1-2026', who: 'Jordan L.', upvotes: 14 },
  { id: 'w18', partner: 'foodfilled', category: 'logistics',     title: 'Saturday Market Schedule',          body: 'Saturday runs start at 06:30 at Footscray markets. Arrive 10 minutes early — the team briefs in the car park. The run finishes by 09:30. There\'s a café stop after for those who want it.', semester: 'S2-2025', who: 'Tom K.', upvotes: 8 },
  { id: 'w19', partner: 'foodfilled', category: 'accessibility', title: 'Physical Demands',                  body: 'Rescue runs involve lifting, bending, and walking on uneven surfaces. If you have a back issue or mobility limitation, let the coordinator know — there are sorting-only roles at the warehouse.', semester: 'S1-2025', who: 'Nadia P.', upvotes: 12 },
  { id: 'w20', partner: 'foodfilled', category: 'culture',       title: 'Why Early Starts Matter',           body: 'The 06:30 start isn\'t arbitrary — vendors are packing up and need rescued produce collected before the cleaning crew arrives. Being late means food goes to waste. It\'s the one rule they take seriously.', semester: 'S1-2026', who: 'Amir H.', upvotes: 16 },

  /* ── MSA Wholefoods ── */
  { id: 'w21', partner: 'msa-wholefoods', category: 'tips',          title: 'Meal Provided After Shift',    body: 'A meal is provided after a three-hour shift. Vegan by default. Flag allergies to staff before service begins, not after — they prep in advance.', semester: 'S1-2026', who: 'Priya K.', upvotes: 18 },
  { id: 'w22', partner: 'msa-wholefoods', category: 'culture',       title: 'The Lunch Rush',               body: 'Between 12:00 and 13:00 it gets very busy. This is when most students come through. Stay calm, keep the line moving, and remember names if you can — regulars appreciate it.', semester: 'S2-2025', who: 'Lin W.', upvotes: 14 },
  { id: 'w23', partner: 'msa-wholefoods', category: 'logistics',     title: 'Prep Order',                   body: 'Arrive 30 minutes before service. Prep order: wash produce → chop → assemble cold items → start hot items. The whiteboard in the kitchen has the day\'s menu and quantities.', semester: 'S1-2026', who: 'Priya K.', upvotes: 9 },
  { id: 'w24', partner: 'msa-wholefoods', category: 'tips',          title: 'Allergen Awareness',            body: 'Common allergens are labelled on the serving line but students don\'t always read them. If someone asks "what\'s in this?" — take it seriously and check the prep sheet, don\'t guess.', semester: 'S2-2025', who: 'Lin W.', upvotes: 21 },
  { id: 'w25', partner: 'msa-wholefoods', category: 'accessibility', title: 'Noise Level During Rush',       body: 'The kitchen gets loud between 12:00–13:00. If you\'re sensitive to noise, the cold prep area (back room) is quieter and always needs help.', semester: 'S1-2026', who: 'Sofia R.', upvotes: 7 },
  { id: 'w26', partner: 'msa-wholefoods', category: 'culture',       title: 'Student Conversations',         body: 'Some students who come for the free meal are embarrassed about it. Don\'t make a distinction between paying and non-paying — treat everyone the same. The whole point is dignity.', semester: 'S1-2025', who: 'Tara M.', upvotes: 35 },

  /* ── Dixon House ── */
  { id: 'w27', partner: 'dixon-house', category: 'tips',          title: 'Mandarin Reference Card',          body: 'A Mandarin numerals reference card is kept behind the main desk. Not advertised — ask at reception. Useful for group activities and conversation circles.', semester: 'S1-2026', who: 'Liam T.', upvotes: 23 },
  { id: 'w28', partner: 'dixon-house', category: 'culture',       title: 'The Regulars',                     body: 'The afternoon drop-in has a core group of about 8 regulars, mostly elderly. They come for company as much as activities. Learn their names in the first week — it transforms the dynamic.', semester: 'S2-2025', who: 'Yuki S.', upvotes: 29 },
  { id: 'w29', partner: 'dixon-house', category: 'tips',          title: 'Group Activity Ideas',             body: 'Simple is better. Card games, photo sharing, and tea-and-talk work well. Avoid anything that requires reading English quickly — several regulars have limited literacy. Pictorial activities are best.', semester: 'S1-2025', who: 'Rachael D.', upvotes: 16 },
  { id: 'w30', partner: 'dixon-house', category: 'logistics',     title: 'Getting There',                    body: 'Tram 86 to the Doveton stop, then a 7-minute walk. The building is behind the community health centre — not obvious from the street. Look for the blue door around the back.', semester: 'S1-2026', who: 'Liam T.', upvotes: 11 },
  { id: 'w31', partner: 'dixon-house', category: 'accessibility', title: 'Hearing Loop Available',            body: 'The main activity room has a hearing loop. It\'s labelled but the switch is behind the front desk. Ask staff to turn it on if a participant uses a hearing aid.', semester: 'S2-2025', who: 'Yuki S.', upvotes: 8 },
  { id: 'w32', partner: 'dixon-house', category: 'culture',       title: 'Building Trust Takes Weeks',        body: 'The regulars are cautious with new volunteers — especially the older women. Don\'t force conversation in week one. Sit nearby, help with tea, be consistent. By week three they\'ll open up.', semester: 'S1-2025', who: 'Rachael D.', upvotes: 33 },
  { id: 'w33', partner: 'dixon-house', category: 'tips',          title: 'Bilingual Volunteers Are Gold',    body: 'If you speak Mandarin, Cantonese, or Vietnamese, mention it on your first day. You\'ll be paired with participants who rarely get to speak their home language. It means everything to them.', semester: 'S1-2026', who: 'Liam T.', upvotes: 26 },
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
