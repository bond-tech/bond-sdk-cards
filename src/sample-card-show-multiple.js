import BondCards from "./bond-sdk-cards";
import("./sample.css");

const bondCards = new BondCards({ live: true });
let firstRun = true;

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

const loadingHelper = (status) => {
  const num = document.getElementById('num-loading');
  const exp = document.getElementById('exp-loading');
  const cvv = document.getElementById('cvv-loading');

  [num, exp, cvv].forEach(el => {
    el.style.opacity = ['success', 'error'].includes(status) ? '0' : '1';
  })
  console.log(status);
}

const reveal = () => {
  // clear current field values
  document.getElementById("num").textContent = "";
  document.getElementById("exp").textContent = "";
  document.getElementById("cvv").textContent = "";
  document.getElementById("toggle").textContent = "Redact";

  if (firstRun) {
    bondCards
        .show({
          cardId: document.getElementById("card-id").value,
          identity: document.getElementById("identity").value,
          authorization: document.getElementById("authorization").value,
          field: "number",
          htmlSelector: "#num-hidden",
          format: {
            replaceThis: "(\\d{4})(\\d{4})(\\d{4})(\\d{4})",
            withThis: "$1-$2-$3-$4",
          },
          css,
        })
        .catch((error) => {
          console.error("error", error);
          loadingHelper('num', 'error')
        });

    firstRun = false;
  }

  // use temporary key token to reveal appropriate field values
  loadingHelper('pending');
  bondCards
    .showMultiple({
      cardId: document.getElementById("card-id").value,
      identity: document.getElementById("identity").value,
      authorization: document.getElementById("authorization").value,
      fields: {
        number: {
          htmlSelector: "#num",
          format: {
            replaceThis: "(\\d{4})(\\d{4})(\\d{4})(\\d{4})",
            withThis: "$1-$2-$3-$4",
          },
          css,
        },
        expiry: {
          htmlSelector: "#exp",
          format: {
            replaceThis: "(\\d{2})(\\d{4})",
            withThis: "$1/$2",
          },
          css,
        },
        cvv: {
          htmlSelector: "#cvv",
          css,
        }
      },
    })
    .then(() => {
      loadingHelper('success');
    })
    .catch((error) => {
      loadingHelper('error');
      console.error(error);
    });
};

const redact = () => {
  document.getElementById("num").textContent = data.num;
  document.getElementById("exp").textContent = data.exp;
  document.getElementById("cvv").textContent = data.cvv;
  document.getElementById("toggle").textContent = "Reveal";
};

window.toggle = () => {
  if (hidden) {
    reveal();
  } else {
    redact();
  }
  hidden = !hidden;
};

redact();
