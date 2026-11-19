(function(root){
  function createDemo(){
    const samples = () => [
      {name:'Living room display', type:'Media', address:'192.0.2.10', status:'known'},
      {name:'Studio laptop', type:'Computer', address:'192.0.2.21', status:'known'},
      {name:'Hallway sensor', type:'Smart home', address:'192.0.2.35', status:'unfamiliar'}
    ];
    const state = {devices:samples(), history:[], scan(){if(!this.devices.some(d=>d.name==='Guest tablet')) {this.devices.push({name:'Guest tablet',type:'Tablet',address:'192.0.2.48',status:'unfamiliar'});this.history.unshift('Simulated discovery: Guest tablet added for review.');return true;} return false;}, reset(){this.devices=samples();this.history=[];}};
    return state;
  }
  if(typeof module!=='undefined' && module.exports) module.exports={createDemo};
  if(typeof document==='undefined') return;
  const demo=createDemo(), $=id=>document.getElementById(id);
  function render(){
    $('total').textContent=demo.devices.length; $('known').textContent=demo.devices.filter(d=>d.status==='known').length; $('unfamiliar').textContent=demo.devices.filter(d=>d.status==='unfamiliar').length;
    const query=$('search').value.trim().toLowerCase(); const list=$('devices'); list.replaceChildren();
    const matches=demo.devices.filter(d=>Object.values(d).some(v=>v.toLowerCase().includes(query)));
    matches.forEach(d=>{const row=document.createElement('tr'); [d.name,d.type,d.address,d.status==='known'?'Known':'Unfamiliar'].forEach((value,i)=>{const td=document.createElement('td');td.textContent=value;if(i===3)td.className=d.status;row.append(td);});list.append(row);});
    $('empty').hidden=matches.length>0; $('history').textContent=demo.history[0] || 'No simulated changes yet.';
  }
  $('scan').addEventListener('click',()=>{const added=demo.scan();$('message').textContent=added?'Simulation complete: one fictional device added. No network was scanned.':'Simulation already complete. Reset to try again.';render();});
  $('reset').addEventListener('click',()=>{demo.reset();$('search').value='';$('message').textContent='Demo reset to fictional sample devices.';render();});
  $('search').addEventListener('input',render); render();
})(globalThis);
