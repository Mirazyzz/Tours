import axios from 'axios';
import { showAlert, confirm } from './alert';

export const addUser = async(data) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/',
            data
        });

        if (res.data.status === 'success') {
            showAlert('success', 'User was added successfully');

            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('role').value = '';
            document.getElementById('password').value = '';
            document.getElementById('password-confirm').value = '';
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    };
};

export const addTour = async data => {

    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/tours/',
            data
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Tour was added successfully');
        };
    } catch (err) {
        showAlert('error', err.response.data.message);
    };
}

export const updateTour = async(data) => {
    try {
        console.log(data);
        const res = await axios({
            method: 'PATCH',
            url: `http://127.0.0.1:3000/api/v1/tours/${data.id}`,
            data
        });

        if (res.data.status === 'success') {
            showAlert('success', 'Tour updated successfully');

            document.querySelector('.btn--green').textContent = 'Update';
        };

    } catch (err) {
        showAlert('error');
    }
};

export const deleteTour = async(id) => {
    console.log('Should confirm');
    if (confirm()) {
        try {
            const res = await axios({
                method: 'DELETE',
                url: `http://127.0.0.1:3000/api/v1/tours/${id}`,
                id
            });

            if (res.data.status === 'success') {
                showAlert('success', 'Tour was successfully deleted');
                window.setTimeout(() => {
                    location.assign('/manageTours');
                }, 2000);
            };
        } catch (err) {
            showAlert('error', err.response.tour.message);
        }
    } else {
        return;
    }
};

/*
export const deleteTour = async() => {
    try {

        const res = await axios({
            method: 'DELETE',
            url: 'http://127.0.0.1:3000/api/v1/tours/deleteTour'
        });

        console.log('On process of deleting');

        if (res.data.status === 'success') {
            showAlert('success', `Tour was successfully deleted!`);
        };
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};  */