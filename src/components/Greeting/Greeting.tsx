import { GreetingContainer, GreetingText } from "./GreetingStyle";

interface GreetingProps {
  username: string;
}

export function Greeting({ username }: GreetingProps) {
  return (
    <GreetingContainer>
      <GreetingText>Привет, {username} 👋</GreetingText>
    </GreetingContainer>
  );
}