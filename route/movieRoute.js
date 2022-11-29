const route = require('express').Router();
const verify = require('../verify');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Movie = require('../model/movie');



//Uploading file setup libary using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

// 1.To get all movie 
// 2.To get by type
// 3.To get by id single movie
route.get('/', async (req, res) => {
    // if (req.query.type) {
    //     try {
    //         const comedyMovie = await Movie.find({ m_type: req.query.type })
    //         res.json({ comedyMovie });
    //     } catch (error) {
    //         console.log(error)
    //     }
    // } else if (req.query.id) {
    //     const id = req.query.id
    //     const movie = await Movie.findById({ _id: id })
    //     res.json(movie)
    // } else {
    //     try {
    //         const movie = await Movie.find();
    //         res.json({ movie });
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // type= horror,comedy,action,scifi,romance,thriller,animation,drama,webshow
    const horror=await Movie.find({m_type:"horror"}); 
    const comedy=await Movie.find({m_type:"comedy"}); 
    const action=await Movie.find({m_type:"action"}); 
    const scifi=await Movie.find({m_type:"scifi"}); 
    const romance=await Movie.find({m_type:"romance"}); 
    const thriller=await Movie.find({m_type:"thriller"}); 
    const animation=await Movie.find({m_type:"animation"}); 
    const drama=await Movie.find({m_type:"drama"}); 
    const webshow=await Movie.find({m_type:"webshow"}); 

    const movies={
        horror:horror,
        comedy:comedy,
        action:action,
        scifi:scifi,
        romance:romance,
        thriller:thriller,
        animation:animation,
        drama:drama,
        webshow:webshow,
    }
    
    res.json({movies:movies});
})

// To upload movie

route.post('/upload_movie',verify, upload.single('m_poster'), async (req, res) => {
    const { m_title, m_description, m_background, m_releaseDate, m_rating, m_type, m_link } = req.body;
   if(req.user.isAdmin){
    try {
        const m_poster = {
            data: req.file.filename,
            contentType: 'image/png'
        }

        const newMovie = await Movie.create({ m_title, m_description, m_background, m_releaseDate, m_rating, m_type, m_link: m_poster.data });
        if (newMovie) {
            res.json({ newMovie: newMovie });
        } else {
            res.send("data has not uploded");
        }
    } catch (error) {
        console.log(error)
    }
   }
})

//Updating and deleting movie by id using query perameter

route.post('/', verify, async (req, res) => {
    if (req.user.isAdmin) {
        if (!req.query.deleteid) {
            try {
                console.log(req.query.updateid)
                const updateMovie = await Movie.updateOne({ _id: req.query.updateid }, { $set: req.body }, { new: true });
                if (updateMovie) {
                    console.log(req.body);
                    res.json({ updateMovie: updateMovie });
                } else {
                    res.send("data has not uploded");
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const deleteMovie = await Movie.deleteOne({ _id: req.query.deleteid });
                if (deleteMovie) {
                    res.json({ deleteMovie });
                } else {
                    res.send("data has not uploded");
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
})

module.exports = route;