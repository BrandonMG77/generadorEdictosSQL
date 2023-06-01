let cuerpo;
let caracter;
let caracter2;
let guardaTexto = [];
let guardaTexto2 = [];
let guardaTextosincomas = [];
let guardaTextosincomas2 = [];
let stringTexto = String;
let stringTexto2 = String;
let palabra = [];
let palabra2 = [];
let guardandoPalabras = [];
let guardandoPalabras2 = [];
let parrafo = [];
let parrafoString = String;
let parrafoGenerado;
let precioBase = [];
let newIndice;
let finalIndice;
let provincia;
let fecha = [];
let arreglotemporal = [];
let sql = [];
let cuerpoImpreso = '';
let dia = String;
let mes = String;
let anno = String;
// Final SQL data to insert
let fechaSQL = String;
let precioSQL = String;
let provinciaSQL = String;
// Acciona la app
document.querySelector('#leer').addEventListener('click', function () {
    const guess = document.querySelector('#text').value;
    document.querySelector('#cuerpo').textContent = guess + ' ';
    cuerpo = document.querySelector('#cuerpo').textContent;

    recorreTexto(cuerpo);
    generaParrafo(palabra);

    for (let i = 0; i<parrafo.length; i++){
        baseClave(parrafo[i]);
        fechaClave(parrafo[i]);
        provinciaClave(parrafo[i]);
        precioBase = precioBase.join('');
        console.log(fecha.length);
        transformaFechaEscrita(fecha);
        fecha = fecha.join('');
        console.log(precioBase,fecha,provincia);
        console.log(fecha.length);
        console.log(provincia);
        provinciaSQL=provincia.substring(0,provincia.length-2)
        console.log(provinciaSQL);
        console.log(precioSQL);
        console.log(fechaSQL);
        console.log(parrafo[i]);
        arreglotemporal.push(provincia,precioBase,fecha, '||'+ parrafo[i]);
        console.log(

            "INSERT INTO `remates` (`id`, `fecha1`, `fecha2`, `fecha3`, `base1`, `base2`, `base3`, `numRemate`, `numExpediente`, `acreedor`, `provincia`, `canton`, `distrito`, `descripcion`, `tamLote`, `base_1d`, `paid`, `plano`, `url`) VALUES (NULL,"+"'"+fechaSQL+"'"+", NULL, NULL,"+precioSQL+", NULL, NULL, NULL, NULL, NULL, '"+provinciaSQL+"', NULL, NULL, '"+parrafo[i]+"', NULL, NULL, '0', '0', '');"



        );
        // Archivo FINAL **************************************************************
        sql.push(arreglotemporal.join('||')); // separating 
        //*****************************************************************************
        arreglotemporal = [];
        reiniciaVariableexternas();
        //console.log(sql);
    }
    // Imprime

    for (let i=0; i < sql.length; i++){
        cuerpoImpreso = cuerpoImpreso + sql[i] + '<br>';
    }
    //document.querySelector('#cuerpo').textContent = cuerpoImpreso;
    document.write(cuerpoImpreso);

})

function recorreTexto (texto) {

    for (let i = 0; i <= texto.length; i++) {

        caracter = texto.charAt(i);
        guardaTexto.push(caracter);

        if (caracter === ' ') {

            palabra.push(guardaTexto);
            guardaTexto = [];

        }

} 

guardaTextosincomas = guardaTexto.join('');
stringTexto = guardaTextosincomas.toString();

console.log(palabra);
console.log(stringTexto);

return guardaTexto;

}

function generaParrafo(palabra){

    for (let i = 0; i < palabra.length; i++) {

       guardandoPalabras.push (palabra[i].join(''));
      
       
       if (palabra[i].join('') == '). '){

           parrafo.push(guardandoPalabras.join(''));
           guardandoPalabras = [];

       }

    }   
    return parrafo;
}


function recorreParrafo (parrafo) {

    for (let i = 0; i <= parrafo.length; i++) {


        caracter2 = parrafo.charAt(i);
        guardaTexto2.push(caracter2);

        if (caracter2 === ' ') {

            palabra2.push(guardaTexto2);
            guardaTexto2 = [];
        }

} 

guardaTextosincomas2 = guardaTexto2.join('');
stringTexto2 = guardaTextosincomas2.toString();


console.log(palabra2);
console.log(stringTexto2);

return guardaTexto2;

}


