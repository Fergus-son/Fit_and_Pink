import { useEffect, useState } from "react";
import { Container, Section, ContentOverlay, BackgroundImage, BottomNav, NavItem } from "./styles/shared";
import SummaryTab from "./components/SummaryTab";
import { getUserName, initTelegram } from "./telegram";
import SummaryBackground from './images/SummaryTabPage.jpg';
import { Greeting } from "./components/Greeting/Greeting";
import HistoryPage from "./components/HistoryTab";

export default function SummaryApp() {
    const [initialized, setInitialized] = useState(false);
    const [username, setUsername] = useState("");
    const [activePage, setActivePage] = useState<"summary" | "history">("summary");

    useEffect(() => {
        initTelegram();
        setInitialized(true);
        setUsername(getUserName());
    }, []);

    if (!initialized) return null;

    return (
        <Container>
            <Section>
                <BackgroundImage 
                    imageUrl={SummaryBackground} 
                />
                <ContentOverlay>
                    {activePage === "summary" ? <Greeting username={username} /> : "Твоё Питание"}
                    {/* <Greeting username={username} /> */}
                    
                    {activePage === "summary" ? <SummaryTab /> : <HistoryPage />}
                    
                    <BottomNav>
                        <NavItem
                            active={activePage === "summary"}
                            onClick={() => setActivePage("summary")}
                        >
                            Статистика
                        </NavItem>
                        <NavItem
                            active={activePage === "history"}
                            onClick={() => setActivePage("history")}
                        >
                            История
                        </NavItem>
                    </BottomNav>
                </ContentOverlay>
            </Section>
        </Container>
    );
}