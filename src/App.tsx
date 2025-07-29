import { useState, useEffect } from "react";
import { Container, Section, BottomNav, NavItem } from "./styles/shared";
import SummaryTab from "./components/SummaryTab";
import ProfileTab from "./components/ProfileTab";
import { tg, initTelegram, getUserName } from "./telegram";
import DateSelector from "./components/DateSelector/DateSelector";

export default function App() {
  const [pageTab, setPageTab] = useState("summary");
  const [username, setUsername] = useState("");

  useEffect(() => {
    initTelegram();
    setUsername(getUserName());
  }, []);

  return (
    <Container>
      <Section>
        <DateSelector />

        {pageTab === "summary" && <SummaryTab />}
        {pageTab === "profile" && <ProfileTab />}
      </Section>

      <BottomNav>
        <NavItem active={pageTab === "summary"} onClick={() => setPageTab("summary")}>
          Статистика
        </NavItem>
        <NavItem active={pageTab === "profile"} onClick={() => setPageTab("profile")}>
          Профиль
        </NavItem>
      </BottomNav>
    </Container>
  );
}