import { useState, useRef, useEffect, useCallback } from 'react';
import { WHATSAPP_URL, WHATSAPP_NUMBER } from '../config';

/* ═══════════════════════════════════════════════════════════════
   DOIT AI ASSISTANT — Frontend-only Chatbot
   Pattern-matched responses based on DOIT's knowledge base.
   ═══════════════════════════════════════════════════════════════ */

// ── Types ──
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

// ── Knowledge Base ──
const KNOWLEDGE_BASE = {
  services: [
    'Architectural Designing',
    'Civil Contracting',
    'Interior Designing',
    'Interior Contracting',
    'Renovations',
    'Landscaping',
    'Comprehensive Project Management',
    'CCTV & Smart Solutions',
    'Home Decoring',
  ],
  serviceDescriptions: {
    architectural:
      'From concept sketches to detailed construction drawings, our architects translate your vision into structurally sound, aesthetically compelling spaces that stand the test of time.',
    civil:
      'We manage the complete civil construction lifecycle — foundations, structural framing, and finishing — with rigorous quality control and transparent timelines.',
    interior:
      'Our design team crafts immersive interiors that balance form and function — curating materials, lighting, and spatial flow to create rooms that feel effortlessly elevated.',
    interiorContracting:
      'Precision-driven execution of interior fit-outs, from false ceilings and modular kitchens to bespoke joinery — delivered on schedule with meticulous craftsmanship.',
    renovations:
      'Breathe new life into existing spaces with thoughtful renovations that respect the original character while introducing modern comfort, efficiency, and style.',
    landscaping:
      'We design outdoor environments that extend your living experience — blending hardscape, softscape, water features, and lighting into cohesive garden narratives.',
    projectManagement:
      'End-to-end oversight of your project — coordinating architects, contractors, vendors, and timelines so you can focus on the excitement of seeing your space come alive.',
    smartSolutions:
      'Integrate intelligent surveillance, automated lighting, climate control, and home automation systems that offer security, convenience, and energy efficiency.',
    homeDecoring:
      'The finishing layer — curated art, textiles, statement furniture, and decorative accents that inject personality and warmth into every corner of your home.',
  },
  process: [
    { step: '01', title: 'Consult', desc: 'Talk to our interior designers & get an estimate.' },
    { step: '02', title: 'Design', desc: 'Detailed drawing and approval.' },
    { step: '03', title: 'Produce', desc: 'Production at own factory.' },
    { step: '04', title: 'Execute', desc: 'Material delivery and execution as per commitment.' },
    { step: '05', title: 'Deliver', desc: 'On time project hand over.' },
  ],
  coreValues: [
    { title: 'Innovative Design', desc: 'We blend creativity with precision, crafting spaces that push boundaries while honoring timeless design principles.' },
    { title: 'Quality Craftsmanship', desc: 'Every detail is meticulously executed with premium materials and expert techniques — built to endure for generations.' },
    { title: 'Client-Centric', desc: 'Your vision drives every decision. We listen, plan, and deliver spaces tailored to your unique aspirations and lifestyle.' },
  ],
  trustPoints: [
    'ISI-certified materials sourced from trusted manufacturers',
    'Milestone-driven schedules with committed handover dates',
    'No hidden costs — itemized quotations from day one',
  ],
  location: {
    studio: 'DOIT Design & Interiors',
    address: 'Venganellur shiva kshethram road, Chelakkara, Thrissur, Kerala 680586',
    hours: { weekday: 'Mon – Sat: 9.30 AM - 5.30 PM', sunday: 'Sunday: By Appointment' },
    email: 'doitdesigninterior@gmail.com',
  },
  about: {
    founded: '2019',
    founders: 'Mr. Zakhir Hussain and Mr. Najeeb',
    tagline: 'Transforming ideas into timeless environments that inspire, perform, and endure.',
    projectCompletion: 'Interior project completion within 45 working days',
    description:
      'We offer comprehensive solutions in architecture, interiors, exteriors, landscaping, and civil construction, serving both residential and commercial clients. Our integrated approach ensures every project is thoughtfully planned, meticulously executed, and tailored to meet the unique aspirations of our clients.',
  },
};

