// Admin: CRUD simple sobre skills en localStorage
const KEY = 'skills.v1';

const defaults = [
  { label:'Programming', value:78, icon:'🧠' },
  { label:'Art', value:28, icon:'📦' },
  { label:'Design', value:55, icon:'🎵' },
];

function loadSkills() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [...defaults];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...defaults];
    return parsed.map(s => ({
      label: String(s.label ?? '').slice(0,40) || 'Skill',
      value: Math.max(0, Math.min(100, Number(s.value ?? 0))),
      icon: String(s.icon ?? '').slice(0,4)
    })).slice(0, 12);
  } catch {
    return [...defaults];
  }
}

function saveSkills(arr) {
  localStorage.setItem(KEY, JSON.stringify(arr));
}

const grid = document.getElementById('skills-grid');
const addBtn = document.getElementById('add-skill');
const saveBtn = document.getElementById('save');
const resetBtn = document.getElementById('reset');

function rowTemplate(s, idx) {
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = `
    <input aria-label="Icono" title="Icono" placeholder="🧠" value="${s.icon ?? ''}" />
    <input aria-label="Nombre" title="Nombre" placeholder="Programming" value="${s.label ?? ''}" />
    <input aria-label="Porcentaje" title="Porcentaje" type="number" min="0" max="100" placeholder="0-100" value="${s.value ?? 0}" />
    <div class="actions">
      <button class="more up" title="Subir">↑</button>
      <button class="more down" title="Bajar">↓</button>
      <button class="more del" title="Eliminar">🗑</button>
    </div>
  `;
  row.querySelector('.up').addEventListener('click', () => moveRow(idx, -1));
  row.querySelector('.down').addEventListener('click', () => moveRow(idx, +1));
  row.querySelector('.del').addEventListener('click', () => removeRow(idx));
  return row;
}

let data = loadSkills();
render();

function render() {
  grid.innerHTML = '';
  data.forEach((s, i) => grid.appendChild(rowTemplate(s, i)));
}

function collect() {
  const rows = Array.from(grid.querySelectorAll('.row'));
  return rows.map(r => ({
    icon: r.children[0].value.trim().slice(0,4),
    label: r.children[1].value.trim().slice(0,40) || 'Skill',
    value: Math.max(0, Math.min(100, Number(r.children[2].value)))
  }));
}

function moveRow(i, dir) {
  const j = i + dir;
  if (j < 0 || j >= data.length) return;
  const [item] = data.splice(i, 1);
  data.splice(j, 0, item);
  render();
}

function removeRow(i) {
  data.splice(i, 1);
  render();
}

addBtn.addEventListener('click', () => {
  data.push({icon:'', label:'', value:0});
  render();
});

saveBtn.addEventListener('click', () => {
  data = collect();
  saveSkills(data);
  saveBtn.textContent = 'Guardado ✓';
  setTimeout(() => saveBtn.textContent = 'Guardar', 1200);
});

resetBtn.addEventListener('click', () => {
  if (confirm('¿Restablecer los skills a los valores por defecto?')) {
    data = [...defaults];
    saveSkills(data);
    render();
  }
});
