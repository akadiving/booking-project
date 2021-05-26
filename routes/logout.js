const express = require('express');
const router = express.Router();

const store = require('../mongoDb/session/store');

router.post('/', async (req, res) => {
  try {
    /**
            Removes user Session in Store with given session id 
        */

    const sid = req.session.id;

    await store.destroy(sid, (err) => {
      if (err) {
        console.log(err);
        return null;
      }
    });

    /*
            Removing Cookie in client browser. 
            */
    console.log(`LOGOUT : =>>>>> user Logged Out`, cookieKey);
    console.log(req.session.cookie.expires, 'cookie expiration date');
    req.session.cookie.expires = new Date().getTime();
    let cookieKey = req.headers.cookie.split('=')[2];
    res.clearCookie(cookieKey);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
