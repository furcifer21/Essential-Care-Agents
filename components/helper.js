'use client'
import {useEffect} from "react";

export function useOutsideClick (ref, callback) {
    const handleClick = (e) => {
        // check array of refs or one ref
        if (Array.isArray(ref)) {
            let isClickOutside = true;

            ref.map(item => {
                isClickOutside = isClickOutside && item.current && item.current.contains(e.target);
            })

            isClickOutside && callback();
        } else {
            if (ref.current && !ref.current.contains(e.target)) {
                callback();
            }
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
}

// functions for save cart and order token
export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : '';
}

export function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        samesite: 'strict',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}