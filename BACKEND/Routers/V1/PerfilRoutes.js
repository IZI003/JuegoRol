const { Router } = require('express');
const router = Router();
const PerfilControllers = require('../../Controllers/PerfilControllers');

router
  .get('/usuarios/', PerfilControllers.obtener)
  .get('/usuarios/:id', PerfilControllers.obtenerporId)
  .post('/usuarios/', PerfilControllers.crear)
  .put('/usuarios/:id', PerfilControllers.actualizar);
/*   .delete('/usuarios/:id', PerfilControllers.eliminar)*/

module.exports = router;