const { create, index, show, update, destroy, student_total } = require('../Services/StudentService')
const { registerValidation } = require('../../config/validation')

module.exports = {
    create: (req, res) => {
        const body = req.body;
        const { error } = registerValidation(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection errror"
                });
            }
            if (!results) {
                return res.status(400).json({success:false});

            } else {
                return res.status(200).json({success:true});
            }
        });
    },
    index: (req, res) => {
        index((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json(results);
        });
    },
student_total: (req, res) => {
        student_total((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json(results);
        });
    },
    show: (req, res) => {
        const id = req.params.id;
        show(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    message: "Record not Found"
                });
            }
            //   results.password = undefined;
            return res.json(results);
        });
    },
    update: (req, res) => {
        const body = req.body;
        const id = req.params.id;       
        update(id, body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                message: "Updated successfully"
            });
        });
    },
    destroy: (req, res) => {
        const id = req.params.id;
        destroy(id, (err) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                message: "Deleted successfully"
            });
        });
    }
}
