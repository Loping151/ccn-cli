import{n as e,r as t}from"./chunk-DR8-3Aex.js";import{c as n,n as r}from"./envUtils-3UiS5v1Q.js";import{S as i,Xa as a,_ as o,uo as s}from"./paths-DykGtWP3.js";import{B as c,U as l,l as u,p as d}from"./debug-DMnLghM9.js";import{t as f}from"./analytics-Oq2xIXA0.js";import{n as p,t as m}from"./which-CfacY61n.js";import{r as h,t as g}from"./execFileNoThrow-dPS0jHg7.js";import{a as _,r as v,t as y}from"./xdg-DjPg5E8G.js";import{n as b,t as x}from"./sanitization-BXXPOsUk.js";import*as S from"os";import*as C from"path";import{promises as w}from"fs";function T(e){for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(n<=31||n===127)return!0}return!1}function E(e){let t=e.startsWith(`claude-cli://`)?e:e.startsWith(`claude-cli:`)?e.replace(`${D}:`,`${D}://`):null;if(!t)throw Error(`Invalid deep link: expected ${D}:// scheme, got "${e}"`);let n;try{n=new URL(t)}catch{throw Error(`Invalid deep link URL: "${e}"`)}if(n.hostname!==`open`)throw Error(`Unknown deep link action: "${n.hostname}"`);let r=n.searchParams.get(`cwd`)??void 0,i=n.searchParams.get(`repo`)??void 0,a=n.searchParams.get(`q`);if(r&&!r.startsWith(`/`)&&!/^[a-zA-Z]:[/\\]/.test(r))throw Error(`Invalid cwd in deep link: must be an absolute path, got "${r}"`);if(r&&T(r))throw Error(`Deep link cwd contains disallowed control characters`);if(r&&r.length>A)throw Error(`Deep link cwd exceeds ${A} characters (got ${r.length})`);if(i&&!O.test(i))throw Error(`Invalid repo in deep link: expected "owner/repo", got "${i}"`);let o;if(a&&a.trim().length>0){if(o=b(a.trim()),T(o))throw Error(`Deep link query contains disallowed control characters`);if(o.length>k)throw Error(`Deep link query exceeds ${k} characters (got ${o.length})`)}return{query:o,cwd:r,repo:i}}var D,O,k,A,j=e((()=>{x(),D=`claude-cli`,O=/^[\w.-]+\/[\w.-]+$/,k=5e3,A=4096})),M=t({MACOS_BUNDLE_ID:()=>U,ensureDeepLinkProtocolRegistered:()=>H,isProtocolHandlerCurrent:()=>V,registerProtocolHandler:()=>z});function N(){return C.join(v(),`applications`,G)}function P(e){return`Exec="${e}" --handle-uri %u`}function F(e){return`"${e}" --handle-uri "%1"`}async function I(e){let t=C.join(K,`Contents`);try{await w.rm(K,{recursive:!0})}catch(e){if(c(e)!==`ENOENT`)throw e}await w.mkdir(C.dirname(q),{recursive:!0});let n=`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleIdentifier</key>
  <string>${U}</string>
  <key>CFBundleName</key>
  <string>${W}</string>
  <key>CFBundleExecutable</key>
  <string>claude</string>
  <key>CFBundleVersion</key>
  <string>1.0</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>LSBackgroundOnly</key>
  <true/>
  <key>CFBundleURLTypes</key>
  <array>
    <dict>
      <key>CFBundleURLName</key>
      <string>Claude Code Deep Link</string>
      <key>CFBundleURLSchemes</key>
      <array>
        <string>${D}</string>
      </array>
    </dict>
  </array>
</dict>
</plist>`;await w.writeFile(C.join(t,`Info.plist`),n),await w.symlink(e,q),await g(`/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister`,[`-R`,K],{useCwd:!1}),d(`Registered ${D}:// protocol handler at ${K}`)}async function L(e){await w.mkdir(C.dirname(N()),{recursive:!0});let t=`[Desktop Entry]
Name=${W}
Comment=Handle ${D}:// deep links for Claude Code
${P(e)}
Type=Application
NoDisplay=true
MimeType=x-scheme-handler/${D};
`;await w.writeFile(N(),t);let n=await p(`xdg-mime`);if(n){let{code:e}=await g(n,[`default`,G,`x-scheme-handler/${D}`],{useCwd:!1});if(e!==0)throw Object.assign(Error(`xdg-mime exited with code ${e}`),{code:`XDG_MIME_FAILED`})}d(`Registered ${D}:// protocol handler at ${N()}`)}async function R(e){for(let t of[[`add`,J,`/ve`,`/d`,`URL:${W}`,`/f`],[`add`,J,`/v`,`URL Protocol`,`/d`,``,`/f`],[`add`,Y,`/ve`,`/d`,F(e),`/f`]]){let{code:e}=await g(`reg`,t,{useCwd:!1});if(e!==0)throw Object.assign(Error(`reg add exited with code ${e}`),{code:`REG_FAILED`})}d(`Registered ${D}:// protocol handler in Windows registry`)}async function z(e){let t=e??await B();switch(process.platform){case`darwin`:await I(t);break;case`linux`:await L(t);break;case`win32`:await R(t);break;default:throw Error(`Unsupported platform: ${process.platform}`)}}async function B(){let e=process.platform===`win32`?`claude.exe`:`claude`,t=C.join(y(),e);try{return await w.realpath(t),t}catch{return process.execPath}}async function V(e){try{switch(process.platform){case`darwin`:return await w.readlink(q)===e;case`linux`:return(await w.readFile(N(),`utf8`)).includes(P(e));case`win32`:{let{stdout:t,code:n}=await g(`reg`,[`query`,Y,`/ve`],{useCwd:!1});return n===0&&t.includes(F(e))}default:return!1}}catch{return!1}}async function H(){if(a().disableDeepLinkRegistration===`disable`||!o(`tengu_lodestone_enabled`,!1))return;let e=await B();if(await V(e))return;let t=C.join(r(),`.deep-link-register-failed`);try{let e=await w.stat(t);if(Date.now()-e.mtimeMs<X)return}catch{}try{await z(e),d(`Auto-registered claude-cli:// deep link protocol handler`),await w.rm(t,{force:!0}).catch(()=>{})}catch(e){let n=c(e);d(`Failed to auto-register deep link protocol handler: ${e instanceof Error?e.message:String(e)}`,{level:`warn`}),(n===`EACCES`||n===`ENOSPC`)&&await w.writeFile(t,``).catch(()=>{})}}var U,W,G,K,q,J,Y,X,Z=e((()=>{j(),i(),f(),u(),n(),l(),h(),s(),m(),_(),U=`com.anthropic.claude-code-url-handler`,W=`Claude Code URL Handler`,G=`claude-code-url-handler.desktop`,K=C.join(S.homedir(),`Applications`,`Claude Code URL Handler.app`),q=C.join(K,`Contents`,`MacOS`,`claude`),J=`HKEY_CURRENT_USER\\Software\\Classes\\${D}`,Y=`${J}\\shell\\open\\command`,X=1440*60*1e3}));export{E as a,j as i,Z as n,M as r,U as t};