const config = require('../configs/database');
const mysql = require('mysql');
const session = require('express-session');
const express = require('express');
const { application } = require('express');
const connection = mysql.createConnection(config);
connection.connect();

const app = express();

// tahap 1 middleware
app.use(session({
    secret : 'mysecret',
    resave : true,
    saveUninitialized : true,
}));

// menampilkan semua data Transaksi
const ambilDataTransaksi = async (req, res) => {
    try{
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT transaksi.no_transaksi,transaksi.nama_barang,kategori.nama_kategori,supplier.nama_supplier,transaksi.harga,transaksi.jumlah,transaksi.diskon,transaksi.pengiriman,transaksi.biaya_pengiriman,transaksi.total_pembayaran FROM transaksi JOIN kategori ON transaksi.kode_kategori = kategori.kode_kategori JOIN supplier ON transaksi.kode_kategori = supplier.kode_supplier', function (error, rows ) {
                    if (rows) {
                        resolve(rows);
                    } else {
                        reject([]);
                    }
            });
        });
        if (req.session.loggedin) {
            res.send({
                    success : true,
                    message : 'Berhasil menampilkan data transaksi !',
                    data : data
            });
        } else {
            res.send({
                success : true,
                message : 'Silahkan Login Terlebih Dahulu'
            });
        }
    }
        catch (error) {
            console.log(error);
            res.send({
                    success : false,
                    message2: 'Gagal menampilkan data transaksi !',
                    
            });
        }
}

// menambah data Transaksi
const tambahDataTransaksi = async(req, res) => {
    try{
        
        if (req.body.pengiriman == "JNE"){
            biaya_pengiriman = 15000;
        } else if (req.body.pengiriman == "JNT"){
            biaya_pengiriman = 20000;
        } else if (req.body.pengiriman == "Express") {
            biaya_pengiriman = 30000
        } else {
            "Biaya pengiriman tidak tersedia";
        }

    let total = req.body.harga * req.body.jumlah

        // jika user membeli dengan harga ...
        if (total > 200000 ) {
                diskon = 50000;
        } else {
                diskon = 0;
        }

    let total_pembayaran = (total + biaya_pengiriman) - diskon ;
    
    let data = {
        nama_barang: req.body.nama_barang,
        kode_kategori: req.body.kode_kategori,
        kode_supplier: req.body.kode_supplier,
        harga : req.body.harga,
        jumlah : req.body.jumlah,
        diskon : diskon,
        pengiriman : req.body.pengiriman,
        biaya_pengiriman : biaya_pengiriman,
        total_pembayaran :total_pembayaran
    }
    const result = await new Promise((resolve, reject) => {
        connection.query('INSERT INTO transaksi SET ?;', [data], function(error, rows) {
            if (rows) {
                resolve(true);
            } else {
                reject(false);
            }
        });

    });
    if (result) {
        res.send({
            success:true,
            message: 'Berhasil melakukan transaksi !'
        });}
    
    } catch (error) {
        res.send({
            success: false,
            message: 'Gagal melakukann transaksi !',
        });
    }
}

// mengubah data Transaksi
const ubahDataTransaksi = async(req, res) => {

    let no_transaksi = req.params.no_transaksi;
    
    // kondisi biaya pengiriman

    if (req.body.pengiriman == "JNE"){
        biaya_pengiriman = 15000;
    } else if (req.body.pengiriman == "JNT"){
        biaya_pengiriman = 20000;
    } else if (req.body.pengiriman == "Express") {
        biaya_pengiriman = 30000
    } else {
        "Biaya pengiriman tidak tersedia";
    }

    let total = req.body.harga * req.body.jumlah

    // jika user membeli dengan harga ...
    if (total > 200000 ) {
            diskon = 50000;
    } else {
            diskon = 0;
    }

    let total_pembayaran = (total + biaya_pengiriman) - diskon ;
    
    let dataEdit = {
        nama_barang: req.body.nama_barang,
        kode_kategori: req.body.kode_kategori,
        kode_supplier: req.body.kode_supplier,
        harga : req.body.harga,
        jumlah : req.body.jumlah,
        diskon : diskon,
        pengiriman : req.body.pengiriman,
        biaya_pengiriman : biaya_pengiriman,
        total_pembayaran :total_pembayaran
    }

    const result = await new Promise((resolve, reject) => {
        connection.query('UPDATE transaksi SET ? WHERE no_transaksi = ?;', [dataEdit, no_transaksi], function(error, rows) {
            if (rows) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    });

    if (result) {
        res.send({
            success : true,
            message : 'Berhasil mengubah data transaksi !'
        });
    } else {
        res.send({
            success : false,
            message : "Gagal mengubah data transaksi !"
        });
    }

}

// // menghapus data Transaksi
const hapusDataTransaksi = async(req, res) => {
    let no_transaksi = req.params.no_transaksi;

    const result = await new Promise((resolve, reject) => {
        connection.query('DELETE FROM transaksi WHERE no_transaksi = ?;', [no_transaksi], function(error, rows) {
            if (rows) {
                resolve(true);
            } else {
                reject(false);
            }
        });
    });

    if (result) {
        res.send({
            success : true,
            message : 'Berhasil menghapus data transaksi !'
        });
    } else {
        res.send({
            success : false,
            message : 'Gagal hapus data!'
        });
    }

}

module.exports = {
   ambilDataTransaksi,
   tambahDataTransaksi,
   ubahDataTransaksi,
   hapusDataTransaksi
    
}