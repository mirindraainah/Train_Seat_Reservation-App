import express from "express";
import mysql from "mysql";
import cors from "cors";
import nodemailer from "nodemailer";


const app = express();
app.use(express.json());
app.use(cors());

// connexion à la bd
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "place_train",
});

// vérification connexion
db.connect((err) => {
  if (err) {
    console.error("erreur", err);
    return;
  }
  console.log("Connecté avec succès");
});

// Inscription
app.post("/inscription", (req, res) => {
  const { email, mdp } = req.body;
  const selectQuery = "SELECT * FROM utilisateur WHERE email = ?";
  db.query(selectQuery, [email], (selectErr, selectResult) => {
    if (selectErr) {
      console.error("erreur recherche", selectErr);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    if (selectResult.length > 0) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }
    const insertQuery = "INSERT INTO utilisateur(email, mdp) VALUES (?,?)";
    db.query(insertQuery, [email, mdp], (insertErr) => {
      if (insertErr) {
        console.error("erreur insertion", insertErr);
        return res.status(500).json({ message: "Erreur serveur" });
      }
      return res.status(201).json({ message: "Inscription réussie" });
    });
  });
});

// Connexion
app.post("/connexion", (req, res) => {
  const email = req.body.email;
  const mdp = req.body.mdp;
  console.log(email);
  const sql = "SELECT * FROM utilisateur WHERE email = ?";

  db.query(sql, [email], (err, userData) => {
    if (err) {
      console.error("erreur recherche", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    if (userData.length === 0) {
      return res.status(401).json({ message: "Email incorrect" });
    } else {
      // Vérifier le mot de passe
      const user = userData[0];
      if (user.mdp !== mdp) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      } else {
        return res.status(200).json({ message: "Connexion réussie" });
      }
    }
  });
});

//---------------------affiche la liste des train disponibles-------------------//
app.get("/trains", (req, res) => {
  const sql = "SELECT * FROM train WHERE CURRENT_DATE <= datedepart";
  db.query(sql, (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des train" });
    }
    res.json(data);
  });
});

// destinations
app.get("/destination", (req, res) =>{
  const sql = "SELECT DISTINCT villearrive FROM train";
  db.query(sql, (err, data) =>{
    if (err) {
      throw err;
    }
    res.json(data);
  })
})

//-------------------------------------INSERER train-----------------------------------------//
//-------- dans table train(id,villedepart,villearrive,datedepart,nbplacemax,prix)----------//
// ---------------------------------lors de l'inscription----------------------------------//

app.post('/train',(req,res)=>{
  const sql="INSERT INTO train(villearrive,datedepart,nbplacemax,prix) VALUES(?)";
  const values=[
      
      req.body.villearrive,
      req.body.datedepart,
      req.body.nbplacemax,
      req.body.prix,
  ]
  db.query(sql,[values] ,(err,data)=>{
      if(err) {
          return res.json({Error:"Error"})
      }
      return res.status(200).json(data)
  })
})
// //--------------------FIN---------------------//


app.get("/trains/admin", (req, res) => {
  const sql = "SELECT * FROM train";
  db.query(sql, (err, data) => {
    console.log(data);
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des train" });
    }
    res.json(data);
  });
});

// MODIFIER TRAIN
app.get("/trains/:id", (req, res) => {
  const sql = "SELECT * FROM train where idTrain=" + req.params.id + "";
  db.query(sql, (err, data) => {
    console.log(data);
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des train" });
    }
    res.json(data);
  });
});
app.get("/id/:email", (req, res) => {
  const { email } = req.params;
  console.log(email);
  const sql2 = 'select id from utilisateur where email="' + email + '"';
  db.query(sql2, (err, resultat) => {
    if (err) throw err;
    console.log(resultat);
    res.json(resultat);
  });
});

// --------- RESERVATION -------- //

app.get("/details", (req, res) => {
  const sql = "SELECT email, datereservation, nbplacereserve, nom, villearrive, datedepart FROM `reservation`, utilisateur, train WHERE utilisateur.id = reservation.id and reservation.idtrain = train.idtrain";
  db.query(sql, (err, resultat) => {
    if (err) throw err;
    console.log(resultat);
    res.json(resultat);
  });
});


app.post("/reservation", (req, res) => {
  const { id, nom, cin, email, idtrain, datereservation, nbplace } = req.body;
  console.log(datereservation);
  const sql =
    "update  utilisateur set nom ='" +
    `${nom}` +
    "', cin ='" +
    `${cin}` +
    "' where email='" +
    email +
    "'";
  db.query(sql, (err, resultat) => {
    if (err) throw err;
    res.status(200).json(resultat)
    console.log(resultat);
  });

  const sql1 =
    "INSERT INTO reservation(id,idtrain,datereservation,nbplacereserve) VALUES (?,?,?,?)";
  db.query(sql1, [id, idtrain, datereservation, nbplace], (err, resultat) => {
    if (err) throw err;
    console.log(resultat);
    
  });
  console.log(nbplace);
  const sql2 =
    "update train set nbplacemax = nbplacemax - " +
    nbplace +
    " where idtrain = " +
    idtrain +
    "";
  db.query(sql2, (err, resultat) => {
    if (err) throw err;
  });
});

