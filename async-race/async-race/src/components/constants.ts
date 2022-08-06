import { IDrive, rafid } from '../types/index';

export const SERVER = 'http://127.0.0.1:3000';
export const CARS = '/garage';
export const WINNERS = '/winners';
export const ENGINE = '/engine';
export const GPAGE = { number: 1, limit: 7 };
export const GTOTALCOUNT = async () => {
    const response = await fetch(`${SERVER}${CARS}?_page=${GPAGE.number}&_limit=${GPAGE.limit}`);
    return Number(response.headers.get('X-Total-Count'));
};
export const WPAGE = { number: 1, limit: 10 };
export const WTOTALCOUNT = async () => {
    const response = await fetch(`${SERVER}${WINNERS}?_page=${WPAGE.number}&_limit=${WPAGE.limit}`);
    return Number(response.headers.get('X-Total-Count'));
};
const carBrand = [
    'Acura',
    'Alfa Romeo',
    'Alpine',
    'Apollo',
    'Apple',
    'Aston Martin',
    'Audi',
    'Automobili Pininfarina',
    'Bentley',
    'BMW',
    'Bollinger',
    'Brilliance',
    'Bugatti',
    'Buick',
    'BYD',
    'Cadillac',
    'Chana',
    'Chery',
    'Chevrolet',
    'Chrysler',
    'Citroen',
    'Continental',
    'CUPRA',
    'Dacia',
    'Daewoo',
    'Daihatsu',
    'Datsun',
    'Detroit Electric',
    'Dodge',
    'DS Automobiles',
    'FAW',
    'Ferrari',
    'Fiat',
    'Fisker',
    'Ford',
    'Foxtron',
    'Geely',
    'Genesis',
    'GMC',
    'Great Wall',
    'Haval',
    'Honda',
    'Hummer',
    'Hyundai',
    'Ineos',
    'Infiniti',
    'Iran Khodro',
    'JAC',
    'Jaguar',
    'Jeep',
    'JETOUR',
    'KIA',
    'Koenigsegg',
    'Lada',
    'Lamborghini',
    'Lancia',
    'Land Rover',
    'Lexus',
    'Lifan',
    'Lincoln',
    'Lordstown',
    'Lotus',
    'Lucid',
    'LvChi',
    'Lynk & Co',
    'Maserati',
    'Maybach',
    'Mazda',
    'MCLaren',
    'Mercedes-Benz',
    'MG',
    'MINI',
    'Mitsubishi',
    'Nikola',
    'NIO',
    'Nissan',
    'Opel',
    'Pagani',
    'Peugeot',
    'Polestar',
    'Porsche',
    'Qoros',
    'Range Rover',
    'Ravon',
    'Renault',
    'Rimac',
    'Rivian',
    'Rolls-Royce',
    'Saab',
    'Saipa',
    'SEAT',
    'Skoda',
    'smart',
    'SsangYong',
    'SSC North America',
    'Stellantis',
    'Subaru',
    'Suzuki',
    'Tata',
    'Tesla',
    'Torsus',
    'Toyota',
    'VinFast',
    'Volkswagen',
    'Volvo',
    'Xpeng',
    'Zotye'
];
const carModel = [
    'Durango',
    'Ram',
    'Challenger',
    'Charger',
    'Grand Caravan',
    'X7',
    'X5',
    'X3',
    'X6 M',
    'X6',
    'X1',
    'X4',
    'C3 Aircross',
    'C5 Aircross',
    'Duster',
    'CR-V',
    'Corolla',
    'C4 Cactus',
    'DS3 Crossback',
    'C1',
    'C3',
    'Berlingo Multispace',
    'DS4 Crossback',
    'UX 250h',
    'NX 300h',
    'LC 500',
    'RX 350/200t',
    'Rapid',
    'Largus',
    'IS 200t',
    'LS 500h',
    'RX',
    'ES 200/250/350',
    'Hatchback',
    'CX-5',
    'Sedan',
    'CX-30',
    'CX-9',
    'CX-3',
    'MX-5 Roadster',
    'Phantom',
    'Camry',
    'Polo',
    'Cullinan',
    'Ghost',
    'Dawn',
    'Duster',
    'Arkana',
    'Sandero',
    'Logan',
    'Trafic Fourgon',
    'Logan MCV',
    'Captur',
    'Kadjar',
    'RAV4',
    'Rio',
    'Creta',
    'Solaris'
];

export const randomColor = () => '#' + (Math.random().toString(16) + '000000').substring(2, 8);
export const randomName = () => {
    const brandIndex = Math.floor(Math.random() * (carBrand.length + 1));
    const modelIndex = Math.floor(Math.random() * (carModel.length + 1));
    return `${carBrand[brandIndex]} ${carModel[modelIndex]}`;
};

export const RAFID: rafid = {};

export const animateCar = (id: string, car: HTMLElement, driveParams: IDrive) => {
    const elem = car.querySelector('.move_icon') as HTMLElement;
    let currentX = (<HTMLElement>elem).offsetLeft;
    const endX = window.screen.width - 230;
    const duration = (<IDrive>driveParams).distance / (<IDrive>driveParams).velocity;
    const framesCount = (duration / 1000) * 60;
    const dX = (endX - (<HTMLElement>elem).offsetLeft) / framesCount;

        const move = () => {
            currentX += dX;
            elem.style.transform = `translateX(${currentX}px)`;
            if (currentX < endX) {
                RAFID[`${id}`] = requestAnimationFrame(move);
            }
        };
        move();
};

export default {
    SERVER,
    CARS,
    WINNERS
};
