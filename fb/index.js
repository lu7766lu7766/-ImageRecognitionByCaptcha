var Liver = require('./Liver')
var sleep = require('sleep')
var moment = require('moment')
var identitys = require('./identity')
var _ = require('lodash')
var livers = []
var watcher = 1
var allLoginMins = 10
var loginHours = 4
var ranger = []
var startMoment = moment()
var targetUrl = 'https://www.facebook.com/嘿嘿鳳梨-2105940479692182'
console.log(startMoment.format('YYYY-MM-DD hh:mm:ss'))
// console.log(identitys)
// for(let i = 0, len = ranger.length; i < len; i++) {
//     let tmp = ranger[i], 
//         rand = _.random(0, watcher-1)
//     // console.log(rand)
//     ranger[i] = ranger[rand]
//     ranger[rand] = tmp
// }
// console.log(ranger)
while(ranger.length < watcher){
    let tmp = _.random(0, identitys.length-1)
    if (_.indexOf(ranger, tmp) == -1) {
        ranger.push(tmp)
    }
}
// console.log(ranger)

;(async () => {
    while(livers.length < watcher) {
        let identity = identitys[ranger[livers.length]]
        let liver = new Liver(identity.id, identity.pwd)
        await liver.connect()
        // console.log(identity)
        livers.push(liver)
    }

    _.forEach(livers, live => live.gotoFanPage(targetUrl))
    // console.log(livers)
    console.log('all login')
    console.log(moment().diff(startMoment, 's'))
    sleep.sleep(30)
    while(livers.length > 0) {
        let liver = livers.shift()
        console.log(await  liver.getName())
        await liver.close()
    }
    // console.log('---------------')
    // console.log(livers)
})()


// liver = new Liver('lu7766lu7766@gmail.com', 'cord068wert720')
// liver2 = new Liver('lu7766lu7766@gmail.com', 'cord068wert720', 10000)
