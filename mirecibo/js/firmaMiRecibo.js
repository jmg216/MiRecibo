

var firmaMiRecibo = $("#firmaMiRecibo")[0];

function sincronizar(){
    firmaMiRecibo.sincronizarTokens();
}

function isSCardActivo(){
    return firmaMiRecibo.isSCardActivo();
}

function authSCard( pin ){
    return firmaMiRecibo.authSCard( pin );
}

function firmar( nombre ){
    return firmaMiRecibo.firmarSCardDocumento( nombre );

}
