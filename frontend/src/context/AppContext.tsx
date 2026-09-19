import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, FarmerProfile, NotificationItem } from "../types";
import { translations } from "../i18n/translations";
import { getSyncQueue, clearSyncQueue } from "../services/offlineDb";

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations["en"]) => string;
  screen: "splash" | "language" | "onboarding" | "auth" | "profile_setup" | "main";
  setScreen: (screen: "splash" | "language" | "onboarding" | "auth" | "profile_setup" | "main") => void;
  activeTab: "home" | "crop" | "market" | "work" | "profile";
  setActiveTab: (tab: "home" | "crop" | "market" | "work" | "profile") => void;
  farmer: FarmerProfile;
  setFarmer: React.Dispatch<React.SetStateAction<FarmerProfile>>;
  isOnline: boolean;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
  notifications: NotificationItem[];
  unreadCount: number;
  triggerSync: () => Promise<void>;
  isSyncing: boolean;
}

const defaultFarmer: FarmerProfile = {
  full_name: "Ramesh Kumar",
  phone_number: "+91 9876543210",
  village: "Tadikonda",
  district: "Guntur",
  state: "Andhra Pradesh",
  main_crop: "Tomato",
  farm_size_acres: 3.5,
  language: "te",
  profile_photo_url: null
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem("sanjeevani_lang") as Language) || "te";
  });
  const [screen, setScreen] = useState<"splash" | "language" | "onboarding" | "auth" | "profile_setup" | "main">("splash");
  const [activeTab, setActiveTab] = useState<"home" | "crop" | "market" | "work" | "profile">("home");
  const [farmer, setFarmer] = useState<FarmerProfile>(defaultFarmer);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const [notifications] = useState<NotificationItem[]>([
    {
      id: "n1",
      type: "weather",
      title: "??? Rain Alert Expected Today",
      title_te: "??? ????? ????? ????????",
      title_hi: "??? ?? ????? ?? ???????",
      message: "65% rain probability today. Check soil moisture.",
      time: "10m ago",
      is_read: false
    },
    {
      id: "n2",
      type: "market",
      title: "?? Tomato Prices Up +5.2%",
      title_te: "?? ????? ???? +5.2% ????????",
      title_hi: "?? ????? ?? ??? +5.2% ????",
      message: "Current rate in Guntur Market is ?2,800/quintal.",
      time: "1h ago",
      is_read: false
    }
  ]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("sanjeevani_lang", lang);
  };

  const t = (key: keyof typeof translations["en"]): string => {
    const dict = translations[language] || translations["en"];
    return dict[key] || translations["en"][key] || key;
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      triggerSync();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const triggerSync = async () => {
    setIsSyncing(true);
    try {
      const queue = await getSyncQueue();
      if (queue && queue.length > 0) {
        console.log("Synchronizing offline queue items:", queue);
        await new Promise((r) => setTimeout(r, 1500));
        await clearSyncQueue();
      }
    } catch (e) {
      console.error("Sync error:", e);
    } finally {
      setIsSyncing(false);
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        screen,
        setScreen,
        activeTab,
        setActiveTab,
        farmer,
        setFarmer,
        isOnline,
        isAiModalOpen,
        setIsAiModalOpen,
        notifications,
        unreadCount,
        triggerSync,
        isSyncing
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
