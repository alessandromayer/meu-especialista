// =============================================
// MEU ESPECIALISTA — Shared App State & Router
// =============================================
const supabaseUrl = "https://acqpjtxpicmxciswkfra.supabase.co";
const supabaseKey = sb_publishable_qNJCUFUueTE9R5qXjk0irQ_jjdchZxT;

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  const { data, error } = await supabase
    .from("patients")
    .select("*");

  if (error) {
    console.error("Erro ao conectar no Supabase:", error);
  } else {
    console.log("Pacientes:", data);
  }
}

testConnection();
const App = {
  currentPage: 'dashboard',
  currentPatient: null,
  recordingActive: false,
  simulationMode: null,

  pages: {
    dashboard: 'Dashboard',
    crm: 'Pacientes & CRM',
    simulator: 'Simulador 3D',
    prontuario: 'Prontuário com IA',
    agenda: 'Agenda',
    financeiro: 'Financeiro',
    galeria: 'Galeria',
    configuracoes: 'Definições',
  },

  navigate(page, opts = {}) {
    this.currentPage = page;
    this.renderPage(page, opts);
    this.updateNav(page);
    window.scrollTo(0, 0);
  },

  updateNav(page) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.remove('active', 'sim', 'pron');
      if (el.dataset.page === page) {
        el.classList.add('active');
        if (page === 'simulator') el.classList.add('sim');
        if (page === 'prontuario') el.classList.add('pron');
      }
    });
    const title = document.getElementById('topbar-title');
    if (title) title.textContent = this.pages[page] || page;
  },

  renderPage(page, opts = {}) {
    const main = document.getElementById('main-content');
    if (!main) return;
    main.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--muted);font-size:12px;font-family:var(--mono)">Carregando módulo...</div>';
    setTimeout(() => {
      const renderer = PageRenderers[page];
      if (renderer) {
        main.innerHTML = renderer(opts);
        main.classList.add('fade-in');
        PageInit[page] && PageInit[page](opts);
      }
    }, 80);
  }
};

// =============================================
// MOCK DATA
// =============================================
const DB = {
  surgeon: {
    name: 'Dr. Rodrigo Varela',
    spec: 'Cirurgia Plástica Estética',
    initials: 'RV',
    crm: 'CRM/SP 123456',
    clinic: 'Clínica Varela Estética',
    website: 'https://www.clinicavarela.com.br',
    instagram: 'https://www.instagram.com/clinicavarela',
    facebook: 'https://www.facebook.com/clinicavarela',
    whatsapp: 'https://wa.me/5511999999999'
  },

  patients: [
    { id: 1, name: 'Ana Sofia Mendes', age: 34, initials: 'AS', av: 'av-blue', phone: '+55 11 98765-4321', email: 'ana.mendes@email.com', procedure: 'Aumento Mamário', status: 'scheduled', stage: 'pre_op', nextDate: '18 Mar 2026', simType: 'breast', hasSimulation: true, hasProntuario: true, leadSource: 'Instagram', value: 18500 },
    { id: 2, name: 'Beatriz Ferreira', age: 28, initials: 'BF', av: 'av-purple', phone: '+55 11 97654-3210', email: 'beatriz.f@email.com', procedure: 'Rinoplastia', status: 'pending', stage: 'simulation', nextDate: '21 Mar 2026', simType: 'face', hasSimulation: true, hasProntuario: false, leadSource: 'WhatsApp', value: 14000 },
    { id: 3, name: 'Carla Rodrigues', age: 41, initials: 'CR', av: 'av-green', phone: '+55 11 96543-2109', email: 'carla.r@email.com', procedure: 'Lipoaspiração', status: 'consult', stage: 'consult', nextDate: '22 Mar 2026', simType: 'body', hasSimulation: false, hasProntuario: true, leadSource: 'Site', value: 12000 },
    { id: 4, name: 'Maria Oliveira', age: 39, initials: 'MO', av: 'av-red', phone: '+55 11 95432-1098', email: 'maria.o@email.com', procedure: 'Blefaroplastia', status: 'review', stage: 'review', nextDate: '25 Mar 2026', simType: 'face', hasSimulation: true, hasProntuario: true, leadSource: 'Indicação', value: 8500 },
    { id: 5, name: 'Tatiana Nunes', age: 31, initials: 'TN', av: 'av-amber', phone: '+55 11 94321-0987', email: 'tatiana.n@email.com', procedure: 'Abdominoplastia', status: 'done', stage: 'pos_op', nextDate: '12 Mar 2026', simType: 'body', hasSimulation: true, hasProntuario: true, leadSource: 'Google', value: 22000 },
    { id: 6, name: 'Fernanda Castro', age: 36, initials: 'FC', av: 'av-blue', phone: '+55 11 93210-9876', email: 'fernanda.c@email.com', procedure: 'Mamoplastia Redutora', status: 'scheduled', stage: 'pre_op', nextDate: '28 Mar 2026', simType: 'breast', hasSimulation: false, hasProntuario: false, leadSource: 'Instagram', value: 16000 },
    { id: 7, name: 'Juliana Pires', age: 44, initials: 'JP', av: 'av-purple', phone: '+55 11 92109-8765', email: 'juliana.p@email.com', procedure: 'Lifting Facial', status: 'consult', stage: 'lead', nextDate: '30 Mar 2026', simType: 'face', hasSimulation: false, hasProntuario: false, leadSource: 'Indicação', value: 28000 },
    { id: 8, name: 'Priscila Lima', age: 29, initials: 'PL', av: 'av-green', phone: '+55 11 91098-7654', email: 'priscila.l@email.com', procedure: 'Rinoplastia', status: 'done', stage: 'pos_op', nextDate: '05 Mar 2026', simType: 'face', hasSimulation: true, hasProntuario: true, leadSource: 'WhatsApp', value: 14500 },
  ],

  agenda: [
    { time: '09:00', duration: 45, patient: 'Ana Sofia Mendes', type: 'Pré-op · Aumento mamário', color: 'var(--crm)' },
    { time: '10:30', duration: 30, patient: 'Beatriz Ferreira', type: 'Simulação 3D · Rinoplastia', color: 'var(--sim)' },
    { time: '12:00', duration: 60, patient: 'ALMOÇO', type: '', color: 'var(--faint)' },
    { time: '14:00', duration: 60, patient: 'Carla Rodrigues', type: 'Consulta inicial · Lipo', color: 'var(--pron)' },
    { time: '15:30', duration: 45, patient: 'Maria Oliveira', type: 'Revisão pós-op · Blefaroplastia', color: 'var(--ia)' },
    { time: '16:30', duration: 30, patient: 'Nova paciente', type: 'Avaliação inicial · A definir', color: 'var(--muted)' },
  ],

  metrics: {
    patientsMonth: 142,
    patientsGrowth: '+12%',
    activeSims: 37,
    simsNew: '+8',
    conversionRate: 68,
    conversionDelta: '+4pp',
    pendingReview: 5,
    revenue: 'R$ 187.500',
    revenueGrowth: '+22%',
    nps: 72,
    satisfaction: 98
  },

  pipeline: {
    lead:       [{ id: 7, name: 'Juliana Pires', proc: 'Lifting Facial', value: 28000, av: 'av-purple', src: 'Indicação' }],
    consult:    [{ id: 3, name: 'Carla Rodrigues', proc: 'Lipoaspiração', value: 12000, av: 'av-green', src: 'Site' }],
    simulation: [{ id: 2, name: 'Beatriz Ferreira', proc: 'Rinoplastia', value: 14000, av: 'av-purple', src: 'WhatsApp' }],
    pre_op:     [{ id: 1, name: 'Ana Sofia Mendes', proc: 'Aumento Mamário', value: 18500, av: 'av-blue', src: 'Instagram' }, { id: 6, name: 'Fernanda Castro', proc: 'Mamoplastia', value: 16000, av: 'av-blue', src: 'Instagram' }],
    pos_op:     [{ id: 5, name: 'Tatiana Nunes', proc: 'Abdominoplastia', value: 22000, av: 'av-amber', src: 'Google' }, { id: 8, name: 'Priscila Lima', proc: 'Rinoplastia', value: 14500, av: 'av-green', src: 'WhatsApp' }],
  },
};

