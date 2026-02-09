
/*
 * Main Script for Portfolio Intro Animation
 * Controls animations, user interactions, and audio playback.
 */
document.addEventListener("DOMContentLoaded", () => {
    // === SECTION 1: GSAP ANIMATION SEQUENCE ===
    // Initializes the timeline to sequence animations strictly in order
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // 1. Katana enters from the left
    // Starting off-screen to the left (-100% usually works, adjusting for dramatic effect)
    tl.fromTo("#katana", 
        { x: -300, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 1.5, ease: "power3.out" }
    )

    // 2. Paper background appears (fade-in + slight scale-up)
    .fromTo("#paperWrapper", 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=0.5" // Start slightly before katana finishes
    )

    // 3. Name "VED VYAS" image appears with upward motion
    .fromTo("#nameImage", 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    )

    // 4. Japanese text appears letter by letter
    // First, split the text
    const jpText = document.getElementById("japaneseGreeting");
    if (jpText) {
        const chars = jpText.innerText.split("");
        jpText.innerHTML = chars.map(char => `<span class="char">${char}</span>`).join("");
        
        tl.fromTo("#japaneseGreeting .char", 
            { opacity: 0, y: 10 }, 
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
            "-=0.5"
        );
    } else {
        // Fallback if element not found (defensive)
         tl.to("#japaneseGreeting", { opacity: 1, duration: 1 }, "-=0.5");
    }

    // 5. Greeting sentence fades in
    tl.to("#greetingText", 
        { opacity: 1, duration: 1 }, 
        "-=0.5"
    )

    // 6. Continue button appears with bounce
    .fromTo("#buttonWrapper", 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, 
        "-=0.2"
    );

    // === SECTION 2: USER INTERACTION ===
    // Handles the "Continue" click: fades out overlay and stops intro audio
    const continueBtn = document.getElementById("continueBtn");
    if (continueBtn) {
        continueBtn.addEventListener("click", () => {
            // Example action: Fade out the overlay
            gsap.to("#introOverlay", { 
                opacity: 0, 
                duration: 1, 
                onComplete: () => {
                    document.getElementById("introOverlay").style.display = "none";
                    // Proceed to next section or page
                    window.location.href = "pages/homepage.html";
                } 
            });
            // Stop audio when continuing
            const audio = document.getElementById("introAudio");
            if(audio) audio.pause();
        });
    }

    // === SECTION 3: AUDIO CONTROL ===
    // Manages the background music toggle (Play/Pause)
    const audio = document.getElementById("introAudio");
    const btn = document.getElementById("audioBtn");
    let isPlaying = false;

    if (btn && audio) {
        btn.addEventListener("click", () => {
            if (!isPlaying) {
                audio.volume = 0.5;
                audio.play().catch(e => console.log("Audio play failed:", e));
                btn.textContent = "🔊";
                isPlaying = true;
            } else {
                audio.pause();
                btn.textContent = "🔇";
                isPlaying = false;
            }
        });
    }
});

/* =========================================
   CHATBOT LOGIC
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbotIcon');
    const chatbotModal = document.getElementById('chatbotModal');
    const closeChatbot = document.querySelector('.close-chatbot');
    const chatbotBody = document.getElementById('chatbot-body');

    // Chatbot Data
const chatbotQuestions = [
    {
        question: 'Who are you?',
        answer: 'MECHASAMURAI: I am a digital assistant designed to guide visitors through this portfolio.'
    },
    {
        question: 'What is AI?',
        answer: 'MECHASAMURAI: Artificial Intelligence is the ability of machines to simulate human intelligence and make decisions.'
    },
    {
        question: 'How can I contact you?',
        answer: 'MECHASAMURAI: You can reach out through the contact section of this portfolio for collaboration or inquiries.'
    }
];

    // Functions
    function appendMessage(text, sender) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender === 'user' ? 'user-bubble' : 'bot-bubble'}`;
        bubble.innerHTML = text;
        chatbotBody.appendChild(bubble);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function renderOptions() {
        // Remove existing options if any (to prevent duplicates)
        const oldOptions = document.querySelector('.chat-options');
        if (oldOptions) oldOptions.remove();

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'chat-options';
        
        chatbotQuestions.forEach((item, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = item.question;
            btn.addEventListener('click', () => handleQuestionClick(index));
            optionsContainer.appendChild(btn);
        });
        
        chatbotBody.appendChild(optionsContainer);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function handleQuestionClick(index) {
        const item = chatbotQuestions[index];
        
        // 1. Remove options temporarily
        const optionsEl = document.querySelector('.chat-options');
        if(optionsEl) optionsEl.remove();

        // 2. Add User Message
        appendMessage(item.question, 'user');

        // 3. Add Bot Answer after delay
        setTimeout(() => {
            appendMessage(item.answer, 'bot');
            // 4. Show options again
            renderOptions();
        }, 600);
    }

    // Event Listeners
    if (chatbotIcon && chatbotModal) {
        chatbotIcon.addEventListener('click', () => {
             chatbotModal.style.display = 'flex';
             chatbotBody.innerHTML = ''; // Clear previous chat
             // Initial Greeting
             setTimeout(() => {
                 appendMessage("Greetings. I am the MechaSamurai system. How may I assist you?", 'bot');
                 renderOptions();
             }, 300);
        });
    }

    if (closeChatbot) {
        closeChatbot.addEventListener('click', () => {
            chatbotModal.style.display = 'none';
        });
    }

    // Close on click outside
    window.addEventListener('click', (e) => {
        if (e.target === chatbotModal) {
            chatbotModal.style.display = 'none';
        }
    });
});

