const knex = require('../database')

module.exports = {
    async index(req, res, next) {
        try {
            const results = await knex('clientes')
            return res.json(results)
        } catch(error){
            next(error)
        }
    },

    async create(req, res, next) {
        try {
            const { nome, cpf, dtNasc, tel1, tel2, email, cep, logradouro, numeroRes, complemento, bairro, localidade, uf, status } = req.body

            const dataDeCadastro = new Date()
            await knex('clientes').insert({
                nome,
                cpf,
                dtNasc,
                tel1,
                tel2,
                email,
                cep,
                logradouro,
                numeroRes,
                complemento,
                bairro,
                localidade,
                uf,
                status,
                dtCadastro: dataDeCadastro
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },
   
    async update(req, res, next) {
        const { nome, cpf, dtNasc, tel1, tel2, email, cep, logradouro, numeroRes, complemento, bairro, localidade, uf } = req.body
        const { id } = req.params
        
        try{
            await knex('clientes').update({
                nome, 
                cpf, 
                dtNasc, 
                tel1, 
                tel2, 
                email, 
                cep, 
                logradouro, 
                numeroRes, 
                complemento, 
                bairro, 
                localidade, 
                uf
            }).where({ idCliente: id })
            
            return res.send()
        } catch (error) {
            next(error)
        }
    },
    
    async delete(req, res, next) {
        try {
            const { id } = req.params
            
            await knex('clientes')
            .where({ idCliente: id })
            .del()
            
            return res.send()
        } catch(error) {
            next(error)
        }
    },

    async listAgender(req, res, next) {
        try {
            const { id } = req.query
            const agendamentos = await knex('clientes')
                .where({ idCliente: id })

            return res.json(agendamentos)
        } catch(error){
            next(error)
        }
    },

    async listAnimals(req, res, next){
        try {
            const { id } = req.params
            const animais = await knex('animais')
                .select('animais.*')
                .innerJoin('propriedades', 'animais.idAnimal', 'propriedades.idAnimal')
                .where('propriedades.idCliente', id)

            return res.json(animais)
        } catch(error){
            next(error)
        }
    },

    async listAnimalsClient(req, res, next){
        try {
            const { valor } = req.query;
            if (!valor) {
                return res.status(400).json({ error: 'Parâmetro não informado' });
            }

            let query = knex('clientes');
            if (!isNaN(valor)) {
                query.where('cpf', valor);
            } else {
                query.where('nome', 'like', `%${valor}%`);
            }

            const cliente = await query.first();

            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }

            const animais = await knex('animais')
                .select('animais.*')
                .innerJoin('propriedades', 'animais.idAnimal', 'propriedades.idAnimal')
                .where('propriedades.idCliente', cliente.idCliente);

            return res.json(animais);
        } catch (error) {
            next(error);
        }
    },

    async buscaClient(req, res, next){
        const { valor } = req.query

        if (!valor) {
            return res.status(400).json({ error: 'Parâmetro não informado' })
        }

        let query = knex('clientes')

        if (!isNaN(valor)) {
            query.where('cpf', valor)
        } else {
            query.where('nome', 'like', `%${valor}%`)
        }

        try {
            const cliente = await query.first()

            if (cliente) {
                return res.json(cliente)
            } else {
                return res.status(404).json({ error: 'Cliente não encontrado' })
            }
        } catch(error){
            next(error)
        }
    },

    async listNomesCpf(req, res, next){
        try{
            const results = await knex('clientes').select('nome', 'cpf')
            return res.json(results)
        } catch(error){
            next(error)
        }
    }
}