import { useEffect, useState } from "react";
import { Container, Section } from "./styles/shared";
import SummaryTab from "./components/SummaryTab";
import { initTelegram } from "./telegram";

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
                <SummaryTab />
            </Section>
        </Container>
    );
}