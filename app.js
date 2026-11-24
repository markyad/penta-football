const $=s=>document.querySelector(s), esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem('penta-'+k))??d}catch{return d}},persist=(k,v)=>localStorage.setItem('penta-'+k,JSON.stringify(v));
let shortlist=read('shortlist',[]),briefs=read('briefs',[]),reports=read('reports',[]),selected=[],currentFilters=null;
const players=[
  {
    "id": 717411,
    "name": "Yegor Yarmolyuk",
    "initials": "YY",
    "age": 22,
    "pos": "CM",
    "role": "Central Midfield",
    "otherRoles": [
      "AM",
      "DM"
    ],
    "height": 180,
    "foot": "Right",
    "value": 32.0,
    "pool": "Roster",
    "club": "Brentford FC",
    "nationality": "Ukraine",
    "contract": "2031",
    "source": "https://www.transfermarkt.com/yegor-yarmolyuk/profil/spieler/717411",
    "photo": "assets/players/717411.jpg",
    "score": null,
    "metrics": [],
    "note": "Central Midfield · Brentford FC. Contract through 2031."
  },
  {
    "id": 404842,
    "name": "Vitaliy Mykolenko",
    "initials": "VM",
    "age": 27,
    "pos": "LB",
    "role": "Left-Back",
    "otherRoles": [
      "CB"
    ],
    "height": 180,
    "foot": "Left",
    "value": 25.0,
    "pool": "Roster",
    "club": "Everton FC",
    "nationality": "Ukraine",
    "contract": "2029",
    "source": "https://www.transfermarkt.com/vitaliy-mykolenko/profil/spieler/404842",
    "photo": "assets/players/404842.jpg",
    "score": null,
    "metrics": [],
    "note": "Left-Back · Everton FC. Contract through 2029."
  },
  {
    "id": 623325,
    "name": "Georgiy Sudakov",
    "initials": "GS",
    "age": 24,
    "pos": "AM",
    "role": "Attacking Midfield",
    "otherRoles": [
      "CM"
    ],
    "height": 177,
    "foot": "Both",
    "value": 25.0,
    "pool": "Roster",
    "club": "SL Benfica",
    "nationality": "Ukraine",
    "contract": "2029",
    "source": "https://www.transfermarkt.com/georgiy-sudakov/profil/spieler/623325",
    "photo": "assets/players/623325.jpg",
    "score": null,
    "metrics": [],
    "note": "Attacking Midfield · SL Benfica. Contract through 2029."
  },
  {
    "id": 628331,
    "name": "Giannis Konstantelias",
    "initials": "GK",
    "age": 23,
    "pos": "AM",
    "role": "Attacking Midfield",
    "otherRoles": [
      "LW"
    ],
    "height": 178,
    "foot": "Both",
    "value": 22.0,
    "pool": "Roster",
    "club": "Borussia Dortmund",
    "nationality": "Greece",
    "contract": "2031",
    "source": "https://www.transfermarkt.com/giannis-konstantelias/profil/spieler/628331",
    "photo": "assets/players/628331.jpg",
    "score": null,
    "metrics": [],
    "note": "Attacking Midfield · Borussia Dortmund. Contract through 2031."
  },
  {
    "id": 537860,
    "name": "Mykhaylo Mudryk",
    "initials": "MM",
    "age": 25,
    "pos": "LW",
    "role": "Left Winger",
    "otherRoles": [
      "RW"
    ],
    "height": 175,
    "foot": "Right",
    "value": 15.0,
    "pool": "Roster",
    "club": "Tottenham Hotspur",
    "nationality": "Ukraine",
    "contract": "2027",
    "source": "https://www.transfermarkt.com/mykhaylo-mudryk/profil/spieler/537860",
    "photo": "assets/players/537860.jpg",
    "score": null,
    "metrics": [],
    "note": "Left Winger · Tottenham Hotspur. Contract through 2027."
  },
  {
    "id": 289059,
    "name": "Mykola Matvienko",
    "initials": "MM",
    "age": 30,
    "pos": "CB",
    "role": "Centre-Back",
    "otherRoles": [
      "LB"
    ],
    "height": 182,
    "foot": "Left",
    "value": 12.0,
    "pool": "Roster",
    "club": "Shakhtar Donetsk",
    "nationality": "Ukraine",
    "contract": "2027",
    "source": "https://www.transfermarkt.com/mykola-matvienko/profil/spieler/289059",
    "photo": "assets/players/289059.jpg",
    "score": null,
    "metrics": [],
    "note": "Centre-Back · Shakhtar Donetsk. Contract through 2027."
  },
  {
    "id": 665048,
    "name": "Arseniy Batagov",
    "initials": "AB",
    "age": 24,
    "pos": "CB",
    "role": "Centre-Back",
    "otherRoles": [
      "DM",
      "LB"
    ],
    "height": 185,
    "foot": "Left",
    "value": 10.0,
    "pool": "Roster",
    "club": "Trabzonspor",
    "nationality": "Ukraine",
    "contract": "2028",
    "source": "https://www.transfermarkt.com/arseniy-batagov/profil/spieler/665048",
    "photo": "assets/players/665048.jpg",
    "score": null,
    "metrics": [],
    "note": "Centre-Back · Trabzonspor. Contract through 2028."
  },
  {
    "id": 669306,
    "name": "Volodymyr Brazhko",
    "initials": "VB",
    "age": 24,
    "pos": "DM",
    "role": "Defensive Midfield",
    "otherRoles": [
      "CM"
    ],
    "height": 187,
    "foot": "Right",
    "value": 10.0,
    "pool": "Roster",
    "club": "Dynamo Kyiv",
    "nationality": "Ukraine",
    "contract": "2029",
    "source": "https://www.transfermarkt.com/volodymyr-brazhko/profil/spieler/669306",
    "photo": "assets/players/669306.jpg",
    "score": null,
    "metrics": [],
    "note": "Defensive Midfield · Dynamo Kyiv. Contract through 2029."
  },
  {
    "id": 1067225,
    "name": "Taras Mykhavko",
    "initials": "TM",
    "age": 21,
    "pos": "CB",
    "role": "Centre-Back",
    "otherRoles": [],
    "height": 188,
    "foot": "Left",
    "value": 10.0,
    "pool": "Roster",
    "club": "Dynamo Kyiv",
    "nationality": "Ukraine",
    "contract": "2030",
    "source": "https://www.transfermarkt.com/taras-mykhavko/profil/spieler/1067225",
    "photo": "assets/players/1067225.jpg",
    "score": null,
    "metrics": [],
    "note": "Centre-Back · Dynamo Kyiv. Contract through 2030."
  },
  {
    "id": 368611,
    "name": "Mykola Shaparenko",
    "initials": "MS",
    "age": 28,
    "pos": "CM",
    "role": "Central Midfield",
    "otherRoles": [
      "AM"
    ],
    "height": 178,
    "foot": "Right",
    "value": 8.0,
    "pool": "Roster",
    "club": "Dynamo Kyiv",
    "nationality": "Ukraine",
    "contract": "2030",
    "source": "https://www.transfermarkt.com/mykola-shaparenko/profil/spieler/368611",
    "photo": "assets/players/368611.jpg",
    "score": null,
    "metrics": [],
    "note": "Central Midfield · Dynamo Kyiv. Contract through 2030."
  },
  {
    "id": 396394,
    "name": "Valeriy Bondar",
    "initials": "VB",
    "age": 27,
    "pos": "CB",
    "role": "Centre-Back",
    "otherRoles": [
      "RB"
    ],
    "height": 185,
    "foot": "Right",
    "value": 8.0,
    "pool": "Roster",
    "club": "Shakhtar Donetsk",
    "nationality": "Ukraine",
    "contract": "2031",
    "source": "https://www.transfermarkt.com/valeriy-bondar/profil/spieler/396394",
    "photo": "assets/players/396394.jpg",
    "score": null,
    "metrics": [],
    "note": "Centre-Back · Shakhtar Donetsk. Contract through 2031."
  },
  {
    "id": 537854,
    "name": "Artem Bondarenko",
    "initials": "AB",
    "age": 26,
    "pos": "AM",
    "role": "Attacking Midfield",
    "otherRoles": [
      "CM"
    ],
    "height": 187,
    "foot": "Left",
    "value": 8.0,
    "pool": "Roster",
    "club": "Al-Ahli SFC",
    "nationality": "Ukraine",
    "contract": "2027",
    "source": "https://www.transfermarkt.com/artem-bondarenko/profil/spieler/537854",
    "photo": "assets/players/537854.jpg",
    "score": null,
    "metrics": [],
    "note": "Attacking Midfield · Al-Ahli SFC. Contract through 2027."
  },
  {
    "id": 597880,
    "name": "Dmytro Riznyk",
    "initials": "DR",
    "age": 27,
    "pos": "GK",
    "role": "Goalkeeper",
    "otherRoles": [],
    "height": 191,
    "foot": "Right",
    "value": 8.0,
    "pool": "Roster",
    "club": "Shakhtar Donetsk",
    "nationality": "Ukraine",
    "contract": "2031",
    "source": "https://www.transfermarkt.com/dmytro-riznyk/profil/spieler/597880",
    "photo": "assets/players/597880.jpg",
    "score": null,
    "metrics": [],
    "note": "Goalkeeper · Shakhtar Donetsk. Contract through 2031."
  },
  {
    "id": 858712,
    "name": "Pedro Henrique",
    "initials": "PH",
    "age": 24,
    "pos": "LB",
    "role": "Left-Back",
    "otherRoles": [],
    "height": 177,
    "foot": "Left",
    "value": 8.0,
    "pool": "Roster",
    "club": "Shakhtar Donetsk",
    "nationality": "Brazil",
    "contract": "2030",
    "source": "https://www.transfermarkt.com/pedro-henrique/profil/spieler/858712",
    "photo": "assets/players/858712.jpg",
    "score": null,
    "metrics": [],
    "note": "Left-Back · Shakhtar Donetsk. Contract through 2030."
  },
  {
    "id": 708241,
    "name": "Oleg Ocheretko",
    "initials": "OO",
    "age": 23,
    "pos": "AM",
    "role": "Attacking Midfield",
    "otherRoles": [
      "RW",
      "CM"
    ],
    "height": 181,
    "foot": "Left",
    "value": 7.0,
    "pool": "Roster",
    "club": "Shakhtar Donetsk",
    "nationality": "Ukraine",
    "contract": "2030",
    "source": "https://www.transfermarkt.com/oleg-ocheretko/profil/spieler/708241",
    "photo": "assets/players/708241.jpg",
    "score": null,
    "metrics": [],
    "note": "Attacking Midfield · Shakhtar Donetsk. Contract through 2030."
  },
  {
    "id": 592878,
    "name": "Adam Markhiev",
    "initials": "AM",
    "age": 24,
    "pos": "DM",
    "role": "Defensive Midfield",
    "otherRoles": [
      "CM",
      "AM"
    ],
    "height": 183,
    "foot": "Right",
    "value": 6.0,
    "pool": "Roster",
    "club": "1.FC Nuremberg",
    "nationality": "Finland",
    "contract": "2030",
    "source": "https://www.transfermarkt.com/adam-markhiev/profil/spieler/592878",
    "photo": "assets/players/592878.jpg",
    "score": null,
    "metrics": [],
    "note": "Defensive Midfield · 1.FC Nuremberg. Contract through 2030."
  },
  {
    "id": 289075,
    "name": "Oleksandr Zubkov",
    "initials": "OZ",
    "age": 30,
    "pos": "RW",
    "role": "Right Winger",
    "otherRoles": [
      "LW",
      "AM"
    ],
    "height": 182,
    "foot": "Left",
    "value": 5.0,
    "pool": "Roster",
    "club": "AEK Athens",
    "nationality": "Ukraine",
    "contract": "2030",
    "source": "https://www.transfermarkt.com/oleksandr-zubkov/profil/spieler/289075",
    "photo": "assets/players/289075.jpg",
    "score": null,
    "metrics": [],
    "note": "Right Winger · AEK Athens. Contract through 2030."
  },
  {
    "id": 805834,
    "name": "Sławomir Abramowicz",
    "initials": "SA",
    "age": 22,
    "pos": "GK",
    "role": "Goalkeeper",
    "otherRoles": [],
    "height": 189,
    "foot": "Left",
    "value": 5.0,
    "pool": "Roster",
    "club": "Jagiellonia Bialystok",
    "nationality": "Poland",
    "contract": "2028",
    "source": "https://www.transfermarkt.com/slawomir-abramowicz/profil/spieler/805834",
    "photo": "assets/players/805834.jpg",
    "score": null,
    "metrics": [],
    "note": "Goalkeeper · Jagiellonia Bialystok. Contract through 2028."
  },
  {
    "id": 537852,
    "name": "Dmytro Kryskiv",
    "initials": "DK",
    "age": 26,
    "pos": "CM",
    "role": "Central Midfield",
    "otherRoles": [
      "DM"
    ],
    "height": 180,
    "foot": "Right",
    "value": 4.0,
    "pool": "Roster",
    "club": "Shakhtar Donetsk",
    "nationality": "Ukraine",
    "contract": "2030",
    "source": "https://www.transfermarkt.com/dmytro-kryskiv/profil/spieler/537852",
    "photo": "assets/players/537852.jpg",
    "score": null,
    "metrics": [],
    "note": "Central Midfield · Shakhtar Donetsk. Contract through 2030."
  },
  {
    "id": 580765,
    "name": "Henry Lawrence",
    "initials": "HL",
    "age": 25,
    "pos": "RB",
    "role": "Right-Back",
    "otherRoles": [
      "LB",
      "CB"
    ],
    "height": 175,
    "foot": "Right",
    "value": 4.0,
    "pool": "Roster",
    "club": "Standard Liège",
    "nationality": "England",
    "contract": "2029",
    "source": "https://www.transfermarkt.com/henry-lawrence/profil/spieler/580765",
    "photo": "assets/players/580765.jpg",
    "score": null,
    "metrics": [],
    "note": "Right-Back · Standard Liège. Contract through 2029."
  },
  {
    "id": 890368,
    "name": "Djé D'Avilla",
    "initials": "DD",
    "age": 23,
    "pos": "DM",
    "role": "Defensive Midfield",
    "otherRoles": [
      "CM"
    ],
    "height": 191,
    "foot": "Right",
    "value": 4.0,
    "pool": "Roster",
    "club": "Chicago Fire FC",
    "nationality": "Cote d'Ivoire",
    "contract": "2028",
    "source": "https://www.transfermarkt.com/dje-davilla/profil/spieler/890368",
    "photo": "assets/players/890368.jpg",
    "score": null,
    "metrics": [],
    "note": "Defensive Midfield · Chicago Fire FC. Contract through 2028."
  },
  {
    "id": 1161403,
    "name": "Nazar Domchak",
    "initials": "ND",
    "age": 19,
    "pos": "GK",
    "role": "Goalkeeper",
    "otherRoles": [],
    "height": 190,
    "foot": "Right",
    "value": 4.0,
    "pool": "Roster",
    "club": "SK Slavia Prague",
    "nationality": "Ukraine",
    "contract": "2031",
    "source": "https://www.transfermarkt.com/nazar-domchak/profil/spieler/1161403",
    "photo": "assets/players/1161403.jpg",
    "score": null,
    "metrics": [],
    "note": "Goalkeeper · SK Slavia Prague. Contract through 2031."
  },
  {
    "id": 221958,
    "name": "Roman Yaremchuk",
    "initials": "RY",
    "age": 30,
    "pos": "ST",
    "role": "Centre-Forward",
    "otherRoles": [],
    "height": 191,
    "foot": "Right",
    "value": 3.5,
    "pool": "Roster",
    "club": "Olympiacos Piraeus",
    "nationality": "Ukraine",
    "contract": "2028",
    "source": "https://www.transfermarkt.com/roman-yaremchuk/profil/spieler/221958",
    "photo": "assets/players/221958.jpg",
    "score": null,
    "metrics": [],
    "note": "Centre-Forward · Olympiacos Piraeus. Contract through 2028."
  },
  {
    "id": 417242,
    "name": "Ruslan Neshcheret",
    "initials": "RN",
    "age": 24,
    "pos": "GK",
    "role": "Goalkeeper",
    "otherRoles": [],
    "height": 190,
    "foot": "Right",
    "value": 3.5,
    "pool": "Roster",
    "club": "Dynamo Kyiv",
    "nationality": "Ukraine",
    "contract": "2031",
    "source": "https://www.transfermarkt.com/ruslan-neshcheret/profil/spieler/417242",
    "photo": "assets/players/417242.jpg",
    "score": null,
    "metrics": [],
    "note": "Goalkeeper · Dynamo Kyiv. Contract through 2031."
  },
  {
    "id": 287792,
    "name": "Oleksandr Tymchyk",
    "initials": "OT",
    "age": 29,
    "pos": "RB",
    "role": "Right-Back",
    "otherRoles": [],
    "height": 180,
    "foot": "Right",
    "value": 3.0,
    "pool": "Roster",
    "club": "Dynamo Kyiv",
    "nationality": "Ukraine",
    "contract": "2028",
    "source": "https://www.transfermarkt.com/oleksandr-tymchyk/profil/spieler/287792",
    "photo": "assets/players/287792.jpg",
    "score": null,
    "metrics": [],
    "note": "Right-Back · Dynamo Kyiv. Contract through 2028."
  }
];
const get=id=>players.find(p=>p.id===Number(id));
shortlist=shortlist.filter(id=>get(id));
const portrait=p=>`<span class="avatar"><img src="${p.photo}" alt="" width="48" height="52" loading="lazy"></span>`;
const stature=p=>`${p.height?p.height+' cm':'—'} · ${p.foot}`;
const sourceCaption='Transfermarkt · snapshot 24 November 2026';
const profileSource=p=>`<a href="${p.source}" target="_blank" rel="noopener noreferrer">Transfermarkt profile</a>`;
const logo=`<span class="mark" aria-hidden="true"></span><span>PENTA</span>`;
function toast(s){$('#toast').textContent=s;$('#toast').classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3500)}
function modal(html,wide=false){$('#overlay').innerHTML=`<div class="dialog-backdrop"><section class="dialog ${wide?'wide':''}" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1"><button class="close" onclick="closeModal()" aria-label="Close dialog">×</button>${html}</section></div>`;$('.dialog').focus();document.body.style.overflow='hidden'}
function closeModal(){$('#overlay').innerHTML='';document.body.style.overflow=''}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();if(e.key==='Tab'&&$('.dialog')){const els=[...$('.dialog').querySelectorAll('button,a,input,select,textarea,[tabindex="0"]')].filter(x=>!x.disabled);if(e.shiftKey&&document.activeElement===els[0]){e.preventDefault();els.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===els.at(-1)){e.preventDefault();els[0].focus()}}});
$('#overlay').addEventListener('click',e=>{if(e.target.classList.contains('dialog-backdrop'))closeModal()});
let techPriority='central';
const techPresets={central:{label:'Central midfield',role:'CM',weights:[70,15,15],description:'A central midfield role puts Yarmolyuk’s primary position first, with Sudakov’s secondary position also considered.'},left:{label:'Left defence',role:'LB',weights:[70,15,15],description:'The role shifts to left-back. Mykolenko moves to the front because his primary position matches the club’s preference.'},creative:{label:'Attacking midfield',role:'AM',weights:[70,15,15],description:'Sudakov and Konstantelias share the primary role. Age and valuation distinguish their profile fit within this four-player group.'}};
const fitSignals=['Position match','Age preference','Valuation headroom'];
function techRanking(key){const preset=techPresets[key]||techPresets.central;return players.slice(0,4).map(p=>{const signals=[p.pos===preset.role?100:p.otherRoles.includes(preset.role)?70:0,(27-p.age)/5*100,(35-p.value)/35*100];return {player:p,signals,fit:signals.reduce((sum,v,i)=>sum+v*preset.weights[i]/100,0)}}).sort((a,b)=>b.fit-a.fit||a.player.id-b.player.id)}
function techCalculator(){const preset=techPresets[techPriority],rows=techRanking(techPriority);return `<div class="fit-top"><span class="eyebrow">HOW CONTEXT CHANGES FIT</span><span class="fit-example">Four player profiles</span></div><h3>What does the club<br>need most?</h3><div class="fit-priorities" role="group" aria-label="Club recruitment priority">${Object.entries(techPresets).map(([key,p])=>`<button id="priority-${key}" aria-pressed="${techPriority===key}" onclick="setTechPriority('${key}')">${p.label}</button>`).join('')}</div><p class="fit-context">${preset.description}</p><div class="fit-fixed"><span>THE SEARCH ENVELOPE</span><p>22–27 years · market valuation ≤ €35M<br>Role preference: ${preset.label.toLowerCase()}</p></div><div class="fit-weights">${preset.weights.map((w,i)=>`<div><div><span>${fitSignals[i]}</span><b>${w}%</b></div><div class="fit-weight-bar"><i style="width:${w}%"></i></div></div>`).join('')}</div><div class="fit-results" aria-live="polite" aria-atomic="true"><div class="fit-results-label"><span>PRIORITY ORDER</span><span>PROFILE FIT / 100</span></div>${rows.map(({player:p,fit},i)=>`<div class="fit-result real-player ${i===0?'first':''}">${portrait(p)}<div><a class="fit-player-name" href="${p.source}" target="_blank" rel="noopener noreferrer"><strong>${p.name}</strong></a><small>${p.club} · ${p.pos} · €${p.value}M</small><small>${p.pos===preset.role?'Primary position matches':p.otherRoles.includes(preset.role)?'Secondary position matches':'Different primary position'}</small></div><b>${fit.toFixed(1)}</b></div>`).join('')}</div><details class="fit-formula"><summary>Show the calculation <span>＋</span></summary><p>Profile fit = position match × 0.70 + age preference × 0.15 + valuation headroom × 0.15.</p><p>Position: primary 100, listed secondary 70, other 0. Age preference: (27 − age) ÷ 5 × 100. Valuation headroom: (€35M − market value) ÷ €35M × 100. Younger age and lower valuation are the preferences in this search. Market values are estimates, not asking prices.</p><p>Inputs: Transfermarkt, 24 November 2026. This transparent rule compares profile attributes; match-event performance and scout assessments are separate evidence layers.</p></details>`}
function setTechPriority(key){if(!techPresets[key])return;techPriority=key;const el=document.getElementById('fit-calculator');if(el){el.innerHTML=techCalculator();document.getElementById('priority-'+key)?.focus({preventScroll:true})}}

