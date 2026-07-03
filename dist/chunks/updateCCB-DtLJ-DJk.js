import{In as e,Ln as t}from"./src-B5EwquZD.js";import{n,o as r}from"./process-DMKLUQIO.js";import{IE as i,PE as a}from"./loadAgentsDir-DDEzZ0Zj.js";import{n as o,t as s}from"./distRoot-BNg_iO5-.js";import{join as c}from"node:path";import{execSync as l}from"node:child_process";import{existsSync as u,readFileSync as d}from"node:fs";import{homedir as f}from"node:os";t(),o(),i(),n();var p=`https://raw.githubusercontent.com/Loping151/ccn-cli/main/install.sh`,m=`https://raw.githubusercontent.com/Loping151/ccn-cli/main/install.ps1`;function h(){try{let e=c(s,`..`,`package.json`);if(u(e)){let t=JSON.parse(d(e,`utf-8`));if(t.version)return t.version}}catch{}return`1.5.1`}async function g(){r(`Current version: ${h()}\n`),r(`Updating CCN via the install script...

`);let t=process.platform===`win32`;try{t?l(`powershell -NoProfile -Command "irm ${m} | iex"`,{stdio:`inherit`,timeout:3e5}):l(`curl -fsSL ${p} | bash`,{stdio:`inherit`,cwd:f(),timeout:3e5}),r(`
`+e.green(`CCN updated. Restart ccn to use the new version.`)+`
`)}catch(n){process.stderr.write(e.red(`Update failed`)+`
`),process.stderr.write(`${n}\n\n`),process.stderr.write(`Update manually:
`),process.stderr.write(e.bold(`  ${t?`irm ${m} | iex`:`curl -fsSL ${p} | bash`}`)+`
`),await a(1);return}await a(0)}export{g as updateCCB};