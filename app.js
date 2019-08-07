var express = require('express');
var path    = require("path");
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

var resume = express();
resume.set('port', (process.env.PORT || 8080));

resume.engine('.html', require('ejs').__express);
resume.set('view engine', 'html');
resume.set('views', __dirname + '/views');
resume.use(express.static(path.join(__dirname, 'public')));
resume.use(bodyParser.urlencoded({extended: true}));


resume.get('/', function(req, res) 
{   
    console.log('Resume');
    
    // Affiche la page resume.html
    res.render('new-resume');
});

resume.get('/resume', function(req, res) 
{   
    console.log('Resume');
    
    // Affiche la page resume.html
    res.render('new-resume');
});

resume.get('/resume-fr', function(req, res) 
{   
    console.log('Resume-fr');
    
    // Affiche la page resume.html
    res.render('resume-fr');
});

resume.get('/skills', function(req, res) 
{   
    console.log('Skills');
    
    // Affiche la page skill.html
    res.render('skills');
});

resume.get('/competences-fr', function(req, res) 
{   
    console.log('Competences-fr');
    
    // Affiche la page skill.html
    res.render('competences-fr');
});

resume.get('/projects', function(req, res) 
{   
    console.log('Projects');
    
    // Affiche la page projects.html
    res.render('new-projects');
});

resume.get('/projets-fr', function(req, res) 
{   
    console.log('Projets-fr');
    
    // Affiche la page projects.html
    res.render('projets-fr');
});

resume.get('/contact', function(req, res) 
{   
    console.log('contact');
    
    // Affiche la page contact.html
    res.render('contact');
});

resume.get('/contact-fr', function(req, res) 
{   
    console.log('contact-fr');
    
    // Affiche la page contact.html
    res.render('contact-fr');
});

resume.get('/contact-success', function(req, res) 
{   
    console.log('contact-success');
    
    // Affiche la page contact.html
    res.render('contact-success');
});

resume.get('/contact-succes-fr', function(req, res) 
{   
    console.log('contact-succes-fr');
    
    // Affiche la page contact.html
    res.render('contact-succes-fr');
});

resume.get('/contact-failure', function(req, res) 
{   
    console.log('contact-failure');
    
    // Affiche la page contact.html
    res.render('contact-failure');
});

resume.get('/contact-echec-fr', function(req, res) 
{   
    console.log('contact-echec-fr');
    
    // Affiche la page contact.html
    res.render('contact-echec-fr');
});

resume.post('/contact', function (req, res) {
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
    mailOpts = {
      from: req.body.firstname + ' &lt;' +  req.body.lastname + ' &lt;' + req.body.email + '&gt;',
      to: process.env.GMAIL_USER,
      subject: 'New message from contact form from resume',
      text: `${req.body.firstname} ${req.body.lastname} (${req.body.email}) says: ${req.body.message}`
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
      if (error) {
        res.render('contact-failure');
      }
      else {
        res.render('contact-success');
      }
    });
});

resume.post('/contact-fr', function (req, res) {
    let mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
    mailOpts = {
      from: req.body.prenom + ' &lt;' +  req.body.nomfamille + ' &lt;' + req.body.courriel + '&gt;',
      to: process.env.GMAIL_USER,
      subject: 'Nouveau message du formulaire de resume',
      text: `${req.body.prenom} ${req.body.nomfamille} (${req.body.courriel}) says: ${req.body.messagefr}`
    };
    smtpTrans.sendMail(mailOpts, function (error, response) {
      if (error) {
        res.render('contact-echec-fr');
      }
      else {
        res.render('contact-succes-fr');
      }
    });
});

resume.listen(resume.get('port'), function(){
    console.log("server is listening on: %s", resume.get('port'));
});