// API call to get all lessons
const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then((res) => res.json())
        .then((json) => displayData(json.data));
}

// Display all lessons in the UI
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
        btnDiv.classList.add("lesson-btn", "btn", "btn-outline", "btn-primary");
        btnDiv.setAttribute("onclick", `loadWords(${lesson.level_no})`);
        btnDiv.setAttribute("id", `lesson-${lesson.level_no}`);

        // 4. Append the child
        levelContainer.appendChild(btnDiv);
    }
}
// Upon loading the website, api call will be made to get all lessons and display in the UI

const manageSpinner = (status) => {
    const spinner = document.getElementById("loading");
    const wordContainer = document.getElementById("word-container");

    if(status == true) {
        spinner.classList.remove("hidden");
        wordContainer.classList.add("hidden");
    }
    if(status == false) {
        spinner.classList.add("hidden");
        wordContainer.classList.remove("hidden");
    }
}
// Reusable Helpers code
function removeState() {
    const allBtns = document.querySelectorAll(".lesson-btn");

    for(btn of allBtns){ 
                btn.classList.remove("active");
                btn.classList.add("passive");
            }
}

function enableState(id){
    const activeBtn = document.getElementById(`lesson-${id}`);
    activeBtn.classList.add("active");
    activeBtn.classList.remove("passive");
}

// API call to get words by level
const loadWords = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then((res) => res.json()) 
        .then((json) => {
            removeState(); // Remove active state from all buttons
            enableState(id); // Add active state to the clicked button
            displayWords(json.data) // Display words in the UI
    }); 
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    console.log(details);
    displayWordDetail(details.data);

}

// id: 3
// level: 2
// meaning: "সতর্ক"
//partsOfSpeech: "adjective"
// points: 2
// pronunciation: "কশাস"
// sentence:"Be cautious while crossing the road."
// synonyms: (3) ['careful', 'alert', 'watchful']
// word: "Cautious"

const createElements = (array) => {
    const htmlElements = array.map(el => `<div class="bg-[#EDF7FF] py-[6px] px-[20px] border-1 border-[#D7E4EF] rounded-md text-xl">${el}</div>`);
    return htmlElements.join(" ");
}

const displayWordDetail = (details) => {
    const modal = document.getElementById("my_modal_5");
    modal.innerHTML = `
        <div class="modal-box rounded-3xl p-6">
          <div class="p-6 border-2 border-[#EDF7FF] rounded-xl">
            <h3 class="font-semibold text-4xl pb-8">
              ${details.word} (<i class="fa-solid fa-microphone-lines"></i>:${details.pronunciation})
            </h3>
            <p class="font-semibold text-2xl pb-2.5">Meaning</p>
            <p class="font-bangla font-medium text-2xl pb-8">${details.meaning}</p>
            <p class="font-semibold text-2xl pb-2">Example</p>
            <p class="font-regular text-2xl pb-8">
              ${details.sentence}
            </p>
            <p class="pb-2.5">সমার্থক শব্দ গুলো</p>
            <div id="synonyms" class="flex gap-3">
            ${createElements(details.synonyms)}
            </div>
          </div>
          <div class="modal-action flex justify-start">
            <form method="dialog">
              <button class="btn btn-primary rounded-xl">Complete Learning</button>
            </form>
          </div>
        </div>`
    modal.showModal();
} 
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
        manageSpinner(false);
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
            <button onclick="loadWordDetail(${word.id})" class="btn w-[56px] h-[56px] flex items-center justify-center bg-[#1A91FF]/10 rounded-lg hover:bg-[#1A91FF]/30 hover:cursor-pointer"><i class="fa-solid fa-circle-info"></i></button>
            <button onclick="pronounceWord('${word.word}')" class="btn w-[56px] h-[56px] flex items-center justify-center bg-[#1A91FF]/10 rounded-lg hover:bg-[#1A91FF]/30 hover:cursor-pointer"><i class="fa-solid fa-volume-high"></i></button>
            </div>`
        wordCard.classList.add("wordCard", "p-[56px]", "text-center", "bg-white", "rounded-xl", "h-[372px]");
        // btnDiv.setAttribute("onclick", `loadWords(${lesson.level_no})`);
        // 4. Append the child
        wordContainer.appendChild(wordCard);
    }
    manageSpinner(false);
}

loadLessons();

document.getElementById("btn-search").addEventListener("click", () => {
    removeState();
    const input = document.getElementById("input-search");
    const searchTerm = input.value.trim().toLowerCase();
    console.log(searchTerm);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(json => 
    {
        const allWords = json.data;
        const filterWords = allWords.filter((word) => 
        word.word.toLowerCase().startsWith(searchTerm));
        displayWords(filterWords);
    })
})