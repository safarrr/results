const btnAdd = document.getElementById("add");
const body = document.getElementById("body");
const data = localStorage.getItem("note");
const addNote = (text = "", titles = "") => {
  const note = document.createElement("div");
  note.innerHTML += ` <div class="note"><div class="tools"><h1 id='title' class=' ${
    titles ? "" : "hidden"
  }' ></h1>
      <input class='${titles ? "hidden" : ""}' type='text'/>
      <div>
        <button class="edit"><i class="bi bi-pencil-square"></i></button>
        <button class="delete"><i class="bi bi-trash-fill"></i></button>
        </div>
      </div>
      <div class="main ${text ? "" : "hidden"}"></div>
      <textarea class=''${text ? "hidden" : ""}></textarea></div>`;
  const main = note.querySelector(".main");
  const textarea = note.querySelector("textarea");
  const title = note.querySelector("h1");
  const input = note.querySelector("input");
  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  main.innerHTML = marked.parse(text);
  textarea.value = text;
  title.innerHTML = titles;
  input.value = titles;
  marked.setOptions({
    highlight: function (code, lang) {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true })
        .value;
    },
  });
  input.addEventListener("input", (e) => {
    const { value } = e.target;
    title.innerHTML = value;
  });
  textarea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked.parse(value);
  });
  deleteBtn.addEventListener("click", () => {
    note.remove();
    upgradeData();
  });
  editBtn.addEventListener("click", () => {
    title.classList.toggle("hidden");
    input.classList.toggle("hidden");
    main.classList.toggle("hidden");
    textarea.classList.toggle("hidden");
    upgradeData();
  });
  body.appendChild(note);
};
if (data) {
  const notes = JSON.parse(data);
  notes.forEach((note) => {
    addNote(note.md, note.title);
  });
}
btnAdd.addEventListener("click", () => {
  addNote();
});
const upgradeData = () => {
  const datas = body.querySelectorAll(".note");
  const data = [];
  datas.forEach((v) => {
    data.push({
      title: v.firstChild.firstChild.textContent,
      md: v.lastChild.value,
    });
  });
  localStorage.setItem("note", JSON.stringify(data));
};
