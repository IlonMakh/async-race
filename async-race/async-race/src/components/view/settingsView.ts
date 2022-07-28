import '../../css/settings.css';

export default class SettingsView {
    body: HTMLElement;

    constructor() {
        this.body = document.body;
    }

    drawSettings() {
        const settingsHTML = `
            <div class='settings'>
                <div class='settings_create'>
                    <input type='text' placeholder='Type name of model...' class='create_input'>
                    <input type='color' value='#59ee45' class='create_color'>
                    <button class='create_btn'>Create</button>
                </div>
                <div class='settings_update'>
                    <input type='text' placeholder='Type name of model...' class='update_input'>
                    <input type='color' value='#59ee45' class='update_color'>
                    <button class='update_btn'>Update</button>
                </div>
                <div class='settings_activity'>
                    <button class='activity_race'>Race</button>
                    <button class='activity_reset'>Reset</button>
                    <button class='activity_generate'>Generate cars</button>
                </div>
            </div>
        `;
        this.body.insertAdjacentHTML('beforeend', settingsHTML);
    }
}
