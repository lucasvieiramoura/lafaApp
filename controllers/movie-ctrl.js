const Movie = require('../models/movie-model')

createMovie = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            sucess: false,
            error: 'Você necessita de dados para criar o filme',
        })
    }
    
    const movie = new Movie(body)
    if(!movie) {
        return res.status(400).json({sucess: false, error: err })
    }

    movie
        .save()
        .then(() => {
            return res.status(201).json({
                sucess: true,
                id: movie._id,
                message: "O filme foi criado!",
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'O filme não foi criado!',
            })
        })
}

updateMovie = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            sucess: false,
            error: 'Você necessita de dados para atualizar o filme',
        })
    }

    Movie.findOne({_id: req.params.id}, (err, movie) =>{
        if(err) {
            return res.status(404).json({
                err,
                message: 'Filme não encontrado',
            })
        }
        movie.name = body.name
        movie.time = body.time
        movie.rating = body.rating
        movie
            .save()
            .then(() => {
                return res.status(200).json({
                    sucess: true,
                    id: movie._id,
                    message: 'Filme atualizado',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'O filme não foi atualizado',
                })
            })
    })
}

deleteMovie = async (req, res) => {
    await Movie.findByIdAndDelete({_id: req.params.id}, (err, movie) =>{
        if (err) {
            return res.status(400).json({sucess: false, error: err})
        }

        if (!movie) {
            return res
                .status(404)
                .json({ sucess: false, error: 'Filme não encontrado'})
        }

        return res.status(200).json({ sucess: true, data: movie})
    }).catch(err => console.log(err))
}

getMovieById = async (req, res) => {
    await Movie.findOne({_id: req.params.id}, (err, movie) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err})
        }

        if (!movie) {
            return res
                .status(404)
                .json({ sucess: false, error: 'Filme não encontrado'})
        }
        return res.status(200).json({ sucess: true, data: movie})
    }).catch(err => console.log(err))
}

getMovies = async (req, res) => {
    await Movie.find({}, (err, movies) => {
        if (err) {
            return res.status(400).json({ sucess: false, error: err})
        }
        if (!movies.length) {
            return res
                .status(404)
                .json({ sucess: false, error: 'Filmes não econtrados'})
        }
        return res.status(200).json({sucess: true, data: movies })
    }).catch(err => console.log(err))
}

module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieById,
    getMovies
}