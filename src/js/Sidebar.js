class Sidebar extends App {

    constructor(el, args) {
        super(el, args)
        this.$ = {
            wrap: this.el.find('.js-sidebar__wrap'),
            main: this.el.find('.js-sidebar__main'),
            list: this.el.find('.js-sidebar__list'),
            hs: $('.c-documentation').find('h1, h2, h3, h4, h5, h6')
        }
        this.sizeSideBar()
        this.pathBase = '/'
        this.classNames.root = 'is-root'
        this.headerHeight = 90
        this.events()
        this.determineContentBuilder()
        this.sizeSideBarHeight()
    }

    determineContentBuilder() {
        let hasBuiltSidebar = false
        const path = window.location.pathname
        this.pathBase = path
        const sidebars = this.msgs.sidebars || {}
        for (let sidebarKey in sidebars) {
            const hasSidebar = sidebars[sidebarKey].isCascading ? path.includes(sidebarKey) : path === sidebarKey
            if (hasSidebar) {
                this.pathBase = sidebarKey
                if (this.hasChildren(sidebars[sidebarKey])) {
                    const className = sidebars[sidebarKey].className
                    sidebars[sidebarKey].className = this.classNames.root + ` ${className || ''}`
                    this.renderList(sidebars[sidebarKey])
                    hasBuiltSidebar = true
                }
            }
        }

        if (!hasBuiltSidebar) {
            this.buildTableOfContents()
        }
    }

    events() {
        $(document).on('scroll', ((e) => {
            const st = $(document).scrollTop()
            if (st > this.headerHeight && !this.isMobile()) {
                this.el.addClass(this.classNames.active)
            } else {
                this.el.removeClass(this.classNames.active)
            }
        }).bind(this))

        $(window).on('resize', ((e)=>{
            this.sizeSideBar()
        }).bind(this))
    }

    sizeSideBar() {
        this.$.main.css('width', this.$.wrap.width())
        this.sizeSideBarHeight()
    }

    sizeSideBarHeight() {
        const max = 700
        let height = $(window).height() - this.headerHeight
        height = height > max ? max : height
        this.$.list.css('max-height', height)
    }

    buildTableOfContents() {

        let rootChildren = []
        let root = { tag: 'h0', c: rootChildren, p: {}, className: this.classNames.root }
        let stack = [root]

        const traverse = (node, el, idx) => {
            if (!stack.length) return

            let top = stack[stack.length - 1]
            let n1 = Number(node[1])
            let n2 = Number(top.tag[1])
            const label = $(el).text()
            let id = $(el).attr('id') || this.toId(label)
            let pack = {tag: node, id, label, c: [], idx }
            if (n1 > n2) {
                pack.p = top
                top.c.push(pack)
                stack.push(pack)
            }
            else if (n1 === n2) {
                pack.p = top.p
                top.p.c.push(pack)
                stack.push(pack)
            } else {
                while (n1 < n2) {
                    stack.pop()
                    top = stack[stack.length - 1]
                    n2 = Number(top.tag[1])
                }
                traverse(node, el, idx)
            }
        }

        this.$.hs.each((i, el)=> {
            const node = el.nodeName.toLowerCase()
            traverse(node, el, i)
        })

        App.log('The generated Table of Contents:', root)
        if (root.c.length) {
            this.renderList(root)
        }
    }

    getChildren(root) {
        return root.c || root.items
    }

    renderList(root) {
        let html = `<ul>`
        html = this.getList(root, html)
        html += `</ul>`
        this.$.list.html(html)

        // Remove root and replace. Root from recursion has no content.
        const $main = '<ul>' + this.$.list.find(`.${this.classNames.root} ul`).html() + '</ul>'
        this.$.list.html($main)

        // Hide if root has no children
        if (this.getChildren(root).length === 1 && !this.getChildren(this.getChildren(root)[0]).length) {
            this.$.main.addClass('hide')
        }
    }

    hasChildren(n) {
        return (n.c && n.c.length > 0) || (n.items && n.items.length > 0)
    }

    getList(root, html, level= 0) {

        let n = root
        const levelClass = `c-sidebar__level--${level}`
        let classes = `${levelClass} `
        classes += `${this.hasChildren(n) ? 'has-children' : ''} ${n.className || ''}`

        const name = n.label || n.name
        const hrefDefault = n.id ? `#${n.id}` : `${this.pathBase}${name}`
        html += `<li class="${classes}" title="${name}"><a href="${n.href ? n.href : hrefDefault}">${name}</a>`


        if (this.hasChildren(n)) {
            html += `<ul class='${levelClass} has-parent'>`
            for (let c of this.getChildren(n)) {
                html = this.getList(c, html, level + 1)
            }
            html += `</ul>`
        }
        html += '</li>'
        return html

    }
}

