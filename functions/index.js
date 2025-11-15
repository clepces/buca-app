// ======================================================
// ARCHIVO: functions/index.js (NUEVO)
// PROPÓSITO: Backend que crea el negocio y el propietario.
// ======================================================

const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Inicializamos la app de ADMIN (la "llave maestra")
admin.initializeApp();
const db = admin.firestore();

/**
 * Función 'onCall' (invocable) para crear un negocio y su propietario.
 * Solo los Super Admins autenticados pueden llamarla.
 */
exports.createBusinessAndOwner = functions.https.onCall(async (data, context) => {
  // 1. Verificación de Seguridad
  // Nos aseguramos de que quien llama es un Super Admin
  if (!context.auth || context.auth.token.role !== "super_admin") {
    throw new functions.https.HttpsError(
      "permission-denied",
      "No tienes permisos para realizar esta acción."
    );
  }

  const { businessData, ownerData } = data;

  // 2. Validar datos (simple)
  if (!businessData.name || !ownerData.email || !ownerData.password) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Faltan datos (nombre de negocio, email o contraseña)."
    );
  }

  let newOwner;
  try {
    // 3. Crear el usuario en Firebase AUTHENTICATION
    console.log(`Creando usuario Auth para: ${ownerData.email}`);
    newOwner = await admin.auth().createUser({
      email: ownerData.email,
      password: ownerData.password,
      displayName: ownerData.name,
      emailVerified: true, // Lo marcamos como verificado
      disabled: false,
    });

    // 4. Crear los documentos en FIRESTORE (en un batch)
    console.log(`Usuario creado con UID: ${newOwner.uid}. Creando documentos...`);
    const batch = db.batch();

    // A. El documento principal del negocio
    const businessRef = db.collection("businesses").doc(); // ID automático
    batch.set(businessRef, {
      name: businessData.name,
      planId: businessData.planId,
      ownerUid: newOwner.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "active",
    });

    // B. El perfil del usuario DENTRO del negocio
    const userProfileRef = db
      .collection("businesses")
      .doc(businessRef.id)
      .collection("users")
      .doc(newOwner.uid);
    
    batch.set(userProfileRef, {
      name: ownerData.name,
      email: ownerData.email,
      jobTitle: "Propietario", // ¡Rol clave!
      role: "Propietario", // Mantenemos consistencia
      departmentIds: ["main"], // Departamento por defecto
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // C. El directorio global de usuarios (para el login)
    const userDirectoryRef = db.collection("user_directory").doc(newOwner.uid);
    batch.set(userDirectoryRef, {
      businessId: businessRef.id, // Ligamos al nuevo negocio
      role: "Propietario", // ¡Rol clave!
    });

    // 5. Ejecutar todas las escrituras
    await batch.commit();

    console.log("¡Negocio y propietario creados con éxito!");
    return {
      success: true,
      businessId: businessRef.id,
      ownerId: newOwner.uid,
    };

  } catch (error) {
    // 6. Manejo de Errores
    console.error("Error al crear negocio:", error);

    // Si falló la creación del negocio pero el usuario SÍ se creó,
    // debemos borrar el usuario de Auth para evitar basura.
    if (newOwner && newOwner.uid) {
      console.warn(`Error en Firestore. Revirtiendo creación de usuario Auth ${newOwner.uid}`);
      await admin.auth().deleteUser(newOwner.uid);
    }

    // Devolver un error amigable al cliente
    if (error.code === "auth/email-already-exists") {
      throw new functions.https.HttpsError(
        "already-exists",
        "El email del propietario ya está en uso."
      );
    }
    throw new functions.https.HttpsError(
      "internal",
      "Ocurrió un error interno en el servidor."
    );
  }
});