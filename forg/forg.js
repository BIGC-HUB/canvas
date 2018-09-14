const domForg = function() {
    let dot1 = Sea(".forg .eye1 .dot1")
    let css1 = {
        top: Number(dot1.css('top').slice(0, -2)),
        left: Number(dot1.css('left').slice(0, -2)),
    }
    let dot2 = Sea(".forg .eye2 .dot2")
    let css2 = {
        top: Number(dot2.css('top').slice(0, -2)),
        left: Number(dot2.css('left').slice(0, -2)),
    }
    const initOffset = function (eye, css, radius) {
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
        let eye1 = Sea(".forg .eye1").offset()
        Sea(".forg .eye1 .dot1").offset(initOffset(eye1, css1, 20))
        // 眼睛 2
        let eye2 = Sea(".forg .eye2").offset()
        Sea(".forg .eye2 .dot2").offset(initOffset(eye2, css2, 20))
    })
}
const main = function(params) {
    domForg()
    // html2canvas(Sea('.strawberry.eye1').dom).then(function (canvas) {
    //     document.body.appendChild(canvas)
    // })
}
main()