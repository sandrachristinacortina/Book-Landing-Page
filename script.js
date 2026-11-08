//making changes
//morechanges
//making changes
//making changes
//morechanges
//more changes
//more and more changes
//changes 1
//firstchanges
//secondchanges 
//first changes
//second changes
//third changes
// Close the "Buy in Print" menu on outside click or Escape
document.addEventListener("click", (event) => {
  document.querySelectorAll(".buy-menu[open]").forEach((menu) => {
    if (!menu.contains(event.target)) menu.removeAttribute("open");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  document.querySelectorAll(".buy-menu[open]").forEach((menu) => {
    menu.removeAttribute("open");
    menu.querySelector("summary").focus();
  });
});

// Videobook: play chapters in the on-page player
const player = document.querySelector("#player");

if (player) {
  const chapters = [...document.querySelectorAll(".chapter")];
  const nextButton = document.querySelector("#next-chapter");
  const nowLabel = document.querySelector("#now-label");
  const nowTitle = document.querySelector("#now-title");
  let current = 0;

  const play = (index) => {
    const chapter = chapters[index];
    const title = chapter.querySelector(".chapter-title").textContent;

    const frame = document.createElement("iframe");
    frame.src = `https://www.youtube-nocookie.com/embed/${chapter.dataset.video}?autoplay=1&rel=0&playsinline=1`;
    frame.title = `${chapter.dataset.label}: ${title}`;
    frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    frame.allowFullscreen = true;
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    player.replaceChildren(frame);

    chapters[current].removeAttribute("aria-current");
    chapter.setAttribute("aria-current", "true");
    current = index;

    nowLabel.textContent = chapter.dataset.label;
    nowTitle.textContent = title;
    nextButton.hidden = index === chapters.length - 1;
  };

  chapters.forEach((chapter, index) => {
    chapter.addEventListener("click", (event) => {
      event.preventDefault();
      play(index);
      // The player sits above the list on narrow screens
      if (getComputedStyle(player.parentElement).position !== "sticky") {
        player.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  player.querySelector(".player-poster").addEventListener("click", (event) => {
    event.preventDefault();
    play(0);
  });

  nextButton.addEventListener("click", () => play(current + 1));
  nextButton.hidden = false;
}

// Contact form: send via Web3Forms without leaving the page
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const status = contactForm.querySelector(".form-status");
  const submitButton = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    status.textContent = "Sending…";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);

      contactForm.reset();
      status.textContent = "Thank you — your message has been sent.";
    } catch {
      status.textContent =
        "Sorry, your message couldn't be sent. Please try again in a moment.";
    } finally {
      submitButton.disabled = false;
    }
  });
}
