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
    const messages = [
        '“Evolve the mind.<br>Upgrade the soul.”',
        '“Technology is the path.<br>Discipline is the guide.”',
        '“In stillness,<br>the system awakens.”',
        '“Build yourself<br>before you build machines.”'
    ];
    
    const chatCloudContainer = document.getElementById('chatCloudContainer');
    const chatCloudText = document.getElementById('chatCloudText');
    if (!chatCloudContainer || !chatCloudText) return;

    let isVisible = false;

    function showRandomMessage() {
        if (isVisible) return; 
        
        // Pick a random message
        const randomIndex = Math.floor(Math.random() * messages.length);
        chatCloudText.innerHTML ='<STRONG>MECHASAMURAI:</STRONG><br>';
        chatCloudText.innerHTML = messages[randomIndex];
        // chatCloudText.innerHTML = '<strong>MECHASAMURAI:</strong><br>' + messages[randomIndex];
        
        // Show
        chatCloudContainer.classList.add('show-message');
        isVisible = true;

        // Hide after 4 seconds
        setTimeout(() => {
            chatCloudContainer.classList.remove('show-message');
            isVisible = false;
            
            // Schedule next message after random delay (e.g., 2-5 seconds)
            const nextDelay = Math.random() * 3000 + 2000;
            setTimeout(showRandomMessage, nextDelay);
            
        }, 4000);
    }

    // Start the cycle after initial delay
    setTimeout(showRandomMessage, 3000);
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

