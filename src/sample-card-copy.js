import BondCards from "./bond-sdk-cards";

import("./sample.css");

const bondCards = new BondCards({live: true});

let hidden = true;
const data = {
    num: "tok_sandbox_21jmguFdztadFN6xfbcDtF",
    exp: "tok_sandbox_spuC49eoePEtkSFsGvrkdp",
    cvv: "tok_sandbox_eXEjyhDX64DJrSDs1Mc76m",
};
const css = {
    "font-family": "Arial, sans-serif",
    "font-size": "14px",
    color: "rgb(96,107,243)",
};

const cssBtn = {
    'width': '100px',
    'padding': '10px',
    'background-color': 'dodgerblue',
    'font-size': '12px',
    'color': 'white',
}

const loadingHelper = (field, status) => {
    const el = document.getElementById(`${field}-loading`);
    el.style.opacity = ['success', 'error'].includes(status) ? '0' : '1';
    console.log(`${field} ${status}`)
}

const reveal = () => {
    // clear current field values
    document.getElementById("num").textContent = "";
    document.getElementById("exp").textContent = "";
    document.getElementById("cvv").textContent = "";
    document.getElementById("toggle").textContent = "Redact";

    // use temporary key token to reveal appropriate field values

    bondCards
        .show({
            cardId: document.getElementById("card-id").value,
            identity: document.getElementById("identity").value,
            authorization: document.getElementById("authorization").value,
            field: "number",
            htmlSelector: "#num",
            format: {
                replaceThis: "(\\d{4})(\\d{4})(\\d{4})(\\d{4})",
                withThis: "$1-$2-$3-$4",
            },
            css,
        })
        .then(data => {
            loadingHelper('num', 'success')
            bondCards.copy({
                iframe: data,
                htmlSelector: '#num-copy-btn',
                callback: (status) => {
                    if (status === 'success') {
                        console.log('copied!')
                    } else {
                        console.log('error!')
                    }
                },
                text: 'Copy data',
                css: cssBtn,
            })
                .then((data) => console.log(data))
                .catch((error) => console.log(error))
        })
        .catch((error) => {
            console.error("error", error);
            loadingHelper('num', 'error')
        });
};

reveal()