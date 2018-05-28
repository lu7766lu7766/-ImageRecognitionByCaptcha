const puppeteer = require('puppeteer')
;(async () => {
	browser = await puppeteer.launch({
		headless: false // 開啟瀏覽器
	})

	page = await browser.newPage()
	await page.goto('https://www.google.com')
	await page.waitFor('#lst-ib')
	await page.type('#lst-ib', 'test')
	await page.keyboard.press('Enter')
	// await page.waitFor(3000)
	// await page.click('input[name="btnK"]')
	await page.waitFor('._NId')
	const contentHandle = await page.$('._NId')
	const html = await page.evaluate(content => {
		return content.getElementsByClassName('g')[0].innerHTML
	}, contentHandle)
	console.log(html)
	await page.wait(30000)
	await browser.close()
})()