// ── Unrelated topic patterns ──
const UNRELATED_PATTERNS = [
  /\b(politic|election|government|president|minister|parliament|vote|democracy|party)\b/i,
  /\b(religio|church|mosque|temple|hindu|muslim|christian|buddhis|prayer|god|bible|quran)\b/i,
  /\b(medical|doctor|hospital|medicine|health|disease|symptom|diagnosis|treatment|cure|prescription)\b/i,
  /\b(programming|javascript|python|java|code|coding|developer|software|algorithm|react|angular|vue)\b/i,
  /\b(math|calculus|algebra|equation|geometry|trigonometry|integral|derivative|theorem)\b/i,
  /\b(weather|climate change|global warming|cryptocurrency|bitcoin|stock market|forex|trading)\b/i,
  /\b(recipe|cooking|baking|ingredient|food prep)\b/i,
  /\b(sport|football|cricket|basketball|soccer|tennis|match score)\b/i,
  /\b(movie|film|actor|actress|celebrity|gossip|entertainment)\b/i,
  /\b(war|military|army|weapon|bomb|attack|terrorism)\b/i,
];

// ── Competitor / recommendation patterns ──
const COMPETITOR_PATTERNS = [
  /\b(best|top|good|recommend|suggest)\b.*\b(interior|design|architect|construction|contractor|company|firm|agency)\b/i,
  /\b(interior|design|architect|construction|contractor|company|firm|agency)\b.*\b(best|top|good|recommend|suggest)\b/i,
  /\bwho should i hire\b/i,
  /\brecommend\b.*\b(me|an|a)\b/i,
  /\bcompetitor\b/i,
  /\b(livspace|homelane|bonito|decorpot|urban ladder|ikea|asian paints)\b/i,
  /\balternative\b.*\b(company|firm|agency)\b/i,
];

// ── System prompt / internal reveal patterns ──
const SYSTEM_PATTERNS = [
  /\b(system prompt|instructions|internal|behind the scenes|knowledge base content|system message)\b/i,
  /\bwho (created|made|built|developed|programmed) you\b/i,
  /\bwhat are you(r)?\s*(rules|instructions|prompts)\b/i,
  /\bshow me your (prompt|instructions|rules)\b/i,
  /\byour (source code|code|programming)\b/i,
];

