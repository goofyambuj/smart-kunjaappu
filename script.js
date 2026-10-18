(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const introPage = $("introPage");
  const puzzlePage = $("puzzlePage");
  const congratsPage = $("congratsPage");
  const board = $("puzzleBoard");
  const progressText = $("progressText");
  const progressBar = $("progressBar");
  const statusText = $("statusText");

  const ROWS = 8;
  const COLS = 4;
  const TOTAL = ROWS * COLS;
  const IMAGE_URL = "assets/kunji-photo.jpg";
  let tiles = [];
  let moves = 0;
  let puzzleImageReady = false;

  function showPage(page) {
    [introPage, puzzlePage, congratsPage].forEach((p) => {
      const active = p === page;
      p.hidden = !active;
      p.classList.toggle("active", active);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function updateProgress() {
    progressText.textContent = `${moves} ${moves === 1 ? "move" : "moves"}`;
    const placed = tiles.reduce((sum, value, index) => sum + (value === index ? 1 : 0), 0);
    progressBar.style.width = `${(placed / TOTAL) * 100}%`;
    statusText.textContent = placed === TOTAL
      ? "Every piece found its place. ♡"
      : "Every move brings it closer.";
  }

  function isSolved() {
    return tiles.every((value, index) => value === index);
  }

  function canMove(index) {
    const empty = tiles.indexOf(TOTAL - 1);
    const row = Math.floor(index / COLS), col = index % COLS;
    const emptyRow = Math.floor(empty / COLS), emptyCol = empty % COLS;
    return Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;
  }

  function renderBoard() {
    board.replaceChildren();
    tiles.forEach((tileValue, index) => {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "puzzle-tile";
      tile.setAttribute("aria-label", tileValue === TOTAL - 1
        ? "Empty space"
        : `Tile ${tileValue + 1}${canMove(index) ? ", can slide" : ""}`);
      if (tileValue === TOTAL - 1) {
        tile.classList.add("empty");
        tile.disabled = true;
      } else {
        const row = Math.floor(tileValue / COLS);
        const col = tileValue % COLS;
        tile.style.backgroundPosition = `${(col / (COLS - 1)) * 100}% ${(row / (ROWS - 1)) * 100}%`;
        tile.dataset.number = String(tileValue + 1);
        if (canMove(index)) tile.classList.add("movable");
        tile.addEventListener("click", () => moveTile(index));
      }
      board.appendChild(tile);
    });
    updateProgress();
  }

  function moveTile(index) {
    if (!canMove(index)) {
      statusText.textContent = "Choose a tile beside the empty space.";
      return;
    }
    const emptyIndex = tiles.indexOf(TOTAL - 1);
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    moves++;
    renderBoard();
    if (isSolved()) {
      statusText.textContent = "You did it! Opening your surprise…";
      window.setTimeout(() => showPage(congratsPage), 700);
    }
  }

  // Start from a solved board and make only legal moves, so the puzzle is always solvable.
  function shuffleBoard() {
    tiles = Array.from({ length: TOTAL }, (_, i) => i);
    let previousEmpty = -1;
    const shuffleSteps = 260;
    for (let step = 0; step < shuffleSteps; step++) {
      const empty = tiles.indexOf(TOTAL - 1);
      const row = Math.floor(empty / COLS), col = empty % COLS;
      const candidates = [];
      if (row > 0) candidates.push(empty - COLS);
      if (row < ROWS - 1) candidates.push(empty + COLS);
      if (col > 0) candidates.push(empty - 1);
      if (col < COLS - 1) candidates.push(empty + 1);
      const withoutUndo = candidates.filter((candidate) => candidate !== previousEmpty);
      const choices = withoutUndo.length ? withoutUndo : candidates;
      const next = choices[Math.floor(Math.random() * choices.length)];
      [tiles[empty], tiles[next]] = [tiles[next], tiles[empty]];
      previousEmpty = empty;
    }
    // Avoid the unlikely case of ending solved.
    if (isSolved()) {
      [tiles[0], tiles[1]] = [tiles[1], tiles[0]];
    }
    moves = 0;
    renderBoard();
    statusText.textContent = "Fresh shuffle! Find where each piece belongs.";
  }

  function loadPuzzleImage() {
    const img = new Image();
    img.onload = () => {
      puzzleImageReady = true;
      board.style.setProperty("--puzzle-image", `url("${IMAGE_URL}")`);
      renderBoard();
    };
    img.onerror = () => {
      puzzleImageReady = false;
      board.style.setProperty("--puzzle-image", "linear-gradient(135deg,#d7c5a9,#f3e6d2)");
      statusText.textContent = "Add your photo as assets/kunji-photo.jpg to use it in the puzzle.";
      renderBoard();
    };
    img.src = IMAGE_URL;
  }

  $("enterButton").addEventListener("click", () => {
    showPage(puzzlePage);
    if (!tiles.length) shuffleBoard();
    if (!puzzleImageReady) loadPuzzleImage();
  });
  $("shuffleButton").addEventListener("click", shuffleBoard);
  $("backButton").addEventListener("click", () => showPage(introPage));
  $("replayButton").addEventListener("click", () => {
    showPage(puzzlePage);
    shuffleBoard();
  });

  // Keep the tile background positions correct after the image has loaded.
  board.style.setProperty("--puzzle-image", `url("${IMAGE_URL}")`);
})();
