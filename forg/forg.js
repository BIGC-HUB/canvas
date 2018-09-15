const bindCute = function() {
    let cute = Sea('#cute')
    let dot1 = cute.find(".dot1")
    let css1 = {
        top: Number(dot1.css('top').slice(0, -2)),
        left: Number(dot1.css('left').slice(0, -2)),
    }
    let dot2 = cute.find(".dot2")
    let css2 = {
        top: Number(dot2.css('top').slice(0, -2)),
        left: Number(dot2.css('left').slice(0, -2)),
    }
    
    const initOffset = function (eye, css, radius) {
        // postion relative
        eye.left = eye.left + cute.dom.offsetLeft
        eye.top = eye.top + cute.dom.offsetTop
        let x = eye.left + css.left
        let y = eye.top + css.top
        let n = event.clientX - x
        let m = -(event.clientY - y)
        let k = Math.atan2(m, n)
        let o = {
            left: (Math.cos(k) * radius + css.left).toFixed(0),
            top: ((- Math.sin(k) * radius) + css.top).toFixed(0),
        }
        return o
    }
    Sea(window).on('mousemove', function (event) {
        // 眼睛 1
        let eye1 = cute.find(".left").offset()
        cute.find(".dot1").offset(initOffset(eye1, css1, 4))
        // 眼睛 2
        let eye2 = cute.find(".right").offset()
        cute.find(".dot2").offset(initOffset(eye2, css2, 4))
    })
}
const bindHeart = function() {
    Sea('#heart').on('mouseover', function () {
        Sea(this).find('.left, .right').addClass('animate-hearts')
    })
    Sea('#heart').on('mouseout', function () {
        Sea(this).find('.left, .right').removeClass('animate-hearts')
    })
}
const bindSmile = function() {
    Sea('#smile').on('mouseover', function () {
        Sea(this).find('img').addClass('animate-spin')
    })
    Sea('#smile').on('mouseout', function () {
        Sea(this).find('img').removeClass('animate-spin')
    })
}
const bindSweat = function() {
    Sea('#sweat').on('mouseover', function () {
        Sea(this).find('.sweat').addClass('animate-sweat')
    })
    Sea('#sweat').on('mouseout', function () {
        Sea(this).find('.sweat').removeClass('animate-sweat')
    })
}
const bindNose = function() {
    Sea('#nose').on('mouseover', function () {
        Sea(this).find('.nose').addClass('animate-nose')
    })
    Sea('#nose').on('mouseout', function () {
        Sea(this).find('.nose').removeClass('animate-nose')
    })
}
const bindMua = function() {
    Sea('#mua').on('mouseover', function () {
        Sea(this).find('.mua').addClass('animate-mua')
    })
    Sea('#mua').on('mouseout', function () {
        Sea(this).find('.mua').removeClass('animate-mua')
    })
}
const bindWho = function() {
    let arr = Sea('#who img').arr
    let index = Sea.localStorage('who') || parseInt(Math.random() * (arr.length - 0) + 0)
    Sea(arr[index]).css('visibility', 'visible')
    Sea('#who').on('mouseover', function () {
        Sea(arr[index]).css('visibility', '')
        while (true) {
            let i = parseInt(Math.random() * (arr.length - 0) + 0)
            if (i !== index) {
                index = i
                Sea.localStorage('who', i)
                break
            }
        }
        Sea(arr[index]).css('visibility', 'visible')
    })
    // Sea('#who').on('mouseout', function () {
    //     log(2)
    // })
}
const main = function(params) {
    bindCute()
    bindHeart()
    bindSmile()
    bindSweat()
    bindNose()
    bindMua()
    bindWho()
    // html2canvas(Sea('.strawberry.eye1').dom).then(function (canvas) {
    //     document.body.appendChild(canvas)
    // })

}
main()