const {listarTareas, agregarTarea, actualizarTareas, 
eliminarTareas,filtrarTareas, buscarTarea} = require ("./tareas")

const process = require ('process')

let comando = process.argv[2]


if (process.argv[2] !== undefined){
    comando = process.argv[2].toLowerCase() 
}

switch (comando) {
    case "listar":
    
    listarTareas()
        
        break;

    case "agregar" :
   
    agregarTarea(process.argv[3])

        break;
    
    case  "actualizar" :
    

    actualizarTareas (+process.argv[3])
    
    
        break;

    case "eliminar" :

    eliminarTareas (+process.argv[3])

        break;

    case "filtrar" : 

    filtrarTareas (process.argv[3])

        break;

    case "buscar" : 

    buscarTarea(process.argv[3])

        break;

    case undefined :

       console.log("¡Atención! - Tienes que pasar una acción." )
       
       break ;

    default :
    console.log("No entiendo qué quieres hacer.")

} 