app.get("/tousReservation/:user", (req, res) => {
  const { user } = req.params;
  const sql =
    "select idRes,nbplacereserve,datereservation,datedepart,villearrive from reservation,train,utilisateur where reservation.idtrain=train.idtrain and reservation.id = utilisateur.id and email = '" +
    user +
    "' and CURRENT_DATE <= datedepart";
  db.query(sql, (err, resultat) => {
    if (err) throw err;
    console.log(resultat);
    res.json(resultat);
  });
});

// annuler réservation
app.post("/annulerReservation", (req, res) => {
  const {id, nbplace } = req.body;
  console.log(nbplace);
  const sql =
    "update train set nbplacemax = nbplacemax + "+nbplace+" where idtrain = (select train.idtrain from reservation,train where reservation.idtrain = train.idtrain and idRes = "+id+")";
  db.query(sql, (err, resultat) => {
    if (err) throw err;
    console.log(resultat);
   
  });
  const sql1 = 'DELETE FROM reservation where idRes= '+id+'';
  db.query(sql1,(err, resultat)=>{
    if (err)throw err
    console.log(resultat);
    res.json(resultat)
  })
});


app.put("/modifierTrain/:idtrain",(req,res)=>{
  const {idtrain}=req.params
  const values = [req.body.villearrive,req.body.datedepart,req.body.nbplacemax, req.body.prix]
  const sql = "UPDATE train SET villearrive = ?,  datedepart = ?,  nbplacemax = ?,  prix = ? where idtrain  = ?";
  db.query(sql, [...values, idtrain], (err, resultat)=>{
    if (err)throw err;
    console.log(resultat);
    res.status(200).json(resultat);
  })

})
// app.delete("/supprimerTrain/:idtrain",(req,res)=>{
//   const {idtrain}=req.params
//   const sql = "DELETE FROM train where idtrain  = ?";
//   db.query(sql, idtrain, (err, resultat)=>{
//     if (err)throw err;
//     console.log(resultat);
//     res.json(resultat);
//   })

// })
//--------------------------------------------FIN---------------------------------------------//


// Endpoint pour l'envoi d'e-mails
app.post('/envoyer-email', (req, res) => {
  const { destinataire, sujet, contenu, qrCode, pdf } = req.body;

  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
      user: "yaelsherah@gmail.com",
      pass: "hxzk okia osbm frmk",
      },
  });

  const mailOptions = {
    from: 'trail.reservation@gmail.com',
    to: destinataire,
    subject: sujet,
    html: contenu,
    attachments: [
      {   // code QR
          filename: 'qrcode.jpeg',
          content: qrCode.split('base64,')[1],
          encoding: 'base64'
      },
      {   // PDF
          filename: 'reservation.pdf',
          content: pdf.split('base64,')[1],
          encoding: 'base64'
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
      res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail');
    } else {
      console.log('E-mail envoyé:', info.response);
      res.status(200).send('E-mail envoyé avec succès !');
    }
  });
});

app.post('/envoyer-email-annulation', (req, res) => {
  const { destinataire, sujet, contenu } = req.body;

  const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // use TLS
      auth: {
      user: "yaelsherah@gmail.com",
      pass: "hxzk okia osbm frmk",
      },
  });

  const mailOptions = {
    from: 'yaelsherah@gmail.com',
    to: destinataire,
    subject: sujet,
    html: contenu,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
      res.status(500).send('Une erreur s\'est produite lors de l\'envoi de l\'e-mail');
    } else {
      console.log('E-mail envoyé:', info.response);
      res.status(200).send('E-mail envoyé avec succès !');
    }
  });
});

// mail formulaire
app.post("/send-email", async (req, res) => {
  const { email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yaelsherah@gmail.com",
      pass: "hxzk okia osbm frmk",
    },
  });

  let mailOptions = {
    from: email, 
    to: "yaelsherah@gmail.com", 
    subject: "Nouveau message de votre application",
    text: `Email de l'expéditeur : ${email} \n\n Message : ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Une erreur est survenue lors de l'envoi de l'email.");
    } else {
      console.log("Email envoyé: " + info.response);
      res.status(200).send("Email envoyé avec succès!");
    }
  });
});

// mail formulaire
app.post("/send-email", async (req, res) => {
  const { email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yaelsherah@gmail.com",
      pass: "hxzk okia osbm frmk",
    },
  });

  let mailOptions = {
    from: email, 
    to: "yaelsherah@gmail.com", 
    subject: "Nouveau message de votre application",
    text: `Email de l'expéditeur : ${email} \n\n Message : ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Une erreur est survenue lors de l'envoi de l'email.");
    } else {
      console.log("Email envoyé: " + info.response);
      res.status(200).send("Email envoyé avec succès!");
    }
  });
});

app.listen(3030, () => {
  console.log("Running");
});
