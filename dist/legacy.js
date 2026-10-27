(function(root){
'use strict';
const round=n=>Math.round((n+Number.EPSILON)*100)/100;
const products=[
 ['P01','Hydra Barrier Serum','NXR-001','Skin care',18,9.4,80,60,100,'2027-08-31','HB-2608'],
 ['P02','Daily Mineral SPF 50','NXR-002','Sun protection',24,12.8,210,80,120,'2027-05-30','SP-2605'],
 ['P03','Gentle Foam Cleanser','NXR-003','Skin care',14,6.9,160,45,80,'2027-09-15','FC-2609'],
 ['P04','Repair Night Cream','NXR-004','Skin care',32,16.4,92,34,75,'2027-04-20','NC-2604'],
 ['P05','Botanical Body Oil','NXR-005','Body care',21,10.2,64,32,60,'2026-12-20','BO-2512'],
 ['P06','Vitamin C Concentrate','NXR-006','Skin care',38,19.5,140,40,90,'2027-06-10','VC-2606'],
 ['P07','Hand Recovery Balm','NXR-007','Body care',12,5.6,36,18,70,'2027-07-10','HR-2607'],
 ['P08','Purifying Clay Mask','NXR-008','Skin care',19,8.8,120,60,70,'2027-03-12','CM-2603'],
 ['P09','Scalp Renewal Shampoo','NXR-009','Hair care',17,8.2,180,50,90,'2027-11-10','SR-2611'],
 ['P10','Silk Repair Conditioner','NXR-010','Hair care',18,8.9,150,60,80,'2027-10-01','SC-2610'],
 ['P11','Lip Rescue Treatment','NXR-011','Skin care',9,3.8,220,80,120,'2027-08-15','LR-2608'],
 ['P12','Sensitive Micellar Water','NXR-012','Skin care',16,7.4,90,45,75,'2027-09-20','MW-2609']
].map(([id,name,sku,category,price,cost,main,branch,reorder,expiry,batch])=>({id,name,sku,category,price,cost,stock:{main,branch},reserved:{main:0,branch:0},reorder,expiry,batch}));
const clients=[
 {id:'C01',name:'Maison Beauté',arabic:'ميزون بوتيه',city:'Beirut',contact:'Lara Khoury',email:'lara@example.test',limit:3000,opening:2200,tier:'Platinum',color:'#3769d9'},
 {id:'C02',name:'Cedar Pharmacy',arabic:'صيدلية الأرز',city:'Zahle',contact:'Rami Nasser',email:'rami@example.test',limit:8000,opening:4800,tier:'Gold',color:'#078f8d'},
 {id:'C03',name:'Glow Collective',arabic:'غلو كوليكتيف',city:'Jounieh',contact:'Maya Saad',email:'maya@example.test',limit:5000,opening:1900,tier:'Gold',color:'#a568cc'},
 {id:'C04',name:'Nour Wellness',arabic:'نور للعناية',city:'Tripoli',contact:'Nour Daher',email:'nour@example.test',limit:6000,opening:3600,tier:'Gold',color:'#bc6c47'},
 {id:'C05',name:'The Beauty Edit',arabic:'ذا بيوتي إيديت',city:'Beirut',contact:'Jana Haddad',email:'jana@example.test',limit:4000,opening:1200,tier:'Silver',color:'#497996'},
 {id:'C06',name:'Bekaa Care',arabic:'بقاع كير',city:'Baalbek',contact:'Ali Saleh',email:'ali@example.test',limit:5000,opening:2200,tier:'Silver',color:'#768444'}
];
function total(o){return round(o.qty*o.unit*(1-o.discount/100));}
function cost(o){return round(o.qty*o.cost);}
function post(s,ref,memo,lines,date='2026-10-08'){
 const debit=round(lines.reduce((a,l)=>a+(l.debit||0),0)),credit=round(lines.reduce((a,l)=>a+(l.credit||0),0));
 if(debit!==credit)throw Error('Journal is not balanced');
 s.journal.push({id:'JE-'+String(s.journal.length+1).padStart(4,'0'),ref,memo,date,lines:lines.map(l=>({...l,debit:l.debit||0,credit:l.credit||0}))});
}
function event(s,ref,text,role='Administrator'){s.events.unshift({id:s.events.length+1,ref,text,role,time:new Date().toISOString()});}
function seed(){
 const s={version:1,products:structuredClone(products),clients:structuredClone(clients),orders:[],purchases:[],journal:[],events:[],transfers:[],nextOrder:1045,nextPurchase:2082};
 const iv=round(s.products.reduce((a,p)=>a+(p.stock.main+p.stock.branch)*p.cost,0));
 post(s,'OPEN-26','Opening balances',[{account:'Cash',debit:48600},{account:'Receivables',debit:15900},{account:'Inventory',debit:iv},{account:'Payables',credit:12800},{account:'Equity',credit:round(51700+iv)}],'2026-10-01');
 for(let i=0;i<12;i++){
  const p=s.products[1+(i%11)],qty=12+(i%4)*8; p.stock.main-=qty;
  const o={id:'SO-'+(1030+i),client:'C0'+(2+i%5),product:p.id,qty,unit:p.price,cost:p.cost,discount:i%3===0?5:0,status:'delivered',date:'2026-10-0'+(1+i%7),returned:0,paid:0,source:i%3===0?'Customer portal':'Sales desk'};
  s.orders.push(o);const t=total(o),c=cost(o);o.paid=round(t*(i%3===0?.5:1));
  post(s,o.id,'Sales invoice',[{account:'Receivables',debit:t},{account:'Revenue',credit:t},{account:'Cost of sales',debit:c},{account:'Inventory',credit:c}],o.date);
  post(s,o.id,'Payment received',[{account:'Cash',debit:o.paid},{account:'Receivables',credit:o.paid}],o.date);
 }
 s.orders.push({id:'SO-1042',client:'C01',product:'P01',qty:120,unit:18,cost:9.4,discount:0,status:'approval',date:'2026-10-08',returned:0,paid:0,source:'Customer portal'});
 s.orders.push({id:'SO-1043',client:'C03',product:'P04',qty:24,unit:32,cost:16.4,discount:0,status:'ready',date:'2026-10-08',returned:0,paid:0,allocation:{main:24,branch:0},source:'Sales desk'});
 s.products.find(p=>p.id==='P04').reserved.main=24;
 s.orders.push({id:'SO-1044',client:'C04',product:'P05',qty:30,unit:21,cost:10.2,discount:5,status:'approval',date:'2026-10-08',returned:0,paid:0,source:'Sales desk'});
 s.purchases.push({id:'PO-2081',supplier:'Nexa Laboratories',product:'P07',qty:120,unit:5.6,status:'ordered',date:'2026-10-08'});
 event(s,'SO-1042','120 units requested by Maison Beauté. Credit review required.','Customer portal');
 event(s,'SO-1043','24 units reserved at Beirut warehouse.','Operations');
 event(s,'PO-2081','Purchase order sent to Nexa Laboratories.','Procurement');
 return s;
}
function balance(s,account){return round(s.journal.flatMap(j=>j.lines).filter(l=>l.account===account).reduce((a,l)=>a+l.debit-l.credit,0));}
function outstanding(s,cid){return round(s.clients.find(c=>c.id===cid).opening+s.orders.filter(o=>o.client===cid&&o.status==='delivered').reduce((a,o)=>a+total(o)-o.returned*o.unit*(1-o.discount/100)-o.paid,0));}
function metrics(s){const delivered=s.orders.filter(o=>o.status==='delivered');const revenue=round(-balance(s,'Revenue'));const cogs=balance(s,'Cost of sales');return {revenue,cogs,profit:round(revenue-cogs),margin:revenue?round((revenue-cogs)/revenue*100):0,cash:balance(s,'Cash'),receivables:balance(s,'Receivables'),payables:-balance(s,'Payables'),inventory:balance(s,'Inventory'),open:s.orders.filter(o=>['approval','ready','picking'].includes(o.status)).length,delivered:delivered.length,units:s.products.reduce((a,p)=>a+p.stock.main+p.stock.branch,0)};}
const allowed={transfer:['admin','warehouse'],approve:['admin'],pick:['admin','warehouse'],deliver:['admin','warehouse'],pay:['admin','finance'],return:['admin','warehouse'],purchase:['admin','procurement'],receive:['admin','warehouse'],supplierpay:['admin','finance'],create:['admin','sales','customer'],cancel:['admin','sales']};
function action(state,type,input={},role='admin'){
 if(!allowed[type]?.includes(role))throw Error('Your workspace role cannot perform this action.');
 const s=structuredClone(state),o=s.orders.find(o=>o.id===input.id),p=s.products.find(p=>p.id===(input.product||o?.product)),by={admin:'Administrator',warehouse:'Warehouse',finance:'Finance',sales:'Sales',procurement:'Procurement',customer:'Customer portal'}[role];
 const needOrder=()=>{if(!o)throw Error('Order not found.');};
 const integer=(n)=>{if(!Number.isInteger(n)||n<=0)throw Error('Quantity must be a positive whole number.');};
 if(type==='transfer'){
  if(!p)throw Error('Product not found.');integer(input.qty);const from=input.from||'branch',to=from==='main'?'branch':'main';
  if(!['main','branch'].includes(from))throw Error('Warehouse not found.');if(p.stock[from]-p.reserved[from]<input.qty)throw Error('Not enough available stock at the source warehouse.');
  p.stock[from]-=input.qty;p.stock[to]+=input.qty;const id='TR-'+String(s.transfers.length+301);s.transfers.unshift({id,product:p.id,qty:input.qty,from,to,date:'2026-10-08'});event(s,input.id||id,`${input.qty} ${p.name} units transferred from ${from} to ${to}.`,by);
 }
 if(type==='approve'){
  needOrder();if(o.status!=='approval')throw Error('This order is not awaiting approval.');
  if(outstanding(s,o.client)+total(o)>s.clients.find(c=>c.id===o.client).limit&&!input.override)throw Error('Credit limit exceeded. Explicit credit override required.');
  const available=p.stock.main-p.reserved.main;if(available<o.qty)throw Error('Transfer stock to Beirut before reserving this order.');
  o.allocation={main:o.qty,branch:0};p.reserved.main+=o.qty;o.status='ready';event(s,o.id,`Approved and ${o.qty} units reserved.${input.override?' Credit override recorded.':''}`,by);
 }
 if(type==='pick'){needOrder();if(o.status!=='ready')throw Error('Only reserved orders can be picked.');o.status='picking';event(s,o.id,'Picking completed. Package ready for dispatch.',by);}
 if(type==='deliver'){
  needOrder();if(o.status!=='picking')throw Error('Complete picking before delivery.');
  for(const w of ['main','branch']){const n=o.allocation[w];if(p.stock[w]<n||p.reserved[w]<n)throw Error('Stock reservation mismatch.');p.stock[w]-=n;p.reserved[w]-=n;}
  o.status='delivered';o.invoice='INV-'+o.id.slice(3);const t=total(o),c=cost(o);
  post(s,o.id,'Delivery and invoice posted',[{account:'Receivables',debit:t},{account:'Revenue',credit:t},{account:'Cost of sales',debit:c},{account:'Inventory',credit:c}]);event(s,o.id,`Delivery confirmed. ${o.invoice} posted for $${t.toFixed(2)}.`,by);
 }
 if(type==='pay'){
  needOrder();if(o.status!=='delivered')throw Error('Invoice must be posted before collecting payment.');const amount=round(Number(input.amount)),due=round(total(o)-o.returned*o.unit*(1-o.discount/100)-o.paid);
  if(!Number.isFinite(amount)||amount<=0||amount>due)throw Error('Payment must be positive and cannot exceed the invoice balance.');
  o.paid=round(o.paid+amount);post(s,o.id,'Customer payment',[{account:'Cash',debit:amount},{account:'Receivables',credit:amount}]);event(s,o.id,`Payment of $${amount.toFixed(2)} received.`,by);
 }
 if(type==='return'){
  needOrder();if(o.status!=='delivered')throw Error('Only delivered orders can be returned.');integer(input.qty);if(input.qty>o.qty-o.returned)throw Error('Return exceeds delivered quantity remaining.');
  const amount=round(input.qty*o.unit*(1-o.discount/100)),c=round(input.qty*o.cost),due=round(total(o)-o.returned*o.unit*(1-o.discount/100)-o.paid),ar=Math.min(amount,due),refund=round(amount-ar);
  if(refund>balance(s,'Cash'))throw Error('Insufficient cash for refund.');o.returned+=input.qty;if(refund)o.paid=round(o.paid-refund);
  const lines=[{account:'Revenue',debit:amount},{account:'Receivables',credit:ar}];if(refund)lines.push({account:'Cash',credit:refund});
  if(input.disposition==='quarantine'){p.quarantine=(p.quarantine||0)+input.qty;lines.push({account:'Quarantine inventory',debit:c},{account:'Cost of sales',credit:c});}
  else{p.stock.main+=input.qty;lines.push({account:'Inventory',debit:c},{account:'Cost of sales',credit:c});}
  post(s,o.id,'Credit note and returned goods',lines);event(s,o.id,`${input.qty} units returned to ${input.disposition==='quarantine'?'quarantine':'saleable stock'}. Credit note $${amount.toFixed(2)}${refund?`; cash refund $${refund.toFixed(2)}`:''}.`,by);
 }
 if(type==='purchase'){
  if(!p)throw Error('Product not found.');integer(input.qty);const id='PO-'+s.nextPurchase++;s.purchases.push({id,supplier:'Nexa Laboratories',product:p.id,qty:input.qty,unit:p.cost,status:'ordered',date:'2026-10-08'});event(s,id,`Purchase order created for ${input.qty} ${p.name} units.`,by);
 }
 if(type==='receive'){
  const po=s.purchases.find(x=>x.id===input.id);if(!po||po.status!=='ordered')throw Error('Purchase order is not open.');const item=s.products.find(x=>x.id===po.product);item.stock.main+=po.qty;po.status='received';const v=round(po.qty*po.unit);post(s,po.id,'Goods receipt and supplier bill',[{account:'Inventory',debit:v},{account:'Payables',credit:v}]);event(s,po.id,`${po.qty} units received. Supplier bill posted for $${v.toFixed(2)}.`,by);
 }
 if(type==='supplierpay'){
  const po=s.purchases.find(x=>x.id===input.id);if(!po||po.status!=='received')throw Error('Receive the purchase order first.');const v=round(po.qty*po.unit);if(balance(s,'Cash')<v)throw Error('Insufficient cash.');po.status='paid';post(s,po.id,'Supplier payment',[{account:'Payables',debit:v},{account:'Cash',credit:v}]);event(s,po.id,`Supplier paid $${v.toFixed(2)}.`,by);
 }
 if(type==='create'){
  if(!p)throw Error('Choose a product.');if(!s.clients.find(c=>c.id===input.client))throw Error('Choose a customer.');if(role==='customer'&&input.client!=='C01')throw Error('Customer portal is limited to Maison Beauté.');integer(input.qty);const discount=Number(input.discount||0);if(!Number.isFinite(discount)||discount<0||discount>50)throw Error('Discount must be between 0 and 50%.');
  const id='SO-'+s.nextOrder++;s.orders.push({id,client:input.client,product:p.id,qty:input.qty,unit:p.price,cost:p.cost,discount,status:'approval',date:'2026-10-08',returned:0,paid:0,source:role==='customer'?'Customer portal':'Sales desk'});event(s,id,'Order submitted for stock and credit review.',by);
 }
 if(type==='cancel'){needOrder();if(!['approval','ready'].includes(o.status))throw Error('This order cannot be cancelled.');if(o.allocation)for(const w of ['main','branch'])p.reserved[w]-=o.allocation[w];o.status='cancelled';event(s,o.id,'Order cancelled. Reserved stock released.',by);}
 for(const item of s.products)for(const w of ['main','branch'])if(item.stock[w]<0||item.reserved[w]<0||item.reserved[w]>item.stock[w])throw Error('Stock invariant failed.');
 const debits=round(s.journal.flatMap(j=>j.lines).reduce((a,l)=>a+l.debit,0)),credits=round(s.journal.flatMap(j=>j.lines).reduce((a,l)=>a+l.credit,0));if(debits!==credits)throw Error('Trial balance invariant failed.');return s;
}
function daily(s,prefix='2026-10',count=8){return Array.from({length:count},(_,i)=>{const date=prefix+'-'+String(i+1).padStart(2,'0'),lines=s.journal.filter(j=>j.date===date).flatMap(j=>j.lines),r=round(lines.filter(l=>l.account==='Revenue').reduce((a,l)=>a+l.credit-l.debit,0)),c=round(lines.filter(l=>l.account==='Cost of sales').reduce((a,l)=>a+l.debit-l.credit,0));return{r,p:round(r-c)};});}
const api={seed,action,total,cost,balance,outstanding,metrics,round,daily};if(typeof module!=='undefined')module.exports=api;root.NexusEngine=api;
})(typeof window!=='undefined'?window:globalThis);
