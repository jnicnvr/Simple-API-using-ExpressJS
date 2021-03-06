const { create, index, show } = require('../Services/AdminLogsService')
const { adminLogsValidation } = require('../Validations/AdminLogsValidation')

module.exports = {
    create: (req, res) => {
        const body = req.body;

        const { error } = adminLogsValidation(req.body);
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
            return res.status(200).json({
                data: results
            });
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
            return res.json(results);
        });
    },
}
