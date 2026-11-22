(function () {
  function createDemo() {
    let nextId = 1;
    const samples = () => [
      {name:'Living room display', type:'Media', address:'192.0.2.10', status:'known'},
      {name:'Studio laptop', type:'Computer', address:'192.0.2.21', status:'known'},
      {name:'Hallway sensor', type:'Smart home', address:'192.0.2.35', status:'unfamiliar'}
    ].map(d => ({...d, id: nextId++}));
    return {
      devices: samples(), history: [], scanCount: 0,
      add(data) { const device = {...data, id:nextId++}; this.devices.push(device); this.history.unshift(`Added fictional device: ${device.name}.`); return device; },
      update(id, data) { const device = this.devices.find(d => d.id === id); if (!device) return; Object.assign(device, data); this.history.unshift(`Updated fictional device: ${device.name}.`); },
      remove(id) { const device = this.devices.find(d => d.id === id); if (!device) return; this.devices = this.devices.filter(d => d.id !== id); this.history.unshift(`Removed fictional device: ${device.name}.`); },
      scan() { this.scanCount++; let message = `Simulated scan ${this.scanCount}: no changes to sample inventory.`; if (this.scanCount === 1) { this.devices.push({id:nextId++, name:'Guest tablet', type:'Tablet', address:'192.0.2.48', status:'unfamiliar'}); message = 'Simulated scan 1: fictional Guest tablet added for review.'; } this.history.unshift(message); return message; },
      reset() { nextId = 1; this.devices = samples(); this.history = []; this.scanCount = 0; }
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {createDemo};
  if (typeof document === 'undefined') return;
  const demo = createDemo(), $ = id => document.getElementById(id), dialog = $('device-dialog'), form = $('device-form');
  let editing = null;
  function render() {
    $('total').textContent = demo.devices.length;
    $('known').textContent = demo.devices.filter(d => d.status === 'known').length;
    $('unfamiliar').textContent = demo.devices.filter(d => d.status === 'unfamiliar').length;
    const query = $('search').value.trim().toLowerCase(), list = $('devices'); list.replaceChildren();
    const matches = demo.devices.filter(d => [d.name,d.type,d.address,d.status].some(v => v.toLowerCase().includes(query)));
    matches.forEach(d => {
      const row = document.createElement('tr');
      [d.name,d.type,d.address,d.status === 'known' ? 'Known' : 'Unfamiliar'].forEach((value,i) => { const td = document.createElement('td'); td.textContent = value; if (i === 3) td.className = d.status; row.append(td); });
      const actions = document.createElement('td'); actions.className = 'row-actions';
      [['Toggle', () => {demo.update(d.id, {...d, status:d.status === 'known' ? 'unfamiliar' : 'known'}); render();}], ['Edit', () => openForm(d)], ['Delete', () => {if (window.confirm(`Remove fictional device “${d.name}”?`)) { demo.remove(d.id); render(); }}]].forEach(([label,fn]) => { const button = document.createElement('button'); button.type = 'button'; button.textContent = label; button.setAttribute('aria-label', `${label} ${d.name}`); button.addEventListener('click',fn); actions.append(button); });
      row.append(actions); list.append(row);
    });
    $('empty').hidden = matches.length > 0;
    const history = $('history'); history.replaceChildren();
    if (!demo.history.length) history.textContent = 'No simulated changes yet.';
    else demo.history.forEach(entry => { const item = document.createElement('div'); item.className = 'history-item'; item.textContent = entry; history.append(item); });
  }
  function openForm(device) {
    editing = device ? device.id : null; form.reset();
    $('form-title').textContent = device ? 'Edit fictional device' : 'Add fictional device';
    if (device) ['name','type','address','status'].forEach(key => form.elements[key].value = device[key]);
    dialog.showModal(); form.elements.name.focus();
  }
  $('add-device').addEventListener('click', () => openForm());
  $('cancel-form').addEventListener('click', () => dialog.close());
  form.addEventListener('submit', event => { event.preventDefault(); const data = {}; ['name','type','address','status'].forEach(key => data[key] = form.elements[key].value.trim()); if (!data.name || !data.type || !data.address) return; if (editing === null) demo.add(data); else demo.update(editing, data); dialog.close(); $('message').textContent = 'Fictional inventory updated. No network access is involved.'; render(); });
  $('scan').addEventListener('click', () => { $('message').textContent = demo.scan() + ' No network was scanned.'; render(); });
  $('reset').addEventListener('click', () => { demo.reset(); $('search').value = ''; $('message').textContent = 'Demo reset to fictional sample devices.'; render(); });
  $('search').addEventListener('input', render); render();
})();
