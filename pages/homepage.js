document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("bgMusic");
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

/* Chat Cloud Logic */
document.addEventListener('DOMContentLoaded', () => {
    
    // Character-specific messages
      const samuraiMessages = [
        '“Evolve the mind.<br>Upgrade the soul.”',
        '“Technology is the path.<br>Discipline is the guide.”',
        '“In stillness,<br>the system awakens.”',
        '“Build yourself<br>before you build machines.”'
    ];

    const dokeshiMessages = [
        '“Laugh in chaos.<br>Control in silence.”',
        '“The mask smiles.<br>The system calculates.”',
        '“Glitch the world.<br>Rewrite your fate.”',
        '“Madness is noise.<br>Precision is power.”',
        '“Behind every joke,<br>a coded truth.”',
        '“Dance in disorder.<br>Strike with logic.”',
        '“A fool to the world,<br>a weapon within.”',
        '“Chaos entertains.<br>Control dominates.”',
        '“Smile like a jester,<br>think like a machine.”',
        '“Break patterns.<br>Become the anomaly.”',
        '“Emotion is the disguise.<br>Calculation is real.”',
        '“Play the game.<br>Then rewrite the rules.”'
    ];

    const cryoMessages = [
        '“Cool execution.<br>Absolute zero tolerance.”',
        '“Freeze the moment.<br>Analyze the data.”',
        '“Ice in the veins.<br>Fire in the code.”',
        '“Efficiency is cold.<br>Perfection is frozen.”',
        '“The world slows down.<br>I move faster.”',
        '“Solidify your resolve.<br>Shatter the obstacles.”'
    ];
    
    const chatCloudContainer = document.getElementById('chatCloudContainer');
    const chatCloudText = document.getElementById('chatCloudText');
    if (!chatCloudContainer || !chatCloudText) return;

    let isVisible = false;
    let timerId = null; 

    function showRandomMessage(force = false) {
        if (isVisible && !force) return; 
        
        // Clear existing timer if forcing update to avoid double triggers
        if (force && timerId) {
             clearTimeout(timerId);
             timerId = null;
        }

        // Determine current character
        const desktopImg = document.querySelector('.samurai-img');
        let currentSrc = desktopImg ? desktopImg.src : '';
        
        let messages = samuraiMessages;
        let name = 'MECHASAMURAI';

        if (currentSrc.includes('dokeshi')) {
            messages = dokeshiMessages;
            name = 'MECHA DŌKESHI';
        } else if (currentSrc.includes('cryomecha')) {
            messages = cryoMessages;
            name = 'CRYO MECHA';
        }

        // Pick a random message
        const randomIndex = Math.floor(Math.random() * messages.length);
        
        chatCloudText.innerHTML = `<strong>${name}:</strong><br>` + messages[randomIndex];
        
        // Show
        chatCloudContainer.classList.remove('show-message'); // Reset animation
        void chatCloudContainer.offsetWidth; // Trigger reflow
        chatCloudContainer.classList.add('show-message');
        isVisible = true;

        // Hide after 4 seconds
        setTimeout(() => {
            chatCloudContainer.classList.remove('show-message');
            isVisible = false;
            
            // Schedule next message after random delay (e.g., 2-5 seconds)
            const nextDelay = Math.random() * 3000 + 2000;
            timerId = setTimeout(showRandomMessage, nextDelay);
            
        }, force ? 4000 : 4000); 
    }

    // Start the cycle after initial delay
    timerId = setTimeout(showRandomMessage, 3000);

    // Listen for character change events
    document.addEventListener('characterChanged', () => {
         showRandomMessage(true);
    });
});


/* =========================================
   CHATBOT LOGIC
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbotIcon');
    const chatbotModal = document.getElementById('chatbotModal');
    const closeChatbot = document.querySelector('.close-chatbot');
    const chatbotBody = document.getElementById('chatbot-body');

    // data for the chatbot
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


    // required functions for chatbot 
    function appendMessage(text, sender) {
        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender === 'user' ? 'user-bubble' : 'bot-bubble'}`;
        bubble.innerHTML = text;
        chatbotBody.appendChild(bubble);
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function renderOptions() {
        // Remove existing options if any
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
        
        // 1. Remove options
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

/* =========================================
   CHANGE BACKGROUND & CHARACTER LOGIC
   ========================================= */

// Modal Logic
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
    }
}

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// Close modal if clicked outside content
window.onclick = function(event) {
    if (event.target.classList.contains('bg-modal')) {
        event.target.style.display = "none";
    }
}

window.changeBackground = function(imagename) {
    document.body.style.backgroundImage = `url('../assets/${imagename}')`;
    closeModal('bgModal');
}

window.changeCharacter = function(charName) {
    const desktopImg = document.querySelector('.samurai-img');
    const mobileImg = document.querySelector('.samurai-img-mobile');
    const bubbleImg = document.querySelector('.chat-cloud-bg');
    const container = document.querySelector('.mecha-samurai-container');
    
    let imgSrc = 'mechasamurai.png';
    let mobileImgSrc = 'mechasamurai_mobile.png';
    let bubbleSrc = 'chatcloud1.png';
    let altText = 'Mecha Samurai';

    // Reset classes
    if (container) {
        container.classList.remove('mechadokeshi-active');
        container.classList.remove('cryomecha-active');
    }

    if (charName === 'mechadokeshi') {
        imgSrc = 'mechadokeshi.png';
        mobileImgSrc = 'mechadokeshi.png'; // Assuming same if mobile not found
        bubbleSrc = 'mechadokeshi_chatbubble.png';
        altText = 'Mecha Dōkeshi';
        if (container) container.classList.add('mechadokeshi-active');
    } else if (charName === 'cryomecha') {
        imgSrc = 'cryomecha.png';
        mobileImgSrc = 'cryomecha.png'; // Assuming same
        bubbleSrc = 'cryomechadialogue.png';
        altText = 'Cryo Mecha';
        if (container) container.classList.add('cryomecha-active');
    }
    
    // Update Images
    if (desktopImg) {
        desktopImg.src = `../assets/${imgSrc}`;
        desktopImg.alt = altText;
    }
    if (mobileImg) {
        mobileImg.src = `../assets/${mobileImgSrc}`;
        mobileImg.alt = altText;
    }
    if (bubbleImg) {
        bubbleImg.src = `../assets/${bubbleSrc}`;
    }
    
    // Dispatch event to update chat messages immediately
    const event = new Event('characterChanged');
    document.dispatchEvent(event);

    closeModal('charModal');
}



