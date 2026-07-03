# CCN one-line installer (Windows PowerShell).  Usage:
#   irm https://raw.githubusercontent.com/Loping151/ccn-cli/main/install.ps1 | iex
$ErrorActionPreference = "Stop"
$Repo    = "Loping151/ccn-cli"
$Branch  = "main"
$App     = Join-Path $env:USERPROFILE ".ccn-app"
$Bin     = Join-Path $env:USERPROFILE ".local\bin"
$NodeVer = "v20.18.1"

function Say($m) { Write-Host "==> $m" -ForegroundColor Cyan }
function Die($m) { Write-Host "!! $m" -ForegroundColor Red; exit 1 }
function Download($url, $out) {
  for ($i = 1; $i -le 3; $i++) {
    try { Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing; return }
    catch { if ($i -eq 3) { throw }; Start-Sleep -Seconds 2 }
  }
}

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
  if (-not [Environment]::Is64BitOperatingSystem) {
    Die "CCN requires 64-bit Windows (Node.js no longer ships 32-bit builds). Install Node 20+ manually."
  }
  Say "Installing Node.js $NodeVer"
  $url = "https://nodejs.org/dist/$NodeVer/node-$NodeVer-win-x64.zip"
  $zip = Join-Path $env:TEMP ("ccn-node-" + [guid]::NewGuid().ToString("N") + ".zip")
  Download $url $zip
  $dst = Join-Path $env:USERPROFILE ".local"
  New-Item -ItemType Directory -Force -Path $dst | Out-Null
  Expand-Archive -Path $zip -DestinationPath $dst -Force
  $nodeDir = Join-Path $dst "node"
  if (Test-Path $nodeDir) { Remove-Item $nodeDir -Recurse -Force }
  Rename-Item (Join-Path $dst "node-$NodeVer-win-x64") $nodeDir
  Remove-Item $zip -Force
  $node = Join-Path $nodeDir "node.exe"
}
Say "Using node $(& $node -v)"

# ---- 2. Download dist（暂存 → 替换，失败不动旧安装） ------------------------
Say "Downloading CCN"
$tmp = Join-Path $env:TEMP ("ccn-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Force -Path $tmp | Out-Null
try {
  $tgz = Join-Path $tmp "ccn.tar.gz"
  Download "https://github.com/$Repo/archive/refs/heads/$Branch.tar.gz" $tgz
  tar -xzf $tgz -C $tmp     # tar ships with Windows 10 1803+
  if ($LASTEXITCODE -ne 0) { Die "tar extract failed (need Windows 10 1803+)" }
  $src = Join-Path $tmp "ccn-cli-$Branch\dist"
  if (-not (Test-Path (Join-Path $src "cli-node.js"))) { Die "dist not found in download" }
  $verFile = Join-Path $tmp "ccn-cli-$Branch\VERSION"
  $ver = if (Test-Path $verFile) { (Get-Content $verFile -Raw).Trim() } else { "0.0.0" }

  $stage = "$App.new"
  if (Test-Path $stage) { Remove-Item $stage -Recurse -Force }
  New-Item -ItemType Directory -Force -Path $stage | Out-Null
  Copy-Item (Join-Path $src "*") $stage -Recurse -Force
  "{`"type`":`"module`",`"version`":`"$ver`"}" | Set-Content -Path (Join-Path $stage "package.json") -Encoding ascii

  # 替换：删旧落新。若 ccn 正在运行会占用文件 → 提示关闭后重试。
  if (Test-Path $App) {
    try { Remove-Item $App -Recurse -Force }
    catch { Die "Could not replace $App (is ccn running? close it and re-run)." }
  }
  Move-Item $stage $App
} finally {
  if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
  if (Test-Path "$App.new") { Remove-Item "$App.new" -Recurse -Force }
}

# ---- 3. Launcher (ccn.cmd) --------------------------------------------------
New-Item -ItemType Directory -Force -Path $Bin | Out-Null
$cmd = "@echo off`r`n`"$node`" `"$App\cli-node.js`" %*`r`n"
Set-Content -Path (Join-Path $Bin "ccn.cmd") -Value $cmd -Encoding ascii

# ---- 4. PATH (user, 精确去重) ----------------------------------------------
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$entries = @($userPath -split ';' | Where-Object { $_ -ne '' })
if ($entries -notcontains $Bin) {
  $newPath = (@($Bin) + $entries) -join ';'
  [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
}

Write-Host ""
Say "CCN installed -> $Bin\ccn.cmd"
Write-Host @"

Get started:
  `$env:ANTHROPIC_BASE_URL = "https://your-endpoint/anthropic"
  `$env:ANTHROPIC_AUTH_TOKEN = "your-key"
  ccn

Open a NEW terminal so the PATH update takes effect.
To uninstall:  ccn uninstall   (or irm https://raw.githubusercontent.com/$Repo/main/uninstall.ps1 | iex)
"@
