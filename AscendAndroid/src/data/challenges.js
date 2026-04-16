// ─────────────────────────────────────────────
// ASCEND — Challenge Content Database
// 100+ challenges across 4 skill lanes
// Each challenge has: type, prompt, options, correct answer, explain, mission
// ─────────────────────────────────────────────

export const SKILL_LANES = {
  logic: { name: 'Logic', icon: '🧠', color: '#8b5cf6', desc: 'Clear thinking & reasoning' },
  memory: { name: 'Memory', icon: '🔮', color: '#06b6d4', desc: 'Recall & pattern recognition' },
  communication: { name: 'Communication', icon: '💬', color: '#f59e0b', desc: 'Persuasion & clarity' },
  money: { name: 'Money Sense', icon: '💰', color: '#10b981', desc: 'Financial intelligence' },
};

export const CHALLENGE_TYPES = {
  PICK_BEST: 'pick_best',       // Pick the best option
  SPOT_FLAW: 'spot_flaw',       // Find the error/flaw
  REWRITE: 'rewrite',           // Choose the better rewrite
  SEQUENCE: 'sequence',         // Complete the pattern
  RECALL: 'recall',             // Remember & recall
  SCENARIO: 'scenario',         // Best decision in a scenario
};

// ─── MIND CHALLENGES (Logic + Memory) ──────────────
export const MIND_CHALLENGES = [
  // ── Logic ──
  {
    id: 'm001', lane: 'logic', type: 'pick_best', diff: 1,
    prompt: 'All roses are flowers. Some flowers fade quickly. Therefore:',
    options: ['All roses fade quickly', 'Some roses may fade quickly', 'No roses fade quickly', 'Roses are not flowers'],
    answer: 1,
    explain: 'The conclusion "some roses MAY fade quickly" is the only valid inference. "All" and "No" are too absolute — the premise only says "some flowers."',
    insight: 'Watch for absolute language (all, never, always) in arguments — it\'s usually a red flag.',
    mission: { text: 'Spot one absolute statement in a conversation today and question it.', xp: 80 }
  },
  {
    id: 'm002', lane: 'logic', type: 'spot_flaw', diff: 2,
    prompt: 'A politician says: "Crime dropped 20% since I took office. My policies work." What\'s the flaw?',
    options: ['Correlation doesn\'t prove causation', 'The data is fake', 'Crime can\'t drop 20%', 'Politicians always lie'],
    answer: 0,
    explain: 'Crime could have dropped due to economic trends, seasonal patterns, or national policies — not necessarily the politician\'s actions.',
    insight: 'Just because two things happen together doesn\'t mean one caused the other.',
    mission: { text: 'Find one "correlation = causation" claim in the news today.', xp: 80 }
  },
  {
    id: 'm003', lane: 'logic', type: 'sequence', diff: 1,
    prompt: 'What comes next? 2, 6, 18, 54, ___',
    options: ['108', '162', '148', '216'],
    answer: 1,
    explain: 'Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162.',
    insight: 'Pattern recognition is a foundational skill for decision-making in every field.',
    mission: { text: 'Identify a pattern in your daily routine that you could optimize.', xp: 60 }
  },
  {
    id: 'm004', lane: 'logic', type: 'pick_best', diff: 2,
    prompt: 'You\'re at a fork with two guards. One always lies, one always tells truth. You can ask ONE question. What do you ask?',
    options: ['"Are you the liar?"', '"Which path is safe?"', '"What would the OTHER guard say is the safe path?"', '"Is the left path safe?"'],
    answer: 2,
    explain: 'Ask what the OTHER guard would say, then do the opposite. The liar would lie about the truth-teller\'s answer, and vice versa — both point to the wrong path.',
    insight: 'In negotiations, asking about a third party\'s perspective often reveals more than direct questions.',
    mission: { text: 'When making a decision today, ask yourself what someone with the opposite view would say.', xp: 100 }
  },
  {
    id: 'm005', lane: 'logic', type: 'spot_flaw', diff: 1,
    prompt: '"9 out of 10 dentists recommend this toothpaste." What should you ask?',
    options: ['How many dentists were surveyed?', 'What brand do dentists use?', 'Is toothpaste necessary?', 'Why not 10 out of 10?'],
    answer: 0,
    explain: 'If only 10 dentists were asked, 9/10 is meaningless. Sample size matters enormously in any statistic.',
    insight: 'Always ask about sample size when someone cites a percentage.',
    mission: { text: 'Question one statistic you encounter today — ask about sample size or methodology.', xp: 80 }
  },
  {
    id: 'm006', lane: 'logic', type: 'pick_best', diff: 2,
    prompt: 'A store marks a $100 jacket up 50% then offers a "50% off sale." What\'s the real price?',
    options: ['$100 (back to original)', '$75', '$50', '$125'],
    answer: 1,
    explain: '$100 + 50% = $150. Then 50% off $150 = $75. Percentage increases and decreases are not symmetrical!',
    insight: 'Percentage math is asymmetric — a 50% gain followed by a 50% loss always leaves you poorer.',
    mission: { text: 'Check one "sale" price today and calculate if the discount is real.', xp: 80 }
  },
  {
    id: 'm007', lane: 'logic', type: 'scenario', diff: 3,
    prompt: 'You have strong evidence for Plan A, but your gut says Plan B. What\'s the best approach?',
    options: ['Always trust data over gut', 'Always trust gut over data', 'Investigate what your gut might be sensing that the data misses', 'Flip a coin'],
    answer: 2,
    explain: 'Your gut feeling often processes pattern-matching you can\'t articulate. The best approach: take the gut feeling seriously and investigate what it might be picking up on.',
    insight: 'Intuition is often compressed experience. Don\'t dismiss it — interrogate it.',
    mission: { text: 'Next time you feel uneasy about a decision, write down what your gut might be sensing.', xp: 100 }
  },
  {
    id: 'm008', lane: 'logic', type: 'spot_flaw', diff: 2,
    prompt: '"I\'ve been taking this supplement and haven\'t gotten sick in 6 months!" What\'s wrong with this reasoning?',
    options: ['Anecdotal evidence isn\'t proof', 'Supplements can\'t work', '6 months is too long', 'They must have gotten sick'],
    answer: 0,
    explain: 'A single person\'s experience (anecdote) can\'t prove causation. They might not have gotten sick anyway — many factors affect health.',
    insight: 'One story ≠ evidence. Look for controlled studies with large sample sizes.',
    mission: { text: 'Notice one anecdotal claim today and consider alternative explanations.', xp: 80 }
  },
  {
    id: 'm009', lane: 'logic', type: 'pick_best', diff: 1,
    prompt: 'Which cognitive bias makes you value something more just because you own it?',
    options: ['Confirmation bias', 'Endowment effect', 'Anchoring bias', 'Dunning-Kruger effect'],
    answer: 1,
    explain: 'The endowment effect: people demand more to give up something they own than they\'d pay to buy it. A mug you own feels worth $7, but you\'d only pay $3 for the same mug.',
    insight: 'When selling or letting go of something, ask: "Would I buy this today at this price?"',
    mission: { text: 'Look at one possession and honestly ask: would I buy this again today?', xp: 60 }
  },
  {
    id: 'm010', lane: 'logic', type: 'scenario', diff: 2,
    prompt: 'Your team debates between two strategies. Everyone agrees on Option A. You see a flaw. What do you do?',
    options: ['Stay quiet — majority is usually right', 'Loudly disagree', 'Ask a probing question about the flaw', 'Suggest Option C'],
    answer: 2,
    explain: 'Asking a probing question is the safest and most effective way to surface a flaw without antagonizing the group. It lets others discover the problem.',
    insight: 'Questions are more persuasive than statements. Lead with curiosity, not confrontation.',
    mission: { text: 'In your next group discussion, raise a concern as a question instead of a statement.', xp: 100 }
  },
  {
    id: 'm011', lane: 'logic', type: 'pick_best', diff: 3,
    prompt: 'The "survivorship bias" means we...',
    options: ['Focus on survivors and ignore failures', 'Overvalue experts', 'Trust personal experience too much', 'Fear loss more than we value gain'],
    answer: 0,
    explain: 'We study successful companies, singers, and startups — but ignore the millions who did the same thing and failed. The advice from survivors may be luck, not strategy.',
    insight: 'Before following a success story, ask: "How many people did the same thing and failed?"',
    mission: { text: 'Read one success story today and think about who tried the same thing and failed.', xp: 80 }
  },
  {
    id: 'm012', lane: 'logic', type: 'spot_flaw', diff: 2,
    prompt: '"We\'ve always done it this way." What logical fallacy is this?',
    options: ['Appeal to tradition', 'Ad hominem', 'Straw man', 'Red herring'],
    answer: 0,
    explain: 'Appeal to tradition: assuming something is correct because it\'s been done for a long time. Longevity doesn\'t equal validity.',
    insight: 'Tradition can be wisdom or inertia. Always ask: "Is there a better way now?"',
    mission: { text: 'Identify one habit you do "because you always have" and evaluate if it still makes sense.', xp: 80 }
  },
  // ── Memory ──
  {
    id: 'm013', lane: 'memory', type: 'recall', diff: 1,
    prompt: 'Memorize this sequence, then pick it: 🔵🟡🔴🟢🔵',
    options: ['🔵🟡🔴🟢🔵', '🔵🔴🟡🟢🔵', '🟡🔵🔴🟢🔵', '🔵🟡🟢🔴🔵'],
    answer: 0,
    explain: 'The correct sequence was 🔵🟡🔴🟢🔵. Visual chunking helps: think "Blue-Yellow then Red-Green then Blue."',
    insight: 'Chunking (grouping items into meaningful clusters) dramatically improves short-term memory.',
    mission: { text: 'Practice chunking: memorize a 10-digit phone number in 3 chunks.', xp: 60 }
  },
  {
    id: 'm014', lane: 'memory', type: 'recall', diff: 2,
    prompt: 'You met these people: Sarah (teacher), Marcus (engineer), Lila (chef). Who is the engineer?',
    options: ['Sarah', 'Marcus', 'Lila', 'None of them'],
    answer: 1,
    explain: 'Marcus is the engineer. Associating names with professions creates stronger memory links.',
    insight: 'When meeting someone new, repeat their name and create an association: "Marcus builds things — Marcus the Maker."',
    mission: { text: 'Next person you meet, repeat their name 3 times in conversation and create a mental association.', xp: 100 }
  },
  {
    id: 'm015', lane: 'memory', type: 'recall', diff: 2,
    prompt: 'What is the best technique to remember a grocery list of 15 items?',
    options: ['Repeat it 50 times', 'Write it on your arm', 'Create a story linking all items', 'Only buy 5 items'],
    answer: 2,
    explain: 'The "memory palace" or "story method" links items in a narrative. "A giant BANANA opened the MILK door to find BREAD fighting EGGS." Wild = memorable.',
    insight: 'Our brains remember stories and images far better than random lists.',
    mission: { text: 'Make a mental story linking 5 things you need to do tomorrow.', xp: 80 }
  },
  {
    id: 'm016', lane: 'memory', type: 'sequence', diff: 1,
    prompt: 'Remember this order: Apple, Clock, River, Moon. What was third?',
    options: ['Apple', 'Clock', 'River', 'Moon'],
    answer: 2,
    explain: 'River was the third item. Position recall is a core working memory skill.',
    insight: 'To remember position, create a spatial layout: put each item in a specific room of your house.',
    mission: { text: 'Practice the "memory palace" technique: link 4 items to 4 rooms.', xp: 80 }
  },
  {
    id: 'm017', lane: 'memory', type: 'pick_best', diff: 2,
    prompt: 'Which study technique leads to the most long-term retention?',
    options: ['Re-reading notes 10 times', 'Highlighting key phrases', 'Spaced repetition with self-testing', 'Studying 8 hours straight'],
    answer: 2,
    explain: 'Spaced repetition (reviewing at expanding intervals) combined with active recall (testing yourself) is proven to be the most effective learning method.',
    insight: 'Test yourself instead of re-reading. Struggle = growth for your brain.',
    mission: { text: 'Review something you learned recently by testing yourself instead of re-reading.', xp: 100 }
  },
  {
    id: 'm018', lane: 'memory', type: 'recall', diff: 3,
    prompt: '3 seconds: memorize these numbers. 7-3-9-1-5-8. What was the 4th number?',
    options: ['9', '1', '3', '5'],
    answer: 1,
    explain: 'The 4th number was 1. The sequence: 7, 3, 9, 1, 5, 8.',
    insight: 'Working memory typically holds 7±2 items. Chunking (73-91-58) expands your effective capacity.',
    mission: { text: 'Try memorizing a 6-digit number from a receipt today using chunking.', xp: 60 }
  },
];