// =============================================
// UTILITY FUNCTIONS
// =============================================
function statusTag(status) {
  const map = {
    scheduled: ['tag-scheduled', 'Agendada'],
    pending: ['tag-pending', 'Pendente'],
    consult: ['tag-consult', 'Consulta'],
    review: ['tag-pending', 'Revisão'],
    done: ['tag-done', 'Concluído'],
    cancelled: ['tag-cancelled', 'Cancelado'],
  };
  const [cls, label] = map[status] || ['tag-consult', status];
  return `<span class="tag ${cls}">${label}</span>`;
}

function simIcon(type, size = 40) {
  const icons = {
    breast: `<svg width="${size*0.7}" height="${size*0.7}" viewBox="0 0 28 28" fill="none"><ellipse cx="11" cy="17" rx="4" ry="3.5" fill="rgba(167,139,250,.3)" stroke="var(--sim)" stroke-width="1"/><ellipse cx="17" cy="17" rx="4" ry="3.5" fill="rgba(167,139,250,.3)" stroke="var(--sim)" stroke-width="1"/></svg>`,
    face: `<svg width="${size*0.7}" height="${size*0.7}" viewBox="0 0 28 28" fill="none"><ellipse cx="14" cy="13" rx="6" ry="7" fill="rgba(79,156,249,.2)" stroke="var(--crm)" stroke-width="1"/><path d="M11 16 Q14 19 17 16" fill="none" stroke="var(--crm)" stroke-width="1"/><circle cx="11.5" cy="12" r="1" fill="var(--crm)" opacity=".7"/><circle cx="16.5" cy="12" r="1" fill="var(--crm)" opacity=".7"/></svg>`,
    body: `<svg width="${size*0.7}" height="${size*0.7}" viewBox="0 0 28 28" fill="none"><rect x="9" y="6" width="10" height="17" rx="5" fill="rgba(52,211,153,.2)" stroke="var(--pron)" stroke-width="1"/><path d="M9 15 Q14 13 19 15" fill="none" stroke="var(--pron)" stroke-width="1"/></svg>`,
  };
  return icons[type] || icons.body;
}

function formatCurrency(v) {
  return 'R$ ' + v.toLocaleString('pt-BR');
}

function initials(name) {
  return name.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
}
