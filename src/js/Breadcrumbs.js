class Breadcrumbs extends App {

    constructor(el, args) {
        super(el, args)
        this.$ = {
            list: this.el.find('.js-breadcrumbs__main')
        }
        this.build()
    }

    build() {
        let list = ''
        const path = window.location.pathname

        if (this.msgs.breadcrumbRoot) {
            list += `<li><a href="/">${this.msgs.breadcrumbRoot}</a></li>`
        }

        if (path === '/') {
            return
        }
        let parts = path.split('/')
        let href
        let name
        for (let i = 0; i < parts.length; i++) {
            name = parts[i]
            if (name.length) {
                href = parts.slice(0, i + 1).join('/')
                list += `<li class="${i === parts.length - 1 ? this.classNames.active : ''}"><a href="${href}">${this.toUpperCaseFirst(name)}</a></li>`
            }
        }
        this.$.list.html(`<ul>${list}</ul>`)
    }

}

