const hotelImages = {
  1: require("./assets/images/hoteis/hotelparaiso.jpg"),
  2: require("./assets/images/hoteis/pousadadosol.jpg"),
  3: require("./assets/images/hoteis/resort.jpg"),
};

const vooImages = {
  1: require("./assets/images/voos/sp.jpg"),
  2: require("./assets/images/voos/salvador.jpg"),
  3: require("./assets/images/voos/portoalegre.jpg"),
};

const defaultImage = require("./assets/images/defaultImage.jpg");

/**
    @param idHotel
    @returns

    @param idVoo
    @returns
*/

export const getHotelImage = (idHotel: number) => {
  return hotelImages[idHotel] || defaultImage;
};

export const getVooImage = (idVoo: number) => {
  return vooImages[idVoo] || defaultImage;
};
