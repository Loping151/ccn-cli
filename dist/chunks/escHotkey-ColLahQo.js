import{a as e,n as t,r as n}from"./chunk-DR8-3Aex.js";import{n as r,t as i}from"./defineProperty-80gRi2ZW.js";import{l as a,p as o}from"./debug-7IIyqDbL.js";import{tmpdir as s}from"os";import{join as c}from"path";import{readFileSync as l,unlinkSync as u}from"fs";function d(){let e,t;return{promise:new Promise((n,r)=>{e=n,t=r}),resolve:e,reject:t}}var f=t((()=>{})),ee=n({apps:()=>_,display:()=>g,screenshot:()=>v});function p(e){let t=Bun.spawnSync({cmd:[`osascript`,`-l`,`JavaScript`,`-e`,e],stdout:`pipe`,stderr:`pipe`});return new TextDecoder().decode(t.stdout).trim()}async function m(e){let t=Bun.spawn([`osascript`,`-e`,e],{stdout:`pipe`,stderr:`pipe`}),n=await new Response(t.stdout).text();return await t.exited,n.trim()}async function te(e){let t=Bun.spawn([`osascript`,`-l`,`JavaScript`,`-e`,e],{stdout:`pipe`,stderr:`pipe`}),n=await new Response(t.stdout).text();return await t.exited,n.trim()}async function h(e){let t=c(s(),`cu-screenshot-${Date.now()}.png`);await Bun.spawn([`screencapture`,...e,t],{stdout:`pipe`,stderr:`pipe`}).exited;try{let e=l(t);return{base64:e.toString(`base64`),width:e.readUInt32BE(16),height:e.readUInt32BE(20)}}finally{try{u(t)}catch{}}}var g,_,v,ne=t((()=>{g={getSize(e){let t=this.listAll();if(e!==void 0){let n=t.find(t=>t.displayId===e);if(n)return n}return t[0]??{width:1920,height:1080,scaleFactor:2,displayId:1}},listAll(){try{let e=p(`
        ObjC.import("CoreGraphics");
        var displays = $.CGDisplayCopyAllDisplayModes ? [] : [];
        var active = $.CGGetActiveDisplayList(10, null, Ref());
        var countRef = Ref();
        $.CGGetActiveDisplayList(0, null, countRef);
        var count = countRef[0];
        var idBuf = Ref();
        $.CGGetActiveDisplayList(count, idBuf, countRef);
        var result = [];
        for (var i = 0; i < count; i++) {
          var did = idBuf[i];
          var w = $.CGDisplayPixelsWide(did);
          var h = $.CGDisplayPixelsHigh(did);
          var mode = $.CGDisplayCopyDisplayMode(did);
          var pw = $.CGDisplayModeGetPixelWidth(mode);
          var sf = pw > 0 && w > 0 ? pw / w : 2;
          result.push({width: w, height: h, scaleFactor: sf, displayId: did});
        }
        JSON.stringify(result);
      `);return JSON.parse(e).map(e=>({width:Number(e.width),height:Number(e.height),scaleFactor:Number(e.scaleFactor),displayId:Number(e.displayId)}))}catch{try{let e=p(`
          ObjC.import("AppKit");
          var screens = $.NSScreen.screens;
          var result = [];
          for (var i = 0; i < screens.count; i++) {
            var s = screens.objectAtIndex(i);
            var frame = s.frame;
            var desc = s.deviceDescription;
            var screenNumber = desc.objectForKey($("NSScreenNumber")).intValue;
            var backingFactor = s.backingScaleFactor;
            result.push({
              width: Math.round(frame.size.width),
              height: Math.round(frame.size.height),
              scaleFactor: backingFactor,
              displayId: screenNumber
            });
          }
          JSON.stringify(result);
        `);return JSON.parse(e).map(e=>({width:Number(e.width),height:Number(e.height),scaleFactor:Number(e.scaleFactor),displayId:Number(e.displayId)}))}catch{return[{width:1920,height:1080,scaleFactor:2,displayId:1}]}}}},_={async prepareDisplay(e,t,n){return{activated:``,hidden:[]}},async previewHideSet(e,t){return[]},async findWindowDisplays(e){return e.map(e=>({bundleId:e,displayIds:[1]}))},async appUnderPoint(e,t){try{let n=await te(`
        ObjC.import("CoreGraphics");
        ObjC.import("AppKit");
        var pt = $.CGPointMake(${e}, ${t});
        var app = $.NSWorkspace.sharedWorkspace.frontmostApplication;
        JSON.stringify({bundleId: app.bundleIdentifier.js, displayName: app.localizedName.js});
      `);return JSON.parse(n)}catch{return null}},async listInstalled(){try{let e=[`/Applications`,`~/Applications`,`/System/Applications`],t=[];for(let n of e){let e=n.startsWith(`~`)?c(process.env.HOME??`~`,n.slice(1)):n,r=Bun.spawn([`bash`,`-c`,`for f in "${e}"/*.app; do [ -d "$f" ] || continue; bid=$(mdls -name kMDItemCFBundleIdentifier "$f" 2>/dev/null | sed 's/.*= "//;s/"//'); name=$(basename "$f" .app); echo "$f|$name|$bid"; done`],{stdout:`pipe`,stderr:`pipe`}),i=await new Response(r.stdout).text();await r.exited;for(let e of i.split(`
`).filter(Boolean)){let[n,r,i]=e.split(`|`,3);n&&r&&i&&i!==`(null)`&&t.push({bundleId:i,displayName:r,path:n})}}let n=new Set;return t.filter(e=>n.has(e.bundleId)?!1:(n.add(e.bundleId),!0))}catch{return[]}},iconDataUrl(e){return null},listRunning(){try{let e=p(`
        var apps = Application("System Events").applicationProcesses.whose({backgroundOnly: false});
        var result = [];
        for (var i = 0; i < apps.length; i++) {
          try {
            var a = apps[i];
            result.push({bundleId: a.bundleIdentifier(), displayName: a.name()});
          } catch(e) {}
        }
        JSON.stringify(result);
      `);return JSON.parse(e)}catch{return[]}},async open(e){await m(`tell application id "${e}" to activate`)},async unhide(e){for(let t of e)await m(`
        tell application "System Events"
          set visible of application process (name of application process whose bundle identifier is "${t}") to true
        end tell
      `)}},v={async captureExcluding(e,t,n,r,i){let a=[`-x`];return i!==void 0&&a.push(`-D`,String(i)),h(a)},async captureRegion(e,t,n,r,i,a,o,s,c){let l=[`-x`,`-R`,`${t},${n},${r},${i}`];return c!==void 0&&l.push(`-D`,String(c)),h(l)},captureWindowTarget(e){return null}}})),re=n({listWindows:()=>y});function y(){let e=Bun.spawnSync({cmd:[`powershell`,`-NoProfile`,`-NonInteractive`,`-Command`,b],stdout:`pipe`,stderr:`pipe`}),t=new TextDecoder().decode(e.stdout).trim();return t?t.split(`
`).filter(Boolean).map(e=>{let t=e.trim(),n=t.indexOf(`|`),r=t.indexOf(`|`,n+1);if(n===-1||r===-1)return null;let i=t.slice(0,n),a=Number(t.slice(n+1,r)),o=t.slice(r+1);return!i||isNaN(a)||!o?null:{hwnd:i,pid:a,title:o}}).filter(e=>e!==null):[]}var b,x=t((()=>{b=`
Add-Type @'
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text;
public class WinEnum {
    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);

    [DllImport("user32.dll")]
    public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);
    [DllImport("user32.dll")]
    public static extern bool IsWindowVisible(IntPtr hWnd);
    [DllImport("user32.dll", CharSet=CharSet.Unicode)]
    public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);
    [DllImport("user32.dll")]
    public static extern int GetWindowTextLength(IntPtr hWnd);
    [DllImport("user32.dll")]
    public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);

    public static List<string> results = new List<string>();

    public static void Run() {
        results.Clear();
        EnumWindows(delegate(IntPtr hWnd, IntPtr lParam) {
            if (!IsWindowVisible(hWnd)) return true;
            int len = GetWindowTextLength(hWnd);
            if (len == 0) return true;
            StringBuilder sb = new StringBuilder(len + 1);
            GetWindowText(hWnd, sb, sb.Capacity);
            string title = sb.ToString();
            if (string.IsNullOrWhiteSpace(title)) return true;
            uint pid = 0;
            GetWindowThreadProcessId(hWnd, out pid);
            results.Add(hWnd.ToInt64() + "|" + pid + "|" + title);
            return true;
        }, IntPtr.Zero);
    }
}
'@
[WinEnum]::Run()
[WinEnum]::results | ForEach-Object { $_ }
`}));function S(e){let t=e.trim();if(!t||t===`NOT_FOUND`||t===`INVALID_SIZE`)return null;let n=t.indexOf(`,`),r=t.indexOf(`,`,n+1);if(n===-1||r===-1)return null;let i=Number(t.slice(0,n)),a=Number(t.slice(n+1,r)),o=t.slice(r+1);return!i||!a||!o?null:{base64:o,width:i,height:a}}function C(e){let t=Bun.spawnSync({cmd:[`powershell`,`-NoProfile`,`-NonInteractive`,`-Command`,e],stdout:`pipe`,stderr:`pipe`});return new TextDecoder().decode(t.stdout).trim()}function ie(e){return S(C(`${T}\n[WinCap]::Capture('${e.replace(/'/g,`''`)}')`))}function w(e){return S(C(`${E}\n[WinCapH]::Capture([IntPtr]::new(${e}))`))}var T,E,ae=t((()=>{T=`
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing @'
using System;
using System.Runtime.InteropServices;
using System.Drawing;
using System.Drawing.Imaging;
public class WinCap {
    [DllImport("user32.dll", CharSet=CharSet.Unicode)]
    public static extern IntPtr FindWindow(string c, string t);
    [DllImport("user32.dll")]
    public static extern bool GetWindowRect(IntPtr h, out RECT r);
    [DllImport("user32.dll")]
    public static extern bool PrintWindow(IntPtr h, IntPtr hdc, uint f);
    [StructLayout(LayoutKind.Sequential)]
    public struct RECT { public int L, T, R, B; }

    public static string Capture(string title) {
        IntPtr hwnd = FindWindow(null, title);
        if (hwnd == IntPtr.Zero) return "NOT_FOUND";
        RECT r; GetWindowRect(hwnd, out r);
        int w = r.R - r.L; int h = r.B - r.T;
        if (w <= 0 || h <= 0) return "INVALID_SIZE";
        Bitmap bmp = new Bitmap(w, h);
        Graphics g = Graphics.FromImage(bmp);
        IntPtr hdc = g.GetHdc();
        PrintWindow(hwnd, hdc, 2);
        g.ReleaseHdc(hdc); g.Dispose();
        var ms = new System.IO.MemoryStream();
        bmp.Save(ms, ImageFormat.Png);
        bmp.Dispose();
        return w + "," + h + "," + Convert.ToBase64String(ms.ToArray());
    }
}
'@
`,E=`
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing @'
using System;
using System.Runtime.InteropServices;
using System.Drawing;
using System.Drawing.Imaging;
public class WinCapH {
    [DllImport("user32.dll")]
    public static extern bool GetWindowRect(IntPtr h, out RECT r);
    [DllImport("user32.dll")]
    public static extern bool PrintWindow(IntPtr h, IntPtr hdc, uint f);
    [DllImport("user32.dll")]
    public static extern bool IsWindow(IntPtr hWnd);
    [StructLayout(LayoutKind.Sequential)]
    public struct RECT { public int L, T, R, B; }

    public static string Capture(IntPtr hwnd) {
        if (!IsWindow(hwnd)) return "NOT_FOUND";
        RECT r; GetWindowRect(hwnd, out r);
        int w = r.R - r.L; int h = r.B - r.T;
        if (w <= 0 || h <= 0) return "INVALID_SIZE";
        Bitmap bmp = new Bitmap(w, h);
        Graphics g = Graphics.FromImage(bmp);
        IntPtr hdc = g.GetHdc();
        PrintWindow(hwnd, hdc, 2);
        g.ReleaseHdc(hdc); g.Dispose();
        var ms = new System.IO.MemoryStream();
        bmp.Save(ms, ImageFormat.Png);
        bmp.Dispose();
        return w + "," + h + "," + Convert.ToBase64String(ms.ToArray());
    }
}
'@
`})),oe=n({apps:()=>A,display:()=>k,screenshot:()=>j});function D(e){let t=Bun.spawnSync({cmd:[`powershell`,`-NoProfile`,`-NonInteractive`,`-Command`,e],stdout:`pipe`,stderr:`pipe`});return new TextDecoder().decode(t.stdout).trim()}async function O(e){let t=Bun.spawn([`powershell`,`-NoProfile`,`-NonInteractive`,`-Command`,e],{stdout:`pipe`,stderr:`pipe`}),n=await new Response(t.stdout).text();return await t.exited,n.trim()}var k,A,j,se=t((()=>{x(),ae(),k={getSize(e){let t=this.listAll();if(e!==void 0){let n=t.find(t=>t.displayId===e);if(n)return n}return t[0]??{width:1920,height:1080,scaleFactor:1,displayId:0}},listAll(){try{return D(`
Add-Type -AssemblyName System.Windows.Forms
$result = @()
$idx = 0
foreach ($s in [System.Windows.Forms.Screen]::AllScreens) {
  $result += "$($s.Bounds.Width),$($s.Bounds.Height),$idx,$($s.Primary)"
  $idx++
}
$result -join "|"
`).split(`|`).filter(Boolean).map(e=>{let[t,n,r,i]=e.split(`,`);return{width:Number(t),height:Number(n),scaleFactor:1,displayId:Number(r)}})}catch{return[{width:1920,height:1080,scaleFactor:1,displayId:0}]}}},A={async prepareDisplay(e,t,n){return{activated:``,hidden:[]}},async previewHideSet(e,t){return[]},async findWindowDisplays(e){return e.map(e=>({bundleId:e,displayIds:[0]}))},async appUnderPoint(e,t){try{let n=D(`
Add-Type @'
using System;
using System.Runtime.InteropServices;
public class WinPt {
  [StructLayout(LayoutKind.Sequential)] public struct POINT { public int X; public int Y; }
  [DllImport("user32.dll")] public static extern IntPtr WindowFromPoint(POINT p);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint pid);
}
'@
$pt = New-Object WinPt+POINT
$pt.X = ${e}; $pt.Y = ${t}
$hwnd = [WinPt]::WindowFromPoint($pt)
$pid = [uint32]0
[WinPt]::GetWindowThreadProcessId($hwnd, [ref]$pid) | Out-Null
$proc = Get-Process -Id $pid -ErrorAction SilentlyContinue
"$($proc.MainModule.FileName)|$($proc.ProcessName)"
`);if(!n||!n.includes(`|`))return null;let[r,i]=n.split(`|`,2);return{bundleId:r,displayName:i}}catch{return null}},async listInstalled(){try{return(await O(`
$apps = @()
$paths = @(
  'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*',
  'HKLM:\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*',
  'HKCU:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*'
)
foreach ($p in $paths) {
  Get-ItemProperty $p -ErrorAction SilentlyContinue | Where-Object { $_.DisplayName } | ForEach-Object {
    $apps += "$($_.DisplayName)|$($_.InstallLocation)|$($_.PSChildName)"
  }
}
$apps | Select-Object -Unique | Select-Object -First 200
`)).split(`
`).filter(Boolean).map(e=>{let[t,n,r]=e.split(`|`,3);return{bundleId:r??t??``,displayName:t??``,path:n??``}})}catch{return[]}},iconDataUrl(e){return null},listRunning(){try{return y().map(e=>({bundleId:String(e.hwnd),displayName:e.title}))}catch{return[]}},async open(e){let t=e.replace(/'/g,`''`);await O(`
if (Test-Path '${t}') {
  Start-Process '${t}'
} else {
  Start-Process -FilePath '${t}' -ErrorAction SilentlyContinue
}`)},async unhide(e){for(let t of e)await O(`
Add-Type @'
using System;
using System.Runtime.InteropServices;
public class WinShow {
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmd);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
}
'@
$proc = Get-Process -Name "${t}" -ErrorAction SilentlyContinue | Select-Object -First 1
if ($proc) { [WinShow]::ShowWindow($proc.MainWindowHandle, 9) | Out-Null; [WinShow]::SetForegroundWindow($proc.MainWindowHandle) | Out-Null }
`)}},j={async captureExcluding(e,t,n,r,i){let a=await O(`
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$screen = if (${i??-1} -ge 0) { [System.Windows.Forms.Screen]::AllScreens[${i??0}] } else { [System.Windows.Forms.Screen]::PrimaryScreen }
$bounds = $screen.Bounds
$bmp = New-Object System.Drawing.Bitmap($bounds.Width, $bounds.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.CopyFromScreen($bounds.Location, [System.Drawing.Point]::Empty, $bounds.Size)
$g.Dispose()
$ms = New-Object System.IO.MemoryStream
$bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$bytes = $ms.ToArray()
$ms.Dispose()
"$($bounds.Width),$($bounds.Height)," + [Convert]::ToBase64String($bytes)
`),o=a.indexOf(`,`),s=a.indexOf(`,`,o+1),c=Number(a.slice(0,o)),l=Number(a.slice(o+1,s));return{base64:a.slice(s+1),width:c,height:l}},async captureRegion(e,t,n,r,i,a,o,s,c){let l=await O(`
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$bmp = New-Object System.Drawing.Bitmap(${r}, ${i})
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.CopyFromScreen(${t}, ${n}, 0, 0, (New-Object System.Drawing.Size(${r}, ${i})))
$g.Dispose()
$ms = New-Object System.IO.MemoryStream
$bmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$bytes = $ms.ToArray()
$ms.Dispose()
"${r},${i}," + [Convert]::ToBase64String($bytes)
`),u=l.indexOf(`,`),d=l.indexOf(`,`,u+1);return{base64:l.slice(d+1),width:r,height:i}},captureWindowTarget(e){return typeof e==`number`?w(e):ie(e)}}})),ce=n({apps:()=>I,display:()=>F,screenshot:()=>R});function M(e){let t=Bun.spawnSync({cmd:e,stdout:`pipe`,stderr:`pipe`});return new TextDecoder().decode(t.stdout).trim()}async function N(e){let t=Bun.spawn(e,{stdout:`pipe`,stderr:`pipe`}),n=await new Response(t.stdout).text();return await t.exited,n.trim()}function P(e){return Bun.spawnSync({cmd:[`which`,e],stdout:`pipe`,stderr:`pipe`}).exitCode===0}var F,I,L,R,z=t((()=>{F={getSize(e){let t=this.listAll();if(e!==void 0){let n=t.find(t=>t.displayId===e);if(n)return n}return t[0]??{width:1920,height:1080,scaleFactor:1,displayId:0}},listAll(){try{let e=M([`xrandr`,`--query`]),t=[],n=0,r=/^\S+\s+connected\s+(?:primary\s+)?(\d+)x(\d+)\+\d+\+\d+/gm,i;for(;(i=r.exec(e))!==null;)t.push({width:Number(i[1]),height:Number(i[2]),scaleFactor:1,displayId:n++});return t.length===0?[{width:1920,height:1080,scaleFactor:1,displayId:0}]:t}catch{return[{width:1920,height:1080,scaleFactor:1,displayId:0}]}}},I={async prepareDisplay(e,t,n){return{activated:``,hidden:[]}},async previewHideSet(e,t){return[]},async findWindowDisplays(e){return e.map(e=>({bundleId:e,displayIds:[0]}))},async appUnderPoint(e,t){try{let n=M([`xdotool`,`mousemove`,`--sync`,String(e),String(t),`getmouselocation`,`--shell`]).match(/WINDOW=(\d+)/);if(!n)return null;let r=n[1],i=M([`xdotool`,`getwindowpid`,r]);if(!i)return null;let a=``;try{a=M([`readlink`,`-f`,`/proc/${i}/exe`])}catch{}let o=``;try{o=M([`cat`,`/proc/${i}/comm`])}catch{}return!a&&!o?null:{bundleId:a||i,displayName:o||`unknown`}}catch{return null}},async listInstalled(){try{let e=[`/usr/share/applications`,`/usr/local/share/applications`,`${process.env.HOME}/.local/share/applications`],t=[];for(let n of e){let e;try{e=M([`find`,n,`-name`,`*.desktop`,`-maxdepth`,`1`])}catch{continue}for(let n of e.split(`
`).filter(Boolean))try{let e=M([`cat`,n]),r=e.match(/^Name=(.+)$/m),i=e.match(/^Exec=(.+)$/m);if(e.match(/^NoDisplay=true$/m))continue;let a=r?.[1]??``,o=i?.[1]??``;if(!a)continue;t.push({bundleId:n.split(`/`).pop()?.replace(`.desktop`,``)??``,displayName:a,path:o.split(/\s+/)[0]??``})}catch{}}return t.slice(0,200)}catch{return[]}},iconDataUrl(e){return null},listRunning(){try{if(P(`wmctrl`)){let e=M([`wmctrl`,`-l`,`-p`]),t=[];for(let n of e.split(`
`).filter(Boolean)){let e=n.split(/\s+/)[2];if(!e||e===`0`)continue;let r=``;try{r=M([`readlink`,`-f`,`/proc/${e}/exe`])}catch{}let i=``;try{i=M([`cat`,`/proc/${e}/comm`])}catch{}i&&t.push({bundleId:r||e,displayName:i})}let n=new Set;return t.filter(e=>n.has(e.bundleId)?!1:(n.add(e.bundleId),!0)).slice(0,50)}let e=M([`ps`,`-eo`,`pid,comm`,`--no-headers`]),t=[];for(let n of e.split(`
`).filter(Boolean).slice(0,50)){let e=n.trim().match(/^(\d+)\s+(.+)$/);e&&t.push({bundleId:e[1],displayName:e[2]})}return t}catch{return[]}},async open(e){try{let t=e.endsWith(`.desktop`)?e:`${e}.desktop`;if(P(`gtk-launch`)){await N([`gtk-launch`,t]);return}}catch{}await N([`xdg-open`,e])},async unhide(e){for(let t of e)try{P(`wmctrl`)&&t.startsWith(`0x`)?await N([`wmctrl`,`-i`,`-R`,t]):await N([`xdotool`,`search`,`--name`,t,`windowactivate`])}catch{}}},L=`/tmp/cu-screenshot.png`,R={async captureExcluding(e,t,n,r,i){try{await N([`scrot`,`-o`,L]);let e=await Bun.file(L).arrayBuffer(),t=Buffer.from(e).toString(`base64`),n=F.getSize(i);return{base64:t,width:n.width,height:n.height}}catch{return{base64:``,width:0,height:0}}},async captureRegion(e,t,n,r,i,a,o,s,c){try{await N([`scrot`,`-a`,`${t},${n},${r},${i}`,`-o`,L]);let e=await Bun.file(L).arrayBuffer();return{base64:Buffer.from(e).toString(`base64`),width:r,height:i}}catch{return{base64:``,width:0,height:0}}},captureWindowTarget(e){return null}}})),le=n({ComputerUseAPI:()=>V});function ue(){try{if(process.platform===`darwin`)return ne(),e(ee);if(process.platform===`win32`)return se(),e(oe);if(process.platform===`linux`)return z(),e(ce)}catch{return null}return null}var B,V,de=t((()=>{r(),B=ue(),V=class{constructor(){i(this,`apps`,B?.apps??{async prepareDisplay(){return{activated:``,hidden:[]}},async previewHideSet(){return[]},async findWindowDisplays(e){return e.map(e=>({bundleId:e,displayIds:[]}))},async appUnderPoint(){return null},async listInstalled(){return[]},iconDataUrl(){return null},listRunning(){return[]},async open(){throw Error(`@ant/computer-use-swift: macOS only`)},async unhide(){}}),i(this,`display`,B?.display??{getSize(){throw Error(`@ant/computer-use-swift: macOS only`)},listAll(){throw Error(`@ant/computer-use-swift: macOS only`)}}),i(this,`screenshot`,B?.screenshot??{async captureExcluding(){throw Error(`@ant/computer-use-swift: macOS only`)},async captureRegion(){throw Error(`@ant/computer-use-swift: macOS only`)}})}async resolvePrepareCapture(e,t,n,r,i,a){return this.screenshot.captureExcluding(e,n,r,i,a)}}}));function H(){if(U)return U;let t=(de(),e(le));return U=t.ComputerUseAPI&&typeof t.ComputerUseAPI==`function`?new t.ComputerUseAPI:t,U}var U,W=t((()=>{}));function fe(e){e?._drainMainRunLoop?.()}function G(){J++,q===void 0&&(q=setInterval(fe,1,H()),o(`[drainRunLoop] pump started`,{level:`verbose`}))}function K(){J--,J<=0&&q!==void 0&&(clearInterval(q),q=void 0,o(`[drainRunLoop] pump stopped`,{level:`verbose`}),J=0)}function pe(e){e(Error(`computer-use native call exceeded ${Y}ms`))}async function me(e){if(process.platform!==`darwin`)return e();G();let t;try{let n=e();n.catch(()=>{});let r=d();return t=setTimeout(pe,Y,r.reject),await Promise.race([n,r.promise])}finally{clearTimeout(t),K()}}var q,J,Y,X,Z,Q=t((()=>{a(),f(),W(),J=0,Y=3e4,X=G,Z=K}));function he(e){return process.platform===`darwin`?$?!0:H().hotkey?.registerEscape(e)?(X(),$=!0,o(`[cu-esc] registered`),!0):(o(`[cu-esc] registerEscape returned false`,{level:`warn`}),!1):!1}function ge(){if($)try{H().hotkey?.unregister()}finally{Z(),$=!1,o(`[cu-esc] unregistered`)}}function _e(){$&&H().hotkey?.notifyExpectedEscape()}var $,ve=t((()=>{a(),Q(),W(),$=!1}));export{me as a,H as c,re as d,f,ge as i,x as l,_e as n,Q as o,d as p,he as r,W as s,ve as t,y as u};