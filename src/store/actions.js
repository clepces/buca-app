import { saveState, deleteProductById, updateProductById } from '../services/storage.service.js';
import { showToast } from '../services/toast.service.js';
import { errorService } from '../services/error.service.js';
import { firebaseAdapter } from '../services/storage-adapters/firebase.adapter.js';
import { Logger } from '../services/logger.service.js';

let rerenderCallback = () => {};

export function registerRerender(callback) {
    rerenderCallback = callback;
}

export async function addProduct(state, product) {
    state.products.unshift(product);
    rerenderCallback();

    try {
        await firebaseAdapter.saveProduct(state, product);
        showToast(`Producto "${product.product_info.product_name}" guardado y sincronizado.`, 'success');
        await saveState(state);
    } catch (error) {
        errorService.handle(error, "Fallo de sincronización. El producto se guardó solo localmente.");
    }
}

export async function deleteProduct(state, productId) {
    const productToDelete = state.products.find(p => p.id === productId);
    if (!productToDelete) return;

    const productName = productToDelete.product_info.product_name;
    state.products = state.products.filter(p => p.id !== productId);
    rerenderCallback();
    showToast(`Producto "${productName}" eliminado.`, 'info');

    try {
        await firebaseAdapter.deleteProduct(state, productId);
        Logger.info(`Producto ${productId} sincronizado (eliminado) en Firebase.`);
        await saveState(state);
    } catch (error) {
        errorService.handle(error, `Fallo al eliminar "${productName}" en la nube. Se eliminó solo localmente.`);
    }
}

export async function updateProduct(state, productId, updatedData) {
    const index = state.products.findIndex(p => p.id === productId);
    if (index === -1) return;

    const originalProduct = { ...state.products[index] };
    state.products[index] = { ...originalProduct, ...updatedData };
    rerenderCallback();

    try {
        await firebaseAdapter.updateProduct(state, productId, updatedData);
        showToast(`Producto "${updatedData.product_info.product_name}" actualizado y sincronizado.`, 'success');
        await saveState(state);
    } catch (error) {
        errorService.handle(error, "Fallo de sincronización. Los cambios se guardaron solo localmente.");
        state.products[index] = originalProduct;
        rerenderCallback();
    }
}

export async function updateSetting(state, keyPath, value) {
    const keys = keyPath.split('.');
    let current = state.settings;
    for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    await saveState(state);
}

export async function setProducts(state, products) {
    state.products = products;
    await saveState(state);
}