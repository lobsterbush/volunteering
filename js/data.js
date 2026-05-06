/**
 * VOLUNTEER//HUB — Static Data
 * Partners, semester config, mock content, and chatbot question banks.
 */

/* ── Partners ── */
export const partners = [
  { slug: 'st-kilda-mums',  name: 'ST KILDA MUMS',  role: 'SORTING / REHOMING — 4 HR SHIFT',   chips: ['WHEELCHAIR ✓','TRAM 96','BIKE PARK'],     pulse: '3 ON THE FLOOR NOW · 14 HRS NEEDED', coords: [145.0050, -37.8675] },
  { slug: 'sisterworks',    name: 'SISTERWORKS',     role: 'TEXTILES BENCH — 3 HR SHIFT',        chips: ['LIFT ✓','TRAIN F\'SCRAY','TEA'],          pulse: '2 ON THE FLOOR NOW · 8 HRS NEEDED',  coords: [144.8970, -37.8000] },
  { slug: 'foodfilled',     name: 'FOODFILLED',      role: 'RESCUE RUN — 3 HR SHIFT',            chips: ['DRIVE','LIFT REQ','EARLY START'],         pulse: '5 ON THE FLOOR NOW · 12 HRS NEEDED', coords: [144.9605, -37.7700] },
  { slug: 'msa-wholefoods', name: 'MSA WHOLEFOODS',  role: 'KITCHEN PREP — 3 HR SHIFT',          chips: ['WHEELCHAIR ✓','BUS','MEAL INCL'],         pulse: '4 ON THE FLOOR NOW · 6 HRS NEEDED',  coords: [145.1362, -37.9105] },
  { slug: 'dixon-house',    name: 'DIXON HOUSE',     role: 'NEIGHBOURHOOD DROP-IN — 3 HR SHIFT', chips: ['MANDARIN','TRAM 86','TEA'],               pulse: '1 ON THE FLOOR NOW · 9 HRS NEEDED',  coords: [145.2400, -37.9856] },
];

/* ── Semester ── */
export const semester = {
  code: 'S1-2026',
  label: 'Semester 1, 2026',
  weekCount: 12,
  currentWeek: 7,
  startDate: '2026-03-02',
};

/* ── Mock Postcards ── */
export const mockPostcards = [
  { partner: 'st-kilda-mums',  week: 7, accent: 'r', body: 'Sorted 31 cot kits and updated the inventory. Items are now ready for distribution to families on the waiting list.', who: '@vol_037' },
  { partner: 'sisterworks',    week: 7, accent: '',  body: 'Trained on the textile bench by Anwar and completed sorting for the Wednesday community order.', who: '@vol_004' },
  { partner: 'foodfilled',     week: 7, accent: '',  body: 'Brunswick food-rescue run. Recovered 41 kg of produce, redirected to the partner lunchbox programme.', who: '@vol_112' },
  { partner: 'dixon-house',    week: 7, accent: 'r', body: 'Group activity session at the neighbourhood drop-in. Multilingual conversation circle and afternoon tea.', who: '@vol_222' },
  { partner: 'msa-wholefoods', week: 6, accent: '',  body: 'Kitchen prep and service shift, including clean-down. A short, well-organised rotation.', who: '@vol_059' },
  { partner: 'st-kilda-mums',  week: 6, accent: 'r', body: 'Pram and stroller quality check and sorting. Twelve units processed and prepared for re-homing.', who: '@vol_148' },
];

/* ── Mock Bulletin Posts ── */
export const mockBulletinPosts = [
  { id: 'b1', type: 'lost-found', tag: 'LOST & FOUND', tagClass: 'red', body: 'Black water bottle left at SisterWorks on Wednesday. Held at the front desk.', who: '@vol_201', week: 7, partner: 'sisterworks', sparks: 2, replies: [] },
  { id: 'b2', type: 'carpool',    tag: 'CARPOOL',       tagClass: '',    body: 'Driving Clayton to Footscray markets, Saturday 06:00, for the produce sort. Three seats; drop on the return if convenient.', who: '@vol_088', week: 7, partner: 'foodfilled', sparks: 5, replies: [{ body: 'I\'m in! Can you pick up at Huntingdale station?', who: '@vol_037' }] },
  { id: 'b3', type: 'swap',       tag: 'SHIFT SWAP',    tagClass: '',    body: 'Looking to swap a Tuesday 14:00 FoodFilled shift for a Wednesday SisterWorks textiles slot.', who: '@vol_037', week: 7, partner: 'foodfilled', sparks: 0, replies: [] },
  { id: 'b4', type: 'insight',    tag: 'INSIGHT',       tagClass: 'gold', body: 'Dixon House keeps a Mandarin numerals reference card behind the main desk — very useful for new volunteers.', who: '@vol_222', week: 7, partner: 'dixon-house', sparks: 8, replies: [{ body: 'This saved me on my first day. Highly recommend asking for it.', who: '@vol_059' }] },
  { id: 'b5', type: 'tip',        tag: 'TIP',           tagClass: 'gold', body: 'SisterWorks Wednesday textile sessions are run by Anwar. Last tram (Route 96) departs around 21:30. Plan your exit.', who: '@vol_004', week: 6, partner: 'sisterworks', sparks: 12, replies: [] },
  { id: 'b6', type: 'question',   tag: 'ASK',           tagClass: '',    body: 'Anyone done a Mandarin-language shift at Dixon House? Looking for a few tips before mine on Friday.', who: '@vol_222', week: 7, partner: 'dixon-house', sparks: 3, replies: [{ body: 'Yes — it\'s a relaxed conversational group. Bring tea and a few photos to talk about.', who: '@vol_148' }] },
];

