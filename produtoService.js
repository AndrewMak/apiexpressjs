const express = require('express')
const router = express.Router();

// Produto Model

const Produto = require('./produto')


// @route GET api/produtos
// @desc Get All produtos
// @access Public
router.get('/', (req, res) => {
    Produto.find()
    .then(produtos => res.json(produtos));
});

// @route GET api/produtos
// @desc Get All produtos
// @access Public
router.get('/:id', (req, res) => {
        Produto.findById(req.params.id)
        .then(produtos => res.json(produtos))
        .catch(err => res.status(404).json({
            success: false
        }));
});

// @route   POST api/produtos
// @desc    Create An Produto
// @access  Public
router.post('/', (req, res) => {
    const newProduto = new Produto({
        nome_produto:req.body.nome_produto,
        desc_produto:req.body.desc_produto,
        preco_produto:req.body.preco_produto
    });

    newProduto.save().then(Produto => res.json(Produto));
});

// @route   DELETE api/produtos/:id
// @desc    Delete A Produto
// @access  Public
router.delete('/delete/:id', (req, res) => {
    Produto.findById(req.params.id)
        .then(Produto => Produto.remove().then(() => res.json({
            success: true
        })))
        .catch(err => res.status(404).json({
            success: false
        }));
});

router.put('/:id',(req,res)=>{
    Produto.updateOne({ _id: req.params.id}, req.body, false).then(Produto => res.json(Produto)).catch(err => res.status(404).json({
        success: false
    }));
});
module.exports = router;