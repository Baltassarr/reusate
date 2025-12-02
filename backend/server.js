const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración básica
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// Almacenar pedidos (en memoria)
const orders = [];

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Ruta para procesar pedidos (simplificada)
app.post('/api/process-order', (req, res) => {
    const { cart, total, customerInfo } = req.body;
    
    // Crear número de pedido
    const orderNumber = 'CHCS-' + Date.now();
    
    // Guardar pedido
    const order = {
        id: orderNumber,
        cart: cart,
        total: total,
        customer: customerInfo,
        status: 'COMPLETED',
        date: new Date()
    };
    
    orders.push(order);
    
    console.log('📦 NUEVO PEDIDO RECIBIDO:');
    console.log('Número de pedido:', orderNumber);
    console.log('Total: $', total);
    console.log('Productos:', cart.map(item => `${item.name} x${item.quantity}`).join(', '));
    console.log('Cliente:', customerInfo);
    console.log('---');
    
    // Enviar respuesta de éxito
    res.json({
        success: true,
        orderId: orderNumber,
        message: 'Pedido procesado correctamente'
    });
});

// Ruta para ver pedidos
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🛒 Tienda CHCS funcionando en: http://localhost:${PORT}`);
    console.log(`📊 Panel de pedidos: http://localhost:${PORT}/api/orders`);
});