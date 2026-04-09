// Guest Data
const guests = {
  "eddie": { "message": "Tonight is yours, Eddie. Every detail of this evening was made with you in mind. Enjoy every second of it." },
  "best": { "message": "Best, your presence here means everything. Eddie is lucky to call you his person." },
  "kendrick": { "message": "Kendrick, few people bring the kind of energy you do. Eddie wouldn't have this night without you in his corner." },
  "tega": { "message": "Tega, your bond with Eddie is one of a kind. Tonight we celebrate him, and that includes celebrating you too." },
  "vicent": { "message": "Vicent, you've shown up for Eddie in ways that matter. Tonight, we're glad you're here." },
  "goddey": { "message": "Goddey, Eddie keeps the real ones close — and you're proof of that. Welcome." },
  "gabby": { "message": "Gabby, your friendship with Eddie is something special. Tonight is a celebration of him and everyone he loves." },
  "emmanuel": { "message": "Emmanuel, Eddie speaks of you with nothing but love. We're glad you made it tonight." },
  "ekhoe": { "message": "Ekhoe, your presence at this table means a lot. Tonight we celebrate a great man together." },
  "weafer": { "message": "Weafer, Eddie is surrounded by good people tonight — and you're one of the reasons why." },
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

    // 2. Handle Guestbook
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
