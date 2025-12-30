// Import door images
import anandaDouble from '@/assets/doors/ananda-double-doors-ms01.webp';
import athulyaTwin from '@/assets/doors/athulya-twin-doors-at01.webp';
import auraGlass11 from '@/assets/doors/aura-glass-door-au11.webp';
import auraGlass61 from '@/assets/doors/aura-glass-door-au61.webp';
import galvanizedSteel from '@/assets/doors/galvanized-steel-door.webp';
import hingedDouble from '@/assets/doors/hinged-double-acting-door.webp';
import kutumb3003 from '@/assets/doors/kutumb-double-doors-km3003.webp';
import kutumb4004 from '@/assets/doors/kutumb-double-doors-km4004.webp';
import kutumb6006 from '@/assets/doors/kutumb-double-doors-km6006.webp';
import paritosh77777 from '@/assets/doors/paritosh-double-doors-pm77777.webp';
import paritosh88888 from '@/assets/doors/paritosh-double-doors-pm88888.webp';
import paritoshMotherSon from '@/assets/doors/paritosh-mother-son-door-pm55555.webp';
import paritosh44444 from '@/assets/doors/paritosh-single-doors-pm44444.webp';
import paritosh99999 from '@/assets/doors/paritosh-single-doors-pm99999.webp';
import smartFilm from '@/assets/doors/smart-film-pdlc.webp';
import steelDoor from '@/assets/doors/steel-door.webp';
import utkarsh from '@/assets/doors/utkarsh-single-doors-um004.webp';
import vrishabh from '@/assets/doors/vrishabh-single-doors-vm404.webp';
import kutumbMotherSon from '@/assets/doors/kutumb-mother-son-doors-km3003.webp';
import kutumbSingle3003 from '@/assets/doors/kutumb-single-doors-km3003-single.webp';
import kutumb8008 from '@/assets/doors/kutumb-single-doors-km8008.webp';
import metalDoor from '@/assets/doors/metal-door.webp';
import nikunjDouble from '@/assets/doors/nikunj-double-door-nk44.webp';
import paritosh11111 from '@/assets/doors/paritosh-double-doors-pm11111.webp';
import paritosh22222 from '@/assets/doors/paritosh-double-doors-pm22222.webp';
import paritosh33333 from '@/assets/doors/paritosh-double-doors-pm33333.webp';

export interface Product {
  image: string;
  name: string;
  code: string;
  category: string;
  sizes: string[];
  price: number;
}

export const categories = [
  'All Products',
  'Double Doors',
  'Single Doors',
  'Mother Son Doors',
  'Glass Doors',
  'Steel Doors',
];

