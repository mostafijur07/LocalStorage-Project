
let addButton = document.querySelector('#add-button');

const updateLocalStorage = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach( (note) => {
        return notes.push(note.value);
    });

    localStorage.setItem('notes', JSON.stringify(notes));
}

const addcard = (text = '') => {
    let cardcontainer = document.querySelector('#card-container');

    let card = document.createElement('div');
    card.classList.add('card');

    const htmldata=`
    <div id="card-header">
        <button id="delete"><i class="fa-solid fa-trash"></i></button>
        <button id="edit">${text ? '<i class="fas fa-edit"></i>' : '<i class="fas fa-save"></i>'}</button>    </div>
    <div id="main" class="${text ? "": "hidden"}"></div>
    <textarea class="${text ? "hidden": ""}"></textarea>`

    // Adding the html inside div whose class="card" 
    card.insertAdjacentHTML('afterbegin',htmldata);  // there are 4 place to add the html data 1.beforebegin 2.afterbegin 3.beforeend 4.afterend
    cardcontainer.appendChild(card);

    const deleteButton = card.querySelector('#delete');
    deleteButton.addEventListener('click', () => {
        card.remove();
        updateLocalStorage();  // updating local storage
    });

    const mainDiv = card.querySelector('#main');
    const textArea = card.querySelector('textarea');
    const editButton = card.querySelector('#edit');
    const changeIcon = editButton.querySelector('i');

    textArea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden'); // once accessing the hiddin class once not 
        textArea.classList.toggle('hidden');
        if(changeIcon.classList.contains('fa-save')){
            changeIcon.classList.remove('fa-save');
            changeIcon.classList.add('fa-edit');
        }else{
            changeIcon.classList.remove('fa-edit');
            changeIcon.classList.add('fa-save');
        }

    });

    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLocalStorage();   // updateing local storage
    });

}

const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
    notes.forEach((note) => addcard(note));
}

addButton.addEventListener('click', () => addcard());