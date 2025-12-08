// =============================================================
// ARCHIVO: functions/index.js (NEW FUNCIÓN'createBusinessUser')
// PROPÓSITO: Backend que crea usuarios (Empleado de negocio).
// =============================================================
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true }); // ¡Añadimos CORS!

admin.initializeApp();
const db = admin.firestore();

// =============================================================
// FUNCIÓN: Crear Business And Owner (Propietario y Negocio)
// =============================================================
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

// =============================================================
// FUNCIÓN: Crear Empleado (Cajero, Operador y mas)
// =============================================================
exports.createBusinessUser = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {

    console.log("--- START: createBusinessUser ---");
    let requesterUid;
    let requesterBusinessId;

    try {
      // 1. VERIFICACIÓN DE SEGURIDAD (¿Quién llama?)
      const authorization = request.headers.authorization;
      if (!authorization || !authorization.startsWith("Bearer ")) {
        throw new Error("Token no proporcionado.");
      }
      const token = authorization.split("Bearer ")[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      requesterUid = decodedToken.uid;

      // 2. VERIFICAR QUE EL SOLICITANTE SEA PROPIETARIO
      // Leemos su rol desde user_directory para estar seguros
      const requesterDoc = await db.collection("user_directory").doc(requesterUid).get();

      if (!requesterDoc.exists) throw new Error("Usuario solicitante no encontrado.");

      const requesterData = requesterDoc.data();
      requesterBusinessId = requesterData.businessId; // ¡IMPORTANTE!

      // Validamos roles permitidos para crear usuarios
      const allowedRoles = ["Propietario", "super_admin"];
      if (!allowedRoles.includes(requesterData.role)) {
        throw new Error(`No tienes permisos para crear empleados. Rol actual: ${requesterData.role}`);
      }

      console.log(`Solicitante autorizado: ${requesterUid} para negocio: ${requesterBusinessId}`);

    } catch (error) {
      console.error("Error Auth:", error);
      response.status(403).json({ error: { message: "No autorizado." } });
      return;
    }

    // Si pasamos la seguridad, procedemos a crear el empleado
    try {
      const { userData } = request.body.data; // Esperamos { email, password, name, role, jobTitle }

      // 3. VALIDACIONES BÁSICAS
      if (!userData.email || !userData.password || !userData.role) {
        throw new Error("Faltan datos obligatorios (email, password, role).");
      }

      // Aseguramos que el rol sea uno válido para empleados
      const validEmployeeRoles = ["Cajero", "Operador"];
      if (!validEmployeeRoles.includes(userData.role)) {
        throw new Error("Rol de empleado no válido.");
      }

      // 4. CREAR USUARIO EN AUTH
      console.log(`Creando Auth para empleado: ${userData.email}`);
      const newEmployee = await admin.auth().createUser({
        email: userData.email,
        password: userData.password,
        displayName: userData.name,
        emailVerified: true, // Asumimos verificado o envías link después
        disabled: false,
      });

      // 5. ESCRIBIR EN FIRESTORE (Batch)
      const batch = db.batch();

      // A) Referencia al perfil dentro del negocio
      const userProfileRef = db.collection("businesses")
        .doc(requesterBusinessId)
        .collection("users")
        .doc(newEmployee.uid);

      batch.set(userProfileRef, {
        name: userData.name,
        email: userData.email,
        jobTitle: userData.jobTitle || userData.role, // Ej. "Cajero Turno Mañana"
        role: userData.role, // Este debe coincidir con tus ROLES en roles.config.js (Mayúscula inicial)
        departmentIds: userData.departmentIds || [],
        createdBy: requesterUid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        status: "active"
      });

      // B) Referencia al directorio global (para el Login rápido)
      const userDirectoryRef = db.collection("user_directory").doc(newEmployee.uid);
      batch.set(userDirectoryRef, {
        businessId: requesterBusinessId,
        role: userData.role
      });

      await batch.commit();

      console.log(`Empleado creado exitosamente: ${newEmployee.uid}`);

      response.status(200).json({
        data: {
          success: true,
          message: "Empleado creado correctamente",
          uid: newEmployee.uid
        }
      });

    } catch (error) {
      console.error("Error creando empleado:", error);
      response.status(500).json({
        error: { message: error.message || "Error interno del servidor." }
      });
    }
  });
});