function baseClave (parrafoGenerado) {
    parrafoGenerado = parrafoGenerado;
    recorreParrafo(parrafoGenerado);

    for (let i = 0; i < palabra2.length; i++) {

    guardandoPalabras2.push(palabra2[i].join(''));
   
    if (newIndice === undefined) {
        console.log('No está definido');

        if (palabra2[i].join('') == 'base '){
            console.log('Encontré una base');
            newIndice = [i];
            console.log(newIndice);  
    
        }

    }

 }

    if (newIndice !== undefined) {
    newIndice = parseInt(newIndice);
    newIndice = newIndice + 2;
    console.log(newIndice);
    
            for (let i = newIndice; i < palabra2.length; i++) {
                
        

            if (palabra2[i].join('') == 'dólares ' || palabra2[i].join('') == 'colones, ' || palabra2[i].join('') == 'exactos, ' || palabra2[i].join('') == 'céntimos, ' ){
            console.log('Encontré un colón');
            finalIndice = [i];
            finalIndice = parseInt(finalIndice);
            console.log(finalIndice);
            break;
           
            }

    }

    for (let i = newIndice; i <= finalIndice; i++) {
        
        precioBase.push(palabra2[i].join(''));
        
    }
 
}
    finalIndice = parseInt(precioBase.length - 1);
    console.log(finalIndice);
    if ( precioBase[finalIndice] == 'exactos, ') {
        
        precioBase.pop();
    
    }
    // Checking precioBase, if there is and Y then put together 0,1 and 2
    console.log( precioBase[0]);
    console.log(precioBase[1]);
    if (precioBase[1] === 'y ') {

        let precioBaseTogether = [];
        let precioBaseFinal = String;   // create 2 new variables, an  array and a string
        precioBaseTogether.push(precioBase[0]);
        precioBaseTogether.push(precioBase[1]);
        precioBaseTogether.push(precioBase[2]);        // Adding complete number to one array
        precioBaseFinal = precioBaseTogether.join('');  //transforming array into String
        console.log(precioBaseFinal);
        console.log(precioBase[3]);
        precioBase[0] = generaNumeros(precioBaseFinal);    // Call generaNumeros with the real number
        precioBase[1] = generaMagnitud(precioBase[3]);           // Pasing real magnitude to generaMagnitud
      
    } else {

        precioBase[0] = generaNumeros(precioBase[0]);
        precioBase[1] = generaMagnitud(precioBase[1]);
    }

    

    console.log(precioBase);
    console.log(precioBase[0]);
    
    let baseTemporal = [];
    baseTemporal.push(precioBase[0]);
    baseTemporal.push(precioBase[1]);
    precioSQL = baseTemporal.join('');
    console.log(precioSQL);
  
 
reiniciaVariablesinternas();
}

function provinciaClave (parrafoGenerado) {
    parrafoGenerado = parrafoGenerado;
    recorreParrafo(parrafoGenerado);

    for (let i = 0; i < palabra2.length; i++) {

        guardandoPalabras2.push(palabra2[i].join(''));
       
        if (palabra2[i].join('') == 'provincia ' || palabra2[i].join('') == 'Provincia ' ) {

       
            provincia = palabra2[i+2].join('');
            if (provincia == 'San '){
                provincia = 'San José'
            }
            console.log(provincia);
            
        } else {
            if (palabra2[i].join('') == 'vehículo '){provincia = 'Es un vehículo'}
        }
    
     }
     reiniciaVariablesinternas();
}

function fechaClave (parrafoGenerado) {

    parrafoGenerado = parrafoGenerado;
    recorreParrafo(parrafoGenerado);

    for (let i = 0; i < palabra2.length; i++) {

    guardandoPalabras2.push(palabra2[i].join(''));
   
    if (newIndice === undefined) {
        console.log('No está definido');

        if (palabra2[i].join('') == 'señalan '){
            console.log('Encontré una fecha');
            newIndice = [i];
            console.log(newIndice);  
        }
    }
 }

    if (newIndice !== undefined) {
    newIndice = parseInt(newIndice);
    newIndice = newIndice + 1;
    console.log(newIndice);
                for (let i = newIndice; i < palabra2.length; i++) {
                   // console.log(palabra2[i].join(''));
                if (palabra2[i].join('') === 'veintiuno. '){
                console.log('Encontré un año');
                finalIndice = [i];
                finalIndice = parseInt(finalIndice);
                console.log(finalIndice);
                break;
            
                } else if (palabra2[i].join('') == 'veintiuno '){
                    console.log('Encontré un año');
                    finalIndice = [i];
                    finalIndice = parseInt(finalIndice);
                    console.log(finalIndice);
                    break;
                
                    } else if (palabra2[i].join('') == 'veintidós. '){
                        console.log('Encontré un año');
                        finalIndice = [i];
                        finalIndice = parseInt(finalIndice);
                        console.log(finalIndice);
                        break;
                    
                        } else if (palabra2[i].join('') == 'veintidós '){
                            console.log('Encontré un año');
                            finalIndice = [i];
                            finalIndice = parseInt(finalIndice);
                            console.log(finalIndice);
                            break;
                        
                            } 
                            else if (palabra2[i].join('') == 'veintitrés '){
                                console.log('Encontré un año');
                                finalIndice = [i];
                                finalIndice = parseInt(finalIndice);
                                console.log(finalIndice);
                                break;
                            
                                }  else if (palabra2[i].join('') == 'veintitrés. '){
                                    console.log('Encontré un año');
                                    finalIndice = [i];
                                    finalIndice = parseInt(finalIndice);
                                    console.log(finalIndice);
                                    break;
                                
                                    } 
                            

        }

                for (let i = newIndice; i <= finalIndice; i++) {
            
                        fecha.push(palabra2[i].join(''));
        }
    
}
    
/*
    finalIndice = precioBase.indexOf('colones ');
    console.log(finalIndice);
    precioBase[finalIndice] = 'colones';

    */
    console.log(fecha.length);
    reiniciaVariablesinternas();

}

