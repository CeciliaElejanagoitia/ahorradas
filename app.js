const btnBalance = document.getElementById('btn-balance');
const btnCategorias = document.getElementById('btn-categorias');
const btnReportes = document.getElementById('btn-reportes');

const seccionBalance = document.getElementById('seccion-balance');
const seccionCategorias = document.getElementById('seccion-categorias');
const seccionReportes = document.getElementById('seccion-reportes');

//editar inputs
const vistaEditarOperacion = document.getElementById('vista-editar-operacion');
const editarDescripcionInput = document.getElementById('editar-descripcion-input');
const editarMontoInput = document.getElementById('editar-monto-input');
const editarTipoInput = document.getElementById('editar-tipo-operacion');
const editarCategoriaSelectInput = document.getElementById('editar-categorias-select');
const editarFechaInput = document.getElementById('editar-fecha-input');
const btnEditarOperacion = document.getElementById('boton-editar-operacion');



const categorias = [
    'Comida',
    'Servicios',
    'Salidas',
    'Educacion',
    'Transporte',
    'Trabajo'
];

const generarCategorias = () => {
    const selects = document.getElementsByClassName('categorias-selects')
    for (let i = 0; i < selects.length; i++) {
        const select = selects[i];
        if(select.classList.contains('filtro-categoria')){
            select.innerHTML = '<option>Todas</option>'
        }
        for (let j = 0; j < categorias.length; j++) {
            select.innerHTML += `<option value=${categorias[j]}>${categorias[j]}</option>`
        }
    }
}

let operaciones = JSON.parse(localStorage.getItem('operaciones')) || []
// let operaciones = JSON.parse(localStorage.getItem('operaciones')) || []


const mostrarOperaciones = (arr) => {
    if(!arr.length){
        document.getElementById('sin-operaciones').classList.remove('oculto')
        document.getElementById('con-operaciones').classList.add('oculto')
        
    } else {
        document.getElementById('sin-operaciones').classList.add('oculto')
        document.getElementById('con-operaciones').classList.remove('oculto')
    }
}

btnBalance.addEventListener('click', () => {
    seccionBalance.classList.remove('oculto');
    seccionCategorias.classList.add('oculto');
    seccionReportes.classList.add('oculto');
})
btnCategorias.addEventListener('click', () => {
    seccionBalance.classList.add('oculto');
    seccionCategorias.classList.remove('oculto');
    seccionReportes.classList.add('oculto');
    vistaOperacion.classList.add('oculto');
})
btnReportes.addEventListener('click', () => {
    seccionBalance.classList.add('oculto');
    seccionCategorias.classList.add('oculto');
    seccionReportes.classList.remove('oculto');
    vistaOperacion.classList.add('oculto');
    if(!operaciones.length){
        document.getElementById('sin-reportes').classList.remove('oculto')
        document.getElementById('con-reportes').classList.add('oculto')
    } else{
        document.getElementById('sin-reportes').classList.add('oculto')
        document.getElementById('con-reportes').classList.remove('oculto')
    }
    totalPorMes(operaciones)
    totalPorCategoria(operaciones, categorias)
    reportesResumen(operaciones)
    mesMayorGananciaYGasto(operaciones)
})



const totalPorCategoria = (operaciones, categorias) => {
    let str = ''
    categorias.forEach(categoria => {
        const porCategoria = operaciones.filter(operacion => operacion.categoria === categoria)
        const porCategoriaGanancia = porCategoria.filter(operacion => 
            operacion.tipo === 'Ganancia').reduce((count, current) => 
            count + Number(current.monto), 0)
        const porCategoriaGasto = porCategoria.filter(operacion => 
            operacion.tipo === 'Gasto').reduce((count, current) => 
            count + Number(current.monto), 0)
        str = str + `
            <div class="columns is-vcentered is-mobile">
                <div class="column">
                    <h3 class="has-text-weight-semibold">${categoria}</h3>
                </div>
                <div class="column has-text-success has-text-right">
                    $${porCategoriaGanancia}
                </div>
                <div class="column has-text-danger has-text-right">
                    $${porCategoriaGasto}
                </div>
                <div class="column has-text-right">
                    $${porCategoriaGanancia - porCategoriaGasto}
                 </div>
            </div>
        `
        document.getElementById('reporte-categorias').innerHTML = str;
    })
}

