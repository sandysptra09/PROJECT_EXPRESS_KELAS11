const router = require('express').Router();
const routeUsers = require('./users');
const routeKategori = require('./kategori')
const routeSupplier = require('./supplier')
const routeTransaksi = require('./transaksi')

// GET localhost:8080/users => Ambil data users
router.use('/register', routeUsers);

// GET localhost:8080/kategori => Ambil data kategori
router.use('/kategori', routeKategori);

// GET localhost:8080/supplier => Ambil data supplier
router.use('/supplier', routeSupplier);

// GET localhost:8080/transaksi => Ambil data transaksi
router.use('/transaksi', routeTransaksi);

module.exports = router;