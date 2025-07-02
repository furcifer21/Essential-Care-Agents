import React from "react";
import MainPageFirstSection from "../../components/pages/main-page/MainPageFirstSection";
import MainPageSecondSection from "../../components/pages/main-page/MainPageSecondSection";
import MainPageThirdBlock from "../../components/pages/main-page/MainPageThirdBlock";
import MainLayout from "../../components/MainLayout";
import Script from "next/script";

export const metadata = {
    title: 'ACA - EC Agency Hub',
    description: '',
};

export default function HomePage() {
  return (
      <MainLayout>
          <MainPageFirstSection/>
          <MainPageSecondSection/>
          <MainPageThirdBlock/>
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.5/lottie.min.js"
            strategy="afterInteractive" // Загружается после гидратации страницы
          />
      </MainLayout>
  );
}
