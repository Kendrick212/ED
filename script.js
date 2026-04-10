// Guest Data
const guests = {
  "eddie": { "message": "Tonight is yours, Eddie. Every detail of this evening was made with you in mind. Enjoy every second of it." },
  "westside": { "message": "Best, your presence here means everything. Eddie is lucky to call you his person." },
  "kendrick": { "message": "Kendrick, few people bring the kind of energy you do. Eddie wouldn't have this night without you in his corner." },
  "teygah": { "message": "Tega, your bond with Eddie is one of a kind. Tonight we celebrate him, and that includes celebrating you too." },
  "vincent": { "message": "Vicent, you've shown up for Eddie in ways that matter. Tonight, we're glad you're here." },
  "godwin": { "message": "Goddey, Eddie keeps the real ones close — and you're proof of that. Welcome." },
  "gabby": { "message": "Gabby, your friendship with Eddie is something special. Tonight is a celebration of him and everyone he loves." },
  "emmanuel": { "message": "Emmanuel, Eddie speaks of you with nothing but love. We're glad you made it tonight." },
  "jeffery": { "message": "Ekhoe, your presence at this table means a lot. Tonight we celebrate a great man together." },
  "wafer": { "message": "Weafer, Eddie is surrounded by good people tonight — and you're one of the reasons why." },
  "roland": { "message": "Roland, tonight is about Eddie, and the fact that you're here says everything about your friendship." },
  "mk": { "message": "MK, real ones show up. You're here, and that's what counts. Enjoy the night." },
  "barry": { "message": "Barry, Eddie's circle is built on loyalty and good energy. You fit right in. Welcome." },
  "presh": { "message": "Presh, tonight is filled with people who love Eddie — and you're one of them. We're glad you're here." },
  "brume": { "message": "Brume, Eddie keeps his people close. Tonight you're exactly where you're supposed to be." },
  "alicia": { "message": "Alicia, your warmth adds something special to any room. Tonight is no different. Welcome." },
  "emp": { "message": "EMP, tonight belongs to Eddie — and every good night needs the right people in it. You're one of them." }
};

