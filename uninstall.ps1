# CCN uninstaller (Windows PowerShell).  Usage:
#   irm https://raw.githubusercontent.com/Loping151/ccn-cli/main/uninstall.ps1 | iex
# Or, if ccn still runs:  ccn uninstall
$ErrorActionPreference = "Stop"
$App    = Join-Path $env:USERPROFILE ".ccn-app"
$Cmd    = Join-Path $env:USERPROFILE ".local\bin\ccn.cmd"
$Bin    = Join-Path $env:USERPROFILE ".local\bin"
$Config = if ($env:CLAUDE_CONFIG_DIR -and $env:CLAUDE_CONFIG_DIR.Trim()) { $env:CLAUDE_CONFIG_DIR } else { Join-Path $env:USERPROFILE ".ccn" }
$Shared = Join-Path $env:USERPROFILE ".claude"   # 与官方 claude 共享 —— 绝不删

function Ask($q) { Read-Host $q }
function IsYes($a, $defYes = $false) {
  if ([string]::IsNullOrWhiteSpace($a)) { return $defYes }
  return $a -match '^(y|yes)$'
}

Write-Host "Uninstall CCN"
Write-Host "  app:      $App"
Write-Host "  launcher: $Cmd"
Write-Host "  config:   $Config"
Write-Host ""

if (-not (IsYes (Ask "Uninstall CCN? [y/N]"))) { Write-Host "Aborted. Nothing was removed."; exit 0 }

$delConfig = IsYes (Ask "Also delete config & sessions at $Config? [y/N]")

# 绝不删共享目录
if ($delConfig -and ($Config.TrimEnd('\','/') -eq $Shared.TrimEnd('\','/'))) {
  Write-Host "Config dir is $Shared (shared with official Claude Code) — keeping it."
  $delConfig = $false
}
# 护栏：Config 解析成 $HOME / 根 时绝不删
$normCfg = $Config.TrimEnd('\','/')
$forbidden = @($env:USERPROFILE.TrimEnd('\','/'), (Split-Path $env:USERPROFILE -Parent).TrimEnd('\','/'), "", "C:", "C:\")
if ($delConfig -and ($forbidden -contains $normCfg)) {
  Write-Host "Config dir resolves to an unsafe path ($Config) — refusing to delete it."
  $delConfig = $false
}

if ($delConfig) {
  if (IsYes (Ask "Back up config/sessions to a .zip first? [Y/n]") $true) {
    $stamp = Get-Date -Format "yyyyMMdd-HHmmss"
    $backup = Join-Path $env:USERPROFILE "ccn-config-backup-$stamp.zip"
    try {
      Compress-Archive -Path $Config -DestinationPath $backup -Force
      if (-not (Test-Path $backup)) { throw "backup not created" }
      Write-Host "Backup saved: $backup"
    } catch {
      Write-Host "Backup FAILED — aborting uninstall, nothing was deleted." -ForegroundColor Red
      exit 1
    }
  }
}

if (Test-Path $App) { Remove-Item $App -Recurse -Force -ErrorAction SilentlyContinue }
if (Test-Path $Cmd) { Remove-Item $Cmd -Force -ErrorAction SilentlyContinue }
if ($delConfig -and (Test-Path $Config)) { Remove-Item $Config -Recurse -Force -ErrorAction SilentlyContinue }

# 从 User PATH 精确移除 ~/.local/bin
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")
$entries = @($userPath -split ';' | Where-Object { $_ -ne '' -and $_.TrimEnd('\') -ne $Bin.TrimEnd('\') })
[Environment]::SetEnvironmentVariable("Path", ($entries -join ';'), "User")

Write-Host ""
Write-Host "CCN uninstalled."
if (-not $delConfig) { Write-Host "Config & sessions kept at $Config." }
