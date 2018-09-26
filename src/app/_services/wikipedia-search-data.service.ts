/*
    # this service is used to get the filter data
*/
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WikipediaSearchDataService {

    getApiBaseUrl(_lang) {
        return `https://${_lang}.wikipedia.org/w/api.php?`;
    }
    // prepare  filter data
    fillDataInObjectByList(_object, _params, _list) {

        _list.forEach((value, key) => {
            if (_params[value]) {
                _object.object[value] = _params[value];
            }
        });

        return _object;
    }

    getNew(_params) {
        // default wikipedia options options
        let wikipediaSearchData = {
            object: {
                action: 'query',
                format: 'json',
                wrappedhtml: 2,
                list: 'search',
                srsearch: '',
                origin: '*',
                srlimit: 'max'
            },
            url: '',
        };
        // default lang  set eng is not supplied
        if (!_params.lang) {
            _params.lang = 'en';
        }

        // set search text
        wikipediaSearchData.object.srsearch = _params.term;
        wikipediaSearchData = this.fillDataInObjectByList(wikipediaSearchData, _params, [
            'action',
            'format',
            'wrappedhtml',
            'list',
            'srsearch', 'origin'
        ]);
        // get base url based on language
        wikipediaSearchData.url = this.getApiBaseUrl(_params.lang);
        return wikipediaSearchData;
    }
}
