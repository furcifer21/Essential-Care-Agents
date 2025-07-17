'use client'
import {useEffect} from "react";
import axios from "axios";
import {CLIENT_API_URL} from "./constants";

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

export function formatDate(dt) {
    const options = {
        month: 'long', // Полное название месяца (например, June)
        day: 'numeric', // День месяца (например, 22)
        year: 'numeric', // Полный год (например, 2025)
    };
    try {
        return  new Intl.DateTimeFormat('en-US', options).format((dt instanceof Date) ? dt : new Date(dt));
    }
    catch (e) {
        return '';
    }
}

export async function updateCacheData() {
    const data = {
        states: null,
        timezones: null,
    }
    try {
        const response = await axios.get(CLIENT_API_URL + '/api/states');
        if (response?.data?.data) {
            data.states = response.data.data;
        }
    }
    catch (e) {
        
    }

    try {
        const response = await axios.get(CLIENT_API_URL + '/api/timezones');
        if (response?.data?.data) {
            data.timezones = response.data.data;
        }
    }
    catch (e) {
        
    }

    return data;
}

export async function fetchAgentProfile( token ) {
    const response = await axios.get(CLIENT_API_URL + '/api/user/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return (response?.data?.data?.id)
        ? response?.data?.data
        :null
}

export async function updateAgentTimezone( token, timezone ) {
    await axios.post(CLIENT_API_URL + '/api/user/update', {
          "timezone": timezone,
      },
      {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          }
      });
}