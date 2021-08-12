import BondCards from "./bond-sdk-cards";
import("./sample.css");

const bondCards = new BondCards({ live: true });
bondCards
  .field({
    selector: "#cc-current-pin",
    type: "current_pin",
    disabled: false,
    successColor: "#4F8A10",
    errorColor: "#D8000C",
    placeholder: "1234",
    hideValue: true,
  })
  .then(data => {
    console.log(data)
  })
  .catch((error) => {
    console.error("error", error);
  });

bondCards
  .field({
    selector: "#cc-new-pin",
    type: "new_pin",
    successColor: "#4F8A10",
    errorColor: "#D8000C",
    placeholder: "5678",
    hideValue: true,
  })
  .then(data => {
    console.log(data)
  })
  .catch((error) => {
    console.error("error", error);
  });

bondCards
  .field({
    selector: "#cc-confirm-pin",
    type: "confirm_pin",
    successColor: "#4F8A10",
    errorColor: "#D8000C",
    placeholder: "5678",
    hideValue: true,
  })
  .then(data => {
    console.log(data)
  })
  .catch((error) => {
    console.error("error", error);
  });

window.onSubmit = () => {
  bondCards.submit({
    cardId: document.getElementById("card-id").value,
    identity: document.getElementById("identity").value,
    authorization: document.getElementById("authorization").value,
    currentPin: document.getElementById("cc-current-pin").value,
    newPin: document.getElementById("cc-new-pin").value,
    confirmPin: document.getElementById("cc-confirm-pin").value,
    successCallback: function (status, data) {
      console.log(status, data);
      document.getElementById(
        "result"
      ).innerHTML = `card_id @ service: ${data.card_id}<br/>
      pin_changed @ service: ${data.pin_changed}<br/>`;
    },
    errorCallback: function (errors) {
      document.getElementById("result").innerHTML = errors;
    },
  });
};
