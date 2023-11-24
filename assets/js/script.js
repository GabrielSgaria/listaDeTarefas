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

  function criaBotaoApagar() {
    const botaoApagar = document.createElement("button");
    const imgTrash = document.createElement("img");
    imgTrash.src = "/assets/img/trash-simple.svg";
    imgTrash.alt = "Apagar";
    botaoApagar.appendChild(imgTrash);
    botaoApagar.setAttribute("class", "apagar");
    botaoApagar.setAttribute("title", "Apagar tarefa");
    return botaoApagar;
  }

  function criaBotaoEditar() {
    const botaoEditar = document.createElement("button");
    const imgEditar = document.createElement("img");
    imgEditar.src = "/assets/img/pencil-simple.svg";
    imgEditar.alt = "Editar"

    botaoEditar.appendChild(imgEditar);
    botaoEditar.setAttribute("class", "editar");
    botaoEditar.setAttribute("title", "Editar tarefa");

    return botaoEditar;
  }

  function adicionarTarefaDOM(tarefa) {
    const li = createLi();
    const chkbx = criaCheckBox();
    const spanTexto = document.createElement("span");
    spanTexto.classList.add("text");
    spanTexto.innerText = tarefa.texto;

    li.appendChild(chkbx);
    li.appendChild(spanTexto);
    newTask.appendChild(li);

    chkbx.checked = tarefa.checkbox;

    if (tarefa.checkbox) {
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

    const botaoEditar = criaBotaoEditar();
    const botaoApagar = criaBotaoApagar();
    li.appendChild(botaoEditar);
    li.appendChild(botaoApagar);

    botaoEditar.addEventListener("click", function () {
      const novoTexto = prompt("Digite o novo texto:", tarefa.texto);
      if (novoTexto !== null) {
        tarefa.texto = novoTexto;
        spanTexto.innerText = novoTexto;
        salvarTarefas();
      }
    });

    botaoApagar.addEventListener("click", function () {
      li.remove();
      salvarTarefas();
    });
  }

  function adicionarTarefa(tarefaTexto, marcada = false) {
    const tarefaObjeto = {
      texto: tarefaTexto,
      checkbox: marcada,
    };

    adicionarTarefaDOM(tarefaObjeto);
    limpaInput();
    salvarTarefas();
  }

  addTaskButton.addEventListener("click", function () {
    if (!taskInput.value) return;
    adicionarTarefa(taskInput.value);
  });

  newTask.addEventListener("click", function (e) {
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
        adicionarTarefaDOM(tarefa);
      }
    }
  }
  adicionarTarefasSalvas();
});
