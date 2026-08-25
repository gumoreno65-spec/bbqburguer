import { useEffect, useState } from 'react';
import { supabase, type MenuItem } from '@/lib/supabase';
import { Flame, X } from 'lucide-react';

type MenuProps = {
  onAddToCart: (item: MenuItem, selectedExtras: Record<string, number>, total: number) => void;
};

const extras = [
  { name: 'Barbecue', price: 7 },
  { name: 'Jalapeno', price: 7 },
  { name: 'Bacon', price: 12 },
  { name: 'Burger bovino 140g', price: 16 },
  { name: 'Burger suíno 140g', price: 16 },
  { name: 'Burger bovino 90g', price: 12 },
  { name: 'Mussarela', price: 10 },
  { name: 'Cheddar', price: 10 },
  { name: 'Catupiry', price: 10 },
  { name: 'Salada - alface', price: 7 },
  { name: 'Salada - rúcula', price: 7 },
  { name: 'Salada - tomate', price: 7 },
  { name: 'Frango', price: 10 },
  { name: 'Fritas', price: 10 },
  { name: 'Maionese', price: 8 },
  { name: 'Provolone', price: 16 },
  { name: 'Onion Rings', price: 8 },
  { name: 'Picles', price: 4 },
  { name: 'Abacaxi', price: 8 },
  { name: 'Cebola caramelizada', price: 8 },
] as const;

const categories = [
  { key: 'burgers', label: 'Lanches' },
  { key: 'tradicionais', label: 'Tradicionais' },
  { key: 'mini', label: 'Mini Burgers' },
  { key: 'sides', label: 'Acompanhamentos' },
  { key: 'parrilla', label: 'Parrilla' },
  { key: 'pizzas', label: 'Pizzas' },
  { key: 'saladas', label: 'Saladas' },
  { key: 'porcoes', label: 'Porções' },
  { key: 'meias', label: 'Meias Porções' },
  { key: 'extras', label: 'Adicionais' },
  { key: 'sopa', label: 'Sopa' },
  { key: 'drinks', label: 'Bebidas' },
  { key: 'cervejas', label: 'Cervejas' },
  { key: 'chopps', label: 'Chopps' },
  { key: 'bubble', label: 'Bubble BBQ' },
  { key: 'sobremesas', label: 'Sobremesas' },
  { key: 'doces', label: 'Doces' },
];

