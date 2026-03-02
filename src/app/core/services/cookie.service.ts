import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AppCookieService {
    private cookieStore = {};

    constructor() {
        this.parseCookies(document.cookie);
    }

    public parseCookies(cookies = document.cookie) {
        this.cookieStore = {};
        if (!!cookies === false) { return; }
        const cookiesArr = cookies.split(';');
        for (const cookie of cookiesArr) {
            const cookieArr = cookie.split('=');
            this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
        }
    }

    // get(key: string) {
    //     this.parseCookies();
    //     return !!this.cookieStore[key] ? this.cookieStore[key] : null;
    // }
    read_cookie(name) {
        var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
        result && (result = JSON.parse(result[1]));
        return result;
    }

    // remove(key: string) {
    //     document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
    // }

    set(key: string, value: string) {
        let cookie = [key, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
        document.cookie = cookie;
    }
    // set(key: string, value: string) {
    //     document.cookie = key + '=' + (value || '');
    // }
    delete_cookie(name) {
        document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
    }
}