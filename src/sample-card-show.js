import BondCards from './bond-sdk-cards';
import('./sample.css');

const bondCards = new BondCards({ live: true });
// let firstRun = true;
let hidden = true;
const data = {
  num: 'tok_sandbox_21jmguFdztadFN6xfbcDtF',
  exp: 'tok_sandbox_spuC49eoePEtkSFsGvrkdp',
  cvv: 'tok_sandbox_eXEjyhDX64DJrSDs1Mc76m',
};
const css = {
  'font-family': 'Arial, sans-serif',
  'font-size': '14px',
  color: 'rgb(96,107,243)',
};

const loadingHelper = (field, status) => {
  const el = document.getElementById(`${field}-loading`);
  el.style.opacity = ['success', 'error'].includes(status) ? '0' : '1';
  console.log(`${field} ${status}`);
};

const reveal = () => {
  // clear current field values
  document.getElementById('num').textContent = '';
  document.getElementById('exp').textContent = '';
  document.getElementById('cvv').textContent = '';
  document.getElementById('toggle').textContent = 'Redact';

  // use temporary key token to reveal appropriate field values
  // if (firstRun) {
  //   bondCards
  //     .show({
  //       cardId: document.getElementById('card-id').value,
  //       identity: document.getElementById('identity').value,
  //       authorization: document.getElementById('authorization').value,
  //       field: 'number',
  //       htmlSelector: '#num-hidden',
  //       format: {
  //         replaceThis: '(\\d{4})(\\d{4})(\\d{4})(\\d{4})',
  //         withThis: '$1-$2-$3-$4',
  //       },
  //       css,
  //     })
  //     .catch((error) => {
  //       console.error('error', error);
  //       loadingHelper('num', 'error');
  //     });

  //   firstRun = false;
  // }
  loadingHelper('num', 'pending');
  bondCards
    .show({
      cardId: document.getElementById('card-id').value,
      identity: document.getElementById('identity').value,
      authorization: document.getElementById('authorization').value,
      field: 'number',
      htmlSelector: '#num',
      format: {
        replaceThis: '(\\d{4})(\\d{4})(\\d{4})(\\d{4})',
        withThis: '$1-$2-$3-$4',
      },
      css,
    })
    .then((data) => {
      loadingHelper('num', 'success');
    })
    .catch((error) => {
      console.error('error', error);
      loadingHelper('num', 'error');
    });

  loadingHelper('exp', 'pending');
  bondCards
    .show({
      cardId: document.getElementById('card-id').value,
      identity: document.getElementById('identity').value,
      authorization: document.getElementById('authorization').value,
      field: 'expiry',
      htmlSelector: '#exp',
      format: {
        replaceThis: '(\\d{2})(\\d{4})',
        withThis: '$1/$2',
      },
      css,
    })
    .then((data) => {
      loadingHelper('exp', 'success');
    })
    .catch((error) => {
      console.error('error', error);
      loadingHelper('exp', 'error');
    });

  loadingHelper('cvv', 'pending');
  bondCards
    .show({
      cardId: document.getElementById('card-id').value,
      identity: document.getElementById('identity').value,
      authorization: document.getElementById('authorization').value,
      field: 'cvv',
      htmlSelector: '#cvv',
      css,
    })
    .then((data) => {
      loadingHelper('cvv', 'success');
    })
    .catch((error) => {
      console.error('error', error);
      loadingHelper('cvv', 'error');
    });
};

const redact = () => {
  document.getElementById('num').textContent = data.num;
  document.getElementById('exp').textContent = data.exp;
  document.getElementById('cvv').textContent = data.cvv;
  document.getElementById('toggle').textContent = 'Reveal';
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
