const { Router } = require('express');
const Classes = require('./models')

const classHandler = Router()

function checkUser(req, res, next) {
    if (req.user === 'teacher') {
        next();
    } else {
        res.status(400).json({ message: 'Unauthorized, must be an instructor' })
    }
}

classHandler.get('/', (req, res) => {
    Classes.getClass()
        .then(classes => {
            res.status(200).json(classes)
        })
        .catch(err => {
            res.status(500).json({ message: 'cannot find classes' })
        })
})

//getting a class by id
classHandler.get('/:id', (req, res) => {
    const { id } = req.params;
    Classes.findClass(id)
        .then(classes => {
            if (classes) {
                res.json(classes);
            } else {
                res.status(401).json({ message: 'Cannot find a class with the given id' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'cannot find classes' })
        })
})

//create class

classHandler.post('/', checkUser, (req, res) => {
    const newClass = req.body;
    if (newClass) {
        Classes.addClass(newClass)
            .then(createdClass => {
                res.status(200).json({ createdClass, message: 'new class added' })
            })
            .catch(err => {
                res.status(401).json({ message: 'Please provide required credentials' })
            })
    } else {
        res.status(500).json({ message: 'failed to add class' })
    }
})

//edit class
classHandler.put('/:id', checkUser, (req, res) => {
    const { id } = req.params;
    const edits = req.body;
    Classes.findClass(id)
        .then(classes => {
            if (classes) {
                Classes.editClass(edits, id)
                    .then(editedClass => {
                        res.json(editedClass)
                    })
            } else {
                res.status(401).json({ message: 'could not find class with the given id' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to update the class' })
        })
})

//remove a class
classHandler.delete('/:id', checkUser, (req, res) => {
    const { id } = req.body;
    Classes.deleteClass(id)
        .then(remove => {
            if (remove) {
                res.json({ delete: remove })
            } else {
                res.status(401).json({ message: 'could not find that class to delete' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed to delete the class' })
        })
})

module.exports = classHandler