// ─── LIFE CHALLENGES (Communication + Money) ──────
export const LIFE_CHALLENGES = [
  // ── Communication ──
  {
    id: 'l001', lane: 'communication', type: 'rewrite', diff: 1,
    prompt: 'Which message is more persuasive for asking your boss for a raise?',
    options: [
      '"I want a raise because I need more money."',
      '"I deserve more because I work hard."',
      '"In the past 6 months, I\'ve increased team output by 15% and taken on 3 new projects. I\'d like to discuss adjusting my compensation to reflect this impact."',
      '"Everyone else gets paid more than me."'
    ],
    answer: 2,
    explain: 'The best persuasion uses specific evidence + measured tone. Vague claims ("I work hard") are weak. Comparisons with others feel petty. Data + impact = leverage.',
    insight: 'Never ask for what you want. Show what you\'ve delivered and let the request follow naturally.',
    mission: { text: 'Rewrite one request you need to make today using specific evidence.', xp: 120 }
  },
  {
    id: 'l002', lane: 'communication', type: 'pick_best', diff: 2,
    prompt: 'Someone says something you disagree with in a meeting. Best response?',
    options: [
      '"You\'re wrong."',
      '"That\'s interesting. What led you to that conclusion?"',
      'Stay silent and seethe.',
      '"Actually, studies show..."'
    ],
    answer: 1,
    explain: '"What led you to that conclusion?" is powerful because it\'s non-threatening, shows respect, and often reveals weak reasoning without you needing to attack.',
    insight: 'Curiosity is the strongest form of disagreement. Make them examine their own thinking.',
    mission: { text: 'Today, respond to one disagreement with genuine curiosity instead of a counter-argument.', xp: 100 }
  },
  {
    id: 'l003', lane: 'communication', type: 'rewrite', diff: 2,
    prompt: 'Your friend cancels plans last minute (again). Which response maintains the relationship but sets a boundary?',
    options: [
      '"Fine. Whatever."',
      '"You always do this. You\'re unreliable."',
      '"No worries! 😊" (while fuming inside)',
      '"Hey, no problem this time. But I value our plans — can we lock in a time that works better for you?"'
    ],
    answer: 3,
    explain: 'This response acknowledges the situation gracefully, states what you value, and offers a constructive path forward — without guilting or being passive-aggressive.',
    insight: '"I statements" + a forward solution is the formula: "I value X. Can we do Y?"',
    mission: { text: 'Draft a boundary-setting message you\'ve been putting off. Use the I-value-X, can-we-Y formula.', xp: 120 }
  },
  {
    id: 'l004', lane: 'communication', type: 'spot_flaw', diff: 1,
    prompt: 'What\'s wrong with this apology: "I\'m sorry you feel that way"?',
    options: [
      'It blames the other person\'s feelings, not your actions',
      'It\'s too formal',
      'Apologies should be longer',
      'Nothing — it\'s fine'
    ],
    answer: 0,
    explain: '"I\'m sorry you feel that way" is a non-apology — it shifts blame to the other person\'s reaction instead of owning your behavior. A real apology: "I\'m sorry I did X. I understand it made you feel Y."',
    insight: 'A real apology has 3 parts: what you did wrong, how it affected them, what you\'ll do differently.',
    mission: { text: 'If you owe anyone an apology, draft one using the 3-part formula.', xp: 120 }
  },
  {
    id: 'l005', lane: 'communication', type: 'scenario', diff: 2,
    prompt: 'You\'re negotiating rent with a landlord. They say "$2,000/month." Best first move?',
    options: [
      'Immediately counter with $1,500',
      'Say "That\'s too much" and leave',
      'Ask "How did you arrive at that number?"',
      'Accept immediately to secure the place'
    ],
    answer: 2,
    explain: 'Asking how they arrived at the number gives you information about their flexibility, comparable rates, and priorities. Information is power in negotiation.',
    insight: 'In any negotiation, the person who asks the most questions has the most power.',
    mission: { text: 'Next time someone gives you a price, ask "How did you arrive at that number?"', xp: 100 }
  },
  {
    id: 'l006', lane: 'communication', type: 'pick_best', diff: 1,
    prompt: 'Which email subject line gets opened more?',
    options: [
      '"Quick question"',
      '"Meeting"',
      '"Following up on our conversation about the Q3 timeline"',
      '"URGENT!!!"'
    ],
    answer: 2,
    explain: 'Specific subject lines get higher open rates because the reader knows exactly what to expect. Vague subjects get deprioritized. "URGENT" causes alarm fatigue.',
    insight: 'Specificity = respect for the reader\'s time. Vagueness = easy to ignore.',
    mission: { text: 'Rewrite your next email subject line to be specific and actionable.', xp: 60 }
  },
  {
    id: 'l007', lane: 'communication', type: 'rewrite', diff: 3,
    prompt: 'Which is the strongest way to start a presentation?',
    options: [
      '"Hi, my name is... and today I\'ll talk about..."',
      '"Let me start with a quick story."',
      '"Last year, 40% of new hires quit within 6 months."',
      '"Can everyone hear me okay?"'
    ],
    answer: 2,
    explain: 'Opening with a striking, specific fact immediately grabs attention and creates urgency. Stories are good too, but data creates tension. "Can everyone hear me?" wastes the most powerful moment.',
    insight: 'Your first 7 seconds set the tone. Open with tension, not logistics.',
    mission: { text: 'Prepare the first sentence of your next presentation or pitch using a striking fact.', xp: 100 }
  },
  // ── Money Sense ──
  {
    id: 'l008', lane: 'money', type: 'spot_flaw', diff: 1,
    prompt: 'A gym offers "Only $1/day!" What\'s the real annual cost?',
    options: ['$30', '$120', '$365', '$250'],
    answer: 2,
    explain: '$1/day × 365 days = $365/year. Reframing costs as tiny daily amounts is a classic pricing trick to make expensive things feel cheap.',
    insight: 'Always multiply daily/weekly costs to annual. "Just $3/day" = $1,095/year.',
    mission: { text: 'Calculate the annual cost of one daily purchase you make (coffee, snack, subscription).', xp: 100 }
  },
  {
    id: 'l009', lane: 'money', type: 'pick_best', diff: 2,
    prompt: 'You have $1,000 in savings and $500 in credit card debt at 24% APR. What should you do first?',
    options: [
      'Invest the $1,000 in stocks',
      'Pay off the credit card debt',
      'Save more before paying debt',
      'Split between savings and debt equally'
    ],
    answer: 1,
    explain: 'Credit card interest at 24% APR is almost impossible to beat with investments (~7-10% average). Every $1 of debt costs you $0.24/year. Pay it off FIRST.',
    insight: 'High-interest debt is a guaranteed negative return. Eliminating it = the best "investment" you can make.',
    mission: { text: 'Check if you have any high-interest debt. Make a plan to pay it down.', xp: 120 }
  },
  {
    id: 'l010', lane: 'money', type: 'scenario', diff: 2,
    prompt: 'You get a $5,000 raise. What\'s the smartest move?',
    options: [
      'Upgrade your car immediately',
      'Increase your lifestyle to match',
      'Save/invest at least 50% before adjusting lifestyle',
      'Loan money to a friend to celebrate'
    ],
    answer: 2,
    explain: 'Lifestyle inflation eats raises. The "50% rule": save/invest at least half of every raise before adjusting your spending. Your future self will thank you.',
    insight: 'The gap between what you earn and what you spend is the only number that builds wealth.',
    mission: { text: 'Calculate the gap between your income and spending this month. Is it growing or shrinking?', xp: 100 }
  },
  {
    id: 'l011', lane: 'money', type: 'spot_flaw', diff: 1,
    prompt: '"Buy 2, get 1 free!" on a $30 item you only need one of. What\'s the real deal?',
    options: [
      'You save $30',
      'You spend $60 on things you don\'t need to "save" $30',
      'It\'s always worth it',
      'You should buy 4'
    ],
    answer: 1,
    explain: 'Spending $60 to "save" $30 only works if you genuinely need all three. The store\'s goal is to triple your spending — your goal should be buying what you need.',
    insight: 'The best deal on something you don\'t need is not buying it at all.',
    mission: { text: 'Next time you see a "buy more save more" deal, ask: "Would I buy this at full price?"', xp: 80 }
  },
  {
    id: 'l012', lane: 'money', type: 'pick_best', diff: 3,
    prompt: 'Which has a bigger impact on wealth over 30 years?',
    options: [
      'Earning $10,000 more per year',
      'Saving $500/month starting now',
      'Buying a house immediately',
      'Learning to trade stocks'
    ],
    answer: 1,
    explain: '$500/month invested at 7% for 30 years = ~$567,000. Compound interest is the most powerful force in personal finance. Starting early matters more than amount.',
    insight: 'Time × consistency > income. A disciplined small saver often beats a high-earning big spender.',
    mission: { text: 'Set up or increase one automatic monthly savings/investment, even by $10.', xp: 120 }
  },
  {
    id: 'l013', lane: 'money', type: 'spot_flaw', diff: 2,
    prompt: 'A subscription is "$9.99/month — cancel anytime!" Why is this pricing strategic?',
    options: [
      'Inertia — most people forget to cancel',
      'It\'s genuinely cheap',
      'Monthly is always better than annual',
      'The price is transparent'
    ],
    answer: 0,
    explain: 'The "cancel anytime" model works because of inertia bias. Companies know ~70% of people forget or delay canceling. "Cancel anytime" really means "you probably won\'t."',
    insight: 'Set a calendar reminder every 3 months to audit your subscriptions. Inertia is expensive.',
    mission: { text: 'Check your subscriptions RIGHT NOW. Cancel one you haven\'t used this month.', xp: 120 }
  },
  {
    id: 'l014', lane: 'money', type: 'scenario', diff: 1,
    prompt: 'Your friend asks you to co-sign a loan. Should you?',
    options: [
      'Always help friends',
      'Politely decline — co-signing means YOU pay if they can\'t',
      'Only if it\'s a small amount',
      'Only if they promise to pay'
    ],
    answer: 1,
    explain: 'Co-signing means you are 100% legally responsible if your friend defaults. Banks assess risk for a living — if the bank won\'t lend to them alone, that\'s a signal.',
    insight: 'Never risk your financial health for someone else\'s debt. Help in other ways if you can.',
    mission: { text: 'Review your financial commitments. Are you on the hook for anything you didn\'t fully think through?', xp: 80 }
  },
];

