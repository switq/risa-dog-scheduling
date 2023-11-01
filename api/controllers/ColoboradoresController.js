const knex = require('../database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

function gerarToken(params = {}){
    return jwt.sign({ params }, authConfig.secret, {
        expiresIn: 86400
    })
}

module.exports = {
    async index(req, res, next) {
        try {
            const results = await knex('colaboradores')
            return res.json(results)
        } catch(error){
            next(error)            
        }
    },
    
    async create(req, res, next){
        try {
            const { nome, email, senha} = req.body

            if(!nome || !email || !senha){
                return res.status(400).json({ error: 'Por favor, forneça todos os campos obrigatórios' })
            }

            const usuarioValido = await knex('colaboradores')
                .where({ email })
                .first()

            if(usuarioValido){
                return res.status(400).send({ error: 'Usuario já cadastrado' })
            }

            const hashSenha = await bcrypt.hash(senha, 10)
            const usuario = {
                nome,
                email,
                senha: hashSenha,
                status: 'Ativo'
            }

            await knex('colaboradores').insert(usuario)
            return res.send({
                usuario, 
                token: gerarToken({ idColoborador: usuario.idColoborador })
            })
        } catch(error){
            next(error)
        }
    },

    async login(req, res, next){
        try {
            const { email, senha } = req.body
            
            if(!email || !senha){
                return res.status(400).send({ error: 'Email e senha obrigatórios.' })
            }

            const usuario = await knex('colaboradores')
                .where({ email })
                .first()

            if(!usuario){
                return res.status(400).send({ error: 'Usuário não encontrado' })
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha)
            if(!senhaValida){
                return res.status(400).send({ error: 'Senha Inválida' })
            }

            usuario.senha = undefined
            return res.send({ 
                usuario, 
                token: gerarToken({ idColoborador: usuario.idColoborador }) 
            })
        } catch(error){
            next(error)
        }
    },

    async agendarServicos(req, res, next){
        try {
            
        } catch(error){
            next(error)
        }
    }
}