/* ── Mock Wiki Entries ── */
export const mockWikiEntries = [
  { id: 'w1', partner: 'sisterworks',    category: 'culture',        title: 'Wednesday Textiles Lead',          body: 'Wednesday textile sessions are coordinated by Anwar. He\'s been at SisterWorks for 3 years and is very welcoming to new volunteers.', semester: 'S1-2026', who: '@vol_004', upvotes: 14 },
  { id: 'w2', partner: 'st-kilda-mums',  category: 'accessibility',  title: 'Wheelchair Access',                body: 'Wheelchair access via the side roller door. Front step at the main entrance is 14 cm. Contact the coordinator before your first visit.', semester: 'S2-2025', who: '@vol_148', upvotes: 9 },
  { id: 'w3', partner: 'foodfilled',     category: 'logistics',      title: 'What to Bring',                    body: 'Closed-toe shoes required. Bring a water bottle for the Brunswick rescue run. Some lifting (up to ~10 kg crates).', semester: 'S1-2026', who: '@vol_112', upvotes: 7 },
  { id: 'w4', partner: 'msa-wholefoods', category: 'tips',           title: 'Meal Provided',                    body: 'A meal is provided after a three-hour shift. Vegan by default — flag allergies before service begins.', semester: 'S1-2026', who: '@vol_059', upvotes: 11 },
  { id: 'w5', partner: 'dixon-house',    category: 'tips',           title: 'Mandarin Reference Card',          body: 'A Mandarin numerals reference card is kept behind the main desk for new volunteers. Ask at reception.', semester: 'S1-2026', who: '@vol_222', upvotes: 18 },
  { id: 'w6', partner: 'sisterworks',    category: 'logistics',      title: 'Last Tram Timing',                 body: 'The last tram on Route 96 departs around 21:30. Plan your exit from evening sessions accordingly.', semester: 'S2-2025', who: '@vol_004', upvotes: 6 },
  { id: 'w7', partner: 'st-kilda-mums',  category: 'culture',        title: 'Sorting System',                   body: 'Items are sorted by condition (A/B/C) and type. The coordinator will walk you through on your first shift. It takes about 15 minutes to learn.', semester: 'S1-2025', who: '@vol_088', upvotes: 5 },
];

