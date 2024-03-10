const typeText = document.querySelector(".typing-text p"),
inField = document.querySelector(".wrapper .input-field"),
retryBtn = document.querySelector(".content button"),
time = document.querySelector(".time span b"),
mistake = document.querySelector(".mistake span"),
wpm = document.querySelector(".wpm span"),
cpm = document.querySelector(".cpm span");
prompt = document.querySelector(".prompt");

let timer,
maxTime = 60,
timeLeft = maxTime,
chIndex = miss = isTyping = 0;

function loadPara() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typeText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typeText.innerHTML += span;
    });
    typeText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inField.focus());
    typeText.addEventListener("click", () => inField.focus());
}

function startTyping() {
    let characters = typeText.querySelectorAll("span");
    let typedChar = inField.value.split("")[chIndex];
    if(timeLeft > 0) {
        prompt.innerText = "Start Typing!!!";
    }
    else{
        prompt.innerText = "Stop!! Your time has finished now.";
    }
    if(chIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(startTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(chIndex > 0) {
                chIndex--;
                if(characters[chIndex].classList.contains("incorrect")) {
                    miss--;
                }
                characters[chIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[chIndex].innerText == typedChar) {
                characters[chIndex].classList.add("correct");
            } else {
                miss++;
                characters[chIndex].classList.add("incorrect");
            }
            chIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[chIndex].classList.add("active");

        let words = Math.round(((chIndex - miss)  / 5) / (maxTime - timeLeft) * 60);
        words = words < 0 || !words || words === Infinity ? 0 : words;
        
        wpm.innerText = words;
        mistake.innerText = miss;
        cpm.innerText = chIndex - miss;
    } else {
        clearInterval(timer);
        inField.value = "";
    }   
}

function startTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        let words = Math.round(((chIndex - miss)  / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = words;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadPara();
    clearInterval(timer);
    timeLeft = maxTime;
    chIndex = miss = isTyping = 0;
    inField.value = "";
    time.innerText = timeLeft;
    wpm.innerText = 0;
    mistake.innerText = 0;
    cpm.innerText = 0;
    prompt.innerText = "Unleash your inner typist and smash your high score in our speed typing test app!";
}

loadPara();
inField.addEventListener("input", startTyping);
retryBtn.addEventListener("click", resetGame);