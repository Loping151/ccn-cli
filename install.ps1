# CCN one-line installer (Windows PowerShell).  Usage:
#   irm https://raw.githubusercontent.com/Loping151/ccn-cli/main/install.ps1 | iex
$ErrorActionPreference = "Stop"
$Repo    = "Loping151/ccn-cli"
$Branch  = "main"
$App     = Join-Path $env:USERPROFILE ".ccn-app"
$Bin     = Join-Path $env:USERPROFILE ".local\bin"
$NodeVer = "v20.18.1"

function Say($m) { Write-Host "==> $m" -ForegroundColor Cyan }

# ---- 1. Node.js >= 20 -------------------------------------------------------
$node = $null
$sys = Get-Command node -ErrorAction SilentlyContinue
if ($sys) {
  $maj = (& node -p "process.versions.node.split('.')[0]") 2>$null
  if ([int]$maj -ge 20) { $node = $sys.Source }
}
$localNode = Join-Path $env:USERPROFILE ".local\node\node.exe"
if (-not $node -and (Test-Path $localNode)) {
  $maj = (& $localNode -p "process.versions.node.split('.')[0]") 2>$null
  if ([int]$maj -ge 20) { $node = $localNode }
}
if (-not $node) {
  Say "Installing Node.js $NodeVer"
  $arch = if ([Environment]::Is64BitOperatingSystem) { "x64" } else { "x86" }
  $url  = "https://nodejs.org/dist/$NodeVer/node-$NodeVer-win-$arch.zip"
  $zip  = Join-Path $env:TEMP "ccn-node.zip"
  Invoke-WebRequest -Uri $url -OutFile $zip
  $dst = Join-Path $env:USERPROFILE ".local"
  New-Item -ItemType Directory -Force -Path $dst | Out-Null
  Expand-Archive -Path $zip -DestinationPath $dst -Force
  $nodeDir = Join-Path $dst "node"
  if (Test-Path $nodeDir) { Remove-Item $nodeDir -Recurse -Force }
  Rename-Item (Join-Path $dst "node-$NodeVer-win-$arch") $nodeDir
  Remove-Item $zip -Force
  $node = Join-Path $nodeDir "node.exe"
}
Say "Using node $(& $node -v)"

# ---- 2. Download dist -------------------------------------------------------
Say "Downloading CCN"
$tmp = Join-Path $env:TEMP ("ccn-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force -Path $tmp | Out-Null
$tgz = Join-Path $tmp "ccn.tar.gz"
Invoke-WebRequest -Uri "https://github.com/$Repo/archive/refs/heads/$Branch.tar.gz" -OutFile $tgz
tar -xzf $tgz -C $tmp     # tar ships with Windows 10 1803+
$src = Join-Path $tmp "ccn-cli-$Branch\dist"
if (-not (Test-Path $src)) { throw "dist not found in download" }
if (Test-Path $App) { Remove-Item $App -Recurse -Force }
New-Item -ItemType Directory -Force -Path $App | Out-Null
Copy-Item (Join-Path $src "*") $App -Recurse -Force
'{"type":"module"}' | Set-Content -Path (Join-Path $App "package.json") -Encoding ascii
Remove-Item $tmp -Recurse -Force

# ---- 3. Launcher (ccn.cmd) --------------------------------------------------
New-Item -ItemType Directory -Force -Path $Bin | Out-Null
$cmd = "@echo off`r`n`"$node`" `"$App\cli-node.js`" %*`r`n"
Set-Content -Path (Join-Path $Bin "ccn.cmd") -Value $cmd -Encoding ascii

# ---- 4. PATH (user) ---------------------------------------------------------
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
if ($userPath -notlike "*$Bin*") {
  [Environment]::SetEnvironmentVariable("Path", "$Bin;$userPath", "User")
}

Write-Host ""
Say "CCN installed -> $Bin\ccn.cmd"
Write-Host @"

Get started:
  `$env:ANTHROPIC_BASE_URL = "https://your-endpoint/anthropic"
  `$env:ANTHROPIC_AUTH_TOKEN = "your-key"
  ccn

Open a NEW terminal so the PATH update takes effect.
"@
