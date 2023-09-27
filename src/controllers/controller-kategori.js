const config = require('../configs/database');
const mysql = require('mysql');
const session = require('express-session');
const express = require('express');
const { application } = require('express');
const connection = mysql.createConnection(config);
connection.connect();

const app = express();

// tahap middleware
app.use(session({
    secret : 'mysecret',
    resave : true,
    saveUninitialized : true,
}));

// menampilkan semua data Kategori
const ambilDataKategori = async (req, res) => {
    try{
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM kategori', function (error, rows ) {
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
                    message : 'Seluruh data kategori berhasil ditampilkan',
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
                    message2: 'Gagal mengambil data kategori',
                    
            });
        }
}

// menambah data Kattegori
const tambahDataKattegori = async(req, res) => {
    try{
    
    let data = {
        nama_kategori: req.body.nama_kategori

    }
    const result = await new Promise((resolve, reject) => {
        connection.query('INSERT INTO kategori SET ?;', [data], function(error, rows) {
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
            message: 'Kategori berhasil ditambahkan !'
        });}
    
    } catch (error) {
        res.send({
            success: false,
            message: 'Gagagl menambhakan kategori !',
        });
    }
}

// mengubah data Kategori
const ubahDataKategori = async(req, res) => {
    let kode_kategori = req.params.kode_kategori;

    let dataEdit = {
        nama_kategori: req.body.nama_kategori

    }

    const result = await new Promise((resolve, reject) => {
        connection.query('UPDATE kategori SET ? WHERE kode_kategori = ?;', [dataEdit, kode_kategori], function(error, rows) {
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
            message : 'Berhasil mengubah nama barang !'
        });
    } else {
        res.send({
            success : false,
            message : "Gagal mengubah nama barang !"
        });
    }

}

// // menghapus data Kategori
const hapusDataKategori = async(req, res) => {
    let kode_kategori = req.params.kode_kategori;

    const result = await new Promise((resolve, reject) => {
        connection.query('DELETE FROM kategori WHERE kode_kategori = ?;', [kode_kategori], function(error, rows) {
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
            message : 'Berhasil hapus data!'
        });
    } else {
        res.send({
            success : false,
            message : 'Gagal hapus data!'
        });
    }

}

module.exports = {
   ambilDataKategori,
   tambahDataKattegori,
   ubahDataKategori
    
}