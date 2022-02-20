console.clear()

const fs = require ('fs')

const tareas = require ('./tareas.json')

const mostrarTareas = (tareas) =>{
    tareas.forEach((tarea, index) => {

        console.log((`${index + 1}) - Descripcion : ${tarea.descripcion} \n   - Estado : ${tarea.estado} \n   - ID : ${tarea.id} `))
    }) 

}
const guardarJSON =(tareas) => { 
    fs.writeFileSync ('./tareas.json', JSON.stringify(tareas,null,3));
    return null
}



module.exports = {
    
    listarTareas : () => {    

    mostrarTareas(tareas)
    return null
},
    
    agregarTarea : (tarea) => {
        

        let descripcion = process.argv[3]

        let nuevaTarea = {
            id : new Date().getTime(), 
            descripcion,
            estado : "Pendiente"
        }
    
        if (nuevaTarea.descripcion === undefined){
            return console.log ('Coloca la descripcion de tu tarea entre " " (comillas). ') 
        }
    

         tareas.push(nuevaTarea)
         guardarJSON(tareas)

         return console.log("¡Su tarea fue agregada con exito!")
},
    
    actualizarTareas : (id) =>{

    if (process.argv[3] === undefined){
            return console.log("¡Debes colocar un ID!")
        }    

    let check = tareas.filter(tarea => tarea.id === id);

        if(check.length === 0){
            return console.log('¡ID inexistente!');
        } 

    let tareasActualizadas = tareas.map(tarea => {
            if (tarea.id === id){
                
                if (tarea.estado === "Pendiente"){
                tarea.estado = "En proceso"
                return tarea 
                } else if (tarea.estado === "En proceso"){
                    tarea.estado = "Completado"
                    return tarea
                }
               
        } 
           return tarea
        })
    

        fs.writeFileSync('./tareas.json',JSON.stringify(tareasActualizadas,null,3))
        
        return console.log("¡Su tarea fue actualizada!")
    
},
 
    
    eliminarTareas : (id) => {

        if (process.argv[3] === undefined){
            return console.log("¡Debes colocar un ID!")
        }    

        let check = tareas.filter(tarea => tarea.id === id);

        if(check.length === 0){
            return console.log('¡ID inexistente!');
        }

        let tareasEliminada = tareas.filter (tarea => {

            return tarea.id !== id    
        })


        fs.writeFileSync('./tareas.json',JSON.stringify(tareasEliminada,null,3))
        return console.log("¡Tarea eliminada!")

        
        


    },

    filtrarTareas : (estado) => {
    
    let estadosTareas = ["Pendiente", "En proceso", "Completado"]

    if (!estadosTareas.includes(estado)){

        return console.log("Debes colocar uno de los siguentes estados : " , estadosTareas)


    }  
    let tareasFiltradas =  tareas.filter ((tarea) => {

        return tarea.estado === estado})

    mostrarTareas(tareasFiltradas)

    return null        
},

    buscarTarea : (keyword) => {
        
        
        let tareaEncontrada = tareas.filter(tarea => {

         return tarea.descripcion.includes(keyword)
            
        })

        

        if (!keyword){

            return console.log("¡Coloca la descripcion de la tarea que quieres encontrar!")

        }
        
        else {

            if (tareaEncontrada !== false) {    

                return console.log(mostrarTareas(tareaEncontrada))    

               
            }
                return console.log("Tarea no encontrada")
                      
        } 
    }
}





    



        
