// =============================================
// PAGE RENDERERS — All modules of Meu Especialista
// =============================================

const PageRenderers = {};
const PageInit = {};

// =============================================
// 1. DASHBOARD
// =============================================
PageRenderers.dashboard = () => `
<div class="page">
  <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between">
    <div>
      <div class="page-title">Bom dia, Dr. Varela 👋</div>
      <div class="page-sub">Sábado, 14 de Março de 2026 · 3 consultas hoje</div>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-ghost btn-sm" onclick="App.navigate('simulator')">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6.5 1.5l1.5 4h4l-3 2.5 1 4-3.5-2.5-3.5 2.5 1-4-3-2.5h4z"/></svg>
        Nova Simulação
      </button>
      <button class="btn btn-primary btn-sm" onclick="App.navigate('prontuario')">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6.5 1.5a4 4 0 014 4v3a4 4 0 01-8 0v-3a4 4 0 014-4z"/><path d="M3 7a3.5 3.5 0 007 0M6.5 10.5v1.5M5 12h3"/></svg>
        Iniciar Consulta IA
      </button>
    </div>
  </div>

  <div class="ai-strip" style="margin-bottom:22px">
    <div class="ai-strip-icon">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" stroke-width="1.6"><circle cx="9" cy="9" r="7"/><path d="M6 9h6M9 6v6"/></svg>
    </div>
    <div style="flex:1">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px">
        <span class="ai-pill">IA ATIVA</span>
        <span style="font-size:12px;font-weight:500">Motor de inteligência ativo</span>
      </div>
      <div style="font-size:11px;color:var(--muted)">3 leads qualificados esta manhã · Beatriz aguarda simulação 3D · 2 follow-ups agendados para hoje</div>
    </div>
    <button class="btn btn-ghost btn-sm" onclick="App.navigate('crm')">Ver pipeline →</button>
  </div>

  <div class="grid-4" style="margin-bottom:22px">
    <div class="metric-card blue">
      <div class="metric-label">Pacientes — Março</div>
      <div class="metric-value">142<span class="metric-unit"> pac</span></div>
      <div class="metric-delta delta-up">↑ 12% vs Fevereiro</div>
      <div class="metric-bar"><div class="metric-bar-fill" style="width:71%;background:var(--crm)"></div></div>
    </div>
    <div class="metric-card purple">
      <div class="metric-label">Simulações 3D ativas</div>
      <div class="metric-value">37<span class="metric-unit"> sim</span></div>
      <div class="metric-delta delta-up">↑ 8 esta semana</div>
      <div class="metric-bar"><div class="metric-bar-fill" style="width:37%;background:var(--sim)"></div></div>
    </div>
    <div class="metric-card green">
      <div class="metric-label">Receita — Março</div>
      <div class="metric-value" style="font-size:20px;letter-spacing:-.5px">187k<span class="metric-unit"> R$</span></div>
      <div class="metric-delta delta-up">↑ 22% vs Fevereiro</div>
      <div class="metric-bar"><div class="metric-bar-fill" style="width:65%;background:var(--pron)"></div></div>
    </div>
    <div class="metric-card amber">
      <div class="metric-label">Conversão pós-3D</div>
      <div class="metric-value">68<span class="metric-unit"> %</span></div>
      <div class="metric-delta delta-up">↑ 4pp com simulação</div>
      <div class="metric-bar"><div class="metric-bar-fill" style="width:68%;background:var(--ia)"></div></div>
    </div>
  </div>

  <div class="grid-main">
    <div>
      <!-- PATIENTS TABLE -->
      <div class="card" style="margin-bottom:18px">
        <div class="card-header">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="var(--crm)" stroke-width="1.5"><circle cx="6" cy="5" r="3"/><path d="M1 13c0-2.76 2.24-5 5-5s5 2.24 5 5"/><circle cx="12" cy="7" r="2"/><path d="M12 11c1.66 0 3 1.34 3 3"/></svg>
          <span class="card-title">Pacientes recentes</span>
          <button class="btn btn-ghost btn-sm" onclick="App.navigate('crm')">Ver todos →</button>
        </div>
        <table>
          <thead><tr>
            <th>Paciente</th><th>Procedimento</th><th>Simulação</th><th>Status</th><th>Próxima consulta</th><th></th>
          </tr></thead>
          <tbody>
            ${DB.patients.slice(0,5).map(p => `
            <tr onclick="App.navigate('crm',{patientId:${p.id}})">
              <td><div style="display:flex;align-items:center;gap:10px">
                <div class="avatar ${p.av}">${p.initials}</div>
                <div><div style="font-weight:500;font-size:13px">${p.name}</div><div style="font-size:10px;color:var(--muted)">${p.age} anos</div></div>
              </div></td>
              <td>${p.procedure}</td>
              <td>
                <div style="width:44px;height:44px;border-radius:8px;background:var(--s2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;${!p.hasSimulation?'opacity:.3':''}">
                  ${simIcon(p.simType)}
                </div>
              </td>
              <td>${statusTag(p.status)}</td>
              <td style="font-family:var(--mono);font-size:11px;color:var(--muted)">${p.nextDate}</td>
              <td><button class="btn btn-ghost btn-sm" onclick="event.stopPropagation();App.navigate('crm',{patientId:${p.id}})">Ver →</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <!-- MINI CHART -->
      <div class="card">
        <div class="card-header">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--ia)" stroke-width="1.5"><path d="M1 10l3-4 3 2 3-5 3 3"/></svg>
          <span class="card-title">Simulações por semana (Março)</span>
          <div style="display:flex;gap:12px;font-size:10px;color:var(--muted)">
            <span><span style="display:inline-block;width:8px;height:8px;background:var(--sim);border-radius:2px;margin-right:4px"></span>Novas</span>
            <span><span style="display:inline-block;width:8px;height:8px;background:var(--crm);border-radius:2px;margin-right:4px"></span>Revistas</span>
          </div>
        </div>
        <div style="padding:16px 20px 20px">
          <div style="display:flex;align-items:flex-end;gap:8px;height:80px">
            ${[{a:40,b:20},{a:55,b:28},{a:35,b:18},{a:70,b:35},{a:48,b:24},{a:62,b:30},{a:80,b:40}].map((w,i) => `
            <div style="flex:1;display:flex;flex-direction:column;gap:3px;align-items:center">
              <div style="width:100%;height:${w.a}px;background:var(--sim);border-radius:4px 4px 0 0;opacity:.85"></div>
              <div style="width:100%;height:${w.b}px;background:var(--crm);border-radius:4px 4px 0 0;opacity:.6;margin-top:-${w.b+3}px"></div>
            </div>`).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--muted);margin-top:8px;font-family:var(--mono)">
            ${['Sem 8','Sem 9','Sem 10','Sem 11','Sem 12','Sem 13','Sem 14'].map(w=>`<span>${w}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT COLUMN -->
    <div style="display:flex;flex-direction:column;gap:18px">
      <!-- AGENDA HOJE -->
      <div class="card">
        <div class="card-header">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--pron)" stroke-width="1.5"><rect x="1" y="2" width="12" height="10" rx="1.5"/><path d="M4 1v2M10 1v2M1 6h12"/></svg>
          <span class="card-title">Agenda de hoje</span>
          <button class="btn btn-ghost btn-sm" onclick="App.navigate('agenda')">Agenda →</button>
        </div>
        <div style="padding:4px 16px">
          ${DB.agenda.filter(a => a.patient !== 'ALMOÇO').map(a => `
          <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
            <div style="background:rgba(79,156,249,.08);border:1px solid rgba(79,156,249,.15);color:var(--crm);font-family:var(--mono);font-size:11px;padding:4px 7px;border-radius:6px;min-width:44px;text-align:center">${a.time}</div>
            <div style="flex:1">
              <div style="font-size:12px;font-weight:500">${a.patient}</div>
              ${a.type ? `<div style="font-size:10px;color:var(--muted)">${a.type}</div>` : ''}
            </div>
            <div style="font-size:10px;color:var(--muted);font-family:var(--mono)">${a.duration}min</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- QUICK ACTIONS -->
      <div class="card">
        <div class="card-header"><span class="card-title">Acesso rápido</span></div>
        <div style="padding:14px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${[
            ['simulator','var(--sim)','🫁','Simular 3D'],
            ['prontuario','var(--pron)','🎙️','Consulta IA'],
            ['crm','var(--crm)','📊','Pipeline'],
            ['agenda','var(--ia)','📅','Agenda'],
          ].map(([page,color,icon,label]) => `
          <div onclick="App.navigate('${page}')" style="background:var(--s2);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center;cursor:pointer;transition:all .2s" onmouseover="this.style.borderColor='${color}'" onmouseout="this.style.borderColor='var(--border)'">
            <div style="font-size:20px;margin-bottom:6px">${icon}</div>
            <div style="font-size:11px;font-weight:500;color:${color}">${label}</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- CANAIS -->
      <div class="card">
        <div class="card-header"><span class="card-title">Canais da clínica</span></div>
        <div style="padding:14px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <a class="btn btn-ghost btn-sm" href="${DB.surgeon.website}" target="_blank" rel="noopener noreferrer" style="justify-content:center">🌐 Website</a>
          <a class="btn btn-ghost btn-sm" href="${DB.surgeon.instagram}" target="_blank" rel="noopener noreferrer" style="justify-content:center">📸 Instagram</a>
          <a class="btn btn-ghost btn-sm" href="${DB.surgeon.facebook}" target="_blank" rel="noopener noreferrer" style="justify-content:center">📘 Facebook</a>
          <a class="btn btn-ghost btn-sm" href="${DB.surgeon.whatsapp}" target="_blank" rel="noopener noreferrer" style="justify-content:center">💬 WhatsApp</a>
        </div>
      </div>

      <!-- NPS -->
      <div class="card">
        <div class="card-header"><span class="card-title">Satisfação dos pacientes</span></div>
        <div style="padding:16px 20px">
          <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:10px">
            <span style="font-size:38px;font-weight:300;font-family:var(--mono);color:var(--pron)">98</span>
            <div><div style="font-size:12px;font-weight:500">% recomendam</div><div style="font-size:10px;color:var(--muted)">312 avaliações coletadas</div></div>
          </div>
          <div style="height:5px;background:var(--border);border-radius:3px;overflow:hidden;margin-bottom:10px">
            <div style="width:98%;height:100%;background:linear-gradient(90deg,var(--pron),var(--crm));border-radius:3px"></div>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11px">
            <span style="color:var(--muted)">Expectativa alinhada: <b style="color:var(--text)">94%</b></span>
            <span style="color:var(--pron);font-weight:600">NPS +72</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

// =============================================
// 2. CRM — Pipeline + Patient List + Detail
// =============================================
PageRenderers.crm = (opts = {}) => {
  if (opts.patientId) return renderPatientDetail(opts.patientId);
  return renderCRMMain();
};

function renderCRMMain() {
  const stageLabels = { lead:'Lead', consult:'Consulta', simulation:'Simulação', pre_op:'Pré-op', pos_op:'Pós-op' };
  const stageColors = { lead:'var(--ia)', consult:'var(--sim)', simulation:'var(--sim)', pre_op:'var(--crm)', pos_op:'var(--pron)' };

  const totalValue = Object.values(DB.pipeline).flat().reduce((s,p) => s + p.value, 0);

  return `
<div class="page">
  <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between">
    <div>
      <div class="page-title">CRM — Pipeline de Pacientes</div>
      <div class="page-sub">${Object.values(DB.pipeline).flat().length} pacientes ativos · Pipeline total: <strong style="color:var(--pron)">${formatCurrency(totalValue)}</strong></div>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-ghost btn-sm">Exportar</button>
      <button class="btn btn-primary btn-sm" onclick="showAddPatient()">+ Novo Paciente</button>
    </div>
  </div>

  <!-- PIPELINE TABS -->
  <div style="display:flex;gap:8px;margin-bottom:20px;overflow-x:auto;padding-bottom:4px">
    <button id="tab-pipeline" class="btn btn-primary btn-sm" onclick="switchTab('pipeline')">Pipeline Kanban</button>
    <button id="tab-list" class="btn btn-ghost btn-sm" onclick="switchTab('list')">Lista Completa</button>
    <button id="tab-analytics" class="btn btn-ghost btn-sm" onclick="switchTab('analytics')">Analytics</button>
    <div style="flex:1"></div>
    <div style="display:flex;align-items:center;gap:8px">
      <input class="input" style="width:180px;padding:6px 10px;font-size:11px" placeholder="🔍 Buscar paciente...">
      <select class="input select" style="width:140px;padding:6px 10px;font-size:11px">
        <option>Todos os procedimentos</option>
        <option>Rinoplastia</option>
        <option>Aumento mamário</option>
        <option>Lipoaspiração</option>
      </select>
    </div>
  </div>

  <div id="crm-tab-content">
    <!-- KANBAN PIPELINE -->
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;align-items:start">
      ${Object.entries(DB.pipeline).map(([stage, patients]) => `
      <div style="background:var(--s1);border:1px solid var(--border);border-radius:14px;overflow:hidden">
        <div style="padding:12px 14px;border-bottom:1px solid var(--border);background:var(--s2)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
            <span style="font-size:11px;font-weight:600;color:${stageColors[stage]}">${stageLabels[stage]}</span>
            <span style="font-size:10px;background:var(--s3);color:var(--muted);padding:2px 7px;border-radius:20px;font-family:var(--mono)">${patients.length}</span>
          </div>
          <div style="font-size:10px;color:var(--muted);font-family:var(--mono)">${formatCurrency(patients.reduce((s,p)=>s+p.value,0))}</div>
        </div>
        <div style="padding:10px;display:flex;flex-direction:column;gap:8px;min-height:80px">
          ${patients.map(p => `
          <div onclick="App.navigate('crm',{patientId:${p.id}})" style="background:var(--s2);border:1px solid var(--border);border-radius:10px;padding:11px;cursor:pointer;transition:all .15s" onmouseover="this.style.borderColor='${stageColors[stage]}'" onmouseout="this.style.borderColor='var(--border)'">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
              <div class="avatar ${p.av}" style="width:28px;height:28px;font-size:10px">${initials(p.name)}</div>
              <div style="font-size:11px;font-weight:500;line-height:1.3">${p.name}</div>
            </div>
            <div style="font-size:10px;color:var(--muted);margin-bottom:6px">${p.proc}</div>
            <div style="display:flex;align-items:center;justify-content:space-between">
              <span style="font-size:10px;font-family:var(--mono);color:var(--pron)">${formatCurrency(p.value)}</span>
              <span style="font-size:9px;color:var(--muted);background:var(--s3);padding:2px 6px;border-radius:4px">${p.src}</span>
            </div>
          </div>`).join('')}
          <button style="width:100%;padding:8px;border:1px dashed var(--border);border-radius:8px;background:transparent;color:var(--muted);font-size:11px;cursor:pointer;transition:all .15s;font-family:var(--font)" onmouseover="this.style.borderColor='${stageColors[stage]}';this.style.color='${stageColors[stage]}'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--muted)'">+ Adicionar</button>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- LEAD CAPTURE STRIP -->
  <div style="margin-top:22px;background:var(--s1);border:1px solid var(--border);border-radius:14px;padding:18px 20px">
    <div style="display:flex;align-items:center;gap:16px">
      <div style="font-size:13px;font-weight:600">Canais de captação ativos</div>
      <div style="flex:1"></div>
      ${[
        ['WhatsApp','var(--pron)','3 leads hoje'],
        ['Instagram','var(--sim)','2 leads hoje'],
        ['Site','var(--crm)','1 lead hoje'],
        ['Indicação','var(--ia)','2 leads hoje'],
        ['Google','var(--muted)','0 leads hoje'],
      ].map(([name,color,count]) => `
      <div style="display:flex;align-items:center;gap:7px;background:var(--s2);border:1px solid var(--border);border-radius:8px;padding:7px 12px">
        <span style="width:7px;height:7px;border-radius:50%;background:${color};display:inline-block"></span>
        <span style="font-size:11px;font-weight:500">${name}</span>
        <span style="font-size:10px;color:var(--muted)">${count}</span>
      </div>`).join('')}
      <button class="btn btn-ghost btn-sm">Gerir canais</button>
    </div>
  </div>
</div>`;
}

function renderPatientDetail(id) {
  const p = DB.patients.find(x => x.id === id);
  if (!p) return '<div class="page"><div class="page-title">Paciente não encontrado</div></div>';
  return `
<div class="page">
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:22px">
    <button class="btn btn-ghost btn-sm" onclick="App.navigate('crm')">← Voltar</button>
    <div style="flex:1"></div>
    <button class="btn btn-ghost btn-sm" onclick="App.navigate('simulator')">🫁 Simulação 3D</button>
    <button class="btn btn-pron btn-sm" onclick="App.navigate('prontuario')">🎙️ Iniciar Consulta</button>
  </div>

  <div class="grid-2" style="gap:20px">
    <!-- LEFT: PATIENT INFO -->
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card">
        <div class="card-body">
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:18px">
            <div class="avatar ${p.av}" style="width:56px;height:56px;font-size:18px;font-weight:700">${p.initials}</div>
            <div>
              <div style="font-size:18px;font-weight:700">${p.name}</div>
              <div style="font-size:12px;color:var(--muted)">${p.age} anos · ${p.procedure}</div>
              <div style="margin-top:6px">${statusTag(p.status)}</div>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${[['📱',p.phone],['✉️',p.email],['📍','São Paulo, SP'],['📋',p.procedure],['💰',formatCurrency(p.value)],['📣',p.leadSource]].map(([icon,val])=>`
            <div style="background:var(--s2);border-radius:8px;padding:10px;font-size:11px">
              <span style="margin-right:6px">${icon}</span>${val}
            </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- TIMELINE -->
      <div class="card">
        <div class="card-header"><span class="card-title">Histórico</span></div>
        <div style="padding:16px 20px">
          ${[
            {date:'12 Mar 2026',label:'Pós-op revisado',type:'pron',icon:'📋'},
            {date:'05 Mar 2026',label:'Simulação 3D aprovada',type:'sim',icon:'🫁'},
            {date:'28 Fev 2026',label:'Prontuário criado',type:'pron',icon:'🎙️'},
            {date:'20 Fev 2026',label:'Primeira consulta',type:'crm',icon:'👤'},
            {date:'15 Fev 2026',label:'Lead via Instagram',type:'crm',icon:'📣'},
          ].map((e,i) => `
          <div style="display:flex;gap:12px;padding:8px 0;${i>0?'border-top:1px solid var(--border)':''}">
            <div style="font-size:16px">${e.icon}</div>
            <div style="flex:1">
              <div style="font-size:12px;font-weight:500">${e.label}</div>
              <div style="font-size:10px;color:var(--muted);font-family:var(--mono)">${e.date}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <!-- RIGHT: SIMULATION + PRONTUARIO PREVIEW -->
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="card">
        <div class="card-header">
          <span class="card-title">Simulação 3D</span>
          <span class="ai-pill">3D ATIVO</span>
        </div>
        <div style="margin:0 16px 16px;background:var(--s2);border-radius:10px;border:1px solid var(--border);height:180px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">
          <div id="sim-canvas-detail" style="position:relative;width:120px;height:140px">
            ${renderBodySVG(p.simType)}
          </div>
          <div style="position:absolute;top:8px;left:10px;font-size:9px;color:var(--muted);font-family:var(--mono);letter-spacing:.5px">MODELO 3D</div>
          <div style="position:absolute;top:8px;right:10px;font-size:9px;background:var(--sim-dim);color:var(--sim);padding:2px 7px;border-radius:4px;font-family:var(--mono)">${p.procedure.toUpperCase()}</div>
          ${!p.hasSimulation ? `<div style="position:absolute;inset:0;background:rgba(7,9,15,.7);display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px">
            <div style="font-size:12px;color:var(--muted)">Simulação não criada</div>
            <button class="btn btn-sim btn-sm" onclick="App.navigate('simulator')">Criar simulação →</button>
          </div>` : ''}
        </div>
        <div style="padding:0 16px 16px;display:flex;gap:8px">
          <button class="btn btn-ghost btn-sm" style="flex:1" onclick="App.navigate('simulator')">Editar simulação</button>
          <button class="btn btn-ghost btn-sm">Partilhar</button>
        </div>
      </div>

      <!-- PRONTUARIO PREVIEW -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Prontuário</span>
          ${p.hasProntuario ? '<span class="tag tag-done">Completo</span>' : '<span class="tag tag-pending">Pendente</span>'}
        </div>
        <div style="padding:14px 16px">
          ${p.hasProntuario ? `
          <div style="font-size:11px;color:var(--muted);line-height:1.7;margin-bottom:12px">
            <strong style="color:var(--text)">Queixa principal:</strong> Desejo de ${p.procedure.toLowerCase()} por questões estéticas e autoestima.<br>
            <strong style="color:var(--text)">Histórico:</strong> Sem patologias relevantes. Nega uso de anticoagulantes.<br>
            <strong style="color:var(--text)">Conduta:</strong> Procedimento aprovado. Pré-operatório solicitado.
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-ghost btn-sm" onclick="App.navigate('prontuario')">Ver prontuário completo</button>
            <button class="btn btn-pron btn-sm" onclick="App.navigate('prontuario')">Nova consulta</button>
          </div>` : `
          <div style="text-align:center;padding:20px 0;color:var(--muted);font-size:12px">
            <div style="margin-bottom:10px">Nenhum prontuário ainda</div>
            <button class="btn btn-pron btn-sm" onclick="App.navigate('prontuario')">🎙️ Iniciar consulta com IA</button>
          </div>`}
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function renderBodySVG(type) {
  if (type === 'breast') return `<svg viewBox="0 0 120 140" width="120" height="140" fill="none">
    <ellipse cx="60" cy="45" rx="20" ry="25" fill="rgba(167,139,250,.1)" stroke="var(--sim)" stroke-width="1"/>
    <ellipse cx="42" cy="100" rx="16" ry="13" fill="rgba(167,139,250,.25)" stroke="var(--sim)" stroke-width="1.5"/>
    <ellipse cx="78" cy="100" rx="16" ry="13" fill="rgba(167,139,250,.25)" stroke="var(--sim)" stroke-width="1.5"/>
    <path d="M44 113 Q60 122 76 113" fill="none" stroke="var(--sim)" stroke-width=".8" opacity=".5"/>
  </svg>`;
  if (type === 'face') return `<svg viewBox="0 0 120 140" width="120" height="140" fill="none">
    <ellipse cx="60" cy="65" rx="30" ry="38" fill="rgba(79,156,249,.1)" stroke="var(--crm)" stroke-width="1.2"/>
    <ellipse cx="47" cy="58" rx="6" ry="4" fill="rgba(79,156,249,.2)"/>
    <ellipse cx="73" cy="58" rx="6" ry="4" fill="rgba(79,156,249,.2)"/>
    <path d="M52 80 Q60 87 68 80" fill="none" stroke="var(--crm)" stroke-width="1.2"/>
    <path d="M55 45 Q60 40 65 45" fill="none" stroke="var(--crm)" stroke-width=".8" opacity=".6"/>
  </svg>`;
  return `<svg viewBox="0 0 120 140" width="120" height="140" fill="none">
    <rect x="35" y="20" width="50" height="100" rx="25" fill="rgba(52,211,153,.1)" stroke="var(--pron)" stroke-width="1.2"/>
    <path d="M35 70 Q60 62 85 70" fill="none" stroke="var(--pron)" stroke-width="1" opacity=".6"/>
    <ellipse cx="60" cy="35" rx="18" ry="16" fill="rgba(52,211,153,.15)" stroke="var(--pron)" stroke-width="1"/>
  </svg>`;
}

PageInit.crm = (opts) => {
  if (!opts.patientId) {
    window.switchTab = function(tab) {
      ['pipeline','list','analytics'].forEach(t => {
        document.getElementById('tab-'+t).className = t === tab ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm';
      });
    };
    window.showAddPatient = function() {
      alert('Modal de novo paciente — em desenvolvimento');
    };
  }
};

// =============================================
// 3. SIMULATOR 3D
// =============================================
PageRenderers.simulator = () => `
<div class="page">
  <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between">
    <div>
      <div class="page-title">Simulador 3D</div>
      <div class="page-sub">Motor de IA generativa · Mama · Rosto · Corpo</div>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-ghost btn-sm">Galeria de casos</button>
      <button class="btn btn-sim btn-sm">Exportar simulação</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:260px 1fr 260px;gap:16px;height:calc(100vh - 200px);min-height:500px">

    <!-- LEFT CONTROLS -->
    <div style="display:flex;flex-direction:column;gap:14px;overflow-y:auto">
      <!-- PATIENT SELECT -->
      <div class="card">
        <div class="card-header"><span class="card-title">Paciente</span></div>
        <div style="padding:12px">
          <select class="input select" style="margin-bottom:10px" id="sim-patient-select">
            <option value="">— Selecionar paciente —</option>
            ${DB.patients.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
          </select>
          <div id="sim-patient-info" style="display:none;background:var(--s2);border-radius:8px;padding:10px;font-size:11px">
            <div style="font-weight:500" id="sim-patient-name"></div>
            <div style="color:var(--muted)" id="sim-patient-proc"></div>
          </div>
        </div>
      </div>

      <!-- PROCEDURE TYPE -->
      <div class="card">
        <div class="card-header"><span class="card-title">Tipo de simulação</span></div>
        <div style="padding:12px;display:flex;flex-direction:column;gap:6px">
          ${[
            ['breast','🫁','Mama','Aumento, redução, ptose'],
            ['face','👤','Rosto','Rinoplastia, lábios, queixo'],
            ['body','🫀','Corpo','Lipo, abdomino, gluteo'],
          ].map(([type,icon,label,sub]) => `
          <div id="simtype-${type}" onclick="selectSimType('${type}')" style="background:var(--s2);border:1px solid var(--border);border-radius:9px;padding:11px;cursor:pointer;transition:all .2s">
            <div style="display:flex;align-items:center;gap:9px">
              <span style="font-size:16px">${icon}</span>
              <div>
                <div style="font-size:12px;font-weight:500">${label}</div>
                <div style="font-size:10px;color:var(--muted)">${sub}</div>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- PARAMETERS -->
      <div class="card" id="sim-params">
        <div class="card-header"><span class="card-title">Parâmetros</span></div>
        <div style="padding:14px" id="sim-params-body">
          <div style="font-size:11px;color:var(--muted);text-align:center;padding:20px 0">Selecione o tipo de simulação</div>
        </div>
      </div>
    </div>

    <!-- CENTER: 3D CANVAS -->
    <div style="display:flex;flex-direction:column;gap:12px">
      <!-- UPLOAD / CANVAS -->
      <div class="card" style="flex:1;display:flex;flex-direction:column">
        <div style="display:flex;align-items:center;gap:8px;padding:12px 16px;border-bottom:1px solid var(--border)">
          <div style="display:flex;gap:4px">
            ${['Anterior','Lateral D','Lateral E','Posterior'].map((v,i)=>`
            <button id="view-btn-${i}" onclick="setView(${i})" class="btn btn-ghost btn-sm" style="font-size:10px;padding:4px 9px;${i===0?'background:var(--s3);color:var(--text)':''}">${v}</button>`).join('')}
          </div>
          <div style="flex:1"></div>
          <div style="font-size:10px;color:var(--muted);font-family:var(--mono)" id="sim-mode-label">MODO UPLOAD</div>
          <button class="btn btn-ghost btn-sm" style="font-size:10px" onclick="toggleCompare()">◑ Comparar</button>
        </div>
        <div style="flex:1;position:relative;background:var(--s2);border-radius:0 0 14px 14px;overflow:hidden;display:flex;align-items:center;justify-content:center" id="sim-viewport">
          <!-- UPLOAD STATE -->
          <div id="upload-state" style="text-align:center;padding:40px">
            <div style="font-size:40px;margin-bottom:16px">📷</div>
            <div style="font-size:14px;font-weight:500;margin-bottom:8px">Carregue 3 fotos para gerar o modelo 3D</div>
            <div style="font-size:11px;color:var(--muted);margin-bottom:20px">Frontal · Lateral direita · Lateral esquerda</div>
            <div style="display:flex;gap:10px;justify-content:center;margin-bottom:20px">
              ${['Frontal','Lateral D','Lateral E'].map((v,i) => `
              <div id="upload-slot-${i}" onclick="simulateUpload(${i})" style="width:80px;height:100px;border:1.5px dashed var(--border);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;transition:all .2s;font-size:10px;color:var(--muted)" onmouseover="this.style.borderColor='var(--sim)'" onmouseout="this.style.borderColor=this.dataset.filled?'var(--pron)':'var(--border)'">
                <span style="font-size:20px">+</span>${v}
              </div>`).join('')}
            </div>
            <button class="btn btn-sim" id="generate-btn" style="display:none" onclick="generateModel()">
              ✨ Gerar Modelo 3D com IA
            </button>
          </div>
          <!-- MODEL STATE (hidden initially) -->
          <div id="model-state" style="display:none;width:100%;height:100%;position:relative">
            <canvas id="sim-3d-canvas" style="width:100%;height:100%"></canvas>
            <div id="sim-3d-fallback" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center">
              <div id="body-model-render" style="position:relative">
                <!-- Dynamic body render -->
              </div>
            </div>
            <!-- COMPARE OVERLAY (hidden) -->
            <div id="compare-overlay" style="display:none;position:absolute;inset:0;display:flex">
              <div style="flex:1;border-right:2px solid var(--sim);position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;background:var(--s2)">
                <div style="position:absolute;top:8px;left:10px;font-size:9px;background:rgba(0,0,0,.5);color:var(--muted);padding:2px 7px;border-radius:4px;font-family:var(--mono)">ANTES</div>
                <svg viewBox="0 0 120 180" width="120" height="180" fill="none">
                  <rect x="35" y="20" width="50" height="140" rx="25" fill="rgba(52,211,153,.06)" stroke="var(--border)" stroke-width="1.2"/>
                </svg>
              </div>
              <div style="flex:1;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center;background:var(--s2)">
                <div style="position:absolute;top:8px;left:10px;font-size:9px;background:rgba(0,0,0,.5);color:var(--sim);padding:2px 7px;border-radius:4px;font-family:var(--mono)">DEPOIS</div>
                <div id="compare-after-model"></div>
              </div>
            </div>
          </div>
          <!-- GENERATING OVERLAY -->
          <div id="generating-overlay" style="display:none;position:absolute;inset:0;background:rgba(7,9,15,.85);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px">
            <div id="gen-spinner" style="width:40px;height:40px;border:3px solid var(--border);border-top-color:var(--sim);border-radius:50%"></div>
            <div style="font-size:13px;font-weight:500">Gerando modelo 3D com IA...</div>
            <div id="gen-progress-bar" style="width:200px;height:3px;background:var(--border);border-radius:2px;overflow:hidden">
              <div id="gen-bar-fill" style="height:100%;width:0%;background:var(--sim);transition:width .3s;border-radius:2px"></div>
            </div>
            <div id="gen-step" style="font-size:10px;color:var(--muted);font-family:var(--mono)">Analisando pontos faciais...</div>
          </div>
        </div>
      </div>

      <!-- BOTTOM CONTROLS -->
      <div class="card">
        <div style="padding:12px 16px;display:flex;align-items:center;gap:12px">
          <button class="btn btn-ghost btn-sm" onclick="resetSim()">↩ Resetar</button>
          <div style="flex:1;display:flex;gap:8px;align-items:center">
            <span style="font-size:10px;color:var(--muted)">Zoom</span>
            <input type="range" min="50" max="200" value="100" style="flex:1;accent-color:var(--sim)" id="zoom-slider">
            <span id="zoom-val" style="font-size:10px;font-family:var(--mono);color:var(--muted);min-width:32px">100%</span>
          </div>
          <button class="btn btn-ghost btn-sm" onclick="App.navigate('prontuario')">Vincular ao prontuário</button>
          <button class="btn btn-sim btn-sm" id="save-sim-btn" onclick="saveSim()">💾 Guardar simulação</button>
        </div>
      </div>
    </div>

    <!-- RIGHT: HISTORY + SHARE -->
    <div style="display:flex;flex-direction:column;gap:14px;overflow-y:auto">
      <div class="card">
        <div class="card-header"><span class="card-title">Notas da simulação</span></div>
        <div style="padding:12px">
          <textarea class="input textarea" placeholder="Anotações para esta simulação..." style="font-size:11px;min-height:100px"></textarea>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Partilhar com paciente</span></div>
        <div style="padding:14px;display:flex;flex-direction:column;gap:8px">
          ${[['📱 WhatsApp','var(--pron)'],['✉️ Email','var(--crm)'],['🔗 Link seguro','var(--sim)']].map(([label,color])=>`
          <button class="btn btn-ghost btn-sm" style="justify-content:flex-start;color:${color};border-color:${color}22">${label}</button>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Simulações recentes</span></div>
        <div style="padding:10px 12px;display:flex;flex-direction:column;gap:8px">
          ${DB.patients.filter(p => p.hasSimulation).slice(0,4).map(p => `
          <div style="display:flex;align-items:center;gap:9px;padding:7px;border-radius:7px;cursor:pointer;background:var(--s2)" onclick="loadPatientSim(${p.id})">
            <div style="width:36px;height:36px;border-radius:7px;background:var(--s3);border:1px solid var(--border);display:flex;align-items:center;justify-content:center">${simIcon(p.simType, 28)}</div>
            <div style="flex:1">
              <div style="font-size:11px;font-weight:500">${p.name}</div>
              <div style="font-size:10px;color:var(--muted)">${p.procedure}</div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>`;

PageInit.simulator = () => {
  let uploadCount = 0;
  let currentType = null;
  let comparing = false;

  window.selectSimType = function(type) {
    currentType = type;
    document.querySelectorAll('[id^="simtype-"]').forEach(el => {
      el.style.borderColor = 'var(--border)';
      el.style.background = 'var(--s2)';
    });
    const el = document.getElementById('simtype-'+type);
    if (el) { el.style.borderColor = 'var(--sim)'; el.style.background = 'rgba(167,139,250,.08)'; }

    const params = document.getElementById('sim-params-body');
    if (!params) return;
    const paramSets = {
      breast: [['Volume implante','200cc','800cc','400cc'],['Projeção','0','100','60'],['Posição','0','100','50']],
      face: [['Dorso nasal','0','100','40'],['Ponta nasal','0','100','55'],['Volume lábios','0','100','30']],
      body: [['Áreas de lipo','0','100','50'],['Definição abdominal','0','100','35'],['Contorno cintura','0','100','60']],
    };
    const set = paramSets[type] || [];
    params.innerHTML = set.map(([label, min, max, val]) => `
      <div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;margin-bottom:5px">
          <span style="font-size:11px;color:var(--muted)">${label}</span>
          <span style="font-size:10px;font-family:var(--mono);color:var(--sim)" id="param-val-${label.replace(/\s/g,'')}">${val}</span>
        </div>
        <input type="range" min="${min}" max="${max}" value="${val}" style="width:100%;accent-color:var(--sim)"
          oninput="document.getElementById('param-val-${label.replace(/\s/g,'')}').textContent=this.value;updateModel()">
      </div>`).join('');
  };

  window.simulateUpload = function(i) {
    const slot = document.getElementById('upload-slot-'+i);
    if (!slot) return;
    slot.style.background = 'var(--pron-dim)';
    slot.style.borderColor = 'var(--pron)';
    slot.dataset.filled = '1';
    slot.innerHTML = '<span style="font-size:20px">✓</span><span style="font-size:10px;color:var(--pron)">Foto '+['F','D','E'][i]+'</span>';
    uploadCount++;
    if (uploadCount >= 3) {
      const btn = document.getElementById('generate-btn');
      if (btn) btn.style.display = 'inline-flex';
    }
  };

  window.generateModel = function() {
    const genOverlay = document.getElementById('generating-overlay');
    if (genOverlay) { genOverlay.style.display = 'flex'; }
    const steps = ['Detectando pontos anatômicos...','Construindo malha 3D...','Aplicando textura...','Calibrando proporções...','Modelo pronto!'];
    let step = 0, progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      const fill = document.getElementById('gen-bar-fill');
      const stepEl = document.getElementById('gen-step');
      const spinner = document.getElementById('gen-spinner');
      if (fill) fill.style.width = progress + '%';
      if (stepEl && steps[step]) stepEl.textContent = steps[step++];
      if (progress >= 100) {
        clearInterval(interval);
        if (spinner) spinner.style.borderTopColor = 'var(--pron)';
        setTimeout(() => {
          if (genOverlay) genOverlay.style.display = 'none';
          document.getElementById('upload-state').style.display = 'none';
          document.getElementById('model-state').style.display = 'block';
          document.getElementById('sim-mode-label').textContent = 'MODELO 3D · INTERATIVO';
          renderBodyModel(currentType || 'breast');
        }, 600);
      }
    }, 600);
  };

  window.renderBodyModel = function(type) {
    const el = document.getElementById('body-model-render');
    if (!el) return;
    el.innerHTML = `<div style="text-align:center">
      <svg viewBox="0 0 200 300" width="200" height="300" fill="none">
        <ellipse cx="100" cy="50" rx="30" ry="35" fill="rgba(167,139,250,.1)" stroke="var(--sim)" stroke-width="1"/>
        <rect x="72" y="82" width="56" height="120" rx="10" fill="rgba(167,139,250,.06)" stroke="var(--sim)" stroke-width="1"/>
        <ellipse cx="75" cy="130" rx="20" ry="15" fill="rgba(167,139,250,.2)" stroke="var(--sim)" stroke-width="1.5"/>
        <ellipse cx="125" cy="130" rx="20" ry="15" fill="rgba(167,139,250,.2)" stroke="var(--sim)" stroke-width="1.5"/>
        <line x1="50" y1="95" x2="25" y2="175" stroke="var(--sim)" stroke-width="1" opacity=".4"/>
        <line x1="150" y1="95" x2="175" y2="175" stroke="var(--sim)" stroke-width="1" opacity=".4"/>
        <line x1="75" y1="202" x2="65" y2="290" stroke="var(--sim)" stroke-width="1" opacity=".4"/>
        <line x1="125" y1="202" x2="135" y2="290" stroke="var(--sim)" stroke-width="1" opacity=".4"/>
        ${[0,30,60,90,120,150,180].map(a => {
          const r = (a * Math.PI) / 180;
          const x1 = 100 + 22*Math.cos(r), y1 = 130 + 16*Math.sin(r);
          const x2 = 100 + 30*Math.cos(r), y2 = 130 + 22*Math.sin(r);
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(167,139,250,.3)" stroke-width=".8"/>`;
        }).join('')}
      </svg>
      <div style="font-size:9px;color:var(--sim);font-family:var(--mono);margin-top:4px;opacity:.7">MODELO 3D · ARRASTE PARA RODAR</div>
    </div>`;
    document.getElementById('compare-after-model').innerHTML = el.innerHTML;
  };

  window.updateModel = function() { /* param changes would update 3D */ };
  window.resetSim = function() {
    document.getElementById('upload-state').style.display = 'block';
    document.getElementById('model-state').style.display = 'none';
    uploadCount = 0;
    [0,1,2].forEach(i => {
      const slot = document.getElementById('upload-slot-'+i);
      if (slot) { slot.innerHTML = '<span style="font-size:20px">+</span><span style="font-size:10px">'+['Frontal','Lateral D','Lateral E'][i]+'</span>'; slot.style.background=''; slot.style.borderColor='var(--border)'; delete slot.dataset.filled; }
    });
    const btn = document.getElementById('generate-btn');
    if (btn) btn.style.display = 'none';
  };

  window.toggleCompare = function() {
    comparing = !comparing;
    const ov = document.getElementById('compare-overlay');
    if (ov) ov.style.display = comparing ? 'flex' : 'none';
  };

  window.setView = function(i) {
    document.querySelectorAll('[id^="view-btn-"]').forEach(el => { el.style.background=''; el.style.color='var(--muted)'; });
    const btn = document.getElementById('view-btn-'+i);
    if (btn) { btn.style.background='var(--s3)'; btn.style.color='var(--text)'; }
  };

  window.saveSim = function() {
    const btn = document.getElementById('save-sim-btn');
    if (!btn) return;
    btn.textContent = '✓ Guardado!';
    btn.style.background = 'var(--pron)';
    setTimeout(() => { btn.textContent = '💾 Guardar simulação'; btn.style.background = ''; }, 2000);
  };

  window.loadPatientSim = function(id) {
    const p = DB.patients.find(x => x.id === id);
    if (!p) return;
    selectSimType(p.simType);
    document.getElementById('upload-state').style.display = 'none';
    document.getElementById('model-state').style.display = 'block';
    renderBodyModel(p.simType);
  };

  const zoom = document.getElementById('zoom-slider');
  if (zoom) zoom.oninput = function() { document.getElementById('zoom-val').textContent = this.value + '%'; };

  const sel = document.getElementById('sim-patient-select');
  if (sel) sel.onchange = function() {
    const p = DB.patients.find(x => x.id == this.value);
    const info = document.getElementById('sim-patient-info');
    if (info && p) {
      info.style.display = 'block';
      document.getElementById('sim-patient-name').textContent = p.name;
      document.getElementById('sim-patient-proc').textContent = p.procedure;
      selectSimType(p.simType);
    }
  };
};

// =============================================
// 4. PRONTUÁRIO COM IA DE VOZ
// =============================================
PageRenderers.prontuario = () => `
<div class="page">
  <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between">
    <div>
      <div class="page-title">Prontuário com IA de Voz</div>
      <div class="page-sub">Transcrição em tempo real · Documentação automática · Charcot IA</div>
    </div>
    <div style="display:flex;gap:8px">
      <select class="input select btn-sm" style="padding:7px 12px;font-size:11px;width:200px">
        <option>— Selecionar paciente —</option>
        ${DB.patients.map(p=>`<option>${p.name}</option>`).join('')}
      </select>
      <button class="btn btn-ghost btn-sm">Ver histórico</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 320px;gap:16px">
    <!-- MAIN PANEL -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <!-- RECORDING CONTROL -->
      <div class="card" style="border-color:rgba(52,211,153,.2)">
        <div style="padding:16px 20px;display:flex;align-items:center;gap:16px">
          <button id="rec-btn" onclick="toggleRecording()" style="width:54px;height:54px;border-radius:50%;background:var(--pron-dim);border:2px solid var(--pron);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .3s;flex-shrink:0">
            <svg id="rec-icon" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--pron)" stroke-width="2"><path d="M11 2a4 4 0 014 4v5a4 4 0 01-8 0V6a4 4 0 014-4z"/><path d="M5 12a6 6 0 0012 0M11 18v3M8 21h6"/></svg>
          </button>
          <div style="flex:1">
            <div id="rec-status" style="font-size:14px;font-weight:600">Pronto para gravar</div>
            <div id="rec-sub" style="font-size:11px;color:var(--muted)">Pressione o microfone para iniciar a consulta</div>
          </div>
          <div id="rec-timer" style="font-family:var(--mono);font-size:22px;font-weight:300;color:var(--muted);min-width:70px;text-align:right">00:00</div>
          <div id="waveform" style="display:flex;align-items:center;gap:2px;height:30px;min-width:80px">
            ${Array.from({length:14},(_,i)=>`<div class="wave-bar" style="width:4px;height:${6+Math.random()*20}px;background:var(--border);border-radius:2px;transition:height .15s"></div>`).join('')}
          </div>
        </div>
      </div>

      <!-- TABS: TRANSCRICAO / ANAMNESE / DOCUMENTOS -->
      <div style="display:flex;gap:6px">
        ${[['trans','🎙️ Transcrição'],['anam','📋 Anamnese'],['docs','📄 Documentos'],['charcot','🧠 Charcot IA']].map(([id,label],i)=>`
        <button id="ptab-${id}" onclick="setPTab('${id}')" class="btn btn-sm ${i===0?'btn-pron':'btn-ghost'}">${label}</button>`).join('')}
      </div>

      <!-- TRANSCRICAO TAB -->
      <div id="ptab-content-trans" class="card" style="flex:1">
        <div class="card-header">
          <span class="card-title">Transcrição em tempo real</span>
          <span id="trans-badge" class="tag" style="background:var(--border);color:var(--muted)">Aguardando...</span>
          <button class="btn btn-ghost btn-sm" onclick="copyTranscript()">Copiar</button>
        </div>
        <div id="transcript-body" style="padding:18px 20px;min-height:300px;font-size:12px;line-height:1.8;color:var(--muted)">
          <div id="transcript-placeholder" style="text-align:center;padding:60px 0">
            <div style="font-size:32px;margin-bottom:12px">🎙️</div>
            <div style="font-size:13px;color:var(--muted)">Inicie a gravação para ver a transcrição aparecer aqui em tempo real</div>
          </div>
          <div id="transcript-text" style="display:none"></div>
        </div>
      </div>

      <!-- ANAMNESE TAB (hidden) -->
      <div id="ptab-content-anam" class="card" style="display:none">
        <div class="card-header">
          <span class="card-title">Anamnese gerada por IA</span>
          <span class="ai-pill">IA GERADO</span>
          <button class="btn btn-ghost btn-sm">Editar</button>
          <button class="btn btn-pron btn-sm">Guardar</button>
        </div>
        <div style="padding:20px;display:grid;grid-template-columns:1fr 1fr;gap:14px">
          ${[
            ['Queixa principal','Desejo de aumento mamário bilateral por questões estéticas e melhora da autoestima. Relata insatisfação com o volume atual desde a amamentação.'],
            ['HDA','Paciente sem cirurgias prévias. Nega uso de anticoagulantes, corticoides ou medicamentos de uso contínuo. Não fuma. Consome álcool socialmente.'],
            ['Antecedentes','Sem patologias relevantes. Nega hipertensão, diabetes ou cardiopatias. HPV negativo. Última mamografia: 2024 (normal).'],
            ['Exame físico','Mamas com ptose grau I. Simetria preservada. Sem nódulos palpáveis. Mamilos centralizados. IMC: 22.4. ASA I.'],
          ].map(([title,content]) => `
          <div style="background:var(--s2);border-radius:10px;padding:14px">
            <div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">${title}</div>
            <div style="font-size:12px;line-height:1.7">${content}</div>
          </div>`).join('')}
          <div style="grid-column:1/3;background:var(--pron-dim);border:1px solid rgba(52,211,153,.2);border-radius:10px;padding:14px">
            <div style="font-size:10px;color:var(--pron);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">Plano terapêutico</div>
            <div style="font-size:12px;line-height:1.7">Indicado aumento mamário com prótese de silicone. Volume sugerido 300-350cc, projeção moderada. Acesso periareolar. Anestesia geral. Solicitados exames pré-operatórios de rotina. Retorno em 30 dias.</div>
          </div>
        </div>
      </div>

      <!-- DOCUMENTOS TAB (hidden) -->
      <div id="ptab-content-docs" class="card" style="display:none">
        <div class="card-header"><span class="card-title">Documentos clínicos</span><button class="btn btn-pron btn-sm">+ Gerar novo</button></div>
        <div style="padding:16px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
          ${[
            ['📋','Prontuário completo','Gerado por IA','done'],
            ['💊','Receita médica','Gerado por IA','done'],
            ['📄','Atestado médico','Clique para gerar','pending'],
            ['🔬','Solicitação de exames','Gerado por IA','done'],
            ['✍️','Termo de consentimento','Gerado por IA','done'],
            ['📊','Laudo pré-operatório','Clique para gerar','pending'],
          ].map(([icon,name,sub,status]) => `
          <div style="background:var(--s2);border:1px solid ${status==='done'?'var(--border)':'rgba(245,158,11,.2)'};border-radius:10px;padding:13px;cursor:pointer;transition:all .2s" onmouseover="this.style.borderColor='var(--pron)'" onmouseout="this.style.borderColor='${status==='done'?'var(--border)':'rgba(245,158,11,.2)'}'">
            <div style="font-size:20px;margin-bottom:8px">${icon}</div>
            <div style="font-size:12px;font-weight:500;margin-bottom:2px">${name}</div>
            <div style="font-size:10px;color:${status==='done'?'var(--muted)':'var(--ia)'}">
              ${status==='done'?'<span style="color:var(--pron)">✓</span> '+sub:sub}
            </div>
          </div>`).join('')}
        </div>
      </div>

      <!-- CHARCOT IA TAB (hidden) -->
      <div id="ptab-content-charcot" class="card" style="display:none">
        <div class="card-header">
          <span class="card-title">Charcot IA · Assistente clínico</span>
          <span class="ai-pill">GPT-4 MÉDICO</span>
        </div>
        <div id="charcot-messages" style="padding:16px 20px;min-height:260px;display:flex;flex-direction:column;gap:10px">
          <div style="background:var(--s2);border-radius:10px;padding:12px;border-left:3px solid var(--sim)">
            <div style="font-size:10px;color:var(--sim);margin-bottom:5px;font-family:var(--mono)">CHARCOT IA</div>
            <div style="font-size:12px;line-height:1.7">Olá, Dr. Varela! Estou aqui para auxiliar com informações clínicas, condutas e literatura científica. Tenho contexto da consulta atual. O que gostaria de saber?</div>
          </div>
          ${[
            ['Quais as contraindicações para prótese de silicone em paciente com ptose grau I?', 'Em pacientes com ptose grau I, a colocação de próteses mamárias isoladamente pode não oferecer o resultado esperado. A literatura recomenda avaliar mastoplexy simultânea. Contraindicações incluem: doenças autoimunes ativas, tabagismo não controlado (≥10 cigarros/dia), e IMC >35.'],
          ].map(([q,a]) => `
          <div style="background:var(--crm-dim);border-radius:10px;padding:10px 12px;align-self:flex-end;max-width:85%">
            <div style="font-size:11px;line-height:1.6">${q}</div>
          </div>
          <div style="background:var(--s2);border-radius:10px;padding:12px;border-left:3px solid var(--sim);max-width:90%">
            <div style="font-size:10px;color:var(--sim);margin-bottom:5px;font-family:var(--mono)">CHARCOT IA</div>
            <div style="font-size:12px;line-height:1.7">${a}</div>
          </div>`).join('')}
        </div>
        <div style="padding:12px 16px;border-top:1px solid var(--border);display:flex;gap:8px">
          <input class="input" id="charcot-input" placeholder="Faça uma pergunta clínica..." style="flex:1;font-size:12px" onkeydown="if(event.key==='Enter')sendCharcot()">
          <button class="btn btn-sim btn-sm" onclick="sendCharcot()">Perguntar →</button>
        </div>
      </div>
    </div>

    <!-- RIGHT: PATIENT INFO DURING CONSULT -->
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-header"><span class="card-title">Paciente em consulta</span></div>
        <div style="padding:14px">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
            <div class="avatar av-blue" style="width:44px;height:44px;font-size:14px">AS</div>
            <div>
              <div style="font-weight:600">Ana Sofia Mendes</div>
              <div style="font-size:11px;color:var(--muted)">34 anos · Aumento mamário</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${[['Última consulta','28 Fev 2026'],['Procedimento','Aumento mamário'],['Lead origin','Instagram'],['Simulação','Aprovada ✓'],['Status','Pré-operatório']].map(([k,v])=>`
            <div style="display:flex;justify-content:space-between;font-size:11px;padding:5px 0;border-bottom:1px solid var(--border)">
              <span style="color:var(--muted)">${k}</span>
              <span style="font-weight:500">${v}</span>
            </div>`).join('')}
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Sugestões rápidas</span><span class="ai-pill">IA</span></div>
        <div style="padding:12px;display:flex;flex-direction:column;gap:6px">
          ${['Gerar receita de analgésico','Solicitar hemograma completo','Criar termo de consentimento','Agendar retorno em 30 dias'].map(s=>`
          <button class="btn btn-ghost btn-sm" style="justify-content:flex-start;font-size:11px;color:var(--text2)">${s}</button>`).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Sinais vitais</span></div>
        <div style="padding:14px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${[['PA','120/80'],['FC','72 bpm'],['Peso','62 kg'],['Altura','1.65 m'],['IMC','22.4'],['Temp','36.5°C']].map(([k,v])=>`
          <div style="background:var(--s2);border-radius:7px;padding:9px;text-align:center">
            <div style="font-size:9px;color:var(--muted);margin-bottom:3px">${k}</div>
            <div style="font-size:13px;font-weight:500;font-family:var(--mono)">${v}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>`;

PageInit.prontuario = () => {
  let recording = false;
  let timer = 0;
  let timerInterval = null;
  let waveInterval = null;
  const transcriptLines = [
    'Dr. Varela: Bom dia, Ana Sofia. Como você está se sentindo hoje?',
    'Paciente: Bom dia, doutor. Estou bem, ansiosa para a consulta.',
    'Dr. Varela: Claro. Vamos revisar a simulação que fizemos. A senhora está satisfeita com os resultados projetados?',
    'Paciente: Sim, adorei! O volume de 330cc ficou exatamente como eu imaginava. Muito natural.',
    'Dr. Varela: Ótimo. Vou solicitar os exames pré-operatórios hoje. A senhora toma algum medicamento regularmente?',
    'Paciente: Não, nenhum. Ah, e parei de tomar anticoncepcional há 3 meses como o senhor recomendou.',
    'Dr. Varela: Perfeito. A cirurgia está agendada para o dia 28 de março. Qualquer dúvida, pode nos contatar.',
  ];
  let lineIdx = 0;

  window.toggleRecording = function() {
    recording = !recording;
    const btn = document.getElementById('rec-btn');
    const icon = document.getElementById('rec-icon');
    const status = document.getElementById('rec-status');
    const sub = document.getElementById('rec-sub');
    const badge = document.getElementById('trans-badge');

    if (recording) {
      btn.style.background = 'rgba(248,113,113,.15)';
      btn.style.borderColor = 'var(--danger)';
      icon.style.stroke = 'var(--danger)';
      btn.classList.add('recording-pulse');
      status.textContent = '● Gravando consulta...';
      status.style.color = 'var(--danger)';
      sub.textContent = 'IA processando em tempo real · Clique para pausar';
      badge.textContent = '● AO VIVO';
      badge.style.background = 'rgba(248,113,113,.15)';
      badge.style.color = 'var(--danger)';

      timerInterval = setInterval(() => {
        timer++;
        const m = String(Math.floor(timer/60)).padStart(2,'0');
        const s = String(timer%60).padStart(2,'0');
        document.getElementById('rec-timer').textContent = m+':'+s;
      }, 1000);

      waveInterval = setInterval(() => {
        document.querySelectorAll('.wave-bar').forEach(b => {
          b.style.height = (6 + Math.random() * 24) + 'px';
          b.style.background = recording ? 'var(--danger)' : 'var(--border)';
        });
      }, 120);

      document.getElementById('transcript-placeholder').style.display = 'none';
      document.getElementById('transcript-text').style.display = 'block';

      const addLine = () => {
        if (lineIdx >= transcriptLines.length) return;
        const line = transcriptLines[lineIdx++];
        const isDoc = line.startsWith('Dr.');
        const div = document.createElement('div');
        div.style.cssText = `padding:6px 0;border-bottom:1px solid var(--border);animation:fadeIn .3s ease`;
        div.innerHTML = `<span style="color:${isDoc?'var(--crm)':'var(--text2)'};font-weight:${isDoc?'500':'400'}">${line}</span>`;
        document.getElementById('transcript-text').appendChild(div);
        if (lineIdx < transcriptLines.length) setTimeout(addLine, 2500 + Math.random()*1500);
      };
      setTimeout(addLine, 1200);

    } else {
      clearInterval(timerInterval);
      clearInterval(waveInterval);
      btn.style.background = 'var(--pron-dim)';
      btn.style.borderColor = 'var(--pron)';
      icon.style.stroke = 'var(--pron)';
      btn.classList.remove('recording-pulse');
      status.textContent = 'Consulta pausada';
      status.style.color = '';
      sub.textContent = 'Pressione novamente para continuar';
      badge.textContent = 'Pausado';
      badge.style.background = 'var(--ia-dim)';
      badge.style.color = 'var(--ia)';
      document.querySelectorAll('.wave-bar').forEach(b => { b.style.height = '6px'; b.style.background = 'var(--border)'; });
    }
  };

  window.setPTab = function(tab) {
    ['trans','anam','docs','charcot'].forEach(t => {
      const btn = document.getElementById('ptab-'+t);
      const content = document.getElementById('ptab-content-'+t);
      if (btn) btn.className = t===tab ? 'btn btn-pron btn-sm' : 'btn btn-ghost btn-sm';
      if (content) content.style.display = t===tab ? 'block' : 'none';
    });
  };

  window.copyTranscript = function() { alert('Transcrição copiada!'); };

  window.sendCharcot = function() {
    const input = document.getElementById('charcot-input');
    if (!input || !input.value.trim()) return;
    const q = input.value;
    input.value = '';
    const msgs = document.getElementById('charcot-messages');
    const qDiv = document.createElement('div');
    qDiv.style.cssText = 'background:var(--crm-dim);border-radius:10px;padding:10px 12px;align-self:flex-end;max-width:85%;animation:fadeIn .3s';
    qDiv.innerHTML = `<div style="font-size:11px;line-height:1.6">${q}</div>`;
    msgs.appendChild(qDiv);
    const thinking = document.createElement('div');
    thinking.style.cssText = 'background:var(--s2);border-radius:10px;padding:12px;border-left:3px solid var(--sim);font-size:12px;color:var(--muted)';
    thinking.textContent = 'Charcot IA está a pensar...';
    msgs.appendChild(thinking);
    msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => {
      thinking.innerHTML = `<div style="font-size:10px;color:var(--sim);margin-bottom:5px;font-family:var(--mono)">CHARCOT IA</div><div style="font-size:12px;line-height:1.7">Com base na literatura atual, recomendo considerar o protocolo de anestesia tumescente para maior conforto pós-operatório. Estudos publicados no Plastic & Reconstructive Surgery (2024) demonstram redução de 40% no edema com essa abordagem.</div>`;
      msgs.scrollTop = msgs.scrollHeight;
    }, 1800);
  };
};

// =============================================
// 5. AGENDA
// =============================================
PageRenderers.agenda = () => {
  const hours = Array.from({length:11}, (_,i) => `${8+i}:00`);
  return `
<div class="page">
  <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between">
    <div>
      <div class="page-title">Agenda</div>
      <div class="page-sub">Semana de 14 a 20 de Março de 2026</div>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-ghost btn-sm">← Semana anterior</button>
      <button class="btn btn-ghost btn-sm" style="background:var(--crm-dim);color:var(--crm);border-color:var(--crm)">Hoje</button>
      <button class="btn btn-ghost btn-sm">Semana seguinte →</button>
      <button class="btn btn-primary btn-sm">+ Novo agendamento</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:60px repeat(6,1fr);gap:0;background:var(--s1);border:1px solid var(--border);border-radius:14px;overflow:hidden">
    <!-- HEADER -->
    <div style="background:var(--s2);border-bottom:1px solid var(--border);padding:10px"></div>
    ${['Seg 16','Ter 17','Qua 18','Qui 19','Sex 20','Sáb 21'].map((d,i)=>`
    <div style="background:var(--s2);border-bottom:1px solid var(--border);border-left:1px solid var(--border);padding:10px;text-align:center">
      <div style="font-size:11px;font-weight:600;${i===0?'color:var(--crm)':''}">${d.split(' ')[0]}</div>
      <div style="font-size:18px;font-weight:300;font-family:var(--mono);${i===0?'color:var(--crm)':''}">${d.split(' ')[1]}</div>
    </div>`).join('')}

    <!-- TIME SLOTS -->
    ${hours.map((h,hi) => `
    <div style="border-bottom:1px solid rgba(30,35,56,.5);padding:8px 6px;font-size:10px;color:var(--muted);font-family:var(--mono);background:var(--s2);text-align:right">${h}</div>
    ${[0,1,2,3,4,5].map(di => {
      const events = [];
      if (di===0 && hi===1) events.push({label:'Ana Sofia M.',sub:'Pré-op mamário',color:'var(--crm)'});
      if (di===0 && hi===2) events.push({label:'Beatriz F.',sub:'Simulação 3D',color:'var(--sim)'});
      if (di===0 && hi===6) events.push({label:'Carla R.',sub:'Consulta lipo',color:'var(--pron)'});
      if (di===1 && hi===3) events.push({label:'Maria O.',sub:'Revisão pós-op',color:'var(--ia)'});
      if (di===2 && hi===1) events.push({label:'Fernanda C.',sub:'Pré-op mamoplastia',color:'var(--crm)'});
      if (di===3 && hi===4) events.push({label:'Juliana P.',sub:'Consulta lifting',color:'var(--sim)'});
      if (di===4 && hi===2) events.push({label:'Nova paciente',sub:'Avaliação inicial',color:'var(--muted)'});
      if (di===5 && hi===1) events.push({label:'Revisão prontuários',sub:'Interno',color:'var(--faint)'});
      return `<div style="border-bottom:1px solid rgba(30,35,56,.5);border-left:1px solid rgba(30,35,56,.5);padding:4px;min-height:44px;${events.length?'cursor:pointer':''}">
        ${events.map(e=>`<div style="background:${e.color}22;border-left:2px solid ${e.color};padding:4px 6px;border-radius:0 4px 4px 0;font-size:10px;line-height:1.3">
          <div style="font-weight:500;color:${e.color}">${e.label}</div>
          <div style="color:var(--muted)">${e.sub}</div>
        </div>`).join('')}
      </div>`;
    }).join('')}`).join('')}
  </div>
</div>`;
};

// =============================================
// 6. FINANCEIRO
// =============================================
PageRenderers.financeiro = () => `
<div class="page">
  <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between">
    <div><div class="page-title">Financeiro</div><div class="page-sub">Receita, despesas e pipeline financeiro</div></div>
    <div style="display:flex;gap:8px">
      <select class="input select btn-sm" style="width:140px;padding:7px;font-size:11px"><option>Março 2026</option><option>Fevereiro 2026</option></select>
      <button class="btn btn-ghost btn-sm">Exportar PDF</button>
    </div>
  </div>
  <div class="grid-4" style="margin-bottom:22px">
    ${[['Receita Março','R$ 187.500','var(--pron)','↑ 22%'],['Procedimentos','24','var(--crm)','↑ 4 vs Fev'],['Ticket médio','R$ 7.812','var(--sim)','↑ 8%'],['A receber','R$ 94.000','var(--ia)','12 pacientes']].map(([label,val,color,delta])=>`
    <div class="metric-card" style="border-color:${color}22">
      <div class="metric-label">${label}</div>
      <div style="font-size:${val.includes('R$')?'18px':'28px'};font-weight:300;font-family:var(--mono);margin-bottom:6px;color:${color}">${val}</div>
      <div style="font-size:11px;color:var(--pron)">${delta}</div>
    </div>`).join('')}
  </div>
  <div class="grid-2">
    <div class="card">
      <div class="card-header"><span class="card-title">Receita por procedimento</span></div>
      <div style="padding:16px 20px">
        ${[['Aumento mamário','R$ 74.000',74],['Rinoplastia','R$ 42.000',42],['Abdominoplastia','R$ 22.000',22],['Lipoaspiração','R$ 36.000',36],['Outros','R$ 13.500',13]].map(([proc,val,pct])=>`
        <div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px">
            <span>${proc}</span><span style="font-weight:500;font-family:var(--mono)">${val}</span>
          </div>
          <div style="height:4px;background:var(--border);border-radius:2px;overflow:hidden">
            <div style="width:${pct}%;height:100%;background:var(--crm);border-radius:2px;opacity:.8"></div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Últimas transações</span></div>
      <table>
        <thead><tr><th>Paciente</th><th>Procedimento</th><th>Valor</th><th>Status</th></tr></thead>
        <tbody>
          ${DB.patients.slice(0,5).map(p=>`
          <tr><td><div style="font-size:12px;font-weight:500">${p.name}</div></td>
          <td style="font-size:11px;color:var(--muted)">${p.procedure}</td>
          <td style="font-family:var(--mono);font-size:11px;color:var(--pron)">${formatCurrency(p.value)}</td>
          <td>${statusTag(p.status==='done'?'done':'scheduled')}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
</div>`;

// =============================================
// 7. GALERIA
// =============================================
PageRenderers.galeria = () => `
<div class="page">
  <div class="page-header" style="display:flex;align-items:flex-start;justify-content:space-between">
    <div><div class="page-title">Galeria de Casos</div><div class="page-sub">Portfólio público · Antes e depois</div></div>
    <div style="display:flex;gap:8px">
      <button class="btn btn-ghost btn-sm">Filtrar</button>
      <button class="btn btn-sim btn-sm">+ Adicionar caso</button>
    </div>
  </div>
  <div style="display:flex;gap:8px;margin-bottom:20px">
    ${['Todos','Mama','Rosto','Corpo'].map((f,i)=>`
    <button class="btn btn-sm ${i===0?'btn-sim':'btn-ghost'}">${f}</button>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
    ${DB.patients.filter(p=>p.hasSimulation).map(p=>`
    <div class="card" style="overflow:hidden;cursor:pointer" onmouseover="this.style.borderColor='var(--sim)'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="display:grid;grid-template-columns:1fr 1fr;height:160px">
        <div style="background:var(--s2);display:flex;flex-direction:column;align-items:center;justify-content:center;border-right:1px solid var(--border);position:relative">
          <div style="position:absolute;top:7px;left:8px;font-size:9px;color:var(--muted);font-family:var(--mono);background:rgba(0,0,0,.4);padding:2px 6px;border-radius:3px">ANTES</div>
          <div style="opacity:.4">${renderBodySVG(p.simType)}</div>
        </div>
        <div style="background:var(--s2);display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative">
          <div style="position:absolute;top:7px;right:8px;font-size:9px;color:var(--sim);font-family:var(--mono);background:rgba(0,0,0,.4);padding:2px 6px;border-radius:3px">DEPOIS</div>
          ${renderBodySVG(p.simType)}
        </div>
      </div>
      <div style="padding:12px 14px;border-top:1px solid var(--border)">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:12px;font-weight:500">${p.procedure}</div>
            <div style="font-size:10px;color:var(--muted)">${p.age} anos · ${p.initials}</div>
          </div>
          <span class="tag tag-done">Publicado</span>
        </div>
      </div>
    </div>`).join('')}
  </div>
</div>`;

// =============================================
// 8. CONFIGURAÇÕES
// =============================================
PageRenderers.configuracoes = () => `
<div class="page">
  <div class="page-header"><div class="page-title">Definições</div><div class="page-sub">Perfil, clínica e integrações</div></div>
  <div class="grid-2">
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-header"><span class="card-title">Perfil do cirurgião</span><button class="btn btn-ghost btn-sm">Editar</button></div>
        <div style="padding:16px 20px">
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px">
            <div class="avatar av-blue" style="width:56px;height:56px;font-size:18px">RV</div>
            <div>
              <div style="font-size:15px;font-weight:600">${DB.surgeon.name}</div>
              <div style="font-size:11px;color:var(--muted)">${DB.surgeon.spec}</div>
              <div style="font-size:10px;color:var(--muted);font-family:var(--mono)">${DB.surgeon.crm}</div>
            </div>
          </div>
          ${[['Clínica',DB.surgeon.clinic],['WhatsApp','+55 11 99999-0000'],['Email','dr.varela@clinica.com'],['Site','clinicavarela.com.br']].map(([k,v])=>`
          <div style="display:flex;justify-content:space-between;font-size:12px;padding:7px 0;border-bottom:1px solid var(--border)">
            <span style="color:var(--muted)">${k}</span><span>${v}</span>
          </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Plano ativo</span></div>
        <div style="padding:16px 20px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
            <span style="font-size:16px;font-weight:700;color:var(--sim)">Pro</span>
            <span class="ai-pill">ATIVO</span>
          </div>
          <div style="font-size:12px;color:var(--muted);margin-bottom:14px">R$ 1.197/mês · Renova em 01 Abr 2026</div>
          ${['CRM ilimitado','Simulações 3D ilimitadas','Prontuário IA ilimitado','Chatbot multi-canal','Galeria pública'].map(f=>`
          <div style="font-size:11px;padding:4px 0;color:var(--text2)"><span style="color:var(--pron);margin-right:6px">✓</span>${f}</div>`).join('')}
        </div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      <div class="card">
        <div class="card-header"><span class="card-title">Integrações</span></div>
        <div style="padding:14px">
          ${[
            ['💬','WhatsApp Business','Conectado','var(--pron)'],
            ['📸','Instagram','Conectado','var(--pron)'],
            ['📧','Gmail','Conectado','var(--pron)'],
            ['🗓️','Google Calendar','Não conectado','var(--muted)'],
            ['💊','Memed (prescrições)','Conectado','var(--pron)'],
            ['🔬','Resultados Lab','Não conectado','var(--muted)'],
          ].map(([icon,name,status,color])=>`
          <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)">
            <span style="font-size:16px">${icon}</span>
            <span style="flex:1;font-size:12px">${name}</span>
            <span style="font-size:11px;font-weight:500;color:${color}">${status}</span>
            <button class="btn btn-ghost btn-sm" style="font-size:10px">${status==='Conectado'?'Desligar':'Conectar'}</button>
          </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">IA & Automações</span></div>
        <div style="padding:14px">
          ${[
            ['Chatbot WhatsApp 24/7',true],
            ['Follow-up automático pós-consulta',true],
            ['Qualificação automática de leads',true],
            ['NPS automático pós-op',true],
            ['Sugestões Charcot IA durante consulta',false],
          ].map(([label,on])=>`
          <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--border)">
            <span style="flex:1;font-size:12px">${label}</span>
            <div onclick="this.dataset.on=this.dataset.on==='1'?'0':'1';this.style.background=this.dataset.on==='1'?'var(--pron)':'var(--border)'" data-on="${on?'1':'0'}" style="width:36px;height:20px;border-radius:10px;background:${on?'var(--pron)':'var(--border)'};cursor:pointer;transition:background .2s;position:relative">
              <div style="position:absolute;top:2px;${on?'right:2px':'left:2px'};width:16px;height:16px;border-radius:50%;background:white;transition:all .2s"></div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>`;
