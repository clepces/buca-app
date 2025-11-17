// ======================================================
// ARCHIVO: functions/checkAdminClaim.js (CORREGIDO)
// PROPÓSITO: Lee y muestra los Custom Claims de un usuario.
// CORRECCIÓN: Se usa la instancia 'checkerApp' en lugar
//             de la app por defecto.
// ======================================================

const admin = require("firebase-admin");
const prompt = require("prompt-sync")();

try {
  const serviceAccount = require("./serviceAccountKey.json");

  // --- ¡INICIO DE CORRECCIÓN! ---
  // 1. Guardamos la instancia de la app en una variable
  const checkerApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  }, 'claimChecker'); 
  // --- FIN DE CORRECCIÓN! ---

  console.log("SDK de Admin (Checker) inicializado.");

  (async () => {
    const email = prompt("Ingresa el email de tu cuenta de Super Admin: ");
    if (!email) {
      console.error("Email no válido.");
      return;
    }

    try {
      // 1. Encontrar el usuario en Authentication
      console.log(`Buscando usuario ${email}...`);
      
      // --- ¡INICIO DE CORRECCIÓN! ---
      // 2. Usamos la instancia 'checkerApp' para llamar a auth()
      const userRecord = await checkerApp.auth().getUserByEmail(email);
      // --- FIN DE CORRECCIÓN! ---

      console.log(`Usuario encontrado con UID: ${userRecord.uid}`);

      // 3. ¡EL PASO CLAVE! Mostrar los permisos (claims)
      console.log("\n--- PERMISOS (CUSTOM CLAIMS) ENCONTRADOS ---");
      console.log(userRecord.customClaims);
      console.log("--------------------------------------------");

      if (userRecord.customClaims && userRecord.customClaims.role === 'super_admin') {
        console.log("\n✅ ¡VERIFICADO! El permiso 'role: super_admin' ESTÁ ASIGNADO en el servidor.");
      } else {
        console.log("\n❌ ¡ERROR DE VERIFICACIÓN! El permiso NO ESTÁ ASIGNADO.");
        console.log("   Vuelve a correr 'node setAdminClaim.js' y espera 5 minutos.");
      }
      
      process.exit(0);

    } catch (error) {
      console.error("Error inesperado:", error.message);
      process.exit(1);
    }
  })();
} catch (error) {
  console.error("Error al inicializar el SDK:", error.message);
  process.exit(1);
}