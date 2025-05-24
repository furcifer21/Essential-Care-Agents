import React from "react";
import MainPageFirstSection from "../../components/pages/main-page/MainPageFirstSection";
import MainPageSecondSection from "../../components/pages/main-page/MainPageSecondSection";
import MainPageThirdBlock from "../../components/pages/main-page/MainPageThirdBlock";
import MainLayout from "../../components/MainLayout";

export const metadata = {
    title: 'ACA - Agility Insurance Services',
    description: '',
};

export default function HomePage() {
  return (
      <MainLayout>
          <MainPageFirstSection/>
          <MainPageSecondSection/>
          <MainPageThirdBlock/>
      </MainLayout>
  );
}
