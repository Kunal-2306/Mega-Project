const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const path = require('path');

dotenv.config();

const products = [
    {
        image: '/doors/paritosh-double-doors-pm11111.webp',
        name: 'Paritosh Double Doors',
        code: 'PM 11111',
        category: 'Double Doors',
        sizes: ['2100x1500x100mm', '2400x1800x100mm'],
        price: 65400,
    },
    {
        image: '/doors/paritosh-double-doors-pm22222.webp',
        name: 'Paritosh Double Doors',
        code: 'PM 22222',
        category: 'Double Doors',
        sizes: ['2100x1500x100mm', '2400x1800x100mm'],
        price: 72800,
    },
    {
        image: '/doors/paritosh-double-doors-pm33333.webp',
        name: 'Paritosh Double Doors',
        code: 'PM 33333',
        category: 'Double Doors',
        sizes: ['2100x1500x100mm', '2400x1800x100mm'],
        price: 69200,
    },
    {
        image: '/doors/paritosh-double-doors-pm77777.webp',
        name: 'Paritosh Double Doors',
        code: 'PM 77777',
        category: 'Double Doors',
        sizes: ['2100x1500x100mm', '2400x1800x100mm'],
        price: 75600,
    },
    {
        image: '/doors/paritosh-double-doors-pm88888.webp',
        name: 'Paritosh Double Doors',
        code: 'PM 88888',
        category: 'Double Doors',
        sizes: ['2100x1500x100mm', '2400x1500x100mm'],
        price: 71200,
    },
    {
        image: '/doors/nikunj-double-door-nk44.webp',
        name: 'Nikunj Double Door',
        code: 'NK 44',
        category: 'Double Doors',
        sizes: ['2100x1500x100mm', '2400x1800x100mm'],
        price: 68400,
    },
    {
        image: '/doors/kutumb-double-doors-km3003.webp',
        name: 'Kutumb Double Doors',
        code: 'KM 3003',
        category: 'Double Doors',
        sizes: ['2100x1500x100mm', '2400x1800x100mm'],
        price: 63800,
    },
    {
        image: '/doors/kutumb-double-doors-km4004.webp',
        name: 'Kutumb Double Doors',
        code: 'KM 4004',
        category: 'Double Doors',
        sizes: ['2100x1500x100mm', '2400x1500x100mm'],
        price: 66200,
    },
    {
        image: '/doors/kutumb-double-doors-km6006.webp',
        name: 'Kutumb Double Doors',
        code: 'KM 6006',
        category: 'Double Doors',
        sizes: ['2100x1050x100mm', '2400x1200x100mm'],
        price: 59400,
    },
    {
        image: '/doors/ananda-double-doors-ms01.webp',
        name: 'Ananda Double Doors',
        code: 'MS 01',
        category: 'Double Doors',
        sizes: ['2100x1500x100mm', '2400x1800x100mm'],
        price: 88400,
    },
    {
        image: '/doors/athulya-twin-doors-at01.webp',
        name: 'Athulya Twin Doors',
        code: 'AT 01',
        category: 'Double Doors',
        sizes: ['2100x1500x100mm', '2400x1800x100mm'],
        price: 79800,
    },
    {
        image: '/doors/paritosh-single-doors-pm44444.webp',
        name: 'Paritosh Single Doors',
        code: 'PM 44444',
        category: 'Single Doors',
        sizes: ['2100x1200x90mm', '2400x1200x90mm'],
        price: 32400,
    },
    {
        image: '/doors/paritosh-single-doors-pm99999.webp',
        name: 'Paritosh Single Doors',
        code: 'PM 99999',
        category: 'Single Doors',
        sizes: ['2100x1200x90mm', '2400x1200x90mm'],
        price: 33800,
    },
    {
        image: '/doors/kutumb-single-doors-km3003-single.webp',
        name: 'Kutumb Single Doors',
        code: 'KM 3003 (Single)',
        category: 'Single Doors',
        sizes: ['2100x1050x90mm', '2400x1050x90mm'],
        price: 31200,
    },
    {
        image: '/doors/kutumb-single-doors-km8008.webp',
        name: 'Kutumb Single Doors',
        code: 'KM 8008',
        category: 'Single Doors',
        sizes: ['2100x1050x90mm', '2400x1050x90mm'],
        price: 29800,
    },
    {
        image: '/doors/utkarsh-single-doors-um004.webp',
        name: 'Utkarsh Single Doors',
        code: 'UM 004',
        category: 'Single Doors',
        sizes: ['2100x1050x90mm', '2400x1050x90mm'],
        price: 28700,
    },
    {
        image: '/doors/vrishabh-single-doors-vm404.webp',
        name: 'Vrishabh Single Doors',
        code: 'VM 404',
        category: 'Single Doors',
        sizes: ['2100x1050x90mm', '2400x1200x90mm'],
        price: 30100,
    },
    {
        image: '/doors/kutumb-mother-son-doors-km3003.webp',
        name: 'Kutumb Mother Son Doors',
        code: 'KM 3003 (MS)',
        category: 'Mother Son Doors',
        sizes: ['2100x1050x100mm', '2400x1200x100mm'],
        price: 45600,
    },
    {
        image: '/doors/paritosh-mother-son-door-pm55555.webp',
        name: 'Paritosh Mother Son Door',
        code: 'PM 55555',
        category: 'Mother Son Doors',
        sizes: ['2100x1050x100mm', '2400x1200x100mm'],
        price: 48200,
    },
    {
        image: '/doors/aura-glass-door-au11.webp',
        name: 'Aura Glass Door',
        code: 'AU 11',
        category: 'Glass Doors',
        sizes: ['2100x1050x90mm', '2400x1200x90mm'],
        price: 52800,
    },
    {
        image: '/doors/aura-glass-door-au61.webp',
        name: 'Aura Glass Door',
        code: 'AU 61',
        category: 'Glass Doors',
        sizes: ['2100x1050x90mm', '2400x1200x90mm'],
        price: 54200,
    },
    {
        image: '/doors/smart-film-pdlc.webp',
        name: 'Smart Film PDLC Glass',
        code: 'PDLC',
        category: 'Glass Doors',
        sizes: ['Custom sizes available'],
        price: 67800,
    },
    {
        image: '/doors/steel-door.webp',
        name: 'Premium Steel Door',
        code: 'SD 001',
        category: 'Steel Doors',
        sizes: ['2100x1500x100mm', '2400x1800x100mm'],
        price: 41200,
    },
    {
        image: '/doors/metal-door.webp',
        name: 'Metal Door',
        code: 'MD 001',
        category: 'Steel Doors',
        sizes: ['2100x1050x90mm', '2400x1200x90mm'],
        price: 21700,
    },
    {
        image: '/doors/galvanized-steel-door.webp',
        name: 'Galvanized Steel Door',
        code: 'GSD 01',
        category: 'Steel Doors',
        sizes: ['2100x1050x90mm', '2400x1200x90mm'],
        price: 23400,
    },
    {
        image: '/doors/hinged-double-acting-door.webp',
        name: 'Hinged Double Acting Door',
        code: 'HDA 01',
        category: 'Steel Doors',
        sizes: ['2100x1500x100mm', '2400x1800x100mm'],
        price: 56800,
    },
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
