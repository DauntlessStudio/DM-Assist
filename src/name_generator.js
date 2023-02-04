// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// name_generator.js
// written and released to the public domain by drow <drow@bin.sh>
// http://creativecommons.org/publicdomain/zero/1.0/

let name_set = {};
let chain_cache = {};
name_set['sw-names'] = [

    "Gredarr Thule",
    "Centars Auteds",
    "Rice Bibblie",
    "Kodo Courtee",
    "Leys Waldon",
    "Jallo Jakin",
    "Lad Iliar",
    "Dash Harik",
    "Hugo Kordes",
    "Gil Hamne",
    "Jallo Avin",
    "Luca Bite",
    "Drafan Melnau",
    "Gruna Dolphe",
    "Porro Tane",
    "Aden Aleds",
    "Vidar Janrenk",
    "Leys Pavond",
    "Kuna Dolpho",
    "Rona Tillo",
    "Runa Eren",
    "Sion Dolpho",
    "Maxir Grenko",
    "Hoan Dellian",
    "Redar Minne",
    "Finon Jinzle",
    "Luca Daraay",
    "Kuna Korden",
    "Val Rene",
    "Jado Jissard",
    "Ronhar Typhe",
    "Kodo Orum",
    "Colo Bringbey",
    "Dash Vondell",
    "Kuna Elnen",
    "Pana Brandall",
    "Kesi Autem",
    "Oman Janrand",
    "Jaa Horne",
    "Deonon Vikorr",
    "Ham Tillis",
    "Denon Finnall",
    "Vyna Zapal",
    "Khoan Dene",
    "Lera Inzlem",
    "Mar Madas",
    "Leys Berand",
    "Ham Halcorr",
    "Gar Berik",
    "Rik Darand",
    "Tonor Marcharc",
    "Horo Vancil",
    "Jaa Corruss",
    "Crix Feles",
    "Tamet Donnall",
    "Derra Jakar",
    "Ronhys Lerga",
    "Corr Harand",
    "Centars Vanda",
    "Jaa Halcorr",
    "Finis Braji",
    "Vinca Aviss",
    "Owet Korraay",
    "Jado Vikorr",
    "Valsi Tarkorr",
    "Jido Nalle",
    "Jafan Melne",
    "Rice Graven",
    "Kuna Brenau",
    "Rix Halcard"
];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// generator function

export function generate_name (type) {
  let chain = markov_chain(type); 
  if (chain) {
    return markov_name(chain);
  }
  return '';
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// generate multiple

export function name_list (type, n_of) {
  let list = [];

  let i; for (i = 0; i < n_of; i++) {
    list.push(generate_name(type));
  }
  return list;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// get markov chain by type

function markov_chain (type) {
  let chain = chain_cache[type]; 
  if (chain) {
    return chain;
  } else {
    let list = name_set[type]; 
    if (list && list.length) {
      let chain = construct_chain(list); 
      if (chain) {
        chain_cache[type] = chain;
        return chain;
      }
    }
  }
  return false;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// construct markov chain from list of names

function construct_chain (list) {
  let chain = {};

  let i; for (i = 0; i < list.length; i++) {
    let names = list[i].split(/\s+/);
    chain = incr_chain(chain,'parts',names.length);

    let j; for (j = 0; j < names.length; j++) {
      let name = names[j];
      chain = incr_chain(chain,'name_len',name.length);

      let c = name.substr(0,1);
      chain = incr_chain(chain,'initial',c);

      let string = name.substr(1);
      let last_c = c;

      while (string.length > 0) {
        let c = string.substr(0,1);
        chain = incr_chain(chain,last_c,c);

        string = string.substr(1);
        last_c = c;
      }
    }
  }
  return scale_chain(chain);
}
function incr_chain (chain, key, token) {
  if (chain[key]) {
    if (chain[key][token]) {
      chain[key][token]++;
    } else {
      chain[key][token] = 1;
    }
  } else {
    chain[key] = {};
    chain[key][token] = 1;
  }
  return chain;
}
function scale_chain (chain) {
  let table_len = {};

  Object.keys(chain).forEach(key => {
    table_len[key] = 0;

    Object.keys(chain[key]).forEach(token => {
      let count = chain[key][token];
      let weighted = Math.floor(Math.pow(count,1.3));

      chain[key][token] = weighted;
      table_len[key] += weighted;
    });
  });
  chain['table_len'] = table_len;
  return chain;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// construct name from markov chain

function markov_name (chain) {
  let parts = select_link(chain,'parts');
  let names = [];

  let i; for (i = 0; i < parts; i++) {
    let name_len = select_link(chain,'name_len');
    let c = select_link(chain,'initial');
    let name = c;
    let last_c = c;

    while (name.length < name_len) {
      c = select_link(chain,last_c);
      if (! c) break;

      name += c;
      last_c = c;
    }
    names.push(name);
  }
  return names.join(' ');
}
function select_link (chain, key) {
  let len = chain['table_len'][key];
      if (! len) return false;
  let idx = Math.floor(Math.random() * len);
  let tokens = Object.keys(chain[key]);
  let acc = 0;

  let i; for (i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    acc += chain[key][token];
    if (acc > idx) return token;
  }
  return false;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -