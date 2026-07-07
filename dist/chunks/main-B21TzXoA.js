import{n as e}from"./chunk-DR8-3Aex.js";import{Jn as t,Yn as n}from"./paths-ae9dybPf.js";import{i as r,o as i,t as a}from"./cliLaunch-GVtzGa1m.js";import{a as o,i as s,n as c,r as l,t as u}from"./state-Dm58NwsT.js";import{resolve as d}from"path";async function f(e){let t=e[0]||`status`;switch(t){case`start`:await _(e.slice(1));break;case`stop`:await h();break;case`status`:case`ps`:await m();break;case`bg`:await(await import(`./bg-CHf4oUR-.js`)).handleBgStart(e.slice(1));break;case`attach`:await(await import(`./bg-CHf4oUR-.js`)).attachHandler(e[1]);break;case`logs`:await(await import(`./bg-CHf4oUR-.js`)).logsHandler(e[1]);break;case`kill`:await(await import(`./bg-CHf4oUR-.js`)).killHandler(e[1]);break;case`--help`:case`-h`:case`help`:p();break;default:console.error(`Unknown daemon subcommand: ${t}`),p(),process.exitCode=1}}function p(){console.log(`
${t()} Daemon — background process management

USAGE
  ccn daemon [subcommand]

SUBCOMMANDS
  status      Show daemon and session status (default)
  start       Start the daemon supervisor
  stop        Stop the daemon
  bg          Start a background session
  attach      Attach to a background session
  logs        Show session logs
  kill        Kill a session
  help        Show this help

REPL
  /daemon [subcommand]    Same commands available in interactive mode

OPTIONS (for start)
  --dir <path>              Working directory (default: current)
  --spawn-mode <mode>       Worker spawn mode: same-dir | worktree (default: same-dir)
  --capacity <N>            Max concurrent sessions per worker (default: 4)
  --permission-mode <mode>  Permission mode for spawned sessions
  --sandbox                 Enable sandbox mode
  --name <name>             Session name
  -h, --help                Show this help
`)}async function m(){let e=c();switch(console.log(`=== Daemon Supervisor ===`),e.status){case`running`:{let t=e.state;console.log(`  Status:  running`),console.log(`  PID:     ${t.pid}`),console.log(`  CWD:     ${t.cwd}`),console.log(`  Started: ${t.startedAt}`),console.log(`  Workers: ${t.workerKinds.join(`, `)}`);break}case`stopped`:console.log(`  Status: stopped`);break;case`stale`:console.log(`  Status: stale (cleaned up)`);break}console.log(`
=== Background Sessions ===`),await(await import(`./bg-CHf4oUR-.js`)).psHandler([])}async function h(){let e=c();if(e.status===`stopped`){console.log(`daemon is not running`);return}if(e.status===`stale`){console.log(`daemon was stale (cleaned up)`);return}console.log(`stopping daemon (PID: ${e.state.pid})...`),await s()?console.log(`daemon stopped`):console.log(`daemon could not be stopped (may have already exited)`)}function g(e){let t={};for(let n=0;n<e.length;n++){let r=e[n];r===`--dir`&&n+1<e.length?t.dir=d(e[++n]):r.startsWith(`--dir=`)?t.dir=d(r.slice(6)):r===`--spawn-mode`&&n+1<e.length?t.spawnMode=e[++n]:r.startsWith(`--spawn-mode=`)?t.spawnMode=r.slice(13):r===`--capacity`&&n+1<e.length?t.capacity=e[++n]:r.startsWith(`--capacity=`)?t.capacity=r.slice(11):r===`--permission-mode`&&n+1<e.length?t.permissionMode=e[++n]:r.startsWith(`--permission-mode=`)?t.permissionMode=r.slice(18):r===`--sandbox`?t.sandbox=`1`:r===`--name`&&n+1<e.length?t.name=e[++n]:r.startsWith(`--name=`)&&(t.name=r.slice(7))}return t}async function _(e){let t=g(e),n=t.dir||d(`.`);console.log(`[daemon] supervisor starting in ${n}`);let r=[{kind:`remoteControl`,process:null,backoffMs:b,failureCount:0,parked:!1,lastStartTime:0,restartTimer:null}];o({pid:process.pid,cwd:n,startedAt:new Date().toISOString(),workerKinds:r.map(e=>e.kind),lastStatus:`running`});let i=new AbortController,a=()=>{console.log(`[daemon] supervisor shutting down...`),i.abort(),l();for(let e of r)e.restartTimer&&(clearTimeout(e.restartTimer),e.restartTimer=null),e.process&&!e.process.killed&&e.process.kill(`SIGTERM`)};process.on(`SIGTERM`,a),process.on(`SIGINT`,a);for(let e of r)i.signal.aborted||v(e,n,t,i.signal);await new Promise(e=>{if(i.signal.aborted){e();return}i.signal.addEventListener(`abort`,()=>e(),{once:!0})}),await Promise.all(r.filter(e=>e.process&&e.process.exitCode===null).map(e=>new Promise(t=>{if(!e.process||e.process.exitCode!==null){t();return}let n=null;e.process.on(`exit`,()=>{n&&(clearTimeout(n),n=null),t()}),n=setTimeout(()=>{e.process&&e.process.exitCode===null&&e.process.kill(`SIGKILL`),t()},3e4),n.unref?.()}))),console.log(`[daemon] supervisor stopped`)}function v(e,t,n,r){if(r.aborted||e.parked)return;e.lastStartTime=Date.now();let o={...process.env,DAEMON_WORKER_DIR:t,DAEMON_WORKER_NAME:n.name,DAEMON_WORKER_SPAWN_MODE:n.spawnMode||`same-dir`,DAEMON_WORKER_CAPACITY:n.capacity||`4`,DAEMON_WORKER_PERMISSION:n.permissionMode,DAEMON_WORKER_SANDBOX:n.sandbox||`0`,DAEMON_WORKER_CREATE_SESSION:`1`,CLAUDE_CODE_SESSION_KIND:`daemon-worker`};console.log(`[daemon] spawning worker '${e.kind}'`);let s=i(a([`--daemon-worker=${e.kind}`],{env:o}),{cwd:t,stdio:[`ignore`,`pipe`,`pipe`]});e.process=s,s.stdout?.on(`data`,e=>{let t=e.toString().trimEnd().split(`
`);for(let e of t)console.log(`  ${e}`)}),s.stderr?.on(`data`,e=>{let t=e.toString().trimEnd().split(`
`);for(let e of t)console.error(`  ${e}`)}),s.on(`exit`,(i,a)=>{if(e.process=null,!r.aborted){if(i===y){console.error(`[daemon] worker '${e.kind}' exited with permanent error — parking`),e.parked=!0;return}if(Date.now()-e.lastStartTime<1e4){if(e.failureCount++,e.failureCount>=C){console.error(`[daemon] worker '${e.kind}' failed ${e.failureCount} times rapidly — parking`),e.parked=!0;return}}else e.failureCount=0,e.backoffMs=b;console.log(`[daemon] worker '${e.kind}' exited (code=${i}, signal=${a}), restarting in ${e.backoffMs}ms`),e.restartTimer=setTimeout(()=>{e.restartTimer=null,!r.aborted&&!e.parked&&v(e,t,n,r)},e.backoffMs),e.restartTimer.unref?.(),e.backoffMs=Math.min(e.backoffMs*S,x)}})}var y,b,x,S,C;e((()=>{n(),r(),u(),y=78,b=2e3,x=12e4,S=2,C=5}))();export{f as daemonMain};