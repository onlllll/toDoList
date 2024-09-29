// Находим нужные элементы на странице
const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
    tasks.forEach((task) => renderTask(task))

}

tasks.forEach((task) => renderTask(task))

checkEmptyList()

// добавление задачи
form.addEventListener('submit', addTask)
// Удаление задачи
tasksList.addEventListener('click', deleteTask)
// Отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask)

// НЕПРАВЕЛЬНОЕ СОХРАНЕНИЕ В loCAL STORAGE
// if (localStorage.getItem('tasksHTML')) {
//     tasksList.innerHTML = localStorage.getItem('tasksHTML')
// }


// Функции

function addTask(event) {
    // Отменяем отправку формы
    event.preventDefault()

    // достаем текст задачи из поля ввода
    const taskText = taskInput.value

    // Описываем задачу в виде объекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    }

    // добавляем задачу в массив с задачами
    tasks.push(newTask)

    // Добавляем список задач в хранилище браузера LocalStorage
    saveTolocalStorage()

    renderTask(newTask);

    // Очищаем поле ввода и возвращаем на него фокус
    taskInput.value = ""
    taskInput.focus()

    checkEmptyList()




    // проверка.Если в списке задач более одного эллемента.скрываем его
    // if (tasksList.children.length > 1) {
    //     emptyList.classList.add('none')
    // }

    // saveHTMLtoLS();

}

function deleteTask(event) {
    // проверяем что клик был НЕ по кнопке удалить задачу
    if (event.target.dataset.action !== 'delete') return;

    // проверяем что клик был по кнопке удалить задачу
    const parenNode = event.target.closest('.list-group-item')

    // Определяем ID задачи
    const id = Number(parenNode.id)

    // Находим индекс задачи в массиве
    // const index = tasks.findIndex((task) => task.id === id)

    // Удаляем задачу из массива
    // tasks.splice(index, 1)

    // tasks = tasks.filter(function (task){
    // if (task.id === id) {
    //     return false
    // } else {
    //     return true
    // }
    //     return task.id !== id
    // })

    // Удаляем задачу через фильтрацию массива
    tasks = tasks.filter((task) => task.id !== id)

    console.log(tasks);

    // Добавляем список задач в хранилище браузера LocalStorage
    saveTolocalStorage()

    // Удаляем задачу из разметки
    parenNode.remove()

    checkEmptyList()


    // Проверка. Если в списке задач 1 элемент, показываем блок 'Список дел пуст'   
    // if (tasksList.children.length === 1) {
    //     emptyList.classList.remove('none')
    // }

    // saveHTMLtoLS();

}

function doneTask(event) {
    // Проверяем что клик был НЕ по кнопке "задача выполнена"
    if (event.target.dataset.action !== "done") return
    const parentNode = event.target.closest('.list-group-item')

    // Определяем ID задачи
    const id = Number(parentNode.id)
    const task = tasks.find((task) => task.id === id)
    task.done = !task.done

    // Добавляем список задач в хранилище браузера LocalStorage
    saveTolocalStorage()


    // Проверяем что клик был по кнопке "задача выполнена"
    const taskTitle = parentNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')

    // saveHTMLtoLS();

}

// function saveHTMLtoLS() {
//     localStorage.setItem('tasksHTML', tasksList.innerHTML)
// }


function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`
        tasksList.insertAdjacentHTML('afterbegin',emptyListHTML)       
    }

    if(tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function saveTolocalStorage () {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    // Формируем CSS класс
    const cssClass = task.done ? "task-title task-title--done" : "task-title";

    // формируем разметку для новой задачи
    const taskHtml = ` <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li> `

    // добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHtml)
}
