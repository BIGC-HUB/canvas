Sea('#toc .btn').hide()
window.md = new Remarkable({
    linkTarget: '_blank',
    linkify: false,
    html: true,
    breaks: true,
    xhtmlOut: true,
    typographer: true,
    highlight: function(str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value
            } catch (__) {}
        }
        try {
            return hljs.highlightAuto(str).value
        } catch (__) {}
        return ''
    }
})
md.isPC = navigator.userAgent.match(/(iPhone|iPad|iPod|Android|SymbianOS|Windows Phone)/i) ? false : true
md.core.ruler.enable([
  'abbr',
]);
md.block.ruler.enable([
  'footnote',
  'deflist',
]);
md.inline.ruler.enable([
  'footnote_inline',
  'ins',
  'mark',
  'sub',
  'sup',
]);

md.md = Sea('#md').dom
md.view = Sea('#edit view').dom
md.edit = Sea('#txt').dom
md.tocON = false
md.editON = false
md.highON = false

md.parseTitle = function() {
    let arr = md.arr
    let toc = []
    for(let i = 0; i < arr.length; i++) {
        let e = arr[i]
        // 取 title 去 * # () []
        let t = e.match(/((#+?) [\s\S]+?)\n/)
        if (t) {
            let title = t[1].replace(/<[\s\S]+>|\([\s\S]+\)|[\[\]*#]/g, '').slice(1)
            toc.push({
                msg: title,
                id: i,
                level: t[2].length,
            })
        }
    }
    return toc
}
md.initTOC = function() {
    let toc = md.parseTitle()
    let last = { level: 1 }
    let ul = 0
    let TOChtml = '<li><a href="#title">' + md.title + '</a></li>'
    for(let e of toc) {
        let l = e.level
        if (l === 1) {
            for (let i = 0; i < ul; i++) {
                TOChtml += '</ul>'
            }
            ul = 0
            TOChtml += `<li><a href="#${e.id}">${e.msg}</a></li>`
        } else if (l > last.level) {
            for (let i = 0; i < l - last.level; i++) {
                TOChtml += '<ul>'
                ul++
            }
            TOChtml += `<li><a href="#${e.id}">${e.msg}</a></li>`
        } else if (l < last.level) {
            for (let i = 0; i < last.level - l; i++) {
                TOChtml += '</ul>'
            }
            TOChtml += `<li><a href="#${e.id}">${e.msg}</a></li>`
        } else {
            TOChtml += `<li><a href="#${e.id}">${e.msg}</a></li>`
        }
        last = e
    }
    Sea('#toc .list').html(TOChtml)
}
md.initHtml = function() {
    let html = '<a name="title"></a><h1 id="title">' + md.title +'</h1>'
    let toc = md.parseTitle()
    for(let i = 0; i < md.arr.length; i++) {
        let e = md.arr[i]
        html += `<a name=${i}></a><one data-id=${i}>${md.render(e)}</one>`
    }
    Sea('#md').html(html)
}
md.btnAdd = function(s) {
    // 更新
    let val = ''
    if (md.highON) {
        val = md.ace.getValue()
    } else {
        val = md.edit.value
    }
    if (val) {
        md.arr[md.id] = val + '\n'
    } else {
        md.arr.splice(md.id, 1)
    }
    // 添加
    let [a, b, n] = [md.arr[md.id], '\n# *new Title 新标题*\n\n点击编辑', 1]
    if (s === 'top') {
        [b, a, n] = [md.arr[md.id], '\n# *new Title 新标题*\n\n点击编辑', 0]
    }
    md.arr.splice(md.id, 1, a, b)
    // 渲染
    md.initTOC()
    md.initHtml()
    // 隐藏
    if (md.tocON) {
        Sea('#set').click()
    }
    Sea('#edit').fadeOut(0.2)
    md.md.style.overflow = ''
    // 锚点
    location.replace('#' + String(md.id + n))
}
Sea('#set').on('click', function() {
    if (md.tocON) {
        md.tocON = false
        Sea('#toc').fadeOut()
    } else {
        md.tocON = true
        Sea('#toc').fadeIn('block')
    }
})
Sea('#toc .btn-edit').on('click', function() {
    let e = Sea(this).find('i')
    let high = Sea('#toc .btn-high')
    let save = Sea('#toc .btn-save')
    let css = Sea('.css-edit')
    if (md.editON) {
        md.editON = false
        e.removeClass('fa-toggle-on')
        e.addClass('fa-toggle-off')
        css.html('')
        // 更新
        if (md.isPC) {
            high.fadeOut()
        }
        save.fadeOut()
    } else {
        md.editON = true
        e.removeClass('fa-toggle-off')
        e.addClass('fa-toggle-on')

        let a = Sea.css('one', {
            'display': 'block',
            'cursor': 'zoom-in',
        })
        let b = Sea.css('one:hover', {
            'background': 'rgba(170, 170, 170, 0.22)',
            'border-radius': '.25rem',
        })
        css.html(a + b)
        // 更新
        if (md.isPC) {
            high.fadeIn()
        }
        save.fadeIn()
    }
})
Sea('#toc .btn-save').on('click', function () {
    // Save
    Sea.confirm('确认保存 当前修改', function (ok) {
        if (ok) {
            Sea('#toc .btn-edit').click()
            Sea.localStorage('txt', md.arr)
        }
    })
})
Sea('#toc .btn-high').on('click', function() {
    let e = Sea(this).find('i')
    if (md.highON) {
        md.highON = false
        md.view.style.overflowY = ''
        e.removeClass('fa-toggle-on')
        e.addClass('fa-toggle-off')
    } else {
        md.highON = true
        md.view.style.overflowY = 'auto'
        e.removeClass('fa-toggle-off')
        e.addClass('fa-toggle-on')
    }
})
// 向上添加
Sea('#edit .btn-add-top').on('click', function() {
    md.btnAdd('top')
})
// 向下添加
Sea('#edit .btn-add-bottom').on('click', function() {
    md.btnAdd()
})
// 编辑
Sea('#md').on('mousedown', function(e) {
    if (md.tocON) {
        Sea('#set').click()
    }
})
Sea('#md').on('mousedown', 'one', function(e) {
    if (md.editON) {
        // 删除首尾空格
        md.id = Number(this.dataset.id)
        let val = md.arr[md.id].trim() + '\n'
        //
        if (md.highON) {
            Sea('#txt').hide()
            Sea('#ace').show()
            md.ace.setValue(val)
            md.ace.gotoLine(1)
        } else {
            Sea('#txt').show()
            Sea('#ace').hide()
            md.edit.value = val
            // 回到顶部
            md.edit.scrollTop = 0
        }
        md.view.innerHTML = md.render(val)
        // 编辑
        Sea('#md').css('overflow', 'hidden')
        Sea('#edit').fadeIn(0.2)
    }
})
Sea('#edit').on('mousedown', function(e) {
    if (e.target.id === 'edit') {
        // 更新
        let val = ''
        if (md.highON) {
            val = md.ace.getValue()
        } else {
            val = md.edit.value
        }
        if (val) {
            md.arr[md.id] = val + '\n'
        } else {
            md.arr.splice(md.id, 1)
        }
        // 渲染
        md.initTOC()
        md.initHtml()
        // 隐藏
        if (md.tocON) {
            Sea('#set').click()
        }
        Sea('#md').css('overflow', 'auto')
        Sea('#edit').fadeOut(0.2)
    }
})

Sea('#txt').on('scroll', function(){
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
Sea('#txt').on('input', function(){
    md.view.innerHTML = md.render(this.value)
})

md.title = '🐸青蛙老师的离线记事本'
md.arr = Sea.localStorage('txt')
if (md.arr && md.arr.length > 1) {
} else {
    md.arr = ['# Forg\n点击右上角 <i class="fa fa-list-ul"></i> 开启编辑']
}
Sea('#toc .btn-edit').show('inline-block')
md.initTOC()
md.initHtml()
// 锚点
let hash = window.location.hash
if (hash) {
    location.replace(hash)
}



// 关闭提示
window.onbeforeunload = function(e) {
    if (md.editON) {
        if (md.tocON === false) {
            Sea('#set').click()
        }
        e.returnValue = "提示：未发布"
    }
}

// 自动备份
setInterval(function() {
    Sea.localStorage('txt', md.arr)
}, 6000)