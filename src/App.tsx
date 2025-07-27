import { useState, useEffect } from "react";
import { Container, Section, BottomNav, NavItem } from "./styles/shared";
import SummaryTab from "./components/SummaryTab";
import ProfileTab from "./components/ProfileTab";
import { tg, initTelegram, getUserName } from "./telegram";

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
        <h1 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#1C1C1E',
          margin: '0 0 24px 0'
        }}>
          Привет, {username}
        </h1>
        
        {/* Блок с датами */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          marginBottom: '24px',
          paddingBottom: '8px'
        }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              minWidth: '56px',
              padding: '8px 12px',
              background: i === 4 ? '#6C5CE7' : '#FFFFFF',
              borderRadius: '12px',
              textAlign: 'center',
              color: i === 4 ? '#FFFFFF' : '#1C1C1E',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ fontSize: '12px', fontWeight: '500' }}>Август</div>
              <div style={{ fontSize: '16px', fontWeight: '600', margin: '4px 0' }}>{22 + i}</div>
              <div style={{ fontSize: '12px', fontWeight: '500' }}>Вс</div>
            </div>
          ))}
        </div>

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