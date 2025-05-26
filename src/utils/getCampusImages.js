import {
    aryabhatt,
    dheerpur,
    gbpant,
    jaffarpur,
    kasturba,
    okhla1,
    okhlacamps,
    pusa1,
    pusa2,
    rajokri,
    siri,
    wazirpur
} from '../Component/Campuses/campusimages';

export const generateCampusImage = (campusName, backendImage) => {
    const name = campusName.toLowerCase();

    switch (name) {
        case "dseu pusa i campus":
            return pusa1;
        case "dseu pusa ii campus":
            return pusa2;
        case "dseu rajokri campus":
            return rajokri;
        case "dseu siri fort campus":
            return siri;
        case "aryabhatt dseu campus":
            return aryabhatt;
        case "dseu dheerpur campus":
            return dheerpur;
        case "dseu jaffarpur campus":
            return jaffarpur;
        case "kasturba dseu campus":
            return kasturba;
        case "dseu okhla campus":
            return okhla1;
        case "champs dseu campus":
            return okhlacamps;
        case "dseu wazirpur campus":
            return wazirpur;
        case "gb pant dseu campus":
            return gbpant;
        default:
            return backendImage;
    }
};