const reportesResumen = arr => {
    const resumenMayorGanancia = 
      arr.filter(operacion => operacion.tipo === 'Ganancia').sort((a, b) => b.monto - a.monto)
    if (resumenMayorGanancia.length > 0) {
      document.getElementById('categoria-mayor-ganancia').innerHTML = `
      <div class="column is-6 has-text-weight-semibold">
        Categoría con mayor ganancia
      </div>
      <div class="column is-3 has-text-right">
        <span class="tag is-primary is-light" >${resumenMayorGanancia[0].categoria}</span>
      </div>
      <div class="column is-3 has-text-weight-semibold has-text-right has-text-success">$${resumenMayorGanancia[0].monto}</div>`;

    }
    const resumenMayorGasto = 
    arr.filter(operacion => operacion.tipo === 'Gasto').sort((a, b) => b.monto - a.monto)
    if (resumenMayorGasto.length > 0) {
    document.getElementById('categoria-mayor-gasto').innerHTML = `
    <div class="column is-6 has-text-weight-semibold">
        Categoría con mayor gasto
    </div>
    <div class="column is-3 has-text-right">
        <span class="tag is-primary is-light" >${resumenMayorGasto[0].categoria}</span>
    </div>
    <div class="column is-3 has-text-danger has-text-right has-text-success" >$${resumenMayorGasto[0].monto}</div>`;
    }
    // const resumenMayorBalance = arr => 
    // arr.filter(operacion => operacion.tipo === 'Gasto').sort((a, b) => b.monto - a.monto)
    // if (resumenMayorBalance.length > 0) {
        
    //     // if (resumenMayorBalance.length > 0) 
    // document.getElementById('categoria-mayor-balance-reporte').innerHTML = `
    // <div class="column is-6 has-text-weight-semibold">
    //     Categoría con mayor balance
    // </div>
    // <div class="column is-3 has-text-right">
    //     <span class="tag is-primary is-light" >${resumenMayorBalance[0].categoria}</span>
    // </div>
    // <div class="column is-3 has-text-danger has-text-right has-text-success" >$${resumenMayorGanancia[0].monto - resumenMayorGasto[0].monto}</div>`;
    // }
}

const mesMayorGananciaYGasto = (arr) => {
    const resumenMayorMonto = arr.sort((a, b) => b.monto - a.monto);

const gananciaMayor = resumenMayorMonto.filter(
    (operacion) => operacion.tipo === "Ganancia");
  if (gananciaMayor.length > 0){
    document.getElementById('mes-mayor-ganancia-resumen').innerHTML = `
    <div class="column is-6 has-text-weight-semibold">
        Mes con mayor ganancia
    </div>
    <div class="column is-3 has-text-right">
        <span class="tag is-primary is-light" >${new Date(gananciaMayor[0].fecha).getMonth() + 1}/${new Date(gananciaMayor[0].fecha).getFullYear()}</span>
    </div>
    <div class="column is-3 has-text-weight-semibold has-text-right has-text-success" >$${gananciaMayor[0].monto}</div>`;
    }
    const gastoMayor = resumenMayorMonto.filter(
        (operacion) => operacion.tipo === "Gasto");
      if (gastoMayor.length > 0){
        document.getElementById('mes-mayor-gasto-resumen').innerHTML = `
        <div class="column is-6 has-text-weight-semibold">
            Mes con mayor gasto
        </div>
        <div class="column is-3 has-text-right">
            <span class="tag is-primary is-light" >${new Date(gastoMayor[0].fecha).getMonth() + 1}/${new Date(gastoMayor[0].fecha).getFullYear()}</span>
        </div>
        <div class="column is-3 has-text-danger has-text-right has-text-success" >$${gastoMayor[0].monto}</div>`;
        }
}



const totalPorMes = arr => {
    const mesesSinRepetir = [ ... new Set(arr.map(operaciones => 
        operaciones.fecha.split('/')[0][6]))].sort()

    for (let i = 0; i < mesesSinRepetir.length; i++) {
        const operacionesPorMes = arr.filter(operacion => operacion.fecha.split('/')[0][6] === mesesSinRepetir[i])
        const porTipoGanancia = operacionesPorMes.filter(operacion =>
            operacion.tipo === 'Ganancia').reduce((count, current) => count + Number(current.monto), 0)
        const porTipoGasto = operacionesPorMes.filter(operacion =>
            operacion.tipo === 'Gasto').reduce((count, current) => count + Number(current.monto), 0)
        document.getElementById('mes').innerHTML = `0${mesesSinRepetir[i]}`
        document.getElementById('mes-ganancia').innerHTML = `$${porTipoGanancia}`
        document.getElementById('mes-gasto').innerHTML = `$${porTipoGasto}`
        document.getElementById('mes-balance').innerHTML = `${porTipoGanancia - porTipoGasto}`
       
    }
    
}



const vistaOperacion = document.getElementById('vista-operacion');
const verOperacion = document.getElementById('ver-operacion');

verOperacion.addEventListener('click', () => {
    vistaOperacion.classList.remove('oculto');
    seccionBalance.classList.add('oculto');
})