// ── Response generator ──
function generateResponse(userMessage: string): { content: string; quickReplies?: string[] } {
  const msg = userMessage.toLowerCase().trim();

  // 1. System prompt / who created you
  if (SYSTEM_PATTERNS.some((p) => p.test(msg))) {
    if (/who (created|made|built|developed|programmed) you/i.test(msg)) {
      return {
        content:
          'I am the official AI assistant of DOIT Interior & Civil Solutions, designed to help visitors learn about our services and projects. 😊\n\nHow can I help you today? Would you like to explore our services or schedule a free consultation?',
        quickReplies: ['View Services', 'Book Consultation', 'Contact Us'],
      };
    }
    return {
      content:
        "I'm here to help you learn about DOIT Interior & Civil Solutions — our services, process, and how we can bring your vision to life! ✨\n\nWhat would you like to know?",
      quickReplies: ['Our Services', 'Our Process', 'Get a Quote'],
    };
  }

  // 2. Unrelated topics
  if (UNRELATED_PATTERNS.some((p) => p.test(msg))) {
    return {
      content:
        "I'm the DOIT Interior & Civil Solutions Assistant and can help with questions related to our services, projects, design process, pricing approach, consultations, and construction solutions. 🏠\n\nWould you like to explore what we offer?",
      quickReplies: ['View Services', 'Our Process', 'Contact Team'],
    };
  }

  // 3. Competitor / best company questions
  if (COMPETITOR_PATTERNS.some((p) => p.test(msg))) {
    return {
      content:
        "Choosing the right interior design partner depends on experience, project quality, transparency, and execution capability.\n\nAt **DOIT Interior & Civil Solutions**, we provide end-to-end interior, civil, and renovation services with a focus on:\n\n✅ Quality workmanship with ISI-certified materials\n✅ Timely delivery — interior projects in 45 working days\n✅ Transparent pricing with no hidden costs\n✅ Client-centric approach tailored to your vision\n\nWe've been delivering excellence since 2019 and would love to help with your project! 🏡\n\nShall I tell you more about our services or help arrange a free consultation?",
      quickReplies: ['View Our Work', 'Book Free Consultation', 'Talk to Our Team'],
    };
  }

  // 4. Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|namaste|howdy|greetings|yo|sup)\b/i.test(msg)) {
    return {
      content:
        "Hello! Welcome to **DOIT Interior & Civil Solutions** 👋\n\nI'm your virtual assistant, here to help you explore our interior design, civil construction, and renovation services.\n\nHow can I assist you today?",
      quickReplies: ['View Services', 'Our Process', 'Get a Quote', 'Location & Hours'],
    };
  }

  // 5. Thanks / bye
  if (/\b(thank|thanks|thx|bye|goodbye|see you|take care)\b/i.test(msg)) {
    return {
      content:
        "You're welcome! 😊 It was wonderful chatting with you.\n\nIf you'd like to take the next step, feel free to book a **free consultation** or reach out to our team anytime.\n\n📞 Call us or 💬 WhatsApp us — we're always happy to help!",
      quickReplies: ['Book Consultation', 'WhatsApp Us', 'Call Us'],
    };
  }

  // 6. Services
  if (/\b(service|what (do|can) you (do|offer)|offering|what you provide)\b/i.test(msg)) {
    const servicesList = KNOWLEDGE_BASE.services.map((s, i) => `${i + 1}. ${s}`).join('\n');
    return {
      content: `We offer a comprehensive range of design and construction services:\n\n${servicesList}\n\nWould you like to know more about any specific service? 🏗️`,
      quickReplies: ['Interior Designing', 'Civil Contracting', 'Renovations', 'All Services'],
    };
  }

  // 6a. Specific services
  if (/\b(architect|architectural)\b/i.test(msg)) {
    return {
      content: `**🏛️ Architectural Designing**\n\n${KNOWLEDGE_BASE.serviceDescriptions.architectural}\n\nOur architects work closely with you from the initial concept to final construction drawings, ensuring every detail is perfectly planned.\n\nWould you like to discuss your architectural project?`,
      quickReplies: ['Get a Quote', 'Book Consultation', 'Other Services'],
    };
  }

  if (/\b(civil|construction|build|building|foundation|structure)\b/i.test(msg)) {
    return {
      content: `**🏗️ Civil Contracting**\n\n${KNOWLEDGE_BASE.serviceDescriptions.civil}\n\nFrom foundations to finishing, we ensure every phase meets the highest quality standards with transparent timelines and ISI-certified materials.\n\nShall we discuss your construction project?`,
      quickReplies: ['Get Estimate', 'Book Site Visit', 'View Process'],
    };
  }

  if (/\b(interior design|interior decor|interiors|interior)\b/i.test(msg)) {
    return {
      content: `**✨ Interior Designing & Contracting**\n\n${KNOWLEDGE_BASE.serviceDescriptions.interior}\n\n${KNOWLEDGE_BASE.serviceDescriptions.interiorContracting}\n\nWe handle everything from concept to completion — including modular kitchens, false ceilings, wardrobes, and bespoke joinery.\n\n⏱️ *Interior project completion within 45 working days!*\n\nWould you like a free consultation?`,
      quickReplies: ['Book Consultation', 'View Packages', 'Get Estimate'],
    };
  }

  if (/\b(renovati|remodel|redo|makeover|transform)\b/i.test(msg)) {
    return {
      content: `**🔨 Renovations**\n\n${KNOWLEDGE_BASE.serviceDescriptions.renovations}\n\nWhether it's a kitchen refresh, bathroom upgrade, or a complete home makeover — we bring new life to your existing spaces while respecting the original character.\n\nLet's discuss your renovation ideas!`,
      quickReplies: ['Get a Quote', 'Book Site Visit', 'Contact Team'],
    };
  }

  if (/\b(landscap|garden|outdoor|exterior)\b/i.test(msg)) {
    return {
      content: `**🌿 Landscaping**\n\n${KNOWLEDGE_BASE.serviceDescriptions.landscaping}\n\nFrom lush gardens to elegant outdoor living spaces — we create outdoor environments that seamlessly extend your home's beauty.\n\nWant to explore landscaping for your property?`,
      quickReplies: ['Get a Quote', 'Book Consultation', 'Other Services'],
    };
  }

  if (/\b(cctv|smart|automat|surveillance|security|home automation)\b/i.test(msg)) {
    return {
      content: `**📷 CCTV & Smart Solutions**\n\n${KNOWLEDGE_BASE.serviceDescriptions.smartSolutions}\n\nMake your home or office smarter and safer with our integrated technology solutions.\n\nShall I arrange a consultation for smart home solutions?`,
      quickReplies: ['Get a Quote', 'Book Consultation', 'Other Services'],
    };
  }

  if (/\b(decor|home decor|furnish|furniture|accent)\b/i.test(msg)) {
    return {
      content: `**🎨 Home Decoring**\n\n${KNOWLEDGE_BASE.serviceDescriptions.homeDecoring}\n\nThe perfect finishing touch to any space — we curate pieces that tell your story and elevate your home's character.\n\nWould you like to explore our decoring services?`,
      quickReplies: ['Book Consultation', 'View Services', 'Contact Us'],
    };
  }

  if (/\b(project manage|management|oversee|coordinate)\b/i.test(msg)) {
    return {
      content: `**📋 Comprehensive Project Management**\n\n${KNOWLEDGE_BASE.serviceDescriptions.projectManagement}\n\nWith dedicated project managers overseeing every detail, you can rest easy knowing your project is in expert hands.\n\nWant to learn more about our management approach?`,
      quickReplies: ['View Our Process', 'Book Consultation', 'Get Estimate'],
    };
  }

  // 7. Process
  if (/\b(process|how (do|does) (it|the|your)|step|approach|workflow|timeline|stages)\b/i.test(msg)) {
    const steps = KNOWLEDGE_BASE.process.map((s) => `**${s.step}. ${s.title}** — ${s.desc}`).join('\n');
    return {
      content: `Our streamlined 5-step process ensures quality and on-time delivery:\n\n${steps}\n\n⏱️ *Interior projects completed within 45 working days!*\n\nWould you like to start with a free consultation?`,
      quickReplies: ['Book Consultation', 'Get Estimate', 'Contact Team'],
    };
  }

  // 8. Pricing / Cost / Budget
  if (/\b(pric|cost|budget|rate|charge|fee|how much|expensive|cheap|afford|package|quotation|estimate)\b/i.test(msg)) {
    return {
      content: `Great question! 💰 At DOIT, we believe in **transparent pricing** with no hidden costs.\n\nHere's our approach:\n\n✅ **Itemized quotations** from day one\n✅ **ISI-certified materials** sourced from trusted manufacturers\n✅ **Flexible packages** for both budget-conscious and premium projects\n✅ **Free consultation** to understand your requirements\n\nPricing varies based on project scope, materials, and specifications. The best way to get an accurate estimate is to schedule a **free consultation** or request a quote.\n\nShall I help you get started?`,
      quickReplies: ['Get Free Estimate', 'Book Consultation', 'WhatsApp Us'],
    };
  }

  // 9. Location / Address / Visit
  if (/\b(locat|address|where|visit|office|studio|find you|directions|map)\b/i.test(msg)) {
    return {
      content: `📍 **${KNOWLEDGE_BASE.location.studio}**\n${KNOWLEDGE_BASE.location.address}\n\n🕐 **Business Hours:**\n${KNOWLEDGE_BASE.location.hours.weekday}\n${KNOWLEDGE_BASE.location.hours.sunday}\n\n📧 Email: ${KNOWLEDGE_BASE.location.email}\n📞 Phone: +91 98765 43210\n\nWe'd love to welcome you to our studio! Would you like to schedule a visit?`,
      quickReplies: ['Schedule Visit', 'Get Directions', 'Call Us'],
    };
  }

  // 10. About / Company / Founders
  if (/\b(about|company|who are|tell me about|founder|history|establish|started|story|background)\b/i.test(msg)) {
    return {
      content: `**About DOIT Interior & Civil Solutions** 🏢\n\nFounded in **${KNOWLEDGE_BASE.about.founded}** by **${KNOWLEDGE_BASE.about.founders}**, DOIT is a multidisciplinary design & construction firm dedicated to delivering exceptional spaces.\n\n*"${KNOWLEDGE_BASE.about.tagline}"*\n\n${KNOWLEDGE_BASE.about.description}\n\n**What drives us:**\n${KNOWLEDGE_BASE.coreValues.map((v) => `• **${v.title}** — ${v.desc}`).join('\n')}\n\nWould you like to see our portfolio or learn about our services?`,
      quickReplies: ['View Services', 'Our Process', 'Book Consultation'],
    };
  }

  // 11. Contact / Phone / Email / WhatsApp
  if (/\b(contact|phone|call|email|reach|touch|connect|whatsapp|chat)\b/i.test(msg)) {
    const phoneDisplay = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 7)} ${WHATSAPP_NUMBER.slice(7)}`;
    return {
      content: `We'd love to hear from you! Here's how to reach us:\n\n📞 **Phone:** ${phoneDisplay}\n📧 **Email:** ${KNOWLEDGE_BASE.location.email}\n💬 **WhatsApp:** Chat with us instantly\n\n📍 **Studio:** ${KNOWLEDGE_BASE.location.address}\n🕐 ${KNOWLEDGE_BASE.location.hours.weekday}\n\nWhat's the best way for you to connect?`,
      quickReplies: ['WhatsApp Us', 'Call Us', 'Email Us', 'Visit Studio'],
    };
  }

  // 12. Consultation / Booking
  if (/\b(consult|book|appointment|schedule|meet|meeting|site visit|free consult)\b/i.test(msg)) {
    return {
      content: `We offer **free consultations** to understand your vision and requirements! 🎯\n\nHere's what happens during a consultation:\n\n1️⃣ **Discussion** — We listen to your ideas, preferences, and requirements\n2️⃣ **Assessment** — We evaluate the space and discuss possibilities\n3️⃣ **Estimate** — You receive a detailed, transparent quotation\n\nYou can book a consultation by:\n• 💬 Messaging us on WhatsApp\n• 📞 Calling our team\n• 📧 Emailing us at ${KNOWLEDGE_BASE.location.email}\n\nShall I connect you with our team right away?`,
      quickReplies: ['WhatsApp Us', 'Call Us', 'Email Us'],
    };
  }

  // 13. Quality / Materials / Warranty
  if (/\b(quality|material|warranty|guarantee|durab|lasting|trust|reliable)\b/i.test(msg)) {
    return {
      content: `Quality is at the heart of everything we do at DOIT! 🏆\n\n${KNOWLEDGE_BASE.trustPoints.map((t) => `✅ ${t}`).join('\n')}\n\nOur commitment to quality craftsmanship means every detail is meticulously executed with premium materials and expert techniques — built to endure for generations.\n\nWould you like to discuss your project requirements?`,
      quickReplies: ['Get a Quote', 'Book Consultation', 'View Process'],
    };
  }

  // 14. Kitchen specific
  if (/\b(kitchen|modular kitchen|cooking|pantry)\b/i.test(msg)) {
    return {
      content: `**🍳 Modular Kitchen Solutions**\n\nOur interior team specializes in designing and executing stunning modular kitchens that are both functional and beautiful.\n\nWe offer:\n• Custom modular kitchen designs\n• Premium cabinetry and storage solutions\n• Quality hardware and finishes\n• ISI-certified materials\n\n⏱️ As part of our interior services, kitchen projects are delivered within our 45-day timeline!\n\nWould you like to discuss your kitchen project?`,
      quickReplies: ['Get Kitchen Quote', 'Book Consultation', 'View Interior Services'],
    };
  }

  // 15. Bedroom / Living room
  if (/\b(bedroom|living room|hall|drawing room|bathroom|washroom|toilet)\b/i.test(msg)) {
    return {
      content: `We design and execute beautiful **${msg.includes('bedroom') ? 'bedrooms' : msg.includes('bathroom') || msg.includes('washroom') || msg.includes('toilet') ? 'bathrooms' : 'living spaces'}** that reflect your style and personality! ✨\n\nOur interior design services cover every room in your home — from concept to completion. We handle:\n\n• Space planning & layout optimization\n• Material selection & finishes\n• Custom furniture & joinery\n• Lighting design\n• Complete execution\n\nWant to share your vision for your space?`,
      quickReplies: ['Book Consultation', 'Get Estimate', 'View All Services'],
    };
  }

  // 16. Work / Portfolio / Projects
  if (/\b(work|portfolio|project|showcase|gallery|past work|previous|completed)\b/i.test(msg)) {
    return {
      content: `We'd love to show you our work! 🖼️\n\nDOIT has completed numerous residential and commercial projects across Kerala, each reflecting our commitment to quality, creativity, and client satisfaction.\n\nYou can explore our portfolio on our website's **Work** section to see our completed projects.\n\nWould you also like to schedule a consultation to discuss your project?`,
      quickReplies: ['Book Consultation', 'View Services', 'Contact Team'],
    };
  }

  // 17. Residential / Commercial
  if (/\b(residential|commercial|home|house|apartment|flat|villa|office|shop|store|showroom)\b/i.test(msg)) {
    return {
      content: `We serve both **residential and commercial** clients! 🏠🏢\n\n**Residential:** Homes, apartments, villas — from single rooms to complete home interiors\n**Commercial:** Offices, shops, showrooms — designed for functionality and brand identity\n\nOur integrated approach ensures every project is thoughtfully planned and meticulously executed.\n\nWhat type of project do you have in mind?`,
      quickReplies: ['Residential Project', 'Commercial Project', 'Book Consultation'],
    };
  }

  // 18. Timeline / Duration / How long
  if (/\b(how long|duration|time|days|weeks|months|deadline|when|complete|finish|deliver)\b/i.test(msg)) {
    return {
      content: `⏱️ **Project Timeline**\n\nAt DOIT, we're committed to on-time delivery:\n\n• **Interior projects:** Completed within **45 working days** *\n• **Milestone-driven schedules** with committed handover dates\n• **Regular progress updates** throughout the project\n\n*Timeline may vary based on project scope and complexity.\n\nThe best way to get an accurate timeline for your project is to schedule a free consultation.\n\nShall I help arrange that?`,
      quickReplies: ['Book Consultation', 'Get Estimate', 'View Process'],
    };
  }

  // 19. Kerala specific
  if (/\b(kerala|chelakkara|thrissur|kochi|ernakulam|trivandrum|calicut|kozhikode|malappuram)\b/i.test(msg)) {
    return {
      content: `Yes, we're based in **Chelakkara, Thrissur, Kerala** and serve clients across Kerala! 🌴\n\nOur studio is conveniently located and we offer:\n• Free site visits across Kerala\n• On-ground project execution with local expertise\n• Transparent pricing with no travel surcharges\n\nWould you like to schedule a site visit for your location?`,
      quickReplies: ['Book Site Visit', 'Get Directions', 'Contact Us'],
    };
  }

  // 20. Default fallback — try to guide toward services
  return {
    content:
      "Thank you for reaching out! 😊\n\nI'd be happy to help you with information about DOIT's services, projects, design process, pricing, or consultations.\n\nCould you tell me more about what you're looking for? For example:\n• Are you planning a new interior project?\n• Looking for renovation services?\n• Want to know about our pricing approach?\n• Need help booking a consultation?\n\nFeel free to ask anything about our services!",
    quickReplies: ['View Services', 'Our Process', 'Get a Quote', 'Contact Us'],
  };
}

