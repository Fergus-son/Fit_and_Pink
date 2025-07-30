import { useEffect, useState } from "react";
import { BackgroundImage, Container, ContentOverlay, Section } from "./styles/shared";
import SummaryTab from "./components/SummaryTab";
import { initTelegram } from "./telegram";
import DateSelector from "./components/DateSelector/DateSelector";

export default function SummaryApp() {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        initTelegram();
        setInitialized(true);
    }, []);

    if (!initialized) return null;

    return (
        <Container>
            <Section>
                <BackgroundImage imageUrl="./images/SummaryTabPage.png" />
                <ContentOverlay>
                    {/* <DateSelector /> */}
                    <SummaryTab />
                </ContentOverlay>
            </Section>
        </Container>
    );
}