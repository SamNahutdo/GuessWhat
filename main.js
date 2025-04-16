window.onload = function() {
    const container = document.getElementById('loadingContainer');
    const result = document.getElementById('result');
    const progressFill = document.querySelector('.progress-fill');
    const loadingText = document.getElementById('loadingText');
    const musicPlayer = document.getElementById('victoryMusic');
    
    const customAlert = document.getElementById('customAlert');
    const alertTitle = document.getElementById('alertTitle');
    const alertMessage = document.getElementById('alertMessage');
    const alertOk = document.getElementById('alertOk');
    
    const customPrompt = document.getElementById('customPrompt');
    const promptTitle = document.getElementById('promptTitle');
    const promptMessage = document.getElementById('promptMessage');
    const promptInput = document.getElementById('promptInput');
    const promptSubmit = document.getElementById('promptSubmit');
    const promptCancel = document.getElementById('promptCancel');
    
    let userInput = null;
    
    function showAlert(title, message, callback) {
        alertTitle.textContent = title;
        alertMessage.textContent = message;
        customAlert.style.display = 'flex';
        
        alertOk.onclick = function() {
            customAlert.style.display = 'none';
            if (callback) callback();
        };
    }
    
    function showPrompt(title, message, callback) {
        promptTitle.textContent = title;
        promptMessage.textContent = message;
        promptInput.value = '';
        customPrompt.style.display = 'flex';
        
        function handleSubmit() {
            const value = promptInput.value.trim();
            customPrompt.style.display = 'none';
            if (callback) callback(value);
        }
        
        promptSubmit.onclick = handleSubmit;
        promptInput.onkeypress = function(e) {
            if (e.key === 'Enter') handleSubmit();
        };
        
        promptCancel.onclick = function() {
            customPrompt.style.display = 'none';
            if (callback) callback(null);
        };
    }
    
    function getNumberInput() {
        showPrompt("Tagnaon nako imong gihunahuna", "Pag huna2 og number 1-10, then i butang sa ubos", function(value) {
            if (value === null) {
                showAlert("Oops!", "Dili pwede walay number!", getNumberInput);
            } else if (value >= 1 && value <= 10) {
                userInput = value;
                startLoading();
            } else {
                showAlert("Pag tarung bi!", "Kinahanglan number 1 hangtod 10 lang!", getNumberInput);
            }
        });
    }
    
    getNumberInput();
    
    function startLoading() {
        container.style.display = 'block';
        
        const messages = [
            "Aysa ga huna2 pas SamNahutdo",
            "Gihuna2 pa daw imong number",
            "Wait gi analyze pa niya",
            "Ago gamitan sa dei niyag formula",
            "Gi solve pa daw gamit geometry sequence",
            "Wait hapit na matagnaan niya",
            "Humanag hunahuna niya dia ra"
        ];
        
        let messageIndex = 0;
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            progressFill.style.width = progress + '%';
            
            if (progress % 15 === 0 && messageIndex < messages.length) {
                loadingText.textContent = messages[messageIndex];
                messageIndex++;
            }


            if (progress >= 100) {
    clearInterval(interval);
    container.style.display = 'none';

    result.innerHTML = `<div id="guessLine">Ang imong gi huna2 daw nga number kay ${userInput}</div>`;


    setTimeout(() => {
        
        const guessLine = document.getElementById('guessLine');
        if (guessLine) guessLine.remove();

        result.innerHTML += `<div>Wait naa koy music...</div>`;

        musicPlayer.play();

        const lyrics = [
            "Oh woah oh oh oh",
            "Oh woah oh oh oh",
            "Ako'y alipin ng pagibig mo (alipin ng pagibig mo)",
            "Handang ibigin ang isang tulad mo (ibigin ang isang tulad mo)",
            "Hanggat ang puso mo'y sa akin lang hindi ka na malilinlang",
            "Ikaw ang ilaw sa dilim at ang liwanag ng mga bituin"
        ];

        let i = 0;
        const lyricInterval = setInterval(() => {
            if (i < lyrics.length) {
                result.innerHTML += `<div>${lyrics[i]}</div>`;
                i++;
            } else {
                clearInterval(lyricInterval);
            }
        }, 5000);

    }, 1500); 
}

            
        }, 100);
    }
};
