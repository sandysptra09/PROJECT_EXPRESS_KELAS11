const router = require('express').Router();
const { kategori } = require('../controllers');

// GET localhost:8080/kategori => Ambil semua data kategori
router.get('/', kategori.ambilDataKategori);

// POST localhost:8080/kategori/add => Menambah data kategori ke database
router.post('/add', kategori.tambahDataKattegori);

// PUT localhost:8080/kategori/edit => Mengubah data kategori
router.put('/edit/:kode_kategori', kategori.ubahDataKategori);

// // // POST localhost:8080/users/delete => Menghapus data users
// router.delete('/delete/:id', barang.hapusDataUsers)

module.exports = router;