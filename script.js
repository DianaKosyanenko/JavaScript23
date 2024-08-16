// Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

// На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии, а именно:
// - название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"

// Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие, иначе она должна быть неактивна.

// Пользователь может записаться на один курс только один раз.

// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.

// Если количество участников уже максимально, то пользователь не может записаться, даже если он не записывался ранее.

// Сохраняйте данные в LocalStorage, чтобы они сохранялись и отображались при перезагрузке страницы.

// Начальные данные (JSON):

const initialBd = `[
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
]`

const key = "lessons"


if(!localStorage.getItem(key)) {
    localStorage.setItem(key, initialBd);
}
const initialValue = JSON.parse(localStorage.getItem(key));


const divContainerEl = document.querySelector('.lessons');


initialValue.forEach(element => {
    divContainerEl.insertAdjacentHTML('beforeend', addLessons(element))
    
});



divContainerEl.addEventListener('click', (event) => {
    if(!event.target.classList.contains('signUp')){
        return
    }

    const lessonEl = event.target.closest('.lesson');
    const lesson = initialValue.find((lesson) => (lesson.id === +lessonEl.getAttribute("data-id")));

    if(lesson.currentParticipants < lesson.maxParticipants){
        lesson.currentParticipants += 1;
        
        localStorage.setItem(key, JSON.stringify(initialValue));
        
        lessonEl.querySelector('.currentParticipants').innerHTML = +lesson.currentParticipants;
        //event.target.disabled = true;
        
    }
    event.target.disabled = true;    
    });

    

divContainerEl.addEventListener('click', (event) => {
    if(!event.target.classList.contains('cancelClass')){
        return
    }
    const lessonEl = event.target.closest('.lesson');
    const lesson = initialValue.find((lesson) => (lesson.id === +lessonEl.getAttribute('data-id')));
    if(lesson.currentParticipants > 0){

        lesson.currentParticipants -= 1
    
        localStorage.setItem(key, JSON.stringify(initialValue));
        lessonEl.querySelector('.currentParticipants').innerHTML = +lesson.currentParticipants;
    }
    event.target.disabled = true; 
    
    

})

// divContainerEl.addEventListener('DOMContentLoaded', (event) =>{
//     const lessonEl = event.target.closest('.lesson');
//     const lesson = initialValue.find((lesson) => (lesson.id === +lessonEl.getAttribute("data-id")));
//     if(lesson.currentParticipants + 1){

//     }

// })

function addLessons(lesson) {
    return `<div class="lesson" data-id="${lesson.id}">
        <div class="name">${lesson.name}  </div>
        <div class="time">${lesson.time}</div>
        <div class="maxParticipants">${lesson.maxParticipants}</div>
        <div class="currentParticipants">${lesson.currentParticipants}</div>
        <button class="signUp">Записаться на занятия</button>
        <button class="cancelClass">Отменить занятие</button>
    </div>

    ` 
}