// ─── EDGE CHALLENGES (Harder, mixed) ──────────────
export const EDGE_CHALLENGES = [
  {
    id: 'e001', lane: 'logic', type: 'scenario', diff: 3,
    prompt: 'A company has 10% employee turnover. They hire 100 new people/year. After 5 years, roughly how many employees do they retain from the original team?',
    options: ['50', '59', '65', '90'],
    answer: 1,
    explain: 'Each year, 90% remain. After 5 years: 100 × (0.9)^5 ≈ 59. Compound effects work against you too — small losses accumulate dramatically.',
    insight: 'Small percentage losses compound just like gains. Rate of loss matters as much as rate of growth.',
    mission: { text: 'Identify one "small loss" in your life (time, money, energy) that compounds daily.', xp: 100 }
  },
  {
    id: 'e002', lane: 'communication', type: 'scenario', diff: 3,
    prompt: 'You\'re in an argument that\'s getting heated. The other person raises their voice. Best de-escalation move?',
    options: [
      'Raise your voice louder to assert dominance',
      'Walk away silently',
      'Lower your voice and slow your speech',
      'Tell them to calm down'
    ],
    answer: 2,
    explain: 'Lowering your voice and slowing your pace physiologically triggers the other person to mirror you. "Calm down" almost never works — it invalidates their emotion.',
    insight: 'You control the temperature of a conversation with your volume and speed, not your words.',
    mission: { text: 'In your next tense conversation, consciously lower your voice and slow your pace.', xp: 120 }
  },
  {
    id: 'e003', lane: 'money', type: 'scenario', diff: 3,
    prompt: 'Two job offers: A) $85,000 salary, 15-min commute. B) $100,000, 90-min commute. Which is often the better deal?',
    options: [
      'Always B — more money is more money',
      'It depends, but A is often better when you factor in time, gas, and stress',
      'It depends on the company',
      'Always negotiate for more'
    ],
    answer: 1,
    explain: 'The 90-min commute costs ~$5,000+/year in gas/transit, plus 375 hours of life lost annually. Studies show long commutes are one of the biggest predictors of unhappiness.',
    insight: 'Time has a monetary value. Calculate your real hourly rate AFTER commute, not just your salary.',
    mission: { text: 'Calculate your TRUE hourly rate by including commute time as work time.', xp: 100 }
  },
  {
    id: 'e004', lane: 'logic', type: 'spot_flaw', diff: 3,
    prompt: '"I tried meditating once and didn\'t feel calmer. Meditation doesn\'t work." What\'s wrong?',
    options: [
      'Single-trial generalization fallacy',
      'Meditation is always effective',
      'They didn\'t try hard enough',
      'Calmness can\'t be measured'
    ],
    answer: 0,
    explain: 'Judging an entire practice from one attempt is the single-trial generalization fallacy. Most skills (including meditation) require consistent practice to show results.',
    insight: 'Before dismissing something as "not working," ask: "Did I give it a fair trial?"',
    mission: { text: 'Pick one thing you dismissed after trying once. Give it 3 more genuine attempts.', xp: 100 }
  },
  {
    id: 'e005', lane: 'memory', type: 'pick_best', diff: 3,
    prompt: 'What is the "testing effect" in psychology?',
    options: [
      'Anxiety from too many tests',
      'Recalling information strengthens memory more than re-reading it',
      'Multiple choice is easier than free recall',
      'Studying under pressure improves performance'
    ],
    answer: 1,
    explain: 'The testing effect: actively retrieving information from memory strengthens the neural pathways far more than passively re-reading. This is why flashcards beat highlighting.',
    insight: 'Don\'t re-read. Test yourself. Struggle IS the learning process.',
    mission: { text: 'Close this app and try to recall all 3 insights from today\'s challenges without looking.', xp: 100 }
  },
  {
    id: 'e006', lane: 'communication', type: 'rewrite', diff: 3,
    prompt: 'You need to give negative feedback to a colleague. Which approach is best?',
    options: [
      '"You did a bad job on the report."',
      '"The report was great, BUT the data section needs work."',
      '"The data section of the report had 3 inaccuracies. Here\'s what I found — can we fix these together?"',
      '"No offense, but the report needs a lot of improvement."'
    ],
    answer: 2,
    explain: 'Specific + collaborative = effective. The "compliment sandwich" (great BUT...) feels manipulative. Direct + specific + a collaborative offer is more honest and productive.',
    insight: 'Good feedback is specific (not vague), actionable (not judgmental), and collaborative (not hostile).',
    mission: { text: 'Give one piece of specific, actionable feedback to someone today — at work or at home.', xp: 120 }
  },
  {
    id: 'e007', lane: 'logic', type: 'pick_best', diff: 3,
    prompt: 'The "Dunning-Kruger effect" states that:',
    options: [
      'Smart people are always humble',
      'People with low skill often overestimate their ability, while experts underestimate theirs',
      'Everyone is equally skilled',
      'Confidence always equals competence'
    ],
    answer: 1,
    explain: 'Beginners don\'t know enough to know what they don\'t know, leading to overconfidence. Experts see the vast landscape of what they haven\'t mastered, leading to humility.',
    insight: 'The more you learn, the more you realize you don\'t know. Humility is a sign of growth.',
    mission: { text: 'Identify one topic where you might be overconfident. Research what experts say about it.', xp: 100 }
  },
  {
    id: 'e008', lane: 'money', type: 'pick_best', diff: 3,
    prompt: 'What is "opportunity cost"?',
    options: [
      'The price of missed sales',
      'The value of the next best alternative you gave up',
      'The cost of starting a business',
      'The price of waiting too long'
    ],
    answer: 1,
    explain: 'Every choice has a hidden cost: what you DIDN\'T choose. Buying a $1,000 TV means NOT having $1,000 for travel, savings, or education. Smart decisions account for opportunity cost.',
    insight: 'Don\'t just ask "Can I afford this?" Ask "What am I giving up by choosing this?"',
    mission: { text: 'Before your next purchase over $50, list what else that money could do for you.', xp: 100 }
  },
];

