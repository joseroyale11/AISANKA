const Service_aula =
require('../services/Service_aula');

const misAulas = async (req, res) => {

    try {

        const resultado =
        await Service_aula.obtenerMisAulas(
            req.usuario.id_usuario
        );

        res.json(resultado);

    } catch (error) {

        res.status(400).json({
            mensaje: error.message
        });

    }

};

module.exports = {
    misAulas
};