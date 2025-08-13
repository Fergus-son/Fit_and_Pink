import { useEffect, useState } from "react";
import { BackgroundImage, Container, ContentOverlay, Section } from "./styles/shared";
import ProfileImage from './images/ProfileTabPage.png';
import { getUserName, initTelegram } from "./telegram";
import ProfileTab from "./components/ProfileTab";
import { Greeting } from "./components/Greeting/Greeting";

export default function ProfileApp() {
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
                <BackgroundImage imageUrl={ProfileImage} />
                <ContentOverlay>
                    <Greeting username={username} />
                    <ProfileTab />
                </ContentOverlay>
            </Section>
        </Container>
    );
}