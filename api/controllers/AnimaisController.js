const knex = require('../database')

module.exports = {
    async create(req, res, next) {
        try {
            const { nome, especie, raca, genero, rga, obs, status } = req.body
            const { id } = req.params

            if(!id)
                res.status(400).json({ error: 'ID do cliente ausente.' })

            const novoAnimal = {
                nome,
                especie,
                raca,
                genero,
                rga,
                obs,
                status
            }
            
            const [idAnimal] = await knex('animais').insert(
                novoAnimal
            ).returning('idAnimal')
                
            await knex('propriedades').insert({
                idCliente: id,
                idAnimal
            })

            return res.status(201).send()
        } catch (error) {
            next(error)
        }
    },

    async update(req, res, next) {
        const { nome, especie, raca, genero, rga, obs, status } = req.body
        const { id } = req.params

        try{
            await knex('animais').update({
                nome,
                especie,
                raca,
                genero,
                rga,
                obs,
                status
            }).where({ idAnimal: id })

            return res.send()
        } catch (error) {
            next(error)
        }
    },

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const animalExiste = await knex('animais').where({ idAnimal: id }).first()

            if(!animalExiste)
                return res.status(404).json({ error: 'Animal não encontrado' })
            
            const idSolicitacoes = await knex('solicitacoes_de_servicos')
                .select('idSolicitacao')
                .where({ idAnimal: id });
          
            if (idSolicitacoes.length > 0) {
                const idsSolicitacoes = idSolicitacoes.map((solicitacao) => solicitacao.idSolicitacao);
            
                await knex('execucoes').whereIn('idItemSolicitacao', function() {
                    this.select('idItemSolicitacao').from('item_solicitacao').whereIn('idSolicitacao', idsSolicitacoes);
                }).del();
            
                await knex('item_solicitacao').whereIn('idSolicitacao', idsSolicitacoes).del();
            }
        
            await knex('solicitacoes_de_servicos').where({ idAnimal: id }).del();
            await knex('propriedades').where({ idAnimal: id }).del();
            await knex('animais').where({ idAnimal: id }).del();
            return res.send()
        } catch(error) {
            next(error)
        }
    },

    async listAgender(req, res, next) {
        try {
            const { id } = req.params
            const agendamentos = await knex('solicitacoes_de_servicos')
                .where({ idAnimal: id })

            res.json(agendamentos)
        } catch(error){
            next(error)
        }
    }
}