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
    for(let lesson of lessons){

    // 3. Create Element
    const btnDiv = document.createElement("button")
    btnDiv.innerHTML = `<i class="fa-brands fa-leanpub"></i> Lesson -${lesson.level_no}`
    btnDiv.classList.add("btn", "btn-outline", "btn-primary");
    btnDiv.setAttribute("onclick", `loadWords(${lesson.level_no})`);

    // 4. Append the child
    levelContainer.appendChild(btnDiv);
    }
}

loadLessons();

// API call to get words by level

const loadWords = (id) => {
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

displayWords = (words) => {
    words.forEach(item => console.log(item));

    // 1. Get the container and make it empty
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    wordContainer.classList.add("grid", "grid-cols-3");
    
    //2. Get into every lessons
    for(let word of words){

    // 3. Create Element
    const wordCard = document.createElement("div")
    wordCard.innerHTML = `<h3 class="mb-6 font-bold text-[2rem]">${word.word}</h3>
    <p class="mb-6 font-medium text-xl font-bangla">Meaning/Pronunciation</p>
    <p class="font-semibold text-[2rem] text-[#18181B]/80">${word.meaning}/${word.pronunciation}</p>
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