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
    const entriesDiv = document.getElementById("guestbook-entries");
    const STORAGE_KEY = "eddie_birthday_guestbook";

    // Load existing messages
    const loadMessages = () => {
        const messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        entriesDiv.innerHTML = "";
        
        messages.forEach(msg => {
            const card = document.createElement("div");
            card.className = "entry-card fade-in visible";
            
            const nameEl = document.createElement("div");
            nameEl.className = "entry-name";
            nameEl.textContent = msg.name;
            
            const textEl = document.createElement("div");
            textEl.className = "entry-text";
            textEl.textContent = msg.message;
            
            card.appendChild(nameEl);
            card.appendChild(textEl);
            entriesDiv.prepend(card); // newest first
        });
    };

    loadMessages();

    // Submit new message
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById("gb-name").value.trim();
        const messageInput = document.getElementById("gb-message").value.trim();
        
        if (nameInput && messageInput) {
            const messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            messages.push({
                name: nameInput,
                message: messageInput,
                date: new Date().toISOString()
            });
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
            
            // Clear form
            form.reset();
            
            // Reload messages
            loadMessages();
        }
    });
});
