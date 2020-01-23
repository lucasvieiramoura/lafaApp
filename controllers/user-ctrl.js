const User = require ('../models/user-model')

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            sucess: false,
            error: 'Insira dados do usuário',
        })
    }

    const user = new User(body)
    if(!user) {
        return res.status(400).json({
            sucess: false,
            error: err
        })
    }

    user.save()
        .then(() => {
            return res.status (201).json({
                sucess: true,
                id: user._id,
                name: body.name,
                email: body.email,
                message: "O usuário foi criado!",
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'O usuário não foi criado!',
            })
        })
}

getUsers = async (req, res) =>{
    await User.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({
                sucess: false,
                error: err
            })
        }
        if (!users.length){
            return res.status(404).json({
                sucess: false,
                error: "Usuários não encontrados"
            })
        }
        return res.status(200).json({
            sucess: true,
            data: users
        })
        
    }).catch(err => console.log(err))
}

module.exports = {createUser, getUsers}