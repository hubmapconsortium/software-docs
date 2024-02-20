class Footer extends App {
    constructor(el, args) {
        super(el, args)
        this.addYear()
    }

    addYear() {
        this.el.find('.js-footer__date').html(new Date().getFullYear())
    }
}