window.shouldRestart = true;
(() => {
  document.querySelector("button")?.addEventListener("click", async () => {
    const correctData = await fetch(`https://something-80uf2as4e1ve.runkit.sh/${document.querySelector("input")?.value}`);
    const correct = await correctData.text() === "right";
    if (correct)
      window.congrats.run();
    else
      document.body.append("incorrect password");
  });
})();
