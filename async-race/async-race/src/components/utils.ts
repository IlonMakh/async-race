import { IDrive } from '../types/index';
import { carBrand, carModel, CARS, GPAGE, RAFID, SERVER, WINNERS, WPAGE } from './constants';

export const randomColor = (): string => '#' + (Math.random().toString(16) + '000000').substring(2, 8);

export const randomName = (): string => {
    const brandIndex: number = Math.floor(Math.random() * carBrand.length);
    const modelIndex: number = Math.floor(Math.random() * carModel.length);
    return `${carBrand[brandIndex]} ${carModel[modelIndex]}`;
};

export const GTOTALCOUNT = async (): Promise<number> => {
    const response: Response = await fetch(`${SERVER}${CARS}?_page=${GPAGE.number}&_limit=${GPAGE.limit}`);
    return Number(response.headers.get('X-Total-Count'));
};

export const WTOTALCOUNT = async (): Promise<number> => {
    const response: Response = await fetch(`${SERVER}${WINNERS}?_page=${WPAGE.number}&_limit=${WPAGE.limit}`);
    return Number(response.headers.get('X-Total-Count'));
};

export const animateCar = (id: string, car: HTMLElement, driveParams: IDrive): void => {
    const elem: HTMLElement = car.querySelector('.move_icon') as HTMLElement;
    let currentX: number = (<HTMLElement>elem).offsetLeft;
    const endX: number = document.documentElement.clientWidth - 220;
    const duration: number = (<IDrive>driveParams).distance / (<IDrive>driveParams).velocity;
    const framesCount: number = (duration / 1000) * 60;
    const dX: number = (endX - (<HTMLElement>elem).offsetLeft) / framesCount;

    const move = (): void => {
        currentX += dX;
        elem.style.transform = `translateX(${currentX}px)`;
        if (currentX < endX) {
            RAFID[`${id}`] = requestAnimationFrame(move);
        }
    };
    move();
};
