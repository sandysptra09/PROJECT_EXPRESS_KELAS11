const router = require('express').Router();
const { transaksi } = require('../controllers');

// GET localhost:8080/transaksi => Ambil semua data transaksi
router.get('/', transaksi.ambilDataTransaksi);

// POST localhost:8080/transaksi/add => Menambah data transaksi ke database
router.post('/add', transaksi.tambahDataTransaksi);

// PUT localhost:8080/transaksi/edit => Mengubah data transaksi
router.put('/edit/:no_transaksi', transaksi.ubahDataTransaksi);

// // POST localhost:8080/transaksi/delete => Menghapus data transaksi
router.delete('/delete/:no_transaksi', transaksi.hapusDataTransaksi)

module.exports = router;