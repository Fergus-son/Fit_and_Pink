import { useEffect, useState } from "react";
import { BackgroundImage, Container, ContentOverlay, Section } from "./styles/shared";
import SummaryTab from "./components/SummaryTab";
import { getUserName, initTelegram } from "./telegram";
import SummaryImage from './images/SummaryTabPage.jpg';
import { Greeting } from "./components/Greeting/Greeting";


export default function SummaryApp() {
    const [initialized, setInitialized] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        initTelegram();
        setInitialized(true);
        const name = getUserName();
        setUsername(name); 
    }, []);

    if (!initialized) return null;

    return (
        <Container>
            <Section>
                <BackgroundImage imageUrl={SummaryImage} />
                <ContentOverlay>
                    <Greeting username={username} />
                    <SummaryTab />
                </ContentOverlay>
            </Section>
        </Container>
    );
}