export const products: Product[] = [
  {
    image: paritosh11111,
    name: 'Paritosh Double Doors',
    code: 'PM 11111',
    category: 'Double Doors',
    sizes: ['2100x1500x100mm', '2400x1800x100mm'],
    price: 65400,
  },
  {
    image: paritosh22222,
    name: 'Paritosh Double Doors',
    code: 'PM 22222',
    category: 'Double Doors',
    sizes: ['2100x1500x100mm', '2400x1800x100mm'],
    price: 72800,
  },
  {
    image: paritosh33333,
    name: 'Paritosh Double Doors',
    code: 'PM 33333',
    category: 'Double Doors',
    sizes: ['2100x1500x100mm', '2400x1800x100mm'],
    price: 69200,
  },
  {
    image: paritosh77777,
    name: 'Paritosh Double Doors',
    code: 'PM 77777',
    category: 'Double Doors',
    sizes: ['2100x1500x100mm', '2400x1800x100mm'],
    price: 75600,
  },
  {
    image: paritosh88888,
    name: 'Paritosh Double Doors',
    code: 'PM 88888',
    category: 'Double Doors',
    sizes: ['2100x1500x100mm', '2400x1500x100mm'],
    price: 71200,
  },
  {
    image: nikunjDouble,
    name: 'Nikunj Double Door',
    code: 'NK 44',
    category: 'Double Doors',
    sizes: ['2100x1500x100mm', '2400x1800x100mm'],
    price: 68400,
  },
  {
    image: kutumb3003,
    name: 'Kutumb Double Doors',
    code: 'KM 3003',
    category: 'Double Doors',
    sizes: ['2100x1500x100mm', '2400x1800x100mm'],
    price: 63800,
  },
  {
    image: kutumb4004,
    name: 'Kutumb Double Doors',
    code: 'KM 4004',
    category: 'Double Doors',
    sizes: ['2100x1500x100mm', '2400x1500x100mm'],
    price: 66200,
  },
  {
    image: kutumb6006,
    name: 'Kutumb Double Doors',
    code: 'KM 6006',
    category: 'Double Doors',
    sizes: ['2100x1050x100mm', '2400x1200x100mm'],
    price: 59400,
  },
  {
    image: anandaDouble,
    name: 'Ananda Double Doors',
    code: 'MS 01',
    category: 'Double Doors',
    sizes: ['2100x1500x100mm', '2400x1800x100mm'],
    price: 88400,
  },
  {
    image: athulyaTwin,
    name: 'Athulya Twin Doors',
    code: 'AT 01',
    category: 'Double Doors',
    sizes: ['2100x1500x100mm', '2400x1800x100mm'],
    price: 79800,
  },
  {
    image: paritosh44444,
    name: 'Paritosh Single Doors',
    code: 'PM 44444',
    category: 'Single Doors',
    sizes: ['2100x1200x90mm', '2400x1200x90mm'],
    price: 32400,
  },
  {
    image: paritosh99999,
    name: 'Paritosh Single Doors',
    code: 'PM 99999',
    category: 'Single Doors',
    sizes: ['2100x1200x90mm', '2400x1200x90mm'],
    price: 33800,
  },
  {
    image: kutumbSingle3003,
    name: 'Kutumb Single Doors',
    code: 'KM 3003',
    category: 'Single Doors',
    sizes: ['2100x1050x90mm', '2400x1050x90mm'],
    price: 31200,
  },
  {
    image: kutumb8008,
    name: 'Kutumb Single Doors',
    code: 'KM 8008',
    category: 'Single Doors',
    sizes: ['2100x1050x90mm', '2400x1050x90mm'],
    price: 29800,
  },
  {
    image: utkarsh,
    name: 'Utkarsh Single Doors',
    code: 'UM 004',
    category: 'Single Doors',
    sizes: ['2100x1050x90mm', '2400x1050x90mm'],
    price: 28700,
  },
  {
    image: vrishabh,
    name: 'Vrishabh Single Doors',
    code: 'VM 404',
    category: 'Single Doors',
    sizes: ['2100x1050x90mm', '2400x1200x90mm'],
    price: 30100,
  },
  {
    image: kutumbMotherSon,
    name: 'Kutumb Mother Son Doors',
    code: 'KM 3003',
    category: 'Mother Son Doors',
    sizes: ['2100x1050x100mm', '2400x1200x100mm'],
    price: 45600,
  },
  {
    image: paritoshMotherSon,
    name: 'Paritosh Mother Son Door',
    code: 'PM 55555',
    category: 'Mother Son Doors',
    sizes: ['2100x1050x100mm', '2400x1200x100mm'],
    price: 48200,
  },
  {
    image: auraGlass11,
    name: 'Aura Glass Door',
    code: 'AU 11',
    category: 'Glass Doors',
    sizes: ['2100x1050x90mm', '2400x1200x90mm'],
    price: 52800,
  },
  {
    image: auraGlass61,
    name: 'Aura Glass Door',
    code: 'AU 61',
    category: 'Glass Doors',
    sizes: ['2100x1050x90mm', '2400x1200x90mm'],
    price: 54200,
  },
  {
    image: smartFilm,
    name: 'Smart Film PDLC Glass',
    code: 'PDLC',
    category: 'Glass Doors',
    sizes: ['Custom sizes available'],
    price: 67800,
  },
  {
    image: steelDoor,
    name: 'Premium Steel Door',
    code: 'SD 001',
    category: 'Steel Doors',
    sizes: ['2100x1500x100mm', '2400x1800x100mm'],
    price: 41200,
  },
  {
    image: metalDoor,
    name: 'Metal Door',
    code: 'MD 001',
    category: 'Steel Doors',
    sizes: ['2100x1050x90mm', '2400x1200x90mm'],
    price: 21700,
  },
  {
    image: galvanizedSteel,
    name: 'Galvanized Steel Door',
    code: 'GSD 01',
    category: 'Steel Doors',
    sizes: ['2100x1050x90mm', '2400x1200x90mm'],
    price: 23400,
  },
  {
    image: hingedDouble,
    name: 'Hinged Double Acting Door',
    code: 'HDA 01',
    category: 'Steel Doors',
    sizes: ['2100x1500x100mm', '2400x1800x100mm'],
    price: 56800,
  },
];