/* ── Chatbot Question Banks ── */
export const questionBanks = [
  /* FORTNIGHT 1 — First Impressions (Wk 1–2) */
  {
    fortnight: 1,
    theme: 'First Impressions',
    weeks: 'Wk 1–2',
    questions: [
      { id: 'f1q1', text: 'Welcome to your first reflection. Tell me about your first day at your volunteer placement — what stood out to you?', branches: {
        challenge: 'You mentioned something that felt difficult. Can you tell me more about what made it challenging?',
        person: 'It sounds like someone made an impression on you. What was that interaction like?',
        surprise: 'That seems like it caught you off guard. How did you react in the moment?',
        default: 'Can you paint a more detailed picture? Walk me through what a typical hour looked like.',
      }},
      { id: 'f1q2', text: 'What expectations did you bring into this placement? How did reality compare?', branches: {
        positive: 'It sounds like things exceeded your expectations. What specifically was better than you imagined?',
        negative: 'It sounds like there was a gap between what you expected and what you found. How are you adjusting?',
        neutral: 'Interesting that it matched what you expected. What had prepared you for that?',
        default: 'Tell me more — what was the biggest surprise, positive or negative?',
      }},
      { id: 'f1q3', text: 'How did the team or staff at the organisation make you feel on your first visit?', branches: { default: 'What do you think made the biggest difference in how welcomed (or not) you felt?' }},
      { id: 'f1q4', text: 'Is there anything practical you wish you\'d known before your first shift?', branches: { default: 'That\'s useful. Would you consider sharing that as a tip for future volunteers?' }},
      { id: 'f1q5', text: 'If you had to describe your placement in three words to a friend, what would they be?', branches: { default: 'Interesting choices. Which of those three words matters most to you right now?' }},
      { id: 'f1q6', text: 'What\'s one thing you\'re looking forward to in the next two weeks?', branches: { default: 'I\'ll check in on that next time. Anything you\'re nervous about?' }},
      { id: 'f1q7', text: 'Thank you for this reflection. To wrap up: what\'s one sentence that captures how you feel about the start of this placement?', branches: { default: null }},
    ],
  },
  /* FORTNIGHT 2 — Routines & Relationships (Wk 3–4) */
  {
    fortnight: 2,
    theme: 'Routines & Relationships',
    weeks: 'Wk 3–4',
    questions: [
      { id: 'f2q1', text: 'You\'re a few weeks in now. Has a routine started to form at your placement? What does a typical shift look like?', branches: {
        routine: 'Sounds structured. Do you find that reassuring or a bit monotonous?',
        chaotic: 'It sounds like every day is different. How do you handle the unpredictability?',
        default: 'Walk me through a recent shift from arrival to departure.',
      }},
      { id: 'f2q2', text: 'Have you started building relationships with staff or other volunteers? Tell me about someone you\'ve connected with.', branches: { default: 'What is it about that person that stands out to you?' }},
      { id: 'f2q3', text: 'What\'s been the most challenging part of the last two weeks?', branches: {
        skills: 'Skill gaps are normal at this stage. What have you done to address it?',
        social: 'Social dynamics can be tricky. How are you navigating that?',
        default: 'How did you handle that challenge? What would you do differently?',
      }},
      { id: 'f2q4', text: 'Have you noticed anything about how the organisation operates that surprised you?', branches: { default: 'Why do you think they do it that way?' }},
      { id: 'f2q5', text: 'How are you managing the logistics — getting there, scheduling, balancing with other commitments?', branches: { default: 'Is there anything that would make the logistics easier?' }},
      { id: 'f2q6', text: 'Is there anything you\'d want to share with future volunteers about this stage of the placement?', branches: { default: 'Great — that could be valuable as a wiki entry for the next cohort.' }},
      { id: 'f2q7', text: 'To wrap up: compared to your first reflection, has your feeling about this placement changed? How?', branches: { default: null }},
    ],
  },
  /* FORTNIGHT 3 — Skills & Surprises (Wk 5–6) */
  {
    fortnight: 3,
    theme: 'Skills & Surprises',
    weeks: 'Wk 5–6',
    questions: [
      { id: 'f3q1', text: 'You\'re approaching the halfway mark. What skills have you developed or sharpened through this placement?', branches: {
        technical: 'That\'s a concrete skill. Do you see yourself using it beyond this placement?',
        soft: 'Interpersonal skills are often the most transferable. Can you give me an example of when you used it?',
        default: 'Tell me more — when did you first notice that skill developing?',
      }},
      { id: 'f3q2', text: 'Has anything genuinely surprised you in the last two weeks?', branches: { default: 'What made that moment stand out from the ordinary?' }},
      { id: 'f3q3', text: 'Have you had a chance to talk with peers about their placements? How does yours compare?', branches: { default: 'What\'s the most interesting difference you\'ve noticed?' }},
      { id: 'f3q4', text: 'Is there a moment from the last fortnight that you keep thinking about?', branches: { default: 'Why do you think that moment stuck with you?' }},
      { id: 'f3q5', text: 'If you could change one thing about how your placement operates, what would it be?', branches: { default: 'Do you think that change is feasible? Have you mentioned it to anyone?' }},
      { id: 'f3q6', text: 'How connected do you feel to the community your organisation serves?', branches: { default: 'What would deepen that connection for you?' }},
      { id: 'f3q7', text: 'Halfway reflection: in one sentence, what has this placement taught you so far?', branches: { default: null }},
    ],
  },
  /* FORTNIGHT 4 — Deeper Engagement (Wk 7–8) */
  {
    fortnight: 4,
    theme: 'Deeper Engagement',
    weeks: 'Wk 7–8',
    questions: [
      { id: 'f4q1', text: 'You\'re past the halfway point. Have you taken on any new responsibilities or tasks recently?', branches: {
        yes: 'How did that feel? Was it something you asked for or were given?',
        no: 'Would you want more responsibility? What would that look like?',
        default: 'Tell me about a recent shift where you felt particularly engaged.',
      }},
      { id: 'f4q2', text: 'Have you encountered a genuinely difficult situation during your placement? What happened?', branches: {
        conflict: 'Conflict is hard. How did you navigate it, and what would you do differently?',
        emotional: 'That sounds emotionally heavy. How did you process it afterward?',
        default: 'How did you handle it in the moment? What did you learn?',
      }},
      { id: 'f4q3', text: 'Has your understanding of the organisation\'s mission changed since you started?', branches: { default: 'What shifted your perspective?' }},
      { id: 'f4q4', text: 'If you could design an ideal volunteer shift at your placement, what would it include?', branches: { default: 'That\'s a thoughtful design. What\'s missing from the current setup?' }},
      { id: 'f4q5', text: 'Have you noticed anything about yourself that has changed since the placement started?', branches: { default: 'Do you think others around you have noticed that change too?' }},
      { id: 'f4q6', text: 'What advice would you give to a student about to start at your exact placement?', branches: { default: 'That\'s practical wisdom. Would you add it to the partner wiki?' }},
      { id: 'f4q7', text: 'To close: what\'s the one thing keeping you motivated for the final stretch?', branches: { default: null }},
    ],
  },
  /* FORTNIGHT 5 — Impact & Growth (Wk 9–10) */
  {
    fortnight: 5,
    theme: 'Impact & Growth',
    weeks: 'Wk 9–10',
    questions: [
      { id: 'f5q1', text: 'With just a few weeks left, let\'s talk about impact. What difference do you think your volunteer work has made?', branches: {
        big: 'That\'s significant. How do you know it mattered?',
        small: 'Small impacts add up. Can you trace a specific outcome to your work?',
        unsure: 'That uncertainty is honest. What would "making a difference" look like to you?',
        default: 'Can you give a specific example?',
      }},
      { id: 'f5q2', text: 'How has this placement connected to your studies or other parts of your life?', branches: { default: 'Was that connection something you expected, or did it emerge on its own?' }},
      { id: 'f5q3', text: 'What\'s the most important thing you\'ve learned about yourself through this experience?', branches: { default: 'How might that self-knowledge shape what you do next?' }},
      { id: 'f5q4', text: 'Has your relationship with the staff or community changed over the semester?', branches: { default: 'What does that evolution tell you about how trust builds?' }},
      { id: 'f5q5', text: 'If you could share one story from this placement with someone who\'s never volunteered, what would it be?', branches: { default: 'Why that story in particular?' }},
      { id: 'f5q6', text: 'Is there something the university or the program could do better to support volunteers like you?', branches: { default: 'That\'s useful feedback. Would you be comfortable sharing it formally?' }},
      { id: 'f5q7', text: 'Nearly there. In a sentence: how has this placement changed your understanding of community?', branches: { default: null }},
    ],
  },
  /* FORTNIGHT 6 — Looking Back (Wk 11–12) */
  {
    fortnight: 6,
    theme: 'Looking Back',
    weeks: 'Wk 11–12',
    questions: [
      { id: 'f6q1', text: 'This is your final reflection. Looking back at the full 12 weeks — what are you most proud of?', branches: {
        achievement: 'That\'s worth celebrating. What made it possible?',
        growth: 'Growth is the best kind of achievement. When did you first notice it?',
        default: 'Tell me more about what that pride feels like.',
      }},
      { id: 'f6q2', text: 'What was the hardest moment of the entire placement? How do you see it now?', branches: { default: 'Has your perspective on it changed since it happened?' }},
      { id: 'f6q3', text: 'Is there anyone from your placement — staff, peers, community members — you want to acknowledge?', branches: { default: 'What did they teach you, directly or indirectly?' }},
      { id: 'f6q4', text: 'If a student next semester asked "Is this placement worth it?" — what would you say?', branches: { default: 'What\'s the one thing you\'d tell them to pay attention to?' }},
      { id: 'f6q5', text: 'What legacy are you leaving at this organisation? What will continue after you\'re gone?', branches: { default: 'Is there anything you wish you could have done but ran out of time for?' }},
      { id: 'f6q6', text: 'Will you stay involved with this organisation or community after the semester ends?', branches: { default: 'What would make that possible or attractive to you?' }},
      { id: 'f6q7', text: 'Final question: in one sentence, what would you tell your Week 1 self?', branches: { default: null }},
    ],
  },
];

/* ── Helper: find partner by slug ── */
export function partnerBySlug(slug) {
  return partners.find(p => p.slug === slug);
}

/* ── Helper: get current fortnight (1-indexed) ── */
export function currentFortnight(week = semester.currentWeek) {
  return Math.min(6, Math.ceil(week / 2));
}
