document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.getElementById("addTaskButton");
  const taskInput = document.querySelector(".task");
  const newTask = document.getElementById("tarefas");

  function createLi() {
    return document.createElement("li");
  }

  taskInput.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
      if (!taskInput.value) return;
      adicionarTarefa(taskInput.value);
    }
  });

  function criaCheckBox() {
    const chkbx = document.createElement("input");
    chkbx.type = "checkbox";
    chkbx.className = "checkboxLi";
    chkbx.checked = false;
    return chkbx;
  }

  function limpaInput() {
    taskInput.value = "";
    taskInput.focus();
  }

  function criaBotaoApagar(li) {
    const botaoApagar = document.createElement("button");
    botaoApagar.innerHTML = "Apagar";
    botaoApagar.setAttribute("class", "apagar");
    botaoApagar.setAttribute("title", "Apagar esta tarefa");
    li.appendChild(botaoApagar);
  }

  function adicionarTarefa(taskInput, marcada = false) {
    const li = createLi();
    const chkbx = criaCheckBox();
    const spanTexto = document.createElement("span");
    spanTexto.classList.add("text");
    spanTexto.innerText = taskInput;

    li.appendChild(chkbx);
    li.appendChild(spanTexto);
    newTask.appendChild(li);

    chkbx.checked = marcada;

    if (marcada) {
      li.classList.add("concluida");
    }
    spanTexto.addEventListener("click", function () {
      chkbx.checked = !chkbx.checked;
      if (chkbx.checked) {
        li.classList.add("concluida");
      } else {
        li.classList.remove("concluida");
      }
      salvarTarefas();
    });

    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
  }

  addTaskButton.addEventListener("click", function () {
    if (!taskInput.value) return;
    adicionarTarefa(taskInput.value);
    taskInput.value = "";
  });

  document.addEventListener("click", function (e) {
    const el = e.target;

    if (el.classList.contains("checkboxLi")) {
      const valorCheck = el.checked;
      const li = el.parentElement;

      if (valorCheck === true) {
        li.classList.add("concluida");
      } else {
        li.classList.remove("concluida");
      }
      salvarTarefas();
    }
    if (el.classList.contains("apagar")) {
      el.parentElement.remove();
      salvarTarefas();
    }
  });

  function salvarTarefas() {
    const liTarefas = newTask.querySelectorAll("li");
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
      let tarefaTexto = tarefa.querySelector(".text").innerText;
      const marcada = tarefa.querySelector(".checkboxLi").checked;

      const tarefaObjeto = {
        texto: tarefaTexto,
        checkbox: marcada,
      };

      listaDeTarefas.push(tarefaObjeto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem("tarefas", tarefasJSON);
  }

  function adicionarTarefasSalvas() {
    const tarefas = localStorage.getItem("tarefas");
    const listaDeTarefas = JSON.parse(tarefas);

    if (listaDeTarefas) {
      for (let tarefa of listaDeTarefas) {
        adicionarTarefa(tarefa.texto, tarefa.checkbox);
      }
    }
  }
  adicionarTarefasSalvas();
});