//inputs agregar operacion
const descripcionInput = document.getElementById('descripcion-input');
const montoInput = document.getElementById('monto-input');
const tipoOperacion = document.getElementById('tipo-operacion');
const categoriasSelect = document.getElementById('categorias-select');
const fechaInput = document.getElementById('fecha-input');
const btnAgregarOperacion = document.getElementById('agregar-operacion-boton');
const btnCancelar = document.getElementById('cancelar-agregar-operacion-boton');


btnCancelar.addEventListener('click', () => {
    vistaOperacion.classList.add('oculto');
    seccionBalance.classList.remove('oculto');
})
btnAgregarOperacion.addEventListener('click', () => {
    if(descripcionInput.value.trim().length === 0 || montoInput.value == 0) { 
    alertify.warning('Todos los campos son necesarios y el monto tiene que ser mayor a 0');
    return}

    const operacion = {
        id: uuidv4(),
        descripcion: descripcionInput.value,
        monto: montoInput.value,
        tipo: tipoOperacion.value,
        categoria: categoriasSelect.value,
        fecha: fechaInput.value
    }
    operaciones.push(operacion);
    vistaOperacion.classList.add('oculto');
    seccionBalance.classList.remove('oculto');
    descripcionInput.value = ''
    montoInput.value = 0
    tipoOperacion.value = 'Gasto'
    categoriasSelect.value = 'Comida'
    mostrarOperaciones(operaciones);

    
    localStorage.setItem('operaciones', JSON.stringify(operaciones))

    pintarOperaciones(operaciones);
    alertify.message('Operacion agregada con éxito')
})

const pintarOperaciones = arr => {
    document.getElementById('operaciones').innerHTML = ''
    let str = '';
    arr.forEach((operacion) => {
        const {id,
            descripcion,
            monto, 
            tipo, 
            categoria, 
            fecha
            } = operacion;
        str = str + `
        <div class="mb-3">
            <div class="columns is-multiline is-mobile is-vcentered">
            <div class="column is-3-tablet is-6-mobile">
                <h3 class="has-text-weight-semibold">${descripcion}</h3>
            </div>
            <div class="column is-3-tablet is-6-mobile has-text-right-mobile">
                <span class="tag is-primary is-light">${categoria}</span>
            </div>
            <div class="column is-2-tablet has-text-grey is-hidden-mobile has-text-right-tablet">${fecha}</div>
            <div class="column is-2-tablet is-6-mobile has-text-weight-bold has-text-right-tablet is-size-4-mobile ${tipo === 'Ganancia'? 'has-text-success' : 'has-text-danger'}">$${monto}</div>
            <div class="column is-2-tablet is-6-mobile has-text-right">
                <p class="is-fullwidth">
                <a class="mr-3 is-size-7 editar" data-id =${id} >Editar</a>
                <a class="is-size-7 eliminar" data-id =${id} >Eliminar</a>
                </p>
            </div>
            </div>  
        </div>
        `    
        document.getElementById('operaciones').innerHTML = str;
    })
    const btnEliminar = document.querySelectorAll('.eliminar');
    const btnEditar = document.querySelectorAll('.editar');

    btnEliminar.forEach(btn => {
        btn.addEventListener('click', event => {
            const arregloSinOperacion = operaciones.filter(operacion => operacion.id !== event.target.dataset.id)
            localStorage.setItem('operaciones',JSON.stringify(arregloSinOperacion))
            operaciones = (JSON.parse(localStorage.getItem('operaciones')))
            pintarOperaciones(operaciones)
            mostrarOperaciones(operaciones)
            alertify.message('Operacion eliminada con éxito')
        })
    })
    btnEditar.forEach((btn) => {
        btn.addEventListener('click', event => {
            operacionParaEditar = operaciones.filter((operacion) => 
                operacion.id === event.target.dataset.id);
            editarOperacion(operacionParaEditar); 
        })
        
    })
    
}
const btnAgregarOperacionEditada = document.getElementById('agregar-operacion-editada-boton');
const btnCancelarAgregarOperacionEditada = document.getElementById('boton-cancelar-editar-operacion');

btnAgregarOperacionEditada.addEventListener('click', event => {
    console.log(operacionParaEditar)
    const operacionEditada = {
        ...operacionParaEditar[0]
    };
    operacionEditada.descripcion = editarDescripcionInput.value;
    operacionEditada.monto = editarMontoInput.value;
    operacionEditada.tipo = editarTipoInput.value;
    operacionEditada.categoria = editarCategoriaSelectInput.value;
    operacionEditada.fecha = editarFechaInput.value;

    seccionBalance.classList.remove('oculto');
    vistaEditarOperacion.classList.add('oculto');
    const operacionActualizada = operaciones.map((operacion) => 
    operacion.id === operacionEditada.id ? operacionEditada : operacion);

    localStorage.setItem('operaciones', JSON.stringify(operacionActualizada));
    operaciones = JSON.parse(localStorage.getItem('operaciones'));
    pintarOperaciones(operaciones)
    alertify.message('Operacion editada con éxito');
})

