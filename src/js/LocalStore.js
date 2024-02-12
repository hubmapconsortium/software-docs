class LocalStore {
    static langKey = 'language'

    static setLanguage(lang) {
        localStorage[LocalStore.langKey] = lang
    }

    static getLanguage() {
        return localStorage[LocalStore.langKey] || 'en'
    }

}