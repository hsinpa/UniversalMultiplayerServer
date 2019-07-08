const Setting = {
    baseCSVURL : "https://docs.google.com/spreadsheets/d/e/2PACX-1vTqIhly3U_MbEdSKhga4ZbIArIB_pOnmvAkkSAEaqhmg552EZjJmb9MyWuKRT5OI1OXRqv34UcgdC9z/pub?gid=:id&single=true&output=csv",
    csvObjects : {
        "game_setting" : 651280385,
        "scene" : 798499353,
        "character_bundle" : 1572049983,        
        "character_clothes" : 1404933995
    },

    GetUrl : function(p_name) {
       return baseCSVURL.replace(":id", csvObjects[p_name]);
    }
};

module.exports = Setting; 