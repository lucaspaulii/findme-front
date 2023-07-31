import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// import * as jwt from "jsonwebtoken";
// import defaultProps from "./assets/defaultObject.json";

// const JWTSecret = "super secret 123"; //later this will be in dotenv
// const JWTtoken = jwt.sign(JSON.stringify(defaultProps), JWTSecret); //later this will come from request
// console.log(JWTtoken);

const app = createApp(App);
app.mount("#app");
