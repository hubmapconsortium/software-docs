/**
 * JS functionality which enhance site functionality, not necessarily part of the core.
 * @param {string} source
 * @param {object} args
 * @returns
 */

function ZIndex(source, args = null) {
    App.log('Apps started ...')

    if (window.apps[source] !== undefined) {
        return
    }
    window.apps[source] = args

    App.applyTheme()

    let apps = {
        sidebar: Sidebar,
        breadcrumbs: Breadcrumbs,
        footer: Footer,
        fileMeta: FileMeta,
        header: Header
    }

    args = args || window.apps.init
    try {
        for (let app in apps) {
            document
                .querySelectorAll(`[class*='js-app--${app}'], [data-js-${app}]`)
                .forEach((el) => {
                    new apps[app](el, { app, ...args })
                })
        }
    } catch (e) {
        console.error(e)
    }
}

window.addEventListener('load', (event) => {
    App.log('HuBMAP Docs ...', null, { color: 'green' })
    window.apps = window.apps || {}
    App.loadLanguageFile().then(
        ((m) => {
            App.loadThemeConfig().then(() => {
                ZIndex('init')
            })
        }).bind(this)
    )
})
