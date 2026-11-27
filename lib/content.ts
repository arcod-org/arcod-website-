// Static site content, taken from ARCOD's Annual Report 2025–26, Impact Snapshot,
// Milestones document and Director's Note. Edit here; dynamic items (events, uploaded
// photos/videos) live in the database and are managed from /admin.

export const org = {
  name: "ARCOD",
  fullName: "Association for Rural Community Development",
  founded: 1988,
  address: "4/637, Krishnagiri Road, Rayakottai – 635 116, Krishnagiri District, Tamil Nadu",
  phones: [
    { label: "Office", value: "+91 4348 232451" },
    { label: "V. R. Keshavraj, Executive Director", value: "+91 94432 86782" },
    { label: "T. Sivamurthi, Deputy Director", value: "+91 94433 22451" },
  ],
  emails: ["arcod1988@gmail.com", "arcod@rediffmail.com"],
  razorpay: "https://pages.razorpay.com/donatetoarcod",
  mapEmbed: "https://www.google.com/maps?q=Rayakottai,+Krishnagiri,+Tamil+Nadu&output=embed",
};

export const nav = [
  { href: "/about", label: "About" },
  { href: "/programmes", label: "Programmes" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const credentials = [
  "FCRA registered",
  "12A & 80G",
  "UNCCD Provisional Accreditation",
  "NGO Darpan",
  "GuideStar India",
  "CSR registered",
];

export const heroSlides = [
  { src: "/images/hero-campus.jpg", alt: "ARCOD campus among the hills of Rayakottai", caption: "ARCOD Namma Veedu campus, Rayakottai — our home since 1988." },
  { src: "/images/lamp-girls.jpg", alt: "Girls at the LAMP programme", caption: "LAMP — keeping rural girls in school, with Luminous Power Technologies." },
  { src: "/images/ag-millet.jpg", alt: "Farmers in a millet field", caption: "Sustainable agriculture — climate-resilient farming with Azim Premji Foundation." },
];

// [confirm] Impact Snapshot lists both 12,500+ and 10,000+ farmers; acreage omitted until confirmed.
export const impactStats = [
  { value: 12500, suffix: "+", label: "farmers reached through agriculture programmes" },
  { value: 10000, suffix: "+", label: "women empowered through SHGs and leadership" },
  { value: 30000, suffix: "+", label: "children and adolescents supported" },
  { value: 500, suffix: "+", label: "villages reached across Tamil Nadu" },
  { value: 150, suffix: "+", label: "community institutions strengthened" },
  { value: 704, suffix: "", label: "schools received STEM kits in 2025–26" },
];

export type Programme = {
  title: string;
  theme: "Education" | "Agriculture" | "Children" | "Health" | "Women" | "Livelihoods";
  years: string;
  phase: "current" | "legacy";
  image?: string;
  where: string;
  partner: string;
  body: string;
};

export const programmes: Programme[] = [
  { phase: "current", theme: "Education", title: "LAMP — Promoting Girls’ Education", years: "Since 2018", image: "/images/lamp-award.jpg", where: "Krishnagiri District · ARCOD Namma Veedu", partner: "Luminous Power Technologies (CSR)", body: "Mentoring, remedial classes, inter-school competitions and exposure visits that help rural girls stay in school and plan their futures." },
  { phase: "current", theme: "Education", title: "Quality Learning for Linguistic Minorities", years: "Since 2013", image: "/images/lamp-mentoring.jpg", where: "Hosur Education Division", partner: "India Literacy Project", body: "Improving learning for children in Telugu- and Kannada-medium schools, building on the earlier MOZHI programme." },
  { phase: "current", theme: "Education", title: "STEM in Government Schools", years: "2025–26", image: "/images/lamp-science2.jpg", where: "704 schools", partner: "[confirm partner]", body: "Science kits for 704 schools, with teacher training and classroom monitoring to make science hands-on." },
  { phase: "current", theme: "Children", title: "Children of Krishnagiri", years: "Since 2010", image: "/images/ev-summercamp.jpg", where: "Krishnagiri & Dharmapuri Districts", partner: "[confirm partner]", body: "Care, nutrition, counselling and education for children and young adults born with HIV, including camps at ARCOD Namma Veedu." },
  { phase: "current", theme: "Health", title: "HIV Care, Nutrition & Counselling", years: "2025–26", image: "/images/ev-awareness.jpg", where: "Krishnagiri & Dharmapuri", partner: "[confirm partner]", body: "375 nutrition kits, 25 medical cases supported and 400+ counselling sessions for families affected by HIV." },
  { phase: "current", theme: "Agriculture", title: "Capacity Building on Sustainable Agriculture", years: "2023–2026", image: "/images/ag-millet.jpg", where: "Kelamangalam block, Krishnagiri", partner: "Azim Premji Foundation", body: "2,000+ farmers trained; 976 soil and water conservation works and 817 bio-input units established." },
  { phase: "current", theme: "Agriculture", title: "Natural Inputs & Value Addition", years: "Ongoing", image: "/images/ag-panchakavya.jpg", where: "Farmers Interest Groups", partner: "Azim Premji Foundation", body: "Training farmers — especially women — to make Panchakavya, bio-inputs and millet snacks that raise income." },
  { phase: "current", theme: "Women", title: "Women’s Collectives & Digital Inclusion", years: "2026–27 priority", image: "/images/ev-women.jpg", where: "Krishnagiri District", partner: "[confirm partner]", body: "Strengthening women’s groups and expanding digital inclusion so women can save, earn and lead." },
  { phase: "legacy", theme: "Agriculture", title: "Three Farmer Producer Organisations", years: "2015–2023", image: "/images/ag-fpo.jpg", where: "Krishnagiri District", partner: "NABARD", body: "Promoted three FPOs so small farmers could buy and sell together at fair prices." },
  { phase: "legacy", theme: "Children", title: "CHILDLINE 1098", years: "2012–2023", image: "/images/ev-candle.jpg", where: "Krishnagiri District", partner: "MoWCD, GoI through Childline India Foundation", body: "Eleven years of 24-hour emergency response for children in distress." },
  { phase: "legacy", theme: "Health", title: "Community-Driven HIV Prevention", years: "2004–2020", image: "/images/ev-walkathon.jpg", where: "Krishnagiri District", partner: "TAI–VHS and TANSACS", body: "Community-led HIV prevention with high-risk groups, recognised as a best-performing programme in 2013." },
  { phase: "legacy", theme: "Education", title: "Gift A Future", years: "2009–2020", where: "Krishnagiri & Dharmapuri", partner: "Altius Foundation", body: "Quality private-school education for children from poor families." },
  { phase: "legacy", theme: "Education", title: "MOZHI — Linguistic Minorities", years: "2009–2014", where: "Thally & Kelamangalam blocks", partner: "Aide et Action", body: "Better learning and support for children of linguistic minorities." },
  { phase: "legacy", theme: "Children", title: "Adolescents & Home-Based Care", years: "2013–2017", where: "Thally & Kelamangalam blocks", partner: "[confirm partner]", body: "Adolescent development and home-based care for antenatal and postnatal mothers." },
  { phase: "legacy", theme: "Women", title: "Women in Panchayat Leadership", years: "2006–2009", where: "Krishnagiri District", partner: "The Hunger Project, USA", body: "Strengthened women’s leadership in Panchayat Raj institutions." },
  { phase: "legacy", theme: "Women", title: "Skill Development & Youth", years: "2006–2009", where: "Krishnagiri, Tiruvannamalai & Tiruppur", partner: "NABARD and Hand in Hand", body: "Training in mobile repair, tailoring and beauty services to improve employability." },
  { phase: "legacy", theme: "Women", title: "Micro-Credit Resource Organisation", years: "2003–2007", where: "Tamil Nadu", partner: "NOVIB, Netherlands", body: "Micro-credit support that strengthened financing for NGOs across Tamil Nadu." },
  { phase: "legacy", theme: "Children", title: "Child-Friendly Village Planning", years: "2004–2007", where: "Krishnagiri District", partner: "UNICEF", body: "Village plans that put children’s safety and well-being first." },
  { phase: "legacy", theme: "Livelihoods", title: "Tea Estate Workers’ Welfare", years: "2000–2018", where: "Coimbatore, the Nilgiris & Tirunelveli", partner: "Fairtrade International, Germany", body: "Improved living and working conditions for tea estate workers." },
  { phase: "legacy", theme: "Agriculture", title: "Watershed Management", years: "1990–1998", where: "Kelamangalam block", partner: "Misereor & EZE, Germany", body: "Watershed works and ecological agriculture that strengthened water security." },
  { phase: "legacy", theme: "Agriculture", title: "Wasteland Development", years: "1989–1992", where: "Krishnagiri District", partner: "Ministry of Environment & Forests, GoI", body: "Reclaimed wastelands and improved land productivity — earning the 1993 Best Performing NGO award." },
];

// Homepage programme tabs
export const homeAreas: Record<string, { title: string; tag: string; image: string; body: string }[]> = {
  Education: [
    { title: "LAMP — Promoting Girls’ Education", tag: "Since 2018 · Luminous", image: "/images/lamp-girls.jpg", body: "Mentoring, remedial classes, competitions and exposure visits that keep rural girls in school — with a 100% pass rate in 2025–26." },
    { title: "Quality Learning for Linguistic Minorities", tag: "Since 2013 · India Literacy Project", image: "/images/lamp-mentoring.jpg", body: "Better learning for Telugu- and Kannada-medium children across the Hosur Education Division." },
    { title: "STEM in Government Schools", tag: "2025–26", image: "/images/lamp-science1.jpg", body: "Science kits delivered to 704 schools, with teacher training and classroom monitoring." },
  ],
  Agriculture: [
    { title: "Capacity Building on Sustainable Agriculture", tag: "2023–2026 · Azim Premji Foundation", image: "/images/ag-millet.jpg", body: "2,000+ farmers trained in 2025–26 on soil and water conservation, bio-inputs and climate-resilient crops." },
    { title: "Farmer Producer Organisations", tag: "2015–2023 · NABARD", image: "/images/ag-fpo.jpg", body: "Three FPOs promoted so small farmers can buy inputs together and sell at fair prices." },
    { title: "Natural Inputs & Value Addition", tag: "Women farmers", image: "/images/ag-women-training.jpg", body: "Training in Panchakavya, bio-inputs and millet-based products that add income to every harvest." },
  ],
  Children: [
    { title: "Children of Krishnagiri", tag: "Since 2010", image: "/images/ev-summercamp.jpg", body: "Care, nutrition, counselling and education for children and young adults born with HIV in Krishnagiri and Dharmapuri." },
    { title: "Summer Camps & Life Skills", tag: "ARCOD Namma Veedu", image: "/images/lamp-drawing.jpg", body: "Camps, competitions and life-skills sessions that build confidence and friendship." },
    { title: "CHILDLINE 1098", tag: "2012–2023 · past programme", image: "/images/ev-candle.jpg", body: "Eleven years of emergency response for children in distress, with Childline India Foundation." },
  ],
  Health: [
    { title: "HIV Care & Support", tag: "2025–26", image: "/images/ev-awareness.jpg", body: "375 nutrition kits, 400+ counselling sessions and medical support for families affected by HIV." },
    { title: "Community Health Awareness", tag: "Ongoing", image: "/images/ev-hall.jpg", body: "Awareness meetings and walkathons on health, prevention and access to services." },
    { title: "HIV Prevention Programme", tag: "2004–2020 · TANSACS", image: "/images/ev-walkathon.jpg", body: "Sixteen years of community-driven HIV prevention in Krishnagiri District." },
  ],
  Women: [
    { title: "Self-Help Groups & Federations", tag: "10,000+ women", image: "/images/ev-women.jpg", body: "Savings, credit and collective voice through women’s groups and federations." },
    { title: "Women in Local Governance", tag: "2006–2009 · The Hunger Project", image: "/images/ag-group.jpg", body: "Strengthening women’s leadership in Panchayat Raj institutions across Krishnagiri." },
    { title: "Skills & Digital Inclusion", tag: "2026–27 priority", image: "/images/ag-meeting.jpg", body: "Skill training and digital inclusion so women can earn, save and lead." },
  ],
};

export const board = {
  governing: [
    { name: "P. Chandrasekar", role: "President", qual: "FCA", image: "/images/p-chandrasekar.jpg" },
    { name: "S. Senthilkumar", role: "Vice President", qual: "MBA", image: "/images/p-senthilkumar.jpg" },
    { name: "V. R. Keshavraj", role: "Founder & Secretary", qual: "M.A. (Social Work)", image: "/images/p-keshavraj.jpg" },
    { name: "C. N. Prasanna Kumari", role: "Treasurer", qual: "M.A., B.L.", image: "/images/p-prasanna.jpg" },
    { name: "Josephine Joseph", role: "Governing Body Member", qual: "M.A. (Social Work)", image: "/images/p-josephine.jpg" },
    { name: "K. Ananth", role: "Governing Body Member", qual: "M.A. (Social Work)", image: "/images/p-ananth.jpg" },
    { name: "Sujay", role: "Governing Body Member", qual: "", image: "/images/p-sujay.jpg" }, // [confirm] not in the annual report list
  ],
  general: [
    { name: "B. V. Balaji", role: "General Body Member", qual: "", image: "/images/p-balaji.jpg" },
    { name: "D. G. Venkatesan", role: "General Body Member", qual: "", image: "/images/p-venkatesan.jpg" },
    { name: "Nagalakshmi", role: "General Body Member", qual: "", image: "/images/p-nagalakshmi.jpg" },
    { name: "Shanthi", role: "General Body Member", qual: "", image: "/images/p-shanthi.jpg" },
  ],
};

export const milestones = [
  { year: "1988", title: "ARCOD is founded", body: "A fellowship from Shruti, New Delhi supports the establishment of the organisation in Rayakottai.", by: "Shruti, New Delhi" },
  { year: "1988–89", title: "Safe water & sanitation", body: "Awareness on safe drinking water and household toilets for rural and marginalised families.", by: "CAPART" },
  { year: "1989–92", title: "Wasteland development", body: "Reclamation of wastelands, improving land use and protecting the environment.", by: "Ministry of Environment & Forests, GoI" },
  { year: "1990–98", title: "Watershed management", body: "Watershed management and ecological agriculture in Kelamangalam block, strengthening water security.", by: "Misereor & EZE, Germany" },
  { year: "2000–04", title: "Reproductive & child health", body: "Improved reproductive and child health services across the project area.", by: "Tamil Nadu Voluntary Health Association" },
  { year: "2000–18", title: "Tea estate workers’ welfare", body: "Better living and working conditions for tea estate workers in Coimbatore, the Nilgiris and Tirunelveli.", by: "Fairtrade International, Germany" },
  { year: "2004–07", title: "Child-friendly villages", body: "Village planning that put children’s safety and well-being at the centre.", by: "UNICEF" },
  { year: "2004–20", title: "Community-driven HIV prevention", body: "Sixteen years of HIV prevention with communities and high-risk groups in Krishnagiri.", by: "TAI–VHS & TANSACS" },
  { year: "2006–09", title: "Women in local governance", body: "Strengthening women’s leadership in Panchayat Raj institutions across Krishnagiri District.", by: "The Hunger Project, USA" },
  { year: "2009–20", title: "Gift A Future", body: "Quality private-school education for underprivileged children in Krishnagiri and Dharmapuri.", by: "Altius Foundation" },
  { year: "2010", title: "Children of Krishnagiri", body: "Ongoing care and support for children and young adults born with HIV.", by: "[confirm partner]" },
  { year: "2012–23", title: "CHILDLINE 1098", body: "Emergency support for children in distress, ensuring their safety and well-being.", by: "MoWCD through Childline India Foundation" },
  { year: "2015–23", title: "Three Farmer Producer Organisations", body: "Farmer collectives that strengthen bargaining power and sustainable farming.", by: "NABARD" },
  { year: "2018", title: "LAMP — girls’ education", body: "Mentoring, competitions and exposure visits that keep rural girls in school.", by: "Luminous Power Technologies" },
  { year: "2023–26", title: "Sustainable agriculture", body: "Building farmers’ knowledge and practice of climate-resilient, low-input agriculture.", by: "Azim Premji Foundation" },
];

export const awards = [
  { year: "1993", title: "Best Performing NGO", by: "National Wasteland Development Board, MoEF, Govt. of India — among 10 NGOs in Tamil Nadu" },
  { year: "2013", title: "Best Performance", by: "Tamil Nadu State AIDS Control Society — among 24 NGOs, Targeted Intervention" },
  { year: "2014", title: "10 Years of Partnership", by: "TAI–Voluntary Health Services, HIV prevention", image: "/images/aw-plaque.jpg" },
  { year: "2016", title: "Certificate of Appreciation", by: "VHS Multi Speciality Hospital — Chennai flood relief", image: "/images/aw-vhs.jpg" },
  { year: "2022", title: "Certificate of Appreciation", by: "Dept. of Health & Family Welfare, Govt. of Tamil Nadu", image: "/images/aw-tn.jpg" },
];

export const partners = [
  "Luminous Power Technologies", "Azim Premji Foundation", "UNICEF", "NABARD", "TANSACS", "India Literacy Project",
  "Childline India Foundation", "Fairtrade International", "Misereor", "The Hunger Project", "CAPART", "Aide et Action",
  "Altius Foundation", "Oxfam",
];

export const reports = [
  { title: "Annual Report", period: "2025–26", href: "/reports/annual-report-2025-26.pdf" },
  { title: "Annual Report", period: "2024–25", href: "/reports/annual-report-2024-25.pdf" }, // [confirm] file was named "Annual Report 2025"
  { title: "Audit Statements", period: "2026", href: "/reports/audit-statements-2026.pdf" },
  { title: "Audit Statements", period: "2025", href: "/reports/audit-statements-2025.pdf" },
  { title: "Case Story — Sustainable Agriculture", period: "2025–26", href: "/reports/case-story-sustainable-agriculture.pdf" },
];

// Curated gallery shown alongside admin uploads.
export const curatedGallery = [
  { src: "/images/lamp-trip.jpg", title: "LAMP exposure visit, 2024", album: "Education", caption: "Students from the LAMP programme on an exposure visit to a science museum, February 2024.", span: "big" },
  { src: "/images/ag-millet.jpg", title: "Millet field demonstration", album: "Agriculture", caption: "A demonstration plot of climate-resilient millet under the Sustainable Agriculture programme with Azim Premji Foundation.", span: "wide" },
  { src: "/images/lamp-kabaddi1.jpg", title: "Inter-school kabaddi, 2022", album: "Education", caption: "Girls compete in kabaddi at the LAMP inter-school competition held at ARCOD Namma Veedu, February 2022." },
  { src: "/images/campus-aerial3.jpg", title: "ARCOD Namma Veedu campus", album: "Campus", caption: "Our training campus at Rayakottai, set among the hills of Krishnagiri District.", span: "tall" },
  { src: "/images/lamp-dance.jpg", title: "LAMP launch ceremony, 2023", album: "Education", caption: "A classical dance performance at the launch of LAMP Batch 2023, a CSR initiative of Luminous Power Technologies." },
  { src: "/images/ag-tomato.jpg", title: "Tomato harvest", album: "Agriculture" },
  { src: "/images/ev-summercamp.jpg", title: "Children of Krishnagiri summer camp", album: "Events" },
  { src: "/images/lamp-science1.jpg", title: "Science centre visit", album: "Education" },
  { src: "/images/ev-walkathon.jpg", title: "Youth awareness walkathon", album: "Events", span: "wide" },
  { src: "/images/ag-panchakavya.jpg", title: "Preparing Panchakavya", album: "Agriculture", caption: "Farmers prepare Panchakavya, a natural fertiliser, during a hands-on training." },
  { src: "/images/lamp-drawing.jpg", title: "Drawing competition", album: "Education" },
  { src: "/images/campus-library.jpg", title: "Pichu Iyer Library", album: "Campus", caption: "The Pichu Iyer Library on the ARCOD campus, open to students and trainees." },
  { src: "/images/ag-women-training.jpg", title: "Women’s millet value-addition training", album: "Agriculture", caption: "Women farmers learn to make millet-based snacks such as Ragi Murukku to add income from their harvest.", span: "wide" },
  { src: "/images/lamp-girls.jpg", title: "LAMP students", album: "Education" },
  { src: "/images/ev-candle.jpg", title: "Candle-lighting ceremony", album: "Events" },
  { src: "/images/lamp-kabaddi2.jpg", title: "Kabaddi team in play", album: "Education" },
  { src: "/images/campus-auditorium.jpg", title: "Auditorium", album: "Campus" },
  { src: "/images/ag-fpo.jpg", title: "Farmer Producer Organisation meeting", album: "Agriculture" },
  { src: "/images/lamp-interschool.jpg", title: "Inter-school competition, 2022", album: "Education", span: "wide" },
  { src: "/images/ev-hall.jpg", title: "Community meeting", album: "Events" },
  { src: "/images/ag-biochar.jpg", title: "Biochar demonstration", album: "Agriculture" },
  { src: "/images/lamp-science2.jpg", title: "Hands-on learning at the science centre", album: "Education" },
  { src: "/images/campus-hall.jpg", title: "Training hall", album: "Campus" },
  { src: "/images/ev-walk2.jpg", title: "Walkathon", album: "Events" },
  { src: "/images/ag-group.jpg", title: "Farmer trainees at the auditorium", album: "Agriculture", span: "wide" },
  { src: "/images/lamp-guests.jpg", title: "LAMP launch guests", album: "Education" },
  { src: "/images/campus-guestroom.jpg", title: "Residential rooms", album: "Campus" },
  { src: "/images/ev-awareness.jpg", title: "Health awareness session", album: "Events" },
] as const;

export const albums = ["Education", "Agriculture", "Children", "Health", "Women", "Events", "Campus", "General"];
export const eventCategories = ["Education", "Agriculture", "Children", "Health", "Women", "Community", "Celebration"];

// Messages from leadership (About page). Text from ARCOD's documents, lightly edited for flow.
export const leadershipMessages = [
  {
    id: "ceo",
    heading: "Message from the CEO",
    name: "Dr. Nalini Keshavraj",
    role: "Chief Executive Officer",
    image: "/images/l-nalini.jpg", // [confirm] the photo supplied is very small — ask ARCOD for a larger one
    pull: "Women are not merely participants in development — they are leaders, decision-makers and catalysts of social transformation.",
    paragraphs: [
      "At ARCOD, our journey is driven by a strong belief that sustainable development begins when communities are empowered to recognise their rights, realise their potential and actively shape their own future. Drawing on more than three decades of work with communities, we remain committed to advancing women’s empowerment, girl-child empowerment, gender equality and inclusive community development, particularly among marginalised and vulnerable communities.",
      "As the CEO of ARCOD, I strongly believe that women are not merely participants in development but are leaders, decision-makers and catalysts of social transformation. Our focus is on nurturing grassroots women’s leadership, strengthening the voices of adolescent girls and women, promoting gender justice, and creating inclusive spaces where every individual — irrespective of social, economic or cultural background — has an equal opportunity to participate and thrive. Through our work with marginalised communities, we strive to address inequalities, challenge discriminatory practices, strengthen community capacities and ensure that the most vulnerable voices are heard and represented.",
      "We remain committed to building resilient, inclusive and empowered communities where women and girls can exercise their rights, access opportunities, lead change and contribute meaningfully to society. True development is achieved when no one is left behind, and when community leadership, dignity, diversity and equality become the foundation of lasting social change.",
      "Together, let us build a just, inclusive and gender-equitable society where every woman and girl has the opportunity to lead, thrive and transform her community.",
    ],
  },
  {
    id: "deputy-director",
    heading: "Message from the Deputy Director",
    name: "T. Sivamurthi",
    role: "Deputy Director",
    image: "/images/l-sivamurthi.jpg",
    pull: "Sustainable development begins with the aspirations, participation and leadership of rural communities.",
    paragraphs: [
      "At the Association for Rural Community Development (ARCOD), we believe that sustainable development begins with the aspirations, participation and leadership of rural communities. Our commitment is to create an inclusive and equitable society where every individual — particularly women, children, farmers and marginalised communities — has the opportunity to live with dignity and realise their full potential.",
      "Since its establishment in 1988, ARCOD has worked at the grassroots to address the challenges faced by rural communities. Over the past 38 years, our journey has been guided by the principles of community participation, empowerment, social justice and sustainable development. We have consistently focused on strengthening community institutions, promoting women’s leadership, improving livelihoods, conserving natural resources and facilitating access to essential services and opportunities.",
      "As we move forward, ARCOD is committed to responding to emerging development challenges, including climate change, environmental degradation, educational inequality, digital exclusion and the growing needs of vulnerable populations. We continue to strengthen our programmes through innovative approaches, strategic partnerships and community-led initiatives that build resilience and long-term impact.",
      "Meaningful development cannot be achieved by any organisation alone. It requires the collective effort of communities, government institutions, civil society organisations, donors and development partners. ARCOD values these partnerships and remains committed to transparency, accountability and responsible implementation of its programmes.",
      "I invite you to explore our work, learn about the progress made by the communities we serve, and join us in building a more just, inclusive and sustainable rural society. Together, we can turn aspirations into action and create lasting change for generations to come.",
    ],
  },
];
