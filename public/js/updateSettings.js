import axios from 'axios';
import { showAlert } from './alert';

export const updateData = async(data, type) => {
    try {
        const url =
            type === 'data' ?
            'api/v1/users/updateMyData' :
            'api/v1/users/updatePassword'

        const res = await axios({
            method: 'PATCH',
            url,
            data
        });

        if (res.data.status === 'success') {
            showAlert('success', `${type.toUpperCase()} was successfully updated!`);

            document.getElementById('password-current').value = '';
            document.getElementById('password').value = '';
            document.getElementById('password-confirm').value = '';
        }
    } catch (err) {
        showAlert('error', err.response.data.message);
    }
};