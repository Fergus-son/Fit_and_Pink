import { useState, useEffect } from "react";
import { AppContainer, BackgroundImage, ContentOverlay, BottomNav, NavItem } from "./styles/shared";
import SummaryTab from "./components/SummaryTab";
import ProfileTab from "./components/ProfileTab";
import { tg, initTelegram, getUserName } from "./telegram";
import DateSelector from "./components/DateSelector/DateSelector";
import SummaryPage from './images/SummaryTabPage.jpg';
import { Greeting } from "./components/Greeting/Greeting";

export default function App() {
  const [pageTab, setPageTab] = useState("summary");
  const [username, setUsername] = useState("");

  useEffect(() => {
    initTelegram();
    const name = getUserName();
    setUsername(name); 
  }, []);

  return (
    <AppContainer>
      <BackgroundImage imageUrl={SummaryPage} />
      <ContentOverlay>
        <Greeting username={username} />
        {/* <DateSelector /> */}
        {pageTab === "summary" && <SummaryTab />}
        {pageTab === "profile" && <ProfileTab />}
      </ContentOverlay>

      <BottomNav>
        <NavItem active={pageTab === "summary"} onClick={() => setPageTab("summary")}>
          Статистика
        </NavItem>
        <NavItem active={pageTab === "profile"} onClick={() => setPageTab("profile")}>
          Профиль
        </NavItem>
      </BottomNav>
    </AppContainer>
  );
}