function landing(){return `<nav class="site-nav"><a href="#home" class="brand" aria-label="PENTA home">${logo}</a><div class="navlinks"><a href="#workflow">The platform</a><a href="#technology">Technology</a><a href="#intelligence">The desk</a><a href="#company">Our company</a></div><div class="nav-actions"><a href="#desk">Workspace ↗</a><button class="btn mint small" onclick="accessForm()">Request access <span>↗</span></button></div></nav>
<main><section class="hero hero-editorial"><div class="editorial-kicker"><span>FOOTBALL RECRUITMENT INTELLIGENCE</span><span>FOR THE PEOPLE BEHIND THE NEXT MOVE</span></div><div class="editorial-intro"><h1>THE NEXT MOVE.<br><em>BETTER INFORMED.</em></h1><div class="editorial-copy"><p>Every club has a brief.<br>Every player has a context.<br>Bring the whole picture into focus.</p><button class="editorial-access" onclick="accessForm()">Request professional access <span aria-hidden="true">↗</span></button></div></div><figure class="editorial-frame"><img src="assets/stadium-night.jpg" alt="A football stadium seen from above under the floodlights" width="2400" height="1599" fetchpriority="high" decoding="async"><figcaption><span class="frame-index">01 / THE WIDER VIEW</span><span class="frame-statement">Good decisions start<br>with perspective.</span></figcaption><a href="#desk" class="frame-entry"><span>THE PENTA WORKSPACE</span><span aria-hidden="true">↗</span></a></figure><div class="editorial-footer"><span>CLUBS · AGENCIES · PROFESSIONAL NETWORKS</span><a href="#workflow">FROM THE BRIEF TO THE DECISION <span>↓</span></a><a class="photo-credit" href="https://unsplash.com/photos/Q1nOuKleRoc" target="_blank" rel="noopener noreferrer">PHOTOGRAPHY / MARK MC NEILL</a></div></section>
<section id="workflow" class="section"><div class="eyebrow">01 / The recruitment workflow</div><div class="split-heading"><h2>LESS SEARCHING.<br>MORE SCOUTING.</h2><p>A club brief should lead to a decision. Bring the requirements, player context and your team’s judgement into one continuous workflow.</p></div><div class="workflow">${[['Define the brief','Set the role, budget and non-negotiables. Keep preferences separate from hard constraints.'],['Find the fit','Work through your roster, partner network and market scope without mixing them.'],['Build conviction','Compare profiles, record observations and review the evidence behind a recommendation.'],['Make the case','Build a shortlist and prepare a consistent player report for the next conversation.']].map((s,i)=>`<article class="workstep"><span class="step-no">0${i+1} ↗</span><h3>${s[0]}</h3><p>${s[1]}</p></article>`).join('')}</div></section>
<section id="technology" class="section technology-section"><div class="eyebrow">02 / PENTA FIT ENGINE — APPLIED AI</div><div class="tech-intro"><h2>FOOTBALL CONTEXT.<br>MACHINE INTELLIGENCE.</h2><p>We’re building an AI recruitment engine that connects what a club asks for with how a player performs — and the evidence a scout needs to make the call.</p></div><div class="data-footprint"><div class="data-footprint-heading"><div><span class="eyebrow">PUBLIC-MARKET REFERENCE</span><h3>A real-world reference<br>for the data model.</h3></div><p>A portfolio snapshot puts the scale in context: players across roles and clubs, with age, nationality, contract horizons and market valuations.</p></div><dl class="footprint-stats"><div><dt>Player profiles</dt><dd>685</dd><span>In the reference portfolio</span></div><div><dt>Top-flight players</dt><dd>233</dd><span>Across first-tier competitions</span></div><div><dt>Combined estimated market value</dt><dd>€406.66<span>M</span></dd><span>Sum of player valuations</span></div><div><dt>Highest individual market value</dt><dd>€32<span>M</span></dd><span>At the top of the portfolio</span></div></dl><div class="footprint-caption"><span>REFERENCE PORTFOLIO · TRANSFERMARKT</span><span>Snapshot observed 24 November 2026</span></div></div>
<div class="tech-layout"><div class="tech-explainer"><h3>The right player.<br>For this club.</h3><p>A player’s value to a team depends on the role, the playing style and the brief. PENTA’s technical focus is <strong>club-conditioned ranking</strong>: learning which signals matter in that specific context.</p><ol class="tech-layers"><li><span>01</span><div><h4>Understand the request</h4><p>A language model translates the club’s brief into a validated search plan: mandatory constraints, tactical intent and preferences.</p><small>LANGUAGE MODEL + STRUCTURED VALIDATION</small></div></li><li><span>02</span><div><h4>Model the football fit</h4><p>A player–role–club graph connects performance signals to role demands. A ranking model can be calibrated on scouts’ reviewed decisions.</p><small>HYBRID RETRIEVAL + CONTEXTUAL RANKING</small></div></li><li><span>03</span><div><h4>Keep the evidence attached</h4><p>Recommendations are designed to carry source records, season, minutes and relevant clips. Missing or stale evidence becomes a review task.</p><small>PROVENANCE + HUMAN REVIEW</small></div></li></ol></div><div class="fit-calculator" id="fit-calculator">${techCalculator()}</div></div><details class="tech-method"><summary><span>The engineering underneath</span><span aria-hidden="true">＋</span></summary><div class="tech-method-grid"><div><h4>A shared football representation</h4><p>The proposed graph links player identities, role profiles, match events and club requirements. Embeddings retrieve relevant profiles; database rules enforce age, price and scope.</p></div><div><h4>A learning loop with a referee</h4><p>Scout accept/reject decisions become labelled ranking examples. Model updates are evaluated offline and reviewed before release; preferences stay separate for each organisation.</p></div><div><h4>Measured against the desk</h4><p>The evaluation plan tracks constraint errors, top-of-list scout agreement, evidence completeness and time to a reviewed shortlist against the manual process.</p></div></div></details></section>
<section id="intelligence" class="section dark product-section decision-section"><div><div class="eyebrow" style="color:var(--mint)">03 / The recruitment decision</div><h2 style="margin-top:25px">FROM ANALYSIS<br>TO DECISION.</h2><p>Your team brings football judgement to the recommendation. Check the evidence, agree the next step and take a clear, balanced report to the club.</p><a href="#desk" class="btn mint">Explore the workspace <span>↗</span></a><div class="decision-principles"><div><span>01</span><div><h3>Give the scout a voice.</h3><p>Record what the numbers explain, what the video reveals and what still needs a closer look.</p></div></div><div><span>02</span><div><h3>Make the next step explicit.</h3><p>Bring the team’s judgement together around a clear recommendation and its conditions.</p></div></div><div><span>03</span><div><h3>Carry the reasoning forward.</h3><p>Put the fit, the trade-offs and the supporting evidence into the club conversation.</p></div></div></div></div><div class="decision-memo"><div class="memo-header"><span class="eyebrow">THE RECRUITMENT REVIEW</span><span>Workflow example</span></div><h3>The reasoning travels<br>with the recommendation.</h3><div class="memo-stage"><div class="memo-stage-label"><span>01</span><h4>SCOUT REVIEW</h4></div><blockquote>“The passing profile fits. I want to see how he recovers when the first press is beaten.”</blockquote><div class="memo-next"><span>FOLLOW-UP</span><p>Review the transition sequences.</p></div></div><div class="memo-stage"><div class="memo-stage-label"><span>02</span><h4>TEAM DECISION</h4></div><div class="memo-verdict"><strong>Progress after video review.</strong><span>Conditional</span></div><p class="memo-explanation">Keep the build-up fit. Resolve the recovery question before advancing. The next scout sees the reasoning, not just a saved name.</p></div><div class="memo-stage memo-report"><div class="memo-stage-label"><span>03</span><h4>CLUB REPORT</h4></div><div class="memo-report-preview"><span class="memo-paper-icon" aria-hidden="true"><i></i><i></i><i></i></span><div><strong>Fit. Trade-offs. Evidence.</strong><p>A concise report for the sporting director, with the open questions still visible.</p></div></div><a href="#reports" class="memo-report-link">Open the reports workspace <span>↗</span></a></div><div class="memo-footer">A shared record of the judgement behind the shortlist.</div></div></section>

<section id="company" class="section founder"><div><div class="eyebrow">04 / Built from inside football</div><h2 style="margin-top:25px">FOOTBALL FIRST.<br>TECHNOLOGY<br>WITH PURPOSE.</h2></div><div><p style="margin-top:0">PENTA is an independent sport technology venture founded by Vadym Shablii. The starting point is a practical problem: too much of a scouting team’s week disappears between databases, video and reports.</p><p>The ambition is a shared operating layer for professional recruitment — connecting the brief, the analysis and the decision.</p><div class="founder-note" style="margin-top:35px"><span class="founder-portrait"><img src="assets/vadym-shablii.jpg" alt="Vadym Shablii" width="1290" height="1395" loading="lazy" decoding="async"></span><div><h3>Vadym Shablii</h3><p style="margin-top:8px">Founder, PENTA</p></div></div></div><div class="media-outreach" aria-label="Media outreach targets"><div class="media-outreach-heading"><span class="eyebrow">MEDIA OUTREACH</span><span>Editorial targets</span></div><ul class="media-logos"><li><img src="assets/bbc-sport.svg" alt="BBC Sport" width="200" height="36" loading="lazy" decoding="async"></li><li><img src="assets/sky-sports.svg" alt="Sky Sports" width="512" height="107" loading="lazy" decoding="async"></li><li><img src="assets/the-athletic.svg" alt="The Athletic" width="512" height="48" loading="lazy" decoding="async"></li><li><img src="assets/the-guardian.svg" alt="The Guardian" width="295" height="97" loading="lazy" decoding="async"></li></ul></div></section>
<section class="section cta-section"><div><div class="eyebrow" style="margin-bottom:20px">Professional organisations only</div><h2>YOUR NEXT WINDOW<br>STARTS HERE.</h2></div><button class="btn" onclick="accessForm()">Request access <span>↗</span></button></section></main><footer class="footer"><a href="#home" class="brand">${logo}</a><div class="footer-company"><span>Independent football intelligence.</span><address class="footer-address">167-169 Great Portland Street,<br>London, England, W1W 5PF</address></div><span>© ${new Date().getFullYear()} PENTA</span><a href="#desk">Professional workspace ↗</a></footer>`}
const routes={desk:['◫','Overview'],briefs:['▤','Club briefs'],players:['◎','Player intelligence'],shortlist:['☆','Shortlist'],reports:['↗','Reports'],settings:['⚙','Workspace settings']};
function shell(route){const title=routes[route]?.[1]||'Overview';return `<div class="shell"><aside class="sidebar"><a href="#home" class="brand">${logo}</a><div class="org"><b>PT</b><div>${esc(read('preferences',{org:'PENTA recruitment'}).org)}<span>Professional workspace</span></div></div><div class="side-label">RECRUITMENT</div><nav class="sidenav">${Object.entries(routes).map(([k,[i,n]])=>`<a class="${k===route?'active':''}" href="#${k}"><span>${i}</span><span>${n}</span></a>`).join('')}</nav><div class="side-bottom"><a href="#home">↗ Public website</a><a href="#settings">Workspace preferences</a><span style="padding:0 14px;font-size:9px">PENTA / FOOTBALL INTELLIGENCE</span></div></aside><div class="workspace"><header class="topbar"><span>Workspace <span style="padding:0 10px;color:#b2bdbc">/</span> <strong>${title}</strong></span><div class="top-right"><span><i class="dot" style="background:#268573"></i>Recruitment desk</span><a href="#settings" class="user-circle" aria-label="Workspace settings">PT</a></div></header><main class="content" id="workspace-content">${routeContent(route)}</main></div></div>`}
function heading(title,sub,button=''){return `<div class="page-title"><div><h1>${title}</h1><p>${sub}</p></div>${button}</div>`}
function routeContent(route){if(route==='desk')return overview();if(route==='players')return playerPage();if(route==='briefs')return briefsPage();if(route==='shortlist')return shortlistPage();if(route==='reports')return reportsPage();if(route==='settings')return settingsPage();return overview()}
function overview(){return `${heading('THE RECRUITMENT DESK','Keep every brief, candidate and decision moving.',`<button class="btn small" onclick="briefForm()">＋ New club brief</button>`)}<div class="stats">${[[briefs.filter(b=>b.status!=='Archived').length,'Active club briefs','Recruitment pipeline'],[players.length,'Player profiles','Transfermarkt reference roster'],[shortlist.length,'Shortlisted players','Ready for closer review'],[reports.length,'Saved reports','Your club-ready selection']].map(([n,t,s])=>`<div class="stat"><label>${t}</label><b>${String(n).padStart(2,'0')}</b><small>${s}</small></div>`).join('')}</div><div class="desk-grid"><div><section class="panel"><div class="panel-title"><h3>Active club briefs</h3><a href="#briefs" class="link-btn">View all ↗</a></div>${briefs.filter(b=>b.status!=='Archived').length?briefs.filter(b=>b.status!=='Archived').slice(0,3).map(briefRow).join(''):`<div class="brief-card"><div><h3>Your next search starts with a brief.</h3><p>Define the club’s requirements before reviewing players.</p><div class="tags"><span>Role</span><span>Age range</span><span>Budget</span><span>Recruitment pool</span></div></div></div><button class="btn small" onclick="briefForm()">Create a club brief ↗</button>`}</section><section class="panel activity"><div class="panel-title"><h3>Players on your radar</h3><a href="#players" class="link-btn">Player intelligence ↗</a></div>${players.slice(0,3).map(p=>`<div class="preview-row">${portrait(p)}<div class="info"><button class="name-button" onclick="profile(${p.id})">${p.name}</button><small>${p.pos} · ${p.age} yrs · ${p.club}</small></div><button class="link-btn" onclick="toggleShortlist(${p.id},true)">${shortlist.includes(p.id)?'Saved ✓':'＋ Shortlist'}</button></div>`).join('')}<div class="sample-note">${sourceCaption}</div></section></div><div><section class="panel dark assistant-box"><div class="eyebrow" style="color:var(--mint)">PENTA / BRIEF BUILDER ↗</div><h2>WHO DOES YOUR<br>CLUB NEED?</h2><p>Start with a recruitment request. Review the extracted criteria before searching the player pool.</p><textarea id="quick-brief" aria-label="Recruitment request" placeholder="Attacking midfielder, 22–25, up to €30M"></textarea><button class="btn mint small" onclick="briefForm(document.getElementById('quick-brief').value)">Build the brief <span>↗</span></button></section><section class="panel activity"><div class="panel-title"><h3>A clear route to a decision</h3></div>${[['01','Define the non-negotiables','Role, age, height, budget and scope.'],['02','Review the fit','Compare candidates against the same criteria.'],['03','Build the recommendation','Record the judgement behind your shortlist.']].map(([n,t,s])=>`<div class="activity-row"><span class="activity-icon">${n}</span><div>${t}<small>${s}</small></div></div>`).join('')}</section></div></div>`}
function briefRow(b){return `<div class="brief-card"><div><h3>${esc(b.title)}</h3><p>${esc(b.club||'Club request')} · ${esc(b.pos)} · ${b.minAge}–${b.maxAge} yrs · ≤ €${b.budget}M</p><div class="tags"><span>${esc(b.pool)}</span><span>${b.height} cm+</span><span>${esc(b.foot)} foot preferred</span></div><button class="link-btn" onclick="openBrief('${b.id}')">Review candidates ↗</button></div><span class="pill">${esc(b.status)}</span></div>`}
function briefsPage(){return `${heading('CLUB BRIEFS','Turn the club’s requirements into a focused recruitment search.',`<button class="btn small" onclick="briefForm()">＋ New club brief</button>`)}${briefs.length?`<div class="briefs-grid">${briefs.map(b=>`<article class="brief-tile"><div style="display:flex;justify-content:space-between"><span class="eyebrow">${esc(b.id)}</span><span class="pill">${esc(b.status)}</span></div><h3>${esc(b.title)}</h3><p>${esc(b.club||'Club request')}</p><div class="tags"><span>${b.pos}</span><span>${b.minAge}–${b.maxAge} yrs</span><span>≤ €${b.budget}M</span><span>${esc(b.pool)}</span></div><p>${matching(b).length} candidates match the hard constraints</p><button class="btn small" onclick="openBrief('${b.id}')">Review candidates ↗</button><button class="link-btn" style="margin-top:18px" onclick="archiveBrief('${b.id}')">${b.status==='Archived'?'Reopen brief':'Archive brief'}</button></article>`).join('')}</div>`:empty('A better shortlist starts here.','Create a club brief to define the position, age, budget and recruitment scope.',`<button class="btn" onclick="briefForm()">Create your first brief ↗</button>`)}`}
function matching(b){return players.filter(p=>(b.pos==='All'||p.pos===b.pos)&&p.age>=+b.minAge&&p.age<=+b.maxAge&&(!+b.height||(p.height!=null&&p.height>=+b.height))&&p.value<=+b.budget&&(b.pool==='All pools'||p.pool===b.pool))}
function playerPage(){return `${heading('PLAYER INTELLIGENCE','One view of the player. Every requirement in context.',`<button class="btn small" onclick="compare()">Compare <span id="compare-count">${selected.length}</span></button>`)}${currentFilters?`<div class="filter-summary"><span><b>${esc(currentFilters.title||'Recruitment search')}</b><br>${currentFilters.pos} · ${currentFilters.minAge}–${currentFilters.maxAge} yrs · ${currentFilters.height} cm+ · ≤ €${currentFilters.budget}M · ${esc(currentFilters.pool)}</span><button class="link-btn" onclick="currentFilters=null;render()">Clear brief ×</button></div>`:''}<div class="toolbar"><input id="player-search" type="search" placeholder="Search name or club…" aria-label="Search players" oninput="updateTable()"><select id="position-filter" aria-label="Filter position" onchange="updateTable()"><option value="All">All positions</option>${['GK','CB','LB','RB','DM','CM','AM','LW','RW','ST'].map(x=>`<option>${x}</option>`).join('')}</select><select id="pool-filter" aria-label="Filter recruitment pool" onchange="updateTable()"><option value="All pools">All pools</option><option>Roster</option><option>Partner</option><option>Market</option></select></div><div id="player-table"></div><p class="sample-note">${sourceCaption} · Market values are estimates. Fit awaits performance evidence.</p>`}
function filteredPlayers(){const base=currentFilters?matching(currentFilters):players,q=($('#player-search')?.value||'').toLowerCase(),pos=$('#position-filter')?.value||'All',pool=$('#pool-filter')?.value||'All pools';return base.filter(p=>(p.name+' '+p.club).toLowerCase().includes(q)&&(pos==='All'||p.pos===pos)&&(pool==='All pools'||p.pool===pool)).sort((a,b)=>{const preferred=currentFilters?.foot;return (Number(b.foot===preferred)-Number(a.foot===preferred))||b.value-a.value})}
function table(list,withCheck=true){if(!list.length)return empty('No players match these criteria.','Adjust the filters or review the brief’s hard constraints.');return `<div class="table-wrap"><table><thead><tr>${withCheck?'<th>Compare</th>':''}<th>PLAYER / CLUB</th><th>ROLE</th><th>AGE</th><th>HEIGHT / FOOT</th><th>VALUE</th><th>POOL</th><th>FIT</th><th></th></tr></thead><tbody>${list.map(p=>`<tr>${withCheck?`<td><input type="checkbox" aria-label="Compare ${p.name}" ${selected.includes(p.id)?'checked':''} onchange="selectPlayer(${p.id},this)"></td>`:''}<td><div class="who">${portrait(p)}<div><button class="name-button" onclick="profile(${p.id})">${p.name}</button><small>${p.club}</small></div></div></td><td>${p.pos}</td><td>${p.age}</td><td>${stature(p)}</td><td>€${p.value.toFixed(1)}M</td><td><span class="pill ${p.pool==='Roster'?'':p.pool==='Partner'?'gray':'amber'}">${p.pool}</span></td><td class="score">${p.score??'—'}</td><td><button class="link-btn" onclick="toggleShortlist(${p.id},true)" aria-label="${shortlist.includes(p.id)?'Remove':'Shortlist'} ${p.name}">${shortlist.includes(p.id)?'Saved ✓':'＋ Save'}</button></td></tr>`).join('')}</tbody></table></div><div class="table-bottom"><span>${list.length} profiles · ordered by market value${currentFilters?.foot!=='Any'&&currentFilters?' after preferred foot':''}</span><span>Open a profile to review the full context ↗</span></div>`}
function nearMisses(){if(!currentFilters)return '';const b=currentFilters,ids=new Set(matching(b).map(p=>p.id));const candidates=players.filter(p=>!ids.has(p.id)&&(b.pos==='All'||p.pos===b.pos)).map(p=>{const reasons=[];if(p.age<+b.minAge||p.age>+b.maxAge)reasons.push('Age '+p.age+' outside '+b.minAge+'–'+b.maxAge);if(+b.height&&(p.height==null||p.height<+b.height))reasons.push(p.height==null?'Height not verified':'Height '+p.height+' cm below '+b.height+' cm');if(p.value>+b.budget)reasons.push('€'+p.value+'M exceeds €'+b.budget+'M budget');if(b.pool!=='All pools'&&p.pool!==b.pool)reasons.push(p.pool+' is outside '+b.pool+' scope');return {p,reasons}});return candidates.length?`<section class="panel" style="margin-top:25px"><div class="panel-title"><h3>Outside the brief</h3><span class="pill amber">Excluded from results</span></div>${candidates.map(({p,reasons})=>`<div class="activity-row"><div><button class="name-button" onclick="profile(${p.id})">${p.name}</button><small>${reasons.join(' · ')}</small></div></div>`).join('')}</section>`:''}
function updateTable(){if($('#player-table'))$('#player-table').innerHTML=table(filteredPlayers())+nearMisses();}
function selectPlayer(id,box){if(box.checked){if(selected.length>=3){box.checked=false;toast('Compare up to 3 players at a time.');return}selected.push(id)}else selected=selected.filter(x=>x!==id);if($('#compare-count'))$('#compare-count').textContent=selected.length}
function toggleShortlist(id,refresh=false){const exists=shortlist.includes(id);shortlist=exists?shortlist.filter(x=>x!==id):[...shortlist,id];persist('shortlist',shortlist);toast(exists?'Player removed from shortlist.':'Player added to shortlist.');if(refresh)render();if($('#profile-save'))$('#profile-save').textContent=shortlist.includes(id)?'Remove from shortlist':'＋ Add to shortlist'}
function shortlistPage(){const list=shortlist.map(get).filter(Boolean);return `${heading('YOUR SHORTLIST','Keep the candidates you want to take into the next conversation.',list.length?`<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn small ghost" onclick="compare()">Compare <span id="compare-count">${selected.length}</span></button><button class="btn small" onclick="saveReport()">Create club report ↗</button></div>`:'')}${list.length?table(list):empty('Make the next move.','Save players from intelligence to build your shortlist.',`<a href="#players" class="btn">Explore player intelligence ↗</a>`)}${list.length?`<div class="panel" style="margin-top:25px"><h3 style="font-size:15px;margin-bottom:15px">Recruitment notes</h3><textarea id="shortlist-notes" style="width:100%;min-height:100px" aria-label="Shortlist notes" placeholder="What should the sporting director know?">${esc(read('notes',''))}</textarea><button class="btn small" style="margin-top:12px" onclick="persist('notes',document.getElementById('shortlist-notes').value);toast('Recruitment notes saved.')">Save notes</button></div>`:''}`}
function empty(h,p,btn=''){return `<div class="empty"><h3>${h}</h3><p>${p}</p>${btn}</div>`}
function parseBrief(text){let t=text.toLowerCase();let pos=/centre.back|center.back|центральн.{0,8}за[щх]/.test(t)?'CB':/wing|вінгер|вингер/.test(t)?'LW':/attacking midfield|атакующ.{0,8}полуза/.test(t)?'AM':/defensive midfield|опорн/.test(t)?'DM':/left.back/.test(t)?'LB':/right.back/.test(t)?'RB':/midfield|полуза|півзах/.test(t)?'CM':/striker|напад|нападник/.test(t)?'ST':/goalkeeper|вратар|воротар/.test(t)?'GK':'CB';let ages=t.match(/(\d{2})\s*[–—-]\s*(\d{2})/),budget=t.match(/(?:€|eur\s*)(\d+(?:[.,]\d+)?)/),height=t.match(/\b(1[6-9]\d|20\d)\s*(?:cm|см|\+)/);return {pos,minAge:ages?+ages[1]:20,maxAge:ages?+ages[2]:24,budget:budget?+budget[1].replace(',','.'):3,height:height?+height[1]:0,foot:/left|лів|лев/.test(t)?'Left':'Any',pool:/our players|own roster|наших|наші|своих/.test(t)?'Roster':'All pools'}}
function briefForm(text=''){const b=parseBrief(text);if(!text)b.pool=read('preferences',{scope:'All pools'}).scope;modal(`<div class="eyebrow" style="color:var(--teal);margin-bottom:20px">RECRUITMENT / NEW BRIEF</div><h2 id="dialog-title">DEFINE THE NEXT MOVE.</h2><p class="sub">Confirm every criterion before running the search. Age, budget, height and pool are hard filters. Foot preference affects ordering.</p><form id="brief-form" class="formgrid"><label class="full">Club request<textarea name="description" placeholder="Describe the role and qualities you need">${esc(text)}</textarea></label><label>Brief title<input name="title" required value="${b.pos==='CB'?'Left-sided centre-back':b.pos==='CM'?'Box-to-box midfielder':'Recruitment search'}" maxlength="100"></label><label>Club / organisation<input name="club" placeholder="Club name" maxlength="100"></label><label>Position<select name="pos">${['GK','CB','LB','RB','DM','CM','AM','LW','RW','ST','All'].map(x=>`<option ${x===b.pos?'selected':''}>${x}</option>`).join('')}</select></label><label>Maximum transfer budget (€M)<input name="budget" type="number" min="0" max="300" step="0.1" required value="${b.budget}"></label><label>Minimum age<input name="minAge" type="number" min="16" max="45" required value="${b.minAge}"></label><label>Maximum age<input name="maxAge" type="number" min="16" max="45" required value="${b.maxAge}"></label><label>Minimum height (cm)<input name="height" type="number" min="0" max="220" required value="${b.height}"></label><label>Preferred foot<select name="foot">${['Any','Left','Right'].map(x=>`<option ${x===b.foot?'selected':''}>${x}</option>`).join('')}</select></label><label class="full">Recruitment scope<select name="pool">${['All pools','Roster','Partner','Market'].map(x=>`<option ${x===b.pool?'selected':''}>${x}</option>`).join('')}</select></label><button class="btn" type="submit">Save brief & find candidates ↗</button></form>`);$('#brief-form').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));if(+d.minAge>+d.maxAge){toast('Minimum age must not exceed maximum age.');return}const b={...d,id:'R-'+String(Date.now()).slice(-6),status:'Active',created:new Date().toISOString()};briefs.unshift(b);persist('briefs',briefs);currentFilters=b;closeModal();location.hash='players';render();toast(`${matching(b).length} candidates match the hard constraints.`)}}
function openBrief(id){currentFilters=briefs.find(b=>b.id===id);location.hash='players';render()}
function archiveBrief(id){let b=briefs.find(b=>b.id===id);b.status=b.status==='Archived'?'Active':'Archived';persist('briefs',briefs);render();toast(`Brief ${b.status.toLowerCase()}.`)}
function profile(id){const p=get(id);if(!p)return;modal(`<div class="eyebrow" style="color:var(--teal);margin:10px 0 20px">PLAYER INTELLIGENCE / ${p.pos}</div><h1 id="dialog-title" class="eyebrow" style="position:absolute;left:-9999px">${p.name} profile</h1><div class="profile-head">${portrait(p)}<div><h2>${p.name}</h2><p>${p.club} · ${p.nationality}</p></div></div><div class="profile-grid"><div><h3 style="font-size:14px">Player context</h3>${[['Position',p.role],['Age',p.age+' years'],['Height',p.height?p.height+' cm':'Awaiting verification'],['Preferred foot',p.foot==='—'?'Awaiting verification':p.foot],['Estimated market value','€'+p.value+'M'],['Contract through',p.contract],['Recruitment pool',p.pool]].map(([k,v])=>`<div class="data-row"><span>${k}</span><b>${v}</b></div>`).join('')}<div class="source-note">${sourceCaption}<br>${profileSource(p)}</div></div><div><h3 style="font-size:14px">Evidence & review</h3><div class="data-row"><span>Identity & market context</span><b>Source attached</b></div><div class="data-row"><span>Match-event data</span><b>To be added</b></div><div class="data-row"><span>Scout assessment</span><b>Pending review</b></div><div class="decision"><h3>Recruitment context</h3><p>${p.note}</p><p style="margin-top:12px">Review role-specific match evidence and availability before progressing to a club recommendation.</p></div></div></div><div class="dialog-actions"><button class="btn small" id="profile-save" onclick="toggleShortlist(${id})">${shortlist.includes(id)?'Remove from shortlist':'＋ Add to shortlist'}</button><button class="btn small ghost" onclick="window.print()">Print / save PDF</button></div>`,true)}
function compare(){if(selected.length<2){toast('Select 2–3 players in the table to compare.');return}const ps=selected.map(get).filter(Boolean);modal(`<div class="eyebrow" style="margin:10px 0 20px">PLAYER INTELLIGENCE / COMPARISON</div><h2 id="dialog-title">SEE THE TRADE-OFFS.</h2><p class="sub">Compare the same criteria across ${ps.length} candidates.</p><div class="comparison" style="grid-template-columns:repeat(${ps.length},1fr)">${ps.map(p=>`<div class="compare-column">${portrait(p)}<h3 style="font-size:17px;margin:18px 0 5px">${p.name}</h3><p style="font-size:13px;color:var(--muted)">${p.club} · ${p.pos}</p>${[['Age',p.age],['Height',p.height?p.height+' cm':'—'],['Foot',p.foot],['Market value','€'+p.value+'M'],['Contract',p.contract],['Nationality',p.nationality]].map(([k,v])=>`<div class="data-row"><span>${k}</span><b>${v}</b></div>`).join('')}<button class="btn small" style="margin-top:20px;width:100%" onclick="profile(${p.id})">Open profile</button></div>`).join('')}</div><p class="sample-note">${sourceCaption}</p>`,true)}
function saveReport(){if(!shortlist.length){toast('Add players to your shortlist first.');return}modal(`<h2 id="dialog-title">PREPARE THE REPORT.</h2><p class="sub">Save a named snapshot of your shortlist and notes.</p><form class="formgrid" id="report-form"><label class="full">Report name<input name="name" required maxlength="100" value="Recruitment shortlist — ${new Date().toLocaleDateString('en-GB')}"></label><label class="full">Club<input name="club" placeholder="Club / recipient" maxlength="100"></label><button class="btn">Save report ↗</button></form>`);$('#report-form').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));reports.unshift({...d,id:Date.now(),players:[...shortlist],notes:read('notes',''),date:new Date().toISOString()});persist('reports',reports);closeModal();location.hash='reports';render();toast('Report saved.')}}
function reportsPage(){return `${heading('CLUB REPORTS','A clear recommendation, ready for the next conversation.',shortlist.length?`<button class="btn small" onclick="saveReport()">＋ Create report</button>`:'')}${reports.length?`<section class="panel">${reports.map(r=>`<div class="report-card"><div><h3>${esc(r.name)}</h3><p>${esc(r.club||'Recruitment desk')} · ${r.players.length} players · ${new Date(r.date).toLocaleDateString('en-GB')}</p></div><div style="display:flex;gap:18px"><button class="link-btn" onclick="viewReport(${r.id})">View / PDF ↗</button><button class="link-btn" onclick="downloadReport(${r.id})">CSV ↓</button></div></div>`).join('')}</section>`:empty('Put the recommendation together.','Build a shortlist, add your scouting notes and save a report for the club.',`<a href="#shortlist" class="btn">Open shortlist ↗</a>`)}`}
function viewReport(id){const r=reports.find(x=>x.id===id);modal(`<div class="eyebrow" style="margin:10px 0 20px">PENTA / RECRUITMENT REPORT</div><h2 id="dialog-title">${esc(r.name)}</h2><p class="sub">${esc(r.club||'Recruitment desk')} · ${new Date(r.date).toLocaleDateString('en-GB')}</p>${r.players.map(get).filter(Boolean).map(p=>`<div class="preview-row">${portrait(p)}<div class="info"><strong>${p.name}</strong><small>${p.pos} · ${p.age} yrs · ${stature(p)} foot · €${p.value}M</small><p style="font-size:11px;margin-top:8px;color:var(--muted)">${p.note}</p></div><b class="match">${p.score??'—'}</b></div>`).join('')}${r.notes?`<div class="decision"><h3>Recruitment notes</h3><p style="white-space:pre-wrap">${esc(r.notes)}</p></div>`:''}<p class="source-note">${sourceCaption} · Estimated market values; availability requires review.</p><div class="dialog-actions"><button class="btn small" onclick="window.print()">Print / save PDF ↗</button><button class="btn small ghost" onclick="downloadReport(${r.id})">Download CSV ↓</button></div>`,true)}
function downloadReport(id){const r=reports.find(x=>x.id===id),rows=[['Name','Position','Age','Height (cm)','Foot','Value (EUR M)','Pool','Role fit','Source'],...r.players.map(get).filter(Boolean).map(p=>[p.name,p.pos,p.age,p.height??'',p.foot,p.value,p.pool,p.score??'',p.source])];const data=rows.map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');download(data,'penta-report-'+r.id+'.csv','text/csv;charset=utf-8');toast('CSV report downloaded.')}
function download(data,name,type){const url=URL.createObjectURL(new Blob([data],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function settingsPage(){const pref=read('preferences',{org:'PENTA recruitment',currency:'EUR',scope:'Roster'});return `${heading('WORKSPACE SETTINGS','Keep your recruitment preferences in one place.')}<div class="settings-grid"><section class="panel"><div class="panel-title"><h3>Organisation preferences</h3></div><form id="settings-form" class="formgrid"><label class="full">Workspace name<input name="org" value="${esc(pref.org)}" required maxlength="100"></label><label class="full">Reporting currency<select name="currency"><option>EUR</option></select></label><label class="full">Preferred recruitment pool<select name="scope">${['Roster','Partner','Market','All pools'].map(x=>`<option ${pref.scope===x?'selected':''}>${x}</option>`).join('')}</select></label><button class="btn small">Save preferences</button></form></section><section class="panel"><div class="panel-title"><h3>Workspace data</h3></div><p style="font-size:12px;color:var(--muted)">Briefs, shortlist selections, reports and notes are saved in this browser. Export your work to keep a portable copy.</p><div class="data-row"><span>Club briefs</span><b>${briefs.length}</b></div><div class="data-row"><span>Shortlisted players</span><b>${shortlist.length}</b></div><div class="data-row"><span>Reports</span><b>${reports.length}</b></div><button class="btn small" style="margin-top:25px" onclick="exportWorkspace()">Export workspace ↓</button></section><section class="panel"><div class="panel-title"><h3>Professional access</h3></div><p style="font-size:12px;color:var(--muted)">PENTA is intended for approved clubs, agencies and partner organisations. Access requests capture organisation details for the onboarding process.</p><button class="btn small" style="margin-top:20px" onclick="accessForm()">Prepare access request ↗</button></section></div>`}
function exportWorkspace(){download(JSON.stringify({briefs,shortlist,reports,notes:read('notes',''),preferences:read('preferences',{}),exported:new Date().toISOString()},null,2),'penta-workspace.json','application/json');toast('Workspace exported.')}
function accessForm(){modal(`<div class="eyebrow" style="color:var(--teal);margin:10px 0 20px">PENTA / PROFESSIONAL ACCESS</div><h2 id="dialog-title">LET’S TALK FOOTBALL.</h2><p class="sub">For clubs, licensed agencies and professional partner networks. Prepare your organisation’s access request.</p><form class="formgrid" id="access-form"><label>Full name<input name="name" required autocomplete="name" maxlength="100"></label><label>Role<input name="role" required placeholder="Sporting director" maxlength="100"></label><label class="full">Work email<input name="email" required type="email" autocomplete="email" maxlength="150"></label><label>Organisation<input name="organisation" required autocomplete="organization" maxlength="100"></label><label>Organisation type<select name="type"><option>Football club</option><option>Player agency</option><option>Partner network</option><option>Academy / federation</option></select></label><label class="full">What are you recruiting for?<textarea name="requirements" maxlength="1500" placeholder="Leagues, roles and how your desk works"></textarea></label><button class="btn">Prepare access request ↗</button></form><p class="privacy-note">Your request is saved on this device. You can download it for the onboarding conversation.</p>`);$('#access-form').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));persist('access-request',d);modal(`<div class="eyebrow" style="color:var(--teal);margin:10px 0 20px">ACCESS REQUEST / PREPARED</div><h2 id="dialog-title">THE NEXT CONVERSATION.</h2><p class="sub">Your organisation details are saved on this device. Download the request to share with the PENTA team.</p><div class="data-row"><span>Organisation</span><b>${esc(d.organisation)}</b></div><div class="data-row"><span>Contact</span><b>${esc(d.name)}</b></div><button class="btn" style="margin-top:25px" onclick="downloadAccess()">Download access request ↓</button>`)} }
function downloadAccess(){const d=read('access-request',{});download('PENTA — Professional access request\n\n'+Object.entries(d).map(([k,v])=>k+': '+v).join('\n'),'penta-access-request.txt','text/plain');toast('Access request downloaded.')}
function render(){const route=location.hash.slice(1)||'home';if(['home','workflow','technology','intelligence','company'].includes(route)){$('#app').innerHTML=landing();if(route!=='home')requestAnimationFrame(()=>document.getElementById(route)?.scrollIntoView());else window.scrollTo(0,0)}else{$('#app').innerHTML=shell(routes[route]?route:'desk');updateTable();if($('#settings-form'))$('#settings-form').onsubmit=e=>{e.preventDefault();persist('preferences',Object.fromEntries(new FormData(e.target)));toast('Workspace preferences saved.')};window.scrollTo(0,0)}document.title='PENTA — '+(routes[route]?.[1]||'Football Intelligence')}
window.addEventListener('hashchange',()=>{closeModal();render()});render();
