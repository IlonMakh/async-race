import { app } from '../../index';
import { IWinner } from '../../types/index';
import { WPAGE, WTOTALCOUNT } from '../constants';
import WinnerModel from '../model/winnerModel';

export default class WinnersControllers {
    body;

    drawWinnersPage;

    winnerModel: WinnerModel;

    constructor() {
        this.body = document.body;
        this.winnerModel = new WinnerModel();
        this.drawWinnersPage = async () => {
            const winnersTable: HTMLElement = document.querySelector('.winners_content') as HTMLElement;
            const winnersPage: HTMLElement = document.querySelector('.winners_page') as HTMLInputElement;
            const winners = await this.winnerModel.getWinners();
            winnersTable.innerHTML = '';
            winnersPage.innerHTML = `Page #${WPAGE.number}`;
            winners.map(async (winner: IWinner) => {
                const winnerInfo = await this.winnerModel.getFullWinnerInfo(winner);
                app.winners.drawWinner(winnerInfo);
            });
        };
        }
/*
    listenSorting() {
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const count = await WTOTALCOUNT();
            const target = event.target as HTMLElement;
            if (target.classList.contains('wins_header')) {
                if (WPAGE.number > 1) {

                }
            }
            if (target.classList.contains('time_header')) {
                if (WPAGE.number <= Math.ceil(count / WPAGE.limit)) {

                }
            }
        });
    }
*/

    listenPagination() {
        this.body.addEventListener('click', async (event: MouseEvent) => {
            const count = await WTOTALCOUNT();
            const target = event.target as HTMLElement;
            if (target.classList.contains('winners_prev')) {
                if (WPAGE.number > 1) {
                    WPAGE.number -= 1;
                    this.drawWinnersPage();
                }
            }
            if (target.classList.contains('winners_next')) {
                if (WPAGE.number <= Math.ceil(count / WPAGE.limit)) {
                    WPAGE.number += 1;
                    this.drawWinnersPage();
                }
            }
        });
    }
}
