const router = require("express").Router();
const axios = require("axios");
const { response } = require("../app");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get("/characters/create", (req, res) => {
    res.render("characters/create-character")
})

router.post("/characters/create", (req, res) => {
    if(req.body.debt === "on") {
        req.body.debt = true
    } else {
        req.body.debt = false
    }
    axios.post("https://ih-crud-api.herokuapp.com/characters", req.body)
    .then(responseFromAPI => {
        res.redirect("/characters")
    })
    .catch(err => console.error(err))
}) 


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get("/characters/:id/edit", (req, res) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        console.log(responseFromAPI.data)
        res.render("characters/edit-characters", { character: responseFromAPI.data })
    })
    .catch(err => console.error(err))
});

router.post("/characters/:id/update", (req, res) => {
    if(req.body.debt === "on") {
        req.body.debt = true
    } else {
        req.body.debt = false
    }
    axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, req.body)
    .then(responseFromAPI => {
        res.redirect(`/characters/${req.params.id}`)
    })
})


router.post("/characters/:id/delete", (req, res) => {
  axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
  .then(responseFromAPI => {
    console.log(responseFromAPI.data)
      res.redirect("/characters")
  })
})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters