const input = document.getElementById("input");
const existingDiv = document.getElementById("result");
const sub_result = document.getElementById("sub_result");
const fetchData = async () => {
  let inputData = input.value;
  let url = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${inputData}`
  );
  let data = await url.json();
  console.log(data);
  if (!existingDiv) {
    existingDiv = document.createElement("div");
    existingDiv.id = "dictionaryResult";
    sub_result.appendChild(existingDiv);
  }
  if (Array.isArray(data) && data.length > 0) {
    const { word, meanings, phonetics } = data[0];
    existingDiv.innerHTML = `
<div class="word_voice">
  <div class="word">${word}</div>
  <i class="fa-solid fa-volume-high" onclick="playAudio('${
    data[0].phonetics[0].audio
  }')"></i>
        </div>

<div class="partofSpeech">
  ${
    meanings[0].partOfSpeech == "" ||
    meanings[0].partOfSpeech == null ||
    meanings[0].partOfSpeech == undefined
  } / <span class="pronounce">${
      phonetics[0].text == "" ||
      phonetics[0].text == null ||
      phonetics[0].text == undefined
        ? "No Pronunciation  "
        : phonetics[0].text
    }</span>
</div>
<div class="more_content">
    <p class="synonyms"><span>Synonyms</span>: ${
      meanings[0].synonyms == "" ||
      meanings[0].synonyms == undefined ||
      meanings[0].synonyms == null
        ? "no synonyms"
        : meanings[0].synonyms
    }</p>
    <p class="antonyms"><span>Antonyms</span>: ${
      meanings[0].antonyms == "" ||
      meanings[0].antonyms == undefined ||
      meanings[0].antonyms == null
        ? "no antonyms"
        : meanings[0].antonyms
    }</p>
    <p class="definiation">
    <span> Definiation</span>: ${
      meanings[0].definitions[0].definition == "" ||
      meanings[0].definitions[0].definition == null ||
      meanings[0].definitions[0].definition == undefined
        ? "no definition"
        : meanings[0].definitions[0].definition
    }
    </p>
    <p class="example"><span>Example</span>: ${
      meanings[0].definitions[0].example == "" ||
      meanings[0].definitions[0].example == null ||
      meanings[0].definitions[0].example == undefined
        ? "no example"
        : meanings[0].definitions[0].example
    }</p>

</div>
`;
  } else {
    sub_result.innerHTML = "what the hell is this brother of min";
  }
};
function playAudio(audioUrl) {
  const audio = new Audio(audioUrl);
  audio.play();
}

function buttonClick(event) {
  fetchData();
  event.preventDefault();
}
