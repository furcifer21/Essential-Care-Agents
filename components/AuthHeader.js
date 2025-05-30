'use client'
import Link from "next/link";
import Image from "next/image";
import React, {useRef, useState} from "react";
import {useOutsideClick} from "./helper";

export default function AuthHeader() {
    const popoverRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showUserPopover, setShowUserPopover] = useState(false);
    const menuData = [
        {
            name: 'Home',
            link: '/cabinet/home',
        },
        {
            name: 'My Portal',
            link: '/cabinet/my-portal',
        },
        {
            name: 'My contracting',
            link: '/cabinet/my-contracting',
        },
        {
            name: 'My Payments',
            link: '/cabinet/my-payments',
        },
        {
            name: 'Book of business',
            link: '/cabinet/book-of-business',
        },
    ];

    useOutsideClick(popoverRef, () => {
        setShowUserPopover(false);
    })

    return (
        <>
            <header className="main-header position-sticky">
                <div className="container">
                    <div className="header-top-line d-flex align-items-center justify-content-between py-2">
                        <Link href={`/`} className="header-menu__logo position-relative me-4 flex-shrink-0">
                            <Image src={`/images/logo.svg`}
                                   fill
                                   alt="logo EC AgentHub"
                                   objectFit="contain"
                            />
                        </Link>
                        <div className="d-flex align-items-center">
                            <div className="avatar-block d-flex align-items-center" onClick={() => setShowUserPopover(!showUserPopover)}>
                                <div title={`User Name`} className="avatar-block__name d-none d-md-block me-2">User Name</div>
                                <div title={`User Name`} className="avatar-block__img position-relative pointer">
                                    <Image src={`/images/user-normal.png`}
                                           fill
                                           alt="avatar"
                                           objectFit="cover"
                                    />
                                </div>
                                <div ref={popoverRef} className={`avatar-block__popover d-flex ${showUserPopover ? 'opened' : ''}`}>
                                    <div className="avatar-block__img position-relative me-3">
                                        <Image src={`/images/user-normal.png`}
                                               fill
                                               alt="avatar"
                                               objectFit="cover"
                                        />
                                    </div>
                                    <div className="avatar-block__popover-info">
                                        <div className="fw-semibold">User Name</div>
                                        <span>user@mail.com</span>
                                        <div className="d-flex align-items-center mt-3">
                                            <Link href={`/cabinet/my-data`}>My Account</Link>
                                            <button className="btn-secondary p-2 ms-3">Sign out</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                                                    className={`position-relative `}
                                                >
                                                    {item.link !== '' ?
                                                        <Link href={item.link}>{item.name}</Link>
                                                        :
                                                        <span>{item.name}</span>
                                                    }
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
                            </div>
                            <Link href="/cabinet/login" className="btn-basic d-none d-xl-inline-flex py-2">Login</Link>
                        </div>
                    </div>
                </div>
            </header>
            </>
    );
}
