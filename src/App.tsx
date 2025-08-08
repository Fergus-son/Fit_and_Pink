import { useState, useEffect } from "react";
import { AppContainer, BackgroundImage, ContentOverlay, BottomNav, NavItem, StyledNavIcon } from "./styles/shared";
import SummaryTab from "./components/SummaryTab";
import ProfileTab from "./components/ProfileTab";
import { tg, initTelegram, getUserName } from "./telegram";
import SummaryPage from './images/SummaryTabPage.jpg';
import { Greeting } from "./components/Greeting/Greeting";
import HistoryTab from "./components/HistoryTab";
import { GreetingHistory } from "./components/Greeting/GreetingHistory";
import historyActive from "./icons/historyActive.png"
import historyInactive from "./icons/historyInactive.png"
import homeActive from "./icons/homeActive.png"
import homeInactive from "./icons/homeInactive.png"

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
        {pageTab === "summary" && <Greeting username={username} />}
        {pageTab === "profile" && <Greeting username={username} />}
        {pageTab === "history" && <GreetingHistory />}
        {/* <Greeting username={username} /> */}
        {pageTab === "summary" && <SummaryTab />}
        {pageTab === "profile" && <ProfileTab />}
        {pageTab === "history" && <HistoryTab />}
      </ContentOverlay>

      <BottomNav>
        <NavItem active={pageTab === "summary"} onClick={() => setPageTab("summary")}>
          <StyledNavIcon icon={pageTab === "summary" ? homeActive : homeInactive} />
        </NavItem>

        <NavItem active={pageTab === "profile"} onClick={() => setPageTab("profile")}>
          <StyledNavIcon icon={pageTab === "profile" ? homeActive : homeInactive} />
        </NavItem>

        <NavItem active={pageTab === "history"} onClick={() => setPageTab("history")}>
          <StyledNavIcon icon={pageTab === "history" ? historyActive : historyInactive} />
        </NavItem>
      </BottomNav>
    </AppContainer>
  );
}