import '../../css/garage.css';
import { app } from '../../index';
import { ICar } from '../../types/index';
import { GETCARS } from '../constants';

export default class GarageView {
    body: HTMLElement;

    constructor() {
        this.body = document.body;
    }

    drawGarage() {
        const garageHTML = `
        <div class='garage'>
            <h3 class='garage_title'>Garage</h3>
            <div class='garage_page'>Page</div>
            <div class='garage_cars'></div>
        </div>
        `;
        this.body.insertAdjacentHTML('beforeend', garageHTML);
        window.addEventListener('DOMContentLoaded', GETCARS);
        app.garage.drawPagination();
    }

    drawCars(car: ICar) {
        const cars = this.body.querySelector('.garage_cars');
        const carHTML = `
        <div class='car' id='${car.id}'>
                <div class='car_selection'>
                    <button class='selection_select'>select</button>
                    <button class='selection_remove'>remove</button>
                    <div class='selection_name'>${car.name}</div>
                </div>
                <div class='car_move'>
                    <button class='move_start'>A</button>
                    <button class='move_stop'>B</button>
                    <div class='move_icon'><svg width='80px' height='40px' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 35.03" style="enable-background:new 0 0 122.88 35.03" xml:space="preserve"><g><path style ='fill: ${car.color}; tranform: rotate(180deg)' class="st0" d="M99.42,13.57c5.93,0,10.73,4.8,10.73,10.73c0,5.93-4.8,10.73-10.73,10.73s-10.73-4.8-10.73-10.73 C88.69,18.37,93.49,13.57,99.42,13.57L99.42,13.57z M79.05,5c-0.59,1.27-1.06,2.69-1.42,4.23c-0.82,2.57,0.39,3.11,3.19,2.06 c2.06-1.23,4.12-2.47,6.18-3.7c1.05-0.74,1.55-1.47,1.38-2.19c-0.34-1.42-3.08-2.16-5.33-2.6C80.19,2.23,80.39,2.11,79.05,5 L79.05,5z M23.86,19.31c2.75,0,4.99,2.23,4.99,4.99c0,2.75-2.23,4.99-4.99,4.99c-2.75,0-4.99-2.23-4.99-4.99 C18.87,21.54,21.1,19.31,23.86,19.31L23.86,19.31z M99.42,19.31c2.75,0,4.99,2.23,4.99,4.99c0,2.75-2.23,4.99-4.99,4.99 c-2.75,0-4.99-2.23-4.99-4.99C94.43,21.54,96.66,19.31,99.42,19.31L99.42,19.31z M46.14,12.5c2.77-2.97,5.97-4.9,9.67-6.76 c8.1-4.08,13.06-3.58,21.66-3.58l-2.89,7.5c-1.21,1.6-2.58,2.73-4.66,2.84H46.14L46.14,12.5z M23.86,13.57 c5.93,0,10.73,4.8,10.73,10.73c0,5.93-4.8,10.73-10.73,10.73s-10.73-4.8-10.73-10.73C13.13,18.37,17.93,13.57,23.86,13.57 L23.86,13.57z M40.82,10.3c3.52-2.19,7.35-4.15,11.59-5.82c12.91-5.09,22.78-6,36.32-1.9c4.08,1.55,8.16,3.1,12.24,4.06 c4.03,0.96,21.48,1.88,21.91,4.81l-4.31,5.15c1.57,1.36,2.85,3.03,3.32,5.64c-0.13,1.61-0.57,2.96-1.33,4.04 c-1.29,1.85-5.07,3.76-7.11,2.67c-0.65-0.35-1.02-1.05-1.01-2.24c0.06-23.9-28.79-21.18-26.62,2.82H35.48 C44.8,5.49,5.04,5.4,12.1,28.7C9.62,31.38,3.77,27.34,0,18.75c1.03-1.02,2.16-1.99,3.42-2.89c-0.06-0.05,0.06,0.19-0.15-0.17 c-0.21-0.36,0.51-1.87,1.99-2.74C13.02,8.4,31.73,8.52,40.82,10.3L40.82,10.3z"/></g></svg></div>
                    <div class='move_finish'><img src='../../assets/images/finish_ico.png'></div>
                    </div>
                <div class='car_road'></div>
        </div>`;
        (cars as HTMLElement).insertAdjacentHTML('afterbegin', carHTML);
    }

    drawPagination() {
        const garage = this.body.querySelector('.garage');
        const paginationHTML = `
        <div class='garage_pagination'>
            <button class='pagination_prev'>prev</button>
            <button class='pagination_next'>next</button>
        </div>`;
        (garage as HTMLElement).insertAdjacentHTML('beforeend', paginationHTML);
    }
}
