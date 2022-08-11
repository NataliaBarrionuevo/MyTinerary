const joi = require('joi'); //requerimos el paquete para poder utilizarlo.

const validator = (req, res, next) => {
    
    //console.log(req.body)

    //Creamos un esquema de validación (validador):
    const schema = joi.object({ //creo la cte schema, que va a ser igual a joi, en su método object. El mismo permitirá definir cada una de las propiedades a validar y las condiciones en las que se harán esas validaciones.

        //Establecemos la tabla u objeto de validaciones.
        // Los datos que recibe el validador (a través de req.body) dependen de la cantidad de datos o parámetros enviados desde formulario de SignUp (mismo orden).
        // En este caso, los mismos entran como userData.

        firstName: joi.string()
            .max(20)
            .min(3)
            .trim() //en el cuadrante de entrada se limpiarán espacios anteriores y posteriores.
            .pattern(new RegExp('[a-zA-Z]')) //expresión regular: debe contener letras mayúsculas y minúsculas de la a a la z.
            .required() //campo requerido.
            .messages({
                'string.min': 'first name: min 3 characters', //se entra en esta respuesta al entrar al  2º campo de validación. string.min-->se establece el tipo texto en mínimo.
                'string.max': 'first name: max 20 characters'
            }), //se entra en esta respuesta al entrar al  1º campo de validación.
        lastName: joi.string()
            .min(3)
            .max(20)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': '"last name": min 3 characters',
                'string.max': '"last name": max 20 characters'
            }),
        email: joi.string()
            .email({minDomainSegments:2}) //2 segmentos como mínimo: textoAnterior@textoPosterior.
            .min(10)
            .required()
            .messages({
                'string.email': '"email": incorrect format'
            }),
        password: joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('[a-zA-Z0-9]'))//alfanumérico, con mayúsculas incluidas; números del 0 al 9.
            .required()
            .messages({
                'string.min': '"password": min 8 characters',
                'string.max': '"password": max 30 characters'
            }),
        userPhoto: joi.string()
            
            .required(),
        country: joi.string()
             
            .required(),
        
        from: joi.string() //dato que viene con el SignUp, pero no lo manipula el usuario, por lo que solo establezco que será un string (lo debo incluir porque viene con los datos del usuario)
    })

    const validation = schema.validate(req.body.userData, {abortEarly:false}) //abortEarly:false permite obtener la información de error toda junta, es decir, no abortar cada vez q encuentra un error, sino seguir hasta tener el resultado final.
    
    if (validation.error) {
        return res.json({success: false, from: 'validator', message: validation.error.details, test: validation})
    }
    next() //si no hay errores, el formulario continúa (no da una respuesta)
}

module.exports = validator;