'use client'
import Link from "next/link";
import Image from "next/image";
import React, {useRef, useState} from "react";
import {useOutsideClick} from "./helper";
import { useAuthStore } from "./storage";
import {useRouter} from "next/navigation";
import {IMAGE_API_URL} from "./constants";

export default function AuthHeader() {
    const popoverRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showUserPopover, setShowUserPopover] = useState(false);
    const router = useRouter();

    const {user} = useAuthStore();

    const logout = () => {
        useAuthStore.getState().clearAuth();
    }

    const menuData = [
        // {
        //     name: 'Home',
        //     link: '/cabinet/home',
        // },
        {
            name: 'My Portal',
            link: '/cabinet/my-portal',
        },
        {
            name: 'My Contracting',
            link: '/cabinet/my-contracting',
        },
        {
            name: 'My Training',
            link: '',
            subMenu: [
                {
                    name: 'ACA Training',
                    link: '/cabinet/my-training',
                }
            ]

        },
        // {
        //     name: 'My Payments',
        //     link: '/cabinet/my-payments',
        // },
        // {
        //     name: 'Book of business',
        //     link: '/cabinet/book-of-business',
        // },
        {
            name: 'Contacts',
            link: '/cabinet/contacts',
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
                                <div title={`User Name`} className="avatar-block__name d-none d-md-block me-2">{user?.first_name} {user?.last_name}</div>
                                <div title={`User Name`} className="avatar-block__img position-relative pointer">
                                    <img src={(user?.avatar_path ? IMAGE_API_URL + user.avatar_path + '?x='+new Date().getTime() : `/images/user-normal.png`)}
                                           alt="avatar"
                                           style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', left:0, top:0 }}
                                    />
                                </div>
                                <div ref={popoverRef} className={`avatar-block__popover d-flex ${showUserPopover ? 'opened' : ''}`}>
                                    <div className="avatar-block__img position-relative me-3">
                                        <img src={(user?.avatar_path ? IMAGE_API_URL + user.avatar_path + '?x='+new Date().getTime() : `/images/user-normal.png`)}
                                               alt="avatar"
                                             style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', left:0, top:0 }}
                                        />
                                    </div>
                                    <div className="avatar-block__popover-info">
                                        <div className="fw-semibold">{user?.first_name} {user?.last_name}</div>
                                        <span>{user?.email}</span>
                                        <div className="d-flex align-items-center mt-3">
                                            <Link href={`/cabinet/my-data`}>My Account</Link>
                                            <button className="btn-secondary p-2 ms-3" onClick={
                                                () => logout()
                                            }>Sign out</button>
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
                                                    {item.subMenu?.length > 0 &&
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
                            {/*<Link href="/login" className="btn-basic d-none d-xl-inline-flex py-2">Login</Link>*/}
                        </div>
                    </div>
                </div>
            </header>
            </>
    );
}
