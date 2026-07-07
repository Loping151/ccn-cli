import{l as e,p as t}from"./debug-DMnLghM9.js";import{spawn as n}from"node:child_process";e();var r=`
import os, pty, select, sys, struct, fcntl, termios, signal, json
pid, master = pty.fork()
if pid == 0:
    os.environ.setdefault('TERM', 'xterm-256color')
    os.execvp('bash', ['bash', '-l'])

# SIGTERM 默认不跑 finally——转成 SystemExit 保证进程组清理执行。
def _term(sig, frame):
    raise SystemExit(0)
signal.signal(signal.SIGTERM, _term)

pending = b''  # 待写入 master 的输入缓冲:前台程序停读时不阻塞桥本身
try:
    while True:
        wlist = [master] if pending else []
        r, w, _ = select.select([0, master, 3], wlist, [])
        if w and pending:
            try:
                n = os.write(master, pending[:4096])
                pending = pending[n:]
            except OSError:
                break
        if 0 in r:
            d = os.read(0, 65536)
            if not d:
                break
            pending += d
            if len(pending) > 1048576:
                pending = pending[-1048576:]  # 1MB 上限,极端粘贴丢最老部分
        if 3 in r:
            raw = os.read(3, 4096)
            if not raw:
                break
            for line in raw.decode('utf-8', 'ignore').splitlines():
                try:
                    j = json.loads(line)
                except Exception:
                    continue
                if j.get('t') == 'resize':
                    fcntl.ioctl(master, termios.TIOCSWINSZ,
                                struct.pack('HHHH', int(j['rows']), int(j['cols']), 0, 0))
                    os.kill(pid, signal.SIGWINCH)
        if master in r:
            try:
                d = os.read(master, 65536)
            except OSError:
                break
            if not d:
                break
            os.write(1, d)
finally:
    # 杀整个进程组(bash 是会话首领,孙子进程同组),TERM 后补 KILL。
    try:
        os.killpg(pid, signal.SIGTERM)
    except Exception:
        pass
    try:
        import time
        time.sleep(0.2)
        os.killpg(pid, signal.SIGKILL)
    except Exception:
        pass
`,i=40,a=8,o=256,s=new Map,c=null;function l(e){c=e}function u(e){let t=s.get(e);!t||t.flushTimer||(t.flushTimer=setTimeout(()=>{t.flushTimer=null,d(e)},i))}function d(e){let t=s.get(e);if(!t||t.buf.length===0&&!t.closed)return;let n=t.buf.splice(0,t.buf.length);c?.(e,n,t.closed),t.closed&&s.delete(e)}function f(e,t){let n=s.get(e);n&&(n.buf.push(t.toString(`base64`)),n.buf.length>o&&n.buf.splice(0,n.buf.length-o),u(e))}function p(e){let t=s.get(e);!t||t.closed||(t.closed=!0,t.flushTimer&&(clearTimeout(t.flushTimer),t.flushTimer=null),d(e))}function m(e,i){if(s.has(e))return{ok:!0,resize:s.get(e).hasResize};if(s.size>=a)return{ok:!1,reason:`too many terminals (max ${a})`};let o=i.cwd,c=process.platform===`win32`,l,u=!1;try{c?l=n(`powershell.exe`,[`-NoProfile`],{cwd:o,stdio:[`pipe`,`pipe`,`pipe`]}):(l=n(`python3`,[`-c`,r],{cwd:o,stdio:[`pipe`,`pipe`,`pipe`,`pipe`],env:{...process.env,TERM:`xterm-256color`}}),u=!0)}catch(e){return{ok:!1,reason:`spawn failed: ${String(e)}`}}let d={child:l,buf:[],flushTimer:null,closed:!1,hasResize:u};return s.set(e,d),l.on(`error`,n=>{t(`[rcs-pty] ${e} error: ${String(n)}`),f(e,Buffer.from(`pty unavailable: ${String(n)}\r\n`)),p(e)}),l.stdout?.on(`data`,t=>f(e,t)),l.stderr?.on(`data`,t=>f(e,t)),l.on(`exit`,()=>p(e)),u&&i.cols&&i.rows&&g(e,i.cols,i.rows),{ok:!0,resize:u}}function h(e,n){let r=s.get(e);if(!(!r||r.closed))try{if((r.child.stdin?.writableLength??0)>4*1024*1024){t(`[rcs-pty] ${e} input dropped (backpressure)`);return}r.child.stdin?.write(Buffer.from(n,`base64`))}catch(n){t(`[rcs-pty] ${e} input failed: ${String(n)}`)}}function g(e,n,r){let i=s.get(e);if(!(!i||i.closed||!i.hasResize))try{i.child.stdio[3]?.write(`${JSON.stringify({t:`resize`,cols:Math.max(2,n|0),rows:Math.max(2,r|0)})}\n`)}catch(n){t(`[rcs-pty] ${e} resize failed: ${String(n)}`)}}function _(e){let t=s.get(e);if(t){try{t.child.kill(`SIGTERM`)}catch{}p(e)}}function v(){for(let e of[...s.keys()])_(e)}export{l as onPtyFlush,_ as ptyClose,v as ptyCloseAll,h as ptyInput,m as ptyOpen,g as ptyResize};