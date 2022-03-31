import { atom } from 'recoil';

export const searchQueryState = atom({
    key: 'searchQueryState',
    default: ''
});

export const searchErrorState = atom({
    key: 'searchErrorState',
    default: false
})

export const searchResultsState = atom({
    key: 'searchResultsState',
    default: []
})
