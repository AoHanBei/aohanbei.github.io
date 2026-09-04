$ErrorActionPreference = "Stop"

$workspace = Split-Path -Parent $PSScriptRoot
$candidateRoots = @()

if ($env:FINESSE_SKILL_DIR) {
  $candidateRoots += $env:FINESSE_SKILL_DIR
}

$candidateRoots += (Join-Path $env:USERPROFILE ".codex\skills\finesse-ui")
$skillRoot = $candidateRoots | Where-Object { Test-Path -LiteralPath (Join-Path $_ "scripts\detect.mjs") } | Select-Object -First 1

if (-not $skillRoot) {
  throw "Finesse detector not found. Set FINESSE_SKILL_DIR or install finesse-ui in the current user's Codex skills directory."
}

$detector = Join-Path $skillRoot "scripts\detect.mjs"
$files = Get-ChildItem -LiteralPath $workspace -Recurse -File | Where-Object {
  $_.Extension -in ".html", ".css" -and
  $_.FullName -notlike "*\.git\*" -and
  $_.FullName -notlike "*\.finesse\*" -and
  $_.FullName -notlike "*\node_modules\*" -and
  $_.FullName -notlike "*\dist\*"
} | ForEach-Object FullName

if (-not $files) {
  throw "No HTML or CSS files were found."
}

$raw = & node $detector --json @files
if ($LASTEXITCODE -ne 0) {
  throw "The finesse-ui detector failed to execute."
}

$report = $raw | ConvertFrom-Json
$findings = @($report.files | ForEach-Object { $_.findings })
$p0 = @($findings | Where-Object severity -eq "P0")
$p1 = @($findings | Where-Object severity -eq "P1")
$p2 = @($findings | Where-Object severity -eq "P2")

Write-Output "Finesse check: P0=$($p0.Count), P1=$($p1.Count), P2=$($p2.Count)"

if ($p0.Count -gt 0) {
  Write-Output "P0 findings:"
  $p0 | ForEach-Object { Write-Output "- $($_.id): $($_.label)" }
}

if ($p1.Count -gt 0) {
  Write-Output "P1 findings:"
  $p1 | ForEach-Object { Write-Output "- $($_.id): $($_.label)" }
}

if ($p2.Count -gt 0) {
  Write-Output "P2 findings for manual review:"
  $p2 | ForEach-Object { Write-Output "- $($_.id): $($_.label)" }
}

if ($p0.Count -gt 0 -or $p1.Count -gt 0) {
  throw "Finesse gate failed. P0 and P1 must both be zero."
}

Write-Output "Finesse gate passed."
