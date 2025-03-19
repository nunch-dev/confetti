import { FC, useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button.tsx";

const audio = new Audio("/sound.mp3");
export const App: FC = () => {
  const [stop, setStop] = useState(false);

  function fire(particleRatio: number, opts) {
    confetti({
      ...opts,
      origin: { y: 0.5 },
      particleCount: Math.floor(particleRatio * 2000),
    });
  }
  function goodjob() {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 60,
        scalar: 1.2,
        shapes: ["star"],
      });
    }

    for (let i = 0; i < 2000; i += 100) {
      setTimeout(shoot, i);
    }
  }
  const onClick = () => {
    const ratio = Math.random() * 0.2 + 0.5;
    const spread = Math.random() * 60 + 120;
    fire(ratio, {
      spread,
      startVelocity: 50,
    });

    if (ratio >= 0.65 && spread >= 170) {
      setStop(true);
      goodjob();
      startSound();
      setTimeout(() => setStop(false), 2000);
    }
  };
  function startSound() {
    audio.play();
  }

  return (
    <div className={"w-screen h-screen grid place-items-center"}>
      <Button
        onClick={onClick}
        className={"cursor-pointer"}
        size={"lg"}
        disabled={stop}
      >
        🎉 {!stop ? "  Ready ?" : ""}
      </Button>
    </div>
  );
};
