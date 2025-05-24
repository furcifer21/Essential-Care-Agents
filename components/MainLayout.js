import Head from "next/head";
import AuthHeader from "./AuthHeader";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({children, seo, isAuth = false}) {
    return (
        <>
            <div className="main-wrap d-flex flex-column min-vh-100 position-relative">
                {isAuth ?
                    <AuthHeader/>
                :
                    <Header />
                }
                <main className="flex-grow-1">
                    {children}
                </main>
                <Footer/>
            </div>
        </>
    );
}
