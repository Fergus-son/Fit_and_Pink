import { useEffect, useState } from "react";
import { BackgroundImage, Container, ContentOverlay, Section } from "./styles/shared";
import ProfileTab from "./components/ProfileTab";
import { initTelegram } from "./telegram";

export default function ProfileApp() {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        initTelegram();
        setInitialized(true);
    }, []);

    if (!initialized) return null;

    return (
        <Container>
            <Section>
                <BackgroundImage imageUrl="../images/SummaryTabPage.png" />
                <ContentOverlay>
                    <ProfileTab />
                </ContentOverlay>
            </Section>
        </Container>
    );
}