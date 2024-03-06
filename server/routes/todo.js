const { Router } = require('express');
const router = Router();
const Todo = require('../models/Todo')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')

// api/todo/create
router.post('/create',  
  [
    check('value', 'Need to enter some todo')
      .notEmpty()
  ],
  auth, 
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
          return res.status(400).json({ 
              status: 'error',
              errors: errors.array(), 
          })
      }

      const { value } = req.body; 

      const candidate = await Todo.findOne({ value })

      if (candidate) {
        return res.status(409).json({ 
            status: 'error',
            errors: ['Todo with this value already exists'],
        })
      }

      const newTodo = new Todo({
        date: Date.now(), 
        value,
        userId: req.user.userId,
      });

      await newTodo.save(); 

      res.status(201).json({ 
        status: 'ok',
        message: `Todo created`,
        newTodo
    })} 
    catch (error) {
      res.status(500).json({ status: 'error', errors: [`Something happened to server. More: ${error.message}`] });
    }
  }
)

// api/todo/all
router.get('/all', 
  auth, 
  async (req, res) => {
    try {
      const todos = await Todo.find({ creator: req.user.userId })
      res.status(200).json({ status: 'ok', message: `You get ${todos.length} todos`, todos})
    } catch (e) {
      res.status(500).json({ status: 'error', errors: [`Something happed to server. More: ${e.message}`] })
    }
  }
)

// api/todo/:id
router.get('/:id', auth, async (req,res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    res.status(200).json({ status: 'ok', message: `You get ${todo.id} todo`, todo})
  } catch (e) {
    res.status(500).json({ status: 'error', errors: [`Something happed to server. More: ${e.message}`] })
  }
})


// // api/todo/delete
// router.delete('/delete',  
//   auth, 
//   async (req, res) => {
//     try {

//       if (candidate) {
//         return res.status(409).json({ 
//             status: 'error',
//             errors: ['Todo with this value already exists'],
//         })
//       }

//       const newTodo = new Todo({
//         date: Date.now(), 
//         value,
//         creator: req.user.userId 
//       });

//       await newTodo.save(); 

//       res.status(201).json({ 
//         status: 'ok',
//         message: `Todo ${req.params.id} deleted`
//     })} 
//     catch (error) {
//       res.status(500).json({ status: 'error', errors: [`Something happened to server. More: ${error.message}`] });
//     }
// })


module.exports = router;