const config = require('../configs/database');
const mysql = require('mysql');
const session = require('express-session');
const express = require('express');
const { application } = require('express');
const connection = mysql.createConnection(config);
connection.connect();

// const app = express();

// // tahap 1 middleware
// app.use(session({
//     secret : 'mysecret',
//     resave : true,
//     saveUninitialized : true,
// }));

// menampilkan semua data Users
const ambilDataUsers = async (req, res) => {
    try{
        const data = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM users', function (error, rows ) {
                    if (rows) {
                        resolve(rows);
                    } else {
                        reject([]);
                    }
            });
        });
        if (data) {
            res.send({
                    success : true,
                    message : 'Berhasil ambil data',
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
                    message2: 'gagal',
                    
            });
        }
}

// menambah data Users
const tambahDataUsers = async(req, res) => {
    try{
    
    let data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password : req.body.password
    }
    const result = await new Promise((resolve, reject) => {
        connection.query('INSERT INTO users SET ?;', [data], function(error, rows) {
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
            message: 'Akun berhasil dibuat !'
        });}
    
    } catch (error) {
        res.send({
            success: false,
            message: 'Akun gagal dibuat !',
        });
    }
}

// // mengubah data Users
// const ubahDataUsers = async(req, res) => {
//     let id = req.params.id;

//     let total = req.body.harga * req.body.jumlah

//     // jika user membeli dengan harga ...
//     if (total > 500000 ) {
//          potongan = 100000;
//     } else {
//          potongan = 0;
//     }

//     // total harga
//     let total_harga = total - potongan;

//     let dataEdit = {
//         nama_barang: req.body.nama_barang,
//         harga: req.body.harga,
//         jumlah: req.body.jumlah,
//         potongan :  potongan,
//         total_harga: total_harga
//     }

//     const result = await new Promise((resolve, reject) => {
//         connection.query('UPDATE users SET ? WHERE id = ?;', [dataEdit, id], function(error, rows) {
//             if (rows) {
//                 resolve(true);
//             } else {
//                 reject(false);
//             }
//         });
//     });

//     if (result) {
//         res.send({
//             success : true,
//             message : 'Berhasil edit data!'
//         });
//     } else {
//         res.send({
//             success : false,
//             message : "Gagal edit data!"
//         });
//     }

// }

// // // menghapus data Users
// const hapusDataUsers = async(req, res) => {
//     let id = req.params.id;

//     const result = await new Promise((resolve, reject) => {
//         connection.query('DELETE FROM users WHERE id = ?;', [id], function(error, rows) {
//             if (rows) {
//                 resolve(true);
//             } else {
//                 reject(false);
//             }
//         });
//     });

//     if (result) {
//         res.send({
//             success : true,
//             message : 'Berhasil hapus data!'
//         });
//     } else {
//         res.send({
//             success : false,
//             message : 'Gagal hapus data!'
//         });
//     }

// }

module.exports = {
   ambilDataUsers,
   tambahDataUsers
    
}