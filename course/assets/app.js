(() => {
  "use strict";

  const COURSE_DATA_URL = "/course/assets/lessons.json";
  const PROGRESS_KEY = "agent-operations-course-progress-v1";
  const DRAFTS_KEY = "agent-operations-course-drafts-v1";

  const app = document.querySelector("#course-app");
  const lessonNav = document.querySelector("#lesson-nav");
  const progressLabel = document.querySelector("#progress-label");
  const progressBar = document.querySelector("#progress-bar");
  const menuButton = document.querySelector("#menu-button");
  const sidebar = document.querySelector("#course-nav");

  let lessons = [];
  let progress = readStorage(PROGRESS_KEY, {});
  let drafts = readStorage(DRAFTS_KEY, {});

  function readStorage(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function lessonUrl(lesson) {
    return `/course/lessons/${encodeURIComponent(lesson.slug)}`;
  }

  function currentSlug() {
    const marker = "/course/lessons/";
    if (!window.location.pathname.startsWith(marker)) return null;
    return decodeURIComponent(window.location.pathname.slice(marker.length)).replace(/\/$/, "");
  }

  function updateProgress() {
    const completed = lessons.filter((lesson) => progress[lesson.slug]).length;
    const percentage = lessons.length ? Math.round((completed / lessons.length) * 100) : 0;
    progressLabel.textContent = `${completed} of ${lessons.length} lessons complete`;
    progressBar.style.width = `${percentage}%`;
  }

  function renderNavigation(activeSlug = null) {
    lessonNav.innerHTML = lessons
      .map((lesson) => {
        const active = lesson.slug === activeSlug ? " active" : "";
        const complete = progress[lesson.slug] ? " complete" : "";
        const status = progress[lesson.slug] ? "Completed" : "Not completed";
        return `
          <a class="lesson-nav-item${active}${complete}" href="${lessonUrl(lesson)}">
            <span class="lesson-number">${String(lesson.module).padStart(2, "0")}</span>
            <span class="lesson-nav-copy">
              <strong>${escapeHtml(lesson.shortTitle)}</strong>
              <small>${escapeHtml(lesson.duration)} · ${escapeHtml(lesson.level)}</small>
            </span>
            <span class="completion-dot" title="${status}" aria-label="${status}">●</span>
          </a>`;
      })
      .join("");
  }

  function renderCourseHome() {
    document.title = "Industrial-Strength AI Agents";
    const completed = lessons.filter((lesson) => progress[lesson.slug]).length;
    const firstIncomplete = lessons.find((lesson) => !progress[lesson.slug]) || lessons[0];
    app.innerHTML = `
      <section class="hero">
        <p class="eyebrow">Complete hands-on curriculum</p>
        <h1>Build AI agents that deserve production access.</h1>
        <p>
          Learn the theory, write the code, run the repository labs, and collect evidence.
          This course progresses from deterministic operational software to evaluated,
          sandboxed, observable, and recoverable agent systems.
        </p>
        <div class="hero-actions">
          <a class="button primary" href="${lessonUrl(firstIncomplete)}">
            ${completed ? "Continue learning" : "Start Module 0"}
          </a>
          <a class="button secondary" href="#syllabus">Explore the syllabus</a>
        </div>
      </section>

      <section class="course-stats" aria-label="Course facts">
        <article class="stat-card"><strong>${lessons.length}</strong><span>theory-and-practice modules</span></article>
        <article class="stat-card"><strong>1 project</strong><span>carried from simulator to production readiness</span></article>
        <article class="stat-card"><strong>${completed}</strong><span>modules completed in this browser</span></article>
      </section>

      <section id="syllabus">
        <p class="eyebrow">Course syllabus</p>
        <h2 class="section-title">Theory becomes engineering evidence</h2>
        <div class="lesson-grid">
          ${lessons.map(renderLessonCard).join("")}
        </div>
      </section>`;
  }

  function renderLessonCard(lesson) {
    const status = progress[lesson.slug] ? "Completed" : "Open lesson";
    return `
      <article class="lesson-card">
        <div class="card-meta">
          <span class="chip">Module ${lesson.module}</span>
          <span class="chip">${escapeHtml(lesson.duration)}</span>
        </div>
        <h3>${escapeHtml(lesson.title)}</h3>
        <p>${escapeHtml(lesson.summary)}</p>
        <a class="button${progress[lesson.slug] ? " success" : ""}" href="${lessonUrl(lesson)}">${status}</a>
      </article>`;
  }

  function renderCommandGuide(practice) {
    const guide = practice.commandGuide;
    if (!guide) {
      return `<div class="callout"><strong>Run locally:</strong> <code>${escapeHtml(practice.runCommand)}</code></div>`;
    }

    return `
      <section class="command-guide" aria-labelledby="command-guide-title">
        <p class="eyebrow">Run the tests locally</p>
        <h3 id="command-guide-title">Understand the command before you run it</h3>
        <p><strong>Terminal:</strong> ${escapeHtml(guide.terminal)}</p>
        <div class="platform-commands">
          <div>
            <strong>Windows PowerShell</strong>
            <pre><code>${escapeHtml(guide.windowsCommand)}</code></pre>
          </div>
          <div>
            <strong>Ubuntu Bash</strong>
            <pre><code>${escapeHtml(guide.ubuntuCommand)}</code></pre>
          </div>
        </div>
        <dl class="command-explanation">
          <dt>Why</dt>
          <dd>${escapeHtml(guide.why)}</dd>
          <dt>Program</dt>
          <dd>${escapeHtml(guide.program)}</dd>
          <dt>Parts</dt>
          <dd><ul>${guide.parts.map((part) => `<li>${escapeHtml(part)}</li>`).join("")}</ul></dd>
          <dt>Effect</dt>
          <dd>${escapeHtml(guide.effect)}</dd>
          <dt>Success evidence</dt>
          <dd>${escapeHtml(guide.successEvidence)}</dd>
          <dt>Failure recovery</dt>
          <dd>${escapeHtml(guide.failureRecovery)}</dd>
        </dl>
      </section>`;
  }

  function renderLesson(lesson) {
    const index = lessons.findIndex((item) => item.slug === lesson.slug);
    const previous = index > 0 ? lessons[index - 1] : null;
    const next = index < lessons.length - 1 ? lessons[index + 1] : null;
    const savedDraft = drafts[lesson.slug] ?? lesson.practice.starterCode;

    document.title = `${lesson.title} · Industrial-Strength AI Agents`;
    app.innerHTML = `
      <header class="lesson-header">
        <p class="eyebrow">Module ${lesson.module} · ${escapeHtml(lesson.level)}</p>
        <h1>${escapeHtml(lesson.title)}</h1>
        <p class="summary">${escapeHtml(lesson.summary)}</p>
        <div class="lesson-meta">
          <span class="chip">${escapeHtml(lesson.duration)}</span>
          <span class="chip">Project stage ${escapeHtml(lesson.projectStage)}</span>
          <span class="chip">Theory + lab + checkpoint</span>
        </div>
      </header>

      <div class="lesson-layout">
        <article class="lesson-body">
          <section id="outcomes" class="content-card">
            <p class="eyebrow">Learning outcomes</p>
            <h2>What you will be able to do</h2>
            <ul class="outcome-list">
              ${lesson.outcomes.map((outcome) => `<li>${escapeHtml(outcome)}</li>`).join("")}
            </ul>
          </section>

          <section id="theory" class="content-card">
            <p class="eyebrow">Part 1 · Theory</p>
            <h2>Understand the main ideas</h2>
            ${lesson.theory.map((section) => `
              <div class="theory-section">
                <h3>${escapeHtml(section.heading)}</h3>
                ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
                ${section.exampleSteps ? `
                  <ol class="example-flow">
                    ${section.exampleSteps.map((step) => `
                      <li>
                        <strong>${escapeHtml(step.name)}</strong>
                        <p>${escapeHtml(step.description)}</p>
                      </li>`).join("")}
                  </ol>` : ""}
                ${section.takeaway ? `<div class="callout"><strong>Rule to remember:</strong> ${escapeHtml(section.takeaway)}</div>` : ""}
              </div>`).join("")}
          </section>

          <section id="example" class="content-card">
            <p class="eyebrow">Worked example</p>
            <h2>${escapeHtml(lesson.workedExample.title)}</h2>
            <p>${escapeHtml(lesson.workedExample.explanation)}</p>
            <pre><code>${escapeHtml(lesson.workedExample.code)}</code></pre>
          </section>

          <section id="practice" class="practice-card">
            <p class="eyebrow">Part 2 · Practice</p>
            <h2>${escapeHtml(lesson.practice.title)}</h2>
            <p>${escapeHtml(lesson.practice.scenario)}</p>
            <ol class="task-list">
              ${lesson.practice.tasks.map((task) => `<li>${escapeHtml(task)}</li>`).join("")}
            </ol>
            ${renderCommandGuide(lesson.practice)}
            ${lesson.practice.codeGuide ? `
              <div class="callout">
                <strong>How to read the starter code</strong>
                <ul>${lesson.practice.codeGuide.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>
              </div>` : ""}

            <div class="workspace">
              <div class="workspace-header"><span>Code draft in your browser</span><span>Saved only here · the server does not run it</span></div>
              <textarea id="code-editor" class="code-editor" spellcheck="false" aria-label="Lesson code draft">${escapeHtml(savedDraft)}</textarea>
              <div class="workspace-actions">
                <button id="save-draft" class="button" type="button">Save draft</button>
                <button id="check-draft" class="button primary" type="button">Check required parts</button>
                <button id="copy-draft" class="button" type="button">Copy</button>
                <button id="reset-draft" class="button" type="button">Reset</button>
              </div>
            </div>
            <div id="draft-feedback" class="feedback" role="status"></div>

            <details>
              <summary>Hints</summary>
              <ul>${lesson.practice.hints.map((hint) => `<li>${escapeHtml(hint)}</li>`).join("")}</ul>
            </details>
            <details>
              <summary>Reference solution</summary>
              <p>Compare this solution with your code. Before you copy anything, make sure you understand why each part exists.</p>
              <pre><code>${escapeHtml(lesson.practice.solution)}</code></pre>
            </details>
          </section>

          <section id="checkpoint" class="quiz-card">
            <p class="eyebrow">Short quiz</p>
            <h2>${escapeHtml(lesson.quiz.question)}</h2>
            <form id="quiz-form">
              ${lesson.quiz.options.map((option, optionIndex) => `
                <label class="quiz-option">
                  <input type="radio" name="quiz-answer" value="${optionIndex}" />
                  ${escapeHtml(option)}
                </label>`).join("")}
              <button class="button primary" type="submit">Check answer</button>
            </form>
            <div id="quiz-feedback" class="feedback" role="status"></div>
          </section>

          <section id="completion" class="content-card">
            <p class="eyebrow">Proof of completion</p>
            <h2>Save evidence of what you completed</h2>
            <ul class="completion-list">
              ${lesson.completionEvidence.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
            <div class="lesson-actions">
              <button id="complete-lesson" class="button ${progress[lesson.slug] ? "success" : "primary"}" type="button">
                ${progress[lesson.slug] ? "Lesson completed ✓" : "Mark lesson complete"}
              </button>
              <span id="completion-note">Completion is stored in this browser.</span>
            </div>
          </section>

          <nav class="pager" aria-label="Lesson navigation">
            ${previous ? `<a class="button" href="${lessonUrl(previous)}">← ${escapeHtml(previous.shortTitle)}</a>` : `<a class="button" href="/course">← Course home</a>`}
            ${next ? `<a class="button primary" href="${lessonUrl(next)}">${escapeHtml(next.shortTitle)} →</a>` : `<a class="button success" href="/course">Review course progress</a>`}
          </nav>
        </article>

        <nav class="lesson-outline" aria-label="On this page">
          <strong>On this page</strong>
          <a href="#outcomes">Learning outcomes</a>
          <a href="#theory">Theory</a>
          <a href="#example">Worked example</a>
          <a href="#practice">Coding practice</a>
          <a href="#checkpoint">Knowledge checkpoint</a>
          <a href="#completion">Completion evidence</a>
        </nav>
      </div>`;

    wireLessonInteractions(lesson);
  }

  function wireLessonInteractions(lesson) {
    const editor = document.querySelector("#code-editor");
    const draftFeedback = document.querySelector("#draft-feedback");
    const quizForm = document.querySelector("#quiz-form");
    const quizFeedback = document.querySelector("#quiz-feedback");
    const completeButton = document.querySelector("#complete-lesson");

    document.querySelector("#save-draft").addEventListener("click", () => {
      drafts[lesson.slug] = editor.value;
      writeStorage(DRAFTS_KEY, drafts);
      showFeedback(draftFeedback, "good", "Draft saved in this browser.");
    });

    document.querySelector("#check-draft").addEventListener("click", () => {
      const source = editor.value.toLowerCase();
      const failed = lesson.practice.checks.filter((check) =>
        !check.includes.every((token) => source.includes(token.toLowerCase()))
      );
      if (!failed.length) {
        showFeedback(draftFeedback, "good", "All structural checks pass. Run the real repository tests locally before treating the lab as complete.");
        return;
      }
      const missing = failed.map((check) => check.label).join("; ");
      showFeedback(draftFeedback, "warn", `Review these requirements: ${missing}.`);
    });

    document.querySelector("#copy-draft").addEventListener("click", async () => {
      await navigator.clipboard.writeText(editor.value);
      showFeedback(draftFeedback, "good", "Draft copied to the clipboard.");
    });

    document.querySelector("#reset-draft").addEventListener("click", () => {
      editor.value = lesson.practice.starterCode;
      delete drafts[lesson.slug];
      writeStorage(DRAFTS_KEY, drafts);
      showFeedback(draftFeedback, "warn", "Draft reset to the starter code.");
    });

    quizForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const selected = new FormData(quizForm).get("quiz-answer");
      if (selected === null) {
        showFeedback(quizFeedback, "warn", "Choose an answer before checking the checkpoint.");
        return;
      }
      const correct = Number(selected) === lesson.quiz.answer;
      showFeedback(quizFeedback, correct ? "good" : "bad", `${correct ? "Correct." : "Not yet."} ${lesson.quiz.explanation}`);
    });

    completeButton.addEventListener("click", () => {
      progress[lesson.slug] = !progress[lesson.slug];
      writeStorage(PROGRESS_KEY, progress);
      completeButton.textContent = progress[lesson.slug] ? "Lesson completed ✓" : "Mark lesson complete";
      completeButton.className = `button ${progress[lesson.slug] ? "success" : "primary"}`;
      renderNavigation(lesson.slug);
      updateProgress();
    });
  }

  function showFeedback(element, kind, message) {
    element.className = `feedback show ${kind}`;
    element.textContent = message;
  }

  function renderNotFound() {
    document.title = "Lesson not found · Industrial-Strength AI Agents";
    app.replaceChildren(document.querySelector("#error-template").content.cloneNode(true));
  }

  async function start() {
    try {
      const response = await fetch(COURSE_DATA_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`Course data returned ${response.status}`);
      const payload = await response.json();
      lessons = payload.lessons;
      app.classList.remove("loading-card");
      const slug = currentSlug();
      renderNavigation(slug);
      updateProgress();

      if (!slug) {
        renderCourseHome();
        return;
      }
      const lesson = lessons.find((item) => item.slug === slug);
      if (!lesson) {
        renderNotFound();
        return;
      }
      renderLesson(lesson);
    } catch (error) {
      app.innerHTML = `<section class="empty-state"><h1>Course content could not load</h1><p>${escapeHtml(error.message)}</p></section>`;
    }
  }

  menuButton.addEventListener("click", () => {
    const open = sidebar.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  lessonNav.addEventListener("click", () => {
    sidebar.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });

  start();
})();
