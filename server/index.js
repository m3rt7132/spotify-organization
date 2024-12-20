const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const querystring = require("querystring");
const app = express();
const PORT = 3000;
const conf = require("./conf.json");
const fs = require("fs");
const axios = require("axios");
const cookieParser = require('cookie-parser');
app.use(cookieParser());

var { code, redirect_uri, client_id, client_secret } = require("./conf.json");
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

app.get('/login', function (req, res) {
    if (req.cookies["login"]) return res.redirect("http://localhost:5173");
    var state = generate_state(16);
    var scope = 'playlist-read-private playlist-modify-public playlist-modify-private user-library-read user-library-modify user-read-email user-read-private user-follow-read'; // Authorizations
    res.cookie("spotify_auth_state", state);
    console.log(state)
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});

app.get("/callback", async (req, res) => {
    code = req.query.code
    var state = req.query.state;
    conf.code = code;
    fs.writeFileSync("./conf.json", JSON.stringify(conf));

    var stored_state = req.cookies && req.cookies["spotify_auth_state"] ? req.cookies["spotify_auth_state"] : null;

    try {
        if (!state || state !== stored_state) {
            console.log("state eslesmedi")
            return res.send("state eslesmedi")
        } else {
            res.clearCookie("spotify_auth_state");
            var query = {
                url: 'https://accounts.spotify.com/api/token',
                data: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': `Basic ${(Buffer.from(client_id + ':' + client_secret).toString('base64'))}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            let response = await axios.post(query.url, new URLSearchParams(query.data), { headers: query.headers });

            if (response.status == 200) {
                setTokens(res, response.data.access_token, response.data.refresh_token);
                let userInfo = await axios.get("https://api.spotify.com/v1/me", {
                    headers: {
                        'Authorization': `Bearer ${response.data.access_token}`
                    }
                });
                res.cookie("userid", userInfo.data.id, { maxAge: 3600000 });
                res.redirect("http://localhost:5173");
            } else {
                res.redirect("http://localhost:5173#" +
                    querystring.stringify({
                        error: "invalid_token"
                    }))
            }
        }
    } catch (error) {
        console.error(error);
    }
});

app.get("/refresh", async (req, res) => {
    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: conf.refresh,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    'Authorization': `Basic ${(Buffer.from(client_id + ':' + client_secret).toString('base64'))}`
                },
            }
        );

        if (response.status === 200) {
            setTokens(res, response.data.access_token);
            res.redirect("http://localhost:5173");
            console.log("Yeni Access Token:", response.data.access_token);
        }
    } catch (error) {
        console.error("Access Token yenileme hatası:", error);
    }
});

app.get("/logout", (req, res) => {
    res.clearCookie("login");
    res.clearCookie("userid")
    conf.access = null;
    conf.refresh = null;
    conf.state = null;
    fs.writeFileSync("./conf.json", JSON.stringify(conf));
    res.redirect("http://localhost:5173");
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

function generate_state(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

function setTokens(res, access, refresh = conf.refresh) {
    conf.access = access;
    conf.refresh = refresh;
    fs.writeFileSync("./conf.json", JSON.stringify(conf));
    console.log("token alındı ve kaydedildi", access);
    res.clearCookie("login");
    res.cookie("login", access, { maxAge: 3600000 });
}