// ─── PROGRESSION DATA ──────────────────────────────
export const RANKS = [
  { name: 'Bronze', minXP: 0, color: '#cd7f32', glow: 'rgba(205,127,50,0.4)' },
  { name: 'Silver', minXP: 500, color: '#c0c0c0', glow: 'rgba(192,192,192,0.4)' },
  { name: 'Gold', minXP: 1500, color: '#ffd700', glow: 'rgba(255,215,0,0.4)' },
  { name: 'Diamond', minXP: 4000, color: '#b9f2ff', glow: 'rgba(185,242,255,0.5)' },
  { name: 'Apex', minXP: 10000, color: '#ff6ec7', glow: 'rgba(255,110,199,0.5)' },
];

export const TITLES = [
  { id: 'clear_thinker', name: 'Clear Thinker', lane: 'logic', xpReq: 200 },
  { id: 'pattern_master', name: 'Pattern Master', lane: 'logic', xpReq: 800 },
  { id: 'bias_hunter', name: 'Bias Hunter', lane: 'logic', xpReq: 1500 },
  { id: 'memory_monk', name: 'Memory Monk', lane: 'memory', xpReq: 200 },
  { id: 'total_recall', name: 'Total Recall', lane: 'memory', xpReq: 800 },
  { id: 'mind_palace', name: 'Mind Palace', lane: 'memory', xpReq: 1500 },
  { id: 'smooth_talker', name: 'Smooth Talker', lane: 'communication', xpReq: 200 },
  { id: 'calm_negotiator', name: 'Calm Negotiator', lane: 'communication', xpReq: 800 },
  { id: 'silver_tongue', name: 'Silver Tongue', lane: 'communication', xpReq: 1500 },
  { id: 'penny_wise', name: 'Penny Wise', lane: 'money', xpReq: 200 },
  { id: 'budget_slayer', name: 'Budget Slayer', lane: 'money', xpReq: 800 },
  { id: 'wealth_architect', name: 'Wealth Architect', lane: 'money', xpReq: 1500 },
];