const featuredItems: MenuItem[] = [
  { id: 'smash', name: 'Smash Burger', description: 'Pão brioche de batata, duplo burger de 90 gramas, duplo cheddar, barbecue da casa e maionese defumada. Acompanha fritas.', price: 38, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421172758500986/Smash%20Burger.jpg', is_featured: true, is_available: true, sort_order: 1 },
  { id: 'provolone', name: 'Provolone Burger', description: 'Pão brioche de batata, burger bovino, tomate, disco de provolone 100g, couve crispy, maionese e barbecue da casa. Acompanha fritas.', price: 48, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421178044821350/provolone_burger.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'pig-pina', name: 'Pig & Piña', description: 'Pão brioche de batata, mussarela, barbecue da casa, alface, cebola caramelizada, tomate, abacaxi grelhado, burger suíno e maionese artesanal. Acompanha fritas.', price: 42, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421182166513336/pig%20e%20pina.jpg', is_featured: false, is_available: true, sort_order: 3 },
  { id: 'noiva', name: 'Noiva do Galo', description: 'Sobrecoxa de frango desossada empanada frita, maionese defumada, molho BBQ agridoce, salada e nuvem de queijo no pão brioche de batata.', price: 44, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421182593423313/noiva%20do%20galo.jpg', is_featured: false, is_available: true, sort_order: 4 },
  { id: 'quentin', name: 'Quentin Tarantino', description: 'Pão brioche de batata, maionese artesanal, rúcula, onion rings, mussarela, cheddar, burger bovino, tomate, bacon de costela crocante e barbecue da casa. Acompanha fritas.', price: 42, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421182832401056/quentin%20tarantino.jpg', is_featured: false, is_available: true, sort_order: 5 },
  { id: 'vanderlei', name: 'Vanderlei Silva', description: 'Duplo burger bovino, mussarela dupla, barbecue da casa, alface dupla, tomate duplo, maionese e pão brioche de batata. Acompanha fritas.', price: 48, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421183077853691/vanderlei%20silva.jpg', is_featured: false, is_available: true, sort_order: 6 },
  { id: 'jack-black', name: 'Jack Black', description: 'Pão brioche de batata, mussarela, cheddar, cebola caramelizada, barbecue da casa, burger bovino, rúcula e maionese artesanal. Acompanha fritas.', price: 42, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421183303587196/jack%20black.jpg', is_featured: false, is_available: true, sort_order: 7 },
  { id: 'dudu', name: 'Dudu Magoo', description: 'Pão brioche de batata, mussarela, cheddar, barbecue da casa, burger bovino e maionese artesanal. Acompanha fritas.', price: 38, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421183518072297/dudu%20magoo.jpg', is_featured: false, is_available: true, sort_order: 8 },
  { id: 'rock', name: 'Rock Breja', description: 'Pão de malte tostado, barbecue lupulado, bacon de pernil caramelizado, burger bovino, duplo cheddar, mesclun de alface, maionese artesanal e tomate. Acompanha fritas.', price: 42, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421183759256421/rock%20breja.jpg', is_featured: false, is_available: true, sort_order: 9 },
  { id: 'jimmy', name: 'Jimmy Bacon', description: 'Pão de brioche de bacon, burger bovino, bacon de costela crocante, barbecue da casa, duplo cheddar e maionese de bacon. Acompanha fritas.', price: 42, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421183953389718/jimmy%20bacon.jpg', is_featured: false, is_available: true, sort_order: 10 },
  { id: 'pastrami', name: 'Pastrami Burger', description: 'Burger bovino, pão brioche de batata, lascas de smoked pastrami, mussarela e maionese defumada. Acompanha fritas.', price: 52, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421184812408066/pastrami%20burger.jpg', is_featured: false, is_available: true, sort_order: 11 },
  { id: 'bbq', name: 'BBQ Burger', description: 'Burger bovino, mussarela, alface crespa, tomate italiano, barbecue da casa e maionese artesanal defumada no pão brioche de batata. Acompanha fritas.', price: 40, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638481106648348014/bbq.jpg', is_featured: false, is_available: true, sort_order: 12 },
  { id: 'fritas', name: 'Fritas Tradicional', description: 'Porção de batatas fritas crocantes.', price: 40, category: 'sides', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421199827738353/fritas%20tradicional.jpg', is_featured: true, is_available: true, sort_order: 1 },
  { id: 'fritas-cheddar', name: 'Fritas Cheddar e Bacon', description: 'Batatas fritas cobertas com cheddar e bacon.', price: 45, category: 'sides', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421200115098926/fritas%20cheddar%20e%20bacon.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'onion-rings', name: 'Onion Rings', description: 'Anéis de cebola empanados e crocantes.', price: 45, category: 'sides', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421201006970320/onion%20rings.jpg', is_featured: false, is_available: true, sort_order: 3 },
  { id: 'batata-rustica', name: 'Batata Rústica', description: 'Batata rústica crocante.', price: 45, category: 'sides', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638422307019637103/batata%20rustica.jpg', is_featured: false, is_available: true, sort_order: 4 },
  { id: 'suco-laranja', name: 'Suco de Laranja', description: 'Suco natural de laranja.', price: 16, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421204621196487/laranja.jpg', is_featured: true, is_available: true, sort_order: 1 },
  { id: 'suco-morango', name: 'Suco de Laranja com Morango', description: 'Suco natural de laranja com morango.', price: 20, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421205126960403/laranja%20com%20morango.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'coca', name: 'Coca-Cola Lata', description: 'Refrigerante em lata.', price: 8, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421417245003532/coca%20lata.jpg', is_featured: false, is_available: true, sort_order: 3 },
  { id: 'agua', name: 'Água sem Gás', description: 'Água mineral sem gás.', price: 6, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421263088014299/agua.jpg', is_featured: false, is_available: true, sort_order: 4 },
  { id: 'heineken', name: 'Heineken Long Neck', description: 'Cerveja long neck.', price: 14, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421422444142389/heineken%20long.jpg', is_featured: false, is_available: true, sort_order: 5 },
  { id: 'chopp', name: 'Chopp Artesanal Pilsen Premium 300ml', description: 'Chopp artesanal Pilsen Premium.', price: 18, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421235903987598/chopp%20cream%20ale.jpg', is_featured: false, is_available: true, sort_order: 6 },
  { id: 'chopp-neipa', name: 'Chopp Neipa', description: 'Chopp artesanal NEIPA.', price: 22, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421245243496346/chopp%20neipa.jpg', is_featured: false, is_available: true, sort_order: 7 },
  { id: 'kids', name: 'Kids Combo', description: 'Pão brioche de batata, mussarela, barbecue da casa, burger bovino e maionese artesanal. Acompanha suco Kapo e fritas.', price: 38, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421182360197807/kids%20combo.jpg', is_featured: false, is_available: true, sort_order: 13 },
  { id: 'mico', name: 'Mico Macho Nervoso', description: 'Burger bovino, cebola caramelizada, mussarela, bacon de costela, jalapeño, alface, tomate, barbecue da casa e maionese artesanal. Acompanha fritas.', price: 44, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421184214678174/mico%20macho%20nervoso.jpg', is_featured: false, is_available: true, sort_order: 14 },
  { id: 'bonnie', name: 'Bonnie & Clayde', description: 'Pão brioche de batata, mussarela, barbecue da casa, frango desfiado, burger bovino, catupiry, alface, tomate e maionese artesanal. Acompanha fritas.', price: 48, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421184530050968/bonnie%20e%20clayde.jpg', is_featured: false, is_available: true, sort_order: 15 },
  { id: 'sebastiao', name: 'Sebastião', description: 'Triplo burger bovino, tripla mussarela, triplo bacon de costela, frango desfiado, triplo onion rings, catupiry, barbecue, cheddar, alface, tomate e maionese artesanal. Acompanha fritas.', price: 95, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421185290164019/sebastiao.jpg', is_featured: false, is_available: true, sort_order: 16 },
  { id: 'tony', name: 'Tony Manero', description: 'Duplo burger bovino, pão brioche de batata, bacon de costela, duplo cheddar, barbecue e maionese defumada. Acompanha fritas.', price: 48, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421185506670050/tony%20manero.jpg', is_featured: false, is_available: true, sort_order: 17 },
  { id: 'vincent', name: 'Vincent Vega', description: 'Pão brioche de batata, mussarela, barbecue, burger bovino, maionese artesanal, bacon de costela e ovo estrelado. Acompanha fritas.', price: 42, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421185729495966/vicent%20vega.jpg', is_featured: false, is_available: true, sort_order: 18 },
  { id: 'thunderbird', name: 'Thunderbird', description: 'Pão brioche de batata, mussarela, bacon de costela, barbecue, burger bovino, rúcula, tomate e maionese artesanal. Acompanha fritas.', price: 42, category: 'burgers', image_url: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1200', is_featured: false, is_available: true, sort_order: 19 },
  { id: 'dalefish', name: 'Dalefish', description: 'Pão brioche de batata, filé de tilápia empanado, molho vinagrete, alface e maionese artesanal. Acompanha fritas.', price: 50, category: 'burgers', image_url: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=1200', is_featured: false, is_available: true, sort_order: 20 },
  { id: 'my-friend', name: 'My Friend Burger', description: 'Burger bovino de 200g recheado com queijo, bacon de costela, barbecue e maionese defumada no pão brioche de batata. Acompanha fritas.', price: 48, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638441204744575269/MY%20FRIEND%20BURGER.jpg', is_featured: false, is_available: true, sort_order: 21 },
  { id: 'jack-ribwich', name: 'Jack Ribwich Burger', description: 'Burger bovino, cheddar, bacon crocante e lascas de costela bovina defumada, barbecue e maionese defumada no pão brioche. Acompanha fritas.', price: 54, category: 'burgers', image_url: 'https://mogosmart.s3.us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638904450029367315/IMG_2322%20%281%29.jpg', is_featured: false, is_available: true, sort_order: 22 },
  { id: 'bbq-fc', name: 'BBQ.FC', description: 'Peito de frango empanado, bacon de costela, cheddar, alface, tomate, picles e maionese defumada no pão brioche. Acompanha fritas.', price: 40, category: 'burgers', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638922728122009217/IMG_2490%20%284%29.jpg', is_featured: false, is_available: true, sort_order: 23 },
  { id: 'cheese-salada', name: 'Cheese Salada', description: 'Burger bovino, mussarela, alface, tomate, pão brioche de batata e maionese.', price: 30, category: 'tradicionais', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421189558432333/cheese%20salada.jpg', is_featured: false, is_available: true, sort_order: 1 },
  { id: 'cheese-frango', name: 'Cheese Frango', description: 'Frango desfiado, mussarela, alface, tomate, pão brioche de batata e maionese.', price: 35, category: 'tradicionais', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421189810249819/cheese%20frango.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'cheese-bacon', name: 'Cheese Bacon', description: 'Burger bovino, mussarela, bacon, alface, tomate, maionese e pão brioche de batata.', price: 35, category: 'tradicionais', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421190080857436/cheese%20bacon.jpg', is_featured: false, is_available: true, sort_order: 3 },
  { id: 'mini-solteiro', name: 'Mini Burger Solteiro - 3un', description: 'Três mini burgers artesanais.', price: 60, category: 'mini', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421188373969206/mini%20burger%20solteiro.jpg', is_featured: false, is_available: true, sort_order: 1 },
  { id: 'mini-casal', name: 'Mini Burger Casal - 6un', description: 'Seis mini burgers artesanais.', price: 95, category: 'mini', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421188883339637/mini%20burger%20casal.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'mini-familia', name: 'Mini Burger Família - 10un', description: 'Dez mini burgers artesanais.', price: 140, category: 'mini', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421189212676899/mini%20burger%20familia.jpg', is_featured: false, is_available: true, sort_order: 3 },
  { id: 'batata-strogonoff', name: 'Batata Recheada Strogonoff Bovino', description: 'Batata recheada com strogonoff bovino.', price: 42, category: 'sides', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421195726205492/battata%20strogonoff%20bovino.jpg', is_featured: false, is_available: true, sort_order: 5 },
  { id: 'batata-frango', name: 'Batata Recheada Frango, Cheddar e Bacon', description: 'Batata recheada com frango, cheddar e bacon.', price: 40, category: 'sides', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421196016565382/batata%20frango%20cheddar%20e%20bacon.jpg', is_featured: false, is_available: true, sort_order: 6 },
  { id: 'bisteca', name: 'Bisteca Fiorentina', description: 'Acompanha fritas, farofa de bacon e chimichurri.', price: 180, category: 'parrilla', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421190842319033/bisteca%20fiorentina.jpg', is_featured: true, is_available: true, sort_order: 1 },
  { id: 'porterhouse', name: 'Porterhouse', description: 'Acompanha fritas, farofa de bacon e chimichurri.', price: 180, category: 'parrilla', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421191157289008/porterhouse.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'assado-tiras', name: 'Assado de Tiras', description: 'Acompanha pão de alho, queijo coalho, vinagrete e farofa de bacon.', price: 160, category: 'parrilla', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421191498933824/assado%20de%20tiras.jpg', is_featured: false, is_available: true, sort_order: 3 },
  { id: 'pizza-portuguesa', name: 'Pizza Portuguesa', description: 'Molho de tomate italiano, mussarela, presunto, ovos, ervilha fresca e cebola roxa.', price: 50, category: 'pizzas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421237243842000/portuguesa.jpg', is_featured: false, is_available: true, sort_order: 1 },
  { id: 'pizza-margherita', name: 'Pizza Regina Margherita', description: 'Molho de tomate italiano, mussarela, mussarela de búfala e manjericão.', price: 48, category: 'pizzas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421240383770796/regina%20margherita.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'pizza-bacon', name: 'Pizza Bacon e Brócolis', description: 'Molho de tomate italiano, mussarela, brócolis e bacon.', price: 48, category: 'pizzas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421240719447878/bacon%20e%20brocolis.jpg', is_featured: false, is_available: true, sort_order: 3 },
  { id: 'pizza-tricolore', name: 'Pizza Tricolore', description: 'Molho de tomate italiano, mussarela, rúcula, tomate seco e parmesão.', price: 50, category: 'pizzas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421240138216203/tricolore.jpg', is_featured: false, is_available: true, sort_order: 4 },
  { id: 'pizza-pepperoni', name: 'Pizza Pepperoni', description: 'Molho de tomate italiano, mussarela e salame pepperoni.', price: 50, category: 'pizzas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421238660143492/pepperoni.jpg', is_featured: false, is_available: true, sort_order: 5 },
  { id: 'pizza-parma', name: 'Pizza Parma e Grana Padano', description: 'Molho de tomate italiano, mussarela, rúcula, presunto de Parma e Grana Padano.', price: 52, category: 'pizzas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421239366515555/parma%20e%20grana%20padano.jpg', is_featured: false, is_available: true, sort_order: 6 },
  { id: 'pizza-pera', name: 'Pizza de Pera, Gorgonzola e Mel', description: 'Mussarela, pera laminada, gorgonzola e mel.', price: 48, category: 'pizzas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421239037213770/pera%20gorgonzola%20e%20mel.jpg', is_featured: false, is_available: true, sort_order: 7 },
  { id: 'pizza-calabresa', name: 'Pizza Calabresa Especial', description: 'Molho de tomate, mussarela, calabresa, cebola roxa e gorgonzola.', price: 50, category: 'pizzas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421237910829211/calabresa%20especial.jpg', is_featured: false, is_available: true, sort_order: 8 },
  { id: 'pizza-quatro', name: 'Pizza de Quatro Queijos', description: 'Molho de tomate, mussarela, provolone, gorgonzola e parmesão.', price: 50, category: 'pizzas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421237505727262/quatro%20queijos.jpg', is_featured: false, is_available: true, sort_order: 9 },
  { id: 'pizza-pistache', name: 'Pizza de Pistache', description: 'Massa de longa fermentação, creme de pistache e ganache de chocolate, finalizada com pistache e amêndoas.', price: 54, category: 'pizzas', image_url: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=1200', is_featured: false, is_available: true, sort_order: 10 },
  { id: 'salada-pina', name: 'Salada Piña', description: 'Burger bovino, abacaxi grelhado, pepino, tomate, folhas verdes, batata canoa e molho de mostarda e mel.', price: 39, category: 'saladas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421196901037003/salada%20pina.jpg', is_featured: false, is_available: true, sort_order: 1 },
  { id: 'salada-frango', name: 'Salada Frango Grelhado', description: 'Frango grelhado, folhas verdes, tomate-cereja, vinagrete de manga e molho agridoce.', price: 39, category: 'saladas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421197135294608/salada%20de%20frango%20grelhado.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'frango-1kg', name: 'Frango no Balde 1kg', description: 'Porção de frango crocante.', price: 92, category: 'sides', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421198652022612/frango%201kg.jpg', is_featured: false, is_available: true, sort_order: 7 },
  { id: 'frango-700g', name: 'Frango no Balde 700g', description: 'Porção de frango crocante.', price: 80, category: 'sides', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421198997772334/frango%20700G.jpg', is_featured: false, is_available: true, sort_order: 8 },
  { id: 'dadinho', name: 'Dadinho de Tapioca', description: 'Dadinho de tapioca crocante.', price: 40, category: 'sides', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421200451248762/dadinho%20de%20tapioca.jpg', is_featured: false, is_available: true, sort_order: 9 },
  { id: 'tilapia', name: 'Tilápia à Dorê', description: 'Tilápia empanada e frita.', price: 65, category: 'sides', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421201265136545/tilapia%20a%20dore.jpg', is_featured: false, is_available: true, sort_order: 10 },
  { id: 'sassami', name: 'Sassami Crocante', description: 'Tiras de frango empanadas e crocantes.', price: 65, category: 'sides', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421201578109811/sassami%20crocante.jpg', is_featured: false, is_available: true, sort_order: 11 },
  { id: 'brownie', name: 'Brownie com Sorvete', description: 'Servido somente na loja.', price: 28, category: 'sobremesas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421197650564424/brownie%20com%20sorvete.jpg', is_featured: false, is_available: true, sort_order: 1 },
  { id: 'milkshake', name: 'Milk Shake de Morango', description: 'Servido somente na loja.', price: 28, category: 'sobremesas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421197904550553/milkshake%20de%20morango.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'suco-limao', name: 'Suco de Limão', description: 'Suco natural de limão.', price: 16, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421204875897354/limao.jpg', is_featured: false, is_available: true, sort_order: 8 },
  { id: 'suco-amora', name: 'Suco de Laranja com Amora', description: 'Suco natural de laranja com amora.', price: 20, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421206828531202/laranja%20com%20amora.jpg', is_featured: false, is_available: true, sort_order: 9 },
  { id: 'soda-tangerina', name: 'Soda Tangerina', description: 'Soda artesanal de tangerina.', price: 16, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421203970003083/soda%20ma%C3%A7a%20verde.jpg', is_featured: false, is_available: true, sort_order: 10 },
  { id: 'soda-morango', name: 'Soda Morango', description: 'Soda artesanal de morango.', price: 16, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638422306581649243/soda%20morango.jpg', is_featured: false, is_available: true, sort_order: 11 },
  { id: 'soda-melancia', name: 'Soda Melancia', description: 'Soda artesanal de melancia.', price: 16, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638422306253607850/soda%20melancia.jpg', is_featured: false, is_available: true, sort_order: 20 },
  { id: 'soda-mirtilo', name: 'Soda Mirtilo', description: 'Soda artesanal de mirtilo.', price: 16, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638422306484833365/soda%20mirtilo.jpg', is_featured: false, is_available: true, sort_order: 21 },
  { id: 'coca-zero', name: 'Coca Zero Lata', description: 'Refrigerante em lata.', price: 8, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421417127436341/coca%20zero%20lata.jpg', is_featured: false, is_available: true, sort_order: 12 },
  { id: 'guarana', name: 'Guaraná Lata', description: 'Refrigerante em lata.', price: 8, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421417746807556/guarana%20lata.jpg', is_featured: false, is_available: true, sort_order: 13 },
  { id: 'agua-gas', name: 'Água com Gás', description: 'Água mineral com gás.', price: 6, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421263088014299/agua.jpg', is_featured: false, is_available: true, sort_order: 14 },
  { id: 'original', name: 'Original Lata', description: 'Cerveja em lata.', price: 10, category: 'cervejas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421421970631234/skol%20lata.jpg', is_featured: false, is_available: true, sort_order: 1 },
  { id: 'heineken-zero', name: 'Heineken Long Neck Zero', description: 'Cerveja long neck sem álcool.', price: 14, category: 'cervejas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421422677568611/heineken%20zero%20long.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'sol', name: 'Sol Long Neck', description: 'Cerveja long neck.', price: 14, category: 'cervejas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421422116393334/sol%20long.jpg', is_featured: false, is_available: true, sort_order: 3 },
  { id: 'bud', name: 'Budweiser Long Neck', description: 'Cerveja long neck.', price: 14, category: 'cervejas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421422236689252/bud%20long.jpg', is_featured: false, is_available: true, sort_order: 4 },
  { id: 'corona', name: 'Corona Long Neck', description: 'Cerveja long neck.', price: 14, category: 'cervejas', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421422554101813/corona%20long.jpg', is_featured: false, is_available: true, sort_order: 5 },
  { id: 'porcao-fritas', name: 'Fritas Tradicional', description: 'Porção inteira de batatas fritas.', price: 40, category: 'porcoes', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421199827738353/fritas%20tradicional.jpg', is_featured: false, is_available: true, sort_order: 1 },
  { id: 'porcao-cheddar', name: 'Fritas Cheddar e Bacon', description: 'Batatas fritas com cheddar e bacon.', price: 45, category: 'porcoes', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421200115098926/fritas%20cheddar%20e%20bacon.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'porcao-canoa', name: 'Batata Canoa', description: 'Batata canoa crocante.', price: 45, category: 'porcoes', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421200732805870/batata%20canoa.jpg', is_featured: false, is_available: true, sort_order: 3 },
  { id: 'meia-fritas', name: 'Fritas Tradicional - 1/2 Porção', description: 'Meia porção de batatas fritas.', price: 30, category: 'meias', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421199827738353/fritas%20tradicional.jpg', is_featured: false, is_available: true, sort_order: 1 },
  { id: 'meia-cheddar', name: 'Fritas Cheddar e Bacon - 1/2 Porção', description: 'Meia porção de fritas com cheddar e bacon.', price: 35, category: 'meias', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421200115098926/fritas%20cheddar%20e%20bacon.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'meia-canoa', name: 'Batata Canoa - 1/2 Porção', description: 'Meia porção de batata canoa.', price: 35, category: 'meias', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421200732805870/batata%20canoa.jpg', is_featured: false, is_available: true, sort_order: 3 },
  { id: 'extra-hamb-140', name: 'Hambúrguer 140g Extra', description: 'Adicional de hambúrguer bovino de 140g.', price: 20, category: 'extras', image_url: null, is_featured: false, is_available: true, sort_order: 1 },
  { id: 'extra-provolone', name: 'Provolone Extra', description: 'Adicional de provolone.', price: 16, category: 'extras', image_url: null, is_featured: false, is_available: true, sort_order: 2 },
  { id: 'extra-onion', name: 'Onion Rings Extra', description: 'Adicional de onion rings.', price: 8, category: 'extras', image_url: null, is_featured: false, is_available: true, sort_order: 3 },
  { id: 'extra-picles', name: 'Picles Extra', description: 'Adicional de picles.', price: 4, category: 'extras', image_url: null, is_featured: false, is_available: true, sort_order: 4 },
  { id: 'sopa-verde', name: 'Sopa Caldo Verde Português', description: 'Caldo verde português servido no pão.', price: 45, category: 'sopa', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421227835130298/sopa_no_pao.jpg', is_featured: false, is_available: true, sort_order: 1 },
  { id: 'bubble', name: 'Bubble BBQ', description: 'Clique e escolha as opções de sabor.', price: 20, category: 'bubble', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421203627892844/bubble%20tea%20bbq.jpg', is_featured: false, is_available: true, sort_order: 1 },
  { id: 'suco-abacaxi', name: 'Suco de Laranja com Abacaxi', description: 'Suco natural de laranja com abacaxi.', price: 20, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421207134587893/laranja%20com%20abacaxi.jpg', is_featured: false, is_available: true, sort_order: 15 },
  { id: 'soda-limao', name: 'Soda Limão', description: 'Soda artesanal de limão.', price: 16, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638422306364041025/soda%20limao.jpg', is_featured: false, is_available: true, sort_order: 16 },
  { id: 'soda-framboesa', name: 'Soda Framboesa', description: 'Soda artesanal de framboesa.', price: 16, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421204293951683/soda%20crambery.jpg', is_featured: false, is_available: true, sort_order: 17 },
  { id: 'sprite', name: 'Sprite Lata', description: 'Refrigerante em lata.', price: 8, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421418479626616/sprite.jpg', is_featured: false, is_available: true, sort_order: 18 },
  { id: 'kombucha', name: 'Kombucha', description: 'Kombucha artesanal.', price: 15, category: 'drinks', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421226931066085/Kombucha%20Afrodite%20-%20sabores.jpg', is_featured: false, is_available: true, sort_order: 19 },
  { id: 'chopp-neipa-cat', name: 'Chopp Neipa', description: 'Chopp artesanal NEIPA.', price: 22, category: 'chopps', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421245243496346/chopp%20neipa.jpg', is_featured: false, is_available: true, sort_order: 1 },
  { id: 'chopp-pilsen', name: 'Chopp Artesanal Pilsen Premium 300ml', description: 'Chopp artesanal Pilsen Premium.', price: 18, category: 'chopps', image_url: 'https://mogosmart.s3-us-west-2.amazonaws.com/Imagens/1bbqhamburgueria/638421235903987598/chopp%20cream%20ale.jpg', is_featured: false, is_available: true, sort_order: 2 },
  { id: 'chocolate-charge', name: 'Chocolate Charge', description: 'Doce de chocolate.', price: 6, category: 'doces', image_url: null, is_featured: false, is_available: true, sort_order: 1 },
];

export default function Menu({ onAddToCart }: MenuProps) {
  const [items, setItems] = useState<MenuItem[]>(featuredItems);
  const [active, setActive] = useState('burgers');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true)
        .order('sort_order', { ascending: true });

      if (!error && data) {
        setItems(data as MenuItem[]);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedItem]);

  const filtered = items.filter((item) => item.category === active);
  const extrasTotal = extras.reduce(
    (total, extra) => total + extra.price * (selectedExtras[extra.name] || 0),
    0,
  );

  const selectItem = (item: MenuItem) => {
    setSelectedItem(item);
    setSelectedExtras({});
  };

  const updateExtraQuantity = (name: string, change: number) => {
    setSelectedExtras((current) => {
      const quantity = Math.max(0, (current[name] || 0) + change);
      const next = { ...current };

      if (quantity === 0) {
        delete next[name];
      } else {
        next[name] = quantity;
      }

      return next;
    });
  };

  return (
    <section id="menu" className="border-b editorial-rule bg-[#0b0b0b]">
      <div className="mx-auto max-w-[1360px]">
        <div className="border-b editorial-rule px-8 py-12 md:px-14 md:py-16">
          <div className="max-w-3xl">
            <h2 className="font-display text-5xl font-black leading-[0.85] text-[#f1e8d7] md:text-7xl">ESCOLHA SEU<br />LANCHE<span className="text-[#ed4b00]">!</span></h2>
            <p className="mt-5 max-w-xl text-sm text-[#958d84] md:text-base">Preparados na hora, com fogo certo e sabor que pede mais uma mordida.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b editorial-rule px-8 py-4 md:px-14">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={`relative overflow-hidden rounded-full border px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 md:text-xs ${
                active === cat.key
                  ? 'border-[#ed4b00] bg-[radial-gradient(circle_at_top,_rgba(237,75,0,0.42),transparent_60%)] text-[#fffaf5] shadow-[0_0_0_1px_rgba(237,75,0,0.26),0_16px_32px_rgba(237,75,0,0.18)]'
                  : 'border-[#f1e8d7]/15 bg-[#111111]/80 text-[#b8b0a5] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[#f1e8d7]/35 hover:text-[#f1e8d7] hover:shadow-[0_10px_22px_rgba(0,0,0,0.32)]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-stone-900 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-52 bg-stone-800" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-stone-800 rounded w-2/3" />
                  <div className="h-4 bg-stone-800 rounded w-full" />
                  <div className="h-4 bg-stone-800 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid border-l editorial-rule md:grid-cols-3">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group cursor-pointer overflow-hidden border-b editorial-rule md:border-r"
                onClick={() => selectItem(item)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectItem(item);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Ver detalhes de ${item.name}`}
              >
                <div className="relative mx-3 mt-3 aspect-[1.15] overflow-hidden rounded-2xl bg-stone-900">
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-full w-full object-cover grayscale-[25%] saturate-75 transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {item.is_featured && (
                    <span className="absolute left-4 top-4 flex items-center gap-1 bg-[#ed4b00] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0b0b0b]">
                      <Flame className="h-3 w-3" />
                      Mais Pedido
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="font-display text-3xl font-black text-[#f1e8d7] leading-none">
                      {item.name}
                    </h3>
                    <span className="whitespace-nowrap font-mono-label text-[10px] font-bold text-[#ed4b00]">
                      R$ {Number(item.price).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-xs leading-relaxed text-[#958d84] md:text-sm">
                      {item.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6"
          role="presentation"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative flex h-[90vh] max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#f1e8d7] text-[#0b0b0b] md:flex-row"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-item-title"
            onClick={(event) => event.stopPropagation()}
          >
            {selectedItem.image_url && (
              <img
                src={selectedItem.image_url}
                alt={selectedItem.name}
                className="h-64 w-full shrink-0 object-cover md:h-auto md:w-1/2"
              />
            )}
            <div className="h-0 min-h-0 flex-1 overflow-y-auto overscroll-contain p-8 [touch-action:pan-y] md:h-auto md:w-1/2 md:p-10">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 p-2 text-[#0b0b0b] transition-colors hover:text-[#ed4b00]"
                aria-label="Fechar detalhes"
              >
                <X className="h-5 w-5" />
              </button>
              <span className="font-mono-label text-[10px] text-[#ed4b00]">[ detalhe do lanche ]</span>
              <h3 id="menu-item-title" className="font-display mt-6 text-5xl font-black leading-none">
                {selectedItem.name}
              </h3>
              <p className="mt-6 text-base leading-relaxed text-[#4f4943]">
                {selectedItem.description || 'Preparado na hora com ingredientes selecionados.'}
              </p>
              {['burgers', 'tradicionais'].includes(selectedItem.category) && (
                <p className="mt-5 border-t border-black/15 pt-5 text-sm font-bold">
                  Acompanha fritas.
                </p>
              )}
              {['burgers', 'tradicionais'].includes(selectedItem.category) && (
                <div className="mt-7 border-t border-black/15 pt-6">
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <h4 className="text-lg font-bold">Deseja adicionais no seu lanche?</h4>
                    <span className="whitespace-nowrap text-xs text-[#6b625a]">Selecione até 20</span>
                  </div>
                  <div className="divide-y divide-black/10">
                    {extras.map((extra) => (
                      <div
                        key={extra.name}
                        className="flex items-center justify-between gap-4 py-3"
                      >
                        <div>
                          <p className="text-sm">{extra.name}</p>
                          <p className="text-sm font-bold text-green-700">
                            R$ {extra.price.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => updateExtraQuantity(extra.name, -1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-black/70 text-base leading-none transition-colors hover:bg-black hover:text-white"
                            aria-label={`Remover ${extra.name}`}
                          >
                            -
                          </button>
                          <span className="w-3 text-center text-sm">{selectedExtras[extra.name] || 0}</span>
                          <button
                            type="button"
                            onClick={() => updateExtraQuantity(extra.name, 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full border border-black/70 text-base leading-none transition-colors hover:bg-black hover:text-white"
                            aria-label={`Adicionar ${extra.name}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/15 pt-5">
                <div>
                  <span className="block text-xs text-[#6b625a]">Total</span>
                  <p className="font-mono-label text-sm font-bold text-[#ed4b00]">
                    R$ {(Number(selectedItem.price) + extrasTotal).toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(selectedItem, selectedExtras, Number(selectedItem.price) + extrasTotal);
                    setSelectedItem(null);
                  }}
                  className="bg-[#ed4b00] px-5 py-3 text-xs font-bold text-[#0b0b0b] transition-colors hover:bg-[#0b0b0b] hover:text-[#f1e8d7]"
                >
                  Adicionar ao pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
