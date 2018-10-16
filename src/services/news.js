
import { API_ROOT, API_KEY } from './apiConfig';
import { COUNTRY_CODE } from '../shared/constants/common';

export function getTopHeadlines(params) {
    var requestUrl = `${API_ROOT}/top-headlines?page=${params.page}&pagesize=${params.pagesize}&apiKey=${API_KEY}`;
    requestUrl += params.searchIdString != "" ? `&sources=${params.searchIdString}` : `&country=${COUNTRY_CODE}`;

    return fetch(requestUrl)
        .then(response => response.json());
}

export function getSearchResults(params) {
    var requestUrl = `${API_ROOT}/everything?apiKey=${API_KEY}&q=${params.searchby}&page=${params.page}&pagesize=${params.pagesize}&sortBy=relevancy`;
    requestUrl += params.searchIdString != "" ? `&sources=${params.searchIdString}` : ``;
    return fetch(requestUrl)
        .then(response => response.json());
}

export function getNewsSources(params) {
    const requestUrl = `${API_ROOT}/sources?apiKey=${API_KEY}`;
    return fetch(requestUrl)
        .then(response => response.json());
}