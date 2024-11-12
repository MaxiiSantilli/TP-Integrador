import { Admin } from "./admin.entity.js";
import { orm } from "../shared/db/orm.js";
const em = orm.em;
function sanitizarAdminInput(req, res, next) {
    req.body.sanitizarAdm = {
        nombre: req.body.nombre,
        contraseña: req.body.contraseña,
        apellido: req.body.apellido,
        mail: req.body.mail,
        fecha_nacimiento: req.body.fecha_nacimiento,
        id: req.body.id,
        torneos: req.body.torneos
    };
    //Acá irían las validaciones de datos...
    Object.keys(req.body.sanitizarAdm).forEach(key => {
        if (req.body.sanitizarAdm[key] === undefined) {
            delete req.body.sanitizarAdm[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const admins = await em.find(Admin, {}, { populate: ['torneos'] });
        res.status(200).json({ message: 'found all admins', data: admins });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const admin = await em.findOneOrFail(Admin, { id }, { populate: ['torneos'] });
        res.status(200).json({ message: 'found admin', data: admin });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const admin = em.create(Admin, req.body);
        await em.flush();
        res.status(200).json({ message: 'admin created', data: admin });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const admin = em.findOneOrFail(Admin, id);
        em.assign(Admin, req.body);
        await em.flush();
        res.status(200).json({ message: 'admin updated', data: admin });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = Number.parseInt(req.params.id);
        const admin = em.getReference(Admin, id);
        await em.removeAndFlush(admin);
        res.status(200).json({ message: 'admin removed' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizarAdminInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=admin.controler.js.map