document.addEventListener("DOMContentLoaded", () => {
    // 0. Setup Custom Persistent Canvas
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const customConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true
    });

    // Fire Confetti Bursts
    setTimeout(() => {
        // Left edge burst
        customConfetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0, y: 0.6 },
            angle: 60
        });
        
        // Right edge burst
        customConfetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 1, y: 0.6 },
            angle: 120
        });
    }, 250);

    // Simulate Settled Floor Confetti
    const floorBox = document.createElement('div');
    floorBox.style.position = 'absolute';
    floorBox.style.bottom = '0';
    floorBox.style.left = '0';
    floorBox.style.width = '100%';
    floorBox.style.height = '200px';
    floorBox.style.overflow = 'hidden';
    floorBox.style.zIndex = '0';
    floorBox.style.pointerEvents = 'none';
    
    document.body.style.position = 'relative';

    const colors = ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#fcff42', '#ffa62d', '#ff36ff'];
    for (let i = 0; i < 120; i++) {
        const conf = document.createElement('div');
        conf.style.position = 'absolute';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const isRect = Math.random() > 0.5;
        conf.style.width = isRect ? '10px' : '8px';
        conf.style.height = isRect ? '20px' : '8px';
        
        conf.style.left = Math.random() * 100 + '%';
        const bottomOffset = Math.pow(Math.random(), 3) * 150; 
        conf.style.bottom = bottomOffset + 'px';
        
        const rot = Math.random() * 360;
        const tiltX = Math.random() * 60;
        const tiltY = Math.random() * 60;
        conf.style.transform = `rotate(${rot}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        conf.style.opacity = (Math.random() * 0.4 + 0.6).toString();
        
        floorBox.appendChild(conf);
    }
    document.body.appendChild(floorBox);

    // 1. Handle Guest Greeting
    const urlParams = new URLSearchParams(window.location.search);
    let guestParam = urlParams.get('guest');
    
    const welcomeName = document.getElementById("welcome-name");
    const welcomeMessage = document.getElementById("welcome-message");
    
    if (guestParam) {
        guestParam = guestParam.toLowerCase().trim();
        if (guests[guestParam]) {
            // Capitalize guest name properly
            const isAcronym = guestParam === 'mk' || guestParam === 'emp';
            const guestName = isAcronym ? guestParam.toUpperCase() : guestParam.charAt(0).toUpperCase() + guestParam.slice(1);
            
            welcomeName.textContent = `Welcome, ${guestName}.`;
            welcomeMessage.textContent = guests[guestParam].message;
        }
    }
    
    // Trigger fade-in animation
    setTimeout(() => {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => el.classList.add('visible'));
    }, 150);

    // 2. Tic Tac Toe Game
    const board = document.getElementById("ttt-board");
    const cells = document.querySelectorAll(".ttt-cell");
    const statusTxt = document.getElementById("ttt-status");
    const resetBtn = document.getElementById("ttt-reset");
    const wonEl = document.getElementById("ttt-won");
    const drawEl = document.getElementById("ttt-draw");
    const lostEl = document.getElementById("ttt-lost");

    let origBoard;
    const huPlayer = 'X';
    const aiPlayer = 'O';
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [6, 4, 2]
    ];
    let scores = { won: 0, draw: 0, lost: 0 };
    let gameActive = true;

    startGame();

    function startGame() {
        gameActive = true;
        statusTxt.textContent = "Your Turn";
        origBoard = Array.from(Array(9).keys());
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken');
            cell.addEventListener('click', turnClick, false);
        });
    }

    function turnClick(square) {
        if (gameActive && typeof origBoard[square.target.dataset.index] == 'number') {
            turn(square.target.dataset.index, huPlayer);
            if (!checkTie() && gameActive) {
                statusTxt.textContent = "Eddie's Turn";
                setTimeout(() => turn(bestSpot(), aiPlayer), 300);
            }
        }
    }

    function turn(squareId, player) {
        origBoard[squareId] = player;
        cells[squareId].textContent = player;
        cells[squareId].classList.add('taken');
        let gameWon = checkWin(origBoard, player);
        if (gameWon) gameOver(gameWon);
        else {
            if (player === aiPlayer && gameActive) {
                statusTxt.textContent = "Your Turn";
                checkTie();
            }
        }
    }

    function checkWin(board, player) {
        let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
        let gameWon = null;
        for (let [index, win] of winCombos.entries()) {
            if (win.every(elem => plays.indexOf(elem) > -1)) {
                gameWon = { index: index, player: player };
                break;
            }
        }
        return gameWon;
    }

    function gameOver(gameWon) {
        gameActive = false;
        if (gameWon.player === huPlayer) {
            statusTxt.textContent = "You Won!";
            scores.won++;
            wonEl.textContent = scores.won;
        } else {
            statusTxt.textContent = "Eddie Won!";
            scores.lost++;
            lostEl.textContent = scores.lost;
        }
        cells.forEach(cell => cell.removeEventListener('click', turnClick, false));
    }

    function emptySquares() {
        return origBoard.filter(s => typeof s == 'number');
    }

    function bestSpot() {
        return minimax(origBoard, aiPlayer).index;
    }

    function checkTie() {
        if (emptySquares().length == 0 && gameActive) {
            statusTxt.textContent = "It's a Draw!";
            scores.draw++;
            drawEl.textContent = scores.draw;
            cells.forEach(cell => cell.removeEventListener('click', turnClick, false));
            gameActive = false;
            return true;
        }
        return false;
    }

    function minimax(newBoard, player) {
        var availSpots = emptySquares();

        if (checkWin(newBoard, huPlayer)) {
            return { score: -10 };
        } else if (checkWin(newBoard, aiPlayer)) {
            return { score: 10 };
        } else if (availSpots.length === 0) {
            return { score: 0 };
        }

        var moves = [];
        for (var i = 0; i < availSpots.length; i++) {
            var move = {};
            move.index = newBoard[availSpots[i]];
            newBoard[availSpots[i]] = player;

            if (player == aiPlayer) {
                var result = minimax(newBoard, huPlayer);
                move.score = result.score;
            } else {
                var result = minimax(newBoard, aiPlayer);
                move.score = result.score;
            }

            newBoard[availSpots[i]] = move.index;
            moves.push(move);
        }

        var bestMove;
        if (player === aiPlayer) {
            var bestScore = -10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 10000;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }

    resetBtn.addEventListener('click', startGame);

    // 3. Handle Guestbook
    const form = document.getElementById("guestbook-form");
    const successMsg = document.getElementById("guestbook-success");
    const errorMsg = document.getElementById("guestbook-error");
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        successMsg.style.display = "none";
        errorMsg.style.display = "none";
        
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        
        const data = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                successMsg.style.display = "block";
                form.reset();
            } else {
                errorMsg.style.display = "block";
            }
        } catch (error) {
            errorMsg.style.display = "block";
        }
        
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    });
});
