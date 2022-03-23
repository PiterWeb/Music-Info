import { atom } from 'recoil';

const userState = atom({
    key: 'userState',
    default: sessionStorage.getItem('user') || null,
});

export default userState;