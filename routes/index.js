var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' });

const IndexController = require('../controllers/IndexController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload_csv',upload.single('csv_file'),IndexController.PostCsv);
router.get('/get_data',IndexController.GetData);

module.exports = router;
