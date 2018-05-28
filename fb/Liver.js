const puppeteer = require('puppeteer')
class Liver {
    
    constructor(id, pwd) {
        this.id = id
        this.pwd = pwd
    }

    async connect() {
        this.browser = await puppeteer.launch({
            headless: false // 開啟瀏覽器
        })
        // console.log(this)
        this.page = await this.browser.newPage()
        await this.page.goto('https://www.facebook.com')
        // await this.page.waitFor(this.wait)
        await this.page.waitFor('#email')
        await this.page.type('#email', this.id)
        await this.page.type('#pass', this.pwd)
        await this.page.keyboard.press('Enter')
        // await this.page.waitFor(30000)
        // await this.browser.close()
    }

    async gotoFanPage(url) {
        await this.page.goto(url)
    }

    async getName() {
        await this.page.waitFor('#u_0_a')
        const contentHandle = await this.page.$('#u_0_a')
        const html = await this.page.evaluate(content => {
            return content.getElementsByClassName('_1vp5')[0].innerHTML
        }, contentHandle)
        return html
    }

    async close() {
        await this.browser.close()
    }


    // ;(async () => {
    //     await page.waitFor('#lst-ib')
    //     await page.type('#lst-ib', 'test')
    //     await page.keyboard.press('Enter')
    //     // await page.waitFor(3000)
    //     // await page.click('input[name="btnK"]')
    //     await page.waitFor('._NId')
    //     const contentHandle = await page.$('._NId')
    //     const html = await page.evaluate(content => {
    //         return content.getElementsByClassName('g')[0].innerHTML
    //     }, contentHandle)
    //     console.log(html)
    //     await page.wait(30000)
    //     await browser.close()
    // })()
}

module.exports = Liver
