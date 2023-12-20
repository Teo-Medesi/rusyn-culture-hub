import admin from "firebase-admin"
import serviceAccount from "./rusyn-culture-hub-firebase-adminsdk-wkcbi-d67331a275.json"
import { getAuth } from "firebase-admin/auth"
import { getApps } from "firebase-admin/app"

let auth;
if (getApps().length === 0) {

  const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  }, "admin")

  auth = getAuth(app);

}

export {
  auth
}

