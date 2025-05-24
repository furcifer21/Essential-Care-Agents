'use client';
import React from "react";

export default function Footer() {

    return (
        <footer className="text-center py-3">
            <div className="container">
                <span>© Copyright {new Date().getFullYear()} Essential Care. All rights reserved</span>
            </div>
        </footer>
    )
}