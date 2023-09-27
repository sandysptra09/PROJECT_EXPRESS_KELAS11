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

// menampilkan semua data Supplier
const ambilDataSupplier = async (req, res) => {
    try{
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM supplier', function (error, rows ) {
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
                    message : 'Seluruh data supplier berhasil ditampilkan',
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
                    message2: 'Gagal mengambil data supplier',
                    
            });
        }
}

// menambah data Supplier
const tambahDataSupplier = async(req, res) => {
    try{
    
    let data = {
        nama_supplier: req.body.nama_supplier,
        alamat : req.body.alamat

    }
    const result = await new Promise((resolve, reject) => {
        connection.query('INSERT INTO supplier SET ?;', [data], function(error, rows) {
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
            message: 'Supplier berhasil ditambahkan !'
        });}
    
    } catch (error) {
        res.send({
            success: false,
            message: 'Gagagl menambhakan data supplier !',
        });
    }
}

// mengubah data Supplier
const ubahDataSupplier = async(req, res) => {
    let kode_supplier = req.params.kode_supplier;

    let dataEdit = {
        nama_supplier: req.body.nama_supplier,
        alamat : req.body.alamat

    }

    const result = await new Promise((resolve, reject) => {
        connection.query('UPDATE supplier SET ? WHERE kode_supplier = ?;', [dataEdit, kode_supplier], function(error, rows) {
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
            message : 'Berhasil mengubah data supplier !'
        });
    } else {
        res.send({
            success : false,
            message : "Gagal mengubah data supplier !"
        });
    }

}

// // menghapus data Supplier
const hapusDataSupplier = async(req, res) => {
    let kode_supplier = req.params.kode_supplier;

    const result = await new Promise((resolve, reject) => {
        connection.query('DELETE FROM supplier WHERE kode_supplier = ?;', [kode_supplier], function(error, rows) {
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
            message : 'Berhasil menghapus data supplier !'
        });
    } else {
        res.send({
            success : false,
            message : 'Gagal menghapus data supplier !'
        });
    }

}

module.exports = {
   ambilDataSupplier,
   tambahDataSupplier,
   ubahDataSupplier,
   hapusDataSupplier
    
}