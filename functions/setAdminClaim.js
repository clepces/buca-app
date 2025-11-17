// ======================================================
// ARCHIVO NUEVO: functions/setAdminClaim.js
// PROPÓSITO: Asigna el Custom Claim de 'super_admin'
//            a un usuario por su email.
// ======================================================

const admin = require("firebase-admin");
const prompt = require("prompt-sync")();

// --- ¡IMPORTANTE! ---
// 1. Descarga tu "Service Account Key" (llave de servicio)
//    desde Firebase: Configuración del Proyecto > Cuentas de Servicio
// 2. Haz clic en "Generar nueva clave privada".
// 3. Renombra el archivo .json a "serviceAccountKey.json"
// 4. Colócalo DENTRO de la carpeta /functions/
// 5. ¡Añade "serviceAccountKey.json" a tu archivo .gitignore!
// --------------------

try {
  const serviceAccount = require("./serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db = admin.firestore();
  console.log("SDK de Admin inicializado.");

  (async () => {
    const email = prompt("Ingresa el email de tu cuenta de Super Admin: ");
    if (!email) {
      console.error("Email no válido.");
      return;
    }

    try {
      // 1. Encontrar el usuario en Authentication
      console.log(`Buscando usuario ${email}...`);
      const userRecord = await admin.auth().getUserByEmail(email);
      const uid = userRecord.uid;
      console.log(`Usuario encontrado con UID: ${uid}`);

      // 2. Verificar que exista en Firestore (doble chequeo)
      const userDirRef = db.collection("user_directory").doc(uid);
      const userDirDoc = await userDirRef.get();

      if (!userDirDoc.exists || userDirDoc.data().role !== "super_admin") {
        console.error("Error: Este usuario no está registrado como 'super_admin' en Firestore (user_directory).");
        return;
      }
      
      console.log("Usuario verificado en Firestore.");

      // 3. Asignar el Custom Claim
      await admin.auth().setCustomUserClaims(uid, { role: "super_admin" });

      console.log("\n¡ÉXITO!");
      console.log(`El permiso de 'super_admin' fue asignado a ${email}.`);
      console.log("Por favor, CIERRA SESIÓN y VUELVE A INICIAR SESIÓN en la aplicación web para que los cambios tomen efecto.");
      
      process.exit(0);

    } catch (error) {
      if (error.code === "auth/user-not-found") {
        console.error("Error: No se encontró ningún usuario con ese email en Firebase Authentication.");
      } else {
        console.error("Error inesperado:", error.message);
      }
      process.exit(1);
    }
  })();
} catch (error) {
  if (error.code === "MODULE_NOT_FOUND") {
    console.error("\nERROR: No se encontró el archivo 'serviceAccountKey.json'.");
    console.log("Por favor, descárgalo desde la consola de Firebase y colócalo en la carpeta /functions/");
  } else {
    console.error("Error al inicializar el SDK:", error.message);
  }
  process.exit(1);
}