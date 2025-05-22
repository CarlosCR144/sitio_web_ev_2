// -------------------------------
// AFICIONES
const agregarAficBtn = document.getElementById("agregarAficion")

let aficionesArr = []

const mostrarAficiones = () => {
  const lista = document.getElementById("listaAficiones");


  lista.textContent = ""

  for (let i = 0; i < aficionesArr.length; i++) {
    const li = document.createElement("li");
    li.textContent = aficionesArr[i];

    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.addEventListener("click", () => {
      li.remove()
      let index = aficionesArr.indexOf(li.childNodes[0].data)
      if (index !== -1) { aficionesArr.splice(index, 1) }
      console.log('LI REMOVE: ',li)
      console.log('LI DATA: ',li.childNodes[0].data)
      console.log('AFICARR REMOVE', aficionesArr)
    });
    li.appendChild(btn);

    console.log("for a", aficionesArr[i])
    lista.appendChild(li);
  }

  console.log(aficionesArr)

}


const agregarAficion = () => {
  const input = document.getElementById("aficionInput");
  const error = document.getElementById("aficionError");

  const valor = input.value.trim()

  if (valor === "") {
    error.textContent = "Debe ingresar una afición.";
  } else if (aficionesArr.includes(valor)) {
    error.textContent = "Esa afición ya fue ingresada.";
  } else {
    aficionesArr.push(valor)

    mostrarAficiones()
    
    input.value = "";
    error.textContent = "";
  }
}

agregarAficBtn.addEventListener("click", agregarAficion);



// --------------------------------------------------------
// -------------------------------------------------------
// VALIDACIONES
const formulario = document.getElementById("registroForm")


const validarUsername = (username) => {
  console.log("Validar username")

  if (!/^[a-zA-Z][a-zA-Z0-9]{4,9}$/.test(username)) {
    document.getElementById("usernameError").textContent = "Nombre inválido (5-10 caracteres, empieza con letra, sin símbolos).";
    return false
  } else {
    document.getElementById("usernameError").textContent = "";
    return true
  }
}

const validarPassword = (password, username) => {
  console.log("Validar password")

  if (password.length < 3 || password.length > 6 || !/[a-zA-Z]/.test(password) || !/\d/.test(password) || password.includes(username)) {
    document.getElementById("passwordError").textContent = "Contraseña debe tener 3-6 caracteres, al menos una letra y un número, y no contener el nombre de usuario.";
    return false
  } else {
    document.getElementById("passwordError").textContent = "";
    return true
  }
}

const validarConfirmacion = (password, confirmPassword) => {
  console.log("Validar password")

  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").textContent = "Las contraseñas no coinciden.";
    return false;
  } else {
    document.getElementById("confirmPasswordError").textContent = "";
    return true;
  }
}

const validarDireccion = (direccion) => {
  if (direccion === "") {
    document.getElementById("direccionError").textContent = "La dirección es obligatoria.";
    return false;
  } else {
    document.getElementById("direccionError").textContent = "";
    return true;
  }
}

const validarComuna = (comuna) => {
  if (comuna === "") {
    return 'N/A';
  } else {
    return comuna;
  }
}

const validarTelefono = (telefono) => {
  const regex = /^9\d{8}$/;
  if (!regex.test(telefono)) {
    document.getElementById("telefonoError").textContent = "Teléfono inválido. Debe tener 9 dígitos y comenzar con 9.";
    return false;
  } else {
    document.getElementById("telefonoError").textContent = "";
    return true;
  }
}

const validarPaginaWeb = (url) => {
  if (url === "") return true;
  const regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;
  if (!regex.test(url)) {
    document.getElementById("paginaWebError").textContent = "URL inválida.";
    return false;
  } else {
    document.getElementById("paginaWebError").textContent = "";
    return true;
  }
}

const validarAficiones = (aficiones) => {
  if (aficiones.length < 2) {
    document.getElementById("aficionError").textContent = "Debe ingresar al menos 2 aficiones.";
    return false;
  } else {
    document.getElementById("aficionError").textContent = "";
    return true;
  }
}

// -------------------------------------------------
// ---------------------------------------------------
// CRUD USUARIOS

const mostrarUsuarios = () => {
  const contenedor = document.getElementById("usuariosList");
  contenedor.innerHTML = "";

  usuarios.forEach((user, index) => {
    const div = document.createElement("div");
    div.className = "usuario";
    div.innerHTML = `
      <p>Nombre usuario: ${user.username}</p>
      <p>Comuna: ${user.comuna}</p>
      <p>Dirección: ${user.direccion}</p>
      <p>Teléfono: ${user.telefono}</p>
      <p>Página: ${user.paginaWeb || "N/A"}</p>
      <p>Aficiones: ${user.aficiones.join(", ")}</p>
      <button onclick="editarUsuario(${index})">Editar</button>
      <button onclick="eliminarUsuario(${index})">Eliminar</button>
      <hr>
    `;
    contenedor.appendChild(div);
  });
}

const eliminarUsuario = (index) => {
  if (confirm("¿Seguro que deseas eliminar este usuario?")) {
    usuarios.splice(index, 1);
    mostrarUsuarios();
    console.log('ELIMINAR USUARIOS', usuarios)
  }
}

const editarUsuario = (index) => {
  const user = usuarios[index];

  document.getElementById("username").value = user.username;
  document.getElementById("password").value = user.password;
  document.getElementById("confirmPassword").value = user.password;
  document.getElementById("direccion").value = user.direccion;
  document.getElementById("comuna").value = user.comuna;
  document.getElementById("telefono").value = user.telefono;
  document.getElementById("paginaWeb").value = user.paginaWeb;

  const lista = document.getElementById("listaAficiones");
  lista.innerHTML = "";
  user.aficiones.forEach(af => {
    console.log('AF EDITAR', af)
    aficionesArr.push(af)
  });
  mostrarAficiones()
  console.log('AFICIONES ARR EDITAR', aficionesArr)

  usuarios.splice(index, 1);
  mostrarUsuarios();
}


// -------------------------------------------
// ----------------------------------------------
// REGISTROS

const usuarios = []

formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log("VALIDAR")

  let valid = true;

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const direccion = document.getElementById("direccion").value.trim();
  const comuna = document.getElementById("comuna").value;
  const telefono = document.getElementById("telefono").value.trim();
  const paginaWeb = document.getElementById("paginaWeb").value.trim();
  const aficiones = document.querySelectorAll("#listaAficiones li");

  document.querySelectorAll(".error").forEach(el => el.textContent = "")


  if (!validarUsername(username)) {
    valid = false
  }

  if (!validarPassword(password, username)) {
    valid = false
  }

  if (!validarConfirmacion(password, confirmPassword)) {
    valid = false;
  }

  if (!validarDireccion(direccion)) {
    valid = false;
  }

  let validComuna = validarComuna(comuna)

  if (!validarTelefono(telefono)) {
    valid = false
  }

  if (!validarPaginaWeb(paginaWeb)) {
    valid = false
  }

  if (!validarAficiones(aficiones)) {
    valid = false
  }

  

  if (valid) {
    console.log("Formulario enviado correctamente.")
    
    const usuario = {
      username: username,
      password: password,
      direccion: direccion,
      comuna: validComuna,
      telefono: telefono,
      paginaWeb: paginaWeb,
      aficiones: aficionesArr
    }

    usuarios.push(usuario)
    console.log('REGISTRAR USUARIOS',usuarios)
    mostrarUsuarios();
    console.log('aficiones', aficionesArr)
    aficionesArr = []
    this.reset();
    document.getElementById("listaAficiones").innerHTML = "";
  }
});
