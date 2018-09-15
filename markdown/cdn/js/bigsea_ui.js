Sea.innerHTML = `
    <sea class='confirm'>
        <div class="cont">
            <text class="msg"></text>
            <div class="btns">
                <btn class="ok">确定</btn>
                <btn class="no">取消</btn>
            </div>
        </div>
    </sea>`.html()
Sea('body').append(Sea.innerHTML)
//
Sea.UIEvent.confirm = function() {
    let confirm = Sea('sea.confirm')
    let callback = function(bool) {
        confirm.hide()
        let f = Sea.confirm.callback
        if (f && typeof f == 'function') {
            f(bool)
            Sea.confirm.callback = undefined
        } else {
            // log("not callback")
        }
    }
    confirm.find('.ok').on('mousedown', function() {
        callback(true)
    })
    confirm.find('.no').on('mousedown', function() {
        callback(false)
    })
}
//
Sea.confirm = function(msg, callback) {
    let e = Sea('sea.confirm')
    e.show()
    e.find('btn').removeAttr('style')
    e.find('.msg').dom.innerText = msg
    Sea.confirm.callback = callback
}
//
Sea.alert = function(msg, callback) {
    let e = Sea('sea.confirm')
    e.show()
    e.find('.no').hide()
    e.find('.msg').dom.innerText = msg
    Sea.confirm.callback = callback
}

// 执行
Object.keys(Sea.UIEvent).forEach(key => {
    Sea.UIEvent[key]()
})
