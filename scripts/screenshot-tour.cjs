// @ts-check
const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

const OUT = path.join(__dirname, '..', 'scripts', 'screenshots')
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true })

;(async () => {
  const browser = await chromium.launch()
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await ctx.newPage()

  const shots = [
    { name: '01-hero',       url: '/',                    selector: '#hero' },
    { name: '02-about',      url: '/#about',              selector: '#about' },
    { name: '03-skills',     url: '/#skills',             selector: '#skills' },
    { name: '04-projects',   url: '/#projects',           selector: '#projects' },
    { name: '05-contact',    url: '/#contact',            selector: '#contact' },
    { name: '06-dashboard',  url: '/dashboard',           selector: null },
    { name: '07-tasks',      url: '/dashboard/tasks',     selector: null },
    { name: '08-prompts',    url: '/dashboard/prompts',   selector: null },
    { name: '09-jobs',       url: '/dashboard/jobs',      selector: null },
    { name: '10-budget',     url: '/dashboard/budget',    selector: null },
  ]

  for (const s of shots) {
    await page.goto(`http://localhost:5173${s.url}`, { waitUntil: 'networkidle', timeout: 15000 })
    await page.waitForTimeout(600)
    if (s.selector) {
      await page.evaluate(sel => document.querySelector(sel)?.scrollIntoView({ behavior: 'instant' }), s.selector)
      await page.waitForTimeout(300)
    }
    const file = path.join(OUT, `${s.name}.png`)
    await page.screenshot({ path: file, fullPage: false })
    console.log(`✓ ${s.name}`)
  }

  await browser.close()
  console.log('Done →', OUT)
})()
