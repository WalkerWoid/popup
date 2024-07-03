//region Попапы
const popups = [...document.querySelectorAll('.popup')];
const setButtons = new Set();
const popupArr = [];
const popUpButtons = [...document.querySelectorAll('.popup-btn')];
popUpButtons.forEach(button => {
    setButtons.add(button);
})

class Popup {
    button;
    #popup;
    #steps;
    #nextSteps = [];
    #prevSteps = [];
    #popupClose = [];
    #currentStep = 1;
    #popups = popups;

    constructor(dataPopup) {
        this.button = dataPopup;

        this.#init();
    }

    #init() {
        this.#popupInit();

        if (this.button) this.#eventHandler();
    }
    #eventHandler() {
        document.querySelectorAll(`[data-popup="${this.button}"]`).forEach(button => {
            button.addEventListener('click', event => {
                if (this.#currentStep === 0) {
                    this.#nextStepHandler();
                }

                this.#toggleStep();
                this.#popupOpenHandler();
            })
        })

        this.#popupClose.forEach(item => {
            item.addEventListener('click', () => {
                this.#currentStep = 1;
                this.#prevStepHandler();
                this.#toggleStep();
                this.#popupCloseHandler();
                if (!item.classList.contains('popup-btn')) {
                    document.body.classList.remove('body_hidden');
                }
            })
        })

        this.#nextSteps.forEach(item => {
            item.addEventListener('click', () => this.#nextStepHandler());
        })
        this.#prevSteps.forEach(item => {
            item.addEventListener('click', () => this.#prevStepHandler());
        })
    }
    #popupInit() {
        this.#popups.forEach(popup => {
            if (popup.getAttribute('id') === this.button)
                this.#popup = popup;
        })

        if (this.#popup) {
            // this.#steps = [...this.#popup.querySelectorAll('.step')];
            this.#steps = [...document.querySelectorAll(`#${this.#popup.getAttribute('id')} > .step`)];
            this.#nextSteps = [...document.querySelectorAll(`#${this.#popup.getAttribute('id')} > .step .nextStep`)];
            this.#prevSteps = [...document.querySelectorAll(`#${this.#popup.getAttribute('id')} > .step .prevStep`)];
            this.#popupClose = [this.#popup.querySelector('.popup__shadow'), ...document.querySelectorAll(`#${this.#popup.getAttribute('id')} > .step .popup__close`)];
        }
    }

    #popupOpenHandler() {
        console.log(this.#popup)
        if (this.#popup.classList.contains('popup_hidden')) this.#popup.classList.remove('popup_hidden');

        document.body.classList.add('body_hidden');
    }
    #popupCloseHandler() {
        if (!this.#popup.classList.contains('popup_hidden')) this.#popup.classList.add('popup_hidden');

        if (this.#popup.dataset.toggle === 'no') {
            // return;
        }
        // document.body.classList.remove('body_hidden');
    }
    #nextStepHandler() {
        this.#currentStep += 1;
        this.#toggleStep();
    }
    #prevStepHandler() {
        this.#currentStep -= 1;
        this.#toggleStep();
    }
    #toggleStep() {
        if (this.#steps) {
            this.#steps.forEach(step => {
                step.classList.add('step_hidden');

                if (+step.dataset.step === this.#currentStep) step.classList.toggle('step_hidden');
            })
        }
    }
    popupClosePublic() {
        this.#currentStep = 1;
        this.#prevStepHandler();
        this.#toggleStep();
        this.#popupCloseHandler();
    }
}

setButtons.forEach(button => {
    popupArr.push(new Popup(button.dataset.popup));
})
//endregion