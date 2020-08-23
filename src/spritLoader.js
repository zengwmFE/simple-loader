const Spritesmith = require('spritesmith')
const fs = require('fs')
const path = require('path')
module.exports = function(source){
    // 合成图片是一个异步的过程，所以需要使用this.async()
    const callback = this.async()
    const imgs = source.match(/url\((\S*)\?__sprite/g)
    const matchImgs = []
    for(let i=0;i<imgs.length;i++){
        const img = imgs[i].match(/url\((\S*)\?__sprite/)[1]
        console.log(img)
        matchImgs.push(path.join(__dirname,img))
    }
    Spritesmith.run({
        src: matchImgs
    },(err,result)=>{
        console.log(result)
        fs.writeFileSync(path.join(process.cwd(),'dist/sprite.jpg' ),result.image)
        source = source.replace(/url\((\S*)\?__sprite/g,(match)=>{
            return `url("dist/sprite.jpg"`
        })
        callback(null,source)
    })
}