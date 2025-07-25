import { useState, useEffect } from "react";
import { Container, Section, BottomNav, NavItem } from "./styles/shared";
import SummaryTab from "./components/SummaryTab";
import ProfileTab from "./components/ProfileTab";
import { tg, initTelegram } from "./telegram";

export default function App() {
  const [pageTab, setPageTab] = useState("summary");

  useEffect(() => {
    initTelegram();
  }, []);

  return (
    <Container>
      {pageTab === "summary" && <SummaryTab />}
      {pageTab === "profile" && <ProfileTab />}

      <BottomNav>
        <NavItem active={pageTab === "summary"} onClick={() => setPageTab("summary")}>
          📊<br />Статистика
        </NavItem>
        <NavItem active={pageTab === "profile"} onClick={() => setPageTab("profile")}>
          👤<br />Профиль
        </NavItem>
      </BottomNav>
    </Container>
  );
}