export const PATHS = [
  { id: 'thinker', name: 'Thinker', icon: '🧠', desc: 'Master of logic and reason' },
  { id: 'speaker', name: 'Speaker', icon: '🎙️', desc: 'Master of words and influence' },
  { id: 'builder', name: 'Builder', icon: '⚒️', desc: 'Master of creation and execution' },
  { id: 'guardian', name: 'Guardian', icon: '🛡️', desc: 'Master of protection and awareness' },
  { id: 'strategist', name: 'Strategist', icon: '♟️', desc: 'Master of planning and foresight' },
  { id: 'closer', name: 'Closer', icon: '🎯', desc: 'Master of deals and decisions' },
  { id: 'sage', name: 'Sage', icon: '📿', desc: 'Master of wisdom and patience' },
];

export const LEADERBOARD_BOTS = [
  { name: 'AlphaMind', xp: 12500, path: 'thinker', streak: 45 },
  { name: 'NexusNova', xp: 11800, path: 'strategist', streak: 38 },
  { name: 'VelocityX', xp: 10200, path: 'closer', streak: 52 },
  { name: 'LunaLogic', xp: 9900, path: 'thinker', streak: 33 },
  { name: 'SilverEdge', xp: 8750, path: 'speaker', streak: 29 },
  { name: 'ZenithPeak', xp: 7600, path: 'guardian', streak: 41 },
  { name: 'CypherKey', xp: 6900, path: 'builder', streak: 22 },
  { name: 'PrismVault', xp: 5800, path: 'sage', streak: 35 },
  { name: 'IronWill', xp: 5100, path: 'guardian', streak: 18 },
  { name: 'FluxPoint', xp: 4200, path: 'closer', streak: 27 },
  { name: 'EchoStar', xp: 3600, path: 'speaker', streak: 14 },
  { name: 'DawnRider', xp: 2900, path: 'builder', streak: 20 },
  { name: 'QuietStorm', xp: 2200, path: 'sage', streak: 11 },
  { name: 'BladeSync', xp: 1800, path: 'strategist', streak: 9 },
  { name: 'RookieRise', xp: 800, path: 'thinker', streak: 5 },
];