const editarOperacion = (arr) => {
    const {
        descripcion, 
        monto, 
        tipo, 
        categoria, 
        fecha
    } = {
        ...arr[0]
    };
    seccionBalance.classList.add('oculto');
    seccionCategorias.classList.add('oculto');
    seccionReportes.classList.add('oculto');
    vistaEditarOperacion.classList.remove('oculto');
    editarDescripcionInput.value = descripcion;
    editarMontoInput.value = monto,
    editarTipoInput.value = tipo;
    editarCategoriaSelectInput.value = categoria;
    editarFechaInput.valueAsDate = new Date(fecha)
    
    
}

btnCancelarAgregarOperacionEditada.addEventListener('click', event => {
    seccionBalance.classList.remove('oculto');
    seccionCategorias.classList.add('oculto');
    seccionReportes.classList.add('oculto');
    vistaEditarOperacion.classList.add('oculto');
})

const gastoBalance = document.getElementById('gastos')
const gananciaBalance = document.getElementById('ganancia')
const totalBalance = document.getElementById('total')



const totalGastos = arr => 
        arr.filter(operaciones => operaciones.tipo === 'Gasto').reduce((prev, actual) => 
         prev + Number(actual.monto), 0)

const totalGanancia = arr => 
    arr.filter(operaciones => operaciones.tipo === 'Ganancia').reduce((prev, actual) => 
     prev + Number(actual.monto), 0)


gastoBalance.innerHTML = `$${totalGastos(operaciones)}`;
gananciaBalance.innerHTML = `$${totalGanancia(operaciones)}`
totalBalance.innerHTML = `$${totalGanancia(operaciones) - totalGastos(operaciones)}`

const filtros = document.getElementById('filtros')
const btnOcultarFiltros = document.getElementById('caja-filtros')
const filtroTipo = document.getElementById('filtro-tipo');
const filtroCategoria = document.getElementById('filtro-categoria');
const filtroOrden = document.getElementById('filtro-orden');
 
btnOcultarFiltros.addEventListener('click', () => {
    filtros.classList.toggle('oculto')
})

filtroCategoria.addEventListener('change', (event) => {
    console.log(event.target.value);
    if(event.target.value !== 'Todas') {
        const porCategoria = operaciones.filter(operaciones => operaciones.categoria === event.target.value)
        localStorage.setItem('operaciones', JSON.stringify(porCategoria));
        pintarOperaciones(porCategoria)
    } else {
        pintarOperaciones(operaciones)
    }
})


filtroTipo.addEventListener('change', (event) => {
    if(event.target.value !== 'Todas'){
        const porTipo = operaciones.filter(operaciones => operaciones.tipo === event.target.value)
        localStorage.setItem('operaciones', JSON.stringify(porTipo))
        pintarOperaciones(porTipo);
    } else {
        pintarOperaciones(operaciones)
    }
})

filtroOrden.addEventListener('change', () => {
    if(filtroOrden.value === 'Menor-monto'){
        const menorMonto = operaciones.sort((a, b) => {
            if(a.monto < b.monto){
                return -1
            }
            if(a.monto > b.monto){
                return -1
            }
        })
        pintarOperaciones(menorMonto)
    }
    if(filtroOrden.value === 'Mayor-monto'){
        const mayorMonto = operaciones.sort((a, b) => {
            if(a.monto > b.monto){
                return -1
            }
            if(a.monto < b.monto){
                return -1
            }
        })
        pintarOperaciones(mayorMonto)
    }
    if(filtroOrden.value === 'A/Z'){
        const az = operaciones.sort((a,b) => {
          if(a.descripcion.toLowerCase() < b.descripcion.toLowerCase()){
            return -1
          }
        })
        pintarOperaciones(az)
    }
    if(filtroOrden.value === 'Z/A'){
        const za = operaciones.sort((a,b) => {
          if(a.descripcion.toLowerCase() > b.descripcion.toLowerCase()){
            return -1
          }
        })
        pintarOperaciones(za)
    }
})



const inicializar = () => {
    const inputsFecha = document.querySelectorAll('input[type="date"]')
    inputsFecha.forEach( input => {
        input.valueAsDate = new Date();
    })
    mostrarOperaciones(operaciones);
    generarCategorias();
    pintarOperaciones(operaciones);
}

window.onload = inicializar