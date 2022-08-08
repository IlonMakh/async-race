import '../../css/header.css';

export default class HeaderView {
    body: HTMLElement;

    constructor() {
        this.body = document.body;
    }

    drawHeader(): void {
        const headerHTML = `
            <header>
                <button class='header_garage'>to garage</button>
                <button class='header_winners'>to winners</button>
            </header>
        `;
        this.body.insertAdjacentHTML('afterbegin', headerHTML);
    }
}
