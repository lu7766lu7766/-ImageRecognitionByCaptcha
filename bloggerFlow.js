const puppeteer = require('puppeteer')
const _ = require('lodash')
;(async () => {
	const browser = await puppeteer.launch({
		headless: false // 開啟瀏覽器
	})

	var pages = [],
		maxPage = 30
	while (true) {
		if (pages.length < maxPage) {
			let page = await browser.newPage()
			pages.push(page)
			page.goto('http://jacwang.blogspot.tw/2018/01/node-jspuppeteer.html').then(async x => {
				await page.waitFor(Math.round(Math.random() * 3 * 1000) + 1000)
				await page.close()
				pages.splice(_.findIndex(pages, page), 1)
			})
		} else {
			await sleep(1000)
		}
	}
})()

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}
