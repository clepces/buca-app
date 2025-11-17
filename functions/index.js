// ======================================================
// ARCHIVO: functions/index.js (ACTUALIZADO A 'onRequest')
// PROPÓSITO: Backend que crea el negocio y el propietario.
// CORRECCIÓN: Se convierte de 'onCall' a 'onRequest'
//             para manejar la autenticación manualmente.
// ======================================================

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true }); // ¡Añadimos CORS!

admin.initializeApp();
const db = admin.firestore();

exports.createBusinessAndOwner = functions.https.onRequest((request, response) => {
  // Envolvemos la función con el manejador de CORS
  cors(request, response, async () => {
    
    // --- DEBUG DE PERMISOS (MANUAL) ---
    console.log("--- DEBUG DE PERMISOS (onRequest) ---");
    console.log("Headers recibidos:", request.headers);

    let decodedToken;
    try {
      // 1. Verificación de Seguridad (Manual)
      const authorization = request.headers.authorization;
      if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new Error("Token no proporcionado.");
      }

      const token = authorization.split("Bearer ")[1];
      decodedToken = await admin.auth().verifyIdToken(token);
      
      console.log("Token decodificado:", decodedToken);

      if (decodedToken.role !== "super_admin") {
        throw new Error("Permisos insuficientes.");
      }
      
      console.log("¡Permiso de super_admin VERIFICADO!");

    } catch (error) {
      console.error("Error de autenticación:", error.message);
      // Devolvemos el error en el formato que espera el 'fetch'
      response.status(403).json({ 
        error: { message: "No tienes permisos para realizar esta acción." } 
      });
      return;
    }

    // Si la autenticación es exitosa, continuamos...
    try {
      // 2. Obtener datos (ahora desde 'request.body.data')
      const { businessData, ownerData } = request.body.data;

      // 3. Validar datos
      if (!businessData.name || !ownerData.email || !ownerData.password) {
        throw new Error("Faltan datos (nombre, email o contraseña).");
      }

      let newOwner;
      try {
        // 4. Crear el usuario en Firebase AUTHENTICATION
        console.log(`Creando usuario Auth para: ${ownerData.email}`);
        newOwner = await admin.auth().createUser({
          email: ownerData.email,
          password: ownerData.password,
          displayName: ownerData.name,
          emailVerified: true,
          disabled: false,
        });

        // 5. Crear los documentos en FIRESTORE (en un batch)
        console.log(`Usuario creado con UID: ${newOwner.uid}. Creando documentos...`);
        const batch = db.batch();

        const businessRef = db.collection("businesses").doc();
        batch.set(businessRef, {
          name: businessData.name,
          planId: businessData.planId,
          ownerUid: newOwner.uid,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          status: "active",
        });

        const userProfileRef = db.collection("businesses").doc(businessRef.id).collection("users").doc(newOwner.uid);
        batch.set(userProfileRef, {
          name: ownerData.name,
          email: ownerData.email,
          jobTitle: "Propietario",
          role: "Propietario",
          departmentIds: ["main"],
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        const userDirectoryRef = db.collection("user_directory").doc(newOwner.uid);
        batch.set(userDirectoryRef, {
          businessId: businessRef.id,
          role: "Propietario",
        });

        await batch.commit();

        // 6. Enviar respuesta de ÉXITO
        console.log("¡Negocio y propietario creados con éxito!");
        response.status(200).json({
          data: {
            success: true,
            businessId: businessRef.id,
            ownerId: newOwner.uid,
          }
        });

      } catch (error) {
        // 7. Manejo de Errores (Rollback)
        console.error("Error al crear negocio (try/catch interno):", error);
        if (newOwner && newOwner.uid) {
          console.warn(`Error en Firestore. Revirtiendo creación de usuario Auth ${newOwner.uid}`);
          await admin.auth().deleteUser(newOwner.uid);
        }

        if (error.code === "auth/email-already-exists") {
           throw new Error("El email del propietario ya está en uso.");
        }
        throw new Error(error.message || "Error interno al crear documentos.");
      }
    
    } catch (error) {
      // 8. Manejo de Errores (General)
      console.error("Error en el handler de la función:", error);
      response.status(500).json({ 
        error: { message: error.message || "Ocurrió un error interno." }
      });
    }
  });
});