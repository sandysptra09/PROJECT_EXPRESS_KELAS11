const router = require('express').Router();
const { users } = require('../controllers');

// GET localhost:8080/users => Ambil semua data users
router.get('/', users.ambilDataUsers);

// POST localhost:8080/users/add => Menambah data users ke database
router.post('/add', users.tambahDataUsers);

// // PUT localhost:8080/users/edit => Mengubah data users
// router.put('/edit/:id', barang.ubahDataUsers);

// // // POST localhost:8080/users/delete => Menghapus data users
// router.delete('/delete/:id', barang.hapusDataUsers)

module.exports = router;