// ── Unique ID generator ──
let idCounter = 0;
function uniqueId() {
  return `msg-${Date.now()}-${++idCounter}`;
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function DoitChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [floatingUIOpen, setFloatingUIOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Listen for FloatingUI toggle events
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setFloatingUIOpen(detail.isOpen);
    };
    window.addEventListener('floatingui-toggle', handler);
    return () => window.removeEventListener('floatingui-toggle', handler);
  }, []);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: uniqueId(),
            role: 'assistant',
            content:
              "Welcome to **DOIT Interior & Civil Solutions**! 👋\n\nI'm your virtual design assistant, here to help you explore our services, understand our process, and get started on your dream project.\n\nHow can I assist you today?",
            timestamp: new Date(),
            quickReplies: ['View Services', 'Our Process', 'Get a Quote', 'About DOIT'],
          },
        ]);
        setIsTyping(false);
      }, 800);
    }
  }, [isOpen, messages.length]);

  // Pulse indicator timeout
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  // Handle send
  const handleSend = useCallback(
    (text?: string) => {
      const messageText = (text || inputValue).trim();
      if (!messageText) return;

      setHasInteracted(true);
      setInputValue('');

      // Add user message
      const userMsg: ChatMessage = {
        id: uniqueId(),
        role: 'user',
        content: messageText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);

      // Simulate typing delay
      setIsTyping(true);
      const delay = 600 + Math.random() * 800;
      setTimeout(() => {
        const response = generateResponse(messageText);
        const botMsg: ChatMessage = {
          id: uniqueId(),
          role: 'assistant',
          content: response.content,
          timestamp: new Date(),
          quickReplies: response.quickReplies,
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, delay);
    },
    [inputValue]
  );

  // Handle quick reply click
  const handleQuickReply = useCallback(
    (reply: string) => {
      // Map quick replies to actual queries
      const queryMap: Record<string, string> = {
        'View Services': 'What services do you offer?',
        'All Services': 'What services do you offer?',
        'Our Services': 'What services do you offer?',
        'Our Process': 'What is your process?',
        'View Process': 'What is your process?',
        'View Our Process': 'What is your process?',
        'Get a Quote': 'How much does it cost?',
        'Get Estimate': 'How much does it cost?',
        'Get Free Estimate': 'How much does it cost?',
        'Get Kitchen Quote': 'How much does a modular kitchen cost?',
        'About DOIT': 'Tell me about DOIT',
        'Contact Us': 'How can I contact you?',
        'Contact Team': 'How can I contact you?',
        'Talk to Our Team': 'How can I contact you?',
        'Book Consultation': 'How do I book a consultation?',
        'Book Free Consultation': 'How do I book a consultation?',
        'Schedule Visit': 'How do I book a site visit?',
        'Book Site Visit': 'How do I book a site visit?',
        'Location & Hours': 'Where is your office located?',
        'Get Directions': 'Where is your office located?',
        'Visit Studio': 'Where is your studio?',
        'View Our Work': 'Show me your portfolio',
        'View Packages': 'What packages do you offer?',
        'View Interior Services': 'Tell me about interior designing',
        'Interior Designing': 'Tell me about interior designing',
        'Civil Contracting': 'Tell me about civil contracting',
        'Renovations': 'Tell me about renovations',
        'Other Services': 'What other services do you offer?',
        'Residential Project': 'I have a residential project',
        'Commercial Project': 'I have a commercial project',
      };

      handleSend(queryMap[reply] || reply);
    },
    [handleSend]
  );

  // Handle WhatsApp / Call quick replies
  const handleActionReply = useCallback((reply: string) => {
    if (reply === 'WhatsApp Us') {
      window.open(WHATSAPP_URL, '_blank');
      return true;
    }
    if (reply === 'Call Us') {
      window.location.href = `tel:+${WHATSAPP_NUMBER}`;
      return true;
    }
    if (reply === 'Email Us') {
      window.location.href = `mailto:${KNOWLEDGE_BASE.location.email}`;
      return true;
    }
    return false;
  }, []);

  // Format message content (simple markdown-like)
  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Bold
      let formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Italic
      formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

      if (line.trim() === '') return <br key={i} />;
      return (
        <p
          key={i}
          className="mb-0.5 last:mb-0"
          dangerouslySetInnerHTML={{ __html: formatted }}
        />
      );
    });
  };

  return (
    <>
      {/* ═══════════════════════════════════════
          CHAT TOGGLE BUTTON
         ═══════════════════════════════════════ */}
      <button
        id="doit-chatbot-toggle"
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPulse(false);
        }}
        className={`fixed bottom-24 right-5 md:bottom-28 md:right-7 z-[95] w-14 h-14 flex items-center justify-center rounded-full transition-all duration-500 shadow-[0_6px_28px_rgba(47,143,179,0.35)] hover:shadow-[0_8px_36px_rgba(47,143,179,0.5)] hover:scale-110 active:scale-95 ${isOpen
            ? 'bg-doit-surface border border-doit-teal/30 rotate-0'
            : 'bg-gradient-to-br from-doit-teal to-doit-deep-blue rotate-0'
          } ${floatingUIOpen && !isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'}`}
        aria-label={isOpen ? 'Close chat' : 'Open DOIT AI Assistant'}
      >
        {/* Pulse ring */}
        {showPulse && !isOpen && !hasInteracted && (
          <>
            <span className="absolute inset-0 rounded-full border-2 border-doit-teal/40 animate-ping" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-doit-teal rounded-full border-2 border-doit-black animate-pulse" />
          </>
        )}

        {isOpen ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-doit-teal transition-transform duration-300"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-white"
          >
            <path d="M12 2C6.48 2 2 5.92 2 10.67c0 2.56 1.33 4.86 3.42 6.42L4 22l4.2-2.28c1.16.36 2.42.56 3.8.56 5.52 0 10-3.92 10-8.61C22 5.92 17.52 2 12 2z" />
            <circle cx="8" cy="11" r="1" fill="currentColor" />
            <circle cx="12" cy="11" r="1" fill="currentColor" />
            <circle cx="16" cy="11" r="1" fill="currentColor" />
          </svg>
        )}
      </button>

      {/* ═══════════════════════════════════════
          CHAT WINDOW
         ═══════════════════════════════════════ */}
      <div
        className={`fixed z-[94] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
          } bottom-[10.5rem] right-5 md:bottom-[11.5rem] md:right-7 w-[calc(100vw-2.5rem)] max-w-[400px]`}
        role="dialog"
        aria-label="DOIT AI Chat Assistant"
      >
        <div className="rounded-2xl overflow-hidden border border-doit-border bg-doit-surface shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(47,143,179,0.08)] backdrop-blur-xl flex flex-col h-[min(500px,60vh)]">
          {/* ── Header ── */}
          <div className="relative px-5 py-4 bg-gradient-to-r from-doit-surface-elevated via-doit-surface-alt to-doit-surface-elevated border-b border-doit-border flex items-center gap-3.5 shrink-0">
            {/* Avatar */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-doit-teal/20 to-doit-deep-blue/20 border border-doit-teal/25 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-doit-teal"
              >
                <path d="M12 2C6.48 2 2 5.92 2 10.67c0 2.56 1.33 4.86 3.42 6.42L4 22l4.2-2.28c1.16.36 2.42.56 3.8.56 5.52 0 10-3.92 10-8.61C22 5.92 17.52 2 12 2z" />
                <path d="M9 10h.01M12 10h.01M15 10h.01" strokeWidth="2.5" />
              </svg>
              {/* Online dot */}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-doit-surface-elevated" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-doit-white tracking-wide font-sans">
                DOIT AI Assistant
              </h3>
              <p className="text-[10px] text-doit-teal/70 tracking-[1.5px] uppercase font-sans">
                Online • Ready to help
              </p>
            </div>

            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-doit-stone/50 hover:text-doit-white hover:bg-doit-teal/10 transition-all duration-300"
              aria-label="Close chat"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* ── Messages ── */}
          <div
            ref={chatContainerRef}
            data-lenis-prevent
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(47,143,179,0.2) transparent',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeSlideUp_0.35s_ease-out]`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed font-sans ${msg.role === 'user'
                      ? 'bg-gradient-to-br from-doit-teal to-doit-deep-blue text-white rounded-br-md shadow-[0_4px_16px_rgba(47,143,179,0.2)]'
                      : 'bg-doit-surface-elevated/80 text-doit-charcoal border border-white/5 rounded-bl-md shadow-[0_2px_12px_rgba(0,0,0,0.15)]'
                    }`}
                >
                  {formatContent(msg.content)}

                  {/* Quick Replies */}
                  {msg.role === 'assistant' && msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                      {msg.quickReplies.map((reply) => (
                        <button
                          key={reply}
                          onClick={() => {
                            if (!handleActionReply(reply)) {
                              handleQuickReply(reply);
                            }
                          }}
                          className="px-3 py-1.5 text-[11px] rounded-full border border-doit-teal/25 text-doit-teal/80 hover:bg-doit-teal/10 hover:text-doit-teal hover:border-doit-teal/50 transition-all duration-300 tracking-wide font-sans whitespace-nowrap"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-[fadeSlideUp_0.3s_ease-out]">
                <div className="bg-doit-surface-elevated/80 border border-white/5 rounded-2xl rounded-bl-md px-5 py-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.15)]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-doit-teal/60 rounded-full animate-[typingDot_1.4s_ease-in-out_infinite]" />
                    <span className="w-2 h-2 bg-doit-teal/60 rounded-full animate-[typingDot_1.4s_ease-in-out_0.2s_infinite]" />
                    <span className="w-2 h-2 bg-doit-teal/60 rounded-full animate-[typingDot_1.4s_ease-in-out_0.4s_infinite]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input ── */}
          <div className="px-4 pb-4 pt-2 border-t border-white/5 bg-doit-surface shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 bg-doit-surface-elevated/60 border border-white/8 rounded-xl px-4 py-3 text-[13px] text-doit-white placeholder:text-doit-stone/40 focus:outline-none focus:border-doit-teal/40 focus:ring-1 focus:ring-doit-teal/20 transition-all duration-300 font-sans"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-doit-teal to-doit-deep-blue text-white flex items-center justify-center transition-all duration-300 hover:shadow-[0_4px_20px_rgba(47,143,179,0.3)] disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shrink-0"
                aria-label="Send message"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
            <p className="text-[9px] text-doit-stone/30 text-center mt-2 tracking-wide font-sans">
              DOIT AI Assistant • Interior & Civil Solutions
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
