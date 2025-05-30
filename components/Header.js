'use client';
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from 'next/image';
import {useRouter} from "next/navigation";

export default function Header() {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const menuData = [
        {
            name: 'Home',
            link: '/',
            subMenu: []
        },
        {
            name: 'ACA Contracting',
            link: '/aca-contracting',
            subMenu: []
        },
        {
            name: 'ACA Certification',
            link: '/aca-certification',
            subMenu: []
        },
    ];

    useEffect(() => {
        console.log(router.pathname, router.asPath);
        const mobileMenuHide = () => {
            // После обсуждений с Колей - десктоп начинается с 1300 (из за дизайна десктоп меню, который ломается на меньшей ширине)
            if(window.innerWidth > 1299) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', mobileMenuHide);
        window.addEventListener('orientationchange', mobileMenuHide);

        return () => {
            window.removeEventListener('resize', mobileMenuHide);
            window.removeEventListener('orientationchange', mobileMenuHide);
        };
    }, []);

    return (
        <>
            <header className="main-header position-sticky">
                <div className="container">
                    <div className="header-top-line d-flex align-items-center justify-content-between py-2">
                        <Link href={`/`} className="header-menu__logo position-relative me-4 flex-shrink-0">
                            <Image src={`/images/logo.svg`}
                                   fill
                                   alt="logo EC AgentHub Care"
                                   objectFit="contain"
                            />
                        </Link>
                        <div className="d-flex align-items-center">
                            <a href="tel:3479713399" className="d-inline-flex align-items-center me-3">
                                <svg className="svg-icon flex-shrink-0 me-2">
                                    <use xlinkHref="/images/sprite.svg#phone-icon"></use>
                                </svg>
                                <span className="d-none d-xl-inline">(347) 971-3399</span>
                            </a>
                            <a href="mailto:contracts@essentialcare.info" className="d-inline-flex align-items-center" target="_blank">
                                <svg className="svg-icon flex-shrink-0 me-2">
                                    <use xlinkHref="/images/sprite.svg#email-icon"></use>
                                </svg>
                                <span className="d-none d-xl-inline">contracts@essentialcare.info</span>
                            </a>
                            <a href="https://www.facebook.com/EssentialCareInsuranceAgency"
                               className="social-btn d-inline-flex flex-shrink-0 ms-2"
                               target="_blank"
                            >
                                <svg className="svg-icon">
                                    <use xlinkHref="/images/sprite.svg#facebook-icon"></use>
                                </svg>
                            </a>
                            <button className={`burger-btn d-xl-none flex-shrink-0 ms-3 ${isMobileMenuOpen ? 'active' : ''}`}
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <svg className="svg-icon">
                                    <use xlinkHref="/images/sprite.svg#burger-icon"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="header-menu py-xl-2">
                    <div className="container">
                        <div className="d-flex align-items-center flex-row-reverse flex-xl-row justify-content-xl-between justify-content-start w-100">
                            <div>
                                <div className={`mobile-menu-mask ${isMobileMenuOpen ? 'opened' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
                                <nav className={`header-menu__items ${isMobileMenuOpen ? 'opened' : ''}`}>
                                    <button className={`close-btn d-xl-none`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <svg className="svg-icon">
                                            <use xlinkHref="/images/sprite.svg#close-icon"></use>
                                        </svg>
                                    </button>
                                    <ul className="header-main-menu d-flex flex-column flex-xl-row">
                                        {menuData.map((item, i) => {
                                            return (
                                                <li key={`menu-items-${i}`}
                                                    className={`position-relative ${item.subMenu.length > 0 ? 'with-sub' : ''}`}
                                                >
                                                    {item.link !== '' ?
                                                        <Link href={item.link}>{item.name}</Link>
                                                    :
                                                        <span>{item.name}</span>
                                                    }
                                                    {item.subMenu.length > 0 &&
                                                        <ul className="header-sub-menu">
                                                            {item.subMenu.map((subItem, k) => {
                                                                return (
                                                                    <li key={`sub-item-${i}-${k}`}>
                                                                        <Link href={subItem.link}>{subItem.name}</Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    }
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
                            </div>
                            { (router.pathname || router.asPath) !== '/login' && (
                                <Link href="/login" className="btn-basic d-none d-xl-inline-flex py-2">Login</Link>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}