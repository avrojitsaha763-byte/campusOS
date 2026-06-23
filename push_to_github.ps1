# CampusOS GitHub Deployment Script
# Run this script to commit and push changes once Git is installed/configured in your terminal path.

$gitInstalled = Get-Command git -ErrorAction SilentlyContinue

if (!$gitInstalled) {
    Write-Host "⚠️ Git CLI is not detected in your current PowerShell environment PATH." -ForegroundColor Yellow
    Write-Host "Please download Git from: https://git-scm.com/downloads" -ForegroundColor Cyan
    Write-Host "Or ensure Git is added to your environment variables, then restart your terminal and run this script." -ForegroundColor Yellow
    Exit
}

Write-Host "🚀 Git detected! Starting repository deployment sequence..." -ForegroundColor Green

# Check if it is a git repository
if (!(Test-Path ".git")) {
    Write-Host "📦 Initializing a new local Git repository..." -ForegroundColor Cyan
    git init
}

# Add all files
Write-Host "➕ Staging files..." -ForegroundColor Cyan
git add .

# Prompt or commit directly
Write-Host "💾 Committing changes..." -ForegroundColor Cyan
git commit -m "feat: CampusOS TITAN X High-Fidelity UI/UX & microservices resolution"

Write-Host "✅ Changes successfully committed to local branch." -ForegroundColor Green
Write-Host "To push to your remote GitHub repository, run the following commands in your shell:" -ForegroundColor Yellow
Write-Host "  git remote add origin <YOUR_GITHUB_REPO_URL>" -ForegroundColor Cyan
Write-Host "  git branch -M main" -ForegroundColor Cyan
Write-Host "  git push -u origin main" -ForegroundColor Cyan
