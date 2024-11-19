import { ReactLenis } from "lenis/react";
import Hero from "./Components/Hero/Hero";

export default function Home() {
  return (
    <ReactLenis root options={{ autoRaf: true }}>
      <main>
        <Hero />
        <div style={{ height: "100vh" }}></div>
      </main>
      <footer></footer>
    </ReactLenis>
  );
}
