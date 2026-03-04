// API call to get all lessons
const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then((res) => res.json())
        .then((json) => displayData(json.data));
}

const displayData = (lessons) => {
    lessons.forEach(elem => console.log(elem))

    // 1. Get the container and make it empty
    const levelContainer = document.getElementById("button-container");
    levelContainer.innerHTML = "";

    //2. Get into every lessons
    for (let lesson of lessons) {

        // 3. Create Element
        const btnDiv = document.createElement("button")
        btnDiv.innerHTML = `<i class="fa-brands fa-leanpub"></i> Lesson -${lesson.level_no}`
        btnDiv.classList.add("btn", "btn-outline", "btn-primary");
        btnDiv.setAttribute("onclick", `loadWords(${lesson.level_no})`);
        btnDiv.setAttribute("id", `lesson-${lesson.level_no}`);

        // 4. Append the child
        levelContainer.appendChild(btnDiv);
    }
}

loadLessons();

// API call to get words by level

const loadWords = (id) => {
    for(let i =1; i < 8; i++){
        const allBtns = document.getElementById(`lesson-${i}`);
        allBtns.classList.remove("bg-[rgb(65,42,213)]", "text-white");
        allBtns.classList.add("bg-white", "text-[rgb(65,42,213)]");
    }
    const caller = document.getElementById(`lesson-${id}`);
    caller.classList.remove("bg-white", "text-[rgb(65,42,213)]");
    caller.classList.add("bg-[rgb(65,42,213)]", "text-white");

    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((json) => displayWords(json.data));

    
}

// "id": 14,
// "level": 2,
// "word": "Nourish",
// "meaning": "পুষ্টি যোগানো",
// "pronunciation": "নরিশ"

const displayWords = (words) => {
    // 1. Get the container and make it empty
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    // Handling Empty State
    if(words.length == 0){
        wordContainer.classList.remove("grid", "grid-cols-3");
        wordContainer.innerHTML =
        `
        <div
            class="bg-[#F8F8F8] rounded-3xl py-16 text-center font-bangla space-y-[15px]"
        >
            <img src="./assets/alert-error.png" alt="empty" class="mx-auto">
            <p class="text-sm text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h3 class="text-4xl">নেক্সট Lesson এ যান</h3>
        </div>`;
        return 0;
    }

    wordContainer.classList.add("grid", "grid-cols-3");
    //2. Get into every lessons
    for (let word of words) {

        // 3. Create Element
        const wordCard = document.createElement("div")
        wordCard.innerHTML = `<h3 class="mb-6 font-bold text-3xl">${word.word}</h3>
            <p class="mb-6 font-medium text-xl font-bangla">Meaning/Pronunciation</p>
            <p class="font-semibold text-3xl text-[#18181B]/80">${word.meaning ? word.meaning : "শব্দ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "শব্দ পাওয়া যায়নি"}</p>
            <div class="flex justify-between h-fit items-end mt-10">
            <button class="btn w-[56px] h-[56px] flex items-center justify-center bg-[#1A91FF]/10 rounded-lg hover:bg-[#1A91FF]/30 hover:cursor-pointer"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn w-[56px] h-[56px] flex items-center justify-center bg-[#1A91FF]/10 rounded-lg hover:bg-[#1A91FF]/30 hover:cursor-pointer"><i class="fa-solid fa-volume-high"></i></button>
            </div>`
        wordCard.classList.add("wordCard", "p-[56px]", "text-center", "bg-white", "rounded-xl", "h-[372px]");
        // btnDiv.setAttribute("onclick", `loadWords(${lesson.level_no})`);
        // 4. Append the child
        wordContainer.appendChild(wordCard);
    }
}