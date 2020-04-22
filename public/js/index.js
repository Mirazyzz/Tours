/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { updateData } from './updateSettings';
import { addUser, updateTour, deleteTour, addTour } from './admin';

const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userData = document.querySelector('.form-user-data');
const userPassword = document.querySelector('.form-user-password');
const newUserData = document.querySelector('.form-new-user-data');
const updateTourForm = document.querySelector('.form-tour-data');
const deleteTourBtn = document.querySelector('.btn--red');
const addNewTourForm = document.querySelector('.form-addtour-data ');

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    })
};

if (logOutBtn) {
    logOutBtn.addEventListener('click', logout);
};

if (userData) {
    console.log('Should work');
    userData.addEventListener('submit', e => {
        console.log('I am clicking');
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        console.log({ name, email });

        updateData({ name, email }, 'data');
    });
};

if (userPassword) {
    console.log('Should work');
    userPassword.addEventListener('submit', async e => {
        //console.log('I am clicking');
        e.preventDefault();
        document.querySelector('.btn--save--password').textContent = 'Updating...';

        const currentPassword = document.getElementById('password-current').value;
        const newPassword = document.getElementById('password').value;
        const newPasswordConfirm = document.getElementById('password-confirm').value;

        console.log({ currentPassword, newPassword, newPasswordConfirm });
        await updateData({ currentPassword, newPassword, newPasswordConfirm }, 'password');

        document.querySelector('.btn--save--password').textContent = 'Save password';
    });
};

if (newUserData) {
    console.log('Should add new user');
    newUserData.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btn--save--user--data').textContent = 'Adding...';

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;
        const photo = document.getElementById('default.jpg').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;

        console.log({ name, email, role, photo, password, passwordConfirm });
        await addUser({ name, email, role, photo, password, passwordConfirm });

        document.querySelector('.btn--save--user--data').textContent = 'Add user';
    });
};

if (updateTourForm) {
    console.log('should work');
    updateTourForm.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btn--green').textContent = 'Adding...';

        const name = document.getElementById('name').value;
        const duration = document.getElementById('duration').value;
        const maxGroupSize = document.getElementById('group-size').value;
        const difficulty = document.getElementById('difficulty').value;
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value;
        const summary = document.getElementById('summary').value;
        const id = document.getElementById('id').value;

        const selectedGuide = document.getElementById('guide-0');
        const selectedGuide1 = document.getElementById('guide-1');
        const selectedGuide2 = document.getElementById('guide-2');
        const guide = selectedGuide.options[selectedGuide.selectedIndex].value;
        const guide1 = selectedGuide1.options[selectedGuide1.selectedIndex].value;
        const guide2 = selectedGuide2.options[selectedGuide2.selectedIndex].value;

        const guides = [guide, guide1, guide2];
        console.log({ name, duration, maxGroupSize, difficulty, price, description, summary });
        await updateTour({ name, maxGroupSize, duration, guides, maxGroupSize, difficulty, price, description, summary, id });
    });
};

if (deleteTourBtn) {
    console.log('Should add new user');
    deleteTourBtn.addEventListener('click', async e => {
        e.preventDefault();

        const id = document.getElementById('id').value;

        await deleteTour(id);

    });
};

if (addNewTourForm) {
    console.log('Should make a new tour');
    addNewTourForm.addEventListener('submit', async e => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const startDates = [
            document.getElementById('date-0').value,
            document.getElementById('date-1').value,
            document.getElementById('date-2').value
        ];
        const guides = [
            document.getElementById('guide-0').value,
            document.getElementById('guide-1').value,
            document.getElementById('guide-2').value
        ];
        const price = 20000;
        const duration = document.getElementById('duration').value;
        const maxGroupSize = document.getElementById('group-size').value;
        const difficulty = document.getElementById('difficulty').value;
        const description = document.getElementById('description').value;
        const summary = document.getElementById('summary').value;
        const imageCover = document.getElementById('photo').value;

        console.log({ name, startDates, guides, price, duration, maxGroupSize, difficulty, description, summary, imageCover });
        await addTour({ name, startDates, guides, price, duration, maxGroupSize, difficulty, description, summary, imageCover });
    })
}