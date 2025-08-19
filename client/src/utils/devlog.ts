export function mountDevLog() {
  if (!new URLSearchParams(location.search).has('debug')) return;
  const box = document.createElement('div');
  Object.assign(box.style, {
    position: 'fixed', left: '8px', right: '8px', bottom: '8px',
    maxHeight: '45vh', overflow: 'auto', padding: '8px',
    background: 'rgba(0,0,0,.85)', color: '#0f0',
    font: '12px/1.4 monospace', zIndex: '999999', borderRadius: '10px'
  } as CSSStyleDeclaration);
  document.body.appendChild(box);
  const write = (...a:any[]) => box.innerHTML += a.map(x => typeof x==='string'?x:JSON.stringify(x)).join(' ') + '<br>';
  ['log','warn','error'].forEach(k=>{
    // @ts-ignore
    const orig = console[k]; console[k] = (...a:any[]) => { write(`[${k}]`, ...a); orig.apply(console,a); }
  });
  window.addEventListener('error', e => write('[onerror]', e.message));
  window.addEventListener('unhandledrejection', e => write('[unhandled]', String(e.reason)));
  write('devlog mounted', new Date().toISOString());
}
