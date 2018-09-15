// 引入代码补全和提示模块
ace.require("ace/ext/language_tools")
// 创建编辑器
md.ace = ace.edit("ace")
md.ace.$blockScrolling = Infinity
md.ace.setOptions({
    // 是否自动补全 联想提示
    enableSnippets: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    // 折叠
    showFoldWidgets: true,
    // 模式
    mode: "ace/mode/markdown",
    autoScrollEditorIntoView: true
})
md.ace.setTheme("ace/theme/tomorrow_night")
// 自动换行
md.ace.session.setUseWrapMode(true)
// 未知
md.ace.renderer.setPrintMarginColumn(false)
md.ace.session.setNewLineMode("unix")
// 获得焦点
// md.ace.renderer.textarea.focus()

// 事件
md.ace.session.on('change', function() {
    let val = md.ace.getValue()
    md.view.innerHTML = md.render(val)
})
Sea('.ace_scrollbar').on('scroll', function( ){
    let top = this.scrollTop
    // 不变
    let left = this.scrollHeight
    let right = md.view.scrollHeight
    let radio = left / right
    // 取最大值
    if (radio < 1) {
        radio = right / left
    }
    let scroll = Math.floor(radio * top)
    // 判断底部
    if (left - this.clientHeight - top < 1) {
        scroll = right
    }
    md.view.scrollTop = scroll
})
