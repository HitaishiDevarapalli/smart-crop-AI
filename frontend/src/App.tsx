import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { SanjeevaniAIFloatingButton } from "./components/SanjeevaniAIFloatingButton";
import { OfflineBanner } from "./components/OfflineBanner";
import { Splash } from "./pages/Splash";
import { LanguageSelect } from "./pages/LanguageSelect";
import { Onboarding } from "./pages/Onboarding";
import { Auth } from "./pages/Auth";
import { ProfileSetup } from "./pages/ProfileSetup";
import { Home } from "./pages/Home";
import { CropCheck } from "./pages/CropCheck";
import { Market } from "./pages/Market";
import { WorkCoordinator } from "./pages/WorkCoordinator";
import { Profile } from "./pages/Profile";
import { SanjeevaniAIChat } from "./pages/SanjeevaniAIChat";

const MainContent: React.FC = () => {
  const { screen, activeTab } = useApp();

  if (screen === "splash") return <Splash />;
  if (screen === "language") return <LanguageSelect />;
  if (screen === "onboarding") return <Onboarding />;
  if (screen === "auth") return <Auth />;
  if (screen === "profile_setup") return <ProfileSetup />;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans antialiased text-gray-900 select-none">
      <Header />
      <OfflineBanner />

      <main className="flex-1 px-4 pt-4 pb-24 max-w-md w-full mx-auto">
        {activeTab === "home" && <Home />}
        {activeTab === "crop" && <CropCheck />}
        {activeTab === "market" && <Market />}
        {activeTab === "work" && <WorkCoordinator />}
        {activeTab === "profile" && <Profile />}
      </main>

      <SanjeevaniAIFloatingButton />
      <BottomNav />
      <SanjeevaniAIChat />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
