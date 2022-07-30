export default class HeaderControllers {
    body;

    constructor() {
        this.body = document.body;
    }

    addListenerGarage() {
        const garage: HTMLElement = document.querySelector('.garage') as HTMLElement;
        const winners: HTMLElement = document.querySelector('.winners') as HTMLElement;
        const settings: HTMLElement = document.querySelector('.settings') as HTMLElement;
        this.body.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('header_garage')) {
                winners.classList.add('hide');
                garage.classList.remove('hide');
                settings.classList.remove('hide');
            }
        });
    }

    addListenerWinners() {
        const garage: HTMLElement = document.querySelector('.garage') as HTMLElement;
        const winners: HTMLElement = document.querySelector('.winners') as HTMLElement;
        const settings: HTMLElement = document.querySelector('.settings') as HTMLElement;
        this.body.addEventListener('click', (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (target.classList.contains('header_winners')) {
                winners.classList.remove('hide');
                garage.classList.add('hide');
                settings.classList.add('hide');
            }
        });
    }
}
