import BondCards from "./bond-sdk-cards";
import("./sample.css");

const bondCards = new BondCards({ live: true });
bondCards
  .field({
    selector: "#cc-current-pin",
    type: "current_pin",
    disabled: true,
    successColor: "#4F8A10",
    errorColor: "#D8000C",
    placeholder: "1234",
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
  })
  .catch((error) => {
    console.error("error", error);
  });

document.querySelector("#cc-form").addEventListener("submit", (e) => {
  e.preventDefault();
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
      ).innerHTML = `current_pin @ service: ${data.current_pin}<br/>
        new_pin @ service: ${data.new_pin}<br/>`;
    },
    errorCallback: function (errors) {
      document.getElementById("result").innerHTML = errors;
    },
  });
});