function reiniciaVariablesinternas (){
    // func recorreP
    caracter2 = undefined;
    guardaTexto2 = [];

    // func generica
    newIndice = undefined;
    finalIndice = undefined;
    guardandoPalabras2 = [];
    palabra2 = [];
}

function reiniciaVariableexternas (){
    fecha = [];
    provincia = '';
    precioBase = [];

    }

    // Base de referencias para transformación de fechas a fechas en número

    function generaNumeros (numeroLetra){

        switch (numeroLetra) {

            case 'uno ':
            numeroLetra = 1;
            break;
            case 'dos ':
            numeroLetra = 2;
            break;
            case 'tres ':
            numeroLetra = 3;
            break;
            case 'cuatro ':
            numeroLetra = 4;   
            break;
            case 'cinco ':
            numeroLetra = 5;
            break;
            case 'seis ':
            numeroLetra = 6;
            break;
            case 'siete ':
            numeroLetra = 7;
            break;
            case 'ocho ':
            numeroLetra = 8;
            break;
            case 'nueve ':
            numeroLetra = 9;
            break;
            case 'diez ':
            numeroLetra = 10;
            break;
            case 'once ':
            numeroLetra = 11;
            break;
            case 'doce ':
            numeroLetra = 12;
            break;
            case 'trece ':
            numeroLetra = 13;
            break;
            case 'catorce ':
            numeroLetra = 14;
            break;
            case 'quince ':
            numeroLetra = 15;
            break;
            case 'dieciséis ':
            numeroLetra = 16;
            break;
            case 'diecisiete ':
            numeroLetra = 17;
            break;
            case 'dieciocho ':
            numeroLetra = 18;
            break;
            case 'diecinueve ':
                numeroLetra = 19;
            break;
            case 'veinte ':
                numeroLetra = 20;
            break;
            case 'veintiuno ':
                numeroLetra = 21;
            break;
            case 'veintiún ':
                numeroLetra = 21;
            break;
            case 'veintidós ':
                numeroLetra = 22;
            break;
            case 'veintitrés ':
                numeroLetra = 23;
            break;
            case 'veinticuatro ':
                numeroLetra = 25;
            break;
            case 'veinticinco ':
                numeroLetra = 26;
            break;
            case 'veintiseis ':
                numeroLetra = 27;
            break;
            case 'veintisiete ':
                numeroLetra = 28;
            break;
            case 'veintiocho ':
                numeroLetra = 29;
            break;
            case 'treinta y uno ':
                numeroLetra = 31;
            break;
            case 'treinta y dos ':
                numeroLetra = 32;
            break;
            case 'treinta y tres ':
                numeroLetra = 33;
            break;
            case 'treinta y cuatro ':
                numeroLetra = 34;
            break;
            case 'treinta ':
                numeroLetra = 30;
            break;

        }

        return numeroLetra;
    }

    function generaMagnitud (numeroLetra){
      
        switch (numeroLetra) {
            case 'cientos':
                numeroLetra = '0';
                break;
            case 'mil ':
            numeroLetra = '000';
            break;
            case 'millones ':
                numeroLetra = '000000';
            break;
        }
    return numeroLetra;
    
    }


    function generaMes (mesLetra) {
        switch (mesLetra) {
            case 'enero ':
                mesLetra = '1';
                break;
            case 'febrero ':
                mesLetra = '2';
            break;
            case 'marzo ':
                mesLetra = '3';
            break;
            case 'abril ':
                mesLetra = '4';
            break;
            case 'mayo ':
                mesLetra = '5';
            break;
            case 'junio ':
                mesLetra = '6';
            break;
            case 'julio ':
                mesLetra = '7';
            break;
            case 'agosto ':
                mesLetra = '8';
            break;
            case 'septiembre ':
                mesLetra = '9';
            break;
            case 'setiembre ':
                mesLetra = '9';
            break;
            case 'octubre ':
                mesLetra = '10';
            break;
            case 'noviembre ':
                mesLetra = '11';
            break;
            case 'diciembre ':
                mesLetra = '12';
            break;
        }
    return mesLetra;

    }

    function transformaFechaEscrita (fechaLetra) {
       let lastWord = 0;

     lastWord = fechaLetra.length;
     
     console.log(fechaLetra[lastWord-1]);
     anno = fechaLetra[lastWord-1];
     mes = fechaLetra[lastWord-5];
     dia = fechaLetra[lastWord-7];
     anno = anno.substring(0,anno.length-2) +' '; // remove the DOT
        

        anno = generaNumeros(anno);
        mes = generaMes(mes);
        dia = generaNumeros(dia);

        console.log(anno);
        console.log(mes);
        console.log(dia);

        fechaSQL = '20'+anno+'/'+mes+'/'+dia;
        console.log(fechaSQL);
    }




