const router = require('express').Router();
const { supplier } = require('../controllers');

// GET localhost:8080/supplier => Ambil semua data supplier
router.get('/', supplier.ambilDataSupplier);

// POST localhost:8080/supplier/add => Menambah data supplier ke database
router.post('/add', supplier.tambahDataSupplier);

// PUT localhost:8080/supplier/edit => Mengubah data supplier
router.put('/edit/:kode_supplier', supplier.ubahDataSupplier);

// // // POST localhost:8080/users/delete => Menghapus data users
// router.delete('/delete/:id', barang.hapusDataUsers)

module.exports = router;