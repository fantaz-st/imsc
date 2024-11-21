import { ReactLenis } from "lenis/react";
import Hero from "./Components/Hero/Hero";
import NumbersSection from "./Components/NumbersSection/NumbersSection";
import Background from "./Components/Background/Background";

export default function Home() {
  return (
    <ReactLenis root options={{ autoRaf: true }}>
      <main>
        <Hero />
        <NumbersSection />
        {/* <div style={{ height: "100vh" }}></div> */}
        <Background />
      </main>
      <footer></footer>
    </ReactLenis>
  );
}
