var request = (request = require('async-request'))
var userID = '54832403'
var loginID = 'zxc22086229'
var PWD = 'zxc54832403'

var Nightmare = require('Nightmare')
// require('nightmare-download-manager')(Nightmare)
require('nightmare-inline-download')(Nightmare)
var nightmare = Nightmare({
	openDevTools: {
		mode: 'detach'
	},
	typeInterval: 20,
	// pollInterval: 50,
	show: true,
	waitTimeout: 15 * 60 * 1000 // 10 mins
})

DeathByCaptcha = require('deathbycaptcha')
var dbc = new DeathByCaptcha('lu7766', 'lu90354')

// var base64

nightmare
	// .downloadManager()
	.goto('https://ecp.fareastone.com.tw/ECP/customer/entry_contentMainPage.action')
	.inject('js', 'jquery.min.js')
	.inject('js', 'axios.min.js')
	.inject('js', 'base64.min.js')
	// .wait('#userID')
	// .wait(3000)
	.type('#userID', userID)
	.type('#loginID', loginID)
	.type('#PWD', PWD)
	// .wait()
	.evaluate(async () => {
		console.log('start')
		var image
		var _base64 = await new Promise((resolve, reject) => {
			image = new Image()
			image.src = 'https://ecp.fareastone.com.tw/ECP/jcaptcha.captcha'
			image.onload = function() {
				var canvas = document.createElement('canvas')
				canvas.width = this.naturalWidth // or 'width' if you want a special/scaled size
				canvas.height = this.naturalHeight // or 'height' if you want a special/scaled size
				canvas.getContext('2d').drawImage(this, 0, 0)
				// Get raw image data
				// resolve(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''))
				resolve(canvas.toDataURL('image/png'))
				// ... or get as Data URI
				// callback(canvas.toDataURL('image/png'))
			}
		})
		// console.log(_base64)
		// base64 = _base64
		// var myRequest = async (url, body) => {
		// 	var res = await request(url, body)
		// 	if (res.statusCode == 200) {
		// 		return res.body
		// 	} else {
		// 	}
		// }
		// var res = await myRequest('https://jsonplaceholder.typicode.com/posts/1', {})
		// console.log(res)

		// var res = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
		// console.log(res)
		// console.log(btoa(_base64))
		// var uploadRes = await axios({
		// 	method: 'get',
		// 	url: 'http://api.dbcapi.me/api/captcha', //'https://jsonplaceholder.typicode.com/posts/1', // 'http://api.dbcapi.me/api/captcha',
		// 	data: {
		// 		username: 'lu7766',
		// 		password: 'lu90354',
		// 		captchafile: 'base64:' + btoa(_base64)
		// 	},
		// 	headers: {
		// 		'Content-Type': 'multipart/form-data'
		// 	}
		// })
		console.log(uploadRes)

		// var formData = new FormData()
		// formData.append('username', 'lu7766')
		// formData.append('password', 'lu90354')
		// formData.append('captchafile', image)
		// $.ajax({
		// 	method: 'post',
		// 	url: 'http://api.dbcapi.me/api/captcha',
		// 	data: formData,
		// 	header: {
		// 		'Content-Type': 'multipart/form-data'
		// 	}
		// })
		// .done(uploadRes => {
		// 	console.log(uploadRes)
		// })

		// console.log(uploadRes)
		// if (uploadRes.status === 0) {
		// 	console.log(uploadRes.captcha)
		// }
		// return 'test'

		// // Usage
		// // var timer = setInterval(() => {
		// // 	if (dataBase64) return dataBase64
		// // 	else clearInterval(timer)
		// // }, 300)
		// return 'test'
		// var $img = $('img[src="/ECP/jcaptcha.captcha"]')
		// console.log($img)
		// return $img
	})
	// .then(res => {
	// 	console.log('base64', base64)
	// })
	// .download('https://ecp.fareastone.com.tw/ECP/jcaptcha.captcha')
	.wait(3000000)

	.end()
	.then(res => console.log(res))
	.catch(error => {
		console.error('Search failed:', error)
	})
