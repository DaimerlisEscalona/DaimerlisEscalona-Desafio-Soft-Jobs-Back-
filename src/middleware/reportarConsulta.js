const { DateTime } = require("luxon");

const reportarConsulta = async (req, res, next) => {
  let parametros;
  if (Object.entries(req.params).length === 0) parametros = req.query;
  else parametros = req.params;
  const url = req.url;

  const localDatetime = (this.localDatetime = DateTime.local().toLocaleString(
    DateTime.DATETIME_FULL
  ));
  console.log(url);
  console.log(
    `
    Hoy ${localDatetime}
    Se ha recibido una consulta en la ruta ${url} con los parámetros: 
    `,
    parametros
  );
  next();
};

module.exports = { reportarConsulta };