const puppeteer = require('puppeteer')
var userID = '54832403'
var loginID = 'zxc22086229'
var PWD = 'zxc54832403'

DeathByCaptcha = require('deathbycaptcha')
var dbc = new DeathByCaptcha('lu7766', 'lu90354')
var fs = require('fs')
var browser
var page
;(async () => {
	browser = await puppeteer.launch({
		headless: false
	})

	page = await browser.newPage()
	await page.goto('https://ecp.fareastone.com.tw/ECP/customer/entry_contentMainPage.action')

	await loginFunc()
	await page.waitFor(30000)

	// var img = await page.select('img[src="/ECP/jcaptcha.captcha"]')
	// console.log('img', img)
	await browser.close()
})()

var loginFunc = async () => {
	/**
	 * 產生新的captcha
	 */
	const captcha = await browser.newPage()
	await captcha.goto('https://ecp.fareastone.com.tw/ECP/jcaptcha.captcha')
	await captcha.screenshot({ path: 'captcha.png' })
	await captcha.close()
	/**
	 * 破解captcha
	 */
	var captchaRes = await new Promise((resolve, reject) => {
		dbc.solve(fs.readFileSync('captcha.png'), function(err, id, solution) {
			if (err) return console.error(err) // onoes!
			resolve({
				id,
				solution
			})
		})
	})

	/**
	 * 填入帳號密碼captcha
	 */
	await page.type('#userID', userID)
	await page.type('#loginID', loginID)
	await page.type('#PWD', PWD)
	await page.type('#jcaptchaNumber', captchaRes.solution)
	await page.click('#submit1')

	/**
	 * 檢測captcha是否正確
	 */
	var btn = await page
		.waitForSelector('#topnav03_li', {
			timeout: 10000
		})
		.catch(err => {
			console.log('err', err)
		})
	if (!btn) {
		dbc.report(captchaRes.id, function(err) {
			if (err) return console.error(err) // ONOES!
		})
		console.log('login error!!', captchaRes)
		loginFunc()
	} else {
		return true
		console.log('login success!!')
	}
}
