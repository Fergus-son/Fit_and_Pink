import { useEffect, useState } from "react";
import { Container, Section } from "./styles/shared";
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
                <ProfileTab />
            </Section>
        </Container>
    );
}