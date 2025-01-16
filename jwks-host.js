const express = require('express');
const jwks = require('jwks-rsa');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3001;

// Define a JWKS endpoint that will expose public keys
const jwksClient = jwks({
    jwksUri: `http://localhost:${port}/.well-known/jwks.json`, // URI to fetch the keys
});

app.get('/.well-known/jwks.json', (req, res) => {
    // Sample public key in the JWKS format.
    // In a real-world scenario, you'd use your RSA key or key pair.
    /*

    const key = {
        kty: 'RSA',
        kid: 'sample-key-id',
        use: 'sig',
        alg: 'RS256',
        n: 'sXchWg9uOuA0r9lYTz5FpNNjOh7Z1j7UHz7JlWcAOH_Y_tGpMMg93ka5i7OU9cQQrMIuA9j9Wpk9P8I-8ZnHlWgT_BqH4cug3zZfaOXxzgojZB7z3qhdtiNRD5vGBZpjyfpT7U1ncp2TeS7dMBxdgNK6cNxgxb00ZJeGU6jViRseIkLHz6uq2g6_xUuFbRA7Fb9o-VQIt2_r5HZftv4KogpkTZbh2sR6kZ5jvbjlXhvlKzQorH-dsBnb9onmBOg5Rlj-5-c6N3Jz0LkVtDiEPgW2PMf4oA-6D-xps0XBH9zPr9Z70_JjT1FDPpkV1t4gsxa2vYjG_gPlJJ9W5cl_WXIkijPQ',
        e: 'AQAB',
        d: 'D0eN_J7Gf6RtqOqDdA4K15NPhNjgx5bsK5ezwseV-0M6R2n1fwTrvQggVEX0q1hSeBhZxn79pfr5pn6Os1lg7v5XYqFt_hVhrMeJKrtYFw00JzHxxux-Qdp5tiCoihjDle9ST7G14UUI4VInSLcoTlgk7vsZp1ByFuOK9HnwhPOQZl7R81cFUSz7jtH7B18Jl_dK_d22LxXgq0AGD1myLrhxNGprv-wBshI1Q-16bF0J9kj0ghWUyCVjl5fHyaN2FnMj2j-EYY2_n_w5vv9kC72MepzVoDTc0XEyBw2diQe1TV-Q9jOs6_gnJZkF9yXIF7_J6fK8fO9baxHlPQynk-kce9Pa5zv9dcHhG7p2f_wJeZG0ICSkzD0Z6DLPtQ3cxkg-e1mQdVwtgPgLB4PyzWGjlJwBR-MDXGmcmrlYtijRGH1M8I7OhyI2duEqnnqHGeLtTbMwvXt0D0OeYErq7lkYgBl4rz7sYz82bbexYg8B16ORH0AdWsHtoD9kTX6g1PHD7nOWk9kZp6X6oXNw1yP9fZ_5zzb3xwOt6fA5BQtboQvvvnUajTRm3jaXNiTpHRaX6uHnvbMHLmR1Lo7R7XXaQIgmOQ',
        p: '8C7AqNghxw1F5xtNc-hw9WVJq5G1nbX-_Xqmn7rD8q5wZgdjXALswL5ntd4GxZ3aA-CxDrzpdaBggnNxk8ehzX6G2FkRPzt3ti0QXxnB6gEmsXMGhgoO4HbDCXmyLsViNOzqti8fn5DT4TnUJwK8FGHfPPSvJmfzX6KmY6gVd6TwD-tUOkn5J7-jH28cTtL1Mfl5pT_hS2Z_bMnwnlrxLh7bwFzIY-LlgphTTtx6tUPp4dyglsZg63uwGvP3D1zXOXZp5XlG1OW7MChOQNsh6km8WlwU7rrDT3evE8FQO2igf4oNn69pGjPiV1yge6ZmAmKjqBOz6zOquNxqvR0heB1y6V64n6cNjRNG8OU4BoXkrtNl8Q',
        q: 'yFhTk-NzHZDsb2xuyKwqTHfwdMBdsYek0moHbWNjCh4KTTckwzj-kftOFlhM79rgJwdQGGBkD_vA0-9w3Wgpzp1s6iSCbsQau6dF9R8Bjwz_5Bl-oLgOjZBmc5YFqW4c_zrVmRrFD9-pJlq5bDkcxxcb4Vm2-L0ChlmuDmvG1iZXyAxw1BbNxigvtyZLBpHY1fqlbhh4HTFmxauokK7wJBYMmc8X0q-wD3ys6U4XtFbpnvjo1cGZoxubzITlhj8lg1_o59O90TmZXl2nK_ny8ip9rxx5Klgf60F7shuhHwqaUjpwZ6BBKfr6Eoa1TQDt1X-EkkFC8brwih2w7bDFZxjqNh6aQny9DD7vBjf_sPaBeCpkqH7lzi4Udm8pH6PBXIiqhXXVtFXDkg9zRovA',
        dp: 'PEYV7wGF9CH2CgThQ3EMcFsN1FOT7xl1Hskg33qL-Tbh0XJ5F9j_kV7ywz9Z59kphfLSVZgNxbs6IsvVG-VmpSoT7uWGOCZ7d_2yX2eOU8DJ5Aq4DTN5Wx32y0o_nyX2dV7ueFuPrbwZ6HUb0c2iy3EX3YwJv1ZXAmvBEuH9Jz2gk9kkmvMvX86IFos7gFCV6xYFcWWVtn9b2tMM-ls1shkUJLOM4vTLu6txTr5cpCevA72ThdDPZX-uwLs7cH0R4rlsq55EuQeCvk5EwrSaYkvk1fiYW4RKHlZXM1whGECLOjjrl-VEHt_UdGZ2jR_wJJbaREW91uA0aAT8jTPH_LdX3GrT_mHu_N_PEx5dpRP1g2ZXO8LNSvhqFTffqwQ',
        dq: 'FAxZnGAybD_rql5mbFLnkUeOGUWLkDJ7gLNVmYrtmV8Y0H-NHkEK_JZoiV63qmdqq9Vw2zbpZOdYz6B4sOBqF5DXXxCZ8l6ZnxgxGp9TRjOr5E_pqajTo6kN6ybCvKdr9Er6ZFsddqHW2c5c3ZXFFQLzZ9jjF9vIEtLgWb7h4MOv6Xs5GsTFLq0qOohfXgMlWppIW2yWvTL3C5nqWhTbffP6PZ9dVeEVcm_d95lSyY7hVmdg5pWB8ym7hOiiTtE_15A5F6lljQ6nwnHtVmSEdXjRE1_FlxExnNa-_7ipTZtP2sNBePUwCo6W8L4Pfdzq5azlRyeWmnrt6ni9PHkP5spDRe-0hxrfv0XrQmmhM9EZyP2shtxxWZGBubHuqChOMe2pclckSHhWxyMNzEovIFluuxEuxGq_zZ5Gn1duyaDybw2cIfm9YPA_w9LfBGqbD5hM',
        qi: 'jfv4ymss5DzDQDrfBmwokq5F5tc9FrJ9zDqI3F83olcoDCnYOvtnH0OLgZ-XWGaeKp0F2oNbln1cVjRRGNVh9d8_UADLsWphA4y65Z-fvHO_J6r1kKDb1kw7Pfz5_hdZ73JvXgWlEPZfAUmddvsBmaYChNxdPR-3pDAsDNl9syk6jy9pyGUZ5EY-wNvcfoE6dDQy0rS_VZpQkvpYWuKpbF4wifjdy3_o2c60ET_tgs-HE95UIfTx9ogH50hYmKwGJnvBchGnb_xQdP9W_xCm6re1nJl_qjAqhw4Q-bvFsFa2FlXwOpoJ_tjHzlq2DpT_MfJ2fksay9LkzpevlHrwZsDQnkjzCBwwQg8Acz9PyBhMfXnb7zhZLqAghtN6nK7hvMl7RO9Wnl8s8Xh8_4MdZl9d3Vt7mVHlGh1eeShMyY2t57G2mFg7Nru8z92EXgxpppCh7HTj7wbw8tGkmJx6K5t7IexNUh0NQ'
    };

     */

    const key = {
        kty: 'RSA',
        n: 'uC86VTTZLsrQ7ZMbX1YZo0vAaoZkyvtD5i67HSKUmw4WYiPVAs41e68MajAKN65my_-dvZI-ypMtQLD5nRx8BAgeRNySa57c60eFoERzEjZ3-8hVNGsDX6dJTO3og5xnq1aDTKX9zW7r_BZ0FtIV1Xll9OsRbTHKF_MyuCj9cSMC4JZAJkiwVX6S7UEvx715cZ2El4ShqrT9Xy-PBqgVY24jpNhc4Ar3OfTxqNIX1W_3zsIsPo9VNgXwRRId3Hq3-x_Z24NkNoHOVgFhplgneqUz_ubT682Gp604-3vCA2yxAy5HZ29yXIP3jabt3nNmCui1qfgHos2b6GQASxW0_w',
        e: 'AQAB',
        kid: 'dak_helios',
        alg: 'RS256',
        use: 'sig'
    };

    res.json({
        keys: [key]
    });
});

// Start the express server
app.listen(port, () => {
    console.log(`JWKS endpoint is live at http://localhost:${port}/.well-